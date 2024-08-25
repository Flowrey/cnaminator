import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["test-src/", "coverage/"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
];
