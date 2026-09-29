import { useState, type FormEvent } from "react";
import { NumberStepper, Field, Button } from "tensile";

export function NumberStepperFormDemo() {
  const [value, setValue] = useState<number>(2);
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.get("value")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue(2);
        setResult("");
      }}
    >
      <Field label="Guests">
        <NumberStepper name="value" value={value} onValueChange={setValue} />
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
