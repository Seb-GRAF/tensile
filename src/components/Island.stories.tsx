import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Island } from "./Island";

function Icon({ paths, size }: { paths: string[]; size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="fill-none stroke-current"
      strokeWidth={36 / size}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const timer = ["M10 2h4", "m12 14 3-3", "M20 14a8 8 0 1 1-16 0 8 8 0 0 1 16 0"];
const pause = [
  "M6 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z",
  "M14 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1Z",
];
const close = ["M18 6 6 18", "m6 6 12 12"];
const mic = ["M12 19v3", "M19 10v2a7 7 0 0 1-14 0v-2", "M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0Z"];
const phone = [
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z",
];
const download = ["M12 15V3", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "m7 10 5 5 5-5"];

const button = "grid size-11 shrink-0 place-items-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-paper";

const activities = [
  {
    activity: "Timer",
    leading: (
      <span className="grid size-6 place-items-center text-accent">
        <Icon paths={timer} size={16} />
      </span>
    ),
    trailing: <span className="px-1 text-accent tabular-nums">4:59</span>,
    children: (
      <div className="flex h-full items-center gap-2 p-5">
        <button type="button" aria-label="Pause" className={`${button} bg-accent text-ink`}>
          <Icon paths={pause} size={20} />
        </button>
        <button type="button" aria-label="Cancel" className={`${button} bg-ink-3`}>
          <Icon paths={close} size={20} />
        </button>
        <div className="ml-auto text-right">
          <p className="text-[13px] leading-4 text-paper/55">Timer</p>
          <p className="text-3xl leading-7 font-semibold text-accent tabular-nums">4:59</p>
        </div>
      </div>
    ),
  },
  {
    activity: "Call",
    leading: (
      <span className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-ink-3 text-[11px] font-semibold">MC</span>
        Maya
      </span>
    ),
    trailing: <span className="px-1 text-accent tabular-nums">0:42</span>,
    children: (
      <div className="flex h-full items-center gap-3 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-3 text-[15px] font-semibold">MC</span>
        <div className="min-w-0 grow">
          <p className="truncate text-[15px] font-semibold">Maya Chen</p>
          <p className="text-[13px] text-accent tabular-nums">0:42</p>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Mute" className={`${button} bg-ink-3`}>
            <Icon paths={mic} size={20} />
          </button>
          <button type="button" aria-label="End call" className={`${button} bg-paper text-ink`}>
            <span className="rotate-135">
              <Icon paths={phone} size={20} />
            </span>
          </button>
        </div>
      </div>
    ),
  },
  {
    activity: "Download",
    leading: (
      <span className="grid size-6 place-items-center">
        <Icon paths={download} size={16} />
      </span>
    ),
    trailing: (
      <svg viewBox="0 0 24 24" className="size-6 -rotate-90 fill-none" strokeWidth={3} strokeLinecap="round">
        <circle cx="12" cy="12" r="8" className="stroke-ink-3" />
        <circle cx="12" cy="12" r="8" pathLength={1} strokeDasharray="0.4 1" className="stroke-accent" />
      </svg>
    ),
    children: (
      <div className="flex h-full items-center gap-3 p-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-3">
          <Icon paths={download} size={20} />
        </span>
        <div className="min-w-0 grow">
          <p className="truncate text-[15px] font-semibold">Report.pdf</p>
          <p className="text-[13px] text-paper/55 tabular-nums">18.4 of 46 MB</p>
        </div>
        <button type="button" aria-label="Cancel download" className={`${button} relative bg-ink-3`}>
          <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90 fill-none" strokeWidth={3} strokeLinecap="round">
            <circle cx="22" cy="22" r="20.5" pathLength={1} strokeDasharray="0.4 1" className="stroke-accent" />
          </svg>
          <Icon paths={close} size={16} />
        </button>
      </div>
    ),
  },
];

const meta = {
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
            args.onExpandedChange(expanded);
            updateArgs({ expanded });
          }}
        />
        <button
          type="button"
          onClick={() => updateArgs({ activity: activities[(index + 1) % activities.length].activity })}
          className="h-8 rounded-full bg-paper px-4 text-[13px] font-medium text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        >
          Next activity
        </button>
      </div>
    );
  },
};
