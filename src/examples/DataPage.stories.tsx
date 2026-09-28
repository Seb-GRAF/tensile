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
  LinkProvider,
  PageHeader,
  SearchField,
  StatusBadge,
  TabBar,
  Tag,
  ToggleGroup,
  type TableSort,
} from "../index";

const PAGE = 8;

const tones = { Open: "info", Paid: "success", Overdue: "warning" } as const;
const statusOptions = Object.keys(tones).map((status) => ({ value: status, label: status }));
const chf = new Intl.NumberFormat("en-US", { style: "currency", currency: "CHF" });
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

const mockInvoices: Invoice[] = Array.from({ length: 48 }, (_, i) => ({
  number: `INV-${2048 - i}`,
  customer: customers[(i * 5) % customers.length],
  due: new Date(2026, 9, 26 - i * 4),
  status: i < 8 ? "Open" : i % 6 === 2 ? "Overdue" : "Paid",
  amount: 480 + ((i * 7919 * 13) % 1200000) / 100,
}));

const rowActions = [{ label: "View" }, { label: "Duplicate" }, { label: "Delete" }];

const sections = [
  { href: "/overview", label: "Overview", paths: ["M3.5 10 12 3.5l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4v-6h-6v6H5A1.5 1.5 0 0 1 3.5 19Z"] },
  { href: "/invoices", label: "Invoices", paths: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z", "M14 2v4a2 2 0 0 0 2 2h4"] },
  { href: "/payments", label: "Payments", paths: ["M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z", "M2 10h20"] },
  { href: "/customers", label: "Customers", paths: ["M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z", "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2Z"] },
];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function NavIcon({ paths, size, filled = false }: { paths: string[]; size: number; filled?: boolean }) {
  return (
    <Icon size={size}>
      {paths.map((d) => (
        <path key={d} d={d} className={filled ? "fill-current" : ""} />
      ))}
    </Icon>
  );
}

function Invoices() {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<string[]>([]);
  const [sort, setSort] = useState<TableSort | null>(null);
  const [page, setPage] = useState(1);
  const [selection, setSelection] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<Invoice>();
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

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Invoices"
        description="Send, track and follow up on invoices for every customer."
        actions={<Button>New invoice</Button>}
      />
      <div className="grid gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchField
            value={query}
            onValueChange={(value) => {
              setQuery(value);
              loadFirstPage();
            }}
            label="Search invoices"
            placeholder="Search by customer or number"
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
        {(query !== "" || statuses.length > 0) && (
          <div className="flex flex-wrap items-center gap-2">
            <ul role="list" aria-label="Active filters" className="flex flex-wrap gap-2">
              {query !== "" && (
                <li>
                  <Tag
                    label={`Search: ${query}`}
                    onRemove={() => {
                      setQuery("");
                      loadFirstPage();
                    }}
                  />
                </li>
              )}
              {statuses.map((status) => (
                <li key={status}>
                  <Tag
                    label={`Status: ${status}`}
                    onRemove={() => {
                      setStatuses(statuses.filter((item) => item !== status));
                      loadFirstPage();
                    }}
                  />
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          <output className="text-label text-muted">{selection.length} selected</output>
          <Button
            variant="secondary"
            size="sm"
            disabled={selection.length === 0}
            onClick={() =>
              setInvoices(invoices.map((invoice) => (selection.includes(invoice.number) ? { ...invoice, status: "Paid" } : invoice)))
            }
          >
            Mark as paid
          </Button>
        </div>
        <DataTable
          caption="Invoices"
          columns={[
            { key: "number", header: "Invoice", rowHeader: true, sortable: true },
            { key: "customer", header: "Customer", sortable: true, cell: (row) => <div className="min-w-48 whitespace-normal">{row.customer}</div> },
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
            if (action.label === "Delete") {
              setDeleting(row);
              setConfirming(true);
            }
          }}
        />
      </div>
      {deleting && (
        <AlertDialog
          open={confirming}
          onOpenChange={setConfirming}
          title={`Delete ${deleting.number}?`}
          description={`The ${chf.format(deleting.amount)} invoice for ${deleting.customer} will be deleted. You can't undo this.`}
          confirmLabel="Delete invoice"
          onConfirm={() => {
            setInvoices(invoices.filter((invoice) => invoice.number !== deleting.number));
            setSelection(selection.filter((key) => key !== deleting.number));
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
          <header className="bg-paper shadow-float">
            <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6">
              <span className="flex items-center gap-2 text-body font-semibold text-ink">
                <Icon size={20}>
                  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
                  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
                </Icon>
                Ledger
              </span>
              <Avatar name="Maya Chen" />
            </div>
          </header>
        }
        sidebar={
          <CollapsibleSidebar
            items={sections.map((section) => ({
              value: section.href,
              href: section.href,
              label: section.label,
              icon: <NavIcon paths={section.paths} size={16} />,
            }))}
            value={path}
            onValueChange={setPath}
            expanded={expanded}
            onExpandedChange={setExpanded}
          />
        }
        mobileNav={
          <TabBar
            items={sections.map((section) => ({
              value: section.href,
              href: section.href,
              label: section.label,
              icon: <NavIcon paths={section.paths} size={20} />,
              activeIcon: <NavIcon paths={section.paths} size={20} filled />,
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

/** Search, toggle the status chips or remove a filter tag (each change loads for 600 ms), sort by a column header, check rows on several pages and mark them as paid; a row's menu deletes it after a confirmation. */
export const Default: Story = {
  render: () => <DataPage />,
};
