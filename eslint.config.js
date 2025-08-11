import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from '@eslint/js'

export default defineConfig([
  {
    ignores: ['dist'],
    extends: [js.configs.recommended, eslintConfigPrettier],
    files: ['**/*.js'],
    rules: {
      'no-console': 'warn',
    },
  },
])
