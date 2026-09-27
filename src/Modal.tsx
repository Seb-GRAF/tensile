import { AnimatePresence } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ModalProps = Omit<React.ComponentProps<"dialog">, "open" | "onClose" | "onCancel"> & {
  open: boolean;
  /** Called on Escape; the owner closes by setting `open` to false. */
  onClose: () => void;
  /** The layers that animate in and out, such as a backdrop and a panel, each with an `exit`. Mark the element to focus first with `data-autofocus` (React's `autoFocus` would focus it before the dialog opens). */
  children: React.ReactNode;
};

/**
 * A modal layer: a native `<dialog>` shown with `showModal()` in a portal on `document.body`, so the page behind it is
 * inert, Escape reaches `onClose`, focus returns to the element that had it, and the page doesn't scroll. When `open`
 * turns false it closes the dialog at once, so focus and the page come back without waiting, and keeps the content
 * painted above the page until its exit animations end. Nothing renders on the server.
 */
export function Modal({ open, onClose, children, className = "", ...props }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);
  const [present, setPresent] = useState(open);
  if (open && !present) setPresent(true);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || !present) return;
    const el = dialog.current!;
    if (!open) {
      el.close();
      return;
    }
    el.showModal();
    el.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const root = document.documentElement;
    const { overflow, paddingRight } = root.style;
    root.style.paddingRight = `${innerWidth - root.clientWidth}px`;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = overflow;
      root.style.paddingRight = paddingRight;
    };
  }, [mounted, present, open]);

  if (!mounted || !present) return null;
  return createPortal(
    <dialog
      ref={dialog}
      inert={!open}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className={`fixed inset-0 m-0 size-full max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-transparent [&:not([open])]:pointer-events-none [&:not([open])]:z-(--layer-overlay) [&:not([open])]:block ${className}`}
      {...props}
    >
      <AnimatePresence onExitComplete={() => setPresent(false)}>{open && children}</AnimatePresence>
    </dialog>,
    document.body,
  );
}
