import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { shape, swap } from "../../springs";

export type TagInputProps = {
  value: string[];
  onValueChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  removeLabel?: (tag: string) => string;
};

export function TagInput({
  value,
  onValueChange,
  label = "Tags",
  placeholder = "Add a tag",
  removeLabel = (tag: string) => `Remove ${tag}`,
}: TagInputProps) {
  const [query, setQuery] = useState("");
  const [height, setHeight] = useState<number>();
  const row = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => setHeight(row.current!.offsetHeight));
    observer.observe(row.current!);
    return () => observer.disconnect();
  }, []);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const tag = query.trim();
      if (tag === "" || value.includes(tag)) return;
      onValueChange([...value, tag]);
      setQuery("");
      return;
    }
    if (event.key === "Backspace" && query === "" && value.length > 0) {
      onValueChange(value.slice(0, -1));
    }
  }

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={shape}
      className="w-[360px] overflow-hidden rounded-[26px] bg-paper shadow-float outline-offset-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-ink"
    >
      <div ref={row} className="relative flex flex-wrap gap-1.5 p-3">
        <ul className="contents">
          <AnimatePresence mode="popLayout" initial={false}>
            {value.map((tag) => (
              <motion.li
                key={tag}
                layout="position"
                layoutDependency={value}
                {...swap}
                transition={{ layout: shape }}
                className="flex h-7 items-center gap-0.5 rounded-full bg-hover pr-1 pl-3 text-[13px] font-medium text-ink outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-ink"
              >
                {tag}
                <button
                  type="button"
                  aria-label={removeLabel(tag)}
                  onClick={() => {
                    onValueChange(value.filter((other) => other !== tag));
                    input.current!.focus();
                  }}
                  className="grid size-5 place-items-center rounded-full text-muted outline-none"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3 fill-none stroke-current"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <motion.input
          ref={input}
          layout="position"
          layoutDependency={value}
          transition={{ layout: shape }}
          aria-label={label}
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          className="h-7 min-w-24 flex-1 bg-transparent px-1 text-[15px] text-ink outline-none placeholder:text-muted"
        />
      </div>
    </motion.div>
  );
}
