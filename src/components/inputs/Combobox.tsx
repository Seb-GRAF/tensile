import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check } from "../../Check";
import { icons } from "../../icons";
import { filterByWords, ListHighlight, scrollToRow, ROW, useActiveIndex } from "../../list";
import { useFocusSource } from "../../focus";
import { useOutsidePress, useTopLayer } from "../../overlay";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { Icon } from "../data-display/Icon";
import { ErrorRow, FloatingLabel, useField } from "./Field";

export type ComboboxProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  emptyText?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Search",
  label = "Choose an option",
  emptyText = "No results",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: ComboboxProps) {
  const { shape, soft, swap } = useSprings();
  const field = useField();
  useFocusSource();
  const inside = field?.inside;
  disabled = disabled || !!field?.disabled;
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [errorSize, measureError] = useSize();
  const index = options.findIndex((option) => option.value === value);
  const text = index === -1 ? "" : options[index].label;
  const inputValue = open ? (query ?? text) : text;
  const results = filterByWords(options, query ?? "");
  const [active, setActive, onArrowKey] = useActiveIndex(results.length);
  const { room, settle } = useTopLayer(frame, open);
  useOutsidePress(frame, open, () => setOpen(false));
  const triggerHeight = inside ? 52 : 44;
  const errorHeight = inside?.error && errorSize ? errorSize.height : 0;
  const contentHeight = Math.max(1, results.length) * ROW;
  const up = room !== undefined && room.below < contentHeight + 13 && room.above > room.below;
  const maxHeight = room === undefined ? contentHeight : Math.max(0, (up ? room.above : room.below) - 13);
  const height = open ? triggerHeight + 13 + Math.min(contentHeight, maxHeight) : triggerHeight + errorHeight;

  useEffect(() => {
    if (open && results[active]) scrollToRow(list.current!, active);
  }, [open, active, query, listId]);

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
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
      return;
    }
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        show();
      }
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (results[active]) pick(results[active].value);
      return;
    }
    onArrowKey(event);
  }

  return (
    <motion.div
      initial={false}
      animate={{ height: triggerHeight + errorHeight }}
      transition={shape}
      className={`${disabled ? "opacity-40" : ""} ${className}`}
    >
      {name && <input type="hidden" name={name} value={value ?? ""} disabled={disabled} />}
      <div className={`relative ${inside ? "h-13" : "h-11"}`}>
        <div ref={frame} className="absolute inset-0">
          <motion.div
            data-label-inside={inside ? true : undefined}
            initial={false}
            animate={{ bottom: open ? 0 : -errorHeight, height, borderRadius: open || inside?.error ? "var(--radius-overlay)" : "var(--radius-control)" }}
            transition={shape}
            onAnimationComplete={settle}
            className={`absolute inset-x-0 flex overflow-hidden bg-paper shadow-control transition-shadow duration-[calc(300ms*var(--motion-duration-scale))] ${open ? "[--shadow-control-drop:initial]" : "has-keyboard-focus:outline-2"} outline-offset-2 has-keyboard-focus:outline-focus ${up ? "flex-col-reverse" : "top-0 flex-col"}`}
          >
            <div className="relative shrink-0">
              {inside && <FloatingLabel aria-hidden floated={focused || inputValue !== ""} className="left-5">{inside.label}</FloatingLabel>}
              <input
                id={field?.id ?? id}
                role="combobox"
                disabled={disabled}
                aria-label={field?.labelId ? undefined : label}
                aria-labelledby={field?.labelId}
                aria-describedby={field?.describedBy}
                aria-invalid={field?.invalid || undefined}
                aria-required={field?.required || required || undefined}
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={listId}
                aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
                placeholder={placeholder}
                value={inputValue}
                onClick={() => { if (!open) show(); }}
                onFocus={() => setFocused(true)}
                onBlur={() => { setFocused(false); setOpen(false); }}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                  setOpen(true);
                }}
                onKeyDown={onKeyDown}
                className={`block w-full bg-transparent text-ink outline-none ${inside ? "h-13 pt-6 pr-11 pb-2 pl-5 text-body placeholder:text-transparent focus:placeholder:text-muted" : "h-11 pr-10 pl-4 text-sm font-medium placeholder:text-muted"}`}
              />
              <Icon className={`pointer-events-none absolute text-muted ${inside ? "top-4.5 right-5" : "top-3.5 right-4"}`}>{icons.chevronsUpDown}</Icon>
              {inside && (
                <motion.div
                  initial={false}
                  animate={{ height: open ? 0 : errorHeight, opacity: open ? 0 : 1 }}
                  transition={{ height: shape, opacity: soft }}
                  className="overflow-hidden"
                >
                  <div ref={measureError}>
                    <ErrorRow aria-hidden error={inside.error} />
                  </div>
                </motion.div>
              )}
            </div>
            <div inert={!open} className={`shrink-0 border-line ${up ? "border-b" : "border-t"}`}>
              <ul ref={list} id={listId} role="listbox" aria-label={field?.labelId ? undefined : label} aria-labelledby={field?.labelId} style={{ height: contentHeight, maxHeight }} className="relative m-1.5 overflow-y-auto overscroll-contain">
                {results.length > 0 && <ListHighlight index={active} />}
                <AnimatePresence initial={false}>
                  {results.map((option, i) => (
                    <motion.li
                      key={option.value}
                      id={`${listId}-${i}`}
                      role="option"
                      aria-selected={option.value === value}
                      initial={{ opacity: 0, filter: "blur(4px)", y: i * ROW }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: i * ROW }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ y: shape, opacity: soft, filter: soft }}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseMove={() => setActive(i)}
                      onClick={() => pick(option.value)}
                      className="absolute inset-x-0 top-0 flex h-10 cursor-pointer items-center gap-2.5 px-2.5 text-sm text-ink"
                    >
                      {option.icon && <span className="shrink-0 text-muted">{option.icon}</span>}
                      <span className="truncate">{option.label}</span>
                      <AnimatePresence initial={false}>
                        {option.value === value && <motion.span key="check" {...swap} className="ml-auto shrink-0"><Check size={16} /></motion.span>}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </AnimatePresence>
                <AnimatePresence initial={false}>
                  {results.length === 0 && <motion.li key="empty" {...swap} className="flex h-10 origin-left items-center px-2.5 text-sm text-muted">{emptyText}</motion.li>}
                </AnimatePresence>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
