import type { Status } from "@/logic/drizzle/schema";

export const statusLabels: Record<Status, string> = {
  ic: "IC",
  future: "Future",
  ongoing: "Ongoing",
  closed: "Closed",
};
