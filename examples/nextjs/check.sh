#!/bin/sh
set -e
cd "$(dirname "$0")"
here=$(pwd)
app_dir=$(mktemp -d)
trap 'rm -rf "$app_dir"' EXIT HUP INT TERM
if [ -n "$TENSILE_TARBALL" ]; then
  cp "$TENSILE_TARBALL" "$app_dir/"
else
  npm --prefix ../.. run build --silent
  (cd ../.. && npm pack --ignore-scripts --pack-destination "$app_dir" --silent)
fi
cp -R package.json tsconfig.json app "$app_dir/"
cd "$app_dir"
npm install --package-lock=false --no-audit --no-fund ./*.tgz
npx next build
port=$(python3 -c 'import socket; s = socket.socket(); s.bind(("", 0)); print(s.getsockname()[1])')
node node_modules/next/dist/bin/next start -p "$port" &
server=$!
trap 'kill "$server" 2>/dev/null || true; wait "$server" 2>/dev/null || true; rm -rf "$app_dir"' EXIT HUP INT TERM
uv run "$here/check.py" "http://localhost:$port"
