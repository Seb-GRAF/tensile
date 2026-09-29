import { FileUploadDemo } from "./demos/FileUploadDemo";
import fileUploadDemoCode from "./demos/FileUploadDemo.tsx?raw";
import { FileUploadMultipleDemo } from "./demos/FileUploadMultipleDemo";
import fileUploadMultipleDemoCode from "./demos/FileUploadMultipleDemo.tsx?raw";
import { FileUploadProgressDemo } from "./demos/FileUploadProgressDemo";
import fileUploadProgressDemoCode from "./demos/FileUploadProgressDemo.tsx?raw";
import { FileUploadDisabledDemo } from "./demos/FileUploadDisabledDemo";
import fileUploadDisabledDemoCode from "./demos/FileUploadDisabledDemo.tsx?raw";

export default {
  description: "Pick or drop files and display upload progress.",
  usage: "Receive File objects in onFiles. Your upload code owns status and progress; the component does not send files.",
  anatomy: "A native file picker and drop target collect files. The surface changes to a progressbar, then a completion pill with a check and the file names.",
  notes: [
    "The progress example is a manual simulation and sends no files.",
    "accept configures the native chooser. Validate dropped files and server uploads in your application.",
    "The component has no name prop; append the received File objects to your upload request yourself."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Select files and show the chosen filenames.", Demo: FileUploadDemo, code: fileUploadDemoCode },
    { id: "multiple", title: "Multiple files", description: "Accepted file types and multiple selection.", Demo: FileUploadMultipleDemo, code: fileUploadMultipleDemoCode },
    { id: "progress", title: "Upload progress", description: "Caller-controlled uploading and completion states, explicitly simulated.", Demo: FileUploadProgressDemo, code: fileUploadProgressDemoCode },
    { id: "disabled", title: "Disabled", description: "Disabled file selection.", Demo: FileUploadDisabledDemo, code: fileUploadDisabledDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Open the native file picker from the trigger."
    }
  ],
  related: [
    "ProgressBar",
    "Button"
  ],
  props: {
    "status": "Current display state: idle, uploading or done.",
    "progress": "0..1",
    "onFiles": "Called with the files the user picked or dropped. Start the upload here and set `status` and `progress`.",
    "label": "Accessible name of the control or region.",
    "uploadingLabel": "Build the progress label from selected filenames.",
    "formatProgress": "Format progress, which ranges from 0 to 1.",
    "doneLabel": "Completion announcement for assistive technology.",
    "accept": "Native file chooser hint, such as .pdf,.png.",
    "multiple": "Allow several files; otherwise only the first is passed to onFiles.",
    "disabled": "Disable interaction with this control.",
    "className": "Additional classes on the outer element."
  },
};
