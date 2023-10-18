import type { SQL } from "drizzle-orm";
import { asc, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import type { Page } from "@/constants/keyset";
import { pageSorts, pagesByStatus } from "@/constants/keyset";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("No database URL provided");
}
const client = postgres(connectionString);

export const db = drizzle(client, { schema });

export const pageDefaultSorts = Object.fromEntries(
  Object.entries(pageSorts).map(([page, sorts]) => [
    page,
    sorts.map(({ id, desc: d }) =>
      d ? desc(schema.keysets[id]) : asc(schema.keysets[id]),
    ),
  ]),
) as Record<Page, Array<SQL>>;

const overviewFields = {
  profile: true,
  colorway: true,
  revision: true,
  status: true,
  id: true,
  shipped: true,
  manufacturer: true,
  icDate: true,
  gbLaunch: true,
  gbEnd: true,
} satisfies Partial<Record<keyof schema.Keyset, true>>;

export type OverviewKeyset = Pick<schema.Keyset, keyof typeof overviewFields>;

export const getKeysetsByPage = (page: Page) =>
  db.query.keysets.findMany({
    where: (keysets, { inArray }) =>
      inArray(keysets.status, pagesByStatus[page]),
    with: {
      designs: true,
    },
    columns: overviewFields,
    orderBy: pageDefaultSorts[page],
  });
