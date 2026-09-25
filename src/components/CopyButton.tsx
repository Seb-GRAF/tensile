import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check } from "../Check";
import { shape, swap } from "../springs";
import { useWidth } from "../useWidth";

export type CopyButtonProps = {
  /** Text written to the clipboard. */
  value: string;
  label?: string;
  copiedLabel?: string;
};

export function CopyButton({ value, label = "Copy", copiedLabel = "Copied" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [width, measure] = useWidth();

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={copy}
        aria-label={copied ? copiedLabel : label}
        initial={false}
        animate={{ width: copied ? width : 44 }}
        transition={shape}
        whileTap={{ scale: 0.96 }}
        className="grid h-11 place-content-center place-items-center overflow-hidden rounded-full bg-ink text-[15px] font-medium text-paper shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        <AnimatePresence initial={false}>
          {copied ? (
            <motion.span
              key={copiedLabel}
              ref={measure}
              {...swap}
              className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap pr-5 pl-4"
            >
              <span className="text-accent">
                <Check size={18} />
              </span>
              {copiedLabel}
            </motion.span>
          ) : (
            <motion.span key="idle" {...swap} className="col-start-1 row-start-1">
              <svg
                viewBox="0 0 24 24"
                className="size-[18px] fill-none stroke-current"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="8" y="8" width="13" height="13" rx="2.5" />
                <path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <span role="status" className="sr-only">
        {copied && copiedLabel}
      </span>
    </>
  );
}
