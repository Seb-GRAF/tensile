import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { action } from "storybook/actions";
import {
  Accordion,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Field,
  Footer,
  Header,
  Icon,
  Input,
  Link,
  LinkProvider,
  NumberTicker,
  ProgressBar,
  StatTile,
  StatusBadge,
  ToggleGroup,
} from "../index";

const sections = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "FAQ", href: "#faq" },
];

const team = [
  { name: "Maya Chen" },
  { name: "Leo Park" },
  { name: "Amara Okafor" },
  { name: "Jonas Weber" },
  { name: "Sofia Rossi" },
  { name: "Ravi Iyer" },
];

const features = [
  {
    title: "Boards, lists and timelines",
    line: "Switch any project between views without losing a comment or a due date.",
    icon: "columns",
  },
  {
    title: "Workload at a glance",
    line: "See who has room this week before you assign the next task.",
    icon: "users",
  },
  {
    title: "Automations",
    line: "Move tasks, ping owners and update statuses when work changes hands.",
    icon: "zap",
  },
  {
    title: "Docs beside the work",
    line: "Keep specs, notes and decisions next to the tasks they belong to.",
    icon: "fileText",
  },
  {
    title: "Weekly reports",
    line: "A summary of what actually shipped lands in every inbox on Friday.",
    icon: "chart",
  },
  {
    title: "Integrations",
    line: "Connect GitHub, Slack, Figma and 40 more tools in a few clicks.",
    icon: "plug",
  },
] as const;

const periods = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const plans = [
  {
    name: "Starter",
    description: "For small teams getting their first projects in order.",
    monthly: 15,
    yearly: 12,
    features: ["Up to 10 editors", "Unlimited projects and viewers", "Boards, lists and timelines", "Email support"],
  },
  {
    name: "Team",
    description: "For teams running several projects at once.",
    monthly: 25,
    yearly: 20,
    features: ["Up to 100 editors", "Workload planning", "Automations and weekly reports", "GitHub, Slack and Figma integrations", "Priority support"],
    popular: true,
  },
  {
    name: "Business",
    description: "For companies with security and compliance needs.",
    monthly: 45,
    yearly: 36,
    features: ["Unlimited editors", "Single sign-on and SCIM", "Audit log and data export", "Custom roles and permissions", "A named account manager"],
  },
];

const quotes = [
  {
    quote: "We used to spend Monday mornings in a status meeting. Now the weekly report is in Slack before anyone asks.",
    name: "Maya Chen",
    role: "Head of Operations, Northwind",
  },
  {
    quote: "The workload view is the first thing I open. I can see who's overbooked before I hand out anything new.",
    name: "Leo Park",
    role: "Engineering Manager, Fieldnote",
  },
  {
    quote: "Moving 40 projects over from spreadsheets took an afternoon, and nobody on the team needed training.",
    name: "Amara Okafor",
    role: "Program Lead, Lumen Health",
  },
];

const questions = [
  {
    value: "trial",
    label: "How does the free trial work?",
    content: "You get every Team feature for 14 days, without a credit card. When it ends, pick a plan; nothing you created is deleted.",
  },
  {
    value: "editors",
    label: "Who counts as an editor?",
    content: "Anyone who creates or changes tasks, projects or docs. People who only view, comment or read reports are free on every plan.",
  },
  {
    value: "plans",
    label: "Can I change plans later?",
    content: "Yes. Upgrades apply right away and we charge the difference for the rest of the period; downgrades start on your next billing date.",
  },
  {
    value: "import",
    label: "Can I import from other tools?",
    content: "Import from Asana, Trello, Jira or a CSV file. Harbor keeps owners, due dates, comments and attachments.",
  },
  {
    value: "data",
    label: "Where is my data stored?",
    content: "In the EU or the US, as you choose, encrypted at rest and in transit. Business adds single sign-on and an audit log.",
  },
  {
    value: "cancel",
    label: "What happens if I cancel?",
    content: "Your workspace stays readable for 90 days, and you can export everything as CSV or JSON at any time.",
  },
];

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Customers", href: "#customers" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Guides for moving from spreadsheets", href: "/guides" },
      { label: "API reference", href: "/api" },
      { label: "System status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Cookie preferences", href: "/cookies" },
    ],
  },
];

const brand = (
  <span className="flex items-center gap-2 text-body font-semibold text-ink">
    <Icon name="waves" size={20} />
    Harbor
  </span>
);

function HeroSection() {
  return (
    <section className="mx-auto grid max-w-page items-center gap-12 px-6 py-16 text-ink md:py-24 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl">Know where every project stands.</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Harbor keeps tasks, owners and deadlines in one place and writes the weekly update for you, so your team stops chasing status and
          gets back to the work.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-body font-medium">
          <Button>Start free trial</Button>
          <Link href="#pricing">See pricing</Link>
        </div>
      </div>
      <div role="img" aria-label="A Harbor project: Website relaunch, on track and 68% done" className="grid gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-body font-semibold">Website relaunch</p>
            <StatusBadge status="success" label="On track" />
          </div>
          <p className="mt-1 text-label text-muted">12 open tasks, due November 14</p>
          <ProgressBar value={0.68} className="mt-5" />
          <AvatarGroup people={team} className="mt-5" />
        </Card>
        <StatTile value={128} change={0.12} label="Tasks shipped this week" />
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-page scroll-mt-20 px-6 py-12 text-ink md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">From kickoff to shipped, in one place</h2>
      <p className="mt-3 max-w-xl text-base text-muted">
        Plan in the view that suits the work, see who has room, and let Harbor send the updates.
      </p>
      <ul role="list" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <li key={feature.title}>
            <Card className="h-full p-6">
              <Icon name={feature.icon} size={24} />
              <h3 className="mt-6 text-body font-semibold">{feature.title}</h3>
              <p className="mt-1 text-label text-muted">{feature.line}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PricingSection() {
  const [period, setPeriod] = useState("monthly");

  return (
    <section id="pricing" className="mx-auto max-w-page scroll-mt-20 px-6 py-12 text-ink md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">Pay for editors. Viewers are free.</h2>
      <p className="mt-3 max-w-xl text-base text-muted">Every plan includes unlimited projects and a 14-day free trial.</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <ToggleGroup type="single" options={periods} value={period} onValueChange={setPeriod} label="Billing period" />
        <p className="text-label text-muted">Yearly billing saves 20%.</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          return (
            <Card key={plan.name} tone={plan.popular ? "ink" : "paper"} className="flex flex-col p-6">
              <div className="flex h-6 items-center justify-between gap-3">
                <h3 className="text-body font-semibold">{plan.name}</h3>
                {plan.popular && (
                  <p className="flex h-6 items-center rounded-control bg-accent px-2.5 text-label font-medium text-on-accent">Most popular</p>
                )}
              </div>
              <p className="mt-1 text-label text-muted">{plan.description}</p>
              <p className="mt-6 text-5xl font-semibold tracking-tight">
                <NumberTicker value={period === "yearly" ? plan.yearly : plan.monthly} format={(value) => `$${value}`} />
              </p>
              <p className="mt-2 text-label text-muted">per editor per month</p>
              <ul role="list" className="mt-6 mb-8 grid gap-2.5 text-label">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Icon name="check" size={16} className={`mt-0.5 ${plan.popular ? "text-accent" : ""}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="mt-auto">
                Choose {plan.name}
              </Button>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="customers" className="mx-auto max-w-page scroll-mt-20 px-6 py-12 text-ink md:py-16">
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">Teams that stopped chasing updates</h2>
      <ul role="list" className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
        {quotes.map((item) => (
          <li key={item.name}>
            <figure className="flex h-full flex-col justify-between gap-6">
              <blockquote className="text-lg">“{item.quote}”</blockquote>
              <figcaption>
                <Avatar name={item.name} size="lg" />
                <span className="mt-3 block text-body font-semibold">{item.name}</span>
                <span className="block text-label text-muted">{item.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="mx-auto grid max-w-page scroll-mt-20 gap-10 px-6 py-12 text-ink md:grid-cols-[2fr_3fr] md:py-16">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">Questions, answered</h2>
        <p className="mt-3 text-base text-muted">
          Something else on your mind? Write to <Link href="mailto:hello@harbor.example">hello@harbor.example</Link>.
        </p>
      </div>
      <Accordion items={questions} value={open} onValueChange={setOpen} />
    </section>
  );
}

function CtaSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [sentTo, setSentTo] = useState("");
  const input = useRef<HTMLInputElement>(null);

  function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem =
      email === "" ? "Enter your work email" : input.current!.validity.valid ? undefined : "Enter an email address like name@company.com";
    flushSync(() => {
      setError(problem);
      setSentTo(problem ? "" : email);
    });
    if (problem) input.current!.focus();
  }

  return (
    <section id="signup" className="mx-auto max-w-page scroll-mt-20 px-6 py-12 text-ink md:py-16">
      <Card className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:p-12">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">Start your first project today</h2>
          <p className="mt-3 text-base text-muted">Free for 14 days, no credit card needed. Bring the team in when you're ready.</p>
        </div>
        <form noValidate onSubmit={signUp}>
          <Field label="Work email" error={error}>
            <Input
              ref={input}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={email}
              onValueChange={setEmail}
              trailing={
                <Button type="submit" size="sm" className="-mr-2.5">
                  Get started
                </Button>
              }
            />
          </Field>
          <p role="status" className="mt-3 text-label">
            {sentTo && `Check your inbox: we sent a sign-up link to ${sentTo}.`}
          </p>
        </form>
      </Card>
    </section>
  );
}

const meta = {
  title: "Examples/Marketing",
  id: "examples-marketing",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tab through the page: Enter on a header link scrolls to its section, Space picks the billing period, the arrows move between questions, Enter or Space opens one, and the signup form checks the email. Below 768 px the menu button opens the links in a drawer. */
export const Page: Story = {
  render: () => (
    <LinkProvider navigate={action("navigate")}>
      <Header brand={brand} links={sections} value="/" actions={<Button>Start free trial</Button>} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer groups={footerGroups} note="© 2026 Harbor Labs, Inc. All rights reserved." className="m-3" />
    </LinkProvider>
  ),
};

/** The headline, two actions and a product preview made of library parts; on the full page, See pricing scrolls to the plans. */
export const Hero: Story = {
  render: () => <HeroSection />,
};

/** Six feature cards: one column on phones, two from 640 px, three from 1024 px. */
export const Features: Story = {
  render: () => <FeaturesSection />,
};

/** Switch between Monthly and Yearly by click or with the arrow keys: each price rolls to the new amount. */
export const Pricing: Story = {
  render: () => <PricingSection />,
};

/** Three quotes side by side from 768 px, stacked below. */
export const Testimonials: Story = {
  render: () => <TestimonialsSection />,
};

/** Click a question, or Tab to one, move with ArrowUp, ArrowDown, Home and End, and open it with Enter or Space. */
export const FAQ: Story = {
  render: () => <FaqSection />,
};

/** Submit an empty or malformed email to see the error; a valid one shows the confirmation. */
export const CTA: Story = {
  render: () => <CtaSection />,
};
