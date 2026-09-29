import { Image } from "tensile";

const landscape = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320"><rect width="480" height="320" fill="#dae6ea"/><circle cx="350" cy="90" r="30" fill="#fbeaa8"/><path d="M0 240 140 100l130 130 90-80 120 90v80H0Z" fill="#647d77"/></svg>')}`;

export function ImageDemo() {
  return (
    <Image
      src={landscape}
      alt="Green mountain ridge beneath a pale sun"
      className="aspect-3/2 w-full max-w-sm rounded-card"
    />
  );
}
