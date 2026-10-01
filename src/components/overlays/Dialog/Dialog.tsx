import { motion, useIsPresent } from "motion/react";
import { useId, useRef, useState } from "react";
import { useControllable } from "../../../controllable";
import { Modal } from "../../../Modal";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Button } from "../../actions/Button/Button";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Icon } from "../../data-display/Icon/Icon";

export type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  closeLabel?: string;
  role?: "dialog" | "alertdialog";
  "aria-describedby"?: string;
  className?: string;
};

export function Dialog({
  open: openProp,
  defaultOpen = false,
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
  const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
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
            setOpen(true);
          }}
          className={`${present ? "tn:opacity-0" : ""} ${className}`}
        >
          {trigger}
        </Button>
      )}
      <Modal open={open} onClose={() => setOpen(false)} role={role} aria-labelledby={titleId} aria-describedby={describedBy}>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={soft}
          onClick={role === "dialog" ? () => setOpen(false) : undefined}
          className="tn:absolute tn:inset-0 tn:bg-scrim/40"
        />
        <DialogPanel
          key="panel"
          button={button}
          title={title}
          titleId={titleId}
          closeLabel={closeLabel}
          role={role}
          trigger={trigger}
          onClose={() => setOpen(false)}
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
      return { left, top, width, height, borderRadius: "var(--tn-radius-control)" };
    }
    return { ...centered(0, 0), borderRadius: "var(--tn-radius-dialog)", opacity: 0 };
  });

  return (
    <motion.div
      initial={origin}
      animate={size ? { ...centered(size.width, size.height), borderRadius: "var(--tn-radius-dialog)", opacity: 1 } : origin}
      exit={origin}
      transition={{ default: shape, opacity: soft }}
      onAnimationComplete={() => {
        if (!present) onClosed();
      }}
      tabIndex={-1}
      data-autofocus={role === "dialog" ? "" : undefined}
      className="tn:absolute tn:overflow-hidden tn:bg-paper tn:text-ink tn:shadow-float tn:surface tn:outline-none"
    >
      {trigger !== null && (
        <motion.div aria-hidden="true" initial={swap.animate} animate={swap.exit} exit={swap.animate} className="tn:absolute tn:inset-0 tn:grid tn:place-items-center tn:whitespace-nowrap tn:text-body tn:font-medium">
          {trigger}
        </motion.div>
      )}
      <motion.div
        ref={measure}
        {...swap}
        className="tn:absolute tn:top-1/2 tn:left-1/2 tn:flex tn:max-h-[calc(100dvh-2rem)] tn:w-[min(420px,calc(100vw-2rem))] tn:-translate-x-1/2 tn:-translate-y-1/2 tn:flex-col"
      >
        <div className="tn:flex tn:shrink-0 tn:items-center tn:justify-between tn:gap-3 tn:px-5 tn:pt-5">
          <h2 id={titleId} className="tn:text-body tn:font-semibold">{title}</h2>
          {role === "dialog" && (
            <IconButton label={closeLabel} variant="ghost" size="sm" onClick={onClose} className="tn:-my-1.5 tn:-mr-2 tn:shrink-0 tn:text-muted">
              <Icon size={16}>{icons.close}</Icon>
            </IconButton>
          )}
        </div>
        <div className="tn:scroll-fade tn:min-h-0 tn:overflow-y-auto tn:px-5 tn:pt-1 tn:pb-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}
