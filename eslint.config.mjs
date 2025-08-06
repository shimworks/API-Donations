import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores  } from "eslint/config";

export default defineConfig([
  globalIgnores(["node_modules", "build", "**/sequelize/", "tests"]),
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
