import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AppShell,
  Avatar,
  Button,
  CollapsibleSidebar,
  DataTable,
  EmptyState,
  Icon,
  Input,
  LinkProvider,
  PageHeader,
  SelectionBar,
  StatTile,
  StatusBadge,
  TabBar,
  ToggleGroup,
  type TableSort,
} from "../index";

const PAGE = 8;
const today = new Date(2026, 8, 28);
const monthAgo = new Date(2026, 7, 28);

const tones = { Open: "neutral", Paid: "success", Overdue: "warning" } as const;
const statusOptions = Object.keys(tones).map((status) => ({ value: status, label: status }));
const chf = new Intl.NumberFormat("en-US", { style: "currency", currency: "CHF" });
const wholeChf = new Intl.NumberFormat("en-US", { style: "currency", currency: "CHF", maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

type Invoice = {
  number: string;
  customer: string;
  due: Date;
  status: keyof typeof tones;
  amount: number;
};

const customers = [
  "Helvetia Analytics & Research Cooperative",
  "Maison Fontaine Parfums et Cosmétiques Internationale",
  "Studio Bernasconi Architetti Associati",
  "Kommunikationsagentur Müller & Partner",
  "Watanabe Precision Instruments",
  "Nordlys Energy",
  "Wyss Holzbau",
  "Okafor & Adeyemi Legal Consultants",
  "Fundação Oliveira para a Educação e Cultura",
  "Bäckerei Konditorei Hofmann-Steiner",
  "Lindqvist & Chen Industrial Design",
  "Lagos Creative Studio",
];

const mockInvoices: Invoice[] = Array.from({ length: 48 }, (_, i) => {
  const due = new Date(2026, 9, 12 - i * 3);
  return {
    number: `INV-${2048 - i}`,
    customer: customers[(i * 5) % customers.length],
    due,
    status: due > today ? "Open" : i % 8 === 5 && i < 20 ? "Overdue" : "Paid",
    amount: 480 + ((i * 7919 * 13) % 1200000) / 100,
  };
});

const rowActions = [{ label: "View" }, { label: "Duplicate" }, { label: "Delete" }];

const sections = [
  { href: "/overview", label: "Overview", icon: "home" },
  { href: "/invoices", label: "Invoices", icon: "file" },
  { href: "/payments", label: "Payments", icon: "creditCard" },
  { href: "/customers", label: "Customers", icon: "user" },
] as const;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function total(invoices: Invoice[]) {
  return invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
}

const brand = (
  <span className="flex h-10 items-center gap-2.5 overflow-hidden px-1.5 text-body font-semibold whitespace-nowrap text-ink">
    <Icon name="layers" size={20} className="shrink-0" />
    Ledger
  </span>
);

function Invoices() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<string[]>([]);
  const [sort, setSort] = useState<TableSort | null>(null);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<Invoice[]>([]);
  const [confirming, setConfirming] = useState(false);
  const request = useRef(0);

  const search = query.toLowerCase();
  const rows = invoices.filter(
    (invoice) =>
      (statuses.length === 0 || statuses.includes(invoice.status)) &&
      (invoice.customer.toLowerCase().includes(search) || invoice.number.toLowerCase().includes(search)),
  );
  if (sort) {
    rows.sort((a, b) => {
      const key = sort.key as keyof Invoice;
      const order = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      return sort.direction === "ascending" ? order : -order;
    });
  }
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE));
  const shownPage = Math.min(page, pageCount);

  async function loadFirstPage() {
    setPage(1);
    setLoading(true);
    const id = ++request.current;
    await wait(600);
    if (id === request.current) setLoading(false);
  }

  function clearFilters() {
    setQuery("");
    setStatuses([]);
    loadFirstPage();
  }

  function confirmDelete(chosen: Invoice[]) {
    setDeleting(chosen);
    setConfirming(true);
  }

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Invoices"
        description="Send, track and follow up on invoices for every customer."
        actions={<Button>New invoice</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Outstanding"
          value={total(invoices.filter((invoice) => invoice.status !== "Paid"))}
          change={0.12}
          formatValue={(value) => wholeChf.format(value)}
        />
        <StatTile
          label="Overdue"
          value={total(invoices.filter((invoice) => invoice.status === "Overdue"))}
          change={-0.04}
          formatValue={(value) => wholeChf.format(value)}
        />
        <StatTile
          label="Paid in the last 30 days"
          value={total(invoices.filter((invoice) => invoice.status === "Paid" && invoice.due > monthAgo))}
          change={0.18}
          formatValue={(value) => wholeChf.format(value)}
        />
      </div>
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={query}
            onValueChange={(value) => {
              setQuery(value);
              loadFirstPage();
            }}
            aria-label="Search invoices"
            placeholder="Search by customer or number"
            leading={
              <Icon name="search" size={16} className="shrink-0" />
            }
            className="min-w-0 flex-1 basis-64"
          />
          <ToggleGroup
            label="Status"
            options={statusOptions}
            value={statuses}
            onValueChange={(value) => {
              setStatuses(value);
              loadFirstPage();
            }}
          />
        </div>
        <DataTable
          caption="Invoices"
          columns={[
            { key: "number", header: "Invoice", rowHeader: true, sortable: true },
            {
              key: "customer",
              header: "Customer",
              sortable: true,
              cell: (row) => (
                <span className="flex min-w-56 items-center gap-3 whitespace-normal">
                  <Avatar name={row.customer} size="sm" className="shrink-0" />
                  {row.customer}
                </span>
              ),
            },
            { key: "due", header: "Due", sortable: true, cell: (row) => date.format(row.due) },
            { key: "status", header: "Status", cell: (row) => <StatusBadge status={tones[row.status]} label={row.status} /> },
            { key: "amount", header: "Amount", align: "end", sortable: true, cell: (row) => chf.format(row.amount) },
          ]}
          rows={rows.slice((shownPage - 1) * PAGE, shownPage * PAGE)}
          rowKey={(row) => row.number}
          sort={sort}
          onSortChange={(next) => {
            setSort(next);
            loadFirstPage();
          }}
          selection={selection}
          onSelectionChange={setSelection}
          page={shownPage}
          pageCount={pageCount}
          onPageChange={setPage}
          loading={loading}
          empty={
            <EmptyState
              title="No invoices match"
              description="Try another customer, invoice number or status."
              action={
                <Button variant="secondary" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          }
          rowActions={() => rowActions}
          onRowAction={(row, action) => {
            if (action.label === "Delete") confirmDelete([row]);
          }}
        />
      </div>
      <SelectionBar
        count={selection.length}
        onClear={() => setSelection([])}
        className="fixed inset-x-0 bottom-24 z-(--tn-layer-sticky) mx-auto w-fit lg:bottom-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setInvoices(invoices.map((invoice) => (selection.includes(invoice.number) ? { ...invoice, status: "Paid" } : invoice)))
          }
        >
          Mark as paid
        </Button>
        <Button variant="ghost" size="sm" onClick={() => confirmDelete(invoices.filter((invoice) => selection.includes(invoice.number)))}>
          Delete
        </Button>
      </SelectionBar>
      {deleting.length > 0 && (
        <AlertDialog
          open={confirming}
          onOpenChange={setConfirming}
          title={deleting.length === 1 ? `Delete ${deleting[0].number}?` : `Delete ${deleting.length} invoices?`}
          description={
            deleting.length === 1
              ? `The ${chf.format(deleting[0].amount)} invoice for ${deleting[0].customer} will be deleted. You can't undo this.`
              : `${deleting.length} invoices worth ${chf.format(total(deleting))} in total will be deleted. You can't undo this.`
          }
          confirmLabel={deleting.length === 1 ? "Delete invoice" : "Delete invoices"}
          onConfirm={() => {
            setInvoices(invoices.filter((invoice) => !deleting.includes(invoice)));
            setSelection(selection.filter((key) => !deleting.some((invoice) => invoice.number === key)));
          }}
        />
      )}
    </div>
  );
}

function DataPage() {
  const [path, setPath] = useState("/invoices");
  const [expanded, setExpanded] = useState(true);

  return (
    <LinkProvider navigate={setPath}>
      <AppShell
        header={
          <header className="flex h-16 items-center justify-between px-6 lg:hidden">
            {brand}
            <Avatar name="Maya Chen" />
          </header>
        }
        sidebar={
          <CollapsibleSidebar
            items={sections.map((section) => ({
              value: section.href,
              href: section.href,
              label: section.label,
              icon: <Icon name={section.icon} />,
            }))}
            value={path}
            onValueChange={setPath}
            expanded={expanded}
            onExpandedChange={setExpanded}
            leading={brand}
            trailing={
              <span className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap">
                <Avatar name="Maya Chen" className="shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate text-label font-medium text-ink">Maya Chen</span>
                  <span className="block truncate text-caption text-muted">Finance</span>
                </span>
              </span>
            }
            className="h-full"
          />
        }
        mobileNav={
          <TabBar
            items={sections.map((section) => ({
              value: section.href,
              href: section.href,
              label: section.label,
              icon: <Icon name={section.icon} size={20} />,
              activeIcon: <Icon name={section.icon} size={20} className="*:fill-current" />,
            }))}
            value={path}
            onValueChange={setPath}
          />
        }
      >
        {path === "/invoices" ? <Invoices /> : <PageHeader title={sections.find((section) => section.href === path)!.label} />}
      </AppShell>
    </LinkProvider>
  );
}

const meta = {
  title: "Examples/Data management",
  id: "examples-data-management",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Search or toggle the status chips (each change loads for 600 ms), sort by a column header, check rows on several pages: the selection bar rises with a count; Mark as paid rolls the totals, and Delete (or a row's menu) asks for a confirmation. */
export const Default: Story = {
  render: () => <DataPage />,
};
