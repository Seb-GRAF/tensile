import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Check } from "../Check";
import { filterByWords, ListHighlight, ROW, useActiveIndex } from "../list";
import { shape, soft, swap } from "../springs";

export type ComboboxProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  emptyText?: string;
};

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Search",
  label = "Choose an option",
  emptyText = "No results",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const listId = useId();
  const index = options.findIndex((option) => option.value === value);
  const text = index === -1 ? "" : options[index].label;
  const results = filterByWords(options, query ?? "");
  const [active, setActive, onArrowKey] = useActiveIndex(results.length);
  const height = open ? 44 + 1 + 12 + Math.max(1, results.length) * ROW : 44;

  function show() {
    setQuery(null);
    setActive(index === -1 ? 0 : index);
    setOpen(true);
  }

  function pick(choice: string) {
    onValueChange(choice);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open) {
      if (event.key === "ArrowDown") show();
      return;
    }
    if (event.key === "Enter" && results[active]) {
      pick(results[active].value);
      return;
    }
    onArrowKey(event);
  }

  return (
    <div className="relative h-11 w-60">
      <motion.div
        initial={false}
        animate={{ height, borderRadius: open ? 20 : 22 }}
        transition={shape}
        className="absolute inset-x-0 top-0 z-10 overflow-hidden bg-paper shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-ink"
      >
        <input
          role="combobox"
          aria-label={label}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          placeholder={placeholder}
          value={open ? (query ?? text) : text}
          onClick={() => {
            if (!open) show();
          }}
          onBlur={() => setOpen(false)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className="block h-11 w-full bg-transparent pr-10 pl-4 text-sm font-medium text-ink outline-none placeholder:text-muted"
        />
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-3.5 right-4 size-4 fill-none stroke-muted"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
        <div inert={!open}>
          <div className="h-px bg-line" />
          <ul id={listId} role="listbox" aria-label={label} className="relative mx-1.5 my-1.5">
            {results.length > 0 && <ListHighlight index={active} />}
            <AnimatePresence initial={false}>
              {results.map((option, i) => (
                <motion.li
                  key={option.value}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  initial={{ opacity: 0, filter: "blur(4px)", y: i * ROW }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: i * ROW }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ y: shape, opacity: soft, filter: soft }}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseMove={() => setActive(i)}
                  onClick={() => pick(option.value)}
                  className="absolute inset-x-0 top-0 flex h-10 cursor-pointer items-center gap-2.5 px-2.5 text-sm text-ink"
                >
                  {option.icon && <span className="text-muted">{option.icon}</span>}
                  {option.label}
                  <AnimatePresence initial={false}>
                    {option.value === value && (
                      <motion.span key="check" {...swap} className="ml-auto">
                        <Check size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {results.length === 0 && (
                <motion.li key="empty" {...swap} className="flex h-10 origin-left items-center px-2.5 text-sm text-muted">
                  {emptyText}
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
