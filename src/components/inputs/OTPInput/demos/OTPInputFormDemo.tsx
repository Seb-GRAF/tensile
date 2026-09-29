import { useState } from "react";
import { Button, Field, OTPInput } from "tensile";

export function OTPInputFormDemo() {
  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");

  return (
    <form
      className="grid w-full max-w-sm gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        if (code.length !== 6) return;
        const data = new FormData(event.currentTarget);
        setResult(`Code submitted: ${data.get("code")}`);
      }}
      onReset={() => {
        setCode("");
        setSubmitted(false);
        setResult("");
      }}
    >
      <Field
        label="Verification code"
        required
        error={
          submitted && code.length !== 6 ? "Enter all six digits." : undefined
        }
      >
        <div className="overflow-x-auto p-1">
          <OTPInput name="code" value={code} onValueChange={setCode} />
        </div>
      </Field>
      <div className="flex gap-2">
        <Button type="submit">Verify</Button>
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
