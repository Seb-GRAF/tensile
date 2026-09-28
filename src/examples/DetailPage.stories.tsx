import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  ActionMenu,
  Breadcrumbs,
  Button,
  Card,
  Carousel,
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
  Tabs,
  Textarea,
  Timeline,
  Toggle,
  type MorphButtonProps,
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

const trail = [
  {
    label: "Home",
    href: "/",
    icon: (
      <Icon size={14}>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </Icon>
    ),
  },
  { label: "Listings", href: "/listings" },
  { label: "Valais", href: "/listings/valais" },
  { label: "Verbier", href: "/listings/valais/verbier" },
];

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

const facts = [
  { label: "Address", value: "Chemin des Vernes 12, 1936 Verbier, Switzerland" },
  { label: "Asking price", value: "CHF 1,250,000" },
  { label: "Rooms", value: "4.5: three bedrooms, a living room with a wood stove and a study on the mezzanine" },
  { label: "Living area", value: "118 m² on two floors, plus a 24 m² terrace" },
  { label: "Built", value: "1934, renovated in 2021" },
  { label: "Agent", value: "Maya Chen" },
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

function DetailPage() {
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
  const [action, setAction] = useState("None");
  const nameInput = useRef<HTMLInputElement>(null);
  const nameError = draft.name === "" ? "Enter a name for the listing" : undefined;

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

  return (
    <LinkProvider navigate={(href) => setAction(`Navigate to ${href}`)}>
      <main className="mx-auto grid max-w-page grid-cols-1 gap-6 px-4 py-8 sm:px-8">
        <PageHeader
          breadcrumbs={<Breadcrumbs items={[...trail, { label: listing.name }]} onNavigate={() => {}} />}
          title={listing.name}
          description={listing.description}
          actions={
            <div role="group" aria-label="Listing actions" className="flex flex-wrap gap-2">
              <Button aria-haspopup="dialog" aria-expanded={editing} onClick={edit}>
                Edit
              </Button>
              <Button variant="secondary" onClick={() => setAction("Share")}>
                Share
              </Button>
              <ActionMenu
                label="More actions"
                trigger={
                  <Icon>
                    <circle cx="5" cy="12" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                  </Icon>
                }
                actions={moreActions}
                onAction={(chosen) => setAction(chosen.label)}
              />
            </div>
          }
        />
        <p className="text-label text-muted">
          Last action: <output className="text-ink">{action}</output>
        </p>
        <Tabs
          value={tab}
          onValueChange={setTab}
          items={[
            {
              value: "overview",
              label: "Overview",
              content: (
                <Card className="p-5">
                  <DescriptionList
                    items={[
                      { label: "Status", value: statuses.find((status) => status.value === listing.status)!.label },
                      { label: "On the website", value: listing.published ? "Shown" : "Hidden" },
                      ...facts,
                    ]}
                  />
                </Card>
              ),
            },
            {
              value: "media",
              label: "Media",
              content: (
                <div className="grid items-start gap-6 md:grid-cols-[3fr_2fr]">
                  <Carousel
                    label="Photos"
                    value={slide}
                    onValueChange={setSlide}
                    slides={photos.map((item) => ({
                      label: item.label,
                      content: (
                        <div className="relative aspect-3/2">
                          <Scene colors={item.colors} sun={item.sun} />
                          <p className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-control bg-paper px-3 py-1 text-label font-medium text-ink">
                            {item.label}
                          </p>
                        </div>
                      ),
                    }))}
                  />
                  <Lightbox
                    value={photo}
                    onValueChange={setPhoto}
                    images={photos.map((item) => ({ label: item.label, image: <Scene colors={item.colors} sun={item.sun} /> }))}
                  />
                </div>
              ),
            },
            {
              value: "activity",
              label: "Activity",
              content: (
                <Card className="p-5">
                  <Timeline items={events} />
                </Card>
              ),
            },
            {
              value: "files",
              label: "Files",
              content: (
                <Card className="p-5">
                  <List
                    items={files.map((file) => ({
                      ...file,
                      leading: (
                        <Icon size={20}>
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        </Icon>
                      ),
                      trailing: (
                        <IconButton label={`Download ${file.title}`} variant="ghost" size="sm" onClick={() => setAction(`Download ${file.title}`)}>
                          <Icon>
                            <path d="M12 15V3" />
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <path d="m7 10 5 5 5-5" />
                          </Icon>
                        </IconButton>
                      ),
                    }))}
                  />
                </Card>
              ),
            },
          ]}
        />
      </main>
      <Drawer open={editing} onOpenChange={setEditing} title="Edit listing">
        <form noValidate onSubmit={save} className="grid gap-5 px-5 pb-5">
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

/** Tab through the breadcrumbs, the actions and the tabs (arrows switch tabs); Edit opens a drawer whose Save updates the page, and links and actions print below the header. */
export const Default: Story = {
  render: () => <DetailPage />,
};
