import { PaginationDemo } from "./demos/PaginationDemo";
import paginationDemoCode from "./demos/PaginationDemo.tsx?raw";
import { PaginationLinksDemo } from "./demos/PaginationLinksDemo";
import paginationLinksDemoCode from "./demos/PaginationLinksDemo.tsx?raw";
import { PaginationSlotsDemo } from "./demos/PaginationSlotsDemo";
import paginationSlotsDemoCode from "./demos/PaginationSlotsDemo.tsx?raw";

export default {
  description: "Navigate numbered pages of content.",
  usage: "Keep a one-based page value. Fetch or slice the data in your page when it changes.",
  anatomy: "Previous and next IconButtons surround numbered slots. Ellipses replace distant pages.",
  notes: [
    "count is the number of pages, not the number of records.",
    "pageHref makes numbered pages links; previous and next remain buttons.",
    "slots must be at least five."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Buttons that change the page of a list the app slices itself.", Demo: PaginationDemo, code: paginationDemoCode },
    { id: "links", title: "Links", description: "Numbered pages as links built with pageHref, for pages that have their own URLs.", Demo: PaginationLinksDemo, code: paginationLinksDemoCode },
    { id: "slots", title: "Content slots", description: "Fewer slots for a narrow space; ellipses stand in for the pages left out.", Demo: PaginationSlotsDemo, code: paginationSlotsDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Move through page links and arrow buttons."
    },
    {
      "key": "Enter / Space",
      "description": "Activate a page button; use Enter for links."
    }
  ],
  related: [
    "DataTable",
    "PageDots",
    "Link"
  ],
  props: {
    "count": "Number of pages.",
    "value": "The current page, from 1 to count. Leave it out to let Pagination track it, starting from defaultValue.",
    "defaultValue": "The first page shown when Pagination tracks the page itself.",
    "onValueChange": "Called with the page the user picks; load or slice that page's data here.",
    "slots": "Slots for pages and ellipses, at least 5.",
    "formatPage": "Format the visible page number.",
    "label": "Accessible name of the navigation landmark.",
    "previousLabel": "Accessible label for moving backward.",
    "nextLabel": "Accessible label for moving forward.",
    "pageLabel": "Accessible name of a numbered page.",
    "pageHref": "Makes the numbered pages links; previous and next remain buttons.",
    "className": "Classes on the nav element, for placement such as `justify-self-center`."
  },
};
