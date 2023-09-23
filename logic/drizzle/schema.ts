import { relations } from "drizzle-orm";
import { date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const created_at = timestamp("created_at", {
  mode: "string",
  withTimezone: true,
})
  .notNull()
  .defaultNow();

export const profiles = pgTable("profiles", {
  name: text("name").primaryKey(),
  created_at,
});

export const keysets = pgTable("keysets", {
  id: text("id")
    .$defaultFn(() => nanoid(10))
    .primaryKey(),
  created_at,
  profile: text("profile")
    .notNull()
    .references(() => profiles.name),
  colorway: text("colorway").notNull(),
  thumbnail: text("thumbnail").notNull(),
  icDate: date("ic_date").notNull(),
  gbLaunch: date("gb_launch"),
  gbEnd: date("gb_end"),
});

export const keysetRelations = relations(keysets, ({ one, many }) => ({
  profileData: one(profiles, {
    fields: [keysets.profile],
    references: [profiles.name],
  }),
  designs: many(designs),
  listings: many(listings),
}));

export const designers = pgTable("designers", {
  username: text("username").primaryKey(),
  created_at,
});

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
  created_at,
});

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
  created_at,
  country: text("country"),
});

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
  created_at,
  url: text("url"),
  regions: text("regions").array(),
  gbEnd: date("gb_end"),
});

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
