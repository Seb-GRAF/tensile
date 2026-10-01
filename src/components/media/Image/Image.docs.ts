import { ImageDemo } from "./demos/ImageDemo";
import imageDemoCode from "./demos/ImageDemo.tsx?raw";
import { ImageFallbackDemo } from "./demos/ImageFallbackDemo";
import imageFallbackDemoCode from "./demos/ImageFallbackDemo.tsx?raw";

export default {
  description: "Display an image with a loading surface and error fallback.",
  usage: "Provide src and meaningful alt text. Size and round the outer box with className.",
  anatomy: "A sized span with an inset line ring holds a native img that covers the box, so the box keeps an edge while it is empty. Failed images are replaced by fallback content.",
  notes: [
    "Use alt=\"\" for decorative images.",
    "The fallback replaces the img; include accessible text in it when the image’s meaning matters."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A photo sized and rounded by className that fades in over the placeholder once it loads; the usual way to show an image.", Demo: ImageDemo, code: imageDemoCode },
    { id: "fallback", title: "Fallback", description: "A source that fails to load, so the fallback shows in its place; use it for remote or user-supplied images that may be missing.", Demo: ImageFallbackDemo, code: imageFallbackDemoCode },
  ],
  keyboard: [],
  related: [
    "Avatar",
    "Lightbox"
  ],
  props: {
    "alt": "Image alternative text; use an empty string for decorative images.",
    "className": "Sizes and rounds the box, e.g. `aspect-video w-full rounded-card`; the image covers it.",
    "onLoad": "Native image load handler, after the fade starts.",
    "onError": "Native image error handler, after switching to fallback.",
    "fallback": "Shown, centered, in place of the image if it fails to load.",
    "src": "Image source URL. A new src starts over: the placeholder shows until it loads or fails."
  },
};
