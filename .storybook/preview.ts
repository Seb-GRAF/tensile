import type { Decorator, Preview } from "@storybook/react-vite";
import { createElement } from "react";
import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { create } from "storybook/theming";
import "../src/index.css";
import "./preview.css";

const withTheme: Decorator = (Story, { globals }) => {
  document.documentElement.dataset.theme = globals.theme;
  document.documentElement.classList.toggle("dark", globals.theme === "dark");
  return createElement(Story, { key: globals.theme });
};

const preview: Preview = {
  tags: ["autodocs"],
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
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "default" },
  parameters: {
    layout: "centered",
    docs: {
      theme: create({ base: "light", fontBase: '"Geist Variable", system-ui, sans-serif', colorPrimary: "#111110", colorSecondary: "#111110", appContentBg: "#ffffff", textColor: "#111110" }),
      page: () => createElement("div", {},
        createElement("a", { href: "../", target: "_top" }, "← Tensile"),
        createElement(Title),
        createElement(Subtitle),
        createElement(Description),
        createElement("p", {}, "Import this component from tensile and load tensile/styles.css once in your app. Pass a value and its callback to control it, or a default value to let it keep its own."),
        createElement(Primary),
        createElement("h2", {}, "Props"),
        createElement(Controls),
        createElement("p", {}, "The table focuses on component-specific props. Native-element props may also pass through; the exported TypeScript props type is the full contract."),
        createElement("h2", {}, "Interaction and states"),
        createElement("p", {}, "Use the examples below to try each state. Open a story in its own canvas for keyboard and focus checks. Browser and assistive-technology coverage is documented in Get started."),
        createElement(Stories),
      ),
    },
    options: {
      storySort: {
        order: ["Guides", ["Get started", "Styling", "Motion", "Composition"], "Foundations", "Actions", "Inputs", "Navigation", "Feedback", "Data display", "Layout", "Overlays", "Media", "Examples"],
      },
    },
  },
};

export default preview;
