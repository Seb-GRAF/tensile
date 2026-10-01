import { useState } from "react";
import { NumberInput, Field } from "tensile";

export function NumberInputFormatDemo() {
  const [value, setValue] = useState<number | null>(1250.5);

  return (
    <Field label="Budget" className="w-full max-w-sm">
      <NumberInput
        value={value}
        onValueChange={setValue}
        formatValue={(amount) => `CHF ${amount.toFixed(2)}`}
        parseValue={(text) =>
          text.trim() === "" ? null : Number(text.replace("CHF", "").trim())
        }
      />
    </Field>
  );
}
