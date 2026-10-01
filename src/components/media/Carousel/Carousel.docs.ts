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
  description: "Browse a series of content slides by dragging, arrows or dots.",
  usage: "Pass slides with distinct labels. Control the selected slide with value and onValueChange, or leave value out and start from defaultValue. Choose slide width, alignment and control placement.",
  anatomy: "A named carousel region contains labeled slide groups. Only the current slide is active and reachable. A paper pill with IconButtons and PageDots provides alternatives to dragging.",
  notes: [
    "Vertical page scrolling stays native. Horizontal wheel gestures and Shift-scroll move between slides.",
    "With overflow=\"visible\", the surrounding layout must clip the rail where needed.",
    "Use at least one slide and keep value within its indices."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Full-width slides, one at a time: the plain carousel for a set of cards or images.", Demo: CarouselDemo, code: carouselDemoCode },
    { id: "peek", title: "Peek", description: "Centered slides at 80% width, so the neighbours peek in at both sides and hint that there is more to swipe.", Demo: CarouselPeekDemo, code: carouselPeekDemoCode },
    { id: "rail", title: "Rail", description: "Start-aligned slides that run past the carousel to the edge of a clipping parent, for a rail of cards inside a page column.", Demo: CarouselRailDemo, code: carouselRailDemoCode },
    { id: "controls", title: "Controls", description: "Switch between the three control placements to pick the one that fits the layout around the carousel.", Demo: CarouselControlsDemo, code: carouselControlsDemoCode },
    { id: "interactive", title: "Interactive", description: "Slides that hold their own buttons; only the current slide's controls can be reached with Tab.", Demo: CarouselInteractiveDemo, code: carouselInteractiveDemoCode },
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
    "value": "The selected slide, from 0. Leave it out to let the carousel track it, starting from defaultValue.",
    "defaultValue": "The first slide shown when the carousel tracks the slide itself.",
    "onValueChange": "Called with the slide a drag, wheel, arrow key, arrow button or dot moves to.",
    "slideWidth": "CSS width of each slide; \"80%\" or \"min(320px, 80%)\" shows the neighbours.",
    "align": "Where the current slide sits when it's narrower than the carousel.",
    "overflow": "\"visible\" keeps the slides past the carousel's edges visible; the page is expected to clip them.",
    "controls": "\"center\": one pill below, arrows around the dots; \"end\": the pill at the end of the row below, dots before the arrows; \"sides\": arrows over the current slide's edges, dots in the pill below.",
    "label": "Name of the carousel region and of its dots.",
    "previousLabel": "Name of the arrow button that shows the previous slide.",
    "nextLabel": "Name of the arrow button that shows the next slide.",
    "slideLabel": "A slide's position in each slide's name and the dots' value text; `n` counts from 1.",
    "className": "Classes on the carousel region, for placement and width; it fills its container by default."
  },
};
