const stylistic = require("@stylistic/eslint-plugin");
const typescript = require("@typescript-eslint/parser");

module.exports = [
  { // Apply to `cjs`, `.mjs` and `.js` files.
    files: ["**/*.?([cm])js?(x)"]
  },
  { // Apply to `cts`, `.mts` and `.ts` files.
    files: ["**/*.?([cm])ts?(x)"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        sourceType: "module"
      }
    }
  },
  {
    languageOptions: {
      parser: typescript
    },
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/space-before-function-paren": ["error", "always"]
    }
  }
];