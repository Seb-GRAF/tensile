import { useState } from "react";

/** The current value and a setter: `value` while the parent controls it, otherwise the component's own state starting at `defaultValue`. The setter calls `onChange` either way; it takes what `onChange` takes, which can be narrower than the value (a nullable value whose callback never gets null). */
export function useControllable<T, Next extends T = T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: Next) => void,
): [T, (next: Next) => void] {
  const [own, setOwn] = useState(defaultValue);
  const controlled = value !== undefined;
  function set(next: Next) {
    if (!controlled) setOwn(next);
    onChange?.(next);
  }
  return [controlled ? value : own, set];
}
