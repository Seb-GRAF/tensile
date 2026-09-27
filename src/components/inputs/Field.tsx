import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useId } from "react";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { Icon } from "../data-display/Icon";

export type FieldProps = {
  label: string;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const FieldContext = createContext<{
  id?: string;
  labelId?: string;
  describedBy?: string;
  invalid?: boolean;
  required?: boolean;
  disabled: boolean;
} | null>(null);

/** The enclosing `Field`'s ids and state for its control, or null outside one; directly inside a `Fieldset`, only `disabled`. */
export function useField() {
  return useContext(FieldContext);
}

export function Field({
  label,
  description,
  error,
  required = false,
  disabled = false,
  children,
  className = "",
}: FieldProps) {
  const fieldset = useField();
  const { swap } = useSprings();
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(" ") || undefined;

  return (
    <FieldContext
      value={{ id, labelId, describedBy, invalid: !!error, required, disabled: disabled || !!fieldset?.disabled }}
    >
      <div className={className}>
        <label id={labelId} htmlFor={id} className="mb-1.5 block text-label font-medium text-ink">
          {label}
          {required && <span aria-hidden> *</span>}
        </label>
        {children}
        {description && (
          <p id={descriptionId} className="mt-1.5 text-label text-muted">
            {description}
          </p>
        )}
        <div id={errorId} className="grid">
          <AnimatePresence initial={false}>
            {error && (
              <motion.p
                key={error}
                {...swap}
                className="col-start-1 row-start-1 mt-1.5 flex origin-left gap-2 text-label text-ink"
              >
                <Icon size={14} className="mt-0.75">
                  {icons.alert}
                </Icon>
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FieldContext>
  );
}
