import { Image } from "../../media/Image/Image";

export type AvatarProps = {
  /** The accessible name, and the source of the initials. */
  name: string;
  src?: string;
  /** 24, 32 or 44 px. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const sizes = {
  sm: "size-6 text-caption",
  md: "size-8 text-label",
  lg: "size-11 text-body",
};

export function Avatar({ name, src, size = "md", className = "" }: AvatarProps) {
  const words = name.split(" ");
  const letters = words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0][0];
  const initials = (
    <span role="img" aria-label={name} className="grid size-full place-items-center rounded-full bg-ink font-semibold text-paper">
      {letters.toUpperCase()}
    </span>
  );
  return src ? (
    <Image src={src} alt={name} fallback={initials} className={`rounded-full ${sizes[size]} ${className}`} />
  ) : (
    <span className={`block ${sizes[size]} ${className}`}>{initials}</span>
  );
}
