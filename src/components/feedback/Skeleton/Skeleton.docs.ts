import { SkeletonDemo } from "./demos/SkeletonDemo";
import skeletonDemoCode from "./demos/SkeletonDemo.tsx?raw";
import { SkeletonCardDemo } from "./demos/SkeletonCardDemo";
import skeletonCardDemoCode from "./demos/SkeletonCardDemo.tsx?raw";
import { SkeletonMediaDemo } from "./demos/SkeletonMediaDemo";
import skeletonMediaDemoCode from "./demos/SkeletonMediaDemo.tsx?raw";
import { SkeletonListDemo } from "./demos/SkeletonListDemo";
import skeletonListDemoCode from "./demos/SkeletonListDemo.tsx?raw";

export default {
  description: "Reserve the shape of content while it loads.",
  usage: "Pick a variant for the content it stands in for and set its size with utility classes: `text` for lines of text, `circle` for an avatar, `media` for an image or video, `block` for anything else. Build the same rough layout as the content it replaces.",
  anatomy: "A decorative div uses the shared shimmer animation. The `text` variant holds one 16 px bar per line, the last one two thirds wide.",
  notes: [
    "Skeleton is aria-hidden. Name the busy region or supply a separate loading status.",
    "Reduced motion stops the shimmer."
  ],
  examples: [
    { id: "usage", title: "Text", description: "The text variant with three lines, to hold a paragraph's place while it loads.", Demo: SkeletonDemo, code: skeletonDemoCode },
    { id: "card", title: "Avatar", description: "A circle for the avatar beside two lines of text, inside a named busy region; use it when the loaded layout is known, so nothing shifts when content arrives.", Demo: SkeletonCardDemo, code: skeletonCardDemoCode },
    { id: "media", title: "Media", description: "A media block with the card radius over two lines of text, as for an article card.", Demo: SkeletonMediaDemo, code: skeletonMediaDemoCode },
    { id: "list", title: "List rows", description: "Rows of a list built from a circle, two lines and a block for the trailing time.", Demo: SkeletonListDemo, code: skeletonListDemoCode },
  ],
  keyboard: [],
  related: [
    "LoadingState",
    "Card"
  ],
  props: {
    "variant": "`block` (default) takes its size and radius from className; `text` draws lines of text; `circle` is round; `media` has the card radius.",
    "lines": "Number of lines for the text variant. Defaults to 1.",
    "className": "Size, and the radius of a block, e.g. `h-4 w-48 rounded-full`. A circle needs a width, media a size such as `aspect-video w-full`."
  },
};
