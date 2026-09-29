import { AnimatePresence, motion } from "motion/react";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { Icon } from "../../data-display/Icon/Icon";
import { Spinner } from "../Spinner/Spinner";

export type ToastProps = {
  status: "loading" | "success";
  children?: string;
  className?: string;
};

export function Toast({ status, children = "Link copied", className = "" }: ToastProps) {
  const { shape, swap } = useSprings();
  const [width, measure] = useWidth();

  return (
    <motion.div
      role="status"
      initial={false}
      animate={{ width }}
      transition={shape}
      className={`grid h-11 place-content-center place-items-center overflow-hidden rounded-control bg-ink text-sm font-medium text-paper shadow-float ${className}`}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={`${status} ${children}`}
          ref={measure}
          {...swap}
          className="col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap px-5"
        >
          {status === "loading" ? (
            <Spinner size={14} />
          ) : (
            <Icon size={16}>
              <circle cx="12" cy="12" r="12" className="fill-accent stroke-none" />
              <path d="M7.125 12.375 10.5 15.75l6.375-6.75" className="stroke-on-accent" />
            </Icon>
          )}
          {children}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
