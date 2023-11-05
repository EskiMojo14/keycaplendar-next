import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const createdAt = timestamp("created_at", {
  mode: "string",
  withTimezone: true,
})
  .notNull()
  .defaultNow();

export const profiles = pgTable("profiles", {
  name: text("name").primaryKey(),
  createdAt,
});

export type Profile = typeof profiles.$inferSelect;

export const statusEnum = pgEnum("keyset_status", [
  "ic",
  "future",
  "ongoing",
  "closed",
]);

export type Status = (typeof statusEnum.enumValues)[number];

export const datePrecisionEnum = pgEnum("date_precision", [
  "microseconds",
  "milliseconds",
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year",
  "decade",
  "century",
  "millennium",
]);

export type DatePrecision = (typeof datePrecisionEnum.enumValues)[number];

export const keysets = pgTable("keysets", {
  id: text("id")
    .$defaultFn(() => nanoid(10))
    .primaryKey(),
  createdAt,
  profile: text("profile")
    .notNull()
    .references(() => profiles.name),
  colorway: text("colorway").notNull(),
  thumbnail: text("thumbnail").notNull(),
  icDate: date("ic_date").notNull(),
  gbLaunch: date("gb_launch"),
  gbEnd: date("gb_end"),
  manufacturer: text("manufacturer").references(() => manufacturers.name),
  details: text("details").notNull(),
  notes: text("notes"),
  salesGraph: text("sales_graph"),
  shipped: boolean("shipped"),
  status: statusEnum("status"),
  revision: smallint("revision"),
  _eta: date("_eta"), // non-truncated
  _etaPrecision: datePrecisionEnum("_eta_precision"),
  eta: date("eta"), // truncated
  _originalEta: date("_original_eta"), // non-truncated
  _originalEtaPrecision: datePrecisionEnum("_original_eta_precision"),
  originalEta: date("original_eta"), // truncated
  _shipDate: date("_ship_date"), // non-truncated
  _shipDatePrecision: datePrecisionEnum("_ship_date_precision"),
  shipDate: date("ship_date"), // truncated
});

export type Keyset = typeof keysets.$inferSelect;

export const overviewFields = {
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
} satisfies Partial<Record<keyof Keyset, true>>;

export type OverviewKeyset = Pick<Keyset, keyof typeof overviewFields>;

export const keysetRelations = relations(keysets, ({ one, many }) => ({
  profileData: one(profiles, {
    fields: [keysets.profile],
    references: [profiles.name],
  }),
  manufacturerData: one(manufacturers, {
    fields: [keysets.manufacturer],
    references: [manufacturers.name],
  }),
  designs: many(designs),
  listings: many(listings),
}));

export const designers = pgTable("designers", {
  username: text("username").primaryKey(),
  createdAt,
});

export type Designer = typeof designers.$inferSelect;

export const designerRelations = relations(designers, ({ many }) => ({
  designs: many(designs),
}));

export const designs = pgTable("designs", {
  designerName: text("designer_name")
    .primaryKey()
    .references(() => designers.username),
  keysetId: text("keyset_id")
    .primaryKey()
    .references(() => keysets.id),
  createdAt,
});

export type Design = typeof designs.$inferSelect;

export const designRelations = relations(designs, ({ one }) => ({
  designer: one(designers, {
    fields: [designs.designerName],
    references: [designers.username],
  }),
  keyset: one(keysets, {
    fields: [designs.keysetId],
    references: [keysets.id],
  }),
}));

export const vendors = pgTable("vendors", {
  name: text("name").primaryKey(),
  createdAt,
  country: text("country").notNull(),
});

export type Vendor = typeof vendors.$inferSelect;

export const vendorRelations = relations(vendors, ({ many }) => ({
  listings: many(listings),
}));

export const listings = pgTable("listings", {
  keysetId: text("keyset_id")
    .primaryKey()
    .references(() => keysets.id),
  vendorName: text("vendor_name")
    .primaryKey()
    .references(() => vendors.name),
  createdAt,
  url: text("url"),
  regions: text("regions").array(),
  gbEnd: date("gb_end"),
});

export type Listing = typeof listings.$inferSelect;

export const listingRelations = relations(listings, ({ one }) => ({
  keyset: one(keysets, {
    fields: [listings.keysetId],
    references: [keysets.id],
  }),
  vendor: one(vendors, {
    fields: [listings.vendorName],
    references: [vendors.name],
  }),
}));

export const manufacturers = pgTable("manufacturers", {
  name: text("name").primaryKey(),
  createdAt,
});

export type Manufacturer = typeof manufacturers.$inferSelect;
