"use server";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/logic/drizzle";
import { profiles, type Profile } from "@/logic/drizzle/schema";
import type { ServerActionReducer } from "@/logic/form";
import { route } from "@/logic/lib/route";

export const updateProfile: ServerActionReducer<
  { message: string },
  never,
  [data: Partial<Omit<Profile, "createdAt">>, originalName: string]
> = async (data, originalName) => {
  const cookieStore = cookies();
  try {
    await db.update(profiles).set(data).where(eq(profiles.name, originalName));
    cookieStore.delete("edit.profile.name");
  } catch (e) {
    console.error("Failed to upload profile", e);
    return { message: "Failed to upload profile" };
  }
  return redirect(route(`/profiles/${data.name}/edit/confirm`));
};
