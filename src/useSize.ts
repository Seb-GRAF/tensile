import { useCallback, useState } from "react";

type Size = { width: number; height: number };

/** Width and height of the element the returned ref is attached to, measured when it mounts and again whenever it resizes. */
export function useSize(): [Size | undefined, (el: HTMLElement | null) => () => void] {
  const [size, setSize] = useState<Size>();
  const measure = useCallback((el: HTMLElement | null) => {
    const update = () => setSize({ width: el!.offsetWidth, height: el!.offsetHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el!);
    return () => observer.disconnect();
  }, []);
  return [size, measure];
}
