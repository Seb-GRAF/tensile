import { AvatarDemo } from "./demos/AvatarDemo";
import { AvatarInitialsDemo } from "./demos/AvatarInitialsDemo";
import { AvatarSizesDemo } from "./demos/AvatarSizesDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const portrait = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" width="88" height="88">
    <rect width="88" height="88" fill="#f6d2bb" />
    <rect x="37" y="50" width="14" height="18" rx="6" fill="#c98f6f" />
    <path d="M10 88c3-19 16-28 34-28s31 9 34 28Z" fill="#2e2e2c" />
    <ellipse cx="44" cy="37" rx="15" ry="17" fill="#c98f6f" />
    <path d="M29 38c-2-15 5-24 15-24s17 9 15 24c-3-8-8-12-15-12s-12 4-15 12Z" fill="#111110" />
  </svg>`,
)}`;

const meta = {
  title: "Data display/Avatar",
  id: "components-avatar",
  component: Avatar,
  args: { name: "Maya Chen" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The portrait fades in once it has loaded; change `size` in Controls for 24, 32 or 44 px. */
export const Default: Story = {
  args: { src: portrait },
};

/** Without `src` the initials show at once: the first letters of the first and last words, or one letter for a one-word name. */
export const Initials: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} />
      <Avatar {...args} name="Alejandra Beatriz Villanueva Ortiz" />
      <Avatar {...args} name="Suharti" />
    </div>
  ),
};

export const Usage: Story = {
  render: () => <AvatarDemo />,
};

export const InitialsUsage: Story = {
  render: () => <AvatarInitialsDemo />,
};

export const SizesUsage: Story = {
  render: () => <AvatarSizesDemo />,
};
