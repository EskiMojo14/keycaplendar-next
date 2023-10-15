import type { Status } from "../drizzle/schema";
import { compareStatus } from "./format";

describe("logic / lib / format", () => {
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
