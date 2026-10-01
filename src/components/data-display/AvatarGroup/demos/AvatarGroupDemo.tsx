import { AvatarGroup } from "tensile";

const people = [
  { name: "Maya Chen" },
  { name: "Jonas Weber" },
  { name: "Aiko Tanaka" },
  { name: "Samuel Okafor" },
  { name: "Léa Martin" },
];

export function AvatarGroupDemo() {
  return <AvatarGroup label="Project team" people={people} />;
}
