import { TabBarDemo } from "./demos/TabBarDemo";
import { TabBarLinksDemo } from "./demos/TabBarLinksDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { TabBar } from "./TabBar";
import { LinkProvider } from "../Link/Link";
import { Icon } from "../../data-display/Icon/Icon";

const meta = {
  title: "Navigation/TabBar",
  id: "components-tabbar",
  component: TabBar,
  parameters: { layout: "fullscreen" },
  args: {
    items: [
      { value: "home", label: "Home", icon: <Icon name="home" size={20} />, activeIcon: <Icon name="home" size={20} className="*:fill-current" /> },
      { value: "browse", label: "Browse", icon: <Icon name="grid" size={20} />, activeIcon: <Icon name="grid" size={20} className="*:fill-current" /> },
      { value: "liked", label: "Liked", icon: <Icon name="heart" size={20} />, activeIcon: <Icon name="heart" size={20} className="*:fill-current" /> },
      { value: "profile", label: "Profile", icon: <Icon name="user" size={20} />, activeIcon: <Icon name="user" size={20} className="*:fill-current" /> },
    ],
    value: "home",
    onValueChange: fn(),
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click an item, or Tab in, move focus with the arrow keys and press Enter: the ink pill slides, and the icons under it are filled. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex h-[600px] w-full max-w-[390px] flex-col justify-end bg-paper p-4">
          <TabBar
            {...args}
            onValueChange={(value) => {
              args.onValueChange?.(value);
              updateArgs({ value });
            }}
          />
        </div>
      </div>
    );
  },
};

export const WithLinks: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [destination, setDestination] = useState("");
    return (
      <div className="grid min-h-screen place-content-center gap-4 px-4">
        <LinkProvider navigate={(href) => { setDestination(href); setValue(href.slice(1)); }}>
          <TabBar
            {...args}
            items={args.items.map((item, i) => ({ ...item, href: i < 3 ? `/${item.value}` : undefined }))}
            value={value}
            onValueChange={(value) => { args.onValueChange?.(value); setValue(value); setDestination(value); }}
            className="w-80 max-w-[calc(100vw-2rem)]"
          />
        </LinkProvider>
        <output className="text-label text-muted">{destination}</output>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <TabBarDemo />,
};

export const LinksUsage: Story = {
  render: () => <TabBarLinksDemo />,
};
