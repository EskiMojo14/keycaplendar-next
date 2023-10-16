import { noopTaggedTemplate } from "./utils";

describe("logic / lib / utils", () => {
  describe("noopTaggedTemplate", () => {
    it("returns input without changes", () => {
      const css = noopTaggedTemplate;
      expect(css`
        .selector {
          background: transparent;
        }
      `).toMatchInlineSnapshot(`
        "
                .selector {
                  background: transparent;
                }
              "
      `);
    });
  });
});
