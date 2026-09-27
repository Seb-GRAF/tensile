import { AnimatePresence, motion, useIsPresent, useMotionTemplate } from "motion/react";
import { useRef, useState } from "react";
import { Check } from "../../Check";
import { useLiquid, useSprings } from "../../springs";
import { useSize } from "../../useSize";
import { Icon } from "../data-display/Icon";
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
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
};

const INSET = 4;
const FILL_MIN = 36;

function UploadTrigger({ disabled, ...props }: React.ComponentProps<typeof motion.button>) {
  const { swap } = useSprings();
  const present = useIsPresent();
  return <motion.button {...props} {...swap} disabled={disabled || !present} aria-hidden={!present} inert={!present} />;
}

function UploadShape({
  status, progress, onFiles, label, uploadingLabel, formatProgress, doneLabel,
  accept, multiple, disabled, width,
}: Required<Omit<FileUploadProps, "accept" | "className">> & { accept?: string; width: number }) {
  const { shape, soft, swap } = useSprings();
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [name, setName] = useState("");
  const [left, right] = useLiquid(INSET, INSET + (1 - progress) * (width - 2 * INSET - FILL_MIN));
  const clipPath = useMotionTemplate`inset(0px ${right}px 0px ${left}px round var(--radius-control))`;
  const shapes = {
    idle: { width, height: 128, borderRadius: "var(--radius-card)", backgroundColor: "var(--color-paper)" },
    over: { width: width + 16, height: 144, borderRadius: "var(--radius-card)", backgroundColor: "var(--color-accent)" },
    uploading: { width, height: 44, borderRadius: "var(--radius-control)", backgroundColor: "var(--color-paper)" },
    done: { width: 44, height: 44, borderRadius: "var(--radius-control)", backgroundColor: "var(--color-accent)" },
  };
  const content = (
    <>
      <span className="min-w-0 flex-1 truncate">{uploadingLabel(name)}</span>
      <NumberTicker value={progress} format={formatProgress} />
    </>
  );

  function take(fileList: FileList) {
    const files = Array.from(fileList);
    const selected = multiple ? files : files.slice(0, 1);
    setName(selected.map((file) => file.name).join(", "));
    onFiles(selected);
  }

  function allowDrop(event: React.DragEvent) {
    event.preventDefault();
    if (!disabled) setOver(true);
  }

  return (
    <>
      <motion.div
        initial={false}
        animate={shapes[over ? "over" : status]}
        transition={{ width: shape, height: shape, borderRadius: shape, backgroundColor: soft }}
        className="relative grid place-content-center place-items-center overflow-hidden shadow-float outline-offset-2 has-focus-visible:outline-2 has-focus-visible:outline-focus"
      >
        <AnimatePresence initial={false}>
          {status !== "idle" && (
            <motion.span key="fill" {...swap} style={{ left, right }} className="absolute inset-y-0 my-auto h-9 rounded-control bg-accent" />
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {status === "idle" && (
            <UploadTrigger
              key="idle"
              type="button"
              disabled={disabled}
              onClick={() => input.current!.click()}
              onDragEnter={allowDrop}
              onDragOver={allowDrop}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setOver(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                setOver(false);
                if (!disabled) take(event.dataTransfer.files);
              }}
              className="absolute inset-0 grid place-content-center place-items-center outline-none"
            >
              <span style={{ width }} className={`flex flex-col items-center gap-2.5 px-6 text-center text-body font-medium ${over ? "text-on-accent" : "text-ink"}`}>
                <Icon size={24}>
                  <path d="M12 15V4m-5 5 5-5 5 5" />
                  <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                </Icon>
                {label}
              </span>
            </UploadTrigger>
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
              style={{ width }}
              className="relative col-start-1 row-start-1 h-11 text-sm font-medium"
            >
              <span className="absolute inset-0 flex items-center gap-3 pr-4 pl-13 text-ink">{content}</span>
              <motion.span aria-hidden style={{ clipPath }} className="absolute inset-0 flex items-center gap-3 pr-4 pl-13 text-on-accent">{content}</motion.span>
            </motion.div>
          )}
          {status === "done" && (
            <motion.span key="done" {...swap} className="relative col-start-1 row-start-1 text-on-accent">
              <Check size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <input
        ref={input}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => {
          take(event.target.files!);
          event.target.value = "";
        }}
      />
      <span role="status" className="sr-only">{status === "done" && doneLabel}</span>
    </>
  );
}

export function FileUpload({
  status,
  progress,
  onFiles,
  label = "Drop a file or click to upload",
  uploadingLabel = (name: string) => `Uploading ${name}`,
  formatProgress = (progress: number) => progress.toLocaleString("en-US", { style: "percent" }),
  doneLabel = "Uploaded",
  accept,
  multiple = false,
  disabled = false,
  className = "",
}: FileUploadProps) {
  const [size, measure] = useSize();
  return (
    <div ref={measure} className={`grid h-32 w-full place-content-center place-items-center ${disabled ? "opacity-40" : ""} ${className}`}>
      {size && <UploadShape width={size.width} status={status} progress={progress} onFiles={onFiles} label={label} uploadingLabel={uploadingLabel} formatProgress={formatProgress} doneLabel={doneLabel} accept={accept} multiple={multiple} disabled={disabled} />}
    </div>
  );
}
