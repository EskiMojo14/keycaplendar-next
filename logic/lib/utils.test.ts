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
      const html = noopTaggedTemplate;
      expect(html`
        <body>
          <h1>Cool!</h1>
        </body>
      `).toMatchInlineSnapshot(`
        "
                <body>
                  <h1>Cool!</h1>
                </body>
              "
      `);
    });
  });
});
