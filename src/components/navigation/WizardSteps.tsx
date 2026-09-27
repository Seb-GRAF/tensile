import { AnimatePresence, motion } from "motion/react";
import { Check } from "../../Check";
import { soft, swap } from "../../springs";

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
};

const dotColors = {
  done: { backgroundColor: "var(--color-accent)", color: "var(--color-ink)" },
  current: { backgroundColor: "var(--color-ink)", color: "var(--color-paper)" },
  upcoming: { backgroundColor: "var(--color-line)", color: "var(--color-muted)" },
};

export function WizardSteps({
  steps,
  value,
  doneLabel = "Done",
  currentLabel = "Current",
  upcomingLabel = "Upcoming",
}: WizardStepsProps) {
  return (
    <div className="rounded-3xl bg-paper py-5 shadow-float">
      <div className="relative">
        <svg aria-hidden className="absolute top-[15px] left-12 h-0.5 w-[calc(100%-6rem)]" strokeWidth={2}>
          <line x1={0} x2="100%" y1={1} y2={1} className="stroke-line" />
          <motion.line
            x1={0}
            x2="100%"
            y1={1}
            y2={1}
            initial={false}
            animate={{ pathLength: value / (steps.length - 1) }}
            transition={soft}
            className="stroke-ink"
          />
        </svg>
        <ol className="grid auto-cols-[96px] grid-flow-col">
          {steps.map((step, i) => {
            const state = i < value ? "done" : i === value ? "current" : "upcoming";
            return (
              <li
                key={step.label}
                aria-current={state === "current" ? "step" : undefined}
                className="flex flex-col items-center gap-2"
              >
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={dotColors[state]}
                  transition={soft}
                  className="relative grid size-8 place-content-center place-items-center rounded-full"
                >
                  <AnimatePresence initial={false}>
                    {state === "done" ? (
                      <motion.span key="done" {...swap} className="col-start-1 row-start-1">
                        <Check size={16} />
                      </motion.span>
                    ) : (
                      <motion.span key="icon" {...swap} className="col-start-1 row-start-1 grid">
                        {step.icon}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
                <motion.span
                  initial={false}
                  animate={{ color: state === "current" ? "var(--color-ink)" : "var(--color-muted)" }}
                  transition={soft}
                  className="text-[13px] font-medium"
                >
                  {step.label}
                </motion.span>
                <span className="sr-only">{{ done: doneLabel, current: currentLabel, upcoming: upcomingLabel }[state]}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
