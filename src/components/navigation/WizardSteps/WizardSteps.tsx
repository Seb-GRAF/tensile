import { AnimatePresence, motion } from "motion/react";
import { Check } from "../../../Check";
import { useSprings } from "../../../springs";

export type WizardStepsProps = {
  steps: { label: string; icon?: React.ReactNode }[];
  /** Index of the current step. */
  value: number;
  /** Read out after the label of a finished step. */
  doneLabel?: string;
  /** Read out after the label of the current step. */
  currentLabel?: string;
  /** Read out after the label of a step not reached yet. */
  upcomingLabel?: string;
  className?: string;
};

const dotColors = {
  done: { backgroundColor: "var(--tn-color-accent)", color: "var(--tn-color-on-accent)" },
  current: { backgroundColor: "var(--tn-color-ink)", color: "var(--tn-color-paper)" },
  upcoming: { backgroundColor: "var(--tn-color-hover)", color: "var(--tn-color-muted)" },
};

export function WizardSteps({
  steps,
  value,
  doneLabel = "Done",
  currentLabel = "Current",
  upcomingLabel = "Upcoming",
  className = "",
}: WizardStepsProps) {
  const { soft, draw, swap, scale } = useSprings();
  const arrive = { ...soft, delay: 0.4 * scale };
  return (
    <div className={`tn:relative ${className}`}>
      <svg aria-hidden className="tn:absolute tn:top-[15px] tn:h-0.5" style={{ left: `${50 / steps.length}%`, width: `${100 - 100 / steps.length}%` }} strokeWidth={2}>
        <line x1={0} x2="100%" y1={1} y2={1} className="tn:stroke-line" />
        <motion.line
          x1={0}
          x2="100%"
          y1={1}
          y2={1}
          initial={false}
          animate={{ pathLength: value / (steps.length - 1) }}
          transition={draw}
          className="tn:stroke-ink"
        />
      </svg>
      <ol role="list" className="tn:grid tn:auto-cols-fr tn:grid-flow-col">
        {steps.map((step, i) => {
          const state = i < value ? "done" : i === value ? "current" : "upcoming";
          return (
            <li
              key={step.label}
              aria-current={state === "current" ? "step" : undefined}
              className="tn:flex tn:min-w-0 tn:flex-col tn:items-center tn:gap-2"
            >
              <motion.span
                aria-hidden
                initial={false}
                animate={dotColors[state]}
                transition={state === "current" ? arrive : soft}
                className="tn:relative tn:grid tn:size-8 tn:place-content-center tn:place-items-center tn:rounded-full"
              >
                <AnimatePresence initial={false}>
                  {state === "done" ? (
                    <motion.span key="done" {...swap} className="tn:col-start-1 tn:row-start-1">
                      <Check size={16} />
                    </motion.span>
                  ) : (
                    <motion.span key="icon" {...swap} className="tn:col-start-1 tn:row-start-1 tn:grid">
                      {step.icon}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <motion.span
                initial={false}
                animate={{ color: state === "current" ? "var(--tn-color-ink)" : "var(--tn-color-muted)" }}
                transition={state === "current" ? arrive : soft}
                className="tn:max-w-full tn:truncate tn:px-2 tn:text-label tn:font-medium"
              >
                {step.label}
              </motion.span>
              <span className="tn:sr-only">{{ done: doneLabel, current: currentLabel, upcoming: upcomingLabel }[state]}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
