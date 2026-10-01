import { useState, type FormEvent } from "react";
import { Button, Field, RadioGroup } from "tensile";

const options = [
  { value: "standard", label: "Standard delivery" },
  { value: "express", label: "Express delivery" },
];

export function RadioGroupFormDemo() {
  const [delivery, setDelivery] = useState<string | null>(null);
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Delivery: ${data.get("delivery")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setDelivery(null);
        setResult("");
      }}
    >
      <Field label="Delivery" description="Choose how your order arrives." required>
        <RadioGroup
          name="delivery"
          options={options}
          value={delivery}
          onValueChange={setDelivery}
        />
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Save delivery</Button>
        <Button type="reset" variant="secondary">Reset</Button>
      </div>
      <output aria-live="polite" className="text-label text-muted">{result}</output>
    </form>
  );
}
