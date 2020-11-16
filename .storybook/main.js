const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    // ---- To allow babel-plugin-remove-graphql-queries to do its magic
    //   via https://github.com/gatsbyjs/gatsby/blob/5e2b3eeb4af46a203de80fa8ce45774f9c6c3fa5/packages/babel-plugin-remove-graphql-queries/src/index.ts#L271

    process.env.NODE_ENV = 'test';

    // ---- Basic setup
    //   via https://www.gatsbyjs.org/docs/visual-testing-with-storybook/

    const { resolve } = config;

    // Typescript support!
    resolve.extensions.push('.ts', '.tsx');

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    resolve.mainFields = ['browser', 'module', 'main'];

    // Gatsby includes un-transpiled ES6 code.
    const firstRule = config.module.rules[0];
    firstRule.exclude = [/node_modules\/(?!(gatsby)\/)/];

    // Additional transpilation config
    const firstUse = firstRule.use[0];
    firstUse.loader = require.resolve('babel-loader');
    firstUse.options.presets = [['react-app', { flow: false, typescript: true }]];
    firstUse.options.plugins = [
      // For class arrow functions in Gatsby
      require.resolve('@babel/plugin-proposal-class-properties'),

      // To remove static queries from components when rendering in storybook
      [
        require.resolve('babel-plugin-remove-graphql-queries'),
        {
          staticQueryDir: 'page-data/sq/d',
        },
      ],
    ];

    // ---- Force our global CSS into storybook
    //   see require() in .storybook/preview.js, since we don't require CSS in all components

    config.module.rules.push({
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        require.resolve('css-loader'),
        require.resolve('less-loader'),
      ],
    });

    // ---- Gatsby Link references this global, and we don't want errors in our storybook console
    //   via https://stackoverflow.com/questions/58431311/has-anybody-successfully-integrated-storybook-docs-with-gatsby

    config.plugins.push(
      new webpack.ProvidePlugin({
        ___loader: require.resolve('./loader-shim.js'),
      })
    );

    // ---- Aliases to support our require search path customizations
    //   see scripts/util/setupModulePath.ts for Node-side implementation of this

    const { alias } = resolve;
    alias.css = join(__dirname, '..', 'css');
    alias.mailchimp$ = join(__dirname, '..', 'mailchimp.ts');
    alias.src = join(__dirname, '..', 'src');
    alias.test = join(__dirname, '..', 'test');

    return config;
  },
};
