import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-empty-function": "error",
      // we shouldn't really be doing this, but in some places I *have* to
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/unified-signatures": "error",
      // strict rules I think are silly
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-non-null-assertion": "error",
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
  },
]);
