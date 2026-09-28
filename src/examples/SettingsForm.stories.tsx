import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { flushSync } from "react-dom";
import {
  AlertDialog,
  Button,
  Card,
  Field,
  Fieldset,
  Input,
  MorphButton,
  MultiSelect,
  NumberInput,
  PageHeader,
  PasswordInput,
  Select,
  Toggle,
  type MorphButtonProps,
} from "../index";

type Values = {
  name: string;
  email: string;
  timeZone: string;
  password: string;
  timeout: number | null;
  channels: string[];
  productUpdates: boolean;
  weeklySummary: boolean;
  mentions: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  timeZone: "Europe/Zurich",
  password: "",
  timeout: 30,
  channels: ["email", "push"],
  productUpdates: true,
  weeklySummary: false,
  mentions: true,
};

const timeZones = [
  { value: "America/Los_Angeles", label: "Pacific Time (Los Angeles)" },
  { value: "America/New_York", label: "Eastern Time (New York)" },
  { value: "Europe/London", label: "Greenwich Mean Time (London)" },
  { value: "Europe/Zurich", label: "Central European Time (Zurich)" },
  { value: "Asia/Kolkata", label: "India Standard Time (Kolkata)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (Tokyo)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (Sydney)" },
];

const channels = [
  { value: "email", label: "Email" },
  { value: "push", label: "Push notifications" },
  { value: "sms", label: "Text messages" },
  { value: "slack", label: "Slack" },
];

function validate(values: Values): Errors {
  return {
    name: values.name === "" ? "Enter your name" : undefined,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? undefined : "Enter an email address like name@example.com",
    password: values.password.length > 0 && values.password.length < 12 ? "Use at least 12 characters" : undefined,
    timeout: values.timeout === null ? "Enter a number of minutes from 5 to 240" : undefined,
    channels: values.channels.length === 0 ? "Choose at least one channel" : undefined,
  };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Settings() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<MorphButtonProps["status"]>("idle");
  const [data, setData] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    flushSync(() => setErrors(validate(values)));
    const invalid = form.querySelector<HTMLElement>("[aria-invalid=true]");
    if (invalid) {
      invalid.focus();
      return;
    }
    setData(JSON.stringify([...new FormData(form)]));
    setStatus("loading");
    await wait(1200);
    setStatus("success");
    await wait(1500);
    setStatus("idle");
  }

  return (
    <div className="mx-auto grid max-w-2xl gap-8 px-4 py-10">
      <PageHeader title="Settings" description="Manage your profile, how you sign in and what we notify you about." />
      <form
        noValidate
        onSubmit={save}
        onReset={() => {
          setValues(initial);
          setErrors({});
          setData("");
        }}
        className="grid gap-6"
      >
        <Card className="p-6">
          <Fieldset legend="Profile" description="How you appear to your teammates.">
            <Field label="Full name" required error={errors.name}>
              <Input name="name" autoComplete="name" value={values.name} onValueChange={(name) => setValues({ ...values, name })} />
            </Field>
            <Field label="Email" required error={errors.email}>
              <Input type="email" name="email" autoComplete="email" value={values.email} onValueChange={(email) => setValues({ ...values, email })} />
            </Field>
            <Field label="Time zone" description="Due dates and reminders follow this time zone.">
              <Select name="timeZone" options={timeZones} value={values.timeZone} onValueChange={(timeZone) => setValues({ ...values, timeZone })} />
            </Field>
          </Fieldset>
        </Card>
        <Card className="p-6">
          <Fieldset legend="Security" description="Keep your account safe on shared devices.">
            <Field label="New password" description="At least 12 characters. Leave it empty to keep your current password." error={errors.password}>
              <PasswordInput name="password" autoComplete="new-password" value={values.password} onValueChange={(password) => setValues({ ...values, password })} />
            </Field>
            <Field label="Session timeout" description="Minutes without activity before you're signed out, from 5 to 240." required error={errors.timeout}>
              <NumberInput name="timeout" min={5} max={240} value={values.timeout} onValueChange={(timeout) => setValues({ ...values, timeout })} />
            </Field>
          </Fieldset>
        </Card>
        <Card className="p-6">
          <Fieldset legend="Notifications" description="Choose where we reach you and what about.">
            <Field label="Channels" required error={errors.channels}>
              <MultiSelect name="channels" options={channels} value={values.channels} onValueChange={(channels) => setValues({ ...values, channels })} />
            </Field>
            <Field label="Product updates" description="News about features and improvements, about once a month.">
              <Toggle name="productUpdates" checked={values.productUpdates} onCheckedChange={(productUpdates) => setValues({ ...values, productUpdates })} />
            </Field>
            <Field label="Weekly summary" description="A Monday digest of what changed in your projects last week.">
              <Toggle name="weeklySummary" checked={values.weeklySummary} onCheckedChange={(weeklySummary) => setValues({ ...values, weeklySummary })} />
            </Field>
            <Field label="Mentions" description="When someone mentions you in a comment or assigns you a task.">
              <Toggle name="mentions" checked={values.mentions} onCheckedChange={(mentions) => setValues({ ...values, mentions })} />
            </Field>
          </Fieldset>
        </Card>
        <div className="flex flex-wrap gap-2">
          <Button type="reset" variant="secondary">
            Reset
          </Button>
          <MorphButton type="submit" status={status} loadingLabel="Saving" successLabel="Saved">
            Save changes
          </MorphButton>
        </div>
        <output className="text-label break-all text-muted">{data}</output>
      </form>
      <Card className="p-6">
        <h2 className="text-body font-semibold text-ink">Danger zone</h2>
        <p className="mt-1 text-label text-muted">Deleting your account removes your profile, projects and history for everyone.</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <AlertDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            trigger="Delete account"
            title="Delete your account?"
            description="Your profile, projects and history will be removed for good. You can't undo this."
            confirmLabel="Delete account"
            onConfirm={() => setDeleted(true)}
          />
          <output className="text-label text-muted">{deleted && "Account deleted"}</output>
        </div>
      </Card>
    </div>
  );
}

const meta = {
  title: "Examples/Settings form",
  id: "examples-settings-form",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Edit the fields and press Save changes: invalid fields show errors and the first one takes focus; valid data saves and prints the submitted form data. Reset restores the starting values. */
export const Default: Story = {
  render: () => <Settings />,
};
