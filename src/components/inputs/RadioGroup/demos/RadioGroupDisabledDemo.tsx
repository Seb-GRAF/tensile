import { useState } from "react";
import { RadioGroup } from "tensile";

const options = [
  { value: "starter", label: "Starter" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise", disabled: true },
];

export function RadioGroupDisabledDemo() {
  const [plan, setPlan] = useState("starter");
  const [lockedPlan, setLockedPlan] = useState("team");

  return (
    <div className="grid gap-5">
      <RadioGroup
        label="Available plans"
        options={options}
        value={plan}
        onValueChange={setPlan}
      />
      <RadioGroup
        label="Locked plan"
        options={options}
        value={lockedPlan}
        onValueChange={setLockedPlan}
        disabled
      />
    </div>
  );
}
