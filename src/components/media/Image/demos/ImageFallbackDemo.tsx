import { Image, Icon } from "tensile";

export function ImageFallbackDemo() {
  return (
    <Image
      src="data:image/png;base64,AAAA"
      alt="Mountain landscape"
      className="aspect-3/2 w-full max-w-sm rounded-card"
      fallback={
        <span className="grid justify-items-center gap-2 text-label">
          <Icon name="imageOff" />
          Image unavailable
        </span>
      }
    />
  );
}
