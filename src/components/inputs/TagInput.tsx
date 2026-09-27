import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { Tag } from "../data-display/Tag";
import { useField } from "./Field";

export type TagInputProps = {
  value: string[];
  onValueChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  removeLabel?: (tag: string) => string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function TagInput({
  value,
  onValueChange,
  label = "Tags",
  placeholder = "Add a tag",
  removeLabel = (tag: string) => `Remove ${tag}`,
  id,
  name,
  disabled = false,
  required = false,
  className = "",
}: TagInputProps) {
  const { shape, swap } = useSprings();
  const field = useField();
  const [query, setQuery] = useState("");
  const [size, row] = useSize();
  const input = useRef<HTMLInputElement>(null);
  const isDisabled = field?.disabled || disabled;

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
      animate={{ height: size?.height }}
      transition={shape}
      className={`overflow-hidden rounded-control bg-paper shadow-float outline-offset-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-focus ${isDisabled ? "opacity-40" : ""} ${className}`}
    >
      {name && value.map((tag) => <input key={tag} type="hidden" name={name} value={tag} disabled={isDisabled} />)}
      <div ref={row} inert={isDisabled} className="relative flex flex-wrap gap-1.5 p-3">
        <ul role="list" className="contents">
          <AnimatePresence mode="popLayout" initial={false}>
            {value.map((tag) => (
              <motion.li
                key={tag}
                layout="position"
                layoutDependency={value}
                {...swap}
                transition={{ layout: shape }}
                className="flex"
              >
                <Tag
                  label={tag}
                  removeLabel={removeLabel}
                  onRemove={() => {
                    onValueChange(value.filter((other) => other !== tag));
                    input.current!.focus();
                  }}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <motion.input
          ref={input}
          layout="position"
          layoutDependency={value}
          transition={{ layout: shape }}
          id={field?.id ?? id}
          disabled={isDisabled}
          aria-label={field?.labelId ? undefined : label}
          aria-labelledby={field?.labelId}
          aria-describedby={field?.describedBy}
          aria-invalid={field?.invalid}
          aria-required={field?.required || required}
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          className="h-7 min-w-24 flex-1 bg-transparent px-1 text-body text-ink outline-none placeholder:text-muted"
        />
      </div>
    </motion.div>
  );
}
