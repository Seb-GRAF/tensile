import { CodeBlockDemo } from "./demos/CodeBlockDemo";
import codeBlockCode from "./demos/CodeBlockDemo.tsx?raw";

export default {
  description: "Show a snippet of source code with a filename and a copy button.",
  usage: "Pass the code as a string and a title such as the filename. Long lines scroll sideways instead of wrapping.",
  anatomy: "An ink Card holds a title row with a CopyButton and a native pre element. The pre is a focusable region, so the keyboard can scroll it.",
  notes: [
    "Syntax colors distinguish keywords, strings, tags and values. The language defaults to tsx; pass css, javascript, json or another Prism language for other snippets.",
    "Pass a max height through className to make long snippets scroll vertically too.",
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "A component file with its filename and a line too long for the card.", Demo: CodeBlockDemo, code: codeBlockCode },
  ],
  keyboard: [],
  related: ["CopyButton", "Kbd"],
  props: {
    code: "The source text shown and copied.",
    language: "Syntax language, such as tsx, javascript, css or json. Defaults to tsx.",
    title: "A filename or caption shown above the code.",
    label: "Names the scrolling code region for screen readers.",
    copyLabel: "Accessible name of the copy button.",
    copiedLabel: "Text shown and announced after copying.",
    className: "Classes on the Card, for width, max height and placement.",
  },
};
