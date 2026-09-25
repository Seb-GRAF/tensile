import { useCallback, useState } from "react";

/** Width of the element the returned ref is attached to, measured when it mounts and again once fonts have loaded. Key the element by its content to measure each new version. */
export function useWidth(): [number | undefined, (el: HTMLElement | null) => void] {
  const [width, setWidth] = useState<number>();
  const measure = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    setWidth(el.offsetWidth);
    document.fonts.ready.then(() => {
      if (el.isConnected) setWidth(el.offsetWidth);
    });
  }, []);
  return [width, measure];
}
