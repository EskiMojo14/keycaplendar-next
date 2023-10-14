"use client";
import { useRouter } from "next/navigation";
import Button from "./govuk/button";

export default function CancelButton() {
  const router = useRouter();
  return (
    <Button
      color="secondary"
      onClick={() => {
        router.back();
      }}
      type="button"
    >
      Cancel
    </Button>
  );
}
