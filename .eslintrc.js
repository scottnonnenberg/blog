module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },

  parser: 'babel-eslint',
  plugins: [
    'react'
  ],
  extends: [
    'airbnb'
  ],

  rules: {
    strict: ['off'],
    'no-console': ['off'],
    'default-case': ['off'],
    'no-param-reassign': ['off'],
    'no-use-before-define': ['off'],
    'consistent-return': ['off'],

    'react/prefer-stateless-function': ['off'], // might reconsider this
    'react/wrap-multilines': ['off'],

    indent: ['error', 2, { SwitchCase: 1}],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'brace-style': ['error', 'stroustrup'],
    'space-before-function-paren': ['error', 'never'],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'func-names': ['error']
  }
};
