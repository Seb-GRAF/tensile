import { useState, type FormEvent } from "react";
import { Button, Field, Input } from "tensile";

export function ButtonFormDemo() {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Saved display name: ${data.get("displayName")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setName("");
        setResult("");
      }}
    >
      <Field label="Display name" required>
        <Input name="displayName" value={name} onValueChange={setName} />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="secondary">Reset</Button>
      </div>
      <output aria-live="polite" className="text-label text-muted">{result}</output>
    </form>
  );
}
