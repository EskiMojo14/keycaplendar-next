import { render } from "@testing-library/react";
import type { ShipTaglineProps } from "./ship-tagline";
import ShipTagline from "./ship-tagline";

describe("ShipTagline", () => {
  const allNulls: ShipTaglineProps["keyset"] = {
    eta: null,
    _etaPrecision: null,
    originalEta: null,
    _originalEtaPrecision: null,
    shipDate: null,
    _shipDatePrecision: null,
    shipped: false,
  };
  const allDefined: ShipTaglineProps["keyset"] = {
    eta: "2021-10-01",
    _etaPrecision: "month",
    originalEta: "2020-10-01",
    _originalEtaPrecision: "quarter",
    shipDate: "2021-11-01",
    _shipDatePrecision: "month",
    shipped: true,
  };
  const list = document.createElement("ul");
  const container = document.body.appendChild(list);
  it("should be empty for unshipped sets with no ETA", () => {
    expect(
      render(<ShipTagline keyset={allNulls} />, { container }).container
    ).toMatchInlineSnapshot(`<ul />`);
  });
  it("should only show one ETA if original and current are the same", () => {
    expect(
      render(
        <ShipTagline
          keyset={{
            ...allNulls,
            eta: allDefined.eta,
            _etaPrecision: allDefined._etaPrecision,
            originalEta: allDefined.eta,
            _originalEtaPrecision: allDefined._etaPrecision,
          }}
        />,

        { container }
      ).container
    ).toMatchInlineSnapshot(`
      <ul>
        <li>
          Most recently estimated for
           
          October 2021
          .
        </li>
      </ul>
    `);
  });
  it("should show both ETAs if different", () => {
    expect(
      render(
        <ShipTagline
          keyset={{
            ...allNulls,
            eta: allDefined.eta,
            _etaPrecision: allDefined._etaPrecision,
            originalEta: allDefined.originalEta,
            _originalEtaPrecision: allDefined._originalEtaPrecision,
          }}
        />,

        { container }
      ).container
    ).toMatchInlineSnapshot(`
      <ul>
        <li>
          Most recently estimated for
           
          October 2021
          .
        </li>
        <li>
          Originally estimated for
           
          October 2020 to December 2020
          .
        </li>
      </ul>
    `);
  });
  it("should only show original ETA and not most recent if set is shipped", () => {
    expect(render(<ShipTagline keyset={allDefined} />, { container }).container)
      .toMatchInlineSnapshot(`
      <ul>
        <li>
          Shipped
           November 2021
          .
        </li>
        <li>
          Originally estimated for
           
          October 2020 to December 2020
          .
        </li>
      </ul>
    `);
  });
});
