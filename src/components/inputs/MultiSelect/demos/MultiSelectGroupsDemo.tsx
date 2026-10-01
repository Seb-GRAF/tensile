import { useState } from "react";
import { MultiSelect, Field } from "tensile";

const options = [
  {
    label: "Cheese",
    options: [
      { value: "mozzarella", label: "Mozzarella" },
      { value: "gorgonzola", label: "Gorgonzola" },
      { value: "parmesan", label: "Parmesan" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "mushrooms", label: "Mushrooms" },
      { value: "olives", label: "Olives, sold out", disabled: true },
      { value: "peppers", label: "Peppers" },
    ],
  },
  {
    label: "Meat",
    options: [
      { value: "ham", label: "Ham" },
      { value: "salami", label: "Salami, sold out", disabled: true },
    ],
  },
];

export function MultiSelectGroupsDemo() {
  const [value, setValue] = useState<string[]>(["mozzarella"]);

  return (
    <Field label="Toppings" description="Sold-out toppings can't be added." className="w-full max-w-sm">
      <MultiSelect options={options} value={value} onValueChange={setValue} />
    </Field>
  );
}
