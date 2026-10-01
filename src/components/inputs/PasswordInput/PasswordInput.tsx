import { AnimatePresence, animate, motion } from "motion/react";
import { useImperativeHandle, useRef, useState } from "react";
import { flushSync } from "react-dom";
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
  ref,
  ...props
}: PasswordInputProps) {
  const { soft, swap } = useSprings();
  const field = useField();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");
  const input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => input.current!);

  function toggle() {
    const next = !visible;
    setVisible(next);
    animate(input.current!, { opacity: 0, filter: "blur(4px)" }, {
      ...swap.exit.transition,
      onComplete: () => {
        flushSync(() => setType(next ? "text" : "password"));
        animate(input.current!, { opacity: 1, filter: "blur(0px)" }, soft);
      },
    });
  }

  return (
    <Input
      {...props}
      ref={input}
      type={type}
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
            onClick={toggle}
            icon={
              <span className="tn:grid">
                <AnimatePresence initial={false}>
                  <motion.span key={visible ? "visible" : "hidden"} {...swap} className="tn:col-start-1 tn:row-start-1">
                    <Icon name={visible ? "eyeOff" : "eye"} />
                  </motion.span>
                </AnimatePresence>
              </span>
            }
            className="tn:-mr-2.5"
          />
        </>
      }
    />
  );
}
