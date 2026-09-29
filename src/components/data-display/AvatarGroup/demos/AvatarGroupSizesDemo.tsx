import { AvatarGroup } from "tensile";

const people = [
  { name: "Maya Chen" },
  { name: "Jonas Weber" },
  { name: "Aiko Tanaka" },
  { name: "Samuel Okafor" },
  { name: "Léa Martin" },
];

export function AvatarGroupSizesDemo() {
  return (
    <div className="grid gap-4">
      <AvatarGroup label="Small team avatars" people={people} size="sm" />
      <AvatarGroup label="Medium team avatars" people={people} size="md" />
      <AvatarGroup label="Large team avatars" people={people} size="lg" />
    </div>
  );
}
