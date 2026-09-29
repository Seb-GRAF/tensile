import { AvatarGroupDemo } from "./demos/AvatarGroupDemo";
import avatarGroupDemoCode from "./demos/AvatarGroupDemo.tsx?raw";
import { AvatarGroupOverflowDemo } from "./demos/AvatarGroupOverflowDemo";
import avatarGroupOverflowDemoCode from "./demos/AvatarGroupOverflowDemo.tsx?raw";
import { AvatarGroupSizesDemo } from "./demos/AvatarGroupSizesDemo";
import avatarGroupSizesDemoCode from "./demos/AvatarGroupSizesDemo.tsx?raw";

export default {
  description: "Show an overlapping group of people.",
  usage: "Pass people with distinct names and optional portrait URLs. Use max to limit the visible avatars.",
  anatomy: "A named list contains Avatar items. A final circle reports the number of additional people.",
  notes: [
    "The overflow circle is a count, not an interactive menu.",
    "Use size to match the surrounding density."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Named group of people.", Demo: AvatarGroupDemo, code: avatarGroupDemoCode },
    { id: "overflow", title: "Overflow", description: "Max count and custom overflow label.", Demo: AvatarGroupOverflowDemo, code: avatarGroupOverflowDemoCode },
    { id: "sizes", title: "Sizes", description: "Supported avatar sizes.", Demo: AvatarGroupSizesDemo, code: avatarGroupSizesDemoCode },
  ],
  keyboard: [],
  related: [
    "Avatar",
    "Tooltip"
  ],
  props: {
    "people": "People with distinct names and optional portrait URLs.",
    "max": "How many avatars show before the rest collapse into a \"+N\" circle.",
    "size": "Avatar size: sm (24px), md (32px), or lg (44px).",
    "label": "Accessible name of the list.",
    "moreLabel": "Accessible name of the \"+N\" circle.",
    "className": "Additional classes on the outer element."
  },
};
