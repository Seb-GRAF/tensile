import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { StatusBadge } from "../feedback/StatusBadge";
import { Checkbox } from "../inputs/Checkbox";
import { Card } from "../layout/Card";
import { Button } from "./Button";
import { SelectionBar, type SelectionBarProps } from "./SelectionBar";

const tasks = [
  { id: "quote", title: "Send the revised quote to Studio Bernasconi", done: false },
  { id: "room", title: "Book a room for Thursday's design review", done: true },
  { id: "dashboard", title: "Reply to Helvetia Analytics about the dashboard timeline", done: false },
  { id: "audit", title: "Go through the accessibility audit of the customer portal and file an issue for each finding", done: false },
  { id: "certificate", title: "Renew the certificate for the staging domain", done: false },
  { id: "onboarding", title: "Update the onboarding checklist", done: true },
  { id: "invoices", title: "Export the October invoices for accounting", done: false },
  { id: "laptops", title: "Order laptops for the new interns", done: false },
  { id: "slides", title: "Prepare slides for the quarterly all-hands", done: false },
  { id: "archive", title: "Archive last year's project folders", done: false },
];

function TaskList(props: SelectionBarProps) {
  const [rows, setRows] = useState(tasks);
  const [selection, setSelection] = useState<string[]>([]);

  return (
    <>
      <Card className="w-xl max-w-[calc(100vw-2rem)] px-4 py-2">
        <ul role="list" className="divide-y divide-line">
          {rows.map((task) => (
            <li key={task.id} className="flex items-center justify-between gap-3 py-1">
              <Checkbox
                label={task.title}
                checked={selection.includes(task.id)}
                onCheckedChange={(checked) =>
                  setSelection(checked ? [...selection, task.id] : selection.filter((id) => id !== task.id))
                }
              />
              <StatusBadge status={task.done ? "success" : "neutral"} label={task.done ? "Done" : "To do"} className="shrink-0" />
            </li>
          ))}
        </ul>
      </Card>
      <SelectionBar
        {...props}
        count={selection.length}
        onClear={() => {
          setSelection([]);
          props.onClear();
        }}
        className="fixed inset-x-0 bottom-6 mx-auto w-fit"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRows(rows.map((task) => (selection.includes(task.id) ? { ...task, done: true } : task)))}
        >
          Mark as done
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setRows(rows.filter((task) => !selection.includes(task.id)));
            setSelection([]);
          }}
        >
          Delete
        </Button>
      </SelectionBar>
    </>
  );
}

const meta = {
  title: "Actions/SelectionBar",
  id: "components-selectionbar",
  component: SelectionBar,
  args: { count: 0, onClear: fn(), children: null },
} satisfies Meta<typeof SelectionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Check tasks to raise the bar, all ten to see it widen as the count rolls; Tab to its actions and press Enter or Space; × or Delete empties the selection and the bar sinks away. */
export const Default: Story = {
  render: function Render(args) {
    return <TaskList {...args} />;
  },
};
