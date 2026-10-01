import { useSyncExternalStore } from "react";
import { icons } from "../../../icons";
import { Icon } from "../../data-display/Icon/Icon";
import { Spinner } from "../Spinner/Spinner";
import { ToastStack, type ToastStackProps } from "../ToastStack/ToastStack";

export type ToasterProps = Omit<ToastStackProps, "toasts" | "onDismiss">;

type ToastOptions = {
  /** An existing toast's id updates that toast. */
  id?: string;
  /** A loading toast stays until it's updated or dismissed. */
  status?: "loading" | "success";
};

const LIFETIME = 4000;

const statusIcons = {
  loading: <Spinner size={14} />,
  success: <Icon size={16}>{icons.success}</Icon>,
};

let toasts: ToastStackProps["toasts"] = [];
let count = 0;
const listeners = new Set<() => void>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function setToasts(next: ToastStackProps["toasts"]) {
  toasts = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getToasts() {
  return toasts;
}

/** Shows a toast in the mounted Toaster and returns its id. */
export function toast(label: string, { id = `toast-${++count}`, status }: ToastOptions = {}) {
  const next = { id, label, icon: status && statusIcons[status] };
  setToasts(toasts.some((item) => item.id === id) ? toasts.map((item) => (item.id === id ? next : item)) : [...toasts, next]);
  clearTimeout(timers.get(id));
  if (status !== "loading") timers.set(id, setTimeout(() => toast.dismiss(id), LIFETIME));
  return id;
}

toast.dismiss = (id: string) => {
  clearTimeout(timers.get(id));
  timers.delete(id);
  setToasts(toasts.filter((item) => item.id !== id));
};

export function Toaster(props: ToasterProps) {
  const items = useSyncExternalStore(subscribe, getToasts, getToasts);
  return <ToastStack {...props} toasts={items} onDismiss={toast.dismiss} />;
}
