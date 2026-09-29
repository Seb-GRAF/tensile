import { AccordionDemo } from "./demos/AccordionDemo";
import accordionDemoCode from "./demos/AccordionDemo.tsx?raw";
import { AccordionIconsDemo } from "./demos/AccordionIconsDemo";
import accordionIconsDemoCode from "./demos/AccordionIconsDemo.tsx?raw";

export default {
  description: "Reveal one section of supporting content at a time.",
  usage: "Keep the open item’s value in state, or null to close every section.",
  anatomy: "Each header button controls a labeled region. An optional icon appears before the header text; long header text truncates to one line.",
  notes: [
    "Opening one item closes the previous one.",
    "Closed panels remain mounted but inert, preserving their local state."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled single-open disclosures.", Demo: AccordionDemo, code: accordionDemoCode },
    { id: "icons", title: "With icons", description: "Disclosure labels with icons.", Demo: AccordionIconsDemo, code: accordionIconsDemoCode },
  ],
  keyboard: [
    {
      "key": "Up / Down / Home / End",
      "description": "Move focus between headers."
    },
    {
      "key": "Enter / Space",
      "description": "Open or close the focused section."
    }
  ],
  related: [
    "Tabs",
    "ExpandableCard"
  ],
  props: {
    "items": "Sections with unique values, labels, content and optional icons.",
    "value": "Current value, controlled by the parent.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "className": "Additional classes on the outer element."
  },
};
