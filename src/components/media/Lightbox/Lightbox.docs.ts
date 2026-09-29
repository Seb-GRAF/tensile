import { LightboxDemo } from "./demos/LightboxDemo";
import lightboxDemoCode from "./demos/LightboxDemo.tsx?raw";

export default {
  description: "Open a thumbnail gallery in a modal image viewer.",
  usage: "Supply images with distinct descriptive labels. Keep value null while closed or set it to the open image index.",
  anatomy: "Thumbnail buttons open the selected image. A native modal contains the full view and navigation controls; below 640 px the view spans the width with a 16 px inset and the arrows sit in a row at the bottom.",
  notes: [
    "Image content fills square thumbnails and a 3:2 full view.",
    "Closing returns focus to the current image’s thumbnail.",
    "Previous and next navigation wraps around the gallery; the next picture slides in from the side it comes from."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Controlled thumbnail gallery and modal navigation.", Demo: LightboxDemo, code: lightboxDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Open a focused thumbnail."
    },
    {
      "key": "Left / Right",
      "description": "Show the previous or next image."
    },
    {
      "key": "Escape",
      "description": "Close the viewer."
    }
  ],
  related: [
    "Image",
    "Carousel"
  ],
  props: {
    "images": "Each image fills a square thumbnail and a 3:2 full view, e.g. an img with size-full object-cover; its label is its accessible name.",
    "value": "Index of the open image, or null when closed.",
    "onValueChange": "Called with the next value when the user makes a change.",
    "closeLabel": "Accessible label for the close action.",
    "previousLabel": "Accessible label for moving backward.",
    "nextLabel": "Accessible label for moving forward.",
    "className": "Additional classes on the outer element."
  },
};
