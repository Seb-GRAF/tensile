import { useState } from "react";
import { Checkbox } from "tensile";

const notifications = ["Comments", "Mentions", "Invitations"];

export function CheckboxIndeterminateDemo() {
  const [selected, setSelected] = useState(["Comments"]);
  const allChecked = selected.length === notifications.length;
  const indeterminate = selected.length > 0 && !allChecked;

  return (
    <div className="grid gap-3">
      <Checkbox
        label="All notifications"
        checked={allChecked}
        indeterminate={indeterminate}
        onCheckedChange={(checked) => setSelected(checked ? notifications : [])}
      />
      <div className="grid gap-2 pl-6">
        {notifications.map((notification) => (
          <Checkbox
            key={notification}
            label={notification}
            checked={selected.includes(notification)}
            onCheckedChange={(checked) => {
              setSelected(checked
                ? [...selected, notification]
                : selected.filter((item) => item !== notification));
            }}
          />
        ))}
      </div>
    </div>
  );
}
