import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useControllable } from "../../../controllable";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";

export type SearchFieldProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  openLabel?: string;
  clearLabel?: string;
  name?: string;
  className?: string;
};

export function SearchField({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  label = "Search",
  placeholder = "Search",
  openLabel = "Open search",
  clearLabel = "Clear search",
  name,
  className = "",
}: SearchFieldProps) {
  const { shape, soft, swap } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  useFocusSource();
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Escape") return;
    if (value) {
      setValue("");
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
        className={`tn:relative tn:h-11 tn:rounded-control tn:bg-paper tn:shadow-control tn:outline-offset-2 tn:has-keyboard-focus:outline-2 tn:has-keyboard-focus:outline-focus ${open ? "" : "tn:press tn:hover:bg-hover"}`}
      >
        <motion.span
          initial={false}
          animate={{ color: open ? "var(--tn-color-muted)" : "var(--tn-color-ink)" }}
          transition={soft}
          className="tn:absolute tn:top-3.5 tn:left-3.5"
        >
          <Icon name="search" />
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
              onChange={(event) => setValue(event.target.value)}
              onBlur={() => {
                if (!value) setOpen(false);
              }}
              onKeyDown={onKeyDown}
              className="tn:absolute tn:inset-0 tn:w-full tn:bg-transparent tn:px-10 tn:text-body tn:text-ink tn:outline-none tn:placeholder:text-muted"
            />
          )}
          {value && (
            <motion.span
              key="clear"
              {...swap}
              className="tn:absolute tn:top-1.5 tn:right-1.5 tn:text-muted"
            >
              <IconButton
                label={clearLabel}
                icon="close"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setValue("");
                  input.current!.focus();
                }}
              />
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
            className="tn:absolute tn:inset-0 tn:rounded-control tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
          />
        )}
      </motion.div>
    </div>
  );
}
