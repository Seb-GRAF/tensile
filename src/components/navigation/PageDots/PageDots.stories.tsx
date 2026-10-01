import { PageDotsDemo } from "./demos/PageDotsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { PageDots, type PageDotsProps } from "./PageDots";

function StatefulPageDots(props: PageDotsProps) {
  const [value, setValue] = useState(props.value);
  return (
    <PageDots
      {...props}
      value={value}
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange?.(value);
      }}
    />
  );
}

const meta = {
  title: "Navigation/PageDots",
  id: "components-pagedots",
  component: PageDots,
  args: { count: 5, value: 0, onValueChange: fn() },
} satisfies Meta<typeof PageDots>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a dot or drag along the dots to scrub pages; past either end they stretch and spring back. Tab to them for the arrow keys, Home and End. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <StatefulPageDots
        {...args}
        onValueChange={(value) => {
          args.onValueChange?.(value);
          updateArgs({ value });
        }}
      />
    );
  },
};

export const Usage: Story = {
  render: () => <PageDotsDemo />,
};
