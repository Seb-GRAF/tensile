import { Icon } from "tensile";

export function IconSizesDemo() {
  return (
    <div className="flex items-end gap-6 text-muted">
      {[16, 20, 24, 32].map((size) => (
        <div key={size} className="grid justify-items-center gap-2">
          <Icon size={size}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </Icon>
          <span className="text-caption">{size}px</span>
        </div>
      ))}
    </div>
  );
}
