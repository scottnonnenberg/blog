module.exports = {
  env: {
    mocha: true,
  },

  rules: {
    'max-nested-callbacks': 'off',
    'no-magic-numbers': 'off',
    'no-unused-expressions': 'off',
    'no-sync': 'off',

    'immutable/no-let': 'off',

    'import/no-extraneous-dependencies': 'off',

    'security/detect-non-literal-fs-filename': 'off',
  }
};
