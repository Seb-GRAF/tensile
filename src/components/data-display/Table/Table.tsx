import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useSprings } from "../../../springs";
import { useSize } from "../../../useSize";
import { Skeleton } from "../../feedback/Skeleton/Skeleton";
import { Card } from "../../layout/Card/Card";

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

function TableRow<Row>({ row, columns, ref }: { row: Row; columns: TableProps<Row>["columns"]; ref?: (element: HTMLTableRowElement | null) => void }) {
  const { shape, swap } = useSprings();
  const present = useIsPresent();
  const element = useRef<HTMLTableRowElement>(null);
  const widths = present ? undefined : Array.from(element.current!.cells, (cell) => cell.offsetWidth);
  return (
    <motion.tr
      ref={(tr) => {
        element.current = tr;
        ref!(tr);
      }}
      aria-hidden={!present}
      inert={!present}
      layout="position"
      {...swap}
      transition={{ layout: shape }}
      className="hover:bg-hover"
    >
      {columns.map((column, i) => {
        const style = widths && { width: widths[i] };
        const content = column.cell ? column.cell(row) : (row as Record<string, React.ReactNode>)[column.key];
        const align = aligns[column.align ?? "start"];
        return column.rowHeader ? (
          <th key={column.key} scope="row" style={style} className={`h-12 whitespace-nowrap border-line px-4 py-1 font-medium [tr:not([inert])~tr>&]:border-t ${align}`}>
            {content}
          </th>
        ) : (
          <td key={column.key} style={style} className={`h-12 whitespace-nowrap border-line px-4 py-1 [tr:not([inert])~tr>&]:border-t ${align}`}>
            {content}
          </td>
        );
      })}
    </motion.tr>
  );
}

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
  const { shape, soft, swap } = useSprings();
  const [box, measureBox] = useSize();
  const [table, measureTable] = useSize();
  const head = useRef<HTMLTableSectionElement>(null);
  const scrolls = box && table && table.width > box.width;
  const keys = rows.map(rowKey);
  const [body, setBody] = useState({ keys, count: 0 });
  if (keys.join(" ") !== body.keys.join(" ")) {
    setBody({ keys, count: keys.some((key) => body.keys.includes(key)) ? body.count : body.count + 1 });
  }

  useLayoutEffect(() => {
    const style = head.current!.parentElement!.style;
    const headers = Array.from(head.current!.rows[0].cells, (cell) => cell.firstElementChild as HTMLElement);
    document.fonts.ready.then(() => {
      style.width = "min-content";
      const widths = headers.map((header) => header.getBoundingClientRect().width);
      style.width = "";
      headers.forEach((header, i) => {
        header.style.minWidth = `${widths[i]}px`;
      });
    });
  }, [rows, loading]);

  return (
    <Card className={`flex flex-col overflow-hidden outline-offset-2 has-[>:focus-visible]:outline-2 has-[>:focus-visible]:outline-focus ${className}`}>
      <div
        ref={measureBox}
        tabIndex={scrolls ? 0 : undefined}
        role={scrolls ? "region" : undefined}
        aria-label={scrolls ? caption : undefined}
        className="scroll-fade-x overflow-auto outline-none"
      >
        <motion.div initial={false} animate={{ height: table?.height }} transition={shape} className="overflow-y-clip">
          <table ref={measureTable} aria-busy={loading || undefined} className="relative w-full border-separate border-spacing-0 text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead ref={head} className="sticky top-0 z-(--layer-raised) bg-paper">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={sort?.key === column.key ? sort.direction : undefined}
                    className={`h-10 whitespace-nowrap px-4 text-label font-medium text-muted shadow-[inset_0_-1px_var(--color-line)] ${aligns[column.align ?? "start"]}`}
                  >
                    <div>{column.header}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <AnimatePresence initial={false} mode="wait">
              <motion.tbody key={loading ? "loading" : rows.length > 0 ? `${sort?.key} ${sort?.direction} ${body.count}` : "empty"} {...swap} animate={{ ...swap.animate, transition: soft }}>
                {loading ? (
                  Array.from({ length: 5 }, (_, i) => (
                    <tr key={i}>
                      {columns.map((column) => (
                        <td key={column.key} className="h-12 border-line px-4 [tr~tr>&]:border-t">
                          <Skeleton className="h-4 rounded-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : rows.length > 0 ? (
                  <AnimatePresence initial={false} mode="popLayout">
                    {rows.map((row) => (
                      <TableRow key={rowKey(row)} row={row} columns={columns} />
                    ))}
                  </AnimatePresence>
                ) : (
                  <tr>
                    <td colSpan={columns.length}>{empty}</td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </motion.div>
      </div>
    </Card>
  );
}
