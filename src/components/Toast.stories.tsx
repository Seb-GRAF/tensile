import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Toast } from "./Toast";

const meta = {
  component: Toast,
  args: { status: "success", children: "Link copied" },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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
