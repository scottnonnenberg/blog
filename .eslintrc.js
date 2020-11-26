/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint', 'filenames', 'import', 'react'],

  env: {
    commonjs: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],

  settings: {
    'import/resolver': {
      node: {
        paths: [__dirname],
      },
    },
    react: {
      version: '16.13.1',
    },
  },

  rules: {
    'filenames/match-exported': 'error',
    'filenames/no-index': 'error',
  },
};
