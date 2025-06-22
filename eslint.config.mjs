import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "prefer-arrow-callback": "error",
      "func-style": ["error", "expression"],
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": ["error", "always"],
      "prefer-template": "error",
      "no-useless-concat": "error",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-duplicate-imports": "error",
      eqeqeq: ["error", "always"],
    },
  },
];

export default eslintConfig;
