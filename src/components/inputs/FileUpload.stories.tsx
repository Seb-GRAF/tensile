import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { FileUpload } from "./FileUpload";

const steps = [0.15, 0.4, 0.65, 0.9, 1];

const meta = {
  title: "Inputs/FileUpload",
  id: "components-fileupload",
  component: FileUpload,
  args: { status: "idle", progress: 0, onFiles: fn() },
  argTypes: { progress: { control: { type: "range", min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click (or press Enter or Space) to pick a file, or drop one on the zone: a fake upload fills the pill in 2 s, the check shows for 1.5 s, then the zone comes back. */
export const Default: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onFiles(files: File[]) {
      args.onFiles(files);
      updateArgs({ status: "uploading", progress: 0 });
      steps.forEach((progress, i) => setTimeout(() => updateArgs({ progress }), 400 * (i + 1)));
      setTimeout(() => updateArgs({ status: "done" }), 2400);
      setTimeout(() => updateArgs({ status: "idle", progress: 0 }), 3900);
    }

    return <FileUpload {...args} onFiles={onFiles} />;
  },
};
