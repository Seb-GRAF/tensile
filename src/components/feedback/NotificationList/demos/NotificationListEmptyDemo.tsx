import { useState } from "react";
import { NotificationList, Card } from "tensile";

const initialNotifications = [
  {
    id: "review",
    title: "Review ready",
    description: "The draft is ready for your feedback.",
    time: "2 minutes ago",
    read: false,
    avatar: { name: "Maya Chen" },
  },
  {
    id: "export",
    title: "Export complete",
    description: "Your files are ready.",
    time: "10 minutes ago",
    read: false,
  },
];

export function NotificationListEmptyDemo() {
  const [notifications, setNotifications] = useState(
    initialNotifications.slice(0, 0),
  );

  return (
    <Card className="w-full max-w-md p-5">
      <NotificationList
        notifications={notifications}
        onRead={(id) =>
          setNotifications(
            notifications.map((item) =>
              item.id === id ? { ...item, read: true } : item,
            ),
          )
        }
        onDismiss={(id) =>
          setNotifications(notifications.filter((item) => item.id !== id))
        }
        emptyText="You are all caught up"
      />
    </Card>
  );
}
