import { AccordionDemo } from "./demos/AccordionDemo";
import accordionDemoCode from "./demos/AccordionDemo.tsx?raw";
import { AccordionIconsDemo } from "./demos/AccordionIconsDemo";
import accordionIconsDemoCode from "./demos/AccordionIconsDemo.tsx?raw";
import { AccordionMultipleDemo } from "./demos/AccordionMultipleDemo";
import accordionMultipleDemoCode from "./demos/AccordionMultipleDemo.tsx?raw";

export default {
  description: "Reveal sections of supporting content, one at a time or several at once.",
  usage: "Keep the open item’s value in state, or null to close every section. With type=\"multiple\", keep an array of open values instead.",
  anatomy: "Each header button controls a labeled region. An optional icon appears before the header text; long header text truncates to one line.",
  notes: [
    "By default, opening one item closes the previous one; with type=\"multiple\", each item opens and closes on its own.",
    "Closed panels remain mounted but inert, preserving their local state."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Two questions where opening one closes the other, for FAQs and settings where one answer at a time is enough.", Demo: AccordionDemo, code: accordionDemoCode },
    { id: "icons", title: "With icons", description: "An icon before a header label, to help people scan a long list of sections.", Demo: AccordionIconsDemo, code: accordionIconsDemoCode },
    { id: "multiple", title: "Several open", description: "Sections that open and close independently, for when people compare answers or keep several open while they work.", Demo: AccordionMultipleDemo, code: accordionMultipleDemoCode },
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
    "type": "\"single\" (default) keeps at most one item open; \"multiple\" lets several stay open and makes the value an array.",
    "value": "The open item’s value, or null when all are closed; with type=\"multiple\", the array of open values. Set it to control the accordion.",
    "defaultValue": "The item open at first when value isn’t set (null by default; [] with type=\"multiple\").",
    "onValueChange": "Called with the new open value, or array of values, when a header is pressed.",
    "className": "Width, margin and placement of the list of items."
  },
};
