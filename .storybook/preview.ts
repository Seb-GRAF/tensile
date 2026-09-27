import type { Decorator, Preview } from "@storybook/react-vite";
import { createElement } from "react";
import "./preview.css";

const withTheme: Decorator = (Story, { globals }) => {
  document.documentElement.dataset.theme = globals.theme;
  return createElement(Story, { key: globals.theme });
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Design tokens",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "alternate", title: "Alternate" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "default" },
  parameters: {
    layout: "centered",
    options: {
      storySort: {
        order: ["Foundations", "Actions", "Inputs", "Navigation", "Feedback", "Data display", "Layout", "Overlays", "Media", "Examples"],
      },
    },
  },
};

export default preview;
