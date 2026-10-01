import { animate, type AnimationPlaybackControls } from "motion/react";
import { useEffect, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { useSprings } from "../../../springs";

export type CardProps = React.ComponentProps<"div"> & {
  /** Ink is a dark surface: the dark tokens apply inside it, in either theme. */
  tone?: "paper" | "ink";
};

const tones = {
  paper: "tn:bg-paper tn:text-ink",
  ink: "dark tn:bg-paper tn:text-ink",
};

export function Card({ tone = "paper", className = "", ref, ...props }: CardProps) {
  const { shape } = useSprings();
  const card = useRef<HTMLDivElement>(null);
  const height = useRef(0);
  const animation = useRef<AnimationPlaybackControls>(null);
  useImperativeHandle(ref, () => card.current!);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!animation.current) height.current = card.current!.offsetHeight;
    });
    observer.observe(card.current!);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = card.current!;
    const from = animation.current ? el.offsetHeight : height.current;
    animation.current?.stop();
    animation.current = null;
    el.style.height = "";
    el.style.overflow = "";
    const to = el.offsetHeight;
    height.current = to;
    if (from === 0 || from === to) return;
    el.style.overflow = "clip";
    animation.current = animate(el, { height: [from, to] }, {
      ...shape,
      onComplete() {
        el.style.height = "";
        el.style.overflow = "";
        animation.current = null;
      },
    });
  });

  return <div {...props} ref={card} className={`tn:rounded-card tn:shadow-float tn:surface ${tones[tone]} ${className}`} />;
}
