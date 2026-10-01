import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useRef } from "react";
import { icons } from "../../../icons";
import { useSprings } from "../../../springs";
import { IconButton } from "../../actions/IconButton/IconButton";
import { Avatar } from "../../data-display/Avatar/Avatar";
import { Icon } from "../../data-display/Icon/Icon";
import { ListContent } from "../../data-display/List/List";
import { EmptyState } from "../EmptyState/EmptyState";

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

function NotificationRow({ notification, onRead, onDismiss, readLabel, dismissLabel }: {
  notification: NotificationListProps["notifications"][number];
  onRead: (id: string) => void;
  onDismiss: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  readLabel: (title: string) => string;
  dismissLabel: (title: string) => string;
}) {
  const { soft, shape, swap } = useSprings();
  const present = useIsPresent();
  return (
    <motion.li
      aria-hidden={!present}
      inert={!present}
      initial={{ ...swap.initial, height: 0 }}
      animate={{ ...swap.animate, height: "auto", transition: { ...swap.animate.transition, height: shape } }}
      exit={{ ...swap.exit, height: 0, transition: { ...swap.exit.transition, height: shape } }}
      className="tn:[clip-path:inset(0_-4px)]"
    >
      <div className="tn:flex tn:items-center tn:gap-3 tn:border-line tn:py-2.5 tn:[li:not([inert])~li>&]:border-t">
        <ListContent
          item={{
            id: notification.id,
            title: notification.title,
            description: (
              <>
                {notification.description && <div>{notification.description}</div>}
                <div className="tn:mt-0.5 tn:text-caption">{notification.time}</div>
              </>
            ),
            leading: (
              <div className="tn:flex tn:items-center tn:gap-2">
                <motion.span
                  initial={false}
                  animate={{ opacity: notification.read ? 0 : 1 }}
                  transition={soft}
                  className="tn:size-2 tn:rounded-full tn:bg-ink"
                />
                <div className="tn:size-8">{notification.avatar && <Avatar {...notification.avatar} />}</div>
              </div>
            ),
            trailing: (
              <div className="tn:flex tn:gap-1">
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
      </div>
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
    <section ref={region} aria-label={label} tabIndex={-1} className={`tn:grid tn:w-full tn:outline-none ${className}`}>
      <ul role="list" className="tn:-my-2.5">
        <AnimatePresence initial={false}>
          {notifications.map((notification) => (
            <NotificationRow key={notification.id} notification={notification} onRead={onRead} onDismiss={dismiss} readLabel={readLabel} dismissLabel={dismissLabel} />
          ))}
        </AnimatePresence>
      </ul>
      <AnimatePresence initial={false}>
        {notifications.length === 0 && (
          <motion.div
            key="empty"
            initial={{ ...swap.initial, height: 0 }}
            animate={{ ...swap.animate, height: "auto", transition: { ...swap.animate.transition, height: shape } }}
            exit={{ ...swap.exit, height: 0, transition: { ...swap.exit.transition, height: shape } }}
            className="tn:overflow-hidden"
          >
            <EmptyState title={emptyText} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
