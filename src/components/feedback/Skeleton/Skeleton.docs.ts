import { SkeletonDemo } from "./demos/SkeletonDemo";
import skeletonDemoCode from "./demos/SkeletonDemo.tsx?raw";
import { SkeletonCardDemo } from "./demos/SkeletonCardDemo";
import skeletonCardDemoCode from "./demos/SkeletonCardDemo.tsx?raw";

export default {
  description: "Reserve the shape of content while it loads.",
  usage: "Set dimensions and radius with utility classes. Build the same rough layout as the content it replaces.",
  anatomy: "A decorative div uses the shared shimmer animation.",
  notes: [
    "Skeleton is aria-hidden. Name the busy region or supply a separate loading status.",
    "Reduced motion stops the shimmer."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Lines of placeholder text sized with className, to hold a paragraph's place while it loads.", Demo: SkeletonDemo, code: skeletonDemoCode },
    { id: "card", title: "Card", description: "A card laid out with skeletons for its avatar and text inside a named busy region; use it when the loaded layout is known, so nothing shifts when content arrives.", Demo: SkeletonCardDemo, code: skeletonCardDemoCode },
  ],
  keyboard: [],
  related: [
    "LoadingState",
    "Card"
  ],
  props: {
    "className": "Size and radius, e.g. `h-4 w-48 rounded-full`."
  },
};
