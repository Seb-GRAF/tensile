import { AnimatePresence, motion, useIsPresent, useMotionTemplate } from "motion/react";
import { useRef, useState } from "react";
import { Check } from "../../../Check";
import { useLiquid, useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Icon } from "../../data-display/Icon/Icon";
import { NumberTicker } from "../../data-display/NumberTicker/NumberTicker";

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
  const clipPath = useMotionTemplate`inset(0px ${right}px 0px ${left}px round var(--tn-radius-control))`;
  const shapes = {
    idle: { width, height: 128, borderRadius: "var(--tn-radius-card)", backgroundColor: "var(--tn-color-paper)" },
    over: { width: width + 16, height: 144, borderRadius: "var(--tn-radius-card)", backgroundColor: "var(--tn-color-accent)" },
    uploading: { width, height: 44, borderRadius: "var(--tn-radius-control)", backgroundColor: "var(--tn-color-paper)" },
    done: { width, height: 44, borderRadius: "var(--tn-radius-control)", backgroundColor: "var(--tn-color-accent)" },
  };
  const content = (
    <>
      <span className="tn:min-w-0 tn:flex-1 tn:truncate">{uploadingLabel(name)}</span>
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
        className={`tn:relative tn:grid tn:place-content-center tn:place-items-center tn:overflow-hidden tn:shadow-control tn:outline-offset-2 tn:has-focus-visible:outline-2 tn:has-focus-visible:outline-focus ${status === "idle" && !disabled ? "tn:press" : ""}`}
      >
        <AnimatePresence initial={false}>
          {status !== "idle" && (
            <motion.span key="fill" {...swap} style={{ left, right }} className="tn:absolute tn:inset-y-0 tn:my-auto tn:h-9 tn:rounded-control tn:bg-accent" />
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
              className="tn:absolute tn:inset-0 tn:grid tn:place-content-center tn:place-items-center tn:outline-none tn:enabled:hover:bg-hover"
            >
              <span style={{ width }} className={`tn:flex tn:flex-col tn:items-center tn:gap-2.5 tn:px-6 tn:text-center tn:text-body tn:font-medium ${over ? "tn:text-on-accent" : "tn:text-ink"}`}>
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
              className="tn:relative tn:col-start-1 tn:row-start-1 tn:h-11 tn:text-sm tn:font-medium"
            >
              <span className="tn:absolute tn:inset-0 tn:flex tn:items-center tn:gap-3 tn:pr-4 tn:pl-13 tn:text-ink">{content}</span>
              <motion.span aria-hidden style={{ clipPath }} className="tn:absolute tn:inset-0 tn:flex tn:items-center tn:gap-3 tn:pr-4 tn:pl-13 tn:text-on-accent">{content}</motion.span>
            </motion.div>
          )}
          {status === "done" && (
            <motion.span key="done" {...swap} style={{ width }} className="tn:relative tn:col-start-1 tn:row-start-1 tn:flex tn:h-11 tn:items-center tn:gap-5 tn:pr-4 tn:pl-3 tn:text-sm tn:font-medium tn:text-on-accent">
              <Check size={20} />
              <span className="tn:min-w-0 tn:flex-1 tn:truncate">{name}</span>
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
      <span role="status" className="tn:sr-only">{status === "done" && doneLabel}</span>
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
    <div ref={measure} className={`tn:grid tn:h-32 tn:w-full tn:place-content-center tn:place-items-center ${disabled ? "tn:opacity-40" : ""} ${className}`}>
      {size && <UploadShape width={size.width} status={status} progress={progress} onFiles={onFiles} label={label} uploadingLabel={uploadingLabel} formatProgress={formatProgress} doneLabel={doneLabel} accept={accept} multiple={multiple} disabled={disabled} />}
    </div>
  );
}
