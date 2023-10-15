import { addDays, format } from "date-fns";
import type { Status } from "../drizzle/schema";
import { compareStatus, getKeysetName, getKeysetRun } from "./format";
import { dateFormat } from "@/constants/format";

describe("logic / lib / format", () => {
  describe("getKeysetName", () => {
    it("concatenates profile and colorway", () => {
      expect(
        getKeysetName({
          profile: "KAT",
          colorway: "Lich",
          manufacturer: "Keyreative",
        }),
      ).toBe("KAT Lich");
      expect(
        getKeysetName({
          profile: "SA R3",
          colorway: "Bliss",
          manufacturer: "Signature Plastics",
        }),
      ).toBe("SA R3 Bliss");
    });
    it("uses manufacturer if available for Cherry profile", () => {
      expect(
        getKeysetName({
          profile: "Cherry",
          colorway: "Café",
          manufacturer: "GMK",
        }),
      ).toBe("GMK Café");
      expect(
        getKeysetName({
          profile: "Cherry",
          colorway: "Café",
          manufacturer: null,
        }),
      ).toBe("Cherry Café");
    });
  });
  describe("getKeysetRun", () => {
    it("uses past tense for closed sets", () => {
      const gbLaunch = addDays(new Date(), -30);
      const gbEnd = addDays(new Date(), -2);
      expect(
        getKeysetRun({
          status: "closed",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: gbEnd.toISOString(),
        }),
      ).toBe(
        `Ran from ${format(gbLaunch, dateFormat)} to ${format(
          gbEnd,
          dateFormat,
        )}.`,
      );
    });
    it("uses current tense for ongoing sets", () => {
      const gbLaunch = addDays(new Date(), -20);
      const gbEnd = addDays(new Date(), 5);
      expect(
        getKeysetRun({
          status: "ongoing",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: gbEnd.toISOString(),
        }),
      ).toBe(
        `Running from ${format(gbLaunch, dateFormat)} to ${format(
          gbEnd,
          dateFormat,
        )}.`,
      );

      expect(
        getKeysetRun({
          status: "ongoing",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: null, // GB end can be unknown
        }),
      ).toBe(`Running from ${format(gbLaunch, dateFormat)}.`);
    });
    it("uses future tense for closed sets", () => {
      const gbLaunch = addDays(new Date(), 2);
      const gbEnd = addDays(new Date(), 30);
      expect(
        getKeysetRun({
          status: "future",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: gbEnd.toISOString(),
        }),
      ).toBe(
        `Runs from ${format(gbLaunch, dateFormat)} to ${format(
          gbEnd,
          dateFormat,
        )}.`,
      );
      expect(
        getKeysetRun({
          status: "future",
          gbLaunch: gbLaunch.toISOString(),
          gbEnd: null,
        }),
      ).toBe(`Runs from ${format(gbLaunch, dateFormat)}.`);
    });
    it("returns undefined for sets still in IC", () => {
      expect(
        getKeysetRun({
          status: "ic",
          gbLaunch: null,
          gbEnd: null,
        }),
      ).toBe(undefined);
    });
  });
  describe("compareStatus", () => {
    it("sorts statuses correctly", () => {
      const toSort: Array<Status> = ["closed", "ongoing", "future", "ic"];
      expect(toSort.sort(compareStatus)).toEqual([
        "ic",
        "future",
        "ongoing",
        "closed",
      ]);
    });
  });
});
