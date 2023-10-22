import type { Status } from "../drizzle/schema";
import { compareStatus, getKeysetName, precisionFormat } from "./format";

describe("logic / lib / format", () => {
  describe("getKeysetName", () => {
    it("concatenates profile and colorway", () => {
      expect(
        getKeysetName({
          profile: "KAT",
          colorway: "Lich",
          manufacturer: "Keyreative",
          revision: null,
        }),
      ).toBe("KAT Lich");
      expect(
        getKeysetName({
          profile: "SA R3",
          colorway: "Bliss",
          manufacturer: "Signature Plastics",
          revision: null,
        }),
      ).toBe("SA R3 Bliss");
    });
    it("uses manufacturer if available for Cherry profile", () => {
      expect(
        getKeysetName({
          profile: "Cherry",
          colorway: "Café",
          manufacturer: "GMK",
          revision: null,
        }),
      ).toBe("GMK Café");
      expect(
        getKeysetName({
          profile: "Cherry",
          colorway: "Café",
          manufacturer: null,
          revision: null,
        }),
      ).toBe("Cherry Café");
    });
    it("includes revision if provided", () => {
      expect(
        getKeysetName({
          profile: "KAT",
          colorway: "Lich",
          manufacturer: "Keyreative",
          revision: 2,
        }),
      ).toBe("KAT Lich r2");
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
  describe("precisionFormat", () => {
    it("uses specific format for quarter", () => {
      expect(precisionFormat(0, "quarter")).toMatchInlineSnapshot(
        `"January 1970 to March 1970"`,
      );
      expect(
        precisionFormat(new Date(1990, 6), "quarter"),
      ).toMatchInlineSnapshot(`"July 1990 to September 1990"`);
    });
    it("uses constant format for month", () => {
      expect(precisionFormat(0, "month")).toBe("January 1970");
      expect(precisionFormat(new Date(1990, 6), "month")).toBe("July 1990");
    });
    it("defaults to dateFormat for unknown precisions", () => {
      expect(precisionFormat(0, "milliseconds")).toBe("1 January 1970");
    });
  });
});
