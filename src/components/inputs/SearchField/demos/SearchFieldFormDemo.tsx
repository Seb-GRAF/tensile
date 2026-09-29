import { useState, type FormEvent } from "react";
import { Button, SearchField } from "tensile";

export function SearchFieldFormDemo() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.get("query")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue("");
        setResult("");
      }}
    >
      <SearchField
        label="Search documents"
        name="query"
        value={value}
        onValueChange={setValue}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      <output aria-live="polite" className="text-label text-muted">
        {result}
      </output>
    </form>
  );
}
