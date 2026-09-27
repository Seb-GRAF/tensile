import { AnimatePresence, animate, motion, useMotionValue, useTransform, wrap } from "motion/react";
import { useEffect, useRef } from "react";
import { shape, swap } from "../../springs";

export type NumberTickerProps = {
  value: number;
  format?: (value: number) => string;
};

const STRIP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function Digit({ value, digit }: { value: number; digit: number }) {
  const previous = useRef(value);
  const target = useRef(digit);
  const position = useMotionValue(digit);
  const y = useTransform(position, (p) => `${-wrap(0, 10, p)}lh`);

  useEffect(() => {
    const up = value > previous.current;
    target.current += up ? wrap(0, 10, digit - target.current) : -wrap(0, 10, target.current - digit);
    previous.current = value;
    animate(position, target.current, shape);
  }, [value, digit, position]);

  return (
    <span className="block h-lh overflow-y-clip">
      <motion.span style={{ y }} className="flex flex-col">
        {STRIP.map((n, i) => (
          <span key={i}>{n}</span>
        ))}
      </motion.span>
    </span>
  );
}

export function NumberTicker({ value, format = (value: number) => value.toLocaleString("en-US") }: NumberTickerProps) {
  const text = format(value);
  const parts = text.match(/\d|\D+/g)!;

  return (
    <span className="inline-flex whitespace-pre tabular-nums">
      <span className="sr-only">{text}</span>
      <AnimatePresence initial={false}>
        {parts.map((part, i) => {
          const fromEnd = parts.length - 1 - i;
          const isDigit = /\d/.test(part);
          return (
            <motion.span
              key={isDigit ? fromEnd : i === 0 ? part : `${part}${fromEnd}`}
              aria-hidden
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ width: 0 }}
              transition={shape}
              className="flex justify-end overflow-x-clip"
            >
              <motion.span {...swap}>{isDigit ? <Digit value={value} digit={Number(part)} /> : part}</motion.span>
            </motion.span>
          );
        })}
      </AnimatePresence>
    </span>
  );
}
