import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, eslintConfigPrettier],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'warn',
    },
  },
])
