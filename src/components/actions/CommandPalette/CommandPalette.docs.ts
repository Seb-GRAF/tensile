import { CommandPaletteDemo } from "./demos/CommandPaletteDemo";
import commandPaletteDemoCode from "./demos/CommandPaletteDemo.tsx?raw";
import { CommandPaletteEmptyDemo } from "./demos/CommandPaletteEmptyDemo";
import commandPaletteEmptyDemoCode from "./demos/CommandPaletteEmptyDemo.tsx?raw";

export default {
  description: "Filter and run commands from a search field.",
  usage: "Pass commands with unique labels and handle onSelect. Size the container to fit your page.",
  anatomy: "An editable combobox filters the command list. A scrolling listbox highlights the current command. Kbd shows the keyboard shortcut.",
  notes: [
    "Filtering matches word prefixes. Try “open” or an unmatched query.",
    "Each mounted palette registers Command/Ctrl+K globally. Use one palette per application surface."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Filter commands and perform a local action.", Demo: CommandPaletteDemo, code: commandPaletteDemoCode },
    { id: "empty", title: "Empty state", description: "Custom empty-result message.", Demo: CommandPaletteEmptyDemo, code: commandPaletteEmptyDemoCode },
  ],
  keyboard: [
    {
      "key": "Command/Ctrl+K",
      "description": "Focus or blur the command search."
    },
    {
      "key": "Up / Down / Home / End",
      "description": "Move through results."
    },
    {
      "key": "Enter",
      "description": "Run the highlighted command."
    },
    {
      "key": "Escape",
      "description": "Close and clear the query."
    }
  ],
  related: [
    "Combobox",
    "Kbd"
  ],
  props: {
    "commands": "Commands with unique labels and optional icons.",
    "onSelect": "Called with the selected command.",
    "label": "Accessible name of the control or region.",
    "placeholder": "Hint shown while the value is empty.",
    "listLabel": "Accessible name of the results list.",
    "emptyText": "Message shown when there are no options or results.",
    "className": "Additional classes on the outer element."
  },
};
