import type { Status } from "@/logic/drizzle/schema";

export const statusLabels: Record<Status, string> = {
  ic: "IC",
  future: "Future",
  ongoing: "Ongoing",
  closed: "Closed",
};

export const pages = [
  "calendar",
  "live",
  "ic",
  "previous",
  "timeline",
] as const;

export type Page = (typeof pages)[number];

export const pageLabels: Record<Page, string> = {
  calendar: "Calendar",
  live: "Live",
  ic: "IC",
  previous: "Previous",
  timeline: "Timeline",
};

export const pagesByStatus: Record<Page, Array<Status>> = {
  calendar: ["ongoing", "future"],
  live: ["ongoing"],
  ic: ["ic"],
  previous: ["closed"],
  timeline: ["future", "ongoing", "closed"],
};
