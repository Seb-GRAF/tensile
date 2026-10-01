import { animate, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useSprings } from "../../../springs";

export type ImageProps = React.ComponentProps<"img"> & {
  alt: string;
  /** Shown, centered, in place of the image if it fails to load. */
  fallback?: React.ReactNode;
  /** Sizes and rounds the box, e.g. `aspect-video w-full rounded-card`; the image covers it. */
  className?: string;
};

export function Image({ src, fallback, onLoad, onError, className = "", ...props }: ImageProps) {
  const { soft, swap } = useSprings();
  const [failedSrc, setFailedSrc] = useState<string>();
  const box = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const img = box.current!.querySelector("img")!;
    if (!img.complete) return;
    if (img.naturalWidth) animate(img, { opacity: 1 }, soft);
    else setFailedSrc(src);
  }, []);

  return (
    <span ref={box} className={`tn:relative tn:block tn:overflow-hidden tn:bg-hover tn:inset-ring tn:inset-ring-line ${className}`}>
      {failedSrc === src ? (
        <motion.span {...swap} className="tn:absolute tn:inset-0 tn:grid tn:place-items-center">
          {fallback}
        </motion.span>
      ) : (
        <img
          key={src}
          {...props}
          src={src}
          onLoad={(event) => {
            animate(event.currentTarget, { opacity: 1 }, soft);
            onLoad?.(event);
          }}
          onError={(event) => {
            setFailedSrc(src);
            onError?.(event);
          }}
          className="tn:absolute tn:inset-0 tn:size-full tn:object-cover tn:opacity-0"
        />
      )}
    </span>
  );
}
