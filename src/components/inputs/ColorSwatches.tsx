import { motion } from "motion/react";
import { useRef } from "react";
import { useLiquid } from "../../springs";

export type ColorSwatchesProps = {
  options: { value: string; label: string; color: string }[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
};

const SLOT = 36;
const moves: Record<string, number> = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };

export function ColorSwatches({ options, value, onValueChange, label = "Color" }: ColorSwatchesProps) {
  const index = options.findIndex((option) => option.value === value);
  const [left, right] = useLiquid(index * SLOT, (options.length - 1 - index) * SLOT);
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const next = (index + move + options.length) % options.length;
    onValueChange(options[next].value);
    radios.current[next]!.focus();
  }

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className="rounded-full bg-paper p-[3px] shadow-float">
      <div className="relative grid auto-cols-[32px] grid-flow-col gap-1">
        {options.map((option, i) => (
          <button
            key={option.value}
            ref={(el) => {
              radios.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={i === index}
            aria-label={option.label}
            tabIndex={i === index ? 0 : -1}
            onClick={() => onValueChange(option.value)}
            className="flex h-8 items-center justify-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span style={{ backgroundColor: option.color }} className="size-6 rounded-full" />
          </button>
        ))}
        <motion.span
          aria-hidden
          style={{ left, right }}
          className="pointer-events-none absolute inset-y-0 rounded-full border-2 border-ink inset-ring-2 inset-ring-paper"
        />
      </div>
    </div>
  );
}
