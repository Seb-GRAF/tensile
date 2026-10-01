import { useState, type FormEvent } from "react";
import { Button, Dialog, Field, Icon, Input, MorphButton, Select, Toggle, ToggleGroup } from "tensile";

const ranges = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const roles = [
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

export function App() {
  const [range, setRange] = useState("week");
  const [notify, setNotify] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>("editor");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      setError("Enter an email address");
      return;
    }
    setError(undefined);
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setOpen(false);
    }, 2400);
  }

  return (
    <main className="app">
      <h1>
        <Icon name="plus" size={20} />
        A consumer without Tailwind
      </h1>
      <ToggleGroup type="single" options={ranges} value={range} onValueChange={setRange} />
      <Toggle checked={notify} onCheckedChange={setNotify} label="Notifications" />
      <div className="actions">
        <Dialog open={open} onOpenChange={setOpen} trigger="Invite people" title="Invite people">
          <form noValidate onSubmit={invite} className="invite">
            <Field label="Email" error={error}>
              <Input type="email" autoComplete="email" placeholder="name@example.com" value={email} onValueChange={setEmail} />
            </Field>
            <Field label="Role">
              <Select options={roles} value={role} onValueChange={setRole} />
            </Field>
            <MorphButton type="submit" status={status}>
              Send invite
            </MorphButton>
          </form>
        </Dialog>
        <Button variant="ghost" onClick={() => setRange("week")}>
          Reset range
        </Button>
      </div>
    </main>
  );
}
