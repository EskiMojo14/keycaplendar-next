import { format, lastDayOfQuarter, startOfQuarter } from "date-fns";
import type { DatePrecision, Keyset, Status } from "../drizzle/schema";
import type { Satisfies } from "./utils";
import { dateFormat, precisionFormats, statusOrder } from "@/constants/format";

export function getKeysetName(
  keyset: Pick<Keyset, "profile" | "colorway" | "manufacturer" | "revision">,
) {
  const { profile, colorway, manufacturer, revision } = keyset;
  let name = profile;
  if (profile === "Cherry") {
    name = manufacturer ?? profile;
  }
  name += " " + colorway;
  if (typeof revision === "number") {
    name += " r" + revision;
  }
  return name;
}

type KeysetDates = Pick<Keyset, "status" | "gbLaunch" | "gbEnd">;

export type KeysetDiscrim = Satisfies<
  | {
      status: "closed";
      gbLaunch: string;
      gbEnd: string;
    }
  | {
      status: "ongoing" | "future";
      gbLaunch: string;
      gbEnd: string | null;
    }
  | {
      status: "ic";
      gbLaunch: string | null;
      gbEnd: string | null;
    },
  KeysetDates
>;

export function compareStatus(a: Status, b: Status) {
  return statusOrder[a] - statusOrder[b];
}

const cardinalRules = new Intl.PluralRules();

export function pluralise(
  count: number,
  mapping: Partial<Record<Intl.LDMLPluralRule, string>>,
  fallback: string,
) {
  return mapping[cardinalRules.select(count)] ?? fallback;
}

export const precisionFormat = (
  date: Date | number,
  precision: DatePrecision,
) => {
  if (precision === "quarter") {
    return `${format(startOfQuarter(date), precisionFormats.month)} to ${format(
      lastDayOfQuarter(date),
      precisionFormats.month,
    )}`;
  }
  return format(date, precisionFormats[precision] ?? dateFormat);
};
