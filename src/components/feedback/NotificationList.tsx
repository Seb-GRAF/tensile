import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useRef } from "react";
import { icons } from "../../icons";
import { useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { IconButton } from "../actions/IconButton";
import { Avatar } from "../data-display/Avatar";
import { Icon } from "../data-display/Icon";
import { ListContent } from "../data-display/List";
import { EmptyState } from "./EmptyState";

export type NotificationListProps = {
  notifications: {
    id: string;
    title: string;
    description?: React.ReactNode;
    time: React.ReactNode;
    read?: boolean;
    avatar?: { name: string; src?: string };
  }[];
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
  label?: string;
  emptyText?: string;
  readLabel?: (title: string) => string;
  dismissLabel?: (title: string) => string;
  className?: string;
};

function NotificationRow({ notification, onRead, onDismiss, readLabel, dismissLabel, ref }: {
  notification: NotificationListProps["notifications"][number];
  onRead: (id: string) => void;
  onDismiss: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  readLabel: (title: string) => string;
  dismissLabel: (title: string) => string;
  ref?: React.Ref<HTMLLIElement>;
}) {
  const { shape, swap } = useSprings();
  const present = useIsPresent();
  return (
    <motion.li
      ref={ref}
      aria-hidden={!present}
      inert={!present}
      layout="position"
      {...swap}
      transition={{ layout: shape }}
      className="flex items-center gap-3 border-line py-2.5 [li:not([inert])~&]:border-t"
    >
      <ListContent
        item={{
          id: notification.id,
          title: notification.title,
          description: (
            <>
              {notification.description && <div>{notification.description}</div>}
              <div className="mt-0.5 text-caption">{notification.time}</div>
            </>
          ),
          leading: notification.avatar && <Avatar {...notification.avatar} />,
          trailing: (
            <div className="flex gap-1">
              <IconButton
                variant="ghost"
                size="sm"
                label={readLabel(notification.title)}
                disabled={notification.read}
                onClick={(event) => {
                  (event.currentTarget.nextElementSibling as HTMLButtonElement).focus();
                  onRead(notification.id);
                }}
              >
                <Icon size={14}><path d="m5 12 4 4 10-10" /></Icon>
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                label={dismissLabel(notification.title)}
                onClick={(event) => onDismiss(event, notification.id)}
              >
                <Icon size={14}>{icons.close}</Icon>
              </IconButton>
            </div>
          ),
        }}
      />
    </motion.li>
  );
}

export function NotificationList({
  notifications,
  onRead,
  onDismiss,
  label = "Notifications",
  emptyText = "No notifications",
  readLabel = (title: string) => `Mark ${title} as read`,
  dismissLabel = (title: string) => `Dismiss ${title}`,
  className = "",
}: NotificationListProps) {
  const { shape, swap } = useSprings();
  const [size, measure] = useSize();
  const region = useRef<HTMLElement>(null);

  function dismiss(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    const item = event.currentTarget.closest("li")!;
    const rows = Array.from(item.parentElement!.children).filter((row) => !row.hasAttribute("inert"));
    const index = rows.indexOf(item);
    const neighbor = rows[index + 1] ?? rows[index - 1];
    (neighbor?.querySelector<HTMLButtonElement>("button:not(:disabled)") ?? region.current!).focus();
    onDismiss(id);
  }

  return (
    <motion.section ref={region} aria-label={label} tabIndex={-1} initial={false} animate={{ height: size?.height }} transition={shape} className={`w-full outline-none ${className}`}>
      <div ref={measure} className="grid">
        <ul role="list" className="relative -my-2.5">
          <AnimatePresence initial={false} mode="popLayout">
            {notifications.map((notification) => (
              <NotificationRow key={notification.id} notification={notification} onRead={onRead} onDismiss={dismiss} readLabel={readLabel} dismissLabel={dismissLabel} />
            ))}
          </AnimatePresence>
        </ul>
        <AnimatePresence initial={false}>
          {notifications.length === 0 && <motion.div key="empty" {...swap}><EmptyState title={emptyText} /></motion.div>}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
