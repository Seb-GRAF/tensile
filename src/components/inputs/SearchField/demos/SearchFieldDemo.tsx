import { useState } from "react";
import { SearchField } from "tensile";

const documents = ["Design guidelines", "Project notes", "Release checklist"];

export function SearchFieldDemo() {
  const [query, setQuery] = useState("");

  return (
    <div className="grid w-full max-w-sm gap-4">
      <SearchField
        label="Search documents"
        value={query}
        onValueChange={setQuery}
      />
      <ul role="list" className="grid gap-2 text-label">
        {documents
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((name) => (
            <li key={name}>{name}</li>
          ))}
      </ul>
    </div>
  );
}
