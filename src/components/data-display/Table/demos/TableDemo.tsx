import { Table } from "tensile";

type Project = { id: string; name: string; owner: string; hours: number };

const projects: Project[] = [
  { id: "studio", name: "Studio", owner: "Maya Chen", hours: 24 },
  { id: "website", name: "Website", owner: "Jonas Weber", hours: 48 },
  { id: "mobile", name: "Mobile app", owner: "Aiko Tanaka", hours: 32 },
  { id: "research", name: "Research", owner: "Maya Chen", hours: 16 },
  { id: "brand", name: "Brand", owner: "Jonas Weber", hours: 20 },
  { id: "launch", name: "Launch", owner: "Aiko Tanaka", hours: 40 },
];

const columns = [
  { key: "name", header: "Project", rowHeader: true },
  { key: "owner", header: "Owner" },
  { key: "hours", header: "Hours" },
];

export function TableDemo() {
  return (
    <div className="w-full max-w-lg">
      <Table
        caption="Project workload"
        columns={columns}
        rows={projects}
        rowKey={(project: Project) => project.id}
      />
    </div>
  );
}
