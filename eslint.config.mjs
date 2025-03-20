// @ts-check
import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist'],
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,

  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_' }],
    }
  }
)
