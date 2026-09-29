import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { icons } from "../../../icons";
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
        <legend className="text-body font-semibold text-ink">{legend}</legend>
        {description && (
          <p id={descriptionId} className="mt-1 text-label text-muted">
            {description}
          </p>
        )}
        <div className="mt-4 grid gap-4">{children}</div>
        <motion.div
          id={errorId}
          initial={false}
          animate={{ height: error ? "auto" : 0 }}
          transition={shape}
          className="grid overflow-hidden"
        >
          <AnimatePresence initial={false}>
            {error && (
              <motion.p
                key={error}
                {...swap}
                className="col-start-1 row-start-1 mt-4 flex origin-left gap-2 text-label text-ink"
              >
                <Icon size={14} className="mt-0.75">
                  {icons.alert}
                </Icon>
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </fieldset>
    </FieldContext>
  );
}
