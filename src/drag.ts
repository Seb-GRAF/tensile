import { useMotionValue, useTransform } from "motion/react";

const RUBBER = 24;

/** Where to draw a drag that went `over` px past a limit: it follows at first, then gives less and less, never more than 24 px. */
export function rubber(over: number) {
  return Math.sign(over) * RUBBER * (1 - Math.exp(-Math.abs(over) / RUBBER));
}

/** Pointer handlers for dragging over an element (give it `touch-none`): `onDrag` runs on press and on every move while the pointer is held, `onRelease` when it lets go. */
export function dragHandlers<T extends Element>(onDrag: (event: React.PointerEvent<T>) => void, onRelease: () => void) {
  return {
    onPointerDown(event: React.PointerEvent<T>) {
      event.currentTarget.setPointerCapture(event.pointerId);
      onDrag(event);
    },
    onPointerMove(event: React.PointerEvent<T>) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) onDrag(event);
    },
    onPointerUp: onRelease,
    onPointerCancel: onRelease,
  };
}

/** A `width` × `height` pill pulled `stretch` px past an end (negative past the start): longer, thinner, and moved left when pulled past the start. Put `style` on the pill and spring `stretch` back to 0 with `snap`. */
export function useStretch(width: number, height: number) {
  const stretch = useMotionValue(0);
  const style = {
    width: useTransform(stretch, (s) => width + Math.abs(s)),
    height: useTransform(stretch, (s) => height * Math.sqrt(width / (width + Math.abs(s)))),
    x: useTransform(stretch, (s) => Math.min(0, s)),
  };
  return [stretch, style] as const;
}
