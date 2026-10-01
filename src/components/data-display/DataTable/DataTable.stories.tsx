import { DataTableDemo } from "./demos/DataTableDemo";
import { DataTableActionsDemo } from "./demos/DataTableActionsDemo";
import { DataTableLoadingDemo } from "./demos/DataTableLoadingDemo";
import { DataTableEmptyDemo } from "./demos/DataTableEmptyDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { StatusBadge } from "../../feedback/StatusBadge/StatusBadge";
import { DataTable, type DataTableProps } from "./DataTable";

type Invoice = {
  number: string;
  customer: string;
  project: string;
  status: "Paid" | "Open" | "Overdue";
  amount: number;
};

const PAGE = 8;

const customers = [
  "Helvetia Analytics",
  "Studio Bernasconi",
  "Maison Fontaine",
  "Wyss Holzbau",
  "Nordlys Energy",
  "Watanabe Precision",
  "Okafor Creative",
  "Müller & Partner",
];

const projects = [
  "Website redesign",
  "Brand guidelines 2026, final legal and marketing review",
  "Quarterly analytics dashboard",
  "Accessibility audit and remediation of the customer portal",
  "Newsletter templates",
  "Onboarding flow for the mobile app",
  "Annual report design and print production",
];

const invoices: Invoice[] = Array.from({ length: 32 }, (_, i) => ({
  number: `INV-${1032 - i}`,
  customer: customers[(i * 5) % customers.length],
  project: projects[(i * 3) % projects.length],
  status: i < 6 ? "Open" : i % 5 === 0 ? "Overdue" : "Paid",
  amount: 480 + ((i * 7919 * 13) % 1200000) / 100,
}));

const tones = { Paid: "success", Open: "info", Overdue: "warning" } as const;
const chf = new Intl.NumberFormat("en-US", { style: "currency", currency: "CHF" });

function pageOf(rows: Invoice[], sort: DataTableProps<Invoice>["sort"], page: number) {
  const sorted =
    !sort
      ? rows
      : [...rows].sort((a, b) => {
          const key = sort.key as keyof Invoice;
          const order = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
          return sort.direction === "ascending" ? order : -order;
        });
  return sorted.slice((page - 1) * PAGE, page * PAGE);
}

const meta = {
  title: "Data display/DataTable",
  id: "components-datatable",
  component: DataTable<Invoice>,
  parameters: { layout: "padded" },
  args: {
    caption: "Invoices",
    rows: invoices,
    rowKey: (row) => row.number,
    columns: [
      { key: "number", header: "Invoice", rowHeader: true, sortable: true },
      { key: "customer", header: "Customer", sortable: true },
      { key: "project", header: "Project", cell: (row) => <div className="min-w-48 whitespace-normal">{row.project}</div> },
      { key: "status", header: "Status", cell: (row) => <StatusBadge status={tones[row.status]} label={row.status} /> },
      { key: "amount", header: "Amount", align: "end", sortable: true, cell: (row) => chf.format(row.amount) },
    ],
    sort: null,
    onSortChange: fn(),
    selection: [],
    onSelectionChange: fn(),
    page: 1,
    pageCount: invoices.length / PAGE,
    onPageChange: fn(),
    onRowAction: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="mx-auto grid max-w-4xl gap-4">
        <DataTable
          {...args}
          rows={pageOf(args.rows, args.sort, args.page!)}
          onSortChange={(sort) => {
            args.onSortChange?.(sort);
            updateArgs({ sort, page: 1 });
          }}
          onSelectionChange={(selection) => {
            args.onSelectionChange?.(selection);
            updateArgs({ selection });
          }}
          onPageChange={(page) => {
            args.onPageChange?.(page);
            updateArgs({ page });
          }}
        />
        <output className="text-label text-muted">{args.selection!.join(", ")}</output>
      </div>
    );
  },
} satisfies Meta<typeof DataTable<Invoice>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a sortable header, or Tab to it and press Enter or Space, to sort; Space checks a row; the header checkbox selects or clears this page's rows and keeps the other pages' selection. */
export const Default: Story = {};

/** While loading, placeholder rows stand in for the data and the table is marked busy. */
export const Loading: Story = {
  args: { loading: true, rows: [] },
};

export const Empty: Story = {
  args: { rows: [], pageCount: 1 },
};

/** Each row has an action menu named after its invoice; the chosen action appears below the table. */
export const WithRowActions: Story = {
  args: {
    columns: meta.args.columns.filter((column) => column.key !== "project"),
    rowActions: (row) => [
      { label: "View invoice" },
      { label: "Download PDF" },
      { label: "Send reminder", disabled: row.status === "Paid" },
      { label: "Void invoice" },
    ],
  },
  render: function Render(args) {
    const [sort, setSort] = useState(args.sort);
    const [selection, setSelection] = useState(args.selection);
    const [page, setPage] = useState(args.page!);
    const [action, setAction] = useState("");
    return (
      <div className="mx-auto grid max-w-4xl gap-4">
        <DataTable
          {...args}
          rows={pageOf(args.rows, sort, page)}
          sort={sort}
          onSortChange={(next) => {
            args.onSortChange?.(next);
            setSort(next);
            setPage(1);
          }}
          selection={selection}
          onSelectionChange={(next) => {
            args.onSelectionChange?.(next);
            setSelection(next);
          }}
          page={page}
          onPageChange={(next) => {
            args.onPageChange?.(next);
            setPage(next);
          }}
          onRowAction={(row, chosen) => {
            args.onRowAction!(row, chosen);
            setAction(`${chosen.label}: ${row.number}`);
          }}
        />
        <output className="text-label text-muted">{action}</output>
      </div>
    );
  },
};

export const Usage: Story = {
  render: () => <DataTableDemo />,
};

export const ActionsUsage: Story = {
  render: () => <DataTableActionsDemo />,
};

export const LoadingUsage: Story = {
  render: () => <DataTableLoadingDemo />,
};

export const EmptyUsage: Story = {
  render: () => <DataTableEmptyDemo />,
};
