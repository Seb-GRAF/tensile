import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { Button } from "../actions/Button";
import { Card } from "../layout/Card";
import { StatusBadge, type StatusBadgeProps } from "./StatusBadge";

const stages: StatusBadgeProps[] = [
  { status: "neutral", label: "Draft" },
  { status: "info", label: "In review" },
  { status: "warning", label: "Changes requested" },
  { status: "success", label: "Approved" },
];

const meta = {
  title: "Feedback/StatusBadge",
  id: "components-statusbadge",
  component: StatusBadge,
  args: stages[0],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click Next to step through neutral, info, warning and success, on canvas and on paper: the color fades, the content blur-swaps and the width follows the label. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="flex flex-col items-center gap-6">
        <StatusBadge {...args} />
        <Card className="flex w-72 items-center justify-between p-4">
          <span className="text-sm font-medium text-ink">Q3 roadmap</span>
          <StatusBadge {...args} />
        </Card>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => updateArgs(stages[(stages.findIndex((stage) => stage.status === args.status) + 1) % stages.length])}
        >
          Next
        </Button>
      </div>
    );
  },
};
