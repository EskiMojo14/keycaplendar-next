/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["@typescript-eslint", "mui-path-imports", "lodash"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@next/next/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "mui-path-imports/mui-path-imports": "error",
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@mui/material",
            allowTypeImports: true,
            message:
              "Next dislikes this barrel file for some reason, use individual imports",
          },
          {
            name: "@mui/material-next",
            allowTypeImports: true,
            message:
              "Next dislikes this barrel file for some reason, use individual imports",
          },
        ],
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          orderImportKind: "asc",
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    "lodash/import-scope": "error",
  },
};
