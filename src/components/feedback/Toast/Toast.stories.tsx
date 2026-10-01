import { ToastDemo } from "./demos/ToastDemo";
import { ToastLoadingDemo } from "./demos/ToastLoadingDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
import { Toast } from "./Toast";

const meta = {
  title: "Feedback/Toast",
  id: "components-toast",
  component: Toast,
  args: { status: "success" },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Next, or press Enter or Space, to swap between sharing and success; the pill follows its content. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex flex-col items-center gap-4">
        <Toast {...args} />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateArgs(args.status === "success" ? { status: "loading", children: "Sharing…" } : { status: "success", children: "Link copied" })}
        >
          Next
        </Button>
      </div>
    );
  },
};

/** Loading and success take turns every 1.2 s, like a toast that follows a request. */
export const Sharing: Story = {
  render: function Render() {
    const [status, setStatus] = useState<"loading" | "success">("loading");

    useEffect(() => {
      const id = setInterval(() => setStatus((s) => (s === "loading" ? "success" : "loading")), 1200);
      return () => clearInterval(id);
    }, []);

    return <Toast status={status}>{status === "loading" ? "Sharing…" : "Link copied"}</Toast>;
  },
};

export const Usage: Story = {
  render: () => <ToastDemo />,
};

export const LoadingUsage: Story = {
  render: () => <ToastLoadingDemo />,
};
