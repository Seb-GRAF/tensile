import { Image, Icon } from "tensile";

export function ImageFallbackDemo() {
  return (
    <Image
      src="data:image/png;base64,AAAA"
      alt="Mountain landscape"
      className="aspect-3/2 w-full max-w-sm rounded-card"
      fallback={
        <span className="grid justify-items-center gap-2 text-label">
          <Icon>
            <path d="m3 3 18 18M3 9v12h12M9 3h12v12" />
          </Icon>
          Image unavailable
        </span>
      }
    />
  );
}
