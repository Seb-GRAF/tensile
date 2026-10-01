import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check } from "../../../Check";
import { useControllable } from "../../../controllable";
import { ListHighlight, optionRows, scrollToRow, ROW, useActiveIndex, useTypeahead, type Option, type Options } from "../../../list";
import { useOutsidePress, useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";
import { ErrorRow, FloatingLabel, useField } from "../Field/Field";

export type SelectProps = {
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

const openKeys = ["Enter", " ", "ArrowDown", "ArrowUp"];

export function Select({
  options,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  placeholder = "Select",
  label = "Choose an option",
  emptyText = "No options",
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: SelectProps) {
  const { shape, soft, swap } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const field = useField();
  const inside = field?.inside;
  disabled = disabled || !!field?.disabled;
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  if (open && !present) setPresent(true);
  const [focused, setFocused] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const [errorSize, measureError] = useSize();
  const { options: flat, rows, count } = optionRows(options);
  const index = flat.findIndex((option) => option.value === value);
  const text = index === -1 ? placeholder : flat[index].label;
  const floated = focused || index !== -1;
  const isDisabled = (i: number) => !!flat[i].disabled;
  const [active, setActive, onArrowKey] = useActiveIndex(flat.length, isDisabled);
  const onTypeahead = useTypeahead(flat, open ? active : index, (i) => {
    setActive(i);
    if (!open) setValue(flat[i].value);
  }, isDisabled);
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
  }, [open, active, options, listId]);

  function show() {
    setActive(index === -1 ? flat.findIndex((option) => !option.disabled) : index);
    setOpen(true);
  }

  function pick(choice: string) {
    setValue(choice);
    setOpen(false);
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
      if (flat[active]) pick(flat[active].value);
    } else {
      onArrowKey(event);
      onTypeahead(event);
    }
  }

  function row(option: Option) {
    const i = flat.indexOf(option);
    return (
      <li
        key={option.value}
        id={`${listId}-${i}`}
        role="option"
        aria-selected={option.value === value}
        aria-disabled={option.disabled || undefined}
        onMouseDown={(event) => event.preventDefault()}
        onMouseMove={option.disabled ? undefined : () => setActive(i)}
        onClick={option.disabled ? undefined : () => pick(option.value)}
        className={`tn:relative tn:flex tn:h-10 tn:items-center tn:gap-2.5 tn:px-2.5 tn:text-sm tn:text-ink ${option.disabled ? "tn:opacity-40" : "tn:cursor-pointer"}`}
      >
        {option.icon && <span className="tn:shrink-0 tn:text-muted">{option.icon}</span>}
        <span className="tn:truncate">{option.label}</span>
        <AnimatePresence initial={false}>
          {i === index && <motion.span key="check" {...swap} className="tn:ml-auto tn:shrink-0"><Check size={16} /></motion.span>}
        </AnimatePresence>
      </li>
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
            className={`tn:absolute tn:inset-x-0 tn:flex tn:overflow-hidden tn:bg-paper tn:shadow-control tn:transition-shadow tn:duration-[calc(300ms*var(--tn-motion-duration-scale))] ${open ? "tn:[--tn-shadow-control-drop:initial]" : ""} ${present ? "" : "tn:has-focus-visible:outline-2"} ${present || disabled ? "" : "tn:hover:bg-hover"} tn:outline-offset-2 tn:has-focus-visible:outline-focus ${up ? "tn:flex-col-reverse" : "tn:top-0 tn:flex-col"}`}
          >
            <div className="tn:shrink-0">
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
                aria-activedescendant={open && flat[active] ? `${listId}-${active}` : undefined}
                onClick={disabled ? undefined : () => open ? setOpen(false) : show()}
                onFocus={disabled ? undefined : () => setFocused(true)}
                onBlur={() => { setFocused(false); setOpen(false); }}
                onKeyDown={disabled ? undefined : onKeyDown}
                className={`tn:flex tn:cursor-pointer tn:items-center tn:gap-2.5 tn:text-body tn:outline-none ${inside ? "tn:h-12 tn:px-5" : "tn:h-11 tn:px-4"}`}
              >
                <span className="tn:sr-only">{text}</span>
                <span aria-hidden className={`tn:grid tn:min-w-0 tn:grow tn:grid-cols-1 ${inside ? "tn:relative tn:h-full tn:pt-5 tn:pb-1" : ""}`}>
                  {inside && <FloatingLabel floated={floated} className="tn:left-0">{inside.label}</FloatingLabel>}
                  <AnimatePresence initial={false}>
                    {(!inside || floated) && <motion.span key={text} {...swap} className={`tn:col-start-1 tn:row-start-1 tn:truncate ${index === -1 ? "tn:text-muted" : "tn:text-ink"}`}>{text}</motion.span>}
                  </AnimatePresence>
                </span>
                <Icon name="chevronsUpDown" className="tn:shrink-0 tn:text-muted" />
              </div>
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
              <ul ref={list} id={listId} role="listbox" aria-label={field?.labelId ? undefined : label} aria-labelledby={field?.labelId} style={{ maxHeight }} className="tn:relative tn:m-1.5 tn:overflow-y-auto tn:overscroll-contain">
                {flat[active] && <ListHighlight index={rows[active]} />}
                {options.map((entry, n) =>
                  "options" in entry ? (
                    <li key={entry.label} role="none">
                      <ul role="group" aria-labelledby={`${listId}-group-${n}`}>
                        <li id={`${listId}-group-${n}`} role="presentation" onMouseDown={(event) => event.preventDefault()} className="tn:flex tn:h-10 tn:items-center tn:px-2.5 tn:text-label tn:font-medium tn:text-muted">
                          <span className="tn:truncate">{entry.label}</span>
                        </li>
                        {entry.options.map(row)}
                      </ul>
                    </li>
                  ) : row(entry),
                )}
                {options.length === 0 && <li className="tn:flex tn:h-10 tn:items-center tn:px-2.5 tn:text-sm tn:text-muted">{emptyText}</li>}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
