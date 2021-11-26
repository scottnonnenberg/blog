module.exports = {
  extends: [
    '@scottnonnenberg/eslint-config-thehelp',
    '@scottnonnenberg/eslint-config-thehelp/react',
    '@scottnonnenberg/eslint-config-thehelp/typescript',
    '@scottnonnenberg/eslint-config-thehelp/prettier',
    '@scottnonnenberg/eslint-config-thehelp/prettierReact',
    '@scottnonnenberg/eslint-config-thehelp/prettierTypescript',
  ],

  parserOptions: {
    project: ['./tsconfig.json'],
  },

  settings: {
    'import/resolver': {
      node: {
        paths: [__dirname],
      },
      typescript: {
        project: ['./tsconfig.json'],
      },
    },
    react: {
      version: '16.13.1',
    },
  },

  rules: {
    // This is an odd project, in that the vast majority of dependencies are not 'production'
    'import/no-extraneous-dependencies': 'off',

    // We're not handling user data in this project
    'security/detect-object-injection': 'off',

    // The `graphql` tag function type definition returns void, but we assign it to
    //   variables and pass it to hooks
    '@typescript-eslint/no-confusing-void-expression': 'off',

    // These two need to be changed together
    'import/no-internal-modules': 'off',
    '@scottnonnenberg/thehelp/absolute-or-current-dir': [
      'error',
      { exceptions: ['setupModulePath'] },
    ],
  },
};
