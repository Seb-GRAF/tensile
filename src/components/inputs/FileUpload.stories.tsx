import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";
import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";
import { icons } from "../../icons";
import { IconButton } from "../actions/IconButton";
import { Icon } from "../data-display/Icon";
import { List } from "../data-display/List";
import { ProgressBar } from "../feedback/ProgressBar";
import { FileUpload, type FileUploadProps } from "./FileUpload";

const steps = [0.15, 0.4, 0.65, 0.9, 1];

function FileList(props: FileUploadProps) {
  const [files, setFiles] = useState<{ id: string; file: File; progress: number }[]>([]);
  const region = useRef<HTMLElement>(null);
  const uploading = files.some((file) => file.progress < 1);
  const progress = files.length === 0 ? 0 : files.reduce((total, file) => total + file.progress, 0) / files.length;

  useEffect(() => {
    if (!uploading) return;
    const interval = setInterval(() => {
      setFiles((files) => files.map((file, i) => ({ ...file, progress: Math.min(1, file.progress + 0.25 / (i + 1)) })));
    }, 400);
    return () => clearInterval(interval);
  }, [uploading]);

  return (
    <section ref={region} aria-label="File uploads" tabIndex={-1} className="w-96 max-w-full space-y-5 outline-none">
      <FileUpload
        {...props}
        status={files.length === 0 ? "idle" : uploading ? "uploading" : "done"}
        progress={progress}
        onFiles={(picked) => {
          props.onFiles(picked);
          setFiles(picked.map((file, i) => ({ id: `${file.name}-${i}`, file, progress: 0 })));
        }}
      />
      <List
        label="Selected files"
        items={files.map(({ id, file, progress }) => ({
          id,
          title: file.name,
          description: <ProgressBar value={progress} label={`Uploading ${file.name}`} className="mt-2" />,
          trailing: (
            <IconButton
              label={`Remove ${file.name}`}
              variant="ghost"
              size="sm"
              onClick={(event) => {
                const item = event.currentTarget.closest("li")!;
                const neighbor = item.nextElementSibling ?? item.previousElementSibling;
                (neighbor?.querySelector("button") ?? region.current!).focus();
                setFiles((files) => files.filter((file) => file.id !== id));
              }}
            >
              <Icon size={16}>{icons.close}</Icon>
            </IconButton>
          ),
        }))}
      />
    </section>
  );
}

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

    return <div className="w-80 max-w-full"><FileUpload {...args} onFiles={onFiles} /></div>;
  },
};

export const WithFileList: Story = {
  args: { multiple: true, accept: ".pdf,.png" },
  parameters: { layout: "padded" },
  render: (args) => <div className="flex justify-center"><FileList {...args} /></div>,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <div className="w-80 max-w-full"><FileUpload {...args} /></div>,
};
