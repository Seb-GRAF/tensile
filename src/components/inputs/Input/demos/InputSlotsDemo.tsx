import { useState } from "react";
import { Field, Icon, IconButton, Input } from "tensile";

export function InputSlotsDemo() {
  const [value, setValue] = useState("");

  return (
    <Field label="Search files" className="w-full max-w-sm">
      <Input
        value={value}
        onValueChange={setValue}
        leading={
          <Icon>
            <circle cx="10" cy="10" r="6" />
            <path d="m15 15 6 6" />
          </Icon>
        }
        trailing={
          <IconButton
            label="Clear search"
            variant="ghost"
            size="sm"
            onClick={() => setValue("")}
          >
            <Icon>
              <path d="m6 6 12 12M6 18 18 6" />
            </Icon>
          </IconButton>
        }
      />
    </Field>
  );
}
