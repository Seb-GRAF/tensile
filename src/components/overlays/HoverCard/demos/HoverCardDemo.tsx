import { HoverCard, Link, Avatar } from "tensile";

const portrait = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect width="88" height="88" fill="#dae6ea"/><circle cx="44" cy="34" r="17" fill="#be8977"/><path d="M10 88a34 34 0 0 1 68 0" fill="#2e2e2c"/></svg>')}`;

export function HoverCardDemo() {
  return (
    <div className="text-body">
      Reviewed by{" "}
      <HoverCard
        content={
          <div className="grid w-72 gap-3 p-4">
            <Avatar name="Maya Chen" src={portrait} size="lg" />
            <div>
              <p className="font-semibold">Maya Chen</p>
              <p className="text-label text-muted">@maya · Design systems lead at Northwind</p>
            </div>
            <p className="text-label">Writes about motion, type and accessible components. Notes at <Link href="https://example.com/maya">mayachen.design</Link>.</p>
            <p className="text-label text-muted"><span className="font-semibold text-ink">1,284</span> followers · <span className="font-semibold text-ink">312</span> following</p>
          </div>
        }
      >
        {(trigger) => <Link {...trigger} href="https://example.com/maya">Maya Chen</Link>}
      </HoverCard>
    </div>
  );
}
