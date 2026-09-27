import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

type Room = { above: number; below: number; left: number; right: number };

/**
 * While `open`, and until `settle` runs after the closing animation, puts `frame` in the browser's top layer exactly
 * over its parent, following it every frame, so the shape inside overlays everything and escapes `overflow: hidden`
 * and transformed ancestors; DOM order, and so Tab order, stays the same. `frame` is a transparent `absolute inset-0`
 * box in the shape's wrapper; the shape keeps its own position inside it. Call `settle` from the shape's
 * `onAnimationComplete`. `room` is the space around the parent when it opened, for opening upward or limiting a
 * menu's height; it doesn't change while open, so the shape doesn't flip while you scroll.
 */
export function useTopLayer(frame: RefObject<HTMLElement | null>, open: boolean) {
  const [lifted, setLifted] = useState(false);
  const [room, setRoom] = useState<Room>();

  useLayoutEffect(() => {
    if (open) setLifted(true);
  }, [open]);

  useLayoutEffect(() => {
    if (!lifted) return;
    const el = frame.current!;
    let last = "";
    let id = 0;
    const follow = () => {
      const box = el.parentElement!.getBoundingClientRect();
      const key = `${box.top} ${box.left} ${box.width} ${box.height}`;
      if (key !== last) {
        last = key;
        Object.assign(el.style, { top: `${box.top}px`, left: `${box.left}px`, width: `${box.width}px`, height: `${box.height}px` });
      }
      id = requestAnimationFrame(follow);
    };
    el.setAttribute("popover", "manual");
    Object.assign(el.style, { position: "fixed", inset: "auto", margin: "0", padding: "0", border: "0", background: "none", overflow: "visible" });
    el.showPopover();
    const box = el.parentElement!.getBoundingClientRect();
    setRoom({ above: box.top, below: innerHeight - box.bottom, left: box.left, right: innerWidth - box.right });
    follow();
    return () => {
      cancelAnimationFrame(id);
      el.hidePopover();
      el.removeAttribute("popover");
      el.removeAttribute("style");
    };
  }, [lifted, frame]);

  function settle() {
    if (!open) setLifted(false);
  }

  return { room, settle };
}

/** Calls `onPress` when a pointer goes down outside `ref`'s element while `open`. */
export function useOutsidePress(ref: RefObject<HTMLElement | null>, open: boolean, onPress: () => void) {
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!ref.current!.contains(event.target as Node)) onPress();
    }
    addEventListener("pointerdown", onPointerDown);
    return () => removeEventListener("pointerdown", onPointerDown);
  }, [open, ref, onPress]);
}
