module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    node: true,
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'func-names': 'off',
    'import/first': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-lone-blocks': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'import/prefer-default-export': 'off',
  },
};
