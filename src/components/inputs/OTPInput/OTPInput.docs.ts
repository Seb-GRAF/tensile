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
    { id: "usage", title: "Basic usage", description: "A six-digit code with the value in the parent's state; pasting a code fills every slot. Use it for codes sent by text or email.", Demo: OTPInputDemo, code: oTPInputDemoCode },
    { id: "length", title: "Code length", description: "`length={4}` shows four slots. Set it to match the codes your service sends.", Demo: OTPInputLengthDemo, code: oTPInputLengthDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the code as one value, and the Field shows an error until all digits are in.", Demo: OTPInputFormDemo, code: oTPInputFormDemoCode },
    { id: "disabled", title: "Disabled", description: "The slots are dimmed and can't be focused. Use it while a new code is on its way.", Demo: OTPInputDisabledDemo, code: oTPInputDisabledDemoCode },
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
    "value": "The digits entered so far. Pass it to control OTPInput; leave it out and OTPInput keeps its own code.",
    "defaultValue": "The code OTPInput starts with when it keeps its own code.",
    "onValueChange": "Called with the whole code each time a digit is typed, deleted or pasted.",
    "length": "Number of digit cells.",
    "label": "Names the group of slots for screen readers when no Field labels it.",
    "cellLabel": "Names each slot, given its position from 1 and the code length, e.g. \"Digit 2 of 6\".",
    "id": "Control ID; Field supplies an ID when it wraps this control.",
    "name": "Name used for the submitted form value.",
    "disabled": "Dims the slots and disables their inputs; the hidden input is left out of the form. A disabled Field or Fieldset does the same.",
    "required": "Expose the required state. See the form example for validation.",
    "className": "Classes for the outer box, to place it in a layout."
  },
};
