import { useState } from "react";
import { Rating, Field } from "tensile";

export function RatingDisabledDemo() {
  const [value, setValue] = useState<number>(3);

  return (
    <Field label="Your rating" className="w-full max-w-sm">
      <Rating value={value} onValueChange={setValue} disabled />
    </Field>
  );
}
