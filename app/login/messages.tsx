"use client";
import { useSearchParams } from "next/navigation";
import ErrorMessage from "@/components/govuk/error-message";
import { Body } from "@/components/govuk/typography";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {message && <Body size="m">{message}</Body>}
    </>
  );
}
