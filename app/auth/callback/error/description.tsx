"use client";
import { useSearchParams } from "next/navigation";
import { Body } from "@/components/govuk/typography";

export default function Description() {
  const searchParams = useSearchParams();
  return (
    <Body>
      {searchParams.get("error_description") ??
        "Unknown error occurred, please try again."}
    </Body>
  );
}
