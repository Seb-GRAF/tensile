import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../data-display/Icon";
import { Image } from "./Image";

const hills = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" width="480" height="320">
    <rect width="480" height="320" fill="#dae6ea" />
    <circle cx="170" cy="112" r="30" fill="#fbeaa8" />
    <path d="M0 200 60 150l58 34 78-72 66 58 68-36 70 44 80-40v182H0Z" fill="#b0c3bd" />
    <path d="M0 246c70-34 150-30 224-8s170 10 256-18v100H0Z" fill="#93aba5" />
    <path d="M0 290c96-14 200-16 300-6s130 2 180-10v46H0Z" fill="#647d77" />
  </svg>`,
)}`;

const meta = {
  title: "Media/Image",
  id: "components-image",
  component: Image,
  args: { src: hills, alt: "Green hills under a pale morning sun", className: "aspect-video w-full rounded-card" },
  render: (args) => (
    <div className="w-80">
      <Image {...args} />
    </div>
  ),
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The image fades in once it has loaded; until then its box shows a quiet placeholder. */
export const Default: Story = {};

/** The source can't be decoded, so the fallback takes the image's place, centered. */
export const Fallback: Story = {
  args: {
    src: "data:image/png;base64,AAAA",
    fallback: (
      <span className="grid justify-items-center gap-2 text-label text-ink">
        <Icon size={20}>
          <path d="m2 2 20 20" />
          <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
          <path d="M13.5 13.5 6 21" />
          <path d="m18 12 3 3" />
          <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.05-.22 1.41-.59" />
          <path d="M21 15V5a2 2 0 0 0-2-2H9" />
        </Icon>
        Image unavailable
      </span>
    ),
  },
};
