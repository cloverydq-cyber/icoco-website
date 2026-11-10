// Marketing routes are written as root-absolute paths ("/product") because the
// production site (www.icoco.art) is served from the domain root. The GitHub
// Pages preview however lives under a sub-path (/icoco-website/), so every
// hand-written anchor has to be rebased through Vite's BASE_URL -- otherwise a
// click lands on the domain root and renders GitHub's own 404.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '')

export function siteLink(path = '/') {
  if (typeof path !== 'string' || !path.startsWith('/')) return path
  return BASE + path
}

export default siteLink
