"use client";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material-next/Chip";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { ReactTable } from "./govuk/table";
import { type Design, type Keyset, type Listing } from "@/logic/drizzle/schema";

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
        <Box display="flex" gap={1} flexWrap="wrap">
          {designs.map((design) => (
            <Chip
              key={design.designerName}
              variant="outlined"
              label={design.designerName}
            />
          ))}
        </Box>
      ) : null;
    },
    enableSorting: false,
  }),
  columnHelper.accessor("listings", {
    header: "Vendors",
    cell: ({ getValue }) => {
      const listings = getValue();
      return listings.length ? (
        <Box display="flex" gap={1} flexWrap="wrap">
          {listings.map((listing) =>
            listing.url ? (
              <Chip
                component={Link}
                key={listing.vendorName}
                icon={<Icon fontSize="small">open_in_new</Icon>}
                label={listing.vendorName}
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
              />
            ) : (
              <Chip key={listing.vendorName} label={listing.vendorName} />
            ),
          )}
        </Box>
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
