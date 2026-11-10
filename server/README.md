# ICOCO META — demo request collection service

A single-file Node service (no dependencies) that stores every form submission on
our own server and serves a password-protected summary table plus CSV export.
Nothing is emailed anywhere; the data lives in `server/data/submissions.json`
(or `DATA_DIR`).

```
node server/server.mjs            # http://127.0.0.1:8787/survey/
```

| Route | What it does |
| --- | --- |
| `GET /survey/` | the public form (served from `public/survey/index.html`) |
| `POST /survey-api/submissions` | stores one request |
| `GET /survey-api/admin` | password protected table (login form) |
| `GET /survey-api/admin/export.csv` | full export, UTF-8 with BOM so Excel opens it cleanly |
| `GET /healthz` | `{"ok":true,"rows":N}` |

All API routes also answer under `/api/*`, and the service strips the prefix, so
nginx can proxy either `/survey-api/` or `/api/`.

## Configuration

| Env | Default | Notes |
| --- | --- | --- |
| `PORT` | `8787` | |
| `HOST` | `127.0.0.1` | keep it on loopback; nginx terminates TLS |
| `ADMIN_PASSWORD` | _(empty)_ | **required** — every login is refused without it |
| `DATA_DIR` | `server/data` | put this on the persistent volume, not in the web root |
| `SESSION_SECRET` | random per boot | set it if you want logins to survive restarts |
| `CORS_ORIGINS` | `icoco.art`, `cloverydq-cyber.github.io`, localhost | comma separated allowlist |

## Deploy on the Aliyun box (47.101.145.62)

1. Copy the two folders, keeping the relative layout:

   ```bash
   sudo mkdir -p /var/www/icoco-survey /var/lib/icoco-survey
   sudo rsync -a server public /var/www/icoco-survey/
   sudo chown -R www-data:www-data /var/www/icoco-survey /var/lib/icoco-survey
   ```

2. Create the environment file (keep it `600`):

   ```bash
   sudo tee /etc/icoco-survey.env >/dev/null <<'EOF'
   PORT=8787
   HOST=127.0.0.1
   DATA_DIR=/var/lib/icoco-survey
   ADMIN_PASSWORD=replace-with-a-long-password
   SESSION_SECRET=replace-with-32-random-bytes
   EOF
   sudo chmod 600 /etc/icoco-survey.env
   ```

3. Install the unit and start it:

   ```bash
   sudo cp server/icoco-survey.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable --now icoco-survey
   sudo systemctl status icoco-survey --no-pager
   curl -s http://127.0.0.1:8787/healthz
   ```

4. Add the nginx location **inside the existing `server {}` for www.icoco.art**
   (see `nginx.survey-api.conf`) and reload:

   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

5. Verify from the outside:

   ```bash
   curl -s https://www.icoco.art/survey-api/healthz
   curl -s -o /dev/null -w '%{http_code}\n' https://www.icoco.art/survey/
   ```

   The admin table is then at `https://www.icoco.art/survey-api/admin`.

## Notes for whoever maintains this

- The form on the GitHub Pages preview posts cross-origin to
  `https://www.icoco.art/survey-api`, which is why that origin is in the CORS
  allowlist. If the preview URL ever changes, add it to `CORS_ORIGINS`.
- Back up `DATA_DIR/submissions.json` (plain JSON array). Copying it while the
  service runs is safe: writes go to a temp file and are renamed into place.
- Rate limiting: 8 submissions per IP per 10 minutes, 12 login attempts per
  IP per 15 minutes, plus a hidden honeypot field. That is enough for a demo
  form; it is not a general-purpose anti-abuse system.
- There is no database migration path by design — if the field set changes,
  old rows simply keep the keys they were written with, and the table renders
  `—` for anything missing.
