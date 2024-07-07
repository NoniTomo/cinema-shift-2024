module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'prettier', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/quotes": [
      "error",
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "no-trailing-spaces": [2, { "skipBlankLines": false }],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 1}],
    "object-curly-spacing": ["error", "always"],
    "comma-spacing": [2, {"before": false, "after": true}],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "space-infix-ops": ["error", { "int32Hint": false }],
    "space-after-keywords": "off",
    "keyword-spacing": [2, {"before": true, "after": true}],
    "react/jsx-indent": [2, 2, {"indentLogicalExpressions": true}],
    "arrow-body-style": ["error", "as-needed"],
    "padded-blocks": ["error", "never"],
    "semi": ["error", "never"],
    "max-len": ["error", { "code": 120 }],
    "indent": ["error", 2],
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
    }],
    "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    }
  }
}
