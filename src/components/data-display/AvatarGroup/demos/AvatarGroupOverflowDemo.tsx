import { AvatarGroup } from "tensile";

const people = [
  { name: "Maya Chen" },
  { name: "Jonas Weber" },
  { name: "Aiko Tanaka" },
  { name: "Samuel Okafor" },
  { name: "Léa Martin" },
];

export function AvatarGroupOverflowDemo() {
  return (
    <AvatarGroup
      label="Reviewers"
      people={people}
      max={2}
      moreLabel={(count) => `${count} additional reviewers`}
    />
  );
}
