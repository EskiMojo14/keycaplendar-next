import { cache } from "react";
import { db } from "./drizzle";

export const getKeysetById = cache((id: string) =>
  db.query.keysets.findFirst({
    where: (keysets, { eq }) => eq(keysets.id, id),
    with: {
      designs: true,
      listings: true,
    },
  }),
);

export const getVendorByName = cache((name: string) =>
  db.query.vendors.findFirst({
    where: (vendors, { eq }) => eq(vendors.name, name),
  }),
);
