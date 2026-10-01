import { FieldsetDemo } from "./demos/FieldsetDemo";
import fieldsetDemoCode from "./demos/FieldsetDemo.tsx?raw";
import { FieldsetDisabledDemo } from "./demos/FieldsetDisabledDemo";
import fieldsetDisabledDemoCode from "./demos/FieldsetDisabledDemo.tsx?raw";
import { FieldsetErrorDemo } from "./demos/FieldsetErrorDemo";
import fieldsetErrorDemoCode from "./demos/FieldsetErrorDemo.tsx?raw";

export default {
  description: "A native fieldset for related controls.",
  usage: "Place Fields or a choice group inside Fieldset and name the group with legend.",
  anatomy: "A native fieldset and legend provide group semantics; disabled state is also shared with custom controls.",
  notes: [
    "Descriptions and errors describe the group. Each individual control still needs its own accessible name."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Notification channels under a legend and a description. Use a Fieldset when several controls answer one question.", Demo: FieldsetDemo, code: fieldsetDemoCode },
    { id: "disabled", title: "Disabled", description: "`disabled` on the Fieldset disables every control inside it, native or Field-aware, with no prop on each.", Demo: FieldsetDisabledDemo, code: fieldsetDisabledDemoCode },
    { id: "error", title: "Validation", description: "The error shows under the group while no channel is picked and clears once one is. Use it for rules about the group as a whole.", Demo: FieldsetErrorDemo, code: fieldsetErrorDemoCode },
  ],
  keyboard: [],
  related: [
    "Field",
    "CheckboxGroup"
  ],
  props: {
    "legend": "Visible name of the group.",
    "description": "Supporting content explaining the control or group.",
    "error": "Validation message supplied by the application.",
    "disabled": "Disable native descendants and Field-aware controls.",
    "children": "The related controls.",
    "className": "Classes for the `<fieldset>`, to set its width or place it in a form layout."
  },
};
