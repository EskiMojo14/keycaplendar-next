import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import type { Table as TTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export function ReactTable<T>({ table }: { table: TTable<T> }) {
  return (
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
                <TableCell
                  key={header.id}
                  sortDirection={sorted}
                  onClick={header.column.getToggleSortingHandler()}
                  colSpan={header.colSpan}
                >
                  {canSort ? (
                    <TableSortLabel
                      active={!!sorted}
                      direction={sorted || undefined}
                    >
                      {label}
                    </TableSortLabel>
                  ) : (
                    label
                  )}
                </TableCell>
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
  );
}
