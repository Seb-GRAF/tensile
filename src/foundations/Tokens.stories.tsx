import type { Meta, StoryObj } from "@storybook/react-vite";

const colors = ["canvas", "paper", "ink", "ink-3", "muted", "line", "hover", "accent", "on-accent", "focus"];

const pairs = [
  { name: "ink on paper", className: "bg-paper text-ink" },
  { name: "muted on paper", className: "bg-paper text-muted" },
  { name: "paper on ink", className: "bg-ink text-paper" },
  { name: "paper/55 on ink", className: "bg-ink text-paper/55" },
  { name: "on-accent on accent", className: "bg-accent text-on-accent" },
  { name: "accent on ink", className: "bg-ink text-accent" },
];

const type = [
  { name: "caption", className: "text-caption", use: "small print, axis labels" },
  { name: "label", className: "text-label", use: "compact controls, secondary lines, errors" },
  { name: "sm", className: "text-sm", use: "menu and list rows, disclosure triggers" },
  { name: "body", className: "text-body", use: "fields, buttons, dialog titles" },
  { name: "base", className: "text-base font-semibold", use: "titles" },
];

const radii = [
  { name: "control", className: "rounded-control h-11" },
  { name: "overlay", className: "rounded-overlay h-24" },
  { name: "card", className: "rounded-card h-24" },
  { name: "dialog", className: "rounded-dialog h-24" },
];

function Tokens() {
  const style = getComputedStyle(document.documentElement);
  const value = (name: string) => style.getPropertyValue(name).trim();

  return (
    <div className="grid max-w-3xl gap-10 text-ink">
      <section aria-labelledby="colors" className="grid gap-3">
        <h2 id="colors" className="text-body font-semibold">Colors</h2>
        <ul className="grid grid-cols-5 gap-3">
          {colors.map((name) => (
            <li key={name} className="grid gap-1.5">
              <span style={{ background: `var(--color-${name})` }} className="h-12 rounded-xl shadow-float" />
              <span className="text-label font-medium">{name}</span>
              <span data-token={`--color-${name}`} className="text-caption text-muted">
                {value(`--color-${name}`)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pairs" className="grid gap-3">
        <h2 id="pairs" className="text-body font-semibold">Text on surfaces</h2>
        <ul className="grid grid-cols-3 gap-3">
          {pairs.map(({ name, className }) => (
            <li key={name} className={`rounded-card p-4 shadow-float ${className}`}>
              <span className="block text-2xl font-semibold">Aa</span>
              <span className="text-label">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type" className="grid gap-3">
        <h2 id="type" className="text-body font-semibold">Type</h2>
        <ul className="grid gap-2">
          {type.map(({ name, className, use }) => (
            <li key={name} className="grid grid-cols-[88px_1fr] items-baseline gap-4">
              <span className="text-caption text-muted">{name}</span>
              <span className={className}>The quick brown fox, {use}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="radii" className="grid gap-3">
        <h2 id="radii" className="text-body font-semibold">Radii and shadow</h2>
        <ul className="grid grid-cols-4 items-start gap-4">
          {radii.map(({ name, className }) => (
            <li key={name} className="grid gap-1.5">
              <span className={`bg-paper shadow-float ${className}`} />
              <span className="text-label font-medium">{name}</span>
              <span data-token={`--radius-${name}`} className="text-caption text-muted">
                {value(`--radius-${name}`)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="focus" className="grid gap-3">
        <h2 id="focus" className="text-body font-semibold">Focus, layers, motion</h2>
        <div className="flex items-center gap-6">
          <span className="grid h-11 place-items-center rounded-control bg-ink px-5 text-body font-medium text-paper outline-2 outline-offset-2 outline-focus">
            Focused on canvas
          </span>
          <span className="rounded-card bg-ink p-3 [--color-focus:var(--color-paper)]">
            <span className="grid h-11 place-items-center rounded-control bg-ink-3 px-5 text-body font-medium text-paper outline-2 outline-offset-2 outline-focus">
              Focused on ink
            </span>
          </span>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-label">
          {["--layer-raised", "--layer-sticky", "--layer-overlay", "--container-page", "--motion-duration-scale"].map((name) => (
            <div key={name} className="contents">
              <dt className="text-muted">{name}</dt>
              <dd data-token={name}>{value(name)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundations/Tokens",
  id: "foundations-tokens",
  component: Tokens,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Tokens>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every token with its current value; switch Theme in the toolbar to see the alternate values. */
export const Default: Story = {};
