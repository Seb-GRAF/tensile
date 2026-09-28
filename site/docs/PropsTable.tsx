import { Table } from "tensile";
import api from "./api.json";

export function PropsTable({ component }: { component: typeof api[keyof typeof api] }) {
  return (
    <Table
      caption={`${component.title} props`}
      columns={[
        { key: "prop", header: "Prop", rowHeader: true },
        { key: "type", header: "Type" },
        { key: "required", header: "Required", cell: (row) => row.required ? "Yes" : "No" },
        { key: "default", header: "Default" },
      ]}
      rows={component.props}
      rowKey={(row) => row.prop}
    />
  );
}
