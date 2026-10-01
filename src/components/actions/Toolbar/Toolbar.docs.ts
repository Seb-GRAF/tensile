import { ToolbarDemo } from "./demos/ToolbarDemo";
import toolbarCode from "./demos/ToolbarDemo.tsx?raw";
import { ToolbarVerticalDemo } from "./demos/ToolbarVerticalDemo";
import verticalCode from "./demos/ToolbarVerticalDemo.tsx?raw";
import { ToolbarTooltipsDemo } from "./demos/ToolbarTooltipsDemo";
import tooltipsCode from "./demos/ToolbarTooltipsDemo.tsx?raw";
import { ToolbarDisabledDemo } from "./demos/ToolbarDisabledDemo";
import disabledCode from "./demos/ToolbarDisabledDemo.tsx?raw";

export default {
  description: "A compact group of action buttons with one Tab stop and arrow-key navigation.",
  usage: "Place Button or IconButton components inside Toolbar and give the toolbar a descriptive label. Each button keeps its own action and accessible name.",
  anatomy: "Toolbar renders a div with the toolbar role inside a shared tooltip container. Compose it with Button, IconButton and Tooltip; there are no separate Toolbar.Root or Toolbar.Item exports.",
  notes: [
    "Use aria-pressed on buttons that represent a selected or toggled state. The application owns that state; moving focus does not activate a button.",
    "For icon buttons, keep the required label on IconButton and spread Tooltip’s trigger bindings onto it. Tooltips in a toolbar share one bubble that moves between actions.",
    "The current keyboard behavior targets native buttons. Use Button or IconButton for toolbar actions; text inputs and links are not part of its roving focus.",
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Align a paragraph with three action buttons. Arrow keys move focus; activating a button changes the alignment.", Demo: ToolbarDemo, code: toolbarCode },
    { id: "vertical", title: "Vertical", description: "A vertical toolbar uses ArrowUp and ArrowDown to move between drawing tools.", Demo: ToolbarVerticalDemo, code: verticalCode },
    { id: "tooltips", title: "With tooltips", description: "Format the text with named icon buttons. Hover or focus an action to see its tooltip.", Demo: ToolbarTooltipsDemo, code: tooltipsCode },
    { id: "disabled", title: "Disabled action", description: "Paste is disabled, so keyboard navigation moves directly between Copy and Share.", Demo: ToolbarDisabledDemo, code: disabledCode },
  ],
  keyboard: [
    { key: "Tab", description: "Enter the toolbar at its current button, or leave the toolbar." },
    { key: "ArrowLeft / ArrowRight", description: "Move between enabled buttons in a horizontal toolbar. Focus wraps at either end." },
    { key: "ArrowUp / ArrowDown", description: "Move between enabled buttons in a vertical toolbar. Focus wraps at either end." },
    { key: "Home / End", description: "Focus the first or last enabled button." },
    { key: "Enter / Space", description: "Activate the focused button." },
  ],
  related: ["Button", "IconButton", "Tooltip", "ToggleGroup"],
  props: {
    label: "Accessible name describing the group of actions.",
    children: "The buttons and tooltip wrappers that make up the toolbar.",
    orientation: "Direction of the layout and the arrow keys used to move focus.",
    className: "Classes on the toolbar element, for placement and gaps between groups.",
  },
};
