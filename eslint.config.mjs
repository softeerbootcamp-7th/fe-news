// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig(eslint.configs.recommended, prettier, {
  ignores: ['node_modules', 'dist'],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_$',
        varsIgnorePattern: '^_$',
        caughtErrorsIgnorePattern: '^_$',
        destructuredArrayIgnorePattern: '^_$',
        ignoreRestSiblings: true,
      },
    ],
  },
});
