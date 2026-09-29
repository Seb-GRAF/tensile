#!/bin/sh
set -e
cd "$(dirname "$0")"
npm --prefix ../.. run build --silent
consumer_dir=$(mktemp -d)
trap 'rm -rf "$consumer_dir"' EXIT HUP INT TERM
(cd ../.. && npm pack --ignore-scripts --pack-destination "$consumer_dir" --silent)
cp package.json tsconfig.json vite.config.ts index.html main.tsx App.tsx app.css ssr.mjs "$consumer_dir/"
mkdir "$consumer_dir/docs-examples"
find ../../src/components -type f \( -name '*Demo.tsx' -o -name '*Example.tsx' \) -exec cp {} "$consumer_dir/docs-examples/" \;
cd "$consumer_dir"
npm install --ignore-scripts --package-lock=false --no-audit --no-fund ./*.tgz
npx tsc -p .
npx vite build --logLevel warn
node ssr.mjs
grep -q -- "--radius-control: *12px" dist/assets/*.css
echo "The app's token overrides are in its built CSS."
