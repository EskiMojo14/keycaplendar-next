"use client";
import type { SortingState } from "@tanstack/react-table";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "../govuk/link";
import List from "../govuk/list";
import ReactTable from "../govuk/table/react";
import StatusTag from "./status-tag";
import { shortDateFormat } from "@/constants/format";
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
  columnHelper.accessor("revision", {
    header: "Revision",
    cell: ({ getValue }) => getValue() ?? "n/a",
  }),
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
  columnHelper.accessor("icDate", {
    header: "IC Date",
    cell: ({ getValue }) => format(new Date(getValue()), shortDateFormat),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <StatusTag status={getValue()} />,
    sortingFn: (a, b, columnId) =>
      compareStatus(a.getValue<Status>(columnId), b.getValue<Status>(columnId)),
  }),
  columnHelper.accessor("gbLaunch", {
    header: "GB Launch",
    cell: ({ getValue }) => {
      const date = getValue();
      return date ? format(new Date(date), shortDateFormat) : "n/a";
    },
  }),
  columnHelper.accessor("gbEnd", {
    header: "GB End",
    cell: ({ getValue }) => {
      const date = getValue();
      return date ? format(new Date(date), shortDateFormat) : "n/a";
    },
  }),
  columnHelper.accessor("id", {
    header: "",
    enableSorting: false,
    cell: ({ getValue }) => <Link href={`/keyset/${getValue()}`}>View</Link>,
  }),
];

export function DisplayTable({
  data,
  defaultSort = [{ id: "profile", desc: false }],
}: {
  data: Array<KeysetWithDesigns>;
  defaultSort?: SortingState;
}) {
  const table = useReactTable({
    initialState: {
      sorting: defaultSort,
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });
  return <ReactTable table={table} />;
}
