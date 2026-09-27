import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarGroup } from "./AvatarGroup";

function portrait(background: string, skin: string, hair: string, shirt: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" width="88" height="88">
      <rect width="88" height="88" fill="${background}" />
      <rect x="37" y="50" width="14" height="18" rx="6" fill="${skin}" />
      <path d="M10 88c3-19 16-28 34-28s31 9 34 28Z" fill="${shirt}" />
      <ellipse cx="44" cy="37" rx="15" ry="17" fill="${skin}" />
      <path d="M29 38c-2-15 5-24 15-24s17 9 15 24c-3-8-8-12-15-12s-12 4-15 12Z" fill="${hair}" />
    </svg>`,
  )}`;
}

const meta = {
  title: "Data display/AvatarGroup",
  id: "components-avatargroup",
  component: AvatarGroup,
  args: {
    people: [
      { name: "Maya Chen", src: portrait("#f6d2bb", "#c98f6f", "#111110", "#2e2e2c") },
      { name: "Jonas Weber", src: portrait("#dae6ea", "#f0c8a8", "#a0703f", "#647d77") },
      { name: "Aiko Tanaka" },
      { name: "Samuel Okafor", src: portrait("#ede3cd", "#8d5a3b", "#2e2e2c", "#ae9f74") },
      { name: "Léa Martin", src: portrait("#d9c7cb", "#f0c8a8", "#3d2b1f", "#857a80") },
      { name: "Omar Haddad" },
    ],
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Six people with `max` 4: four overlapping avatars, then a "+2" circle for the rest; change `max` or `size` in Controls. */
export const Default: Story = {};
