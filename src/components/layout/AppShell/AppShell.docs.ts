import { AppShellDemo } from "./demos/AppShellDemo";
import appShellDemoCode from "./demos/AppShellDemo.tsx?raw";
import { AppShellMobileNavDemo } from "./demos/AppShellMobileNavDemo";
import appShellMobileNavDemoCode from "./demos/AppShellMobileNavDemo.tsx?raw";

export default {
  description: "Arrange application navigation around the main content.",
  usage: "Compose the header, sidebar and optional mobileNav from public components. Pass page content as children.",
  anatomy: "A skip link targets the main landmark. At 1024px and wider, the sidebar is a sticky full-height column. Below 1024px, mobileNav is fixed near the bottom.",
  notes: [
    "Give sidebar content h-full so its trailing content can sit at the bottom; SidebarNav goes in a Card.",
    "The demo frame contains fixed positioning; a real application can render AppShell directly at the page root.",
    "Avoid nesting AppShell inside another main landmark in application code."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A sidebar, a header and page content in one shell, the starting point for an app page.", Demo: AppShellDemo, code: appShellDemoCode },
    { id: "mobilenav", title: "Mobile Nav", description: "The same shell with a TabBar that replaces the sidebar below 1024 px, for apps used on phones.", Demo: AppShellMobileNavDemo, code: appShellMobileNavDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab, then Enter on Skip to content",
      "description": "Move directly to the main content."
    }
  ],
  related: [
    "Header",
    "SidebarNav",
    "TabBar",
    "PageHeader"
  ],
  props: {
    "sidebar": "A full-height column beside the page from 1024 px up, staying in view while the page scrolls; hidden below.",
    "header": "At the top of the page column.",
    "mobileNav": "Fixed to the bottom below 1024 px; hidden from there up.",
    "children": "Page content, placed in the main landmark that the skip link jumps to.",
    "skipLabel": "Text of the skip-to-main-content link.",
    "className": "Size and placement of the whole shell."
  },
};
