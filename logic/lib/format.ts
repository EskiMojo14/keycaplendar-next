import type { Keyset } from "../drizzle/schema";

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
