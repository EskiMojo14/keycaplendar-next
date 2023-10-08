"use client";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "./govuk/link";
import List from "./govuk/list";
import { ReactTable } from "./govuk/table";
import type { Design, Keyset, Listing } from "@/logic/drizzle/schema";

type KeysetWithDesignsAndListings = Keyset & {
  designs: Array<Design>;
  listings: Array<Listing>;
};

const columnHelper = createColumnHelper<KeysetWithDesignsAndListings>();

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
  columnHelper.accessor("listings", {
    header: "Vendors",
    cell: ({ getValue }) => {
      const listings = getValue();
      return listings.length ? (
        <List variant="bullet">
          {listings.map((listing) =>
            listing.url ? (
              <li key={listing.vendorName}>
                <Link href={listing.url}>{listing.vendorName}</Link>
              </li>
            ) : (
              <li key={listing.vendorName}>{listing.vendorName}</li>
            ),
          )}
        </List>
      ) : null;
    },
    enableSorting: false,
  }),
];

export function DisplayTable({
  data,
}: {
  data: Array<KeysetWithDesignsAndListings>;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });
  return <ReactTable table={table} />;
}
