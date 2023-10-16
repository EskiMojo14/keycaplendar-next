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
