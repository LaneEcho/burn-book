import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig(
  tseslint.configs.recommended, // recommended
  // tseslint.configs.strict, // for opinionated rules which may also catch bugs - use later
  [
    {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      plugins: { js },
      extends: ['js/recommended'],
    },
    {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      languageOptions: { globals: globals.browser },
    },
    pluginReact.configs.flat.recommended,
    {
      rules: {
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-require-imports': 'warn',
        'no-undef': 'warn',
        'react/prop-types': 'off',
      },
    },
    {
      // Note: there should be no other properties in this object
      ignores: ['dist/*', 'webpack.config.js'],
    },
    eslintConfigPrettier,
  ]
);
