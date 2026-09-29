import { useState } from "react";
import { ToastStack, Button } from "tensile";

export function ToastStackDemo() {
  const [toasts, setToasts] = useState([
    { id: "1", label: "Draft saved" },
    { id: "2", label: "Export complete" },
  ]);
  const [nextId, setNextId] = useState(3);

  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="pt-40">
        <ToastStack
          toasts={toasts}
          onDismiss={(id) =>
            setToasts(toasts.filter((toast) => toast.id !== id))
          }
        />
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          setToasts([
            ...toasts,
            { id: String(nextId), label: `Draft ${nextId} saved` },
          ]);
          setNextId(nextId + 1);
        }}
      >
        Save another draft
      </Button>
    </div>
  );
}
