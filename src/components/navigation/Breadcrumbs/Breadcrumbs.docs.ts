import { BreadcrumbsDemo } from "./demos/BreadcrumbsDemo";
import breadcrumbsDemoCode from "./demos/BreadcrumbsDemo.tsx?raw";
import { BreadcrumbsLinksDemo } from "./demos/BreadcrumbsLinksDemo";
import breadcrumbsLinksDemoCode from "./demos/BreadcrumbsLinksDemo.tsx?raw";
import { BreadcrumbsCollapsedDemo } from "./demos/BreadcrumbsCollapsedDemo";
import breadcrumbsCollapsedDemoCode from "./demos/BreadcrumbsCollapsedDemo.tsx?raw";
import { BreadcrumbsSiblingsDemo } from "./demos/BreadcrumbsSiblingsDemo";
import breadcrumbsSiblingsDemoCode from "./demos/BreadcrumbsSiblingsDemo.tsx?raw";

export default {
  description: "Show the path to the current page.",
  usage: "Pass the ordered trail; the last item is current. Add href for destinations or handle onNavigate for local navigation. Give a crumb siblings to let people jump to the other pages at its level.",
  anatomy: "A named navigation contains an ordered trail. The current page is non-interactive. The ellipsis opens hidden middle items in a menu. A crumb with siblings is followed by a separate chevron button that grows into a menu of them.",
  notes: [
    "Opening a menu moves focus into its page list; Escape returns focus to its button.",
    "The trail fits its container: when it is too narrow, the ancestors truncate first and the current page last. Hidden pages open in a vertical menu so their names remain readable on phones.",
    "Siblings with an href are links in the menu, routed through LinkProvider like the crumbs; siblings without one call onNavigate.",
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Items without an href are buttons that call onNavigate, for a trail inside an app view.", Demo: BreadcrumbsDemo, code: breadcrumbsDemoCode },
    { id: "links", title: "Links", description: "Items with an href are links, so the trail works as ordinary page navigation.", Demo: BreadcrumbsLinksDemo, code: breadcrumbsLinksDemoCode },
    { id: "collapsed", title: "Collapsed", description: "A long trail shows its ends and hides the middle behind an ellipsis that opens a page menu.", Demo: BreadcrumbsCollapsedDemo, code: breadcrumbsCollapsedDemoCode },
    { id: "siblings", title: "Siblings", description: "A chevron after a crumb opens a menu of the other pages at its level: links for a project, actions for a section.", Demo: BreadcrumbsSiblingsDemo, code: breadcrumbsSiblingsDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter",
      "description": "Follow a link."
    },
    {
      "key": "Enter / Space",
      "description": "Activate a breadcrumb action or open the hidden-page menu."
    },
    {
      "key": "Enter / Space / Arrow Down / Arrow Up",
      "description": "On the ellipsis or a siblings chevron, open the menu at its first or last page."
    },
    {
      "key": "Arrow Down / Arrow Up / Home / End",
      "description": "In either page menu, move between pages; Enter or Space picks one, Escape closes it and returns focus to its button."
    }
  ],
  related: [
    "Link",
    "PageHeader"
  ],
  props: {
    "items": "The trail from the root; the last item is the current page. A crumb's optional `siblings` (label, icon, href) are the other pages at its level.",
    "onNavigate": "Called with an activated non-current item or sibling.",
    "label": "Accessible name of the navigation landmark, so it differs from your main navigation.",
    "expandLabel": "Accessible name of the hidden-trail button.",
    "siblingsLabel": "Names the chevron button that lists a crumb's siblings, and the menu it opens, from the crumb's label.",
    "itemsBeforeCollapse": "Items shown before the \"…\" pill.",
    "itemsAfterCollapse": "Items shown after the \"…\" pill, the current page included.",
    "className": "Classes on the nav element, for placement and to limit its width."
  },
};
