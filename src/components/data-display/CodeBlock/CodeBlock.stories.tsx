import { CodeBlockDemo } from "./demos/CodeBlockDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Data display/CodeBlock",
  id: "components-codeblock",
  component: CodeBlock,
  args: {
    title: "app/layout.tsx",
    code: `import "tensile/reset.css";
import "tensile/styles.css";
import "./app.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-canvas font-sans text-ink antialiased selection:bg-accent selection:text-on-accent">{children}</body>
    </html>
  );
}`,
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press the copy button, or Tab to the code and scroll it with the arrow keys. */
export const Default: Story = {
  render: (args) => (
    <div className="w-144 max-w-[calc(100vw-2rem)]">
      <CodeBlock {...args} />
    </div>
  ),
};

/** Without a title, with a max height: the code scrolls both ways. */
export const Untitled: Story = {
  args: { title: undefined },
  render: (args) => (
    <div className="w-144 max-w-[calc(100vw-2rem)]">
      <CodeBlock {...args} className="max-h-48" />
    </div>
  ),
};

export const Usage: Story = {
  render: () => (
    <div className="w-144 max-w-[calc(100vw-2rem)]">
      <CodeBlockDemo />
    </div>
  ),
};
