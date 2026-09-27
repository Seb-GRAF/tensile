import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Breadcrumbs } from "./Breadcrumbs";

const meta = {
  title: "Navigation/Breadcrumbs",
  id: "components-breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "padded" },
  args: {
    onNavigate: fn(),
    items: [
      {
        label: "Home",
        icon: (
          <svg
            viewBox="0 0 24 24"
            className="size-3.5 fill-none stroke-current"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        ),
      },
      { label: "Projects" },
      { label: "Harbor Coffee" },
      { label: "Brand refresh" },
      { label: "Assets" },
      { label: "Logo concepts" },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the … pill, or focus it and press Enter or Space, to show the hidden pages; click a page to navigate to it. */
export const Default: Story = {};
