import { PageHeaderDemo } from "./demos/PageHeaderDemo";
import pageHeaderDemoCode from "./demos/PageHeaderDemo.tsx?raw";
import { PageHeaderActionsDemo } from "./demos/PageHeaderActionsDemo";
import pageHeaderActionsDemoCode from "./demos/PageHeaderActionsDemo.tsx?raw";

export default {
  description: "Introduce a page with its title and actions.",
  usage: "Pass a title, optional description, breadcrumbs and page actions.",
  anatomy: "An h1 names the page. Breadcrumbs sit above it. Actions wrap below in narrow containers.",
  notes: [
    "Use one PageHeader for the page’s primary heading."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A page title with one line of description, for pages without actions.", Demo: PageHeaderDemo, code: pageHeaderDemoCode },
    { id: "actions", title: "Actions", description: "Breadcrumbs above the title and buttons beside it, for detail pages where the main actions belong to the whole page.", Demo: PageHeaderActionsDemo, code: pageHeaderActionsDemoCode },
  ],
  keyboard: [],
  related: [
    "Breadcrumbs",
    "Header"
  ],
  props: {
    "title": "The page’s h1.",
    "description": "Muted text under the title that says what the page is for.",
    "breadcrumbs": "Navigation shown above the title.",
    "actions": "Page-level controls, usually Buttons.",
    "className": "Placement of the header, such as its margin."
  },
};
