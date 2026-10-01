import { ToastStackDemo } from "./demos/ToastStackDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { fn } from "storybook/test";
import { Button } from "../../actions/Button/Button";
import { Icon } from "../../data-display/Icon/Icon";
import { ToastStack, type ToastStackProps } from "./ToastStack";

function Done() {
  return <Icon name="success" size={16} />;
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
    <div className="flex w-80 max-w-full flex-col items-center gap-8">
      <ToastStack
        {...props}
        toasts={toasts}
        onDismiss={(id) => {
          remove(id);
          props.onDismiss(id);
        }}
      />
      <Button variant="secondary" onClick={add}>
        Show a toast
      </Button>
    </div>
  );
}

const meta = {
  title: "Feedback/ToastStack",
  id: "components-toaststack",
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

export const Usage: Story = {
  render: () => <ToastStackDemo />,
};
