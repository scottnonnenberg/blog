/* eslint-disable import/no-commonjs, no-magic-numbers, no-inline-comments */

// Some guidelines for this file
//   - all rules from all plugins must be included ('npm run find-missing-eslint-rules')
//   - all 'off' rules must have a reason mentioned
//   - no configuration should be included for any rule using the default settings
//   - rules are in alphabetical order: first core eslint, then plugins sorted by name
//   - always use 'error' or 'off' instead of 0 and 2. Numbers are for real config values
//   - no warnings. either disallow it completely, or don't worry about it

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  settings: {
    'import/resolver': {
      node: {
        paths: [__dirname],
      },
    },
    'import/ignore': [
      'node_modules',
      '\\.json$',
      '\\.(scss|less|css)$',
    ],
    'react': {
      version: '15.0',
    },
  },

  parser: 'babel-eslint',
  plugins: [
    'bdd',
    'chai-expect',
    'import',
    'immutable',
    'jsx-a11y',
    'no-loops',
    'react',
    'security',
    'thehelp',
  ],

  rules: {
    'accessor-pairs': 'error',
    'array-bracket-spacing': 'error',
    'array-callback-return': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    'brace-style': ['error', 'stroustrup'],
    'callback-return': 'error',
    'camelcase': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'complexity': ['error', { max: 8 }],
    'computed-property-spacing': 'error',
    'consistent-return': 'off', // conflicts with notate/breadcrumbs
    'consistent-this': ['error', '_this'],
    'constructor-super': 'error',
    'curly': 'error',
    'default-case': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eol-last': 'error',
    'eqeqeq': ['error', 'allow-null'],
    'func-names': 'error',
    'func-style': ['error', 'declaration'],
    'generator-star-spacing': 'error',
    'global-require': 'error',
    'guard-for-in': 'error',
    'handle-callback-err': ['error', '^.*(e|E)rr'],
    // this set of three is interesting, but no immediate ideas for how to use
    // http://eslint.org/docs/rules/id-blacklist
    'id-blacklist': 'off',
    // http://eslint.org/docs/rules/id-length
    'id-length': 'off',
    // http://eslint.org/docs/rules/id-match
    'id-match': 'off',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'init-declarations': 'off', // a bad option; doesn't catch dynamic variable updates
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'linebreak-style': 'error',
    'lines-around-comment': 'off', // too restricting; conflicts with eslint-disable
    'max-depth': ['error', { max: 3 }],
    'max-len': ['error', 90, 2, {
      ignoreUrls: true,
      ignoreComments: true,
    }],
    'max-nested-callbacks': ['error', { max: 3 }],
    'max-params': 'error',
    'max-statements': ['error', { max: 12 }],
    'max-statements-per-line': 'error',
    'new-cap': 'error',
    'new-parens': 'error',
    'newline-after-var': 'off', // I'm not consistent enough on this
    'newline-before-return': 'off', // Also not consistent enough here
    'newline-per-chained-call': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-catch-shadow': 'error',
    'no-class-assign': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-confusing-arrow': 'error',
    'no-console': 'off', // maybe for other projects; we have command-line apps
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    'no-continue': 'off', // maybe for other projects; we use for loops
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-div-regex': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty': 'error',
    'no-empty-character-class': 'error',
    'no-empty-function': ['error', {
      allow: [
        'arrowFunctions',
      ],
    }],
    'no-empty-pattern': 'error',
    'no-eq-null': 'off', // this space already covered by eqeqeq
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'off', // all of my code is in modules anyway
    'no-implied-eval': 'error',
    'no-inline-comments': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-invalid-this': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-magic-numbers': ['error', {
      ignore: [-2, -1, 0, 1, 2],
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: false,
    }],
    'no-mixed-requires': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-native-reassign': 'error',
    'no-negated-condition': 'off', // no, I like breaking out of functions early
    'no-negated-in-lhs': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-path-concat': 'error',
    'no-plusplus': 'error',
    'no-process-env': 'error',
    'no-process-exit': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    // will have to think a little further about this set
    // http://eslint.org/docs/rules/no-restricted-globals
    'no-restricted-globals': 'off',
    // http://eslint.org/docs/rules/no-restricted-imports
    'no-restricted-imports': 'off',
    // http://eslint.org/docs/rules/no-restricted-modules
    'no-restricted-modules': 'off',
    // http://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      'DebuggerStatement',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-return-assign': 'error',
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': ['error', {
      allow: ['err'],
    }],
    'no-shadow-restricted-names': 'error',
    'no-spaced-func': 'error',
    'no-sparse-arrays': 'error',
    'no-sync': 'error',
    'no-ternary': 'off', // I do use it, but I try not to do it often
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-underscore-dangle': 'off', // may want to turn it on with allowAfterThis?
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': ['error', { vars: 'local' }],
    'no-use-before-define': 'off', // I use function declaration hoisting for readability
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-var': 'error', // using only const and let!
    'no-void': 'error',
    'no-warning-comments': ['error', {
      terms: ['todo'],
      location: 'start',
    }],
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'off', // wish there was a limit of two keys
    'object-shorthand': 'error',
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'error',
    'operator-linebreak': ['error', 'before', {
      overrides: {
        '=': 'after',
      },
    }],
    'padded-blocks': ['error', 'never'],
    'prefer-arrow-callback': ['error', {
      allowNamedFunctions: true,
    }],
    'prefer-const': 'error',
    // http://eslint.org/docs/rules/prefer-reflect
    'prefer-reflect': 'off', // don't think we want to move to these new methods yet
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': ['error', 'single', {
      avoidEscape: true,
    }],
    'radix': 'error',
    'require-jsdoc': 'off', // when I decide how to do docs
    'require-yield': 'error',
    'semi': 'error',
    'semi-spacing': 'error',
    'sort-imports': 'off',
    'sort-vars': 'off', // relying on the import plugin for imports ordering
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'strict': 'error',
    'template-curly-spacing': 'error',
    'use-isnan': 'error',
    'valid-jsdoc': 'off', // when I decide how to do docs
    'valid-typeof': 'error',
    'vars-on-top': 'error',
    'wrap-iife': 'error',
    'wrap-regex': 'error',
    'yield-star-spacing': 'error',
    'yoda': 'error',

    'bdd/focus': 'error',
    'bdd/exclude': 'error',

    'chai-expect/missing-assertion': 'error',
    'chai-expect/no-inner-compare': 'error',
    'chai-expect/terminating-properties': 'error',

    'import/default': 'off', // breaks on import of package.json
    'import/export': 'error',
    'import/extensions': ['error', {
      json: 'always',
      js: 'never',
    }],
    'import/imports-first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'off', // breaks for require() https://github.com/benmosher/eslint-plugin-import/pull/326
    'import/no-amd': 'error',
    'import/no-commonjs': 'error',
    // I don't use jsdoc right now, and this rule still under active development
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
    'import/no-deprecated': 'off',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-namespace': 'off', // I'm okay with using '* as foo' to pull in everything
    'import/no-nodejs-modules': 'off', // We're definitely using the builtins
    'import/no-unresolved': ['error', { commonjs: true }],
    // documented default is not correct, specifying manually
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md#options
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    }],
    'import/prefer-default-export': 'error',

    'immutable/no-let': 'error',
    'immutable/no-mutation': 'error',
    'immutable/no-this': 'off', // we're still using React

    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/href-no-hash': 'error',
    'jsx-a11y/img-has-alt': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/label-has-for': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-onchange': 'error',
    'jsx-a11y/onclick-has-focus': 'error',
    'jsx-a11y/onclick-has-role': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',

    'no-loops/no-loops': 'error',

    'react/display-name': 'error',
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'react/jsx-boolean-value': 'error',
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-curly-spacing': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-handler-names': 'off', // a little too limiting for me
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': 'off', // I reserve the right to a single-line tag
    'react/jsx-no-bind': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-no-literals': 'off', // egh, no need.
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-props': 'off', // alphabetical is too limiting
    'react/jsx-sort-prop-types': 'off', // alphabetical is too limiting
    'react/jsx-space-before-closing': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-danger': 'off', // I do it sometimes
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-set-state': 'error',
    'react/no-string-refs': 'error',
    'react/no-unknown-property': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-extension': 'off', // Nope, using JSX in plain .js files
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-prop-types': 'off', // alphabetical is too limiting
    'react/sort-comp': ['error', {
      order: [
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render',
      ],
    }],
    'react/wrap-multilines': 'off', // I use raw multilines, because it still works

    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-new-buffer': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-object-injection': 'off', // Will turn on when I eliminate lookups
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error',
    'security/detect-unsafe-regex': 'error',

    'thehelp/absolute-or-current-dir': 'error',
  },
};
