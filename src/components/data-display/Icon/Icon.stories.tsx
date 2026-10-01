import { IconDemo } from "./demos/IconDemo";
import { IconSizesDemo } from "./demos/IconSizesDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { icons, type IconName } from "../../../icons";
import { Icon } from "./Icon";

const meta = {
  title: "Data display/Icon",
  id: "components-icon",
  component: Icon,
  args: { name: "calendar", className: "text-ink" },
  argTypes: { name: { control: "select", options: Object.keys(icons) } },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Pick a name and a size in Controls: the icon grows and its lines stay 1.5 px. */
export const Default: Story = {};

/** Every icon in the set with its name. */
export const AllIcons: Story = {
  render: (args) => (
    <ul role="list" className="grid w-190 grid-cols-6 gap-2 text-ink">
      {(Object.keys(icons) as IconName[]).map((name) => (
        <li key={name} className="grid justify-items-center gap-2 rounded-card bg-paper px-2 py-3 shadow-control">
          <Icon name={name} size={args.size} />
          <span className="max-w-full truncate text-caption text-muted">{name}</span>
        </li>
      ))}
    </ul>
  ),
};

export const Usage: Story = {
  render: () => <IconDemo />,
};

export const SizesUsage: Story = {
  render: () => <IconSizesDemo />,
};
