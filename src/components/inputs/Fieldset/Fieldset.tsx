import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";
import { FieldContext } from "../Field/Field";

export type FieldsetProps = {
  legend: string;
  description?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Fieldset({ legend, description, error, disabled = false, children, className = "" }: FieldsetProps) {
  const { shape, swap } = useSprings();
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <FieldContext value={{ disabled }}>
      <fieldset
        disabled={disabled}
        aria-describedby={[description && descriptionId, error && errorId].filter(Boolean).join(" ") || undefined}
        className={className}
      >
        <legend className="tn:text-body tn:font-semibold tn:text-ink">{legend}</legend>
        {description && (
          <p id={descriptionId} className="tn:mt-1 tn:text-label tn:text-muted">
            {description}
          </p>
        )}
        <div className="tn:mt-4 tn:grid tn:gap-4">{children}</div>
        <motion.div
          id={errorId}
          initial={false}
          animate={{ height: error ? "auto" : 0 }}
          transition={shape}
          className="tn:grid tn:overflow-hidden"
        >
          <AnimatePresence initial={false}>
            {error && (
              <motion.p
                key={error}
                {...swap}
                className="tn:col-start-1 tn:row-start-1 tn:mt-4 tn:flex tn:origin-left tn:gap-2 tn:text-label tn:text-ink"
              >
                <Icon name="alert" size={14} className="tn:mt-0.75" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </fieldset>
    </FieldContext>
  );
}
