import { useState } from "react";
import { DataTable, type DataTableProps, type TableSort } from "tensile";

type Project = { id: string; name: string; owner: string; hours: number };

const projects: Project[] = [
  { id: "studio", name: "Studio", owner: "Maya Chen", hours: 24 },
  { id: "website", name: "Website", owner: "Jonas Weber", hours: 48 },
  { id: "mobile", name: "Mobile app", owner: "Aiko Tanaka", hours: 32 },
  { id: "research", name: "Research", owner: "Maya Chen", hours: 16 },
  { id: "brand", name: "Brand", owner: "Jonas Weber", hours: 20 },
  { id: "launch", name: "Launch", owner: "Aiko Tanaka", hours: 40 },
];

const columns: DataTableProps<Project>["columns"] = [
  { key: "name", header: "Project", rowHeader: true, sortable: true },
  { key: "hours", header: "Hours", sortable: true, align: "end" },
];

export function DataTableLoadingDemo() {
  const [sort, setSort] = useState<TableSort | null>(null);
  const [selection, setSelection] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const sorted =
    sort === null
      ? projects
      : [...projects].sort((a, b) => {
          const order =
            sort.key === "hours"
              ? a.hours - b.hours
              : a.name.localeCompare(b.name);
          return sort.direction === "ascending" ? order : -order;
        });
  const rows = sorted.slice((page - 1) * 3, page * 3);

  return (
    <div className="grid w-full gap-4">
      <DataTable
        caption="Project workload"
        columns={columns}
        rows={rows}
        rowKey={(project) => project.id}
        sort={sort}
        onSortChange={(next) => {
          setSort(next);
          setPage(1);
        }}
        selection={selection}
        onSelectionChange={setSelection}
        page={page}
        pageCount={2}
        onPageChange={setPage}
        loading
      />
      <output
        aria-live="polite"
        className="text-label"
      >{`${selection.length} selected`}</output>
    </div>
  );
}
