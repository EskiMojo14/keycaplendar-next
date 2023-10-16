"use client";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "../govuk/link";
import List from "../govuk/list";
import ReactTable from "../govuk/table/react";
import StatusTag from "./status-tag";
import type { OverviewKeyset } from "@/logic/drizzle";
import type { Status, Design } from "@/logic/drizzle/schema";
import { compareStatus } from "@/logic/lib/format";

type KeysetWithDesigns = OverviewKeyset & {
  designs: Array<Design>;
};

const columnHelper = createColumnHelper<KeysetWithDesigns>();

const columns = [
  columnHelper.accessor("profile", { header: "Profile" }),
  columnHelper.accessor("colorway", { header: "Colorway" }),
  columnHelper.accessor("designs", {
    header: "Designer(s)",
    cell: ({ getValue }) => {
      const designs = getValue();
      return designs.length ? (
        <List>
          {designs.map((design) => (
            <li key={design.designerName}>{design.designerName}</li>
          ))}
        </List>
      ) : null;
    },
    enableSorting: false,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <StatusTag status={getValue()} />,
    sortingFn: (a, b, columnId) =>
      compareStatus(a.getValue<Status>(columnId), b.getValue<Status>(columnId)),
  }),
  columnHelper.accessor("shipped", {
    header: "Shipped",
    cell: ({ getValue }) => (getValue() ? "Yes" : "No"),
  }),
  columnHelper.accessor("id", {
    header: "",
    enableSorting: false,
    cell: ({ getValue }) => <Link href={`/keyset/${getValue()}`}>View</Link>,
  }),
];

export function DisplayTable({ data }: { data: Array<KeysetWithDesigns> }) {
  const table = useReactTable({
    initialState: {
      sorting: [{ id: "profile", desc: false }],
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });
  return <ReactTable table={table} />;
}
