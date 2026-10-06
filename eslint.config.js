import astro from "eslint-plugin-astro";
import * as astroParser from "astro-eslint-parser";
import tseslint from "typescript-eslint";

const toArray = (value) => Array.isArray(value) ? value : Object.values(value);

export default [
  {
    ignores: ["functions/**", "codegen.ts"],
  },
  ...toArray(tseslint.configs.recommended).map((config) => ({
    ...config,
    rules: {
      ...config.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  })),
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
        project: ["./tsconfig.json"],
      },
    },
    rules: {
      "astro/no-exports-from-components": "off",
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-undef": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  },
];
