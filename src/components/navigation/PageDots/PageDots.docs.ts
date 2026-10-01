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
    { id: "usage", title: "Basic usage", description: "Dots that pick the visible slide, by press, drag or arrow keys.", Demo: PageDotsDemo, code: pageDotsDemoCode },
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
    "value": "The current page, from 0. Leave it out to let the dots track it, starting from defaultValue.",
    "defaultValue": "The first page shown when the dots track the page themselves.",
    "onValueChange": "Called with the page a press, a drag or an arrow key picks.",
    "label": "Accessible name of the slider.",
    "pageLabel": "Text for the current page; `page` counts from 1.",
    "className": "Classes on the dots' row, for placement. It has no surface; put it on one if it needs it."
  },
};
