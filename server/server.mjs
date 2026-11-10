#!/usr/bin/env node
/**
 * ICOCO META — survey collection service.
 *
 * Zero dependencies: only Node built-ins, so it can be dropped on the Aliyun box
 * and started with `node server/server.mjs` (Node >= 18).
 *
 *   PORT=8787 ADMIN_PASSWORD=... node server/server.mjs
 *
 * Routes (all also mounted under /api):
 *   POST /survey-api/submissions        -> store one request
 *   GET  /survey-api/admin              -> password protected summary table
 *   POST /survey-api/admin/login|logout
 *   GET  /survey-api/admin/data         -> JSON rows (auth)
 *   GET  /survey-api/admin/export.csv   -> CSV download (auth)
 *   GET  /healthz
 *
 * There is no standalone form page: the contact page on the main site is the
 * only entry point, and GET / or /survey/* simply redirects there.
 */
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'node:fs'
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 8787)
const HOST = process.env.HOST || '127.0.0.1'
const DATA_DIR = resolve(process.env.DATA_DIR || join(here, 'data'))
const DATA_FILE = join(DATA_DIR, 'submissions.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''
const SECRET = process.env.SESSION_SECRET || randomBytes(32).toString('hex')
const SESSION_TTL = 12 * 60 * 60 * 1000
const MAX_BODY = 16 * 1024
const PREFIXES = ['/survey-api', '/api']
const CORS_ORIGINS = (process.env.CORS_ORIGINS || [
  'https://www.icoco.art',
  'https://icoco.art',
  'https://cloverydq-cyber.github.io',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4174',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
].join(','))
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

const PROJECT_TYPES = ['Styling', 'Surface & Class-A', 'Engineering validation', 'Manufacturing', 'Other']
const COOKIE = 'icoco_survey_admin'

if (!ADMIN_PASSWORD) {
  console.warn('[survey] ADMIN_PASSWORD is not set — the admin table will refuse every login.')
}

/* ---------------------------------------------------------------- storage */
function loadRows() {
  if (!existsSync(DATA_FILE)) return []
  try {
    const parsed = JSON.parse(readFileSync(DATA_FILE, 'utf8'))
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.error('[survey] could not parse storage, starting empty:', err.message)
    return []
  }
}
let rows = loadRows()
function saveRows() {
  mkdirSync(DATA_DIR, { recursive: true })
  const tmp = DATA_FILE + '.tmp'
  writeFileSync(tmp, JSON.stringify(rows, null, 2))
  renameSync(tmp, DATA_FILE)
}

/* ------------------------------------------------------------------ auth */
const sign = ts => createHmac('sha256', SECRET).update(ts).digest('hex')
function issueToken() {
  const ts = String(Date.now())
  return `${ts}.${sign(ts)}`
}
function readCookie(req, name) {
  const raw = req.headers.cookie || ''
  for (const part of raw.split(';')) {
    const i = part.indexOf('=')
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim())
  }
  return ''
}
function isAuthed(req) {
  const token = readCookie(req, COOKIE)
  if (!token.includes('.')) return false
  const [ts, mac] = token.split('.')
  const age = Date.now() - Number(ts)
  if (!Number.isFinite(age) || age < 0 || age > SESSION_TTL) return false
  const expected = sign(ts)
  const a = Buffer.from(mac, 'hex')
  const b = Buffer.from(expected, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

/* ------------------------------------------------------------ rate limit */
const hits = new Map()
function tooMany(key, limit, windowMs) {
  const now = Date.now()
  const rec = hits.get(key)
  if (!rec || now > rec.reset) {
    hits.set(key, { count: 1, reset: now + windowMs })
    return false
  }
  rec.count += 1
  return rec.count > limit
}
const clientIp = req =>
  (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
  req.socket.remoteAddress ||
  'unknown'

/* ---------------------------------------------------------------- helpers */
const clean = (value, max) =>
  String(value ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max)

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers })
  res.end(typeof body === 'string' ? body : JSON.stringify(body))
}
function cors(req, res) {
  const origin = req.headers.origin || ''
  if (CORS_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '3600')
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', chunk => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(new Error('payload too large'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}
async function readJson(req) {
  const raw = await readBody(req)
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}
function cookieHeader(req, token, maxAge) {
  const secure = (req.headers['x-forwarded-proto'] || '').includes('https') ? '; Secure' : ''
  return `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`
}
const CSV_COLUMNS = [
  ['createdAt', 'Received (UTC)'],
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['projectType', 'Project type'],
  ['needs', 'Business needs'],
  ['source', 'Source'],
  ['ip', 'IP'],
]
function csvCell(value) {
  const s = Array.isArray(value) ? value.join(' / ') : String(value ?? '')
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
function toCsv(list) {
  const head = CSV_COLUMNS.map(c => csvCell(c[1])).join(',')
  const body = list.map(row => CSV_COLUMNS.map(c => csvCell(row[c[0]])).join(',')).join('\n')
  return `\uFEFF${head}\n${body}\n`
}

/* --------------------------------------------------------------- handlers */
async function handleSubmit(req, res) {
  if (tooMany('submit:' + clientIp(req), 8, 10 * 60 * 1000)) {
    return send(res, 429, { ok: false, error: 'too many requests' })
  }
  const body = await readJson(req)
  if (clean(body.gotcha, 40)) return send(res, 200, { ok: true }) // bot trap

  const name = clean(body.name, 120)
  const email = clean(body.email, 160)
  const company = clean(body.company, 160)
  const phone = clean(body.phone, 40)
  const needs = clean(body.needs, 2000)
  const types = Array.isArray(body.projectType)
    ? body.projectType.filter(t => PROJECT_TYPES.includes(t))
    : typeof body.projectType === 'string'
      ? PROJECT_TYPES.filter(t => body.projectType.includes(t))
      : []

  if (!name) return send(res, 400, { ok: false, error: 'name required' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { ok: false, error: 'valid email required' })

  const row = {
    id: randomBytes(8).toString('hex'),
    createdAt: new Date().toISOString(),
    name,
    company,
    email,
    phone,
    projectType: types,
    needs,
    source: clean(body.source, 300) || clean(req.headers.referer, 300),
    ip: clientIp(req),
    ua: clean(req.headers['user-agent'], 300),
    locale: clean(body.locale, 20),
  }
  rows.unshift(row)
  saveRows()
  console.log(`[survey] +1 ${row.name} <${row.email}> ${row.company || '-'} (${row.projectType.join('/') || '-'}) total=${rows.length}`)
  return send(res, 200, { ok: true, id: row.id })
}

async function handleLogin(req, res) {
  const ip = clientIp(req)
  if (tooMany('login:' + ip, 12, 15 * 60 * 1000)) return send(res, 429, { ok: false, error: 'too many attempts' })
  const body = await readJson(req)
  const password = String(body.password ?? '')
  await new Promise(r => setTimeout(r, 350))
  if (!ADMIN_PASSWORD || !password) return send(res, 401, { ok: false, error: 'wrong password' })
  const a = Buffer.from(password)
  const b = Buffer.from(ADMIN_PASSWORD)
  const ok = a.length === b.length && timingSafeEqual(a, b)
  if (!ok) return send(res, 401, { ok: false, error: 'wrong password' })
  return send(res, 200, { ok: true }, { 'Set-Cookie': cookieHeader(req, issueToken(), Math.floor(SESSION_TTL / 1000)) })
}

function handleLogout(req, res) {
  return send(res, 200, { ok: true }, { 'Set-Cookie': cookieHeader(req, '', 0) })
}

function adminHtml() {
  const file = join(here, 'admin.html')
  return existsSync(file) ? readFileSync(file, 'utf8') : '<h1>admin.html missing</h1>'
}

/* ------------------------------------------------------------------ server */
const server = createServer(async (req, res) => {
  cors(req, res)
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  let path = url.pathname.replace(/\/{2,}/g, '/')
  const prefix = PREFIXES.find(p => path === p || path.startsWith(p + '/'))
  if (prefix) path = path.slice(prefix.length) || '/'

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  try {
    if (path === '/healthz') return send(res, 200, { ok: true, rows: rows.length })

    if (path === '/submissions' && req.method === 'POST') return await handleSubmit(req, res)

    if (path === '/admin' || path === '/admin/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' })
      return res.end(adminHtml())
    }
    if (path === '/admin/login' && req.method === 'POST') return await handleLogin(req, res)
    if (path === '/admin/logout' && req.method === 'POST') return handleLogout(req, res)

    if (path === '/admin/data') {
      if (!isAuthed(req)) return send(res, 401, { ok: false, error: 'unauthorised' })
      return send(res, 200, { ok: true, total: rows.length, rows })
    }
    if (path === '/admin/export.csv') {
      if (!isAuthed(req)) return send(res, 401, { ok: false, error: 'unauthorised' })
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="icoco-demo-requests-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'no-store',
      })
      return res.end(toCsv(rows))
    }

    // there is no standalone form any more — the one on the main site's
    // contact page is the single entry point; same origin, so /contact works
    // behind the icoco.art nginx vhost
    if (path === '/survey' || path === '/survey/' || path === '/survey/index.html' ||
        path === '/' || path === '/index.html') {
      res.writeHead(302, { Location: '/contact' })
      return res.end()
    }
    return send(res, 404, { ok: false, error: 'not found' })
  } catch (err) {
    console.error('[survey] request failed:', err)
    return send(res, 400, { ok: false, error: 'bad request' })
  }
})

server.listen(PORT, HOST, () => {
  console.log(`[survey] listening on http://${HOST}:${PORT}`)
  console.log(`[survey] admin   http://${HOST}:${PORT}/survey-api/admin`)
  console.log(`[survey] storage ${DATA_FILE} (${rows.length} rows)`)
  if (!ADMIN_PASSWORD) console.log('[survey] set ADMIN_PASSWORD before exposing this to the internet')
})
