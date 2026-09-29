import { useState, type FormEvent } from "react";
import { Button, Field, Toggle } from "tensile";

export function ToggleFormDemo() {
  const [value, setValue] = useState(false);
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.get("updates")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue(false);
        setResult("");
      }}
    >
      <Field label="Product updates">
        <Toggle
          name="updates"
          value="yes"
          checked={value}
          onCheckedChange={setValue}
        />
      </Field>
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
