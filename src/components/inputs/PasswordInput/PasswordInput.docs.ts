import { PasswordInputDemo } from "./demos/PasswordInputDemo";
import passwordInputDemoCode from "./demos/PasswordInputDemo.tsx?raw";
import { PasswordInputFormDemo } from "./demos/PasswordInputFormDemo";
import passwordInputFormDemoCode from "./demos/PasswordInputFormDemo.tsx?raw";
import { PasswordInputDisabledDemo } from "./demos/PasswordInputDisabledDemo";
import passwordInputDisabledDemoCode from "./demos/PasswordInputDisabledDemo.tsx?raw";

export default {
  description: "A password input with a named visibility toggle.",
  usage: "Store the value in React state and pass its setter to onValueChange.",
  anatomy: "The outer surface contains a native input with the design-system focus and error treatment. The eye button blurs the text out, switches the input between password and text, and blurs it back in.",
  notes: [
    "Native input attributes such as name and autoComplete pass through. Reset controlled values in the form’s onReset handler.",
    "Use Field for a visible label, description and error. Without Field, provide an accessible name directly."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A password field labelled by a Field; the eye button shows or hides what was typed. Use it for any password entry.", Demo: PasswordInputDemo, code: passwordInputDemoCode },
    { id: "form", title: "In a form", description: "Inside a form, `name` submits the password; Reset clears it through the parent's state.", Demo: PasswordInputFormDemo, code: passwordInputFormDemoCode },
    { id: "disabled", title: "Disabled", description: "The field and its eye button are dimmed and can't be used. Use it while the password can't be changed.", Demo: PasswordInputDisabledDemo, code: passwordInputDisabledDemoCode },
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
    "ref": "Ref to the native input, for focus and selection.",
    "autoComplete": "Native autocomplete hint.",
    "disabled": "Disables the native input and the eye button, and dims the pill; a disabled Field or Fieldset does the same.",
    "value": "The password. Pass it to control PasswordInput; leave it out and it keeps its own text.",
    "defaultValue": "The text PasswordInput starts with when it keeps its own text.",
    "onValueChange": "Called with the new text when the user types.",
    "leading": "Content before the password.",
    "trailing": "Additional content before the visibility button.",
    "showLabel": "Names the eye button while the password is hidden.",
    "hideLabel": "Names the eye button while the password is shown.",
    "name": "Native form field name.",
    "required": "Use native required validation.",
    "className": "Classes for the pill around the input, to set its width or place it; other props go to the input.",
    "style": "Inline styles on the outer surface."
  },
};
