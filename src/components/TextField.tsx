import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { shape, swap } from "../springs";

export type TextFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  error?: string;
};

export function TextField({ value, onValueChange, label = "Email", error }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const errorId = useId();
  const floated = focused || value !== "";

  return (
    <motion.div
      initial={false}
      animate={{ height: error ? "auto" : 52, borderRadius: error ? 20 : 26 }}
      transition={shape}
      className="w-[360px] overflow-hidden bg-paper shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-ink"
    >
      <label className="relative block">
        <motion.span
          initial={false}
          animate={{ y: floated ? -10 : 0, scale: floated ? 11 / 15 : 1 }}
          transition={shape}
          className="pointer-events-none absolute top-0 left-5 origin-left text-[15px] leading-[52px] text-muted"
        >
          {label}
        </motion.span>
        <input
          value={value}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => onValueChange(event.target.value)}
          className="block h-[52px] w-full bg-transparent px-5 pt-6 pb-2 text-[15px] text-ink outline-none"
        />
      </label>
      <div className="h-px bg-line" />
      <div id={errorId} className="grid">
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              key={error}
              {...swap}
              className="col-start-1 row-start-1 flex origin-left items-center gap-2 px-5 py-2.5 text-[13px] leading-5 text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-3.5 shrink-0 fill-none stroke-current"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
