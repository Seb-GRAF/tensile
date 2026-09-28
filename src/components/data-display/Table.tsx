import { useSize } from "../../useSize";
import { Skeleton } from "../feedback/Skeleton";
import { Card } from "../layout/Card";

export type TableSort = { key: string; direction: "ascending" | "descending" };

export type TableProps<Row> = {
  columns: {
    key: string;
    header: React.ReactNode;
    /** The cell's content; without it, the cell shows `row[key]`. Cells keep to one line unless their content sets `whitespace-normal`. */
    cell?: (row: Row) => React.ReactNode;
    align?: "start" | "end";
    /** The column's cells are row headers, which name their rows. */
    rowHeader?: boolean;
  }[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /** Names the table for screen readers; not shown. */
  caption: string;
  /** Marks the sorted column's header with `aria-sort`. */
  sort?: TableSort | null;
  /** Shows placeholder rows instead of `rows` and marks the table busy. */
  loading?: boolean;
  /** Fills one row spanning every column when there are no rows. */
  empty?: React.ReactNode;
  className?: string;
};

const aligns = { start: "text-start", end: "text-end tabular-nums" };

export function Table<Row>({
  columns,
  rows,
  rowKey,
  caption,
  sort = null,
  loading = false,
  empty,
  className = "",
}: TableProps<Row>) {
  const [box, measureBox] = useSize();
  const [table, measureTable] = useSize();
  const scrolls = box && table && table.width > box.width;

  return (
    <Card
      ref={measureBox}
      tabIndex={scrolls ? 0 : undefined}
      role={scrolls ? "region" : undefined}
      aria-label={scrolls ? caption : undefined}
      className={`overflow-auto outline-offset-2 focus-visible:outline-2 focus-visible:outline-focus ${className}`}
    >
      <table ref={measureTable} aria-busy={loading || undefined} className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-0 z-(--layer-raised) bg-paper">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                aria-sort={sort?.key === column.key ? sort.direction : undefined}
                className={`h-10 whitespace-nowrap px-4 text-label font-medium text-muted shadow-[inset_0_-1px_var(--color-line)] ${aligns[column.align ?? "start"]}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {loading ? (
            Array.from({ length: 5 }, (_, i) => (
              <tr key={i}>
                {columns.map((column) => (
                  <td key={column.key} className="h-12 px-4">
                    <Skeleton className="h-4 rounded-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : rows.length > 0 ? (
            rows.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-hover">
                {columns.map((column) => {
                  const content = column.cell ? column.cell(row) : (row as Record<string, React.ReactNode>)[column.key];
                  const align = aligns[column.align ?? "start"];
                  return column.rowHeader ? (
                    <th key={column.key} scope="row" className={`h-12 whitespace-nowrap px-4 py-1 font-medium ${align}`}>
                      {content}
                    </th>
                  ) : (
                    <td key={column.key} className={`h-12 whitespace-nowrap px-4 py-1 ${align}`}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>{empty}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
