#!/usr/bin/env bash
# ICOCO META — one-shot installer for the demo-request collection service.
#
#   sudo bash install.sh                 # interactive: asks for the admin password
#   sudo bash install.sh 'MyPassword'    # non-interactive
#   sudo bash install.sh 'MyPassword' --nginx
#
# What it does (Ubuntu / Debian, systemd, nginx already serving www.icoco.art):
#   1. copies server/ + public/ to /var/www/icoco-survey
#   2. writes /etc/icoco-survey.env (admin password + session secret)
#   3. installs and starts the systemd unit icoco-survey.service on 127.0.0.1:8787
#   4. with --nginx, drops a /survey-api/ proxy block into the icoco.art vhost
#
# It never touches the app that already serves /login, /admin, /cmf, etc.:
# the only change is one extra location block for /survey-api/.

set -euo pipefail

APP_DIR=/var/www/icoco-survey
DATA_DIR=/var/lib/icoco-survey
ENV_FILE=/etc/icoco-survey.env
SERVICE=icoco-survey
HERE=$(cd "$(dirname "$0")/.." && pwd)

say() { printf '\033[36m›\033[0m %s\n' "$*"; }
die() { printf '\033[31m✗\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run me with sudo"

PASSWORD=${1:-}
WITH_NGINX=no
for a in "$@"; do
  if [ "$a" = "--nginx" ]; then WITH_NGINX=yes; fi
done

if [ -z "$PASSWORD" ] || [ "$PASSWORD" = "--nginx" ]; then
  read -r -s -p "Admin password for /survey-api/admin: " PASSWORD; echo
  [ -n "$PASSWORD" ] || die "an admin password is required"
  [ ${#PASSWORD} -ge 8 ] || say "warning: fewer than 8 characters"
fi

command -v node >/dev/null || die "node is not installed (need Node 18+): apt install -y nodejs"
NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
[ "$NODE_MAJOR" -ge 18 ] || die "node $NODE_MAJOR is too old, need 18+"
NODE_BIN=$(command -v node)

[ -f "$HERE/server/server.mjs" ] || die "run me from the repo checkout (server/server.mjs not found)"
[ -f "$HERE/public/survey/index.html" ] || die "public/survey/index.html not found"

say "creating $APP_DIR and $DATA_DIR"
install -d -o www-data -g www-data "$DATA_DIR"
install -d "$APP_DIR"
rm -rf "$APP_DIR/server" "$APP_DIR/public"
cp -r "$HERE/server" "$HERE/public" "$APP_DIR/"
rm -rf "$APP_DIR/server/data"
chown -R www-data:www-data "$APP_DIR"

say "writing $ENV_FILE"
umask 077
cat > "$ENV_FILE" <<EOF
PORT=8787
HOST=127.0.0.1
ADMIN_PASSWORD=$PASSWORD
SESSION_SECRET=$(head -c 32 /dev/urandom | base64 | tr -d '\n/+=' | cut -c1-40)
DATA_DIR=$DATA_DIR
CORS_ORIGINS=https://www.icoco.art,https://icoco.art,https://cloverydq-cyber.github.io
EOF
chmod 600 "$ENV_FILE"

say "installing systemd unit"
sed "s#/usr/bin/node#$NODE_BIN#" "$HERE/server/icoco-survey.service" > /etc/systemd/system/$SERVICE.service
systemctl daemon-reload
systemctl enable --now $SERVICE >/dev/null
sleep 1

if curl -fsS http://127.0.0.1:8787/healthz >/dev/null; then
  say "service is up: $(curl -s http://127.0.0.1:8787/healthz)"
else
  journalctl -u $SERVICE -n 25 --no-pager || true
  die "service did not answer on 127.0.0.1:8787"
fi

if [ "$WITH_NGINX" = yes ]; then
  VHOST=$(grep -rl "server_name[^;]*icoco\.art" /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null | head -1 || true)
  [ -n "$VHOST" ] || die "could not find the icoco.art vhost; add the snippet manually"
  if grep -q "location /survey-api/" "$VHOST"; then
    say "nginx already proxies /survey-api/ in $VHOST"
  else
    say "adding /survey-api/ proxy to $VHOST"
    cp "$VHOST" "$VHOST.bak.$(date +%Y%m%d%H%M%S)"
    python3 - "$VHOST" <<'PY'
import re, sys
path = sys.argv[1]
src = open(path).read()
block = """
    # ICOCO META demo-request collection service
    location /survey-api/ {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
        client_max_body_size 64k;
    }
"""
idx = src.rfind("}")
open(path, "w").write(src[:idx] + block + src[idx:])
print("inserted before the last closing brace")
PY
    nginx -t && systemctl reload nginx
  fi
fi

cat <<EOF

Done.

  form      https://www.icoco.art/survey/
  admin     https://www.icoco.art/survey-api/admin
  data      $DATA_DIR/submissions.json
  logs      journalctl -u $SERVICE -f
  restart   systemctl restart $SERVICE

EOF

if [ "$WITH_NGINX" != yes ]; then
  cat <<'EOF'
One manual step left: add this inside the icoco.art server block, then
`nginx -t && systemctl reload nginx`:

    location /survey-api/ {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 64k;
    }

(or re-run with --nginx to let me insert it next to the existing site config)
EOF
fi
