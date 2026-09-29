import { OTPInputDemo } from "./demos/OTPInputDemo";
import oTPInputDemoCode from "./demos/OTPInputDemo.tsx?raw";
import { OTPInputLengthDemo } from "./demos/OTPInputLengthDemo";
import oTPInputLengthDemoCode from "./demos/OTPInputLengthDemo.tsx?raw";
import { OTPInputFormDemo } from "./demos/OTPInputFormDemo";
import oTPInputFormDemoCode from "./demos/OTPInputFormDemo.tsx?raw";
import { OTPInputDisabledDemo } from "./demos/OTPInputDisabledDemo";
import oTPInputDisabledDemoCode from "./demos/OTPInputDisabledDemo.tsx?raw";

export default {
  description: "Digit cells for a one-time verification code.",
  usage: "Control a string of digits and choose the code length.",
  anatomy: "One pill holds a native text input per digit; a highlight slides under the active digit, and an optional hidden input carries the named value.",
  notes: [
    "Paste fills the cells with digits. The default length is six.",
    "required exposes required semantics; validate the complete code length in your submit handler as shown in the form demo.",
    "Six digits occupy 272px. These demos allow local horizontal scrolling in narrower containers."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled one-time code with paste support.", Demo: OTPInputDemo, code: oTPInputDemoCode },
    { id: "length", title: "Code length", description: "Custom code length.", Demo: OTPInputLengthDemo, code: oTPInputLengthDemoCode },
    { id: "form", title: "In a form", description: "Field validation and named form value.", Demo: OTPInputFormDemo, code: oTPInputFormDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled code entry.", Demo: OTPInputDisabledDemo, code: oTPInputDisabledDemoCode },
  ],
  keyboard: [
    {
      "key": "Digits",
      "description": "Fill a cell and advance."
    },
    {
      "key": "Backspace",
      "description": "Delete and move back."
    },
    {
      "key": "ArrowLeft / ArrowRight",
      "description": "Move between available cells."
    }
  ],
  related: [
    "Field",
    "PasswordInput"
  ],
  props: {
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "length": "Number of digit cells.",
    "label": "Accessible name of the control or region.",
    "cellLabel": "Accessible name for each one-based cell position and total length.",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Disable interaction with this control.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Additional classes on the outer element."
  },
};
