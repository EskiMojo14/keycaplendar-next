import type { Status } from "../drizzle/schema";
import { compareStatus, getKeysetName } from "./format";

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
});
