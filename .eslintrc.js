/*
 * @Author: xiaochi
 * @Date: 2020-09-07 15:48:33
 * @LastModifiedBy: xiaochi
 * @LastEditTime: 2020-12-29 11:19:06
 * @Description: Description
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint-config-alloy/react',
    'eslint-config-alloy/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:jsx-control-statements/recommended',
  ],
  plugins: ['markdown', 'jsx-control-statements', 'react-hooks', 'jest'],
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/interface-name-prefix': 'always',
    '@typescript-eslint/no-triple-slash-reference': {
      path: 'always',
      types: 'always',
      lib: 'always',
    },
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
    indent: 'off',
    'max-nested-callbacks': ['error', 5],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-find-dom-node': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': ['error', 2],
    'jsx-control-statements/jsx-use-if-tag': 'off',
    'no-undefined': 'off',
    'spaced-comment': 'warn',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.8.22',
    },
  },
  env: {
    'jest/globals': true,
    jquery: true,
  },
  globals: {
    For: false,
    If: false,
    Choose: false,
    When: false,
    Otherwise: false,
  },
};
