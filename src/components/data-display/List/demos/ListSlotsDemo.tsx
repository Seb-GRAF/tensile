import { List, Avatar, StatusBadge } from "tensile";

export function ListSlotsDemo() {
  return (
    <List
      label="Project members"
      className="w-full max-w-sm"
      items={[
        {
          id: "maya",
          title: "Maya Chen",
          description: "Project owner",
          leading: <Avatar name="Maya Chen" />,
          trailing: <StatusBadge status="success" label="Active" />,
        },
        {
          id: "jonas",
          title: "Jonas Weber",
          description: "Designer",
          leading: <Avatar name="Jonas Weber" />,
          trailing: <StatusBadge status="neutral" label="Invited" />,
        },
      ]}
    />
  );
}
