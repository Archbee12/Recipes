import js from "@eslint/js";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        confirm: "readonly"
      }
    }
  },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  {
    ignores: ["**/package-lock.json"]
  }
]);
