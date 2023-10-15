import type { Status } from "@/logic/drizzle/schema";

export const dateFormat = "d LLLL yyyy";

export const statusOrder = {
  ic: 0,
  future: 1,
  ongoing: 2,
  closed: 3,
} satisfies Record<Status, number>;
