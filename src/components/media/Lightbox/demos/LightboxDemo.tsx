import { useState } from "react";
import { Lightbox, Image } from "tensile";

const landscape = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320"><rect width="480" height="320" fill="#dae6ea"/><circle cx="350" cy="90" r="30" fill="#fbeaa8"/><path d="M0 240 140 100l130 130 90-80 120 90v80H0Z" fill="#647d77"/></svg>')}`;

const images = [
  {
    label: "Mountain ridge in color",
    image: <Image src={landscape} alt="" className="size-full" />,
  },
  {
    label: "Mountain ridge in grayscale",
    image: <Image src={landscape} alt="" className="size-full grayscale" />,
  },
];

export function LightboxDemo() {
  const [value, setValue] = useState<number | null>(null);

  return <Lightbox images={images} value={value} onValueChange={setValue} />;
}
