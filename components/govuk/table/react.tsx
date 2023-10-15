"use client";
import type { SortingState, Table as TTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSortButton,
  TableSortStatus,
} from ".";

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

export default function ReactTable<T>({ table }: { table: TTable<T> }) {
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
