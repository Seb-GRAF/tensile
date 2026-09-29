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
    { id: "usage", title: "Basic usage", description: "Group related fields under a legend.", Demo: FieldsetDemo, code: fieldsetDemoCode },
    { id: "disabled", title: "Disabled", description: "Disable all enclosed controls.", Demo: FieldsetDisabledDemo, code: fieldsetDisabledDemoCode },
    { id: "error", title: "Validation", description: "Group description and validation error.", Demo: FieldsetErrorDemo, code: fieldsetErrorDemoCode },
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
    "className": "Additional classes on the outer element."
  },
};
