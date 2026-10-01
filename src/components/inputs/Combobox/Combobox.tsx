import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check } from "../../../Check";
import { useControllable } from "../../../controllable";
import { filterByWords, ListHighlight, optionRows, scrollToRow, ROW, useActiveIndex, type Option, type Options } from "../../../list";
import { useFocusSource } from "../../../focus";
import { useOutsidePress, useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";
import { ErrorRow, FloatingLabel, useField } from "../Field/Field";

export type ComboboxProps = {
  /** Options, or groups of them under a heading; a disabled option can't be picked. */
  options: Options;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
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
  value: valueProp,
  defaultValue = null,
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
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  useFocusSource();
  const inside = field?.inside;
  disabled = disabled || !!field?.disabled;
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  if (open && !present) setPresent(true);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [errorSize, measureError] = useSize();
  const all = optionRows(options).options;
  const index = all.findIndex((option) => option.value === value);
  const text = index === -1 ? "" : all[index].label;
  const inputValue = open ? (query ?? text) : text;
  const results = matches(query ?? "");
  const { options: flat, rows, count } = optionRows(results);
  const [active, setActive, onArrowKey] = useActiveIndex(flat.length, (i) => !!flat[i].disabled);
  const { room, settle } = useTopLayer(frame, open);
  useOutsidePress(frame, open, () => setOpen(false));
  const triggerHeight = inside ? 48 : 44;
  const errorHeight = inside?.error && errorSize ? errorSize.height : 0;
  const contentHeight = Math.max(1, count) * ROW;
  const up = room !== undefined && room.below < contentHeight + 13 && room.above > room.below;
  const maxHeight = room === undefined ? contentHeight : Math.max(0, (up ? room.above : room.below) - 13);
  const height = open ? triggerHeight + 13 + Math.min(contentHeight, maxHeight) : triggerHeight + errorHeight;

  useEffect(() => {
    if (open && flat[active]) scrollToRow(list.current!, rows[active]);
  }, [open, active, query, listId]);

  function matches(words: string): Options {
    return options.flatMap<Options[number]>((entry) => {
      if (!("options" in entry)) return filterByWords([entry], words);
      const found = filterByWords(entry.options, words);
      return found.length > 0 ? [{ label: entry.label, options: found }] : [];
    });
  }

  function show() {
    setQuery(null);
    setActive(index === -1 ? all.findIndex((option) => !option.disabled) : index);
    setOpen(true);
  }

  function pick(choice: string) {
    setValue(choice);
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
      if (flat[active]) pick(flat[active].value);
      return;
    }
    onArrowKey(event);
  }

  function row(option: Option) {
    const i = flat.indexOf(option);
    return (
      <motion.li
        key={option.value}
        id={`${listId}-${i}`}
        role="option"
        aria-selected={option.value === value}
        aria-disabled={option.disabled || undefined}
        initial={{ opacity: 0, filter: "blur(4px)", y: rows[i] * ROW }}
        animate={{ opacity: option.disabled ? 0.4 : 1, filter: "blur(0px)", y: rows[i] * ROW }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ y: shape, opacity: soft, filter: soft }}
        onMouseDown={(event) => event.preventDefault()}
        onMouseMove={option.disabled ? undefined : () => setActive(i)}
        onClick={option.disabled ? undefined : () => pick(option.value)}
        className={`tn:absolute tn:inset-x-0 tn:top-0 tn:flex tn:h-10 tn:items-center tn:gap-2.5 tn:px-2.5 tn:text-sm tn:text-ink ${option.disabled ? "" : "tn:cursor-pointer"}`}
      >
        {option.icon && <span className="tn:shrink-0 tn:text-muted">{option.icon}</span>}
        <span className="tn:truncate">{option.label}</span>
        <AnimatePresence initial={false}>
          {option.value === value && <motion.span key="check" {...swap} className="tn:ml-auto tn:shrink-0"><Check size={16} /></motion.span>}
        </AnimatePresence>
      </motion.li>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ height: triggerHeight + errorHeight }}
      transition={shape}
      className={`${disabled ? "tn:opacity-40" : ""} ${className}`}
    >
      {name && <input type="hidden" name={name} value={value ?? ""} disabled={disabled} />}
      <div className={`tn:relative ${inside ? "tn:h-12" : "tn:h-11"}`}>
        <div ref={frame} className="tn:absolute tn:inset-0">
          <motion.div
            data-label-inside={inside ? true : undefined}
            initial={false}
            animate={{ bottom: open ? 0 : -errorHeight, height, borderRadius: open || inside?.error ? "var(--tn-radius-overlay)" : "var(--tn-radius-control)" }}
            transition={shape}
            onAnimationComplete={() => {
              settle();
              if (!open) setPresent(false);
            }}
            className={`tn:absolute tn:inset-x-0 tn:flex tn:overflow-hidden tn:bg-paper tn:shadow-control tn:transition-shadow tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] ${open ? "tn:[--tn-shadow-control-drop:initial]" : ""} ${present ? "" : "tn:has-keyboard-focus:outline-2"} ${present || disabled ? "" : "tn:hover:bg-hover"} tn:outline-offset-2 tn:has-keyboard-focus:outline-focus ${up ? "tn:flex-col-reverse" : "tn:top-0 tn:flex-col"}`}
          >
            <div className="tn:relative tn:shrink-0">
              {inside && <FloatingLabel aria-hidden floated={focused || inputValue !== ""} className="tn:left-5">{inside.label}</FloatingLabel>}
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
                aria-activedescendant={open && flat[active] ? `${listId}-${active}` : undefined}
                placeholder={placeholder}
                value={inputValue}
                onClick={() => { if (!open) show(); }}
                onFocus={() => setFocused(true)}
                onBlur={() => { setFocused(false); setOpen(false); }}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(optionRows(matches(event.target.value)).options.findIndex((option) => !option.disabled));
                  setOpen(true);
                }}
                onKeyDown={onKeyDown}
                className={`tn:block tn:w-full tn:bg-transparent tn:text-body tn:text-ink tn:outline-none ${inside ? "tn:h-12 tn:pt-5 tn:pr-11 tn:pb-1 tn:pl-5 tn:placeholder:text-transparent tn:focus:placeholder:text-muted" : "tn:h-11 tn:pr-10 tn:pl-4 tn:placeholder:text-muted"}`}
              />
              <Icon name="chevronsUpDown" className={`tn:pointer-events-none tn:absolute tn:text-muted ${inside ? "tn:top-4.5 tn:right-5" : "tn:top-3.5 tn:right-4"}`} />
              {inside && (
                <motion.div
                  initial={false}
                  animate={{ height: open ? 0 : errorHeight, opacity: open ? 0 : 1 }}
                  transition={{ height: shape, opacity: soft }}
                  className="tn:overflow-hidden"
                >
                  <div ref={measureError}>
                    <ErrorRow aria-hidden error={inside.error} />
                  </div>
                </motion.div>
              )}
            </div>
            <div inert={!open} className={`tn:shrink-0 tn:border-line ${up ? "tn:border-b" : "tn:border-t"}`}>
              <ul ref={list} id={listId} role="listbox" aria-label={field?.labelId ? undefined : label} aria-labelledby={field?.labelId} style={{ height: contentHeight, maxHeight }} className="tn:relative tn:m-1.5 tn:overflow-y-auto tn:overscroll-contain">
                {flat[active] && <ListHighlight index={rows[active]} />}
                <AnimatePresence initial={false}>
                  {results.map((entry, n) =>
                    "options" in entry ? (
                      <li key={entry.label} role="none">
                        <ul role="group" aria-labelledby={`${listId}-group-${n}`}>
                          <motion.li
                            id={`${listId}-group-${n}`}
                            role="presentation"
                            initial={{ opacity: 0, filter: "blur(4px)", y: (rows[flat.indexOf(entry.options[0])] - 1) * ROW }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: (rows[flat.indexOf(entry.options[0])] - 1) * ROW }}
                            exit={{ opacity: 0, filter: "blur(4px)" }}
                            transition={{ y: shape, opacity: soft, filter: soft }}
                            onMouseDown={(event) => event.preventDefault()}
                            className="tn:absolute tn:inset-x-0 tn:top-0 tn:flex tn:h-10 tn:items-center tn:px-2.5 tn:text-label tn:font-medium tn:text-muted"
                          >
                            <span className="tn:truncate">{entry.label}</span>
                          </motion.li>
                          <AnimatePresence initial={false}>{entry.options.map(row)}</AnimatePresence>
                        </ul>
                      </li>
                    ) : row(entry),
                  )}
                </AnimatePresence>
                <AnimatePresence initial={false}>
                  {results.length === 0 && <motion.li key="empty" {...swap} className="tn:flex tn:h-10 tn:origin-left tn:items-center tn:px-2.5 tn:text-sm tn:text-muted">{emptyText}</motion.li>}
                </AnimatePresence>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
