"use client";

import { useMemo } from "react";
import { updateProfile } from "./actions";
import Button from "@/components/govuk/button";
import ErrorMessage from "@/components/govuk/error-message";
import type { Profile } from "@/logic/drizzle/schema";
import { useFormState } from "@/logic/react-dom.shim";

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
