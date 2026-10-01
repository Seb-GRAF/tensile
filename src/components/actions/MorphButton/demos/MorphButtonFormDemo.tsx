import { useState, type FormEvent } from "react";
import { MorphButton, Field, Input, Button } from "tensile";

export function MorphButtonFormDemo() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [result, setResult] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Saved locally: ${data.get("name")}`);
    setStatus("success");
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setName("");
        setStatus("idle");
        setResult("");
      }}
    >
      <Field label="Display name" required>
        <Input
          name="name"
          value={name}
          onValueChange={(value) => {
            setName(value);
            setStatus("idle");
          }}
        />
      </Field>
      <div className="flex items-center gap-2">
        <MorphButton type="submit" status={status}>
          Save locally
        </MorphButton>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      <output aria-live="polite" className="text-label">
        {result}
      </output>
    </form>
  );
}
