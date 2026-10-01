import { AlertDemo } from "./demos/AlertDemo";
import { AlertSuccessDemo } from "./demos/AlertSuccessDemo";
import { AlertWarningDemo } from "./demos/AlertWarningDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "../../actions/Button/Button";
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
  title: "Feedback/Alert",
  id: "components-alert",
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
      <div className="flex w-90 max-w-full flex-col items-center gap-4">
        <Alert {...args} />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateArgs(alerts[(alerts.findIndex((alert) => alert.status === args.status) + 1) % alerts.length])}
        >
          Next
        </Button>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <AlertDemo />,
};

export const SuccessUsage: Story = {
  render: () => <AlertSuccessDemo />,
};

export const WarningUsage: Story = {
  render: () => <AlertWarningDemo />,
};
