import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { filterByWords, ListHighlight, scrollToRow, ROW, useActiveIndex } from "../../list";
import { useSprings } from "../../springs";
import { useFocusSource } from "../../focus";
import { icons } from "../../icons";
import { Icon } from "../data-display/Icon";
import { Kbd } from "../data-display/Kbd";

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
  const height = open ? 65 + Math.min(contentHeight, 320) : 52;

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
      animate={{ height, borderRadius: open ? "var(--radius-overlay)" : "var(--radius-control)" }}
      transition={shape}
      className={`overflow-hidden bg-paper shadow-control outline-offset-2 has-keyboard-focus:outline-2 has-keyboard-focus:outline-focus ${className}`}
    >
      <label className="flex h-13 cursor-text items-center gap-2.5 px-4">
        <Icon className="shrink-0 text-muted">{icons.search}</Icon>
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
          className="h-full min-w-0 grow bg-transparent text-body text-ink outline-none placeholder:text-muted"
        />
        <Kbd>
          <Icon size={12}><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></Icon>K
        </Kbd>
      </label>
      <div inert={!open}>
        <div className="h-px bg-line" />
        <ul ref={list} id={listId} role="listbox" aria-label={listLabel} style={{ height: contentHeight, maxHeight: 320 }} className="relative m-1.5 overflow-y-auto overscroll-contain">
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
                className="absolute inset-x-0 top-0 flex h-10 cursor-pointer items-center gap-2.5 px-2.5 text-sm text-ink"
              >
                {command.icon && <span className="text-muted">{command.icon}</span>}
                <span className="truncate">{command.label}</span>
                {i === active && (
                  <Icon size={14} className="ml-auto shrink-0 text-muted">
                    <path d="m9 10-5 5 5 5" />
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                  </Icon>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {results.length === 0 && (
              <motion.li key="empty" {...swap} className="flex h-10 origin-left items-center px-2.5 text-sm text-muted">
                {emptyText}
              </motion.li>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </motion.div>
  );
}
