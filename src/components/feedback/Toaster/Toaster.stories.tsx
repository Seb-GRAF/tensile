import { ToasterDemo } from "./demos/ToasterDemo";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../actions/Button/Button";
import { Toaster, toast } from "./Toaster";

const meta = {
  title: "Feedback/Toaster",
  id: "components-toaster",
  component: Toaster,
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

function upload() {
  const id = toast("Uploading photo", { status: "loading" });
  setTimeout(() => toast("Photo uploaded", { id, status: "success" }), 2000);
}

/** Save draft shows a toast that leaves after 4 s; Upload photo shows a loading toast that turns into a success after 2 s; hover the stack or Tab into it to fan it out, × dismisses. */
export const Default: Story = {
  render: (args) => (
    <div className="flex w-80 max-w-full flex-col items-center gap-8">
      <Toaster {...args} />
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => toast("Draft saved", { status: "success" })}>
          Save draft
        </Button>
        <Button variant="secondary" onClick={upload}>
          Upload photo
        </Button>
      </div>
    </div>
  ),
};

export const Usage: Story = {
  render: () => <ToasterDemo />,
};
