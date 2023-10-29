"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { db } from "@/logic/drizzle";
import type { FormState, ServerActionReducer } from "@/logic/form";
import { route } from "@/logic/lib/route";

export const nameStep: ServerActionReducer<FormState, FormData> = async (
  prevState,
  formData,
) => {
  "use server";
  const parsed = zfd
    .formData({
      originalName: zfd.text(),
      name: zfd.text(z.string({ required_error: "Enter a name" })),
    })
    .safeParse(formData);
  if (parsed.success) {
    const { data } = parsed;
    cookies().set("edit.profile.name", data.name);
    if (data.originalName !== data.name) {
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
    }
    return redirect(
      route(`/profiles/${encodeURIComponent(data.originalName)}/edit/summary`),
    );
  } else {
    return parsed.error.flatten();
  }
};
