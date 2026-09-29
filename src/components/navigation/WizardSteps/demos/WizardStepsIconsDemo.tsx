import { useState } from "react";
import { WizardSteps, Button, Card, Icon } from "tensile";

const steps = [
  {
    value: "home",
    label: "Home",
    icon: (
      <Icon size={16}>
        <path d="m3 10 9-7 9 7v10H3Z" />
      </Icon>
    ),
  },
  {
    value: "projects",
    label: "Projects",
    icon: (
      <Icon size={16}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M9 5V3h6v2" />
      </Icon>
    ),
  },
  {
    value: "notes",
    label: "Notes",
    icon: (
      <Icon size={16}>
        <path d="M5 5h14M5 12h14M5 19h8" />
      </Icon>
    ),
  },
];

export function WizardStepsIconsDemo() {
  const [step, setStep] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <Card className="py-5">
        <WizardSteps steps={steps} value={step} />
      </Card>
      <div className="flex justify-center gap-2">
        <Button
          variant="secondary"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={step === steps.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
