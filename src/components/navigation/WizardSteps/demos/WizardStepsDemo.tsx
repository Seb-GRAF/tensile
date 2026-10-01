import { useState } from "react";
import { WizardSteps, Button, Card } from "tensile";

const steps = [{ label: "Account" }, { label: "Details" }, { label: "Review" }];

export function WizardStepsDemo() {
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
