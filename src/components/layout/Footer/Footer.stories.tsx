import { FooterDemo } from "./demos/FooterDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { LinkProvider } from "../../navigation/Link/Link";
import { Footer } from "./Footer";

const meta = {
  title: "Layout/Footer",
  id: "components-footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  args: {
    groups: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Integrations with the tools your team already uses", href: "/integrations" },
          { label: "Changelog", href: "/changelog" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "Guides for getting started with shared projects", href: "/guides" },
          { label: "API reference", href: "/api" },
          { label: "System status", href: "/status" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Press and media resources", href: "/press" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy policy", href: "/privacy" },
          { label: "Terms of service", href: "/terms" },
          { label: "Cookie preferences", href: "/cookies" },
          { label: "Accessibility statement", href: "/accessibility" },
        ],
      },
    ],
    note: "© 2026 Harbor Labs, Inc. All rights reserved.",
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a link, or Tab to one and press Enter: the path above the footer changes. The groups sit side by side from 768 px of the footer's own width, in two columns from 448 px, stacked below. */
export const Default: Story = {
  render: function Render(args) {
    const [path, setPath] = useState("/");
    return (
      <LinkProvider navigate={setPath}>
        <div className="flex min-h-screen flex-col justify-between">
          <p className="p-6 text-label text-ink">
            Path: <output>{path}</output>
          </p>
          <Footer {...args} className="m-3" />
        </div>
      </LinkProvider>
    );
  },
};

export const Usage: Story = {
  render: () => <FooterDemo />,
};
