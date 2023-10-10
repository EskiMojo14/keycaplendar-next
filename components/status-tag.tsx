import type { TagProps } from "./govuk/tag";
import Tag from "./govuk/tag";
import { statusLabels } from "@/constants/keyset";
import type { Status } from "@/logic/drizzle/schema";

export interface StatusTagProps extends Omit<TagProps, "color"> {
  status: Status;
}

const statusColors: Record<Status, NonNullable<TagProps["color"]>> = {
  ic: "blue",
  future: "pink",
  ongoing: "turquoise",
  closed: "grey",
};

export default function StatusTag({ status, ...props }: StatusTagProps) {
  return (
    <Tag {...props} color={statusColors[status]}>
      {statusLabels[status]}
    </Tag>
  );
}
