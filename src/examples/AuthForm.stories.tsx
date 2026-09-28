import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button, Card, Field, Input, Link, MorphButton, OTPInput, PasswordInput, type MorphButtonProps } from "../index";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function SignIn({ onSignIn }: { onSignIn: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<MorphButtonProps["status"]>("idle");

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    flushSync(() =>
      setErrors({
        email:
          email === ""
            ? "Enter your email address"
            : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
              ? undefined
              : "Enter an email address like name@example.com",
        password: password === "" ? "Enter your password" : undefined,
      }),
    );
    const invalid = form.querySelector<HTMLElement>("[aria-invalid=true]");
    if (invalid) {
      invalid.focus();
      return;
    }
    setStatus("loading");
    await wait(1200);
    if (password === "wrong-password") {
      flushSync(() => {
        setStatus("idle");
        setErrors({ password: "That password isn't right. Try again or reset it." });
      });
      form.querySelector<HTMLElement>("[aria-invalid=true]")!.focus();
      return;
    }
    setStatus("success");
    await wait(600);
    onSignIn(email);
  }

  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight text-ink">Sign in</h1>
      <p className="mt-1 text-body text-muted">Welcome back. Enter your email and password.</p>
      <form noValidate onSubmit={signIn} className="mt-6 grid gap-4">
        <Field label="Email" error={errors.email}>
          <Input type="email" name="email" autoComplete="username" value={email} onValueChange={setEmail} />
        </Field>
        <Field label="Password" error={errors.password}>
          <PasswordInput name="password" value={password} onValueChange={setPassword} />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="#forgot-password" className="text-label">
            Forgot password?
          </Link>
          <MorphButton type="submit" status={status} loadingLabel="Signing in" successLabel="Signed in">
            Sign in
          </MorphButton>
        </div>
      </form>
    </>
  );
}

function Verify({ email, onVerify, onBack }: { email: string; onVerify: () => void; onBack: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<MorphButtonProps["status"]>("idle");

  async function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    flushSync(() => setError(code.length < 6 ? "Enter all 6 digits" : undefined));
    const invalid = form.querySelector<HTMLElement>("[aria-invalid=true]");
    if (invalid) {
      invalid.focus();
      return;
    }
    setStatus("loading");
    await wait(1200);
    if (code !== "123456") {
      flushSync(() => {
        setStatus("idle");
        setError("That code doesn't match. Check the latest email and try again.");
      });
      form.querySelector<HTMLElement>("[aria-invalid=true]")!.focus();
      return;
    }
    setStatus("success");
    await wait(600);
    onVerify();
  }

  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight text-ink">Check your email</h1>
      <p className="mt-1 text-body text-muted">Enter the 6-digit code we sent to {email}.</p>
      <form noValidate onSubmit={verify} className="mt-6 grid gap-4">
        <Field label="Verification code" error={error}>
          <OTPInput name="code" value={code} onValueChange={setCode} />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="-ml-4">
            Use a different account
          </Button>
          <MorphButton type="submit" status={status} loadingLabel="Verifying" successLabel="Verified">
            Verify
          </MorphButton>
        </div>
      </form>
    </>
  );
}

function Authentication() {
  const [step, setStep] = useState<"sign-in" | "verify" | "done">("sign-in");
  const [email, setEmail] = useState("");
  const card = useRef<HTMLDivElement>(null);

  return (
    <div className="px-4 py-24">
      <Card ref={card} className="mx-auto max-w-sm p-6">
        {step === "sign-in" && (
          <SignIn
            onSignIn={(email) => {
              flushSync(() => {
                setEmail(email);
                setStep("verify");
              });
              card.current!.querySelector<HTMLElement>("[autocomplete=one-time-code]")!.focus();
            }}
          />
        )}
        {step === "verify" && (
          <Verify
            email={email}
            onVerify={() => {
              flushSync(() => setStep("done"));
              card.current!.querySelector("h1")!.focus();
            }}
            onBack={() => {
              flushSync(() => setStep("sign-in"));
              card.current!.querySelector("input")!.focus();
            }}
          />
        )}
        {step === "done" && (
          <>
            <h1 tabIndex={-1} className="text-xl font-semibold tracking-tight text-ink outline-none">
              You're signed in
            </h1>
            <p className="mt-1 text-body text-muted">Welcome back, {email}.</p>
          </>
        )}
      </Card>
    </div>
  );
}

const meta = {
  title: "Examples/Authentication",
  id: "examples-authentication",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sign in with any email and password ("wrong-password" fails), then enter the code 123456; "Use a different account" goes back. */
export const Default: Story = {
  render: () => <Authentication />,
};
