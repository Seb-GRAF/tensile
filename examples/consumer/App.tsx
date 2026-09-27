import { useState } from "react";
import { Icon, MorphButton, SegmentedTabs, Select, Spinner, Toggle } from "morph-components";

const ranges = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const sorts = [
  { value: "added", label: "Date added" },
  { value: "title", label: "Title" },
];

export function App() {
  const [range, setRange] = useState("week");
  const [sort, setSort] = useState<string | null>(null);
  const [notify, setNotify] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function save() {
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
    setTimeout(() => setStatus("idle"), 2700);
  }

  return (
    <main className="app">
      <h1>
        <Icon size={20}>
          <path d="M12 3v18M3 12h18" />
        </Icon>
        A consumer without Tailwind
      </h1>
      <SegmentedTabs options={ranges} value={range} onValueChange={setRange} />
      <Select options={sorts} value={sort} onValueChange={setSort} />
      <Toggle checked={notify} onCheckedChange={setNotify} label="Notifications" />
      <MorphButton status={status} onClick={save}>
        Save
      </MorphButton>
      <p className="busy">
        <Spinner /> Syncing
      </p>
    </main>
  );
}
