"use client";

import { useMemo } from "react";
import { uploadProfile } from "./actions";
import Button from "@/components/govuk/button";
import ErrorMessage from "@/components/govuk/error-message";
import type { Profile } from "@/logic/drizzle/schema";
import { useFormState } from "react";

export default function SubmitForm({
  data,
}: {
  data: Omit<Profile, "createdAt">;
}) {
  const boundAction = useMemo(() => uploadProfile.bind(null, data), [data]);
  const [{ message }, formAction] = useFormState(boundAction, { message: "" });
  return (
    <form action={formAction}>
      <Button type="submit">Upload profile</Button>
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </form>
  );
}
