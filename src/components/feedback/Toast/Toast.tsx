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
      className={`tn:grid tn:h-11 tn:place-content-center tn:place-items-center tn:overflow-hidden tn:rounded-control tn:bg-ink tn:text-sm tn:font-medium tn:text-paper tn:shadow-float ${className}`}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={`${status} ${children}`}
          ref={measure}
          {...swap}
          className="tn:col-start-1 tn:row-start-1 tn:flex tn:items-center tn:gap-2 tn:whitespace-nowrap tn:px-5"
        >
          {status === "loading" ? (
            <Spinner size={14} />
          ) : (
            <Icon name="success" size={16} />
          )}
          {children}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
