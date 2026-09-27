import { motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useSprings } from "../../springs";
import { useWidth } from "../../useWidth";
import { Button } from "../actions/Button";
import { Input } from "./Input";

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
  const { shape, swap } = useSprings();
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
    <motion.div initial={false} animate={{ width: width === undefined ? undefined : width + 1 }} transition={shape} className={`relative inline-block h-11 max-w-full ${className}`}>
      <div aria-hidden="true" className="invisible absolute inset-0 overflow-hidden">
        <span key={`${editing}-${text}`} ref={measure} className={`inline-block whitespace-pre text-body ${editing ? "px-4" : "px-5 font-medium"}`}>
          {text}
        </span>
      </div>
      <motion.div initial={false} animate={editing ? swap.animate : swap.exit} inert={!editing} className="absolute inset-0">
        <Input
          ref={input}
          value={draft}
          onValueChange={setDraft}
          aria-label={label}
          placeholder={placeholder}
          onBlur={editing ? () => finishEditing(true) : undefined}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape" || event.key === "Tab") {
              event.preventDefault();
              finishEditing(event.key !== "Escape");
            }
          }}
        />
      </motion.div>
      <motion.div initial={false} animate={editing ? swap.exit : swap.animate} inert={editing}>
        <Button ref={button} variant="ghost" aria-label={editLabel(label, value)} onClick={startEditing} className="w-full">
          <span className="truncate">{value || placeholder}</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
