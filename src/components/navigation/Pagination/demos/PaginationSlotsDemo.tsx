import { useState } from "react";
import { Pagination, List } from "tensile";

const documents = Array.from({ length: 30 }, (_, index) => ({
  id: String(index),
  title: `Project document ${index + 1}`,
}));

export function PaginationSlotsDemo() {
  const [page, setPage] = useState(1);

  return (
    <div className="grid w-full justify-items-center gap-4">
      <List
        label="Project documents"
        items={documents.slice((page - 1) * 3, page * 3)}
        className="w-full"
      />
      <div className="max-w-full overflow-x-auto p-1">
        <Pagination
          count={Math.ceil(documents.length / 3)}
          value={page}
          onValueChange={setPage}
          slots={5}
        />
      </div>
    </div>
  );
}
