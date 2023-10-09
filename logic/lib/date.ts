import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import subDays from "date-fns/subDays";
import type { Keyset } from "../drizzle/schema";
import { Status } from "@/constants/keyset";

// TODO: can this be done in SQL?
export function getKeysetStatus(keyset: Keyset): Status {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const startDate = keyset.gbLaunch ? new Date(keyset.gbLaunch) : null;
  const endDate = keyset.gbEnd ? new Date(keyset.gbEnd) : null;
  switch (true) {
    case keyset.shipped:
      return Status.Shipped;
    case !!(endDate && isBefore(endDate, yesterday)):
      return Status.Closed;
    case !!(
      startDate &&
      isBefore(startDate, today) &&
      (!endDate || isAfter(endDate, yesterday))
    ):
      return Status.Ongoing;
    case !!(startDate && isAfter(startDate, today)):
      return Status.FutureGB;
    default:
      return Status.IC;
  }
}
