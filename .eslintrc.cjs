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
  files: ['*.ts'],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'promise/always-return': ['error', { ignoreLastCallback: true }],
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
