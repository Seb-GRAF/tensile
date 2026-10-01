import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { HoldButton } from "../components/actions/HoldButton/HoldButton";
import { MorphButton } from "../components/actions/MorphButton/MorphButton";
import { VolumeSlider } from "../components/media/VolumeSlider/VolumeSlider";
import { Popover } from "../components/overlays/Popover/Popover";

function Demo() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [done, setDone] = useState(false);
  const [scale] = useState(() => getComputedStyle(document.documentElement).getPropertyValue("--tn-motion-duration-scale"));

  function connect() {
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
    setTimeout(() => setStatus("idle"), 2700);
  }

  return (
    <div className="grid w-[560px] gap-8">
      <p className="text-label text-muted">
        --tn-motion-duration-scale: <output className="font-medium text-ink">{scale}</output>
      </p>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10">
        <section aria-label="Button" className="grid h-24 place-items-start gap-3">
          <p className="text-caption text-muted">Button: size, color and content swap</p>
          <MorphButton status={status} onClick={connect} />
        </section>
        <section aria-label="Expanding surface" className="grid h-24 place-items-start gap-3">
          <p className="text-caption text-muted">Expanding surface</p>
          <Popover open={open} onOpenChange={setOpen}>
            <div className="p-4">
              <p className="text-body font-semibold text-ink">Winter Breeze</p>
              <p className="text-label text-muted">Arulo</p>
            </div>
          </Popover>
        </section>
        <section aria-label="Drag release" className="grid place-items-start gap-3">
          <p className="text-caption text-muted">Drag release: keeps its speed</p>
          <VolumeSlider value={volume} onValueChange={setVolume} />
        </section>
        <section aria-label="Hold timer" className="grid place-items-start gap-3">
          <p className="text-caption text-muted">Hold time is not scaled</p>
          <HoldButton done={done} onDone={() => setDone(true)} />
        </section>
      </div>
    </div>
  );
}

function Scaled({ scale }: { scale?: number }) {
  const root = document.documentElement.style;
  if (scale === undefined) root.removeProperty("--tn-motion-duration-scale");
  else root.setProperty("--tn-motion-duration-scale", String(scale));

  useEffect(
    () => () => {
      root.removeProperty("--tn-motion-duration-scale");
    },
    [root],
  );

  return (
    <div key={String(scale)}>
      <Demo />
    </div>
  );
}

const meta = {
  title: "Foundations/Motion",
  id: "foundations-motion",
  component: Scaled,
  parameters: { layout: "padded" },
  argTypes: { scale: { control: { type: "range", min: 0, max: 3, step: 0.1 } } },
} satisfies Meta<typeof Scaled>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Set `scale` in Controls to slow everything down or turn animation off (0); unset, the CSS decides, which gives 0 under reduced motion. The hold still takes 1.5 s. */
export const Default: Story = {};
