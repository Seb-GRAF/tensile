#!/bin/sh
set -e
cd "$(dirname "$0")"
npm --prefix ../.. run build --silent
mkdir -p node_modules
ln -sfn ../../.. node_modules/morph-components
../../node_modules/.bin/tsc -p .
../../node_modules/.bin/vite build --logLevel warn
node ssr.mjs
grep -q -- "--radius-control: *12px" dist/assets/*.css
echo "The app's token overrides are in its built CSS."
