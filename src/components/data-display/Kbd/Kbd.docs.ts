import { KbdDemo } from "./demos/KbdDemo";
import kbdCode from "./demos/KbdDemo.tsx?raw";

export default {
  description: "An inline key cap for keyboard shortcuts and instructions.",
  usage: "Place the key name or symbol inside Kbd. Combine key caps with surrounding text to explain a shortcut.",
  anatomy: "Kbd renders a native kbd element with a small bordered surface. Native HTML attributes pass through to that element.",
  notes: [
    "Kbd displays a key; it does not register a shortcut or receive keyboard focus. The component that owns the action must implement its keyboard behavior.",
    "Choose the key notation that matches the supported shortcut. Use CommandPalette for the library's built-in command search behavior.",
  ],
  examples: [
    { id: "usage", title: "In text", description: "Describe a keyboard shortcut using separate key caps.", Demo: KbdDemo, code: kbdCode },
  ],
  keyboard: [],
  related: ["CommandPalette", "Tooltip"],
  props: {
    children: "The key name, symbol or shortcut to display.",
    className: "Classes on the `<kbd>`, for margin and placement.",
  },
};
