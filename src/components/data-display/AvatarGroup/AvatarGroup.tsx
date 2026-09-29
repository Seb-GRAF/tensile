import { Avatar, sizes } from "../Avatar/Avatar";

export type AvatarGroupProps = {
  people: { name: string; src?: string }[];
  /** How many avatars show before the rest collapse into a "+N" circle. */
  max?: number;
  size?: "sm" | "md" | "lg";
  /** Accessible name of the list. */
  label?: string;
  /** Accessible name of the "+N" circle. */
  moreLabel?: (count: number) => string;
  className?: string;
};

const overlaps = {
  sm: "space-x-0",
  md: "-space-x-0.5",
  lg: "-space-x-1.5",
};

export function AvatarGroup({
  people,
  max = 4,
  size = "md",
  label = "People",
  moreLabel = (count: number) => `${count} more`,
  className = "",
}: AvatarGroupProps) {
  const more = people.length - max;
  return (
    <ul role="list" aria-label={label} className={`flex ${overlaps[size]} ${className}`}>
      {people.slice(0, max).map((person) => (
        <li key={person.name} className="relative rounded-full ring-2 ring-paper">
          <Avatar {...person} size={size} />
        </li>
      ))}
      {more > 0 && (
        <li className="relative rounded-full ring-2 ring-paper">
          <span
            role="img"
            aria-label={moreLabel(more)}
            className={`grid place-items-center rounded-full border border-line bg-hover font-semibold text-ink ${sizes[size]}`}
          >
            +{more}
          </span>
        </li>
      )}
    </ul>
  );
}
