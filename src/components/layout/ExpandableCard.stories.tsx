import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../actions/Button";
import { ExpandableCard } from "./ExpandableCard";

const tracks = [
  { title: "Winter Breeze", artist: "Arulo", time: "2:20" },
  { title: "Low Tide", artist: "Mira Sol", time: "3:05" },
  { title: "Paper Lanterns", artist: "Hollow Pines", time: "4:12" },
  { title: "Still Water", artist: "Okami", time: "3:48" },
];

const meta = {
  title: "Layout/ExpandableCard",
  id: "components-expandablecard",
  component: ExpandableCard,
  args: {
    title: "Deep focus",
    subtitle: "Playlist · 42 songs",
    visual: (
      <svg viewBox="0 0 56 56" className="size-full">
        <rect width="56" height="56" className="fill-ink" />
        <circle cx="35" cy="22" r="10" className="fill-accent" />
        <path d="M0 38c9-5 19-5 28 0s19 5 28 0v18H0Z" className="fill-ink-3" />
      </svg>
    ),
    children: (
      <>
        <p className="text-label text-muted">Long, quiet tracks without vocals, for reading, writing and late nights.</p>
        <ol role="list" className="mt-5">
          {tracks.map(({ title, artist, time }, i) => (
            <li key={title} className="flex h-10 items-center gap-3 text-label">
              <span className="w-3 text-muted tabular-nums">{i + 1}</span>
              <span className="min-w-0 grow truncate font-medium">{title}</span>
              <span className="text-muted">{artist}</span>
              <span className="w-8 text-right text-muted tabular-nums">{time}</span>
            </li>
          ))}
        </ol>
        <Button className="mt-5 w-full">Play</Button>
      </>
    ),
    open: false,
    onOpenChange: fn(),
  },
} satisfies Meta<typeof ExpandableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the card, or Tab to it and press Enter, to open its details; press Escape or the × to fold it back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="h-[400px] w-[360px] max-w-[calc(100vw-2rem)]">
        <ExpandableCard
          {...args}
          onOpenChange={(open) => {
            args.onOpenChange(open);
            updateArgs({ open });
          }}
        />
      </div>
    );
  },
};
