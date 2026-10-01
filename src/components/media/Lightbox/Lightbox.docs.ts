import { LightboxDemo } from "./demos/LightboxDemo";
import lightboxDemoCode from "./demos/LightboxDemo.tsx?raw";

export default {
  description: "Open a thumbnail gallery in a modal image viewer.",
  usage: "Supply images with distinct descriptive labels. Control the open image with value and onValueChange (null while closed), or leave value out and let the lightbox track it.",
  anatomy: "Thumbnail buttons open the selected image. A native modal contains the full view and navigation controls; below 640 px the view spans the width with a 16 px inset and the arrows sit in a row at the bottom.",
  notes: [
    "Image content fills square thumbnails and a 3:2 full view.",
    "Closing returns focus to the current image’s thumbnail.",
    "Previous and next navigation wraps around the gallery; the pictures slide side by side, and dragging or flicking the full view moves between them."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A row of thumbnails that open into a full view with previous and next buttons; use it for a photo gallery or a set of product shots.", Demo: LightboxDemo, code: lightboxDemoCode },
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
    "value": "Index of the open image, or null when closed. Leave it out to let the lightbox track it, starting from defaultValue.",
    "defaultValue": "Index of the image open at first, or null (the default) to start closed, when the lightbox tracks it itself.",
    "onValueChange": "Called with the image index a thumbnail, arrow button or arrow key opens, and with null when the viewer closes.",
    "closeLabel": "Name of the close button in the full view.",
    "previousLabel": "Name of the button that shows the previous image.",
    "nextLabel": "Name of the button that shows the next image.",
    "className": "Classes on the wrapping row of thumbnails, for placement and width."
  },
};
