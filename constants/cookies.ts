import type { Profile } from "@/logic/drizzle/schema";
import type { PathObject } from "@/logic/form";

export const profilePaths: PathObject<"profile", Profile> = {
  name: "profile.name",
};
