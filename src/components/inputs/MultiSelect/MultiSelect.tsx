import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Check } from "../../../Check";
import { icons } from "../../../icons";
import { ListHighlight, scrollToRow, ROW, useActiveIndex, useTypeahead } from "../../../list";
import { useOutsidePress, useTopLayer } from "../../../overlay";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";
import { ErrorRow, FloatingLabel, useField } from "../Field/Field";

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
  const { shape, soft, swap } = useSprings();
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
  const index = options.findIndex((option) => value.includes(option.value));
  const labels = options.filter((option) => value.includes(option.value)).map((option) => option.label);
  const text = labels.length === 0 ? placeholder : summary(labels);
  const floated = focused || index !== -1;
  const [active, setActive, onArrowKey] = useActiveIndex(options.length);
  const onTypeahead = useTypeahead(options, open ? active : index, (i) => {
    setActive(i);
    setOpen(true);
  });
  const { room, settle } = useTopLayer(frame, open);
  useOutsidePress(frame, open, () => setOpen(false));
  const triggerHeight = inside ? 52 : 44;
  const errorHeight = inside?.error && errorSize ? errorSize.height : 0;
  const contentHeight = Math.max(1, options.length) * ROW;
  const up = room !== undefined && room.below < contentHeight + 13 && room.above > room.below;
  const maxHeight = room === undefined ? contentHeight : Math.max(0, (up ? room.above : room.below) - 13);
  const height = open ? triggerHeight + 13 + Math.min(contentHeight, maxHeight) : triggerHeight + errorHeight;

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
    <motion.div
      initial={false}
      animate={{ height: triggerHeight + errorHeight }}
      transition={shape}
      className={`${disabled ? "opacity-40" : ""} ${className}`}
    >
      {name && value.map((item) => <input key={item} type="hidden" name={name} value={item} disabled={disabled} />)}
      <div className={`relative ${inside ? "h-13" : "h-11"}`}>
        <div ref={frame} className="absolute inset-0">
          <motion.div
            data-label-inside={inside ? true : undefined}
            initial={false}
            animate={{ bottom: open ? 0 : -errorHeight, height, borderRadius: open || inside?.error ? "var(--radius-overlay)" : "var(--radius-control)" }}
            transition={shape}
            onAnimationComplete={() => {
              settle();
              if (!open) setPresent(false);
            }}
            className={`absolute inset-x-0 flex overflow-hidden bg-paper shadow-control transition-shadow duration-[calc(300ms*var(--motion-duration-scale))] ${open ? "[--shadow-control-drop:initial]" : ""} ${present ? "" : "has-focus-visible:outline-2"} ${present || disabled ? "" : "hover:bg-hover"} outline-offset-2 has-focus-visible:outline-focus ${up ? "flex-col-reverse" : "top-0 flex-col"}`}
          >
            <div className="shrink-0">
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
                onFocus={disabled ? undefined : () => setFocused(true)}
                onBlur={() => { setFocused(false); setOpen(false); }}
                onKeyDown={disabled ? undefined : onKeyDown}
                className={`flex cursor-pointer items-center gap-2.5 text-body outline-none ${inside ? "h-13 px-5" : "h-11 px-4"}`}
              >
                <span className="sr-only">{text}</span>
                <span aria-hidden className={`grid min-w-0 grow grid-cols-1 ${inside ? "relative h-full pt-6 pb-2" : ""}`}>
                  {inside && <FloatingLabel floated={floated} className="left-0">{inside.label}</FloatingLabel>}
                  <AnimatePresence initial={false}>
                    {(!inside || floated) && <motion.span key={text} {...swap} className={`col-start-1 row-start-1 truncate ${index === -1 ? "text-muted" : "text-ink"}`}>{text}</motion.span>}
                  </AnimatePresence>
                </span>
                <Icon className="shrink-0 text-muted">{icons.chevronsUpDown}</Icon>
              </div>
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
            <div inert={!open} className={`surface shrink-0 border-line ${up ? "border-b" : "border-t"}`}>
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
                    <span aria-hidden className="relative ml-auto grid size-5 shrink-0 place-items-center rounded-[calc(var(--radius-control)/4)] bg-paper text-on-accent shadow-control">
                      <motion.span initial={false} animate={{ opacity: value.includes(option.value) ? 1 : 0 }} transition={soft} className="absolute inset-0 rounded-[inherit] bg-accent" />
                      <AnimatePresence initial={false}>
                        {value.includes(option.value) && <motion.span key="check" {...swap} className="relative"><Check size={16} /></motion.span>}
                      </AnimatePresence>
                    </span>
                  </li>
                ))}
                {options.length === 0 && <li className="flex h-10 items-center px-2.5 text-sm text-muted">{emptyText}</li>}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
