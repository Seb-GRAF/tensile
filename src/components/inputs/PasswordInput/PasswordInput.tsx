import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";
import { useField } from "../Field/Field";
import { Input, type InputProps } from "../Input/Input";

export type PasswordInputProps = InputProps & {
  showLabel?: string;
  hideLabel?: string;
};

export function PasswordInput({
  autoComplete = "current-password",
  showLabel = "Show password",
  hideLabel = "Hide password",
  disabled,
  trailing,
  ...props
}: PasswordInputProps) {
  const { swap } = useSprings();
  const field = useField();
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      autoComplete={autoComplete}
      disabled={disabled}
      trailing={
        <>
          {trailing}
          <IconButton
            label={visible ? hideLabel : showLabel}
            variant="ghost"
            size="sm"
            disabled={field?.disabled || disabled}
            onClick={() => setVisible(!visible)}
            className="-mr-2.5"
          >
            <span className="grid">
              <AnimatePresence initial={false}>
                <motion.span key={visible ? "visible" : "hidden"} {...swap} className="col-start-1 row-start-1">
                  <Icon>
                    {visible ? (
                      <path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.3A10 10 0 0 1 12 5c7 0 10 7 10 7a16 16 0 0 1-3.1 4.1M6.2 6.2A19 19 0 0 0 2 12s3 7 10 7a11 11 0 0 0 5.8-1.8" />
                    ) : (
                      <>
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </Icon>
                </motion.span>
              </AnimatePresence>
            </span>
          </IconButton>
        </>
      }
    />
  );
}
