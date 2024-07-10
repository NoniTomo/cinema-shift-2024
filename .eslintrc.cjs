module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'prettier', '@typescript-eslint', 'react-refresh'],
  rules: {
    'prettier/prettier': ['error', {
      printWidth: 100,
      singleQuote: true,
      jsxSingleQuote: true,
      trailingComma: 'none',
      semi: true,
      tabWidth: 2,
      useTabs: false,
      endOfLine: 'lf',
      arrowParens: 'always'
    }],
    'react/react-in-jsx-scope': 'off'
  }
}
