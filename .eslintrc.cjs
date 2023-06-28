module.exports = {
  // ...
  extends: [
    // ...
    "plugin:astro/recommended",
  ],
  "parserOptions": {
      "sourceType": "module",
      "ecmaVersion": "latest"
  },
  // ...
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      // Define the configuration for `.ts` files.
      files: ["*.ts"],
      parserOptions: {
        // Parse the TypeScript using the TypeScript parser.
        parser: "@typescript-eslint/parser",
      },
      // Extend the TypeScript rules.
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        // Disable ESLint rules that would conflict with prettier.
      }
    }
    // ...
  ],
}