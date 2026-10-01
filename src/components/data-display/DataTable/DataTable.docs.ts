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
  usage: "Sort and slice your local rows, or fetch the requested server page, before passing `rows`. Control sort, selection and page, or let the table keep them and read them from the callbacks.",
  anatomy: "Table renders the current page. Checkboxes select rows by rowKey. Header buttons request sorting. Pagination requests another page. Optional ActionMenus expose row actions.",
  notes: [
    "The component never sorts or slices data itself.",
    "Selection can span pages; the header checkbox affects only the shown rows and is disabled while loading or when there are no rows.",
    "Supply onRowAction when supplying rowActions.",
    "Use a pageCount of at least one, including an empty result."
  ],
  examples: [
    { id: "usage", title: "Basic usage", description: "Local rows sorted and paged from the parent's state; start here when all the data is in memory.", Demo: DataTableDemo, code: dataTableDemoCode },
    { id: "actions", title: "Actions", description: "Each row gets an action menu and the chosen action shows below the table; use it when rows need their own commands, such as open or export.", Demo: DataTableActionsDemo, code: dataTableActionsDemoCode },
    { id: "loading", title: "Loading", description: "Placeholder rows stand in for the data and the table is marked busy; use it while a page is being fetched.", Demo: DataTableLoadingDemo, code: dataTableLoadingDemoCode },
    { id: "empty", title: "Empty state", description: "With no rows, an EmptyState with a button that loads data fills the table; use it for a first run or a search with no results.", Demo: DataTableEmptyDemo, code: dataTableEmptyDemoCode },
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
    "className": "Classes on the wrapper around the table and the pager, for width and placement.",
    "rows": "Only the rows for the current page, already sorted.",
    "rowKey": "Stable unique key used for rows and selection.",
    "loading": "Shows placeholder rows instead of `rows` and marks the table busy.",
    "empty": "Fills one row spanning every column when there are no rows.",
    "columns": "Table columns with optional sortable headers.",
    "sort": "The sorted column's key and direction, or null. Set it to control the sort.",
    "defaultSort": "The sort marked at first when `sort` isn't set (null by default). The table only marks the header; sort `rows` yourself.",
    "onSortChange": "Apply the requested key and direction to the data.",
    "selection": "Keys of the selected rows (from `rowKey`), on every page. Set it to control the selection.",
    "defaultSelection": "The keys selected at first when `selection` isn't set ([] by default).",
    "onSelectionChange": "Update selected row keys across all pages.",
    "page": "Current page, from 1 to `pageCount`. Set it to control the pager.",
    "defaultPage": "The page marked at first when `page` isn't set (1 by default). The table only moves the pager; pass that page's rows yourself.",
    "pageCount": "Total number of pages, at least one.",
    "onPageChange": "Load or slice the requested one-based page.",
    "rowActions": "The actions in each row's menu; without it, there is no actions column.",
    "onRowAction": "Handle an action for its row.",
    "emptyText": "Title of the default empty state when there are no rows; unused when you pass `empty`.",
    "selectAllLabel": "Names the header checkbox, which selects or clears the shown rows.",
    "selectRowLabel": "Names each row's checkbox from its row (\"Select INV-1032\" by default, from `rowKey`).",
    "sortLabel": "Describes the sortable column headers.",
    "actionsLabel": "The actions column's header, for screen readers.",
    "rowActionsLabel": "Names each row's action menu button and menu (\"Actions for INV-1032\" by default, from `rowKey`).",
    "paginationLabel": "Names the pager's navigation landmark.",
    "previousPageLabel": "Names the pager's previous-page arrow button.",
    "nextPageLabel": "Names the pager's next-page arrow button.",
    "pageLabel": "Names each page button from its number (\"Page 2\" by default)."
  },
};
