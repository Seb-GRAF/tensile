import { IslandDemo } from "./demos/IslandDemo";
import { IslandActivityDemo } from "./demos/IslandActivityDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";
import { Island } from "./Island";


const activities = [
  {
    activity: "Timer",
    leading: (
      <span className="grid size-6 place-items-center text-accent">
        <Icon name="timer" />
      </span>
    ),
    trailing: <span className="px-1 text-accent tabular-nums">4:59</span>,
    children: (
      <div className="flex h-full items-center gap-2 p-5">
        <IconButton label="Pause" icon="pause" className="shrink-0 [--tn-color-ink:var(--tn-color-accent)] [--tn-color-paper:var(--tn-color-on-accent)]" />
        <IconButton label="Cancel" icon="close" variant="ghost" className="shrink-0 bg-line" />
        <div className="ml-auto text-right">
          <p className="text-label leading-4 text-muted">Timer</p>
          <p className="text-3xl leading-7 font-semibold text-accent tabular-nums">4:59</p>
        </div>
      </div>
    ),
  },
  {
    activity: "Call",
    leading: (
      <span className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-line text-caption font-semibold">MC</span>
        Maya
      </span>
    ),
    trailing: <span className="px-1 text-accent tabular-nums">0:42</span>,
    children: (
      <div className="flex h-full items-center gap-3 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-line text-body font-semibold">MC</span>
        <div className="min-w-0 grow">
          <p className="truncate text-body font-semibold">Maya Chen</p>
          <p className="text-label text-accent tabular-nums">0:42</p>
        </div>
        <div className="flex gap-2">
          <IconButton label="Mute" icon="mic" variant="ghost" className="shrink-0 bg-line" />
          <IconButton
            label="End call"
            icon={
              <span className="rotate-135">
                <Icon name="phone" size={20} />
              </span>
            }
            variant="secondary"
            className="shrink-0"
          />
        </div>
      </div>
    ),
  },
  {
    activity: "Download",
    leading: (
      <span className="grid size-6 place-items-center">
        <Icon name="download" />
      </span>
    ),
    trailing: (
      <svg viewBox="0 0 24 24" className="size-6 -rotate-90 fill-none" strokeWidth={1.5} strokeLinecap="round">
        <circle cx="12" cy="12" r="8" className="stroke-line" />
        <circle cx="12" cy="12" r="8" pathLength={1} strokeDasharray="0.4 1" className="stroke-accent" />
      </svg>
    ),
    children: (
      <div className="flex h-full items-center gap-3 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-line">
          <Icon name="download" size={20} />
        </span>
        <div className="min-w-0 grow">
          <p className="truncate text-body font-semibold">Report.pdf</p>
          <p className="text-label text-muted tabular-nums">18.4 of 46 MB</p>
        </div>
        <IconButton
          label="Cancel download"
          icon={
            <>
              <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90 fill-none" strokeWidth={1.5} strokeLinecap="round">
                <circle cx="22" cy="22" r="20.5" pathLength={1} strokeDasharray="0.4 1" className="stroke-accent" />
              </svg>
              <Icon name="close" />
            </>
          }
          variant="ghost"
          className="relative shrink-0 bg-line"
        />
      </div>
    ),
  },
];

const meta = {
  title: "Overlays/Island",
  id: "components-island",
  component: Island,
  args: { ...activities[0], expanded: false, onExpandedChange: fn() },
} satisfies Meta<typeof Island>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the island, or Tab to it and press Enter, to expand it; press Escape or click outside to fold it. Next activity steps through a timer, a call and a download. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const index = activities.findIndex(({ activity }) => activity === args.activity);
    return (
      <div className="flex flex-col items-center gap-12">
        <Island
          {...args}
          {...activities[index]}
          onExpandedChange={(expanded) => {
            args.onExpandedChange?.(expanded);
            updateArgs({ expanded });
          }}
        />
        <Button size="sm" variant="secondary" onPointerDown={(event) => event.stopPropagation()} onClick={() => updateArgs({ activity: activities[(index + 1) % activities.length].activity, expanded: false })}>Next activity</Button>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <IslandDemo />,
};

export const ActivityUsage: Story = {
  render: () => <IslandActivityDemo />,
};
