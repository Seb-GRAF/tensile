#!/bin/sh
set -e
cd "$(dirname "$0")"
here=$(pwd)
npm --prefix ../.. run build --silent
app_dir=$(mktemp -d)
trap 'kill "$server" 2>/dev/null; rm -rf "$app_dir"' EXIT HUP INT TERM
(cd ../.. && npm pack --ignore-scripts --pack-destination "$app_dir" --silent)
cp -R package.json tsconfig.json app "$app_dir/"
cd "$app_dir"
npm install --package-lock=false --no-audit --no-fund ./*.tgz
npx next build
port=$(python3 -c 'import socket; s = socket.socket(); s.bind(("", 0)); print(s.getsockname()[1])')
npx next start -p "$port" &
server=$!
uv run "$here/check.py" "http://localhost:$port"
