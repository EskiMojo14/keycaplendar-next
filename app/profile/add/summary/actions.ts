"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { profilePaths } from "@/constants/cookies";
import { db } from "@/logic/drizzle";
import { profiles, type Profile } from "@/logic/drizzle/schema";
import type { ServerActionReducer } from "@/logic/form";

export const uploadProfile: ServerActionReducer<
  { message: string },
  never,
  [data: Omit<Profile, "createdAt">]
> = async (data) => {
  const cookieStore = cookies();
  try {
    await db.insert(profiles).values(data);
    cookieStore.delete(profilePaths.name);
  } catch (e) {
    console.error("Failed to upload profile", e);
    return { message: "Failed to upload profile" };
  }
  return redirect(`/profile/add/confirm?name=${data.name}`);
};
