import { CarouselDemo } from "./demos/CarouselDemo";
import { CarouselPeekDemo } from "./demos/CarouselPeekDemo";
import { CarouselRailDemo } from "./demos/CarouselRailDemo";
import { CarouselControlsDemo } from "./demos/CarouselControlsDemo";
import { CarouselInteractiveDemo } from "./demos/CarouselInteractiveDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Link, LinkProvider } from "../../navigation/Link/Link";
import { Carousel } from "./Carousel";
import { Image } from "../Image/Image";

function scene(colors: string[], sun: number[]) {
  const [sky, light, far, near, front] = colors;
  const [cx, cy] = sun;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" width="480" height="320">
      <rect width="480" height="320" fill="${sky}" />
      <circle cx="${cx}" cy="${cy}" r="30" fill="${light}" />
      <path d="M0 200 60 150l58 34 78-72 66 58 68-36 70 44 80-40v182H0Z" fill="${far}" />
      <path d="M0 246c70-34 150-30 224-8s170 10 256-18v100H0Z" fill="${near}" />
      <path d="M0 290c96-14 200-16 300-6s130 2 180-10v46H0Z" fill="${front}" />
    </svg>`,
  )}`;
}

function Photo({ label, colors, sun }: { label: string; colors: string[]; sun: number[] }) {
  return (
    <div className="relative">
      <Image src={scene(colors, sun)} alt="" className="aspect-3/2 w-full" />
      <p className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-control bg-paper px-3 py-1 text-label font-medium text-ink">
        {label}
      </p>
    </div>
  );
}

const photos = [
  { label: "Ridge at dawn, from the eastern trailhead", colors: ["#e8ddd7", "#f6d2bb", "#c3b5b6", "#a89b9f", "#857a80"], sun: [120, 168] },
  { label: "Ridge in the morning, after the fog lifts over the valley", colors: ["#dae6ea", "#fbeaa8", "#b0c3bd", "#93aba5", "#647d77"], sun: [170, 112] },
  { label: "Ridge at noon", colors: ["#cde4ee", "#fff4cc", "#8fa9a3", "#b8f23e", "#2e2e2c"], sun: [240, 64] },
  { label: "Ridge in the afternoon, with long shadows from the western peaks", colors: ["#ede3cd", "#f7dc92", "#cbbd95", "#ae9f74", "#72684b"], sun: [310, 100] },
  { label: "Ridge at dusk", colors: ["#d9c7cb", "#f2bb9a", "#a495a2", "#827483", "#4f4554"], sun: [360, 150] },
];

const trails = [
  { label: "Eastern ridge loop", description: "8.4 km along the ridge, then a steep descent through the pine forest to the lake.", href: "/trails/eastern-ridge" },
  { label: "Valley floor walk", description: "An easy 5 km on gravel paths beside the river, with benches every kilometre.", href: "/trails/valley-floor" },
  { label: "Summit by the north face, for experienced hikers only", description: "12 km and 1,100 m of climbing on loose scree; start before sunrise.", href: "/trails/north-face" },
];

const meta = {
  title: "Media/Carousel",
  id: "components-carousel",
  component: Carousel,
  args: {
    slides: photos.map((photo) => ({ label: photo.label, content: <Photo {...photo} /> })),
    value: 0,
    onValueChange: fn(),
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag or flick the photos, swipe sideways on a trackpad or Shift-scroll a mouse wheel, press the arrows or the dots, or Tab to the photos and use ArrowLeft and ArrowRight; past the first and last photo the track stretches and springs back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-120 max-w-[calc(100vw-32px)]">
        <Carousel
          {...args}
          onValueChange={(value) => {
            args.onValueChange(value);
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};

/** Click Save trail or Trail guide: the click prints below. A press on them doesn't start a drag, and a drag that starts elsewhere on the slide never clicks them. */
export const InteractiveContent: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    const [clicked, setClicked] = useState("Nothing clicked");
    return (
      <LinkProvider navigate={(href) => setClicked(`Opened ${href}`)}>
        <div className="grid w-120 max-w-[calc(100vw-32px)] gap-4">
          <Carousel
            {...args}
            slides={trails.map((trail) => ({
              label: trail.label,
              content: (
                <div className="grid gap-2 p-5">
                  <h3 className="text-body font-semibold">{trail.label}</h3>
                  <p className="text-label text-muted">{trail.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-label">
                    <Button size="sm" onClick={() => setClicked(`Saved ${trail.label}`)}>Save trail</Button>
                    <Link href={trail.href}>Trail guide</Link>
                  </div>
                </div>
              ),
            }))}
            value={value}
            onValueChange={(next) => {
              args.onValueChange(next);
              setValue(next);
            }}
          />
          <output className="text-center text-label text-muted">{clicked}</output>
        </div>
      </LinkProvider>
    );
  },
};

/** Drag, flick or use the arrows and dots: the current photo stays centered while its neighbours peek in at both sides. */
export const Peek: Story = { ...Default, args: { slideWidth: "80%", align: "center" } };

/** Drag, flick or use the arrows and dots: the cards line up from the start and run past the carousel's right edge, where the page clips them. */
export const Rail: Story = {
  args: { slideWidth: "min(280px, 70%)", align: "start", overflow: "visible" },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-150 max-w-[calc(100vw-32px)] overflow-x-clip px-10">
        <Carousel
          {...args}
          className="max-w-100"
          onValueChange={(value) => {
            args.onValueChange(value);
            updateArgs({ value });
          }}
        />
      </div>
    );
  },
};

/** Press the arrows at the end of the row, or drag the dots at its start. */
export const ArrowsAtEnd: Story = { ...Default, args: { controls: "end" } };

/** Press the arrows over the photo's edges, or drag the photo; the dots below follow. */
export const ArrowsOnSides: Story = { ...Default, args: { controls: "sides" } };

export const Usage: Story = {
  render: () => <CarouselDemo />,
};

export const PeekUsage: Story = {
  render: () => <CarouselPeekDemo />,
};

export const RailUsage: Story = {
  render: () => <CarouselRailDemo />,
};

export const ControlsUsage: Story = {
  render: () => <CarouselControlsDemo />,
};

export const InteractiveUsage: Story = {
  render: () => <CarouselInteractiveDemo />,
};
