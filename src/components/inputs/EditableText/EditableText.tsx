import { motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { Button } from "../../actions/Button/Button";

export type EditableTextProps = {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  placeholder?: string;
  editLabel?: (label: string, value: string) => string;
  className?: string;
};

export function EditableText({
  value,
  onValueChange,
  label,
  placeholder = "Empty",
  editLabel = (label: string, value: string) => `Edit ${label}, ${value}`,
  className = "",
}: EditableTextProps) {
  const { shape, soft } = useSprings();
  useFocusSource();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [width, measure] = useWidth();
  const input = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const text = (editing ? draft : value) || placeholder;

  function startEditing() {
    flushSync(() => {
      setDraft(value);
      setEditing(true);
    });
    input.current!.focus();
    input.current!.select();
  }

  function finishEditing(save: boolean) {
    flushSync(() => {
      if (save) onValueChange(draft);
      setEditing(false);
    });
    button.current!.focus();
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: width === undefined ? undefined : width + 1 }}
      transition={shape}
      className={`relative inline-block h-11 max-w-full rounded-control outline-offset-2 has-keyboard-focus:outline-2 has-keyboard-focus:outline-focus ${className}`}
    >
      <div aria-hidden="true" className="invisible absolute inset-0 overflow-hidden">
        <span key={text} ref={measure} className="inline-block whitespace-pre px-5 text-body font-medium">
          {text}
        </span>
      </div>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: editing ? 1 : 0 }}
        transition={soft}
        className="pointer-events-none absolute inset-0 rounded-control bg-paper shadow-control"
      />
      <input
        ref={input}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        aria-label={label}
        placeholder={placeholder}
        onBlur={editing ? () => finishEditing(true) : undefined}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Escape" || event.key === "Tab") {
            event.preventDefault();
            finishEditing(event.key !== "Escape");
          }
        }}
        className={`absolute inset-0 w-full bg-transparent px-5 text-body font-medium text-ink outline-none placeholder:text-muted ${editing ? "" : "invisible"}`}
      />
      <Button
        ref={button}
        variant="ghost"
        aria-label={editLabel(label, value)}
        onClick={startEditing}
        className={`relative w-full ${editing ? "invisible" : ""}`}
      >
        <span className={`truncate ${value ? "" : "text-muted"}`}>{value || placeholder}</span>
      </Button>
    </motion.div>
  );
}
