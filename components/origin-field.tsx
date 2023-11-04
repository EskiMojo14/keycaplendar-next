"use client";
import type { ComponentProps } from "react";

export default function OriginField({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorMessage,
  ...props
}: ComponentProps<"input"> & { error?: boolean; errorMessage?: string }) {
  return (
    <input
      {...props}
      type="hidden"
      value={typeof location !== "undefined" ? location.origin : undefined}
    />
  );
}
