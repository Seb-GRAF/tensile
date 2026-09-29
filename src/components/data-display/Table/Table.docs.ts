import { TableDemo } from "./demos/TableDemo";
import tableDemoCode from "./demos/TableDemo.tsx?raw";
import { TableCellsDemo } from "./demos/TableCellsDemo";
import tableCellsDemoCode from "./demos/TableCellsDemo.tsx?raw";
import { TableWideDemo } from "./demos/TableWideDemo";
import tableWideDemoCode from "./demos/TableWideDemo.tsx?raw";
import { TableLoadingDemo } from "./demos/TableLoadingDemo";
import tableLoadingDemoCode from "./demos/TableLoadingDemo.tsx?raw";
import { TableEmptyDemo } from "./demos/TableEmptyDemo";
import tableEmptyDemoCode from "./demos/TableEmptyDemo.tsx?raw";

export default {
  description: "Display structured data in a native table.",
  usage: "Pass typed rows, column definitions, a stable rowKey and a descriptive caption. Use cell for custom rendering.",
  anatomy: "Card provides the surface and a scroll area inside it. Native column and optional row headers describe the data. Skeleton rows appear while loading.",
  notes: [
    "The caption is available to screen readers but not shown visually.",
    "Cells stay on one line unless custom content uses whitespace-normal.",
    "Overflow makes the scroll region keyboard-focusable and fades the content toward an edge while more is hidden past it; a height constraint allows a sticky header.",
    "A column never gets narrower than the widest content it has shown, so the columns don't shift back and forth as rows change.",
    "A new sort, or rows that are all new, swaps the whole body; a row that is removed or added animates on its own.",
    "sort only describes an already-sorted column. Table does not sort rows."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Typed rows, headers and caption.", Demo: TableDemo, code: tableDemoCode },
    { id: "cells", title: "Cells", description: "Custom cells, row headers and numeric alignment.", Demo: TableCellsDemo, code: tableCellsDemoCode },
    { id: "wide", title: "Wide", description: "Horizontal overflow.", Demo: TableWideDemo, code: tableWideDemoCode },
    { id: "loading", title: "Loading", description: "Loading rows.", Demo: TableLoadingDemo, code: tableLoadingDemoCode },
    { id: "empty", title: "Empty state", description: "Empty content.", Demo: TableEmptyDemo, code: tableEmptyDemoCode },
  ],
  keyboard: [
    {
      "key": "Tab",
      "description": "Focus the scroll region when horizontal overflow exists."
    },
    {
      "key": "Arrow keys in the scroll region",
      "description": "Scroll the table."
    }
  ],
  related: [
    "DataTable",
    "EmptyState"
  ],
  props: {
    "columns": "Column keys, headers, optional cell renderers, alignment and row-header semantics.",
    "rows": "Rows in display order.",
    "rowKey": "Return a stable unique string for each row.",
    "caption": "Names the table for screen readers; not shown.",
    "sort": "Marks the sorted column's header with `aria-sort`.",
    "loading": "Shows placeholder rows instead of `rows` and marks the table busy.",
    "empty": "Fills one row spanning every column when there are no rows.",
    "className": "Additional classes on the outer element."
  },
};
