import { animate, clamp, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";
import { hexToRgb, hsvToRgb, parseHex, rgbToHex, rgbToHsv, type Hsv } from "../../../color";
import { dragHandlers, rubber } from "../../../drag";
import { useSprings } from "../../../springs";
import { FieldContext, useField } from "../Field/Field";
import { Input } from "../Input/Input";

export type ColorPickerProps = {
  /** A lowercase "#rrggbb" color. */
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  areaLabel?: string;
  hueLabel?: string;
  hexLabel?: string;
  /** The area knob's value text, from saturation and brightness between 0 and 1. */
  formatArea?: (saturation: number, brightness: number) => string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function ColorPicker({
  value,
  onValueChange,
  label = "Color",
  areaLabel = "Saturation and brightness",
  hueLabel = "Hue",
  hexLabel = "Hex",
  formatArea = (saturation: number, brightness: number) =>
    `Saturation ${saturation.toLocaleString("en-US", { style: "percent" })}, brightness ${brightness.toLocaleString("en-US", { style: "percent" })}`,
  id,
  name,
  disabled = false,
  className = "",
}: ColorPickerProps) {
  const { snap } = useSprings();
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  const knob = useRef<HTMLDivElement>(null);
  const hueKnob = useRef<HTMLDivElement>(null);
  const hueOver = useMotionValue(0);
  const [produced, setProduced] = useState(() => rgbToHsv(hexToRgb(value)));
  const hsv = rgbToHex(hsvToRgb(produced)) === value ? produced : rgbToHsv(hexToRgb(value));
  const hue = rgbToHex(hsvToRgb({ h: hsv.h, s: 1, v: 1 }));
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");

  function change(next: Hsv) {
    setProduced(next);
    onValueChange(rgbToHex(hsvToRgb(next)));
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      event.preventDefault();
      knob.current!.focus({ focusVisible: false } as FocusOptions);
    }
    const box = event.currentTarget.getBoundingClientRect();
    change({
      h: hsv.h,
      s: clamp(0, 1, (event.clientX - box.left) / box.width),
      v: clamp(0, 1, 1 - (event.clientY - box.top) / box.height),
    });
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-0.01, 0],
      ArrowRight: [0.01, 0],
      ArrowDown: [0, -0.01],
      ArrowUp: [0, 0.01],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    change({ h: hsv.h, s: clamp(0, 1, hsv.s + move[0]), v: clamp(0, 1, hsv.v + move[1]) });
  }

  function dragHue(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      hueOver.stop();
      event.preventDefault();
      hueKnob.current!.focus({ focusVisible: false } as FocusOptions);
    }
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    change({ ...hsv, h: clamp(0, 360, (px / box.width) * 360) });
    hueOver.set(rubber(px - clamp(0, box.width, px)));
  }

  function onHueKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowRight: hsv.h + 1, ArrowUp: hsv.h + 1, ArrowLeft: hsv.h - 1, ArrowDown: hsv.h - 1, Home: 0, End: 360 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    change({ ...hsv, h: clamp(0, 360, target) });
  }

  function commit() {
    const hex = parseHex(draft);
    if (hex) onValueChange(hex);
    setDraft(hex ?? value);
  }

  return (
    <div
      role="group"
      id={field?.id ?? id}
      aria-label={field?.labelId ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      className={`grid gap-3 rounded-card bg-paper p-3 shadow-control ${className}`}
    >
      <FieldContext value={{ disabled: isDisabled }}>
        <div
          {...(!isDisabled && dragHandlers(drag, () => {}))}
          className={`relative h-40 rounded-[calc(var(--radius-card)-12px)] outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus ${isDisabled ? "opacity-40" : "cursor-crosshair touch-none"}`}
        >
          <div
            style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hue})` }}
            className="absolute inset-0 rounded-[inherit]"
          />
          <div
            ref={knob}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            aria-label={areaLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(hsv.s * 100)}
            aria-valuetext={formatArea(hsv.s, hsv.v)}
            aria-disabled={isDisabled}
            onKeyDown={isDisabled ? undefined : onKeyDown}
            style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, backgroundColor: value }}
            className="absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-paper shadow-float outline-none"
          />
        </div>
        <div
          {...(!isDisabled && dragHandlers(dragHue, () => animate(hueOver, 0, snap)))}
          className={`relative h-6 rounded-full outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus ${isDisabled ? "opacity-40" : "cursor-pointer touch-none"}`}
        >
          <div
            style={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}
            className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full"
          />
          <motion.div
            ref={hueKnob}
            role="slider"
            tabIndex={isDisabled ? -1 : 0}
            aria-label={hueLabel}
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={Math.round(hsv.h)}
            aria-disabled={isDisabled}
            onKeyDown={isDisabled ? undefined : onHueKeyDown}
            style={{ left: `${(hsv.h / 360) * 100}%`, x: hueOver, backgroundColor: hue }}
            className="absolute top-0 size-6 -translate-x-1/2 rounded-full border-3 border-paper shadow-float outline-none"
          />
        </div>
        <div className="surface">
          <Input
            leading={<span aria-hidden style={{ backgroundColor: value }} className="size-5 shrink-0 rounded-full inset-ring inset-ring-ink/10" />}
            aria-label={hexLabel}
            value={focused ? draft : value}
            onValueChange={setDraft}
            onFocus={() => {
              setDraft(value);
              setFocused(true);
            }}
            onBlur={() => {
              commit();
              setFocused(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commit();
              }
            }}
          />
        </div>
        {name && <input type="hidden" name={name} value={value} disabled={isDisabled} />}
      </FieldContext>
    </div>
  );
}
