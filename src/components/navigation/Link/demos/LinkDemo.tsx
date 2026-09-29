import { useId } from "react";
import { Link } from "tensile";

export function LinkDemo() {
  const id = useId();

  return (
    <div className="grid gap-5">
      <p className="text-body">
        <Link href="https://www.w3.org/WAI/" target="_blank" rel="noreferrer">
          Accessibility resources
        </Link>
      </p>
      <Link href={`#${id}`}>Jump to the note</Link>
      <p id={id} className="text-label text-muted">
        Fragment links keep native scrolling.
      </p>
    </div>
  );
}
