import { NotificationListDemo } from "./demos/NotificationListDemo";
import notificationListDemoCode from "./demos/NotificationListDemo.tsx?raw";
import { NotificationListEmptyDemo } from "./demos/NotificationListEmptyDemo";
import notificationListEmptyDemoCode from "./demos/NotificationListEmptyDemo.tsx?raw";

export default {
  description: "Read and dismiss a list of notifications.",
  usage: "Keep notifications in state and update them from onRead and onDismiss using stable IDs.",
  anatomy: "Each row keeps a leading column for an unread dot and an optional Avatar, so titles line up; the dot fades out once the row is read. IconButtons mark items read or dismiss them; a dismissed row blurs out and closes, and the rows below move up with it. EmptyState appears when no items remain.",
  notes: [
    "Dismissing moves focus to another action or the named region.",
    "Time is caller-provided content; the component does not calculate relative dates."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Read and dismiss local notifications.", Demo: NotificationListDemo, code: notificationListDemoCode },
    { id: "empty", title: "Empty state", description: "Empty list state.", Demo: NotificationListEmptyDemo, code: notificationListEmptyDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Move between notification actions."
    },
    {
      "key": "Enter / Space",
      "description": "Mark read or dismiss."
    }
  ],
  related: [
    "ToastStack",
    "List"
  ],
  props: {
    "notifications": "Notifications with stable IDs, titles, times, optional descriptions, read state and avatars.",
    "onRead": "Mark the notification with this ID as read.",
    "onDismiss": "Remove the notification with this ID.",
    "label": "Accessible name of the control or region.",
    "emptyText": "Message shown when there are no options or results.",
    "readLabel": "Accessible label for an item’s mark-read action.",
    "dismissLabel": "Accessible label for an item’s dismissal.",
    "className": "Additional classes on the outer element."
  },
};
