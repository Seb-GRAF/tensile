import { LinkDemo } from "./demos/LinkDemo";
import { LinkProviderDemo } from "./demos/LinkProviderDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { Link, LinkProvider } from "./Link";

const meta = {
  title: "Navigation/Link",
  id: "components-link",
  component: Link,
  args: { href: "https://www.w3.org/WAI/standards-guidelines/wcag/", children: "accessibility guidelines" },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the link to darken its underline, or press Tab to see its focus ring. */
export const Default: Story = {
  render: (args) => (
    <p className="w-80 text-body text-ink">
      Before you publish a page, check it against the <Link {...args} />.
    </p>
  ),
};

/** Click Settings or Help center, or Tab to one and press Enter: `navigate` gets the path and the page stays. The changelog opens in a new tab, as does a ⌘-click. */
export const WithLinkProvider: StoryObj<typeof LinkProvider> = {
  args: { navigate: fn() },
  render: function Render(args) {
    const [path, setPath] = useState("/");
    return (
      <LinkProvider
        navigate={(href) => {
          args.navigate(href);
          setPath(href);
        }}
      >
        <div className="grid w-80 gap-3 text-body text-ink">
          <p>
            Change your password in <Link href="/settings">Settings</Link> or ask the{" "}
            <Link href="/help">Help center</Link>. The <Link href="/changelog" target="_blank">changelog</Link> lists
            what's new.
          </p>
          <p className="text-label text-muted">
            Path: <output className="text-ink">{path}</output>
          </p>
        </div>
      </LinkProvider>
    );
  },
};

export const Usage: Story = {
  render: () => <LinkDemo />,
};

export const ProviderUsage: Story = {
  render: () => <LinkProviderDemo />,
};
