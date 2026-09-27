import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useSprings, useLiquid } from "../../springs";
import { useField } from "./Field";

export type OTPInputProps = {
  value: string;
  onValueChange: (value: string) => void;
  /** Number of digits in the code. */
  length?: number;
  label?: string;
  /** Names each cell, given its position from 1 and the number of digits. */
  cellLabel?: (position: number, length: number) => string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

const STEP = 52;
const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

export function OTPInput({
  value,
  onValueChange,
  length = 6,
  label = "Verification code",
  cellLabel = (position: number, length: number) => `Digit ${position} of ${length}`,
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: OTPInputProps) {
  const { soft, swap } = useSprings();
  const field = useField();
  const isDisabled = field?.disabled || disabled;
  const [active, setActive] = useState<number | null>(null);
  const index = active ?? Math.min(value.length, length - 1);
  const [left, right] = useLiquid(index * STEP, (length - 1 - index) * STEP);
  const cells = useRef<(HTMLInputElement | null)[]>([]);

  function fill(text: string) {
    const code = text.replace(/\D/g, "").slice(0, length);
    onValueChange(code);
    cells.current[Math.min(code.length, length - 1)]!.focus();
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>, i: number) {
    const text = event.target.value;
    if (text.length > 2) {
      fill(text);
      return;
    }
    const digit = text.length === 2 && text[0] === value[i] ? text[1] : text[0];
    if (!/\d/.test(digit)) return;
    onValueChange(value.slice(0, i) + digit + value.slice(i + 1));
    cells.current[Math.min(i + 1, length - 1)]!.focus();
  }

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const at = i < value.length ? i : i - 1;
      if (at < 0) return;
      onValueChange(value.slice(0, at) + value.slice(at + 1));
      cells.current[at]!.focus();
      return;
    }
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    cells.current[Math.max(0, Math.min(i + move, value.length, length - 1))]!.focus();
  }

  return (
    <div
      role="group"
      id={field?.id ?? id}
      aria-label={field?.labelId ? undefined : label}
      aria-labelledby={field?.labelId}
      aria-describedby={field?.describedBy}
      onPaste={(event) => {
        event.preventDefault();
        fill(event.clipboardData.getData("text"));
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
      }}
      className={`relative flex w-fit gap-2 ${isDisabled ? "opacity-40" : ""} ${className}`}
    >
      {name && <input type="hidden" name={name} value={value} disabled={isDisabled} />}
      {Array.from({ length }, (_, i) => {
        const digit = value.charAt(i);
        return (
          <div key={i} className="grid place-content-center place-items-center">
            <input
              ref={(el) => {
                cells.current[i] = el;
              }}
              value={digit}
              disabled={isDisabled}
              inputMode="numeric"
              autoComplete="one-time-code"
              aria-label={cellLabel(i + 1, length)}
              aria-invalid={field?.invalid}
              aria-required={field?.required || required}
              tabIndex={i === index ? 0 : -1}
              onMouseDown={(event) => {
                event.preventDefault();
                cells.current[Math.min(i, value.length)]!.focus();
              }}
              onFocus={() => setActive(i)}
              onChange={(event) => onChange(event, i)}
              onKeyDown={(event) => onKeyDown(event, i)}
              className="col-start-1 row-start-1 h-13 w-11 rounded-[calc(var(--radius-card)/2)] bg-paper text-center text-xl text-transparent shadow-float outline-none selection:bg-transparent"
            />
            <AnimatePresence initial={false}>
              {digit && (
                <motion.span
                  key={digit}
                  aria-hidden
                  {...swap}
                  className="pointer-events-none col-start-1 row-start-1 text-xl font-medium text-ink select-none"
                >
                  {digit}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: active === null ? 0 : 1 }}
        transition={soft}
        style={{ left, right }}
        className="pointer-events-none absolute inset-y-0 rounded-[calc(var(--radius-card)/2)] outline-2 outline-offset-2 outline-focus"
      />
    </div>
  );
}
