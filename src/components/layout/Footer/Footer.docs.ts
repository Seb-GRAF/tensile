import { FooterDemo } from "./demos/FooterDemo";
import footerDemoCode from "./demos/FooterDemo.tsx?raw";

export default {
  description: "Group secondary navigation and a closing note.",
  usage: "Pass titled link groups and optional note content. Use LinkProvider for client-side routing.",
  anatomy: "A footer holds an ink Card, at most the page width and centered, with named navigation groups. Separator divides the optional note from the links.",
  notes: [
    "Columns respond to the footer’s own width: stacked below 448px, two columns from 448px, then a row from 768px.",
    "The card has no outer margin; place it with className, such as m-3."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Two titled link groups and a copyright note, the usual end of a marketing or docs page.", Demo: FooterDemo, code: footerDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab / Enter",
      "description": "Focus and follow a link."
    }
  ],
  related: [
    "Header",
    "Link"
  ],
  props: {
    "groups": "Distinct group titles with labeled destination links.",
    "note": "Small print under a separator below the link groups, such as a copyright line.",
    "label": "Names the footer's link navigation.",
    "className": "Placement of the footer, such as its margin; it has none of its own."
  },
};
