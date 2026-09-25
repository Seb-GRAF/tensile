import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { Lightbox } from "./Lightbox";

function Scene({ colors, sun }: { colors: string[]; sun: number[] }) {
  const [sky, light, far, near, front] = colors;
  const [cx, cy] = sun;
  return (
    <svg viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="480" height="320" fill={sky} />
      <circle cx={cx} cy={cy} r="30" fill={light} />
      <path d="M0 200 60 150l58 34 78-72 66 58 68-36 70 44 80-40v182H0Z" fill={far} />
      <path d="M0 246c70-34 150-30 224-8s170 10 256-18v100H0Z" fill={near} />
      <path d="M0 290c96-14 200-16 300-6s130 2 180-10v46H0Z" fill={front} />
    </svg>
  );
}

const meta = {
  component: Lightbox,
  parameters: { layout: "fullscreen" },
  args: {
    images: [
      { label: "Ridge at dawn", image: <Scene colors={["#e8ddd7", "#f6d2bb", "#c3b5b6", "#a89b9f", "#857a80"]} sun={[120, 168]} /> },
      { label: "Ridge in the morning", image: <Scene colors={["#dae6ea", "#fbeaa8", "#b0c3bd", "#93aba5", "#647d77"]} sun={[170, 112]} /> },
      { label: "Ridge at noon", image: <Scene colors={["#cde4ee", "#fff4cc", "#8fa9a3", "#b8f23e", "#2e2e2c"]} sun={[240, 64]} /> },
      { label: "Ridge in the afternoon", image: <Scene colors={["#ede3cd", "#f7dc92", "#cbbd95", "#ae9f74", "#72684b"]} sun={[310, 100]} /> },
      { label: "Ridge at dusk", image: <Scene colors={["#d9c7cb", "#f2bb9a", "#a495a2", "#827483", "#4f4554"]} sun={[360, 150]} /> },
      { label: "Ridge at night", image: <Scene colors={["#1c1c1b", "#ebe9e4", "#34332f", "#282826", "#161615"]} sun={[330, 80]} /> },
    ],
    value: null,
    onValueChange: fn(),
  },
} satisfies Meta<typeof Lightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a thumbnail to grow it into the full view; the arrow keys or the side buttons move between images; Escape, the backdrop or the close button shrink it back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="grid min-h-screen place-items-center">
        <Lightbox
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
