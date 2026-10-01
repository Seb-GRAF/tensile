import assert from "node:assert/strict";
import test from "node:test";
import { addMonths, clampDay, formatUSDate, isInRange, keyboardDay, monthDays, orderedRange, parseUSDate, toDate, toDay } from "./calendar.ts";

test("ISO days use local calendar dates through leap day and year boundaries", () => {
  for (const day of ["2024-02-29", "2025-12-31", "2026-01-01"]) {
    const date = toDate(day);
    assert.equal(toDay(date), day);
    assert.equal(date.getHours(), 0);
  }
});

test("month moves clamp month ends without changing the original date", () => {
  const january = toDate("2024-01-31");
  assert.equal(toDay(addMonths(january, 1)), "2024-02-29");
  assert.equal(toDay(addMonths(toDate("2025-01-31"), 1)), "2025-02-28");
  assert.equal(toDay(addMonths(toDate("2024-03-31"), -1)), "2024-02-29");
  assert.equal(toDay(addMonths(toDate("2024-02-29"), 12)), "2025-02-28");
  assert.equal(toDay(addMonths(toDate("2025-12-31"), 1)), "2026-01-31");
  assert.equal(toDay(january), "2024-01-31");
});

test("month grids contain six full weeks from the requested weekday", () => {
  const sunday = monthDays(toDate("2026-09-18"), 0);
  assert.equal(sunday.length, 42);
  assert.equal(sunday[0], "2026-08-30");
  assert.equal(sunday[41], "2026-10-10");
  const monday = monthDays(toDate("2026-09-18"), 1);
  assert.equal(monday[0], "2026-08-31");
  assert.equal(monday[41], "2026-10-11");
  assert.equal(monthDays(toDate("2024-02-01"), 0).filter((day) => day.startsWith("2024-02")).length, 29);
  assert.equal(monthDays(toDate("1900-02-01"), 0).filter((day) => day.startsWith("1900-02")).length, 28);
  for (let first = 0; first < 7; first++) {
    const days = monthDays(toDate("2026-03-01"), first);
    assert.equal(toDate(days[0]).getDay(), first);
    for (let i = 1; i < days.length; i++) {
      const next = toDate(days[i - 1]);
      next.setDate(next.getDate() + 1);
      assert.equal(days[i], toDay(next));
    }
  }
});

test("arrow keys cross weeks, months and years", () => {
  assert.equal(keyboardDay("2024-03-01", "ArrowLeft", 0), "2024-02-29");
  assert.equal(keyboardDay("2025-12-31", "ArrowRight", 0), "2026-01-01");
  assert.equal(keyboardDay("2026-03-03", "ArrowUp", 0), "2026-02-24");
  assert.equal(keyboardDay("2026-03-03", "ArrowDown", 0), "2026-03-10");
  assert.equal(keyboardDay("2026-03-03", "Enter", 0), undefined);
});

test("Home and End follow the first weekday and page keys clamp month ends", () => {
  assert.equal(keyboardDay("2026-09-01", "Home", 0), "2026-08-30");
  assert.equal(keyboardDay("2026-09-01", "End", 0), "2026-09-05");
  assert.equal(keyboardDay("2026-09-01", "Home", 1), "2026-08-31");
  assert.equal(keyboardDay("2026-09-01", "End", 1), "2026-09-06");
  assert.equal(keyboardDay("2024-03-31", "PageUp", 0), "2024-02-29");
  assert.equal(keyboardDay("2025-01-31", "PageDown", 0), "2025-02-28");
});

test("bounds clamp keyboard targets and preserve inclusive endpoints", () => {
  assert.equal(clampDay("2026-09-03", "2026-09-05", "2026-09-20"), "2026-09-05");
  assert.equal(clampDay("2026-09-22", "2026-09-05", "2026-09-20"), "2026-09-20");
  assert.equal(clampDay("2026-09-05", "2026-09-05", "2026-09-20"), "2026-09-05");
  assert.equal(clampDay("2026-09-20", "2026-09-05", "2026-09-20"), "2026-09-20");
  assert.equal(clampDay("2026-09-10"), "2026-09-10");
  assert.equal(clampDay(keyboardDay("2026-09-20", "ArrowRight", 0)!, undefined, "2026-09-20"), "2026-09-20");
});

test("ranges order reverse picks and include both endpoints", () => {
  const range = orderedRange("2026-10-02", "2026-09-28");
  assert.deepEqual(range, { start: "2026-09-28", end: "2026-10-02" });
  assert.equal(isInRange("2026-09-28", range), true);
  assert.equal(isInRange("2026-09-30", range), true);
  assert.equal(isInRange("2026-10-02", range), true);
  assert.equal(isInRange("2026-09-27", range), false);
  assert.equal(isInRange("2026-10-03", range), false);
  assert.deepEqual(orderedRange("2026-09-18", "2026-09-18"), { start: "2026-09-18", end: "2026-09-18" });
});

test("US dates format as MM/DD/YYYY and parse back with one-digit parts and common separators", () => {
  assert.equal(formatUSDate("2026-03-04"), "03/04/2026");
  assert.equal(parseUSDate(formatUSDate("2024-02-29")), "2024-02-29");
  assert.equal(parseUSDate("3/4/2026"), "2026-03-04");
  assert.equal(parseUSDate(" 12-31-2025 "), "2025-12-31");
  assert.equal(parseUSDate("1.9.2026"), "2026-01-09");
  assert.equal(parseUSDate("10 1 2026"), "2026-10-01");
});

test("US date parsing rejects days that don't exist and text that isn't a date", () => {
  assert.equal(parseUSDate("02/29/2025"), null);
  assert.equal(parseUSDate("13/01/2026"), null);
  assert.equal(parseUSDate("04/31/2026"), null);
  assert.equal(parseUSDate("3/4/26"), null);
  assert.equal(parseUSDate("2026-03-04"), null);
  assert.equal(parseUSDate("tomorrow"), null);
  assert.equal(parseUSDate(""), null);
});
