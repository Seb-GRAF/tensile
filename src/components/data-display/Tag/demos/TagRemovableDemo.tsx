import { useState, useRef } from "react";
import { Tag, Button } from "tensile";

export function TagRemovableDemo() {
  const [tags, setTags] = useState(["Design", "Research"]);
  const reset = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {tags.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          onRemove={() => {
            setTags(tags.filter((item) => item !== tag));
            reset.current!.focus();
          }}
        />
      ))}
      <Button
        ref={reset}
        variant="secondary"
        size="sm"
        onClick={() => setTags(["Design", "Research"])}
      >
        Restore tags
      </Button>
    </div>
  );
}
