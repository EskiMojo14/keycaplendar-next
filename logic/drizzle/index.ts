import type { SQL, ValueOrArray } from "drizzle-orm";
import { asc, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import type { Page } from "@/constants/keyset";
import { pagesByStatus } from "@/constants/keyset";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("No database URL provided");
}
const client = postgres(connectionString);

export const db = drizzle(client, { schema });

export const pageDefaultSorts: Record<Page, ValueOrArray<SQL>> = {
  calendar: asc(schema.keysets.gbLaunch),
  live: asc(schema.keysets.gbEnd),
  ic: desc(schema.keysets.icDate),
  previous: desc(schema.keysets.gbEnd),
  timeline: asc(schema.keysets.gbLaunch),
};

export const getKeysetsByPage = (page: Page) =>
  db.query.keysets.findMany({
    where: (keysets, { inArray }) =>
      inArray(keysets.status, pagesByStatus[page]),
    with: {
      designs: true,
      listings: true,
    },
    orderBy: pageDefaultSorts[page],
  });
