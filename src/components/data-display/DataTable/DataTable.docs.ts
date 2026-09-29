import { DataTableDemo } from "./demos/DataTableDemo";
import dataTableDemoCode from "./demos/DataTableDemo.tsx?raw";
import { DataTableActionsDemo } from "./demos/DataTableActionsDemo";
import dataTableActionsDemoCode from "./demos/DataTableActionsDemo.tsx?raw";
import { DataTableLoadingDemo } from "./demos/DataTableLoadingDemo";
import dataTableLoadingDemoCode from "./demos/DataTableLoadingDemo.tsx?raw";
import { DataTableEmptyDemo } from "./demos/DataTableEmptyDemo";
import dataTableEmptyDemoCode from "./demos/DataTableEmptyDemo.tsx?raw";

export default {
  description: "Combine a table with sorting, selection, pagination and row actions.",
  usage: "Keep sort, selection and page in the caller. Sort and slice your local rows or fetch the requested server page before passing rows.",
  anatomy: "Table renders the current page. Checkboxes select rows by rowKey. Header buttons request sorting. Pagination requests another page. Optional ActionMenus expose row actions.",
  notes: [
    "The component never sorts or slices data itself.",
    "Selection can span pages; the header checkbox affects only the shown rows and is disabled while loading or when there are no rows.",
    "Supply onRowAction when supplying rowActions.",
    "Use a pageCount of at least one, including an empty result."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Caller-owned sorting, selection and pagination.", Demo: DataTableDemo, code: dataTableDemoCode },
    { id: "actions", title: "Actions", description: "Row actions with visible local effects.", Demo: DataTableActionsDemo, code: dataTableActionsDemoCode },
    { id: "loading", title: "Loading", description: "Loading state.", Demo: DataTableLoadingDemo, code: dataTableLoadingDemoCode },
    { id: "empty", title: "Empty state", description: "Empty state and recovery action.", Demo: DataTableEmptyDemo, code: dataTableEmptyDemoCode },
  ],
  keyboard: [
    {
      "key": "Enter / Space",
      "description": "Activate sort headers, checkboxes, page buttons or row actions."
    },
    {
      "key": "Tab",
      "description": "Move through table controls and the overflow region."
    }
  ],
  related: [
    "Table",
    "SelectionBar",
    "Pagination"
  ],
  props: {
    "caption": "Names the table for screen readers; not shown.",
    "className": "Additional classes on the outer element.",
    "rows": "Only the rows for the current page, already sorted.",
    "rowKey": "Stable unique key used for rows and selection.",
    "loading": "Shows placeholder rows instead of `rows` and marks the table busy.",
    "empty": "Fills one row spanning every column when there are no rows.",
    "columns": "Table columns with optional sortable headers.",
    "sort": "Current sort key and direction, or null.",
    "onSortChange": "Apply the requested key and direction to the data.",
    "selection": "Keys of the selected rows (from `rowKey`), on every page.",
    "onSelectionChange": "Update selected row keys across all pages.",
    "page": "Current page, from 1 to `pageCount`.",
    "pageCount": "Total number of pages, at least one.",
    "onPageChange": "Load or slice the requested one-based page.",
    "rowActions": "The actions in each row's menu; without it, there is no actions column.",
    "onRowAction": "Handle an action for its row.",
    "emptyText": "Message shown when there are no options or results.",
    "selectAllLabel": "Accessible label for selecting the current page.",
    "selectRowLabel": "Accessible label for a row checkbox.",
    "sortLabel": "Describes the sortable column headers.",
    "actionsLabel": "The actions column's header, for screen readers.",
    "rowActionsLabel": "Accessible name of a row action menu.",
    "paginationLabel": "Accessible name of pagination.",
    "previousPageLabel": "Accessible label for the previous page.",
    "nextPageLabel": "Accessible label for the next page.",
    "pageLabel": "Accessible name of a page button."
  },
};
