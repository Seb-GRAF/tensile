import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  ActionMenu,
  AppShell,
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  Carousel,
  CollapsibleSidebar,
  DescriptionList,
  Drawer,
  Field,
  Icon,
  IconButton,
  Input,
  Lightbox,
  LinkProvider,
  List,
  MorphButton,
  PageHeader,
  Select,
  Separator,
  StatusBadge,
  TabBar,
  Tabs,
  Textarea,
  Timeline,
  ToastStack,
  Toggle,
  type MorphButtonProps,
  type StatusBadgeProps,
} from "../index";

function Scene({ colors, sun }: { colors: string[]; sun: number[] }) {
  const [sky, light, far, near, front] = colors;
  const [cx, cy] = sun;
  return (
    <svg aria-hidden viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="480" height="320" fill={sky} />
      <circle cx={cx} cy={cy} r="30" fill={light} />
      <path d="M0 200 60 150l58 34 78-72 66 58 68-36 70 44 80-40v182H0Z" fill={far} />
      <path d="M0 246c70-34 150-30 224-8s170 10 256-18v100H0Z" fill={near} />
      <path d="M0 290c96-14 200-16 300-6s130 2 180-10v46H0Z" fill={front} />
    </svg>
  );
}

const photos = [
  { label: "View from the terrace at dawn", colors: ["#e8ddd7", "#f6d2bb", "#c3b5b6", "#a89b9f", "#857a80"], sun: [120, 168] },
  { label: "The valley in the morning, after the fog lifts over Le Châble", colors: ["#dae6ea", "#fbeaa8", "#b0c3bd", "#93aba5", "#647d77"], sun: [170, 112] },
  { label: "The meadow below the garden at noon", colors: ["#cde4ee", "#fff4cc", "#8fa9a3", "#b8f23e", "#2e2e2c"], sun: [240, 64] },
  { label: "Afternoon light on the western peaks, from the living room window", colors: ["#ede3cd", "#f7dc92", "#cbbd95", "#ae9f74", "#72684b"], sun: [310, 100] },
  { label: "The ridge at dusk", colors: ["#d9c7cb", "#f2bb9a", "#a495a2", "#827483", "#4f4554"], sun: [360, 150] },
];

const sections = [
  { href: "/listings", label: "Listings", icon: "home" },
  { href: "/viewings", label: "Viewings", icon: "calendar" },
  { href: "/clients", label: "Clients", icon: "user" },
  { href: "/reports", label: "Reports", icon: "chart" },
] as const;

const trail = [
  { label: "Listings", href: "/listings" },
  { label: "Valais", href: "/listings/valais" },
  { label: "Verbier", href: "/listings/valais/verbier" },
];

const detailPath = "/listings/valais/verbier/chalet-bellevue";

const moreActions = [
  { label: "Duplicate listing" },
  { label: "Download the brochure as PDF" },
  { label: "Print a window card" },
  { label: "Archive listing" },
];

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "listed", label: "Listed" },
  { value: "reserved", label: "Reserved until the purchase agreement is signed" },
  { value: "sold", label: "Sold" },
];

const statusTones: Record<string, StatusBadgeProps["status"]> = { draft: "neutral", listed: "success", reserved: "warning", sold: "info" };

const figures = [
  { label: "Rooms", value: "4.5" },
  { label: "Living area", value: "118 m²" },
  { label: "Terrace", value: "24 m²" },
  { label: "Built", value: "1934" },
];

const facts = [
  { label: "Address", value: "Chemin des Vernes 12, 1936 Verbier, Switzerland" },
  { label: "Rooms", value: "Three bedrooms, a living room with a wood stove and a study on the mezzanine" },
  { label: "Heating", value: "Air-to-water heat pump, 2021, and the original wood stove" },
  { label: "Parking", value: "One garage space and one outdoor space" },
  { label: "Renovated", value: "2021: roof, windows, kitchen and both bathrooms" },
  { label: "Available", value: "From December 1, 2026" },
];

const events = [
  {
    id: "viewing",
    title: "The Keller family booked a viewing",
    description: "Saturday, October 3, at 10:30. They'd like to see the ski room and the cellar too.",
    time: "2 h ago",
  },
  {
    id: "price",
    title: "Maya Chen lowered the asking price to CHF 1,250,000",
    description: "From CHF 1,340,000, after three viewings without an offer.",
    time: "Yesterday",
  },
  { id: "photos", title: "Leo Park added 5 photos", description: "Taken on a clear day in September, from dawn to dusk.", time: "Sep 21" },
  { id: "published", title: "Maya Chen published the listing on the website", time: "Sep 14" },
  { id: "created", title: "Maya Chen created the listing", description: "From the owner's valuation request", time: "Sep 12" },
];

const files = [
  { id: "floor-plan", title: "Floor plan, ground and upper floor.pdf", description: "PDF · 1.8 MB" },
  { id: "energy", title: "Energy certificate 2025, class C, valid until 2035, signed by the cantonal inspector.pdf", description: "PDF · 640 KB" },
  { id: "registry", title: "Land registry extract.pdf", description: "PDF · 320 KB" },
  { id: "invoices", title: "Renovation invoices 2021.zip", description: "ZIP archive · 24 MB" },
];

const brand = (
  <span className="flex h-10 items-center gap-2.5 overflow-hidden px-1.5 text-body font-semibold whitespace-nowrap text-ink">
    <Icon name="mountain" size={20} className="shrink-0" />
    Alpina Estates
  </span>
);

function DetailPage() {
  const [path, setPath] = useState(detailPath);
  const [expanded, setExpanded] = useState(true);
  const [listing, setListing] = useState({
    name: "Chalet Bellevue",
    description:
      "A restored 1934 timber chalet above Verbier, with a wood stove, three bedrooms and a south-facing terrace that looks across the valley to the Grand Combin.",
    status: "listed",
    published: true,
  });
  const [draft, setDraft] = useState(listing);
  const [editing, setEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [saving, setSaving] = useState<MorphButtonProps["status"]>("idle");
  const [tab, setTab] = useState("overview");
  const [slide, setSlide] = useState(0);
  const [photo, setPhoto] = useState<number | null>(null);
  const [toasts, setToasts] = useState<{ id: string; label: string }[]>([]);
  const toastCount = useRef(0);
  const nameInput = useRef<HTMLInputElement>(null);
  const nameError = draft.name === "" ? "Enter a name for the listing" : undefined;

  function notify(label: string) {
    toastCount.current += 1;
    const id = String(toastCount.current);
    setToasts((current) => [...current, { id, label }]);
    setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4000);
  }

  function edit() {
    setDraft(listing);
    setValidated(false);
    setSaving("idle");
    setEditing(true);
  }

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (nameError) {
      flushSync(() => setValidated(true));
      nameInput.current!.focus();
      return;
    }
    setSaving("loading");
    setTimeout(() => {
      setListing(draft);
      setSaving("success");
    }, 1200);
    setTimeout(() => setEditing(false), 2000);
  }

  const listingPage = (
    <div className="grid gap-6">
      <PageHeader
        breadcrumbs={<Breadcrumbs items={[...trail, { label: listing.name }]} onNavigate={() => {}} />}
        title={
          <span className="flex flex-wrap items-center gap-3">
            {listing.name}
            <StatusBadge status={statusTones[listing.status]} label={statuses.find((status) => status.value === listing.status)!.label} />
          </span>
        }
        description="Chemin des Vernes 12, 1936 Verbier"
        actions={
          <div role="group" aria-label="Listing actions" className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => notify("Link to the listing copied")}>
              Share
            </Button>
            <Button aria-haspopup="dialog" aria-expanded={editing} onClick={edit}>
              Edit
            </Button>
            <ActionMenu
              label="More actions"
              trigger={
                <Icon name="more" />
              }
              actions={moreActions}
              onAction={(chosen) => notify(chosen.label)}
            />
          </div>
        }
      />
      <Carousel
        label="Photos"
        value={slide}
        onValueChange={setSlide}
        slideWidth="min(760px, 86%)"
        align="start"
        overflow="visible"
        controls="end"
        slides={photos.map((item) => ({
          label: item.label,
          content: (
            <div className="relative aspect-16/10">
              <Scene colors={item.colors} sun={item.sun} />
              <p className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-control bg-paper px-3 py-1 text-label font-medium text-ink">
                {item.label}
              </p>
            </div>
          ),
        }))}
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card className="overflow-clip p-6">
          <Tabs
            value={tab}
            onValueChange={setTab}
            items={[
              {
                value: "overview",
                label: "Overview",
                content: (
                  <div className="grid gap-6">
                    <p className="text-body text-ink">{listing.description}</p>
                    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {figures.map((figure) => (
                        <div key={figure.label}>
                          <dt className="text-label text-muted">{figure.label}</dt>
                          <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink">{figure.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Separator />
                    <DescriptionList
                      items={[
                        { label: "On the website", value: listing.published ? "Shown" : "Hidden" },
                        ...facts,
                      ]}
                    />
                  </div>
                ),
              },
              {
                value: "photos",
                label: "All photos",
                content: (
                  <Lightbox
                    value={photo}
                    onValueChange={setPhoto}
                    images={photos.map((item) => ({ label: item.label, image: <Scene colors={item.colors} sun={item.sun} /> }))}
                  />
                ),
              },
              {
                value: "activity",
                label: "Activity",
                content: <Timeline items={events} />,
              },
              {
                value: "files",
                label: "Files",
                content: (
                  <List
                    items={files.map((file) => ({
                      ...file,
                      leading: <Icon name="file" size={20} />,
                      trailing: (
                        <IconButton label={`Download ${file.title}`} variant="ghost" size="sm" onClick={() => notify(`Downloading ${file.title}`)} icon="download" />
                      ),
                    }))}
                  />
                ),
              },
            ]}
          />
        </Card>
        <Card className="grid gap-5 p-6 lg:sticky lg:top-6">
          <div>
            <p className="text-label text-muted">Asking price</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-ink tabular-nums">CHF 1,250,000</p>
            <p className="mt-1 text-label text-muted">CHF 10,593 per m² of living area</p>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Avatar name="Maya Chen" size="lg" className="shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-body font-medium text-ink">Maya Chen</p>
              <p className="truncate text-label text-muted">Listing agent, Verbier office</p>
            </div>
          </div>
          <div className="grid gap-2">
            <Button onClick={() => notify("Viewing request sent to the owner")}>Schedule a viewing</Button>
            <Button variant="secondary" onClick={() => notify("Calling Maya Chen")}>
              Call Maya
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <LinkProvider navigate={setPath}>
      <AppShell
        header={
          <header className="flex h-16 items-center justify-between px-6 lg:hidden">
            {brand}
            <Avatar name="Maya Chen" />
          </header>
        }
        sidebar={
          <CollapsibleSidebar
            items={sections.map((section) => ({
              value: section.href,
              href: section.href,
              label: section.label,
              icon: <Icon name={section.icon} />,
            }))}
            value={sections.find((section) => path.startsWith(section.href))!.href}
            onValueChange={setPath}
            expanded={expanded}
            onExpandedChange={setExpanded}
            leading={brand}
            trailing={
              <span className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap">
                <Avatar name="Maya Chen" className="shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate text-label font-medium text-ink">Maya Chen</span>
                  <span className="block truncate text-caption text-muted">Verbier office</span>
                </span>
              </span>
            }
            className="h-full"
          />
        }
        mobileNav={
          <TabBar
            items={sections.map((section) => ({
              value: section.href,
              href: section.href,
              label: section.label,
              icon: <Icon name={section.icon} size={20} />,
              activeIcon: <Icon name={section.icon} size={20} className="*:fill-current" />,
            }))}
            value={sections.find((section) => path.startsWith(section.href))!.href}
            onValueChange={setPath}
          />
        }
      >
        {path === detailPath ? listingPage : <PageHeader title={[...sections, ...trail].find((page) => page.href === path)!.label} />}
      </AppShell>
      <ToastStack
        toasts={toasts}
        onDismiss={(id) => setToasts(toasts.filter((toast) => toast.id !== id))}
        className="fixed right-4 bottom-24 z-(--tn-layer-sticky) w-80 max-w-[calc(100vw-2rem)] lg:right-6 lg:bottom-6"
      />
      <Drawer open={editing} onOpenChange={setEditing} title="Edit listing">
        <form noValidate onSubmit={save} className="grid gap-5">
          <Field label="Name" required error={validated ? nameError : undefined}>
            <Input ref={nameInput} value={draft.name} onValueChange={(name) => setDraft({ ...draft, name })} />
          </Field>
          <Field label="Description">
            <Textarea value={draft.description} onValueChange={(description) => setDraft({ ...draft, description })} />
          </Field>
          <Field label="Status">
            <Select options={statuses} value={draft.status} onValueChange={(status) => setDraft({ ...draft, status })} />
          </Field>
          <Field label="Show on the website" description="Visitors can find the chalet and ask for a viewing.">
            <Toggle checked={draft.published} onCheckedChange={(published) => setDraft({ ...draft, published })} />
          </Field>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <MorphButton type="submit" status={saving} loadingLabel="Saving" successLabel="Saved">
              Save
            </MorphButton>
          </div>
        </form>
      </Drawer>
    </LinkProvider>
  );
}

const meta = {
  title: "Examples/Detail page",
  id: "examples-detail-page",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Drag or flick the photos, switch tabs (arrows switch too), open a photo in the lightbox; Edit opens a drawer whose Save updates the page, and the actions confirm with a toast. The sidebar and breadcrumb links switch pages without loading. */
export const Default: Story = {
  render: () => <DetailPage />,
};
