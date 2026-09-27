import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { Check } from "../../Check";
import { shape, soft, swap, useLiquid } from "../../springs";
import { NumberTicker } from "../data-display/NumberTicker";

export type FileUploadProps = {
  status: "idle" | "uploading" | "done";
  /** 0..1 */
  progress: number;
  /** Called with the files the user picked or dropped. Start the upload here and set `status` and `progress`. */
  onFiles: (files: File[]) => void;
  label?: string;
  uploadingLabel?: (name: string) => string;
  formatProgress?: (progress: number) => string;
  doneLabel?: string;
};

const WIDTH = 320;
const INSET = 4;
const FILL_MIN = 36;
const TRAVEL = WIDTH - 2 * INSET - FILL_MIN;

const shapes = {
  idle: { width: WIDTH, height: 128, backgroundColor: "var(--color-paper)" },
  over: { width: WIDTH + 16, height: 144, backgroundColor: "var(--color-accent)" },
  uploading: { width: WIDTH, height: 44, backgroundColor: "var(--color-paper)" },
  done: { width: 44, height: 44, backgroundColor: "var(--color-accent)" },
};

export function FileUpload({
  status,
  progress,
  onFiles,
  label = "Drop a file or click to upload",
  uploadingLabel = (name: string) => `Uploading ${name}`,
  formatProgress = (progress: number) => progress.toLocaleString("en-US", { style: "percent" }),
  doneLabel = "Uploaded",
}: FileUploadProps) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [name, setName] = useState("");
  const [left, right] = useLiquid(INSET, INSET + (1 - progress) * TRAVEL);

  function take(fileList: FileList) {
    const files = Array.from(fileList);
    setName(files.map((file) => file.name).join(", "));
    onFiles(files);
  }

  function allowDrop(event: React.DragEvent) {
    event.preventDefault();
    setOver(true);
  }

  return (
    <div className="grid h-32 w-80 place-content-center place-items-center">
      <motion.div
        initial={false}
        animate={shapes[over ? "over" : status]}
        transition={{ width: shape, height: shape, backgroundColor: soft }}
        className="relative grid place-content-center place-items-center overflow-hidden rounded-[22px] shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-ink"
      >
        <AnimatePresence initial={false}>
          {status !== "idle" && (
            <motion.span
              key="fill"
              {...swap}
              style={{ left, right }}
              className="absolute inset-y-0 my-auto h-9 rounded-full bg-accent"
            />
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {status === "idle" && (
            <motion.button
              key="idle"
              {...swap}
              type="button"
              onClick={() => input.current!.click()}
              onDragEnter={allowDrop}
              onDragOver={allowDrop}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setOver(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                setOver(false);
                take(event.dataTransfer.files);
              }}
              className="absolute inset-0 grid place-content-center place-items-center outline-none"
            >
              <span className="flex w-80 flex-col items-center gap-2.5 px-6 text-center text-[15px] font-medium text-ink">
                <svg
                  viewBox="0 0 24 24"
                  className="size-6 fill-none stroke-current"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 15V4m-5 5 5-5 5 5" />
                  <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                </svg>
                {label}
              </span>
            </motion.button>
          )}
          {status === "uploading" && (
            <motion.div
              key="uploading"
              {...swap}
              role="progressbar"
              aria-label={uploadingLabel(name)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-valuetext={formatProgress(progress)}
              className="relative col-start-1 row-start-1 flex h-11 w-80 items-center gap-3 pr-4 pl-13 text-sm font-medium text-ink"
            >
              <span className="min-w-0 flex-1 truncate">{uploadingLabel(name)}</span>
              <NumberTicker value={progress} format={formatProgress} />
            </motion.div>
          )}
          {status === "done" && (
            <motion.span key="done" {...swap} className="relative col-start-1 row-start-1 text-ink">
              <Check size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <input
        ref={input}
        type="file"
        hidden
        onChange={(event) => {
          take(event.target.files!);
          event.target.value = "";
        }}
      />
      <span role="status" className="sr-only">
        {status === "done" && doneLabel}
      </span>
    </div>
  );
}
