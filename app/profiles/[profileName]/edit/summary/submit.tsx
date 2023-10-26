"use client";

import { useMemo } from "react";
import { useFormState } from "react-dom";
import { updateProfile } from "./actions";
import Button from "@/components/govuk/button";
import ErrorMessage from "@/components/govuk/error-message";
import type { Profile } from "@/logic/drizzle/schema";

export default function SubmitForm({
  data,
  originalName,
}: {
  data: Partial<Omit<Profile, "createdAt">>;
  originalName: string;
}) {
  const boundAction = useMemo(
    () => updateProfile.bind(null, data, originalName),
    [data],
  );
  const [{ message }, formAction] = useFormState(boundAction, { message: "" });
  return (
    <form action={formAction}>
      <Button type="submit">Upload profile</Button>
      {message && <ErrorMessage>{message}</ErrorMessage>}
    </form>
  );
}
