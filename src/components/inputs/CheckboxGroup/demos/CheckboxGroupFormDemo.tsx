import { useState, type FormEvent } from "react";
import { Button, CheckboxGroup, Fieldset } from "tensile";

const options = [
  { value: "email", label: "Email" },
  { value: "push", label: "Push notifications" },
  { value: "sms", label: "SMS", disabled: true },
];

export function CheckboxGroupFormDemo() {
  const [value, setValue] = useState<string[]>(["email"]);
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Submitted: ${data.getAll("channels").join(", ")}`);
  }

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={handleSubmit}
      onReset={() => {
        setValue(["email"]);
        setResult("");
      }}
    >
      <Fieldset
        legend="Notification channels"
        description="Choose how to receive updates."
      >
        <CheckboxGroup
          label="Channels"
          name="channels"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </Fieldset>
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
