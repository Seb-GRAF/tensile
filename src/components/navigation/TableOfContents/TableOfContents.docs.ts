import { TableOfContentsDemo } from "./demos/TableOfContentsDemo";
import tableOfContentsDemoCode from "./demos/TableOfContentsDemo.tsx?raw";
import { TableOfContentsSubsectionsDemo } from "./demos/TableOfContentsSubsectionsDemo";
import tableOfContentsSubsectionsDemoCode from "./demos/TableOfContentsSubsectionsDemo.tsx?raw";

export default {
  description: "Link to the sections of a page and mark the one being read.",
  usage: "Pass the ids and labels of the page's sections in page order. Give the sections a scroll-margin-top below your sticky header, and set offset at or just below it.",
  anatomy: "A nav named by its visible heading holds a list of fragment links, with subsections in a nested list. One ink marker on the left rule springs to the current link and takes its height. The current section is the last whose top has passed the offset line; at the bottom of the page the last section is current.",
  notes: [
    "The links are native fragment links, so the browser scrolls and moves focus, also inside a LinkProvider.",
    "A clicked link becomes current at once, and stays current while the page scrolls to it.",
    "aria-current=\"location\" marks the current link.",
    "The current section follows the page's scroll position, so it isn't a prop.",
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Scroll the page or click a link: the marker follows the section you're reading.", Demo: TableOfContentsDemo, code: tableOfContentsDemoCode },
    { id: "subsections", title: "Subsections", description: "One level of nested sections, indented under their parent.", Demo: TableOfContentsSubsectionsDemo, code: tableOfContentsSubsectionsDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Move between the links."
    },
    {
      "key": "Enter",
      "description": "Scroll to the focused section."
    }
  ],
  related: [
    "Link",
    "SidebarNav",
    "PageHeader"
  ],
  props: {
    "items": "Sections of the page by element id, in page order, each with a label and optionally one level of subsections.",
    "label": "The visible heading, which also names the navigation landmark.",
    "offset": "Distance in px from the top of the viewport to the line a section's top passes to become current. Set it at or below the sections' scroll-margin-top.",
    "className": "Classes on the nav element, for placement, such as `sticky top-16`.",
  },
};
