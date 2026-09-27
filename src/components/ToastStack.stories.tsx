import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { fn } from "storybook/test";
import { ToastStack, type ToastStackProps } from "./ToastStack";

function Done() {
  return (
    <svg viewBox="0 0 16 16" className="size-4">
      <circle cx="8" cy="8" r="8" className="fill-accent" />
      <path
        d="M4.75 8.25 7 10.5l4.25-4.5"
        className="fill-none stroke-ink"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const messages = ["Photo uploaded", "Reminder set", "Playlist shared", "Draft saved", "Password changed"];

function StatefulToastStack(props: ToastStackProps) {
  const [toasts, setToasts] = useState(props.toasts);
  const count = useRef(props.toasts.length);

  function remove(id: string) {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  function add() {
    count.current += 1;
    const toast = { id: String(count.current), label: messages[count.current % messages.length], icon: <Done /> };
    setToasts((toasts) => [...toasts, toast]);
    setTimeout(() => remove(toast.id), 4000);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <ToastStack
        {...props}
        toasts={toasts}
        onDismiss={(id) => {
          remove(id);
          props.onDismiss(id);
        }}
      />
      <button
        type="button"
        onClick={add}
        className="h-11 rounded-full bg-paper px-5 text-sm font-medium text-ink shadow-float outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink"
      >
        Show a toast
      </button>
    </div>
  );
}

const meta = {
  component: ToastStack,
  args: {
    toasts: [
      { id: "1", label: "Invite sent", icon: <Done /> },
      { id: "2", label: "Changes saved", icon: <Done /> },
      { id: "3", label: "Link copied", icon: <Done /> },
    ],
    onDismiss: fn(),
  },
} satisfies Meta<typeof ToastStack>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the stack or Tab into it to fan it out; × (or Enter on it) dismisses a toast; Show a toast adds one that leaves after 4 s. */
export const Default: Story = {
  render: function Render(args) {
    return <StatefulToastStack {...args} />;
  },
};
