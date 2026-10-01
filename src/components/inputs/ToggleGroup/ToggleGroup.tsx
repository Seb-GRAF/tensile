import { motion, useMotionTemplate } from "motion/react";
import { useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { useLiquid, useSprings } from "../../../springs";
import { Button } from "../../actions/Button/Button";
import { IconButton } from "../../actions/IconButton/IconButton";
import { useField } from "../Field/Field";

export type ToggleGroupProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
} & (
  | {
      /** "multiple" lets any number of buttons be pressed; "single" picks exactly one, in a segmented row. */
      type?: "multiple";
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    }
  | {
      type: "single";
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    }
);

export function ToggleGroup({
  options,
  type = "multiple",
  value: valueProp,
  defaultValue = type === "single" ? options[0].value : [],
  onValueChange,
  label = "Options",
  id,
  name,
  disabled = false,
  className = "",
}: ToggleGroupProps) {
  const [value, setValue] = useControllable<string | string[]>(valueProp, defaultValue, onValueChange as (value: string | string[]) => void);
  const { soft } = useSprings();
  const field = useField();
  disabled = disabled || !!field?.disabled;
  const [focused, setFocused] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const targets: Record<string, number> = { ArrowLeft: focused - 1, ArrowRight: focused + 1, Home: 0, End: options.length - 1 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    buttons.current[(target + options.length) % options.length]!.focus();
  }

  const group = {
    id: field?.id ?? id,
    "aria-label": field?.labelId ? undefined : label,
    "aria-labelledby": field?.labelId,
    "aria-describedby": field?.describedBy,
    "aria-disabled": disabled || undefined,
  };

  if (!Array.isArray(value)) return <Segmented options={options} value={value} onValueChange={setValue} name={name} disabled={disabled} group={group} className={className} />;

  return (
    <div
      role="group"
      {...group}
      onKeyDown={onKeyDown}
      className={`tn:flex tn:flex-wrap tn:gap-2 ${className}`}
    >
      {name && value.map((item) => <input key={item} type="hidden" name={name} value={item} disabled={disabled} />)}
      {options.map((option, i) => {
        const pressed = value.includes(option.value);
        const props = {
          ref: (button: HTMLButtonElement | null) => { buttons.current[i] = button; },
          variant: "secondary" as const,
          size: "sm" as const,
          className: "tn:relative",
          disabled,
          "aria-pressed": pressed,
          tabIndex: i === focused ? 0 : -1,
          onFocus: () => setFocused(i),
          onClick: () => setValue(pressed ? value.filter((item) => item !== option.value) : [...value, option.value]),
        };
        const content = (
          <>
            {option.icon ?? option.label}
            <motion.span aria-hidden initial={false} animate={{ opacity: pressed ? 1 : 0 }} transition={soft} className="tn:pointer-events-none tn:absolute tn:inset-0 tn:flex tn:items-center tn:justify-center tn:rounded-control tn:bg-ink tn:text-paper">
              {option.icon ?? option.label}
            </motion.span>
          </>
        );
        return option.icon ? <IconButton key={option.value} {...props} label={option.label} icon={content} /> : <Button key={option.value} {...props}>{content}</Button>;
      })}
    </div>
  );
}

function Segmented({ options, value, onValueChange, name, disabled, group, className }: {
  options: ToggleGroupProps["options"];
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
  disabled: boolean;
  group: React.ComponentProps<"div">;
  className: string;
}) {
  const index = options.findIndex((option) => option.value === value);
  const step = 100 / options.length;
  const [left, right] = useLiquid(index * step, (options.length - 1 - index) * step);
  const indicatorLeft = useMotionTemplate`${left}%`;
  const indicatorRight = useMotionTemplate`${right}%`;
  const clip = useMotionTemplate`inset(0 ${right}% 0 ${left}% round var(--tn-radius-control))`;
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const from = radios.current.indexOf(event.target as HTMLButtonElement);
    const targets: Record<string, number> = { ArrowLeft: from - 1, ArrowUp: from - 1, ArrowRight: from + 1, ArrowDown: from + 1, Home: 0, End: options.length - 1 };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = (target + options.length) % options.length;
    onValueChange(options[next].value);
    radios.current[next]!.focus();
  }

  return (
    <div role="radiogroup" {...group} onKeyDown={onKeyDown} className={`tn:inline-block tn:max-w-full tn:rounded-control tn:bg-paper tn:p-[3px] tn:shadow-control tn:has-[:disabled]:opacity-40 ${className}`}>
      {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
      <div className="tn:relative tn:grid tn:auto-cols-fr tn:grid-flow-col">
        {options.map((option, i) => (
          <button
            key={option.value}
            ref={(el) => {
              radios.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={i === index}
            tabIndex={i === index ? 0 : -1}
            disabled={disabled}
            onClick={() => onValueChange(option.value)}
            className="tn:flex tn:h-8 tn:items-center tn:justify-center tn:gap-1.5 tn:rounded-control tn:px-4 tn:text-label tn:font-medium tn:text-muted tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus"
          >
            {option.icon}
            <span className="tn:truncate">{option.label}</span>
          </button>
        ))}
        <motion.span
          aria-hidden
          style={{ left: indicatorLeft, right: indicatorRight }}
          className="tn:pointer-events-none tn:absolute tn:inset-y-0 tn:rounded-control tn:bg-ink"
        />
        <motion.span
          aria-hidden
          style={{ clipPath: clip }}
          className="tn:pointer-events-none tn:absolute tn:inset-0 tn:grid tn:auto-cols-fr tn:grid-flow-col tn:text-label tn:font-medium tn:text-paper"
        >
          {options.map((option) => (
            <span key={option.value} className="tn:flex tn:min-w-0 tn:items-center tn:justify-center tn:gap-1.5 tn:px-4">
              {option.icon}
              <span className="tn:truncate">{option.label}</span>
            </span>
          ))}
        </motion.span>
      </div>
    </div>
  );
}
