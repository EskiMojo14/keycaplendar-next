import { format } from "date-fns";
import type { Keyset } from "../drizzle/schema";
import type { Satisfies } from "./utils";
import { assertType } from "./utils";
import { dateFormat } from "@/constants/format";

export function getKeysetName(
  keyset: Pick<Keyset, "profile" | "colorway" | "manufacturer">,
) {
  let { profile } = keyset;
  const { colorway, manufacturer } = keyset;
  if (profile === "Cherry") {
    profile = manufacturer ?? profile;
  }
  return profile + " " + colorway;
}

type KeysetDates = Pick<Keyset, "status" | "gbLaunch" | "gbEnd">;

type DiscrimKeyset = Satisfies<
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

export function getKeysetRun(keyset: KeysetDates) {
  assertType<DiscrimKeyset>(keyset);
  switch (keyset.status) {
    case "closed":
      return `Ran from ${format(
        new Date(keyset.gbLaunch),
        dateFormat,
      )} to ${format(new Date(keyset.gbEnd), dateFormat)}.`;
    case "ongoing":
    case "future":
      return `${keyset.status === "future" ? "Runs" : "Running"} from ${format(
        new Date(keyset.gbLaunch),
        dateFormat,
      )}${
        keyset.gbEnd ? `to ${format(new Date(keyset.gbEnd), dateFormat)}` : ""
      }.`;
  }
}
