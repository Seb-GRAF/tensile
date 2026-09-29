import { useState } from "react";
import { SelectionBar, CheckboxGroup, Button } from "tensile";

const documents = [
  { value: "brief", label: "Project brief" },
  { value: "notes", label: "Review notes" },
  { value: "budget", label: "Budget" },
];

export function SelectionBarDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-5">
      <CheckboxGroup
        label="Documents"
        options={documents}
        value={selected}
        onValueChange={setSelected}
      />
      <div className="min-h-11 overflow-x-auto">
        <SelectionBar count={selected.length} onClear={() => setSelected([])}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setResult(`Archived ${selected.length} documents`);
              setSelected([]);
            }}
          >
            Archive
          </Button>
        </SelectionBar>
      </div>
      <output aria-live="polite" className="text-label">
        {result}
      </output>
    </div>
  );
}
