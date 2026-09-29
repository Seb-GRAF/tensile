import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useId } from "react";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { Icon } from "../../data-display/Icon/Icon";

export type FieldProps = {
  label: string;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** Where text controls (Input, Textarea, Select, Combobox, MultiSelect, TagInput) show the label and the error: inside their shape, the label floating up while focused or filled, or above and below it. Other controls always use above. */
  labelPlacement?: "inside" | "above";
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
  /** With `labelPlacement="inside"`: the label as drawn (with the required mark) and the error, for a text control to draw inside its shape. */
  inside?: { label: string; error?: string };
} | null>(null);

/** The enclosing `Field`'s ids and state for its control, or null outside one; directly inside a `Fieldset`, only `disabled`. */
export function useField() {
  return useContext(FieldContext);
}

/** A text control's label, resting where the value goes and floating above it while `floated`; `className` places it. */
export function FloatingLabel({
  floated,
  className,
  children,
  "aria-hidden": hidden,
}: {
  floated: boolean;
  className: string;
  children: React.ReactNode;
  "aria-hidden"?: boolean;
}) {
  const { shape } = useSprings();
  return (
    <motion.span
      aria-hidden={hidden}
      initial={false}
      animate={{ y: floated ? -10 : 0, scale: floated ? 11 / 15 : 1 }}
      transition={shape}
      className={`pointer-events-none absolute top-0 origin-left text-body leading-13 text-muted ${className}`}
    >
      {children}
    </motion.span>
  );
}

/** The line and the blur-swapped error under a text control's value, inside its shape, which grows to show them. */
export function ErrorRow({ id, error, "aria-hidden": hidden }: { id?: string; error?: string; "aria-hidden"?: boolean }) {
  const { swap } = useSprings();
  return (
    <>
      <div className="h-px bg-line" />
      <div id={id} aria-hidden={hidden} className="grid">
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              key={error}
              {...swap}
              className="col-start-1 row-start-1 flex origin-left items-center gap-2 px-5 py-2.5 text-label text-ink"
            >
              <Icon size={14}>{icons.alert}</Icon>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export function Field({
  label,
  description,
  error,
  required = false,
  disabled = false,
  labelPlacement = "inside",
  children,
  className = "",
}: FieldProps) {
  const fieldset = useField();
  const { shape, swap } = useSprings();
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(" ") || undefined;
  const inside = labelPlacement === "inside" ? { label: required ? `${label} *` : label, error } : undefined;
  const indent = labelPlacement === "above" ? "px-4" : "";

  return (
    <FieldContext
      value={{ id, labelId, describedBy, invalid: !!error, required, disabled: disabled || !!fieldset?.disabled, inside }}
    >
      <div className={`group/field ${className}`}>
        <label
          id={labelId}
          htmlFor={id}
          className={`mb-1.5 block text-label font-medium text-ink group-has-[[data-label-inside]]/field:sr-only ${indent}`}
        >
          {label}
          {required && <span aria-hidden> *</span>}
        </label>
        {children}
        {description && (
          <p id={descriptionId} className={`mt-1.5 text-label text-muted group-has-[[data-label-inside]]/field:px-5 ${indent}`}>
            {description}
          </p>
        )}
        <motion.div
          id={errorId}
          initial={false}
          animate={{ height: error ? "auto" : 0 }}
          transition={shape}
          className={`grid overflow-hidden group-has-[[data-label-inside]]/field:sr-only ${indent}`}
        >
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
        </motion.div>
      </div>
    </FieldContext>
  );
}
