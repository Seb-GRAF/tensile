import { WizardStepsDemo } from "./demos/WizardStepsDemo";
import wizardStepsDemoCode from "./demos/WizardStepsDemo.tsx?raw";
import { WizardStepsIconsDemo } from "./demos/WizardStepsIconsDemo";
import wizardStepsIconsDemoCode from "./demos/WizardStepsIconsDemo.tsx?raw";

export default {
  description: "Display progress through a sequence of steps.",
  usage: "Pass at least two steps and a zero-based current index. Your form or page owns navigation and validation.",
  anatomy: "An ordered list marks completed, current and upcoming steps. A progress line joins the step markers and draws to the next one, which fills as the line arrives. It has no surface of its own; place it in a Card.",
  notes: [
    "Steps are display-only. Supply separate previous and next controls.",
    "Long visible labels truncate while the full text remains accessible."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Progress through a multi-step form, driven by your own Back and Next buttons.", Demo: WizardStepsDemo, code: wizardStepsDemoCode },
    { id: "icons", title: "With icons", description: "Steps with an icon beside each label.", Demo: WizardStepsIconsDemo, code: wizardStepsIconsDemoCode },
  ],
  keyboard: [],
  related: [
    "ProgressBar",
    "Button"
  ],
  props: {
    "steps": "Ordered steps with labels and optional icons.",
    "value": "Index of the current step.",
    "doneLabel": "Read out after the label of a finished step.",
    "currentLabel": "Read out after the label of the current step.",
    "upcomingLabel": "Read out after the label of a step not reached yet.",
    "className": "Classes on the outer element, for width and placement. It has no surface of its own; put it in a Card."
  },
};
