import { PageDotsDemo } from "./demos/PageDotsDemo";
import pageDotsDemoCode from "./demos/PageDotsDemo.tsx?raw";

export default {
  description: "Choose a page with a compact row of dots.",
  usage: "Control a zero-based value and render its matching content. Supply a count greater than zero.",
  anatomy: "One slider represents the page range. A pill marks the current dot, and the other dots make room as it slides. It draws no surface; place it on a card or in a control pill, as Carousel does.",
  notes: [
    "The value prop starts at zero; accessible page numbers start at one.",
    "Click or drag across the dots to choose a page."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled dots with matching visible content.", Demo: PageDotsDemo, code: pageDotsDemoCode },
  ],
  keyboard: [
    {
      "key": "Arrow keys",
      "description": "Choose the adjacent page."
    },
    {
      "key": "Home / End",
      "description": "Choose the first or last page."
    }
  ],
  related: [
    "Carousel",
    "Pagination"
  ],
  props: {
    "count": "Number of pages; greater than zero.",
    "value": "The current page, from 0.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "label": "Accessible name of the control or region.",
    "pageLabel": "Text for the current page; `page` counts from 1.",
    "className": "Additional classes on the outer element."
  },
};
