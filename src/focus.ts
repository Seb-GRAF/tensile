import { useEffect } from "react";

function markPointer() {
  document.documentElement.dataset.pointer = "";
}

function markKeyboard(event: KeyboardEvent) {
  if (event.key === "Tab") delete document.documentElement.dataset.pointer;
}

/** Marks `<html data-pointer>` from a pointer press until the next Tab. Browsers treat every focused text field as `:focus-visible`, so text controls call this and draw their ring with `has-keyboard-focus:`, which skips focus that came from the pointer. */
export function useFocusSource() {
  useEffect(() => {
    addEventListener("pointerdown", markPointer, true);
    addEventListener("keydown", markKeyboard, true);
  }, []);
}
