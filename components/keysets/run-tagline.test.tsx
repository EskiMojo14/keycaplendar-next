import type { MatcherFunction } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { addDays, format } from "date-fns";
import RunTagline from "./run-tagline";
import { dateFormat } from "@/constants/format";

describe("RunTagline", () => {
  const matchText =
    (textContent: string): MatcherFunction =>
    (_, el) =>
      el?.tagName.toLowerCase() === "div" && el.textContent === textContent;
  it("uses past tense for closed sets", () => {
    const gbLaunch = addDays(new Date(), -30);
    const gbEnd = addDays(new Date(), -2);
    render(
      <RunTagline
        keyset={{
          status: "closed",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: gbEnd.toISOString(),
        }}
      />,
    );
    expect(
      screen.getByText(
        matchText(
          `Ran from ${format(gbLaunch, dateFormat)} to ${format(
            gbEnd,
            dateFormat,
          )}.`,
        ),
      ),
    ).toBeInTheDocument();
  });
  it("uses current tense for ongoing sets", () => {
    const gbLaunch = addDays(new Date(), -20);
    const gbEnd = addDays(new Date(), 5);
    render(
      <RunTagline
        keyset={{
          status: "ongoing",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: gbEnd.toISOString(),
        }}
      />,
    );
    expect(
      screen.getByText(
        matchText(
          `Running from ${format(gbLaunch, dateFormat)} to ${format(
            gbEnd,
            dateFormat,
          )}.`,
        ),
      ),
    ).toBeInTheDocument();

    render(
      <RunTagline
        keyset={{
          status: "ongoing",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: null, // end can be unknown
        }}
      />,
    );
    expect(
      screen.getByText(
        matchText(`Running from ${format(gbLaunch, dateFormat)}.`),
      ),
    ).toBeInTheDocument();
  });
  it("uses future tense for future sets", () => {
    const gbLaunch = addDays(new Date(), 2);
    const gbEnd = addDays(new Date(), 30);
    render(
      <RunTagline
        keyset={{
          status: "future",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: gbEnd.toISOString(),
        }}
      />,
    );
    expect(
      screen.getByText(
        matchText(
          `Runs from ${format(gbLaunch, dateFormat)} to ${format(
            gbEnd,
            dateFormat,
          )}.`,
        ),
      ),
    ).toBeInTheDocument();

    render(
      <RunTagline
        keyset={{
          status: "future",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: null, // end can be unknown
        }}
      />,
    );
    expect(
      screen.getByText(matchText(`Runs from ${format(gbLaunch, dateFormat)}.`)),
    ).toBeInTheDocument();
  });
  it("will not render for IC sets", () => {
    const { container } = render(
      <RunTagline keyset={{ status: "ic", gbLaunch: null, gbEnd: null }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
