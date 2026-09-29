import { BreadcrumbsDemo } from "./demos/BreadcrumbsDemo";
import breadcrumbsDemoCode from "./demos/BreadcrumbsDemo.tsx?raw";
import { BreadcrumbsLinksDemo } from "./demos/BreadcrumbsLinksDemo";
import breadcrumbsLinksDemoCode from "./demos/BreadcrumbsLinksDemo.tsx?raw";
import { BreadcrumbsCollapsedDemo } from "./demos/BreadcrumbsCollapsedDemo";
import breadcrumbsCollapsedDemoCode from "./demos/BreadcrumbsCollapsedDemo.tsx?raw";

export default {
  description: "Show the path to the current page.",
  usage: "Pass the ordered trail; the last item is current. Add href for destinations or handle onNavigate for local navigation.",
  anatomy: "A named navigation contains an ordered trail. The current page is non-interactive. A button expands hidden middle items.",
  notes: [
    "Expanding moves focus to the first revealed item.",
    "Expanding fits the trail to its container: the revealed items truncate. Collapsed, the trail keeps its intrinsic width; use a scrolling container in a narrow layout."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Action-based breadcrumb navigation.", Demo: BreadcrumbsDemo, code: breadcrumbsDemoCode },
    { id: "links", title: "Links", description: "Href-based breadcrumb navigation.", Demo: BreadcrumbsLinksDemo, code: breadcrumbsLinksDemoCode },
    { id: "collapsed", title: "Collapsed", description: "Long trail with configurable visible ends.", Demo: BreadcrumbsCollapsedDemo, code: breadcrumbsCollapsedDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter",
      "description": "Follow a link."
    },
    {
      "key": "Enter / Space",
      "description": "Activate a breadcrumb action or expand the hidden trail."
    }
  ],
  related: [
    "Link",
    "PageHeader"
  ],
  props: {
    "items": "The trail from the root; the last item is the current page.",
    "onNavigate": "Called with an activated non-current item.",
    "label": "Accessible name of the control or region.",
    "expandLabel": "Accessible name of the hidden-trail button.",
    "itemsBeforeCollapse": "Items shown before the \"…\" pill.",
    "itemsAfterCollapse": "Items shown after the \"…\" pill, the current page included.",
    "className": "Additional classes on the outer element."
  },
};
