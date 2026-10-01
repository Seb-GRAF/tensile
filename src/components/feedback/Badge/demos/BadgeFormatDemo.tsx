import { Badge } from "tensile";

export function BadgeFormatDemo() {
  return (
    <Badge
      count={128}
      format={(count) => (count > 99 ? "99+" : String(count))}
      label={(count) => `${count} unread messages`}
    />
  );
}
