import type { SortingState, Table as TTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { govukBem } from ".";

const tableClasses = govukBem("table");

export const Table = forwardRef<
  HTMLTableElement,
  ComponentPropsWithoutRef<"table">
>(function Table({ className, ...props }, ref) {
  return (
    <table
      ref={ref}
      {...props}
      className={tableClasses({ extra: className })}
    />
  );
});

export const TableHead = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<"thead">
>(function TableHead({ className, ...props }, ref) {
  return (
    <thead
      ref={ref}
      {...props}
      className={tableClasses("head", undefined, className)}
    />
  );
});

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  ComponentPropsWithoutRef<"tbody">
>(function TableBody({ className, ...props }, ref) {
  return (
    <tbody
      ref={ref}
      {...props}
      className={tableClasses("body", undefined, className)}
    />
  );
});

export const TableRow = forwardRef<
  HTMLTableRowElement,
  ComponentPropsWithoutRef<"tr">
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      {...props}
      className={tableClasses("row", undefined, className)}
    />
  );
});

type CellFormat = "numeric";

export interface TableHeaderProps extends ComponentPropsWithoutRef<"th"> {
  format?: CellFormat;
}

export const TableHeader = forwardRef<HTMLTableCellElement, TableHeaderProps>(
  function TableHeader({ className, format, ...props }, ref) {
    return (
      <th
        ref={ref}
        {...props}
        className={tableClasses("header", format ?? "", className)}
      />
    );
  },
);

export interface TableCellProps extends ComponentPropsWithoutRef<"td"> {
  format?: CellFormat;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableHeader({ className, format, ...props }, ref) {
    return (
      <td
        ref={ref}
        {...props}
        className={tableClasses("cell", format ?? "", className)}
      />
    );
  },
);

export const TableSortButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>(function TableSortButton({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      {...props}
      className={tableClasses("sort-label", undefined, className)}
    />
  );
});

export const TableSortStatus = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function TableSortStatus({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      aria-live="polite"
      role="status"
      aria-atomic={true}
      {...props}
      className={tableClasses("sort-status", undefined, className)}
    />
  );
});

export function getSortStatus(sorting: SortingState): string {
  const [firstSort, ...rest] = sorting;
  if (!firstSort) return "No sorting";
  let message = `Sorted by ${firstSort.id} (${
    firstSort.desc ? "descending" : "ascending"
  })`;
  for (const col of rest) {
    message += `, then ${col.id} (${col.desc ? "descending" : "ascending"})`;
  }
  return message;
}

export function ReactTable<T>({ table }: { table: TTable<T> }) {
  return (
    <>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const label = header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    );
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <TableHeader
                    key={header.id}
                    aria-sort={
                      canSort
                        ? !sorted
                          ? "none"
                          : {
                              asc: "ascending" as const,
                              desc: "descending" as const,
                            }[sorted]
                        : undefined
                    }
                    onClick={header.column.getToggleSortingHandler()}
                    colSpan={header.colSpan}
                  >
                    {canSort ? (
                      <TableSortButton>{label}</TableSortButton>
                    ) : (
                      label
                    )}
                  </TableHeader>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getSortedRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableSortStatus>
        {getSortStatus(table.getState().sorting)}
      </TableSortStatus>
    </>
  );
}
