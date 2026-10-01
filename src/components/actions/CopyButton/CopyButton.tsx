import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check } from "../../../Check";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { Icon } from "../../data-display/Icon/Icon";

export type CopyButtonProps = {
  /** Text written to the clipboard. */
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
};

export function CopyButton({ value, label = "Copy", copiedLabel = "Copied", className = "" }: CopyButtonProps) {
  const { shape, swap } = useSprings();
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
        className={`tn:grid tn:h-11 tn:place-content-center tn:place-items-center tn:overflow-hidden tn:rounded-control tn:bg-ink tn:text-body tn:font-medium tn:text-paper tn:shadow-control tn:outline-offset-2 tn:focus-visible:outline-2 tn:focus-visible:outline-focus tn:press ${className}`}
      >
        <AnimatePresence initial={false}>
          {copied ? (
            <motion.span
              key={copiedLabel}
              ref={measure}
              {...swap}
              className="tn:col-start-1 tn:row-start-1 tn:flex tn:items-center tn:gap-1.5 tn:whitespace-nowrap tn:pr-5 tn:pl-4"
            >
              <Check size={18} />
              {copiedLabel}
            </motion.span>
          ) : (
            <motion.span key="idle" {...swap} className="tn:col-start-1 tn:row-start-1">
              <Icon name="copy" size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <span role="status" className="tn:sr-only">
        {copied && copiedLabel}
      </span>
    </>
  );
}
