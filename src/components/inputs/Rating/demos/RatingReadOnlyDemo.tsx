import { useState } from "react";
import { Rating, Field } from "tensile";

export function RatingReadOnlyDemo() {
  const [value, setValue] = useState<number>(3);

  return (
    <Field label="Your rating" className="w-full max-w-sm">
      <Rating value={value} onValueChange={setValue} readOnly />
    </Field>
  );
}
