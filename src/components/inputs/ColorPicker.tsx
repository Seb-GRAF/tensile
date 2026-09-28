import { clamp } from "motion/react";
import { useRef, useState } from "react";
import { hexToRgb, hsvToRgb, parseHex, rgbToHex, rgbToHsv, type Hsv } from "../../color";
import { dragHandlers } from "../../drag";
import { FieldContext, useField } from "./Field";
import { Input } from "./Input";
import { Slider } from "./Slider";

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
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  const knob = useRef<HTMLDivElement>(null);
  const [produced, setProduced] = useState(() => rgbToHsv(hexToRgb(value)));
  const hsv = rgbToHex(hsvToRgb(produced)) === value ? produced : rgbToHsv(hexToRgb(value));
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");

  function change(next: Hsv) {
    setProduced(next);
    onValueChange(rgbToHex(hsvToRgb(next)));
  }

  function drag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.type === "pointerdown") {
      event.preventDefault();
      knob.current!.focus();
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
      className={`grid gap-3 ${className}`}
    >
      <FieldContext value={{ disabled: isDisabled }}>
        <div
          {...(!isDisabled && dragHandlers(drag, () => {}))}
          className={`relative h-40 rounded-card outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus ${isDisabled ? "opacity-40" : "cursor-crosshair touch-none"}`}
        >
          <div
            style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${rgbToHex(hsvToRgb({ h: hsv.h, s: 1, v: 1 }))})` }}
            className="absolute inset-0 rounded-card shadow-float"
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
        <Slider value={Math.round(hsv.h)} onValueChange={(h) => change({ ...hsv, h })} min={0} max={360} label={hueLabel} />
        <Input
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
        {name && <input type="hidden" name={name} value={value} disabled={isDisabled} />}
      </FieldContext>
    </div>
  );
}
