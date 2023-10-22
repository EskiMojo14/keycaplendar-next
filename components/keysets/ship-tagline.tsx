import type { Keyset } from "@/logic/drizzle/schema";
import { precisionFormat } from "@/logic/lib/format";

export default function ShipTagline({
  keyset: {
    shipped,
    eta,
    _etaPrecision,
    originalEta,
    _originalEtaPrecision,
    shipDate,
    _shipDatePrecision,
  },
}: {
  keyset: Pick<
    Keyset,
    | "shipped"
    | "eta"
    | "_etaPrecision"
    | "originalEta"
    | "_originalEtaPrecision"
    | "shipDate"
    | "_shipDatePrecision"
  >;
}) {
  const hasShipDate = !!(shipDate && _shipDatePrecision);
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const hasShipped = shipped || hasShipDate;
  const hasEta = !!(eta && _etaPrecision);
  const hasOriginalEta = !!(originalEta && _originalEtaPrecision);
  return (
    <>
      {hasShipped ? (
        <li>
          Shipped
          {hasShipDate
            ? " " + precisionFormat(new Date(shipDate), _shipDatePrecision)
            : null}
          .
        </li>
      ) : null}
      {hasOriginalEta ? (
        <li>
          Originally estimated for{" "}
          {precisionFormat(new Date(originalEta), _originalEtaPrecision)}.
        </li>
      ) : null}
      {(!hasOriginalEta || !hasShipped) && hasEta ? (
        <li>
          Most recently estimated for{" "}
          {precisionFormat(new Date(eta), _etaPrecision)}.
        </li>
      ) : null}
    </>
  );
}
