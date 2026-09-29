import { PasswordInputDemo } from "./demos/PasswordInputDemo";
import passwordInputDemoCode from "./demos/PasswordInputDemo.tsx?raw";
import { PasswordInputFormDemo } from "./demos/PasswordInputFormDemo";
import passwordInputFormDemoCode from "./demos/PasswordInputFormDemo.tsx?raw";
import { PasswordInputDisabledDemo } from "./demos/PasswordInputDisabledDemo";
import passwordInputDisabledDemoCode from "./demos/PasswordInputDisabledDemo.tsx?raw";

export default {
  description: "A password input with a named visibility toggle.",
  usage: "Store the value in React state and pass its setter to onValueChange.",
  anatomy: "The outer surface contains a native input with the design-system focus and error treatment.",
  notes: [
    "Native input attributes such as name and autoComplete pass through. Reset controlled values in the form’s onReset handler.",
    "Use Field for a visible label, description and error. Without Field, provide an accessible name directly."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled password and visibility toggle.", Demo: PasswordInputDemo, code: passwordInputDemoCode },
    { id: "form", title: "In a form", description: "Password field inside a form.", Demo: PasswordInputFormDemo, code: passwordInputFormDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled password input.", Demo: PasswordInputDisabledDemo, code: passwordInputDisabledDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Move focus into or out of the input."
    },
    {
      "key": "Typing",
      "description": "Edit the controlled text value using native text-entry keys."
    },
    {
      "key": "Enter / Space",
      "description": "Toggle password visibility when its button is focused."
    }
  ],
  related: [
    "Field",
    "Button"
  ],
  props: {
    "autoComplete": "Native autocomplete hint.",
    "disabled": "Disable the input and any built-in actions.",
    "value": "Current text value.",
    "onValueChange": "Called with the new text when the user types.",
    "leading": "Content before the password.",
    "trailing": "Additional content before the visibility button.",
    "showLabel": "Accessible name for showing the password.",
    "hideLabel": "Accessible name for hiding the password.",
    "name": "Native form field name.",
    "required": "Use native required validation.",
    "className": "Additional classes on the outer surface, not the native input.",
    "style": "Inline styles on the outer surface."
  },
};
