import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import astro from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  ...typescriptEslint.configs['flat/recommended'],
  // Must come after the TypeScript configs so .astro files keep the Astro
  // parser instead of falling back to the TypeScript one.
  ...astro.configs['flat/recommended'],
  {
    // Listing the extensions here is what makes `eslint src` pick up .ts and
    // .astro files, not just .js.
    files: ['**/*.{js,mjs,cjs,ts,astro}'],

    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    // Google's official gtag snippet relies on `arguments`. Rewriting it with
    // rest parameters is not worth it here: the script sits inside an Astro
    // expression, so its braces are parsed as an expression container and the
    // body cannot be reformatted without breaking Prettier.
    // The second pattern covers the virtual files that eslint-plugin-astro
    // extracts each <script> block into; the rule reports against those, not
    // the .astro file itself.
    files: ['**/GoogleAnalytics.astro', '**/GoogleAnalytics.astro/**'],

    rules: {
      'prefer-rest-params': 'off',
    },
  },
];
