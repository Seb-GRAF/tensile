import { Avatar } from "tensile";

export function AvatarSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="Maya Chen" size="sm" />
      <Avatar name="Maya Chen" size="md" />
      <Avatar name="Maya Chen" size="lg" />
    </div>
  );
}
