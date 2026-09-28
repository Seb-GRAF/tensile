import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { icons } from "../../icons";
import { useFocusSource } from "../../focus";
import { useSprings } from "../../springs";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";

export type SearchFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  openLabel?: string;
  clearLabel?: string;
  name?: string;
  className?: string;
};

export function SearchField({
  value,
  onValueChange,
  label = "Search",
  placeholder = "Search",
  openLabel = "Open search",
  clearLabel = "Clear search",
  name,
  className = "",
}: SearchFieldProps) {
  const { shape, soft, swap } = useSprings();
  useFocusSource();
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
    <div className={className}>
      <motion.div
        initial={false}
        animate={{ width: open ? "100%" : 44 }}
        transition={shape}
        className="relative h-11 rounded-control bg-paper shadow-control outline-offset-2 has-keyboard-focus:outline-2 has-keyboard-focus:outline-focus"
      >
        <motion.span
          initial={false}
          animate={{ color: open ? "var(--color-muted)" : "var(--color-ink)" }}
          transition={soft}
          className="absolute top-3.5 left-3.5"
        >
          <Icon>{icons.search}</Icon>
        </motion.span>
        <AnimatePresence initial={false}>
          {open && (
            <motion.input
              key="input"
              ref={input}
              {...swap}
              role="searchbox"
              name={name}
              aria-label={label}
              placeholder={placeholder}
              value={value}
              onChange={(event) => onValueChange(event.target.value)}
              onBlur={() => {
                if (!value) setOpen(false);
              }}
              onKeyDown={onKeyDown}
              className="absolute inset-0 w-full bg-transparent px-10 text-body text-ink outline-none placeholder:text-muted"
            />
          )}
          {value && (
            <motion.span
              key="clear"
              {...swap}
              className="absolute top-1.5 right-1.5 text-muted"
            >
              <IconButton
                label={clearLabel}
                variant="ghost"
                size="sm"
                onClick={() => {
                  onValueChange("");
                  input.current!.focus();
                }}
              >
                <Icon>{icons.close}</Icon>
              </IconButton>
            </motion.span>
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
            className="absolute inset-0 rounded-control outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus"
          />
        )}
      </motion.div>
    </div>
  );
}
