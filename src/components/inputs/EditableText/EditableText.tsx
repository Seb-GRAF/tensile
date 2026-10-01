import { motion } from "motion/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useControllable } from "../../../controllable";
import { useFocusSource } from "../../../focus";
import { useSprings } from "../../../springs";
import { useWidth } from "../../../useWidth";
import { Button } from "../../actions/Button/Button";

export type EditableTextProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label: string;
  placeholder?: string;
  editLabel?: (label: string, value: string) => string;
  className?: string;
};

export function EditableText({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  label,
  placeholder = "Empty",
  editLabel = (label: string, value: string) => `Edit ${label}, ${value}`,
  className = "",
}: EditableTextProps) {
  const { shape, soft } = useSprings();
  const [value, setValue] = useControllable(valueProp, defaultValue, onValueChange);
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
      if (save) setValue(draft);
      setEditing(false);
    });
    button.current!.focus();
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: width === undefined ? undefined : width + 1 }}
      transition={shape}
      className={`tn:relative tn:inline-block tn:h-11 tn:max-w-full tn:rounded-control tn:outline-offset-2 tn:has-keyboard-focus:outline-2 tn:has-keyboard-focus:outline-focus ${className}`}
    >
      <div aria-hidden="true" className="tn:invisible tn:absolute tn:inset-0 tn:overflow-hidden">
        <span key={text} ref={measure} className="tn:inline-block tn:whitespace-pre tn:px-5 tn:text-body tn:font-medium">
          {text}
        </span>
      </div>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: editing ? 1 : 0 }}
        transition={soft}
        className="tn:pointer-events-none tn:absolute tn:inset-0 tn:rounded-control tn:bg-paper tn:shadow-control"
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
        className={`tn:absolute tn:inset-0 tn:w-full tn:bg-transparent tn:px-5 tn:text-body tn:font-medium tn:text-ink tn:outline-none tn:placeholder:text-muted ${editing ? "" : "tn:invisible"}`}
      />
      <Button
        ref={button}
        variant="ghost"
        aria-label={editLabel(label, value)}
        onClick={startEditing}
        className={`tn:relative tn:w-full ${editing ? "tn:invisible" : ""}`}
      >
        <span className={`tn:truncate ${value ? "" : "tn:text-muted"}`}>{value || placeholder}</span>
      </Button>
    </motion.div>
  );
}
