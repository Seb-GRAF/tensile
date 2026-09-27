import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { shape, useLiquid } from "../../springs";

export type RadioGroupProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string) => void;
  label?: string;
};

const ROW = 32;
const moves: Record<string, number> = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };

function Dot({ index, count }: { index: number; count: number }) {
  const [top, bottom] = useLiquid(index * ROW + 12, (count - 1 - index) * ROW + 12);
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={shape}
      style={{ top, bottom }}
      className="pointer-events-none absolute left-3 w-2 rounded-full bg-ink"
    />
  );
}

export function RadioGroup({ options, value, onValueChange, label = "Options" }: RadioGroupProps) {
  const index = options.findIndex((option) => option.value === value);
  const tabStop = index === -1 ? 0 : index;
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    const next = (tabStop + move + options.length) % options.length;
    onValueChange(options[next].value);
    radios.current[next]!.focus();
  }

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className="rounded-3xl bg-paper p-2 shadow-float">
      <div className="relative grid">
        {options.map((option, i) => (
          <button
            key={option.value}
            ref={(el) => {
              radios.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={i === index}
            tabIndex={i === tabStop ? 0 : -1}
            onClick={() => onValueChange(option.value)}
            className="flex h-8 items-center gap-2.5 rounded-full pr-4 pl-2 text-[13px] font-medium text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <span className="size-4 rounded-full border-[1.5px] border-muted" />
            {option.icon}
            {option.label}
          </button>
        ))}
        <AnimatePresence initial={false}>
          {index !== -1 && <Dot key="dot" index={index} count={options.length} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
