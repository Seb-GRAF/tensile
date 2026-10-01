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
    "The provider example reports the destination locally; connect navigate to your router in an application.",
    "Links in running text keep their underline. Links in a navigation list or a footer column can drop it with underline={false}. For a link that looks like a button, use Button with an href."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A link in running text to another page, and one to a section of the same page.", Demo: LinkDemo, code: linkDemoCode },
    { id: "provider", title: "Provider", description: "LinkProvider hands same-origin clicks to a navigate function, as you would wire it to your router.", Demo: LinkProviderDemo, code: linkProviderDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter",
      "description": "Follow the focused link."
    }
  ],
  related: [
    "Button",
    "Breadcrumbs",
    "SidebarNav"
  ],
  props: {
    "href": "Destination URL or fragment.",
    "underline": "Draw the underline (the default). Set it to false for links in navigation lists and footers, where their position already shows they are links.",
    "className": "Classes on the native link, for placement or text size, such as `text-label`.",
    "onClick": "Native click handler. preventDefault skips navigation."
  },
};
