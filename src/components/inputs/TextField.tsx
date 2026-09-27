import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { Icon } from "../data-display/Icon";

export type TextFieldProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "placeholder"> & {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  error?: string;
};

export function TextField({
  value,
  onValueChange,
  label = "Email",
  error,
  onFocus,
  onBlur,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  className = "",
  style,
  ...props
}: TextFieldProps) {
  const { shape, swap } = useSprings();
  const [focused, setFocused] = useState(false);
  const errorId = useId();
  const floated = focused || value !== "";

  return (
    <motion.div
      initial={false}
      animate={{ height: error ? "auto" : 52, borderRadius: error ? "var(--radius-overlay)" : "var(--radius-control)" }}
      transition={shape}
      style={style}
      className={`overflow-hidden bg-paper shadow-float outline-offset-2 has-[input:disabled]:opacity-40 has-focus-visible:outline-2 has-focus-visible:outline-focus ${className}`}
    >
      <label className="relative block">
        <motion.span
          initial={false}
          animate={{ y: floated ? -10 : 0, scale: floated ? 11 / 15 : 1 }}
          transition={shape}
          className="pointer-events-none absolute top-0 left-5 origin-left text-body leading-13 text-muted"
        >
          {label}
        </motion.span>
        <input
          {...props}
          value={value}
          aria-invalid={!!error || invalid}
          aria-describedby={[error && errorId, describedBy].filter(Boolean).join(" ") || undefined}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          onChange={(event) => onValueChange(event.target.value)}
          className="block h-13 w-full bg-transparent px-5 pt-6 pb-2 text-body text-ink outline-none"
        />
      </label>
      <div className="h-px bg-line" />
      <div id={errorId} className="grid">
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              key={error}
              {...swap}
              className="col-start-1 row-start-1 flex origin-left items-center gap-2 px-5 py-2.5 text-label text-ink"
            >
              <Icon size={14}>{icons.alert}</Icon>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
