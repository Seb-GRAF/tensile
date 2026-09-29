import { Table } from "tensile";
import api from "./api.json";

export function PropsTable({ component }: { component: typeof api[keyof typeof api] }) {
  return (
    <Table
      caption={`${component.title} props`}
      columns={[
        { key: "prop", header: "Prop", rowHeader: true },
        { key: "type", header: "Type", cell: (row) => <code className="block min-w-36 max-w-sm whitespace-normal break-words text-label">{row.type}</code> },
        { key: "required", header: "Required", cell: (row) => row.required ? "Yes" : "No" },
        { key: "default", header: "Default" },
        { key: "description", header: "Description", cell: (row) => <span className="block min-w-52 max-w-sm whitespace-normal">{row.description}</span> },
      ]}
      rows={component.props}
      rowKey={(row) => row.prop}
    />
  );
}
