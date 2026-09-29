import { Avatar } from "tensile";

const portrait = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><rect width="88" height="88" fill="#dae6ea"/><circle cx="44" cy="34" r="17" fill="#be8977"/><path d="M10 88a34 34 0 0 1 68 0" fill="#2e2e2c"/></svg>')}`;

export function AvatarDemo() {
  return <Avatar name="Maya Chen" src={portrait} />;
}
