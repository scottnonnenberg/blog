/* eslint-disable no-inline-comments, import/no-commonjs */

const path = require('path');

module.exports = { // eslint-disable-line
  extends: [
    'thehelp',
    'thehelp/react',
  ],

  plugins: [
    'thehelp',
  ],

  parser: 'babel-eslint',

  settings: {
    'import/resolver': {
      node: {
        paths: [__dirname, path.resolve(__dirname, 'test/setup')],
      },
    },
  },

  rules: {
    'immutable/no-this': 'off', // we're using full React components still

    'security/detect-object-injection': 'off', // as a client-only app, no concerns here

    'thehelp/absolute-or-current-dir': ['error', {
      exceptions: [/setupModulePath$/],
    }],
  },
};
