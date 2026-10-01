import { motion, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLiquid } from "./springs";

/** Height of one list row, in px. */
export const ROW = 40;

/** Scroll the list to its active row without scrolling the enclosing morphing shape. */
export function scrollToRow(list: HTMLElement, index: number) {
  const top = index * ROW;
  if (top < list.scrollTop) list.scrollTop = top;
  else if (top + ROW > list.scrollTop + list.clientHeight) list.scrollTop = top + ROW - list.clientHeight;
}

const moves: Record<string, number> = { ArrowDown: 1, ArrowUp: -1 };

/** The items that have, for each word of the query, a word starting with it (ignoring case). */
export function filterByWords<T extends { label: string }>(items: T[], query: string) {
  const tokens = query.toLowerCase().split(" ").filter((token) => token);
  return items.filter((item) => {
    const words = item.label.toLowerCase().split(" ");
    return tokens.every((token) => words.some((word) => word.startsWith(token)));
  });
}

/** A listbox option; a disabled one is skipped by the keyboard and can't be picked. */
export type Option = { value: string; label: string; icon?: React.ReactNode; disabled?: boolean };

/** Options, or groups of them under a heading. */
export type Options = (Option | { label: string; options: Option[] })[];

/** The options in order, the list row of each (a group's heading takes the row before its options) and the number of rows. */
export function optionRows(entries: Options) {
  const options: Option[] = [];
  const rows: number[] = [];
  let row = 0;
  for (const entry of entries) {
    if ("options" in entry) row++;
    for (const option of "options" in entry ? entry.options : [entry]) {
      options.push(option);
      rows.push(row++);
    }
  }
  return { options, rows, count: row };
}

/** Index of the highlighted row; arrows wrap, Home and End reach the first and last rows, passing over rows `disabled` returns true for. */
export function useActiveIndex(count: number, disabled?: (index: number) => boolean) {
  const [active, setActive] = useState(0);

  function onArrowKey(event: React.KeyboardEvent) {
    if (count === 0) return;
    const move = moves[event.key];
    if (!move && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    setActive((a) => {
      const step = event.key === "Home" ? 1 : event.key === "End" ? -1 : move;
      let next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : (a + move + count) % count;
      for (let tries = 0; tries < count; tries++) {
        if (!disabled?.(next)) return next;
        next = (next + step + count) % count;
      }
      return a;
    });
  }

  return [active, setActive, onArrowKey] as const;
}

/** Match typed label prefixes, starting after the active row and passing over rows `disabled` returns true for; the prefix expires after 700 ms. */
export function useTypeahead(items: { label: string }[], active: number, setActive: (index: number) => void, disabled?: (index: number) => boolean) {
  const typed = useRef({ text: "", time: 0 });
  return (event: React.KeyboardEvent) => {
    if (event.key.length !== 1 || event.key === " " || event.ctrlKey || event.metaKey || event.altKey) return;
    const now = Date.now();
    const text = (now - typed.current.time < 700 ? typed.current.text : "") + event.key.toLowerCase();
    typed.current = { text, time: now };
    const prefix = text.split("").every((letter) => letter === text[0]) ? text[0] : text;
    for (let offset = 1; offset <= items.length; offset++) {
      const index = (active + offset) % items.length;
      if (!disabled?.(index) && items[index].label.toLowerCase().startsWith(prefix)) {
        event.preventDefault();
        setActive(index);
        return;
      }
    }
  };
}

/** Highlight behind row `index` of a `relative` list; it stretches toward the next row as it slides (`useLiquid` on its top and negated bottom edge). */
export function ListHighlight({ index }: { index: number }) {
  const [top, bottom] = useLiquid(index * ROW, -(index + 1) * ROW);
  const height = useTransform(() => -bottom.get() - top.get());
  return <motion.li aria-hidden style={{ top, height }} className="tn:absolute tn:inset-x-0 tn:rounded-[calc(var(--tn-radius-overlay)/2)] tn:bg-hover" />;
}
