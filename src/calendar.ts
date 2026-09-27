export type DateRange = { start: string; end: string };

export function toDate(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year, month - 1, date);
}

export function toDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function addMonths(date: Date, months: number) {
  const last = new Date(date.getFullYear(), date.getMonth() + months + 1, 0).getDate();
  return new Date(date.getFullYear(), date.getMonth() + months, Math.min(date.getDate(), last));
}

export function monthDays(date: Date, firstDayOfWeek: number) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const offset = (new Date(year, month, 1).getDay() - firstDayOfWeek + 7) % 7;
  return Array.from({ length: 42 }, (_, i) => toDay(new Date(year, month, i + 1 - offset)));
}

export function keyboardDay(day: string, key: string, firstDayOfWeek: number) {
  const current = toDate(day);
  const year = current.getFullYear();
  const month = current.getMonth();
  const date = current.getDate();
  const column = (current.getDay() - firstDayOfWeek + 7) % 7;
  const targets: Record<string, Date> = {
    ArrowLeft: new Date(year, month, date - 1),
    ArrowRight: new Date(year, month, date + 1),
    ArrowUp: new Date(year, month, date - 7),
    ArrowDown: new Date(year, month, date + 7),
    Home: new Date(year, month, date - column),
    End: new Date(year, month, date + 6 - column),
    PageUp: addMonths(current, -1),
    PageDown: addMonths(current, 1),
  };
  const target = targets[key];
  return target ? toDay(target) : undefined;
}

export function clampDay(day: string, min?: string, max?: string) {
  if (min && day < min) return min;
  if (max && day > max) return max;
  return day;
}

export function orderedRange(first: string, second: string): DateRange {
  return first <= second ? { start: first, end: second } : { start: second, end: first };
}

export function isInRange(day: string, range: DateRange) {
  return day >= range.start && day <= range.end;
}
