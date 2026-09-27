import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import * as ui from "morph-components";

const noop = () => {};
const options = [
  { value: "a", label: "First" },
  { value: "b", label: "Second" },
];
const icon = h("svg", { viewBox: "0 0 24 24" });
const nav = [
  { value: "a", label: "First", icon, activeIcon: icon },
  { value: "b", label: "Second", icon, activeIcon: icon },
];
const data = [
  { label: "Mon", value: 3 },
  { label: "Tue", value: 5 },
  { label: "Wed", value: 4 },
];

const cases = {
  Accordion: { items: [{ value: "a", label: "First", content: "Text" }], value: null, onValueChange: noop },
  ActionMenu: { actions: [{ label: "Rename" }], onAction: noop },
  Alert: { status: "info" },
  Avatar: { name: "Maya Chen" },
  AvatarGroup: { people: [{ name: "Maya Chen" }, { name: "Leo Park" }] },
  Badge: { count: 3 },
  BarChart: { data },
  BottomSheet: { open: false, onOpenChange: noop, children: "Sheet" },
  Breadcrumbs: { items: [{ label: "Home" }, { label: "Library" }, { label: "Track" }], onNavigate: noop },
  Button: { children: "Save" },
  Card: { children: "Body" },
  Checkbox: { checked: false, onCheckedChange: noop },
  CollapsibleSidebar: { items: nav, value: "a", onValueChange: noop, expanded: true, onExpandedChange: noop },
  ColorSwatches: { options: [{ value: "ink", label: "Ink", color: "#111110" }], value: "ink", onValueChange: noop },
  Combobox: { options, value: null, onValueChange: noop },
  CommandPalette: { commands: [{ label: "Open" }], onSelect: noop },
  CompareSlider: { before: "Before", after: "After", value: 0.5, onValueChange: noop },
  CopyButton: { value: "text" },
  DatePicker: { value: "2026-09-18", onValueChange: noop },
  DescriptionList: { items: [{ label: "Status", value: "Shipped" }] },
  Dialog: { open: false, onOpenChange: noop, children: "Body" },
  DonutChart: { data },
  ExpandableCard: { title: "Card", subtitle: "Detail", visual: icon, children: "Body", open: false, onOpenChange: noop },
  Field: { label: "Email", children: h(ui.Input, { value: "", onValueChange: noop }) },
  Fieldset: { legend: "Contact", children: "Fields" },
  FileUpload: { status: "idle", progress: 0, onFiles: noop },
  HoldButton: { done: false, onDone: noop },
  Icon: { children: h("path", { d: "M5 12h14" }) },
  IconButton: { label: "Close", children: icon },
  Image: { src: "data:,", alt: "" },
  Input: { value: "", onValueChange: noop },
  Island: { activity: "Timer", leading: "4:59", trailing: "", children: "Panel", expanded: false, onExpandedChange: noop },
  Kbd: { children: "⌘K" },
  Lightbox: { images: [{ label: "Photo", image: icon }], value: null, onValueChange: noop },
  LineChart: { data },
  Link: { href: "/help", children: "Help" },
  LinkProvider: { navigate: noop, children: h(ui.Link, { href: "/help" }, "Help") },
  List: { items: [{ id: "1", title: "Report.pdf" }] },
  MorphButton: { status: "idle", onClick: noop },
  MusicPlayer: { title: "Song", artist: "Artist", duration: 120, expanded: false, onExpandedChange: noop },
  NumberStepper: { value: 1, onValueChange: noop },
  NumberTicker: { value: 42 },
  OTPInput: { value: "", onValueChange: noop },
  PageDots: { count: 5, value: 0, onValueChange: noop },
  Pagination: { count: 10, value: 1, onValueChange: noop },
  Popover: { open: false, onOpenChange: noop, children: "Body" },
  ProgressBar: { value: null },
  ProgressRing: { value: 0.4 },
  RadioGroup: { options, value: "a", onValueChange: noop },
  RangeSlider: { value: [20, 80], onValueChange: noop },
  Rating: { value: 3, onValueChange: noop },
  SearchField: { value: "", onValueChange: noop },
  SegmentedTabs: { options, value: "a", onValueChange: noop },
  Select: { options, value: null, onValueChange: noop },
  Separator: {},
  SidebarNav: { items: nav, value: "a", onValueChange: noop },
  Skeleton: { className: "h-4 w-40" },
  Spinner: {},
  SplitPane: { left: "Left", right: "Right", value: 0.5, onValueChange: noop },
  StatTile: { value: 1200, change: 0.12 },
  StatusBadge: { status: "success", label: "Done" },
  SwipeButton: { confirmed: false, onConfirm: noop },
  TabBar: { items: nav, value: "a", onValueChange: noop },
  Tag: { label: "Design", onRemove: noop },
  TagInput: { value: ["one"], onValueChange: noop },
  Textarea: { value: "", onValueChange: noop },
  TextField: { value: "", onValueChange: noop },
  ThemeToggle: { value: "light", onValueChange: noop },
  Timeline: { items: [{ id: "1", title: "Created" }] },
  TimeWheel: { value: { hours: 9, minutes: 30 }, onValueChange: noop },
  Toast: { status: "success" },
  ToastStack: { toasts: [{ id: "1", label: "Saved" }], onDismiss: noop },
  Toggle: { checked: true, onCheckedChange: noop },
  Tooltip: { actions: [{ label: "Bold" }], onAction: noop },
  UnderlineTabs: { options, value: "a", onValueChange: noop },
  VideoControls: {
    duration: 60,
    playing: false,
    onPlayingChange: noop,
    currentTime: 0,
    onCurrentTimeChange: noop,
    volume: 0.5,
    onVolumeChange: noop,
  },
  VolumeSlider: { value: 0.5, onValueChange: noop },
  WaveformScrubber: { peaks: [0.2, 0.8, 0.5], value: 0, onValueChange: noop, duration: 60 },
  WizardSteps: { steps: [{ label: "One" }, { label: "Two" }], value: 0 },
};

const missing = Object.keys(ui).filter((name) => !(name in cases));
if (missing.length) throw new Error(`No server-render case for: ${missing.join(", ")}`);

for (const [name, props] of Object.entries(cases)) {
  const html = renderToString(h(ui[name], props));
  if (!html.startsWith("<")) throw new Error(`${name} rendered no markup`);
}
console.log(`Server-rendered ${Object.keys(cases).length} components without a DOM.`);
