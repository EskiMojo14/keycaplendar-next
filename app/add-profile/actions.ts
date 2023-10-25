"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { profilePaths } from "@/constants/cookies";
import { db } from "@/logic/drizzle";
import type { Profile } from "@/logic/drizzle/schema";
import type { ServerActionReducer } from "@/logic/form";

const formSchema = zfd.formData({
  name: zfd.text(z.string({ required_error: "Enter a name" })),
});

export type NameState = Partial<z.typeToFlattenedError<Profile>>;

export const nameStep: ServerActionReducer<NameState, FormData> = async (
  prevState,
  formData,
) => {
  "use server";
  const parsed = formSchema.safeParse(formData);
  if (parsed.success) {
    const { data } = parsed;
    cookies().set(profilePaths.name, data.name);
    const sameName = await db.query.profiles.findFirst({
      where: (profiles, { eq }) => eq(profiles.name, data.name),
      columns: {
        name: true,
      },
    });
    if (sameName) {
      return {
        formErrors: ["A profile with this name already exists"],
        fieldErrors: {},
      };
    }
    return redirect("/add-profile/summary");
  } else {
    return parsed.error.flatten() as NameState;
  }
};
