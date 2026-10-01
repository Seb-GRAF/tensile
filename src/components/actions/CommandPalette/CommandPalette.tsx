import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { filterByWords, ListHighlight, scrollToRow, ROW, useActiveIndex } from "../../../list";
import { useSprings } from "../../../springs";
import { useFocusSource } from "../../../focus";
import { icons } from "../../../icons";
import { Icon } from "../../data-display/Icon/Icon";
import { Kbd } from "../../data-display/Kbd/Kbd";

type Command = { label: string; icon?: React.ReactNode };

export type CommandPaletteProps = {
  commands: Command[];
  onSelect: (command: Command) => void;
  label?: string;
  placeholder?: string;
  listLabel?: string;
  emptyText?: string;
  className?: string;
};

export function CommandPalette({
  commands,
  onSelect,
  label = "Search commands",
  placeholder = "Search",
  listLabel = "Commands",
  emptyText = "No commands found",
  className = "",
}: CommandPaletteProps) {
  const { shape, soft, swap } = useSprings();
  useFocusSource();
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = filterByWords(commands, query);
  const [active, setActive, onArrowKey] = useActiveIndex(results.length);
  const contentHeight = Math.max(1, results.length) * ROW;
  const height = open ? 57 + Math.min(contentHeight, 320) : 44;

  useEffect(() => {
    if (open && results[active]) scrollToRow(list.current!, active);
  }, [open, active, query, listId]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (document.activeElement === input.current) input.current!.blur();
      else input.current!.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  function select(command: Command) {
    onSelect(command);
    input.current!.blur();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      input.current!.blur();
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (results[active]) select(results[active]);
      return;
    }
    onArrowKey(event);
  }

  return (
    <motion.div
      initial={false}
      animate={{ height, borderRadius: open ? "var(--tn-radius-overlay)" : "var(--tn-radius-control)" }}
      transition={shape}
      className={`tn:overflow-hidden tn:bg-paper tn:shadow-control tn:outline-offset-2 tn:has-keyboard-focus:outline-2 tn:has-keyboard-focus:outline-focus ${className}`}
    >
      <label className="tn:flex tn:h-11 tn:cursor-text tn:items-center tn:gap-2.5 tn:px-4">
        <Icon className="tn:shrink-0 tn:text-muted">{icons.search}</Icon>
        <input
          ref={input}
          role="combobox"
          aria-autocomplete="list"
          aria-label={label}
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          placeholder={placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onBlur={close}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          className="tn:h-full tn:min-w-0 tn:grow tn:bg-transparent tn:text-body tn:text-ink tn:outline-none tn:placeholder:text-muted"
        />
        <Kbd className="tn:pointer-coarse:hidden">
          <Icon size={12}><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></Icon>K
        </Kbd>
      </label>
      <div inert={!open}>
        <div className="tn:h-px tn:bg-line" />
        <ul ref={list} id={listId} role="listbox" aria-label={listLabel} style={{ height: contentHeight, maxHeight: 320 }} className="tn:relative tn:m-1.5 tn:overflow-y-auto tn:overscroll-contain">
          {results.length > 0 && <ListHighlight index={active} />}
          <AnimatePresence initial={false}>
            {results.map((command, i) => (
              <motion.li
                key={command.label}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                initial={{ opacity: 0, filter: "blur(4px)", y: i * ROW }}
                animate={{ opacity: 1, filter: "blur(0px)", y: i * ROW }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ y: shape, opacity: soft, filter: soft }}
                onMouseDown={(event) => event.preventDefault()}
                onMouseMove={() => setActive(i)}
                onClick={() => select(command)}
                className="tn:absolute tn:inset-x-0 tn:top-0 tn:flex tn:h-10 tn:cursor-pointer tn:items-center tn:gap-2.5 tn:px-2.5 tn:text-sm tn:text-ink"
              >
                {command.icon && <span className="tn:text-muted">{command.icon}</span>}
                <span className="tn:truncate">{command.label}</span>
                {i === active && (
                  <Icon size={14} className="tn:ml-auto tn:shrink-0 tn:text-muted">
                    <path d="m9 10-5 5 5 5" />
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                  </Icon>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {results.length === 0 && (
              <motion.li key="empty" {...swap} className="tn:flex tn:h-10 tn:origin-left tn:items-center tn:px-2.5 tn:text-sm tn:text-muted">
                {emptyText}
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </motion.div>
  );
}
