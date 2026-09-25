import { motion, useTransform } from "motion/react";
import { useState } from "react";
import { useLiquid } from "./springs";

/** Height of one list row, in px. */
export const ROW = 40;

const moves: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };

/** The items that have, for each word of the query, a word starting with it (ignoring case). */
export function filterByWords<T extends { label: string }>(items: T[], query: string) {
  const tokens = query.toLowerCase().split(" ").filter((token) => token);
  return items.filter((item) => {
    const words = item.label.toLowerCase().split(" ");
    return tokens.every((token) => words.some((word) => word.startsWith(token)));
  });
}

/** Index of the highlighted row, and a key handler that moves it with ArrowUp and ArrowDown, wrapping around. */
export function useActiveIndex(count: number) {
  const [active, setActive] = useState(0);

  function onArrowKey(event: React.KeyboardEvent) {
    const move = moves[event.key];
    if (!move || count === 0) return;
    event.preventDefault();
    setActive((a) => (a + move + count) % count);
  }

  return [active, setActive, onArrowKey] as const;
}

/** Highlight behind row `index` of a `relative` list; it stretches toward the next row as it slides (`useLiquid` on its top and negated bottom edge). */
export function ListHighlight({ index }: { index: number }) {
  const [top, bottom] = useLiquid(index * ROW, -(index + 1) * ROW);
  const height = useTransform(() => -bottom.get() - top.get());
  return <motion.li aria-hidden style={{ top, height }} className="absolute inset-x-0 rounded-[10px] bg-hover" />;
}
