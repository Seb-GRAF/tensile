import { useState } from "react";
import { Carousel } from "tensile";

const slides = [
  {
    label: "Plan",
    content: (
      <div className="grid h-40 content-center gap-2 p-6">
        <h3 className="text-body font-semibold">Plan the work</h3>
        <p className="text-label text-muted">Agree on the next milestone.</p>
      </div>
    ),
  },
  {
    label: "Build",
    content: (
      <div className="grid h-40 content-center gap-2 p-6">
        <h3 className="text-body font-semibold">Build together</h3>
        <p className="text-label text-muted">
          Keep the team’s work in one place.
        </p>
      </div>
    ),
  },
  {
    label: "Review",
    content: (
      <div className="grid h-40 content-center gap-2 p-6">
        <h3 className="text-body font-semibold">Review the result</h3>
        <p className="text-label text-muted">
          Share feedback before publishing.
        </p>
      </div>
    ),
  },
];

export function CarouselDemo() {
  const [value, setValue] = useState(0);

  return (
    <div className="w-full max-w-lg">
      <Carousel
        slides={slides}
        value={value}
        onValueChange={setValue}
        label="Project workflow"
        slideWidth="100%"
      />
    </div>
  );
}
