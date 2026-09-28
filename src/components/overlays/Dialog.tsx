import { motion, useIsPresent } from "motion/react";
import { useId, useRef, useState } from "react";
import { Modal } from "../../Modal";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { Button } from "../actions/Button";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  closeLabel?: string;
  role?: "dialog" | "alertdialog";
  "aria-describedby"?: string;
  className?: string;
};

export function Dialog({
  open,
  onOpenChange,
  children,
  trigger = "Open dialog",
  title = "Dialog",
  closeLabel = "Close",
  role = "dialog",
  "aria-describedby": describedBy,
  className = "",
}: DialogProps) {
  const { soft } = useSprings();
  const button = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [present, setPresent] = useState(open);
  if (open && !present) setPresent(true);

  return (
    <>
      {trigger !== null && (
        <Button
          ref={button}
          variant="secondary"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={(event) => {
            event.currentTarget.focus();
            onOpenChange(true);
          }}
          className={`${present ? "opacity-0" : ""} ${className}`}
        >
          {trigger}
        </Button>
      )}
      <Modal open={open} onClose={() => onOpenChange(false)} role={role} aria-labelledby={titleId} aria-describedby={describedBy}>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={soft}
          onClick={role === "dialog" ? () => onOpenChange(false) : undefined}
          className="absolute inset-0 bg-ink/40"
        />
        <DialogPanel
          key="panel"
          button={button}
          title={title}
          titleId={titleId}
          closeLabel={closeLabel}
          role={role}
          trigger={trigger}
          onClose={() => onOpenChange(false)}
          onClosed={() => setPresent(false)}
        >
          {children}
        </DialogPanel>
      </Modal>
    </>
  );
}

function centered(width: number, height: number) {
  const { clientWidth, clientHeight } = document.documentElement;
  return { left: (clientWidth - width) / 2, top: (clientHeight - height) / 2, width, height };
}

function DialogPanel({
  button,
  title,
  titleId,
  closeLabel,
  role,
  trigger,
  onClose,
  onClosed,
  children,
}: {
  button: React.RefObject<HTMLButtonElement | null>;
  title: string;
  titleId: string;
  closeLabel: string;
  role: "dialog" | "alertdialog";
  trigger: React.ReactNode;
  onClose: () => void;
  onClosed: () => void;
  children: React.ReactNode;
}) {
  const { shape, soft, swap } = useSprings();
  const present = useIsPresent();
  const [size, measure] = useSize();
  const [origin] = useState(() => {
    if (button.current) {
      const { left, top, width, height } = button.current.getBoundingClientRect();
      return { left, top, width, height, borderRadius: "var(--radius-control)" };
    }
    return { ...centered(0, 0), borderRadius: "var(--radius-dialog)", opacity: 0 };
  });

  return (
    <motion.div
      initial={origin}
      animate={size ? { ...centered(size.width, size.height), borderRadius: "var(--radius-dialog)", opacity: 1 } : origin}
      exit={origin}
      transition={{ default: shape, opacity: soft }}
      onAnimationComplete={() => {
        if (!present) onClosed();
      }}
      tabIndex={-1}
      data-autofocus={role === "dialog" ? "" : undefined}
      className="absolute overflow-hidden bg-paper text-ink shadow-float outline-none"
    >
      {trigger !== null && (
        <motion.div aria-hidden="true" initial={swap.animate} animate={swap.exit} exit={swap.animate} className="absolute inset-0 grid place-items-center whitespace-nowrap text-body font-medium">
          {trigger}
        </motion.div>
      )}
      <motion.div
        ref={measure}
        {...swap}
        className="absolute top-1/2 left-1/2 flex max-h-[calc(100dvh-2rem)] w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 px-5 pt-5">
          <h2 id={titleId} className="text-body font-semibold">{title}</h2>
          <IconButton label={closeLabel} variant="ghost" size="sm" onClick={onClose} className="-my-1.5 -mr-2 shrink-0 text-muted">
            <Icon size={16}>{icons.close}</Icon>
          </IconButton>
        </div>
        <div className="scroll-fade min-h-0 overflow-y-auto px-5 pt-1 pb-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}
