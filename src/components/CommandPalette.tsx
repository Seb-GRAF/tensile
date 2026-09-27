import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { filterByWords, ListHighlight, ROW, useActiveIndex } from "../list";
import { shape, soft, swap } from "../springs";

type Command = { label: string; icon?: React.ReactNode };

export type CommandPaletteProps = {
  commands: Command[];
  onSelect: (command: Command) => void;
  label?: string;
  placeholder?: string;
  listLabel?: string;
  emptyText?: string;
};

function CommandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3 fill-none stroke-current" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
}

export function CommandPalette({
  commands,
  onSelect,
  label = "Search commands",
  placeholder = "Search",
  listLabel = "Commands",
  emptyText = "No commands found",
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = filterByWords(commands, query);
  const [active, setActive, onArrowKey] = useActiveIndex(results.length);
  const height = open ? 52 + 1 + 12 + Math.max(1, results.length) * ROW : 52;

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
      input.current!.blur();
      return;
    }
    if (event.key === "Enter" && results[active]) {
      select(results[active]);
      return;
    }
    onArrowKey(event);
  }

  return (
    <motion.div
      initial={false}
      animate={{ height, borderRadius: open ? 20 : 26 }}
      transition={shape}
      className="w-[360px] overflow-hidden bg-paper shadow-float"
    >
      <label className="flex h-[52px] cursor-text items-center gap-2.5 px-4">
        <svg
          viewBox="0 0 24 24"
          className="size-4 shrink-0 fill-none stroke-muted"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={input}
          role="combobox"
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
          className="h-full min-w-0 grow bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
        />
        <kbd className="flex h-[22px] items-center gap-px rounded-md border border-line px-1.5 font-sans text-[11px] text-muted">
          <CommandIcon />K
        </kbd>
      </label>
      <div inert={!open}>
        <div className="h-px bg-line" />
        <ul id={listId} role="listbox" aria-label={listLabel} className="relative mx-1.5 my-1.5">
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
                {command.label}
                {i === active && (
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-auto size-3.5 fill-none stroke-muted"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 10-5 5 5 5" />
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                  </svg>
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
