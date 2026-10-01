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
    { id: "usage", title: "Basic usage", description: "A portrait named after the person; use it wherever a person with a photo appears.", Demo: AvatarDemo, code: avatarDemoCode },
    { id: "initials", title: "Initials", description: "Ink initials from the name, shown when there is no photo or it fails to load.", Demo: AvatarInitialsDemo, code: avatarInitialsDemoCode },
    { id: "sizes", title: "Sizes", description: "The 24, 32 and 44 px sizes, for inline text, list rows and profile headers.", Demo: AvatarSizesDemo, code: avatarSizesDemoCode },
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
    "className": "Classes on the circle, for margin and placement; `size` sets its size."
  },
};
