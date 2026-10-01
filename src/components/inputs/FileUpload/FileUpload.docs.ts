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
    { id: "usage", title: "Basic usage", description: "The idle drop target on its own, with the picked file names listed below it.", Demo: FileUploadDemo, code: fileUploadDemoCode },
    { id: "multiple", title: "Multiple files", description: "multiple passes every picked file to onFiles, and accept limits the chooser to PDFs and PNGs.", Demo: FileUploadMultipleDemo, code: fileUploadMultipleDemoCode },
    { id: "progress", title: "Upload progress", description: "A simulated upload: the caller moves status and progress, so the target turns into a progress pill and then a done pill.", Demo: FileUploadProgressDemo, code: fileUploadProgressDemoCode },
    { id: "disabled", title: "Disabled", description: "A dimmed target that neither opens the chooser nor takes drops.", Demo: FileUploadDisabledDemo, code: fileUploadDisabledDemoCode },
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
    "progress": "Upload progress from 0 to 1, shown while status is uploading.",
    "onFiles": "Called with the files the user picked or dropped. Start the upload here and set `status` and `progress`.",
    "label": "Text on the drop target while idle, which also names its button.",
    "uploadingLabel": "Build the progress label from selected filenames.",
    "formatProgress": "Format progress, which ranges from 0 to 1.",
    "doneLabel": "Completion announcement for assistive technology.",
    "accept": "Native file chooser hint, such as .pdf,.png.",
    "multiple": "Allow several files; otherwise only the first is passed to onFiles.",
    "disabled": "Dims the target; it doesn't open the chooser or take drops.",
    "className": "Classes on the 128 px tall area that holds the target, for placement. The target fills its width."
  },
};
