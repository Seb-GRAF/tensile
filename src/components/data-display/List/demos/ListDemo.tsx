import { List } from "tensile";

const documents = [
  { id: "brief", title: "Project brief", description: "Updated today" },
  { id: "notes", title: "Review notes", description: "Updated yesterday" },
];

export function ListDemo() {
  return (
    <List label="Documents" items={documents} className="w-full max-w-sm" />
  );
}
