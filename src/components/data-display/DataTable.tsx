import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { icons } from "../../icons";
import type { MenuAction } from "../../Menu";
import { useSprings } from "../../springs";
import { ActionMenu } from "../actions/ActionMenu";
import { EmptyState } from "../feedback/EmptyState";
import { Checkbox } from "../inputs/Checkbox";
import { Pagination } from "../navigation/Pagination";
import { Icon } from "./Icon";
import { Table, type TableProps, type TableSort } from "./Table";

export type DataTableProps<Row> = Omit<TableProps<Row>, "columns" | "sort"> & {
  columns: (TableProps<Row>["columns"][number] & { sortable?: boolean })[];
  sort: TableSort | null;
  onSortChange: (sort: TableSort) => void;
  /** Keys of the selected rows (from `rowKey`), on every page. */
  selection: string[];
  onSelectionChange: (selection: string[]) => void;
  /** Current page, from 1 to `pageCount`. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** The actions in each row's menu; without it, there is no actions column. */
  rowActions?: (row: Row) => MenuAction[];
  onRowAction?: (row: Row, action: MenuAction) => void;
  emptyText?: string;
  selectAllLabel?: string;
  selectRowLabel?: (row: Row) => string;
  /** Describes the sortable column headers. */
  sortLabel?: string;
  /** The actions column's header, for screen readers. */
  actionsLabel?: string;
  rowActionsLabel?: (row: Row) => string;
  paginationLabel?: string;
  previousPageLabel?: string;
  nextPageLabel?: string;
  pageLabel?: (page: number) => string;
};

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  caption,
  sort,
  onSortChange,
  selection,
  onSelectionChange,
  page,
  pageCount,
  onPageChange,
  loading = false,
  rowActions,
  onRowAction,
  emptyText = "No results",
  empty = <EmptyState title={emptyText} />,
  selectAllLabel = "Select all rows on this page",
  selectRowLabel = (row: Row) => `Select ${rowKey(row)}`,
  sortLabel = "Sort by this column",
  actionsLabel = "Actions",
  rowActionsLabel = (row: Row) => `Actions for ${rowKey(row)}`,
  paginationLabel = "Pagination",
  previousPageLabel = "Previous page",
  nextPageLabel = "Next page",
  pageLabel = (page: number) => `Page ${page}`,
  className = "",
}: DataTableProps<Row>) {
  const { shape, swap } = useSprings();
  const id = useId();
  const shown = rows.map(rowKey);
  const selected = shown.filter((key) => selection.includes(key));

  const tableColumns: TableProps<Row>["columns"] = [
    {
      key: "select",
      header: (
        <Checkbox
          label=""
          aria-label={selectAllLabel}
          checked={shown.length > 0 && selected.length === shown.length}
          indeterminate={selected.length > 0 && selected.length < shown.length}
          onCheckedChange={(checked) =>
            onSelectionChange(checked ? [...selection, ...shown.filter((key) => !selection.includes(key))] : selection.filter((key) => !shown.includes(key)))
          }
        />
      ),
      cell: (row) => {
        const key = rowKey(row);
        return (
          <Checkbox
            label=""
            aria-label={selectRowLabel(row)}
            checked={selection.includes(key)}
            onCheckedChange={(checked) => onSelectionChange(checked ? [...selection, key] : selection.filter((item) => item !== key))}
          />
        );
      },
    },
    ...columns.map((column) => {
      const sorted = sort?.key === column.key;
      return {
        ...column,
        header: column.sortable ? (
          <button
            type="button"
            aria-describedby={`${id}-sort`}
            onClick={() => onSortChange({ key: column.key, direction: sorted && sort.direction === "ascending" ? "descending" : "ascending" })}
            className={`press -mx-2 inline-flex h-8 items-center gap-1 rounded-control px-2 outline-offset-2 hover:bg-hover focus-visible:outline-2 focus-visible:outline-focus ${column.align === "end" ? "flex-row-reverse" : ""}`}
          >
            {column.header}
            <span className="grid place-content-center place-items-center">
              <AnimatePresence initial={false}>
                {sorted ? (
                  <motion.span key="sorted" {...swap} className="col-start-1 row-start-1">
                    <motion.span initial={false} animate={{ rotate: sort.direction === "descending" ? 180 : 0 }} transition={shape} className="block">
                      <Icon size={14}>
                        <path d="M12 19V5" />
                        <path d="m5 12 7-7 7 7" />
                      </Icon>
                    </motion.span>
                  </motion.span>
                ) : (
                  <motion.span key="unsorted" {...swap} className="col-start-1 row-start-1">
                    <Icon size={14}>{icons.chevronsUpDown}</Icon>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        ) : (
          column.header
        ),
      };
    }),
  ];
  if (rowActions) {
    tableColumns.push({
      key: "actions",
      header: <span className="sr-only">{actionsLabel}</span>,
      cell: (row) => (
        <ActionMenu
          actions={rowActions(row)}
          onAction={(action) => onRowAction!(row, action)}
          label={rowActionsLabel(row)}
          menuLabel={rowActionsLabel(row)}
          trigger={<Icon size={16}>{icons.more}</Icon>}
          size="sm"
          className="ml-auto"
        />
      ),
    });
  }

  return (
    <div className={`grid gap-4 ${className}`}>
      <Table columns={tableColumns} rows={rows} rowKey={rowKey} caption={caption} sort={sort} loading={loading} empty={empty} />
      <Pagination
        count={pageCount}
        value={page}
        onValueChange={onPageChange}
        label={paginationLabel}
        previousLabel={previousPageLabel}
        nextLabel={nextPageLabel}
        pageLabel={pageLabel}
        className="justify-self-center"
      />
      <span id={`${id}-sort`} hidden>
        {sortLabel}
      </span>
    </div>
  );
}
