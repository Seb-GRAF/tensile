import { useRef, useState, type FormEvent } from "react";
import { Button, Field, Input } from "tensile";

export function FieldExample() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    if (name.trim() === "") {
      setError("Enter a display name to continue.");
      input.current!.focus();
      return;
    }
    setError(undefined);
    setSaved(true);
  }

  return (
    <form noValidate onSubmit={submit} style={{ display: "grid", gap: 16 }}>
      <Field label="Display name" error={error} required>
        <Input ref={input} name="displayName" autoComplete="nickname" value={name} onValueChange={setName} />
      </Field>
      <Button type="submit" variant="secondary" className="justify-self-start">Try validation</Button>
      <p role="status" style={{ color: "var(--color-muted)", fontSize: 13 }}>
        {saved ? `Looks good, ${name}. Nothing was submitted.` : "Try submitting with the field empty."}
      </p>
    </form>
  );
}
