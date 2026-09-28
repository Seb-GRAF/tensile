import { useLayoutEffect, useRef } from "react";
import { TooltipGroup } from "../overlays/Tooltip";

export type ToolbarProps = {
  label: string;
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function Toolbar({ label, children, orientation = "horizontal", className = "" }: ToolbarProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const buttons = Array.from(root.current!.querySelectorAll<HTMLButtonElement>("button"));
    const current = buttons.find((button) => !button.disabled && button.tabIndex === 0) ?? buttons.find((button) => !button.disabled);
    for (const button of buttons) button.tabIndex = button === current ? 0 : -1;
  });

  function onKeyDown(event: React.KeyboardEvent) {
    const buttons = Array.from(root.current!.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    const targets: Record<string, number> = {
      Home: 0,
      End: buttons.length - 1,
      [orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"]: index - 1,
      [orientation === "horizontal" ? "ArrowRight" : "ArrowDown"]: index + 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    buttons[(target + buttons.length) % buttons.length].focus();
  }

  return (
    <TooltipGroup className={className}>
      <div
        ref={root}
        role="toolbar"
        aria-label={label}
        aria-orientation={orientation}
        onKeyDown={onKeyDown}
        onFocusCapture={(event) => {
          for (const button of event.currentTarget.querySelectorAll("button")) button.tabIndex = button === document.activeElement ? 0 : -1;
        }}
        className={`flex w-fit rounded-control bg-paper p-1 shadow-float ${orientation === "vertical" ? "flex-col" : ""}`}
      >
        {children}
      </div>
    </TooltipGroup>
  );
}
