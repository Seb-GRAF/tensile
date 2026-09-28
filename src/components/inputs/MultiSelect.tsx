import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check } from "../../Check";
import { icons } from "../../icons";
import { ListHighlight, scrollToRow, ROW, useActiveIndex, useTypeahead } from "../../list";
import { useOutsidePress, useTopLayer } from "../../overlay";
import { useSprings } from "../../springs";
import { Icon } from "../data-display/Icon";
import { useField } from "./Field";

export type MultiSelectProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  emptyText?: string;
  /** The pill's text for the selected labels, in option order. */
  summary?: (labels: string[]) => string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

const openKeys = ["Enter", " ", "ArrowDown", "ArrowUp"];

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  label = "Choose options",
  emptyText = "No options",
  summary = (labels: string[]) => labels.length > 2 ? `${labels.slice(0, 2).join(", ")} +${labels.length - 2}` : labels.join(", "),
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: MultiSelectProps) {
  const { shape, swap } = useSprings();
  const field = useField();
  disabled = disabled || !!field?.disabled;
  const [open, setOpen] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const index = options.findIndex((option) => value.includes(option.value));
  const labels = options.filter((option) => value.includes(option.value)).map((option) => option.label);
  const text = labels.length === 0 ? placeholder : summary(labels);
  const [active, setActive, onArrowKey] = useActiveIndex(options.length);
  const onTypeahead = useTypeahead(options, open ? active : index, (i) => {
    setActive(i);
    setOpen(true);
  });
  const { room, settle } = useTopLayer(frame, open);
  useOutsidePress(frame, open, () => setOpen(false));
  const contentHeight = Math.max(1, options.length) * ROW;
  const up = room !== undefined && room.below < contentHeight + 21 && room.above > room.below;
  const maxHeight = room === undefined ? contentHeight : Math.max(0, (up ? room.above : room.below) - 21);
  const height = open ? 57 + Math.min(contentHeight, maxHeight) : 44;

  useEffect(() => {
    if (open && options[active]) scrollToRow(list.current!, active);
  }, [open, active, options, listId]);

  function show() {
    setActive(index === -1 ? 0 : index);
    setOpen(true);
  }

  function pick(choice: string) {
    onValueChange(value.includes(choice) ? value.filter((item) => item !== choice) : [...value, choice]);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (openKeys.includes(event.key)) {
        event.preventDefault();
        show();
      } else onTypeahead(event);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (options[active]) pick(options[active].value);
    } else {
      onArrowKey(event);
      onTypeahead(event);
    }
  }

  return (
    <div className={`relative h-11 ${disabled ? "opacity-40" : ""} ${className}`}>
      {name && value.map((item) => <input key={item} type="hidden" name={name} value={item} disabled={disabled} />)}
      <div ref={frame} className="absolute inset-0">
        <motion.div
          initial={false}
          animate={{ height, borderRadius: open ? "var(--radius-overlay)" : "var(--radius-control)" }}
          transition={shape}
          onAnimationComplete={settle}
          className={`absolute inset-x-0 flex overflow-hidden bg-paper shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus ${up ? "bottom-0 flex-col-reverse" : "top-0 flex-col"}`}
        >
          <div
            id={field?.id ?? id}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            aria-label={field?.labelId ? undefined : label}
            aria-labelledby={field?.labelId}
            aria-describedby={field?.describedBy}
            aria-invalid={field?.invalid || undefined}
            aria-required={field?.required || required || undefined}
            aria-disabled={disabled || undefined}
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={open && options[active] ? `${listId}-${active}` : undefined}
            onClick={disabled ? undefined : () => open ? setOpen(false) : show()}
            onBlur={() => setOpen(false)}
            onKeyDown={disabled ? undefined : onKeyDown}
            className="flex h-11 shrink-0 cursor-pointer items-center gap-2.5 px-4 text-sm font-medium outline-none"
          >
            <span className="sr-only">{text}</span>
            <span aria-hidden className="grid min-w-0 grow grid-cols-1">
              <AnimatePresence initial={false}>
                <motion.span key={text} {...swap} className={`col-start-1 row-start-1 truncate ${index === -1 ? "text-muted" : "text-ink"}`}>{text}</motion.span>
              </AnimatePresence>
            </span>
            <Icon className="shrink-0 text-muted">{icons.chevronsUpDown}</Icon>
          </div>
          <div inert={!open} className={`shrink-0 border-line ${up ? "border-b" : "border-t"}`}>
            <ul ref={list} id={listId} role="listbox" aria-multiselectable aria-label={field?.labelId ? undefined : label} aria-labelledby={field?.labelId} style={{ maxHeight }} className="relative m-1.5 overflow-y-auto overscroll-contain">
              {options.length > 0 && <ListHighlight index={active} />}
              {options.map((option, i) => (
                <li
                  key={option.value}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={value.includes(option.value)}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseMove={() => setActive(i)}
                  onClick={() => pick(option.value)}
                  className="relative flex h-10 cursor-pointer items-center gap-2.5 px-2.5 text-sm text-ink"
                >
                  {option.icon && <span className="shrink-0 text-muted">{option.icon}</span>}
                  <span className="truncate">{option.label}</span>
                  <AnimatePresence initial={false}>
                    {value.includes(option.value) && <motion.span key="check" {...swap} className="ml-auto shrink-0"><Check size={16} /></motion.span>}
                  </AnimatePresence>
                </li>
              ))}
              {options.length === 0 && <li className="flex h-10 items-center px-2.5 text-sm text-muted">{emptyText}</li>}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
