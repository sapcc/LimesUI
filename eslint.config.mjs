import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import jest from "eslint-plugin-jest";
export default [
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: [
      "**/*.test.js",
      "**/*.config.js",
      "__tests__/**",
      "test/__mocks__/**",
    ],
    languageOptions: { sourceType: "module" },
  },
  ...fixupConfigRules(pluginReactConfig),
  // ######### JEST ##########
  {
    files: ["__tests__/**", "**/*.test.js", "__mocks__/**"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
      "jest/no-disabled-tests": "off",
    },
  },
  {
    rules: {
      // expects in jest.fn() functions are valid and allowed with this rule.
      "jest/no-standalone-expect": 0,
      // avoid defining prop types in every component.
      "react/prop-types": 0,
      // ignore unused vars starting with _
      "no-unused-vars": [
        "error",
        {
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: [
      "**/build/*",
      "**/dist/*",
      "**/vite.config.ts.timestamp-*",
      "coverage/*",
      "cypress.config.js",
      "helpers/*",
      "esbuild.config.js",
      "tailwind.config.js"
    ],
  },
];
