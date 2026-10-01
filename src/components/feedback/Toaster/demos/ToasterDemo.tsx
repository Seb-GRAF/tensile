import { Button, Toaster, toast } from "tensile";

function upload() {
  const id = toast("Uploading photo", { status: "loading" });
  setTimeout(() => toast("Photo uploaded", { id, status: "success" }), 2000);
}

export function ToasterDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="pt-40">
        <Toaster />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => toast("Draft saved", { status: "success" })}>
          Save draft
        </Button>
        <Button variant="secondary" onClick={upload}>
          Upload photo
        </Button>
      </div>
    </div>
  );
}
