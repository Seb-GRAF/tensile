import { useState } from "react";
import { CompareSlider, Image } from "tensile";

const landscape = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320"><rect width="480" height="320" fill="#dae6ea"/><circle cx="350" cy="90" r="30" fill="#fbeaa8"/><path d="M0 240 140 100l130 130 90-80 120 90v80H0Z" fill="#647d77"/></svg>')}`;

export function CompareSliderDemo() {
  const [value, setValue] = useState(0.5);

  return (
    <CompareSlider
      value={value}
      onValueChange={setValue}
      before={
        <Image
          src={landscape}
          alt="Mountain ridge in grayscale"
          className="size-full grayscale"
        />
      }
      after={
        <Image
          src={landscape}
          alt="Mountain ridge in color"
          className="size-full"
        />
      }
      beforeLabel="Original"
      afterLabel="Color"
      label="Image comparison"
      className="aspect-3/2 w-full max-w-lg"
    />
  );
}
