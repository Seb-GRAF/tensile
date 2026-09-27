import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Check } from "../../Check";
import { ListHighlight, ROW, useActiveIndex } from "../../list";
import { shape, swap } from "../../springs";

export type SelectProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  emptyText?: string;
};

const openKeys = ["Enter", " ", "ArrowDown", "ArrowUp"];

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  label = "Choose an option",
  emptyText = "No options",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const index = options.findIndex((option) => option.value === value);
  const text = index === -1 ? placeholder : options[index].label;
  const [active, setActive, onArrowKey] = useActiveIndex(options.length);
  const height = open ? 44 + 1 + 12 + Math.max(1, options.length) * ROW : 44;

  function show() {
    setActive(index === -1 ? 0 : index);
    setOpen(true);
  }

  function pick(choice: string) {
    onValueChange(choice);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (!openKeys.includes(event.key)) return;
      event.preventDefault();
      show();
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && options[active]) {
      event.preventDefault();
      pick(options[active].value);
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
        <div
          role="combobox"
          tabIndex={0}
          aria-label={label}
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && options[active] ? `${listId}-${active}` : undefined}
          onClick={() => (open ? setOpen(false) : show())}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className="flex h-11 cursor-pointer items-center gap-2.5 px-4 text-sm font-medium outline-none"
        >
          <span className="grid min-w-0 grow grid-cols-1">
            <AnimatePresence initial={false}>
              <motion.span
                key={text}
                {...swap}
                className={`col-start-1 row-start-1 truncate ${index === -1 ? "text-muted" : "text-ink"}`}
              >
                {text}
              </motion.span>
            </AnimatePresence>
          </span>
          <svg
            viewBox="0 0 24 24"
            className="size-4 shrink-0 fill-none stroke-muted"
            strokeWidth={2.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        </div>
        <div inert={!open}>
          <div className="h-px bg-line" />
          <ul id={listId} role="listbox" aria-label={label} className="relative mx-1.5 my-1.5">
            {options.length > 0 && <ListHighlight index={active} />}
            {options.map((option, i) => (
              <li
                key={option.value}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(event) => event.preventDefault()}
                onMouseMove={() => setActive(i)}
                onClick={() => pick(option.value)}
                className="relative flex h-10 cursor-pointer items-center gap-2.5 px-2.5 text-sm text-ink"
              >
                {option.icon && <span className="text-muted">{option.icon}</span>}
                {option.label}
                <AnimatePresence initial={false}>
                  {i === index && (
                    <motion.span key="check" {...swap} className="ml-auto">
                      <Check size={16} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </li>
            ))}
            {options.length === 0 && <li className="flex h-10 items-center px-2.5 text-sm text-muted">{emptyText}</li>}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
