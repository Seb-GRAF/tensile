import { TableOfContentsDemo } from "./demos/TableOfContentsDemo";
import { TableOfContentsSubsectionsDemo } from "./demos/TableOfContentsSubsectionsDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableOfContents } from "./TableOfContents";

const meta = {
  title: "Navigation/TableOfContents",
  id: "components-tableofcontents",
  component: TableOfContents,
  args: {
    items: [
      { id: "introduction", label: "Introduction" },
      {
        id: "installation",
        label: "Installation",
        items: [
          { id: "package-managers", label: "Package managers" },
          { id: "loading-the-styles", label: "Loading the styles and the optional reset" },
        ],
      },
      { id: "configuration", label: "Configuration" },
      { id: "troubleshooting", label: "Troubleshooting" },
      { id: "changelog", label: "Changelog" },
    ],
  },
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Scroll the page, or click a link: the marker springs to the section whose top last passed the line 100 px below the top, and to the last one at the bottom. */
export const Default: Story = {
  render: (args) => (
    <div className="grid w-[40rem] grid-cols-[10rem_minmax(0,1fr)] gap-8 py-8">
      <TableOfContents {...args} className="sticky top-8 self-start" />
      <div className="grid gap-8">
        {args.items.flatMap((item) => [item, ...(item.items ?? [])]).map((item, i) => (
          <section key={item.id} id={item.id} className={`scroll-mt-24 space-y-2 ${i >= 4 ? "min-h-24" : "min-h-96"}`}>
            <h2 className="text-lg font-semibold">{item.label}</h2>
            <p className="text-body text-muted">Placeholder text for the {item.label.toLowerCase()} section, long enough to read while scrolling past it.</p>
          </section>
        ))}
      </div>
    </div>
  ),
};

export const Usage: Story = {
  render: () => <TableOfContentsDemo />,
};

export const Subsections: Story = {
  render: () => <TableOfContentsSubsectionsDemo />,
};
