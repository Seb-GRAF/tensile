import { PaginationDemo } from "./demos/PaginationDemo";
import { PaginationLinksDemo } from "./demos/PaginationLinksDemo";
import { PaginationSlotsDemo } from "./demos/PaginationSlotsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Pagination } from "./Pagination";
import { useState } from "react";
import { LinkProvider } from "../Link/Link";

const meta = {
  title: "Navigation/Pagination",
  id: "components-pagination",
  component: Pagination,
  args: { count: 20, value: 1, onValueChange: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a page or an arrow, or Tab in and press Enter or Space: the pill slides to the current page, and the numbers blur-swap when the range shifts. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Pagination
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const WithLinks: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [path, setPath] = useState("/");
    return (
      <LinkProvider navigate={setPath}>
        <div className="grid justify-items-center gap-4">
          <Pagination
            {...args}
            value={value}
            pageHref={(page) => `/page/${page}`}
            onValueChange={(next) => { args.onValueChange?.(next); setValue(next); }}
          />
          <output className="text-label text-muted">{value} {path}</output>
        </div>
      </LinkProvider>
    );
  },
};

export const Usage: Story = {
  render: () => <PaginationDemo />,
};

export const LinksUsage: Story = {
  render: () => <PaginationLinksDemo />,
};

export const SlotsUsage: Story = {
  render: () => <PaginationSlotsDemo />,
};
