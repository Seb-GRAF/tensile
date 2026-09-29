import { CopyButtonDemo } from "./demos/CopyButtonDemo";
import copyButtonCode from "./demos/CopyButtonDemo.tsx?raw";
import { CopyButtonLabelsDemo } from "./demos/CopyButtonLabelsDemo";
import labelsCode from "./demos/CopyButtonLabelsDemo.tsx?raw";

export default {
  description: "A copy action that confirms when text has been written to the clipboard.",
  usage: "Pass the exact text to copy through value. CopyButton manages its own success state; customize label for the action name and copiedLabel for the confirmation.",
  anatomy: "CopyButton renders a native button and a screen-reader status message. The icon button expands to show a check and the confirmation text after a successful copy.",
  notes: [
    "The success message remains for 1.5 seconds before the copy icon returns. The confirmation is also announced through a status region.",
    "CopyButton calls navigator.clipboard.writeText. Use it in a secure browser context such as HTTPS or localhost, where clipboard access is permitted.",
    "The component currently has no failure message or error callback for a rejected clipboard write.",
  ],
  examples: [
    { id: "usage", title: "Copy text", description: "Copy the installation command shown beside the button.", Demo: CopyButtonDemo, code: copyButtonCode },
    { id: "labels", title: "Custom labels", description: "Name the specific copy action and customize its visible success message.", Demo: CopyButtonLabelsDemo, code: labelsCode },
  ],
  keyboard: [
    { key: "Tab", description: "Focus the copy button." },
    { key: "Enter / Space", description: "Copy the provided value to the clipboard." },
  ],
  related: ["Button", "IconButton"],
  props: {
    value: "The exact text written to the clipboard.",
    label: "Accessible name of the copy action before success.",
    copiedLabel: "Visible and announced confirmation after a successful copy.",
    className: "Additional classes on the animated button.",
  },
};
