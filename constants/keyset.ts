export enum Status {
  IC,
  FutureGB,
  Ongoing,
  Closed,
  Shipped,
}

export const statusLabels: Record<Status, string> = {
  [Status.IC]: "IC",
  [Status.FutureGB]: "Future",
  [Status.Ongoing]: "Ongoing",
  [Status.Closed]: "Closed",
  [Status.Shipped]: "Shipped",
};
