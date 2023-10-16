"use client";
import { DisplayCard } from "./display-card";
import { DisplayTable } from "./display-table";
import type { OverviewKeyset } from "@/logic/drizzle";
import type { Design } from "@/logic/drizzle/schema";
import { useMediaQuery } from "@/logic/hooks/use-media-query";

export default function KeysetList({
  keysets,
}: {
  keysets: Array<OverviewKeyset & { designs: Array<Design> }>;
}) {
  const largeScreen = useMediaQuery("(min-width: 48.0625em)");
  return largeScreen ? (
    <DisplayTable data={keysets} />
  ) : (
    keysets.map((keyset) => <DisplayCard key={keyset.id} keyset={keyset} />)
  );
}
