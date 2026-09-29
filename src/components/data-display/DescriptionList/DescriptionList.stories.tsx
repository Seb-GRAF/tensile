import { DescriptionListDemo } from "./demos/DescriptionListDemo";
import { DescriptionListContentDemo } from "./demos/DescriptionListContentDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DescriptionList } from "./DescriptionList";

const meta = {
  title: "Data display/DescriptionList",
  id: "components-descriptionlist",
  component: DescriptionList,
  parameters: { layout: "padded" },
  args: {
    items: [
      { label: "Order", value: "#10482" },
      { label: "Placed", value: "September 27, 2026" },
      { label: "Status", value: "Shipped" },
      { label: "Payment", value: "Visa ending in 4242" },
      { label: "Shipping address", value: "Maya Chen, Marktgasse 12, 3011 Bern, Switzerland" },
      { label: "Delivery", value: "Standard, 2–4 business days" },
      { label: "Total", value: "CHF 184.50" },
    ],
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Order details in a card; when the list is narrower than 384 px, each label moves above its value. */
export const Default: Story = {
  render: (args) => (
    <div className="mx-auto max-w-lg rounded-card bg-paper p-5 shadow-float">
      <DescriptionList {...args} />
    </div>
  ),
};

export const Usage: Story = {
  render: () => <DescriptionListDemo />,
};

export const ContentUsage: Story = {
  render: () => <DescriptionListContentDemo />,
};
