import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";

type Customer = {
  name: string;
  company: string;
  email: string;
  country: string;
  plan: string;
  seats: number;
  orders: number;
  revenue: number;
  since: string;
  manager: string;
};

const chf = new Intl.NumberFormat("en-US", { style: "currency", currency: "CHF" });

const customers: Customer[] = [
  { name: "Maya Chen", company: "Helvetia Analytics & Research Cooperative", email: "maya.chen@helvetia-analytics.ch", country: "Switzerland", plan: "Enterprise", seats: 120, orders: 1284, revenue: 184250, since: "Mar 2019", manager: "Jonas Keller" },
  { name: "Kenji Watanabe", company: "Watanabe Precision Instruments", email: "k.watanabe@watanabe-precision.jp", country: "Japan", plan: "Enterprise", seats: 88, orders: 1067, revenue: 158740.25, since: "Nov 2019", manager: "Jonas Keller" },
  { name: "Aurélie Dubois-Fontaine", company: "Maison Fontaine Parfums et Cosmétiques Internationale", email: "aurelie.dubois@maisonfontaine.fr", country: "France", plan: "Enterprise", seats: 64, orders: 911, revenue: 132480, since: "Jun 2020", manager: "Lea Brunner" },
  { name: "Ingrid Solberg", company: "Nordlys Energy", email: "ingrid.solberg@nordlys.no", country: "Norway", plan: "Team", seats: 25, orders: 418, revenue: 71300, since: "Feb 2022", manager: "Sara Rossi" },
  { name: "Sophie Müller", company: "Kommunikationsagentur Müller & Partner", email: "sophie.mueller@mueller-partner.de", country: "Germany", plan: "Team", seats: 21, orders: 377, revenue: 55120.75, since: "Aug 2021", manager: "Lea Brunner" },
  { name: "Luca Bernasconi", company: "Bernasconi Architetti", email: "luca@bernasconi-architetti.it", country: "Italy", plan: "Team", seats: 18, orders: 342, revenue: 48960.5, since: "Jan 2021", manager: "Sara Rossi" },
  { name: "Amara Okafor", company: "Lagos Creative Studio", email: "amara@lagoscreative.ng", country: "Nigeria", plan: "Team", seats: 12, orders: 203, revenue: 29480, since: "Oct 2023", manager: "Sara Rossi" },
  { name: "Tobias Wyss", company: "Wyss Holzbau", email: "tobias.wyss@wyss-holzbau.ch", country: "Switzerland", plan: "Starter", seats: 4, orders: 56, revenue: 6215.8, since: "May 2024", manager: "Lea Brunner" },
];

const meta = {
  title: "Data display/Table",
  id: "components-table",
  component: Table<Customer>,
  parameters: { layout: "padded" },
  args: {
    caption: "Top customers by revenue",
    rows: customers,
    rowKey: (row) => row.email,
    columns: [
      { key: "name", header: "Customer", rowHeader: true },
      { key: "company", header: "Company", cell: (row) => <div className="min-w-48 whitespace-normal">{row.company}</div> },
      { key: "country", header: "Country" },
      { key: "orders", header: "Orders", align: "end", cell: (row) => row.orders.toLocaleString("en-US") },
      { key: "revenue", header: "Revenue", align: "end", cell: (row) => chf.format(row.revenue) },
    ],
  },
} satisfies Meta<typeof Table<Customer>>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Customers by revenue: cells keep to one line except the company names, whose cell content wraps; numbers align right. When the table is wider than its container, Tab reaches the scroll area and the arrow keys scroll it. */
export const Default: Story = {
  render: (args) => (
    <div className="mx-auto max-w-3xl">
      <Table {...args} />
    </div>
  ),
};

/** Ten columns in a short, narrow container: the table scrolls both ways inside its surface, and the header stays on top. */
export const Wide: Story = {
  args: {
    columns: [
      { key: "name", header: "Customer", rowHeader: true },
      { key: "company", header: "Company" },
      { key: "email", header: "Email" },
      { key: "country", header: "Country" },
      { key: "plan", header: "Plan" },
      { key: "seats", header: "Seats", align: "end" },
      { key: "orders", header: "Orders", align: "end", cell: (row) => row.orders.toLocaleString("en-US") },
      { key: "revenue", header: "Revenue", align: "end", cell: (row) => chf.format(row.revenue) },
      { key: "since", header: "Customer since" },
      { key: "manager", header: "Account manager" },
    ],
  },
  render: (args) => (
    <div className="mx-auto w-80">
      <Table {...args} className="max-h-72" />
    </div>
  ),
};
