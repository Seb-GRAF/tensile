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
    { id: "usage", title: "Basic usage", description: "Title and description.", Demo: PageHeaderDemo, code: pageHeaderDemoCode },
    { id: "actions", title: "Actions", description: "Breadcrumbs and working page actions.", Demo: PageHeaderActionsDemo, code: pageHeaderActionsDemoCode },
  ],
  keyboard: [],
  related: [
    "Breadcrumbs",
    "Header"
  ],
  props: {
    "title": "Title displayed by the component.",
    "description": "Supporting content explaining the control or group.",
    "breadcrumbs": "Navigation shown above the title.",
    "actions": "Page-level controls, usually Buttons.",
    "className": "Additional classes on the outer element."
  },
};
