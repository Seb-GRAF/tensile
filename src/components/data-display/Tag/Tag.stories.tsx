import { TagDemo } from "./demos/TagDemo";
import { TagIconDemo } from "./demos/TagIconDemo";
import { TagRemovableDemo } from "./demos/TagRemovableDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Card } from "../../layout/Card/Card";
import { Icon } from "../Icon/Icon";
import { Tag } from "./Tag";

const meta = {
  title: "Data display/Tag",
  id: "components-tag",
  component: Tag,
  args: { label: "Customer research" },
  render: (args) => (
    <Card className="p-6">
      <Tag {...args} />
    </Card>
  ),
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A static tag on a paper card; edit the label in Controls. */
export const Default: Story = {};

/** Remove the tag by click, Enter or Space, then restore it to try again. */
export const Removable: Story = {
  args: {
    label: "Zurich office",
    icon: <Icon name="mapPin" size={14} />,
    onRemove: fn(),
  },
  render: function Render(args) {
    const [removed, setRemoved] = useState(false);
    return (
      <Card className="p-6">
        {removed ? (
          <Button size="sm" onClick={() => setRemoved(false)}>Restore tag</Button>
        ) : (
          <Tag {...args} onRemove={() => {
            args.onRemove!();
            setRemoved(true);
          }} />
        )}
      </Card>
    );
  },
};

export const Usage: Story = {
  render: () => <TagDemo />,
};

export const IconUsage: Story = {
  render: () => <TagIconDemo />,
};

export const RemovableUsage: Story = {
  render: () => <TagRemovableDemo />,
};
