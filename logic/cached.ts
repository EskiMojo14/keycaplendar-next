import type { SQL } from "drizzle-orm";
import { asc, desc } from "drizzle-orm";
import { cache } from "react";
import { db } from "./drizzle";
import { keysets, overviewFields } from "./drizzle/schema";
import type { Page } from "@/constants/keyset";
import { pageSorts, pagesByStatus } from "@/constants/keyset";

export const pageDefaultSorts = Object.fromEntries(
  Object.entries(pageSorts).map(([page, sorts]) => [
    page,
    sorts.map(({ id, desc: d }) => (d ? desc(keysets[id]) : asc(keysets[id]))),
  ]),
) as Record<Page, Array<SQL>>;

export const getKeysetsByPage = cache((page: Page) =>
  db.query.keysets.findMany({
    where: (keysets, { inArray }) =>
      inArray(keysets.status, pagesByStatus[page]),
    with: {
      designs: true,
    },
    columns: overviewFields,
    orderBy: pageDefaultSorts[page],
  }),
);

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

export const getProfileByName = cache((name: string) =>
  db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.name, name),
  }),
);
