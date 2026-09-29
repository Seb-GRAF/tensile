import { AvatarDemo } from "./demos/AvatarDemo";
import avatarDemoCode from "./demos/AvatarDemo.tsx?raw";
import { AvatarInitialsDemo } from "./demos/AvatarInitialsDemo";
import avatarInitialsDemoCode from "./demos/AvatarInitialsDemo.tsx?raw";
import { AvatarSizesDemo } from "./demos/AvatarSizesDemo";
import avatarSizesDemoCode from "./demos/AvatarSizesDemo.tsx?raw";

export default {
  description: "Represent a person with a portrait or initials.",
  usage: "Provide a non-empty name. Add src when a portrait is available.",
  anatomy: "Image displays the portrait. Initials provide the fallback and accessible name.",
  notes: [
    "Missing or failed images show initials from the first and last words of the name.",
    "Sizes are 24, 32 and 44 pixels."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Image with an accessible name.", Demo: AvatarDemo, code: avatarDemoCode },
    { id: "initials", title: "Initials", description: "Initials without an image.", Demo: AvatarInitialsDemo, code: avatarInitialsDemoCode },
    { id: "sizes", title: "Sizes", description: "Small, medium and large sizes.", Demo: AvatarSizesDemo, code: avatarSizesDemoCode },
  ],
  keyboard: [],
  related: [
    "AvatarGroup",
    "Image"
  ],
  props: {
    "name": "The accessible name, and the source of the initials.",
    "src": "Portrait image URL; initials appear when it is absent or fails.",
    "size": "24, 32 or 44 px.",
    "className": "Additional classes on the outer element."
  },
};
