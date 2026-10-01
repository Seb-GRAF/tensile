import { useState } from "react";
import { DateField, Field } from "tensile";

function formatDate(day: string) {
  const [year, month, date] = day.split("-");
  return `${date}.${month}.${year}`;
}

function parseDate(text: string) {
  const match = text.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;
  const [date, month, year] = match.slice(1).map(Number);
  const day = new Date(year, month - 1, date);
  if (day.getMonth() !== month - 1) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
}

export function DateFieldFormatDemo() {
  const [value, setValue] = useState<string | null>("2026-10-14");

  return (
    <Field label="Due date" className="w-full max-w-sm">
      <DateField value={value} onValueChange={setValue} formatDate={formatDate} parseDate={parseDate} placeholder="DD.MM.YYYY" firstDayOfWeek={1} />
    </Field>
  );
}
