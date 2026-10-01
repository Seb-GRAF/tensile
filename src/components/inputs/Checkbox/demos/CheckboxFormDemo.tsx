import { useState, type FormEvent } from "react";
import { Button, Checkbox } from "tensile";

export function CheckboxFormDemo() {
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.get("terms")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setChecked(false);
        setResult("");
      }}
    >
      <Checkbox
        label="I agree to the terms of service"
        name="terms"
        value="accepted"
        required
        checked={checked}
        onCheckedChange={setChecked}
      />
      <div className="flex gap-2">
        <Button type="submit">Continue</Button>
        <Button type="reset" variant="secondary">Reset</Button>
      </div>
      <output aria-live="polite" className="text-label text-muted">{result}</output>
    </form>
  );
}
