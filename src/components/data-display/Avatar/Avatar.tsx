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
  sm: "tn:size-6 tn:text-caption",
  md: "tn:size-8 tn:text-label",
  lg: "tn:size-11 tn:text-body",
};

export function Avatar({ name, src, size = "md", className = "" }: AvatarProps) {
  const words = name.split(" ");
  const letters = words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0][0];
  const initials = (
    <span role="img" aria-label={name} className="tn:grid tn:size-full tn:place-items-center tn:rounded-full tn:bg-ink tn:font-semibold tn:text-paper">
      {letters.toUpperCase()}
    </span>
  );
  return src ? (
    <Image src={src} alt={name} fallback={initials} className={`tn:rounded-full ${sizes[size]} ${className}`} />
  ) : (
    <span className={`tn:block ${sizes[size]} ${className}`}>{initials}</span>
  );
}
