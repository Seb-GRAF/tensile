import { Icon } from "tensile";

export function IconSizesDemo() {
  return (
    <div className="flex items-end gap-6 text-muted">
      {[16, 20, 24, 32].map((size) => (
        <div key={size} className="grid justify-items-center gap-2">
          <Icon name="clock" size={size} />
          <span className="text-caption">{size}px</span>
        </div>
      ))}
    </div>
  );
}
