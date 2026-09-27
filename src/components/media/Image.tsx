import { animate, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useSprings } from "../../springs";

export type ImageProps = React.ComponentProps<"img"> & {
  alt: string;
  /** Shown, centered, in place of the image if it fails to load. */
  fallback?: React.ReactNode;
  /** Sizes and rounds the box, e.g. `aspect-video w-full rounded-card`; the image covers it. */
  className?: string;
};

export function Image({ fallback, onLoad, onError, className = "", ...props }: ImageProps) {
  const { soft, swap } = useSprings();
  const [failed, setFailed] = useState(false);
  const box = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const img = box.current!.querySelector("img")!;
    if (!img.complete) return;
    if (img.naturalWidth) animate(img, { opacity: 1 }, soft);
    else setFailed(true);
  }, []);

  return (
    <span ref={box} className={`relative block overflow-hidden bg-hover ${className}`}>
      {failed ? (
        <motion.span {...swap} className="absolute inset-0 grid place-items-center">
          {fallback}
        </motion.span>
      ) : (
        <img
          {...props}
          onLoad={(event) => {
            animate(event.currentTarget, { opacity: 1 }, soft);
            onLoad?.(event);
          }}
          onError={(event) => {
            setFailed(true);
            onError?.(event);
          }}
          className="absolute inset-0 size-full object-cover opacity-0"
        />
      )}
    </span>
  );
}
