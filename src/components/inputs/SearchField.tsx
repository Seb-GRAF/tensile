import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { shape, soft, swap } from "../../springs";

export type SearchFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  openLabel?: string;
  clearLabel?: string;
};

export function SearchField({
  value,
  onValueChange,
  label = "Search",
  placeholder = "Search",
  openLabel = "Open search",
  clearLabel = "Clear search",
}: SearchFieldProps) {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Escape") return;
    if (value) {
      onValueChange("");
      return;
    }
    flushSync(() => setOpen(false));
    button.current!.focus();
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: open ? 280 : 44 }}
      transition={shape}
      className="relative h-11 rounded-full bg-paper shadow-float"
    >
      <motion.svg
        viewBox="0 0 24 24"
        initial={false}
        animate={{ color: open ? "var(--color-muted)" : "var(--color-ink)" }}
        transition={soft}
        className="absolute top-3.5 left-3.5 size-4 fill-none stroke-current"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </motion.svg>
      <AnimatePresence initial={false}>
        {open && (
          <motion.input
            key="input"
            ref={input}
            {...swap}
            role="searchbox"
            aria-label={label}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            onBlur={() => {
              if (!value) setOpen(false);
            }}
            onKeyDown={onKeyDown}
            className="absolute inset-0 bg-transparent px-10 text-[15px] text-ink outline-none placeholder:text-muted"
          />
        )}
        {value && (
          <motion.button
            key="clear"
            {...swap}
            type="button"
            aria-label={clearLabel}
            onClick={() => {
              onValueChange("");
              input.current!.focus();
            }}
            className="absolute top-2 right-2 grid size-7 place-items-center rounded-full text-muted outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4 fill-none stroke-current"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      {!open && (
        <button
          ref={button}
          type="button"
          aria-expanded={false}
          aria-label={openLabel}
          onClick={() => {
            flushSync(() => setOpen(true));
            input.current!.focus();
          }}
          className="absolute inset-0 rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
        />
      )}
    </motion.div>
  );
}
