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

const aligns = { start: "tn:text-start", end: "tn:text-end tn:tabular-nums" };

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
      className="tn:hover:bg-hover"
    >
      {columns.map((column, i) => {
        const style = widths && { width: widths[i] };
        const content = column.cell ? column.cell(row) : (row as Record<string, React.ReactNode>)[column.key];
        const align = aligns[column.align ?? "start"];
        return column.rowHeader ? (
          <th key={column.key} scope="row" style={style} className={`tn:h-12 tn:whitespace-nowrap tn:border-line tn:px-4 tn:py-1 tn:font-medium tn:[tr:not([inert])~tr>&]:border-t ${align}`}>
            {content}
          </th>
        ) : (
          <td key={column.key} style={style} className={`tn:h-12 tn:whitespace-nowrap tn:border-line tn:px-4 tn:py-1 tn:[tr:not([inert])~tr>&]:border-t ${align}`}>
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
    <Card className={`tn:flex tn:flex-col tn:overflow-hidden tn:outline-offset-2 tn:has-[>:focus-visible]:outline-2 tn:has-[>:focus-visible]:outline-focus ${className}`}>
      <div
        ref={measureBox}
        tabIndex={scrolls ? 0 : undefined}
        role={scrolls ? "region" : undefined}
        aria-label={scrolls ? caption : undefined}
        className="tn:scroll-fade-x tn:overflow-auto tn:outline-none"
      >
        <motion.div initial={false} animate={{ height: table?.height }} transition={shape} className="tn:overflow-y-clip">
          <table ref={measureTable} aria-busy={loading || undefined} className="tn:relative tn:w-full tn:border-separate tn:border-spacing-0 tn:text-sm">
            <caption className="tn:sr-only">{caption}</caption>
            <thead ref={head} className="tn:sticky tn:top-0 tn:z-(--tn-layer-raised) tn:bg-paper">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={sort?.key === column.key ? sort.direction : undefined}
                    className={`tn:h-10 tn:whitespace-nowrap tn:px-4 tn:text-label tn:font-medium tn:text-muted tn:shadow-[inset_0_-1px_var(--tn-color-line)] ${aligns[column.align ?? "start"]}`}
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
                        <td key={column.key} className="tn:h-12 tn:border-line tn:px-4 tn:[tr~tr>&]:border-t">
                          <Skeleton className="tn:h-4 tn:rounded-full" />
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
