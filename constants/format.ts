import type { DatePrecision, Status } from "@/logic/drizzle/schema";

export const dateFormat = "d LLLL yyyy";

const makeFormats = <SuppliedKeys extends DatePrecision>(
  formats: Record<SuppliedKeys, string>,
): Record<SuppliedKeys, string> & Partial<Record<DatePrecision, string>> =>
  formats;

export const precisionFormats = makeFormats({
  month: "LLLL yyyy",
});

export const statusOrder = {
  ic: 0,
  future: 1,
  ongoing: 2,
  closed: 3,
} satisfies Record<Status, number>;
