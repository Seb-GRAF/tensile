#!/bin/sh
cd "$(dirname "$0")/../.." || exit 1
status=0
for file in tests/keyboard/*.json; do
  story=$(basename "$file" .json)
  for browser in chromium firefox webkit; do
    out=/tmp/keyboard/$story/$browser
    mkdir -p "$out"
    if uv run .claude/skills/morph-component/scripts/check_story.py "$story" "$(cat "$file")" --browser "$browser" --out "$out" > "$out/run.log" 2>&1; then
      echo "PASS $story $browser"
    else
      echo "FAIL $story $browser, see $out/run.log"
      status=1
    fi
  done
done
exit $status
