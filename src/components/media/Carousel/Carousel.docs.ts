import { CarouselDemo } from "./demos/CarouselDemo";
import carouselDemoCode from "./demos/CarouselDemo.tsx?raw";
import { CarouselPeekDemo } from "./demos/CarouselPeekDemo";
import carouselPeekDemoCode from "./demos/CarouselPeekDemo.tsx?raw";
import { CarouselRailDemo } from "./demos/CarouselRailDemo";
import carouselRailDemoCode from "./demos/CarouselRailDemo.tsx?raw";
import { CarouselControlsDemo } from "./demos/CarouselControlsDemo";
import carouselControlsDemoCode from "./demos/CarouselControlsDemo.tsx?raw";
import { CarouselInteractiveDemo } from "./demos/CarouselInteractiveDemo";
import carouselInteractiveDemoCode from "./demos/CarouselInteractiveDemo.tsx?raw";

export default {
  description: "Browse a controlled series of content slides.",
  usage: "Pass slides with distinct labels and a zero-based selected value. Choose slide width, alignment and control placement.",
  anatomy: "A named carousel region contains labeled slide groups. Only the current slide is active and reachable. A paper pill with IconButtons and PageDots provides alternatives to dragging.",
  notes: [
    "Vertical page scrolling stays native. Horizontal wheel gestures and Shift-scroll move between slides.",
    "With overflow=\"visible\", the surrounding layout must clip the rail where needed.",
    "Use at least one slide and keep value within its indices."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled full-width slides.", Demo: CarouselDemo, code: carouselDemoCode },
    { id: "peek", title: "Peek", description: "Partial-width centered slides.", Demo: CarouselPeekDemo, code: carouselPeekDemoCode },
    { id: "rail", title: "Rail", description: "Start-aligned visible-overflow rail.", Demo: CarouselRailDemo, code: carouselRailDemoCode },
    { id: "controls", title: "Controls", description: "Center, end and side controls.", Demo: CarouselControlsDemo, code: carouselControlsDemoCode },
    { id: "interactive", title: "Interactive", description: "Slides containing interactive controls.", Demo: CarouselInteractiveDemo, code: carouselInteractiveDemoCode },
  ],
  keyboard: [
    {
      "key": "Left / Right on the slide area",
      "description": "Move to the previous or next slide."
    },
    {
      "key": "Tab",
      "description": "Reach active slide actions and carousel controls."
    }
  ],
  related: [
    "PageDots",
    "Image"
  ],
  props: {
    "slides": "Distinct slide labels and React content.",
    "value": "The selected slide, from 0.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "slideWidth": "CSS width of each slide; \"80%\" or \"min(320px, 80%)\" shows the neighbours.",
    "align": "Where the current slide sits when it's narrower than the carousel.",
    "overflow": "\"visible\" keeps the slides past the carousel's edges visible; the page is expected to clip them.",
    "controls": "\"center\": one pill below, arrows around the dots; \"end\": the pill at the end of the row below, dots before the arrows; \"sides\": arrows over the current slide's edges, dots in the pill below.",
    "label": "Accessible name of the control or region.",
    "previousLabel": "Accessible label for moving backward.",
    "nextLabel": "Accessible label for moving forward.",
    "slideLabel": "A slide's position in each slide's name and the dots' value text; `n` counts from 1.",
    "className": "Additional classes on the outer element."
  },
};
