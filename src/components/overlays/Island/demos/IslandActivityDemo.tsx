import { useState } from "react";
import { Island, Button } from "tensile";

export function IslandActivityDemo() {
  const [expanded, setExpanded] = useState(false);
  const [activity, setActivity] = useState("Review");

  return (
    <div className="grid justify-items-center gap-8">
      <Island
        activity={activity}
        leading={activity}
        trailing="Ready"
        expanded={expanded}
        onExpandedChange={setExpanded}
        panelWidth={280}
        panelHeight={120}
      >
        <div className="flex h-full items-center justify-between gap-4 p-5">
          <p className="text-label">{activity} is ready.</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExpanded(false)}
          >
            Close
          </Button>
        </div>
      </Island>
      <Button
        variant="secondary"
        onClick={() => {
          setActivity(activity === "Review" ? "Export" : "Review");
          setExpanded(false);
        }}
      >
        Change activity
      </Button>
    </div>
  );
}
