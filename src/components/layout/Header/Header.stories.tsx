import { HeaderBarDemo } from "./demos/HeaderBarDemo";
import { HeaderDemo } from "./demos/HeaderDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
import { Icon } from "../../data-display/Icon/Icon";
import { LinkProvider } from "../../navigation/Link/Link";
import { Card } from "../Card/Card";
import { Header } from "./Header";

const projects = [
  { name: "Website relaunch", detail: "12 open tasks, due November 14" },
  { name: "Mobile onboarding", detail: "8 open tasks, due November 21" },
  { name: "Quarterly report", detail: "3 open tasks, due October 3" },
  { name: "Customer interviews", detail: "5 open tasks, due October 10" },
  { name: "Design system audit", detail: "9 open tasks, due October 31" },
  { name: "Pricing page experiment", detail: "4 open tasks, due October 17" },
  { name: "Help center migration", detail: "15 open tasks, due December 5" },
  { name: "Brand photography", detail: "2 open tasks, due October 24" },
  { name: "Accessibility review", detail: "6 open tasks, due November 7" },
  { name: "Partner newsletter", detail: "1 open task, due October 1" },
];

const meta = {
  title: "Layout/Header",
  id: "components-header",
  component: Header,
  parameters: { layout: "fullscreen" },
  args: {
    brand: (
      <span className="flex items-center gap-2 text-body font-semibold text-ink">
        <Icon size={20}>
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </Icon>
        Harbor
      </span>
    ),
    links: [
      { label: "Overview", href: "/overview" },
      { label: "Projects", href: "/projects" },
      { label: "Calendar", href: "/calendar" },
      { label: "Reports", href: "/reports" },
      { label: "Team", href: "/team" },
    ],
    value: "/projects",
    actions: <Button>New project</Button>,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a link, or Tab to one and press Enter: the ink pill slides to it. Below 768 px, the menu button opens the links in a drawer. Scroll: the header floats on top. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LinkProvider navigate={(href) => updateArgs({ value: href })}>
        <Header {...args} />
        <main className="px-3 py-6">
          <div className="mx-auto grid max-w-page gap-4">
            {projects.map((project) => (
              <Card key={project.name} className="p-5">
                <h2 className="text-body font-semibold">{project.name}</h2>
                <p className="mt-1 text-label text-muted">{project.detail}</p>
              </Card>
            ))}
          </div>
        </main>
      </LinkProvider>
    );
  },
};

/** The full-width bar: click a link, or Tab to one and press Enter, and the underline slides to it. Below 768 px, the menu button opens the links in a drawer. */
export const Bar: Story = {
  ...Default,
  args: { variant: "bar", actions: <Button size="sm">New project</Button> },
};

export const Usage: Story = {
  render: () => <HeaderDemo />,
};

export const BarUsage: Story = {
  render: () => <HeaderBarDemo />,
};
