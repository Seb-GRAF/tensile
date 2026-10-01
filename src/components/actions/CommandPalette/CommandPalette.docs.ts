import { CommandPaletteDemo } from "./demos/CommandPaletteDemo";
import commandPaletteDemoCode from "./demos/CommandPaletteDemo.tsx?raw";
import { CommandPaletteEmptyDemo } from "./demos/CommandPaletteEmptyDemo";
import commandPaletteEmptyDemoCode from "./demos/CommandPaletteEmptyDemo.tsx?raw";

export default {
  description: "Filter and run commands from a search field.",
  usage: "Pass commands with unique labels and handle onSelect. Size the container to fit your page.",
  anatomy: "An editable combobox filters the command list. A scrolling listbox highlights the current command. Kbd shows the keyboard shortcut; touch screens, which have no keyboard to use it, hide it.",
  notes: [
    "Filtering matches word prefixes. Try “open” or an unmatched query.",
    "Each mounted palette registers Command/Ctrl+K globally. Use one palette per application surface."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Type to filter the commands, then pick one with the arrow keys and Enter or with a click.", Demo: CommandPaletteDemo, code: commandPaletteDemoCode },
    { id: "empty", title: "Empty state", description: "A message written for your content when nothing matches.", Demo: CommandPaletteEmptyDemo, code: commandPaletteEmptyDemoCode },
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
    "label": "Accessible name of the search field.",
    "placeholder": "Hint shown in the empty search field.",
    "listLabel": "Accessible name of the results list.",
    "emptyText": "Message in the list when no command matches the search.",
    "className": "Classes on the palette's surface, for width and placement, such as `w-96`."
  },
};
