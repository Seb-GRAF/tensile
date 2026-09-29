import { LinkDemo } from "./demos/LinkDemo";
import linkDemoCode from "./demos/LinkDemo.tsx?raw";
import { LinkProviderDemo } from "./demos/LinkProviderDemo";
import linkProviderDemoCode from "./demos/LinkProviderDemo.tsx?raw";

export default {
  description: "Navigate with a native anchor.",
  usage: "Set href to a destination. Wrap navigation in LinkProvider and pass your router’s navigate function for client-side routing.",
  anatomy: "A native anchor carries href and standard link attributes. LinkProvider intercepts eligible same-origin clicks.",
  notes: [
    "Modified clicks, external links, downloads and new-tab targets keep native behavior.",
    "Fragment links scroll natively.",
    "The provider example reports the destination locally; connect navigate to your router in an application."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Ordinary destination and fragment links.", Demo: LinkDemo, code: linkDemoCode },
    { id: "provider", title: "Provider", description: "LinkProvider integration with local navigation.", Demo: LinkProviderDemo, code: linkProviderDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter",
      "description": "Follow the focused link."
    }
  ],
  related: [
    "Breadcrumbs",
    "SidebarNav"
  ],
  props: {
    "href": "Destination URL or fragment.",
    "className": "Additional classes on the outer element.",
    "onClick": "Native click handler. preventDefault skips navigation."
  },
};
