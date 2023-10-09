import type { TagProps } from "./govuk/tag";
import Tag from "./govuk/tag";
import { Status, statusLabels } from "@/constants/keyset";

export interface StatusTagProps extends Omit<TagProps, "color"> {
  status: Status;
}

const statusColors: Record<Status, NonNullable<TagProps["color"]>> = {
  [Status.IC]: "blue",
  [Status.FutureGB]: "pink",
  [Status.Ongoing]: "turquoise",
  [Status.Closed]: "grey",
  [Status.Shipped]: "green",
};

export default function StatusTag({ status, ...props }: StatusTagProps) {
  return (
    <Tag {...props} color={statusColors[status]}>
      {statusLabels[status]}
    </Tag>
  );
}
