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
    { id: "usage", title: "Basic usage", description: "Items without an href are buttons that call onNavigate, for a trail inside an app view.", Demo: BreadcrumbsDemo, code: breadcrumbsDemoCode },
    { id: "links", title: "Links", description: "Items with an href are links, so the trail works as ordinary page navigation.", Demo: BreadcrumbsLinksDemo, code: breadcrumbsLinksDemoCode },
    { id: "collapsed", title: "Collapsed", description: "A long trail shows its ends and hides the middle behind a pill that expands on click.", Demo: BreadcrumbsCollapsedDemo, code: breadcrumbsCollapsedDemoCode },
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
    "label": "Accessible name of the navigation landmark, so it differs from your main navigation.",
    "expandLabel": "Accessible name of the hidden-trail button.",
    "itemsBeforeCollapse": "Items shown before the \"…\" pill.",
    "itemsAfterCollapse": "Items shown after the \"…\" pill, the current page included.",
    "className": "Classes on the nav element, for placement and to limit its width."
  },
};
