import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("No database URL provided");
}
const client = postgres(connectionString);

export const db = drizzle(client, { schema });

export const selectKeysets = db.query.keysets.findMany({
  with: {
    designs: true,
    listings: true,
  },
});
