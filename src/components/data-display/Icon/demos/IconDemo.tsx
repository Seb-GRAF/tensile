import { Icon } from "tensile";

export function IconDemo() {
  return (
    <p className="flex items-center gap-2 text-body">
      <Icon size={20}>
        <path d="M20 6 9 17l-5-5" />
      </Icon>
      All changes saved
    </p>
  );
}
