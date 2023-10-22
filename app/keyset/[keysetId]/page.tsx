import { format } from "date-fns";
import type { Metadata, Route } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { GridColumn, GridRow } from "@/components/govuk/grid";
import Link, { BackLink } from "@/components/govuk/link";
import List from "@/components/govuk/list";
import Template from "@/components/govuk/template";
import { Body, Caption, Heading } from "@/components/govuk/typography";
import ListingCard from "@/components/keysets/listing-card";
import RunTagline from "@/components/keysets/run-tagline";
import ShipTagline from "@/components/keysets/ship-tagline";
import StatusTag from "@/components/keysets/status-tag";
import { dateFormat } from "@/constants/format";
import { getKeysetById } from "@/logic/cached";
import { db } from "@/logic/drizzle";
import { getKeysetName } from "@/logic/lib/format";

const listFormat = new Intl.ListFormat();

interface Props {
  params: { keysetId: string };
}

export async function generateMetadata({
  params: { keysetId },
}: Props): Promise<Metadata> {
  const keyset = await db.query.keysets.findFirst({
    where: (keysets, { eq }) => eq(keysets.id, keysetId),
    columns: {
      profile: true,
      colorway: true,
      manufacturer: true,
      revision: true,
    },
  });
  return {
    title: keyset && getKeysetName(keyset),
  };
}

export default async function Keyset({ params: { keysetId } }: Props) {
  const keyset = await getKeysetById(keysetId);

  if (!keyset) {
    return notFound();
  }

  return (
    <Template beforeContent={<BackLink />}>
      <GridRow>
        <GridColumn size="two-thirds">
          <Heading size="l">
            {getKeysetName(keyset)}
            <Caption size="m">
              Designed by{" "}
              {listFormat.format(
                keyset.designs.map(({ designerName }) => designerName),
              )}
            </Caption>
          </Heading>
          <StatusTag status={keyset.status} />
          <div className={styles.actions}>
            <Link href={`/edit-keyset/${keysetId}`}>Edit</Link>
            <Link href={`/delete-keyset/${keysetId}`}>Delete</Link>
          </div>
        </GridColumn>
        <GridColumn size="one-third">
          <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnail}>
              <Image
                src={keyset.thumbnail.replace("keysets%2F", "thumbs%2F")}
                alt={`A preview of ${getKeysetName(keyset)}`}
                sizes="(max-width: 40.0625em) 100vw"
                fill
              />
            </div>
          </div>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn size={keyset.listings.length ? "one-third" : "full"}>
          <List variant="bullet">
            <li>
              <Link href={keyset.details as Route}>
                IC posted {format(new Date(keyset.icDate), dateFormat)}.
              </Link>
            </li>
            <RunTagline keyset={keyset} />
            <ShipTagline keyset={keyset} />
            {keyset.manufacturer && (
              <li>
                {!keyset.shipped ? "To be manufactured" : "Manufactured "} by{" "}
                {keyset.manufacturer}.
              </li>
            )}
          </List>
          {keyset.notes && (
            <>
              <Heading size="s">Notes</Heading>
              <Body size="s">{keyset.notes}</Body>
            </>
          )}
        </GridColumn>
        {keyset.listings.length ? (
          <GridColumn size="two-thirds">
            <Heading size="m">Vendors</Heading>
            {[...keyset.listings]
              .sort((a, b) => a.vendorName.localeCompare(b.vendorName))
              .map((listing) => (
                <ListingCard key={listing.vendorName} listing={listing} />
              ))}
          </GridColumn>
        ) : null}
      </GridRow>
    </Template>
  );
}
