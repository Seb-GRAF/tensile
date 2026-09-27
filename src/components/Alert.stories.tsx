import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Alert, type AlertProps } from "./Alert";

const alerts: AlertProps[] = [
  { status: "info", title: "Scheduled maintenance", description: "The dashboard is read-only on Sunday from 2 to 4 AM UTC." },
  {
    status: "warning",
    title: "Storage almost full",
    description: "You've used 4.6 of 5 GB. Delete old files or upgrade your plan to keep uploading.",
  },
  { status: "success", title: "Storage upgraded", description: "Your plan now includes 50 GB." },
];

const meta = {
  component: Alert,
  args: alerts[0],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Next to step through info, warning and success: the color and icon morph, the text blur-swaps and the height follows it. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex flex-col items-center gap-4">
        <Alert {...args} />
        <button
          type="button"
          onClick={() => updateArgs(alerts[(alerts.findIndex((alert) => alert.status === args.status) + 1) % alerts.length])}
          className="h-8 rounded-full bg-paper px-4 text-[13px] font-medium text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          Next
        </button>
      </div>
    );
  },
};
