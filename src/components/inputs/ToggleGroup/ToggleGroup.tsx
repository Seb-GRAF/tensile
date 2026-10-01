import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { useSprings } from "../../../springs";
import { Button } from "../../actions/Button/Button";
import { IconButton } from "../../actions/IconButton/IconButton";
import { useField } from "../Field/Field";

export type ToggleGroupProps = {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
};

export function ToggleGroup({
  options,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  label = "Options",
  id,
  name,
  disabled = false,
  className = "",
}: ToggleGroupProps) {
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
  const { shape } = useSprings();
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

  return (
    <div
      role="group"
      id={field?.id ?? id}
      aria-label={field?.labelId ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      aria-disabled={disabled || undefined}
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
            <motion.span aria-hidden initial={false} animate={{ clipPath: pressed ? "inset(0% 0% 0% 0% round var(--tn-radius-control))" : "inset(50% 50% 50% 50% round var(--tn-radius-control))" }} transition={shape} className="tn:pointer-events-none tn:absolute tn:inset-0 tn:flex tn:items-center tn:justify-center tn:rounded-control tn:bg-ink tn:text-paper">
              {option.icon ?? option.label}
            </motion.span>
          </>
        );
        return option.icon ? <IconButton key={option.value} {...props} label={option.label}>{content}</IconButton> : <Button key={option.value} {...props}>{content}</Button>;
      })}
    </div>
  );
}
