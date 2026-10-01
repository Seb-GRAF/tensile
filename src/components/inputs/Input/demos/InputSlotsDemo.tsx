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
          <Icon name="search" />
        }
        trailing={
          <IconButton
            label="Clear search"
            icon="close"
            variant="ghost"
            size="sm"
            onClick={() => setValue("")}
          />
        }
      />
    </Field>
  );
}
