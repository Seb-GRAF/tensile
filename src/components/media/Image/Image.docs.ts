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
    { id: "usage", title: "Basic usage", description: "Sized image with alt text.", Demo: ImageDemo, code: imageDemoCode },
    { id: "fallback", title: "Fallback", description: "Failed image with explicit fallback content.", Demo: ImageFallbackDemo, code: imageFallbackDemoCode },
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
    "src": "Image source URL."
  },
};
