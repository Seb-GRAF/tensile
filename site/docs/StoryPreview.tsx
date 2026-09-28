import { useState } from "react";
import { Card, Field, Link, Select, Tabs } from "tensile";
import api from "./api.json";
import { Example } from "./Example";

export function StoryPreview({ component }: { component: typeof api[keyof typeof api] }) {
  const [storyId, setStoryId] = useState(component.stories[0].id);
  const [view, setView] = useState("preview");
  const story = component.stories.find((item) => item.id === storyId)!;
  const href = `./iframe.html?id=${story.id}&viewMode=story&shortcuts=false&singleStory=true`;

  return (
    <div className="grid gap-5">
      <div className="flex items-end justify-between gap-4">
        <Field label="Example" labelPlacement="above" className="min-w-0 flex-1 sm:max-w-xs">
          <Select options={component.stories.map((item) => ({ value: item.id, label: item.name }))} value={storyId} onValueChange={setStoryId} />
        </Field>
        <Link href={href} target="_blank" className="shrink-0 pb-3 text-label">Open example</Link>
      </div>
      {story.description && <p className="text-body leading-7 text-muted">{story.description}</p>}
      <Tabs
        label={`${component.title} example`}
        value={view}
        onValueChange={setView}
        items={[
          {
            value: "preview", label: "Preview", content: (
              <Card className="overflow-hidden">
                <iframe key={story.id} src={href} title={`${component.title}: ${story.name}`} className="h-[28rem] w-full border-0 sm:h-[32rem]" />
              </Card>
            ),
          },
          { value: "code", label: "Story source", content: <Example label={`${component.title}.stories.tsx`} code={component.source} /> },
        ]}
      />
    </div>
  );
}
