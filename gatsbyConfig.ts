import { join } from 'path';
import { execSync } from 'child_process';

import type { GatsbyConfig } from 'gatsby';

const gatsbyConfig = {
  siteMetadata: {
    blogTitle: 'Scott Nonnenberg',
    tagLine: 'A blog about software development and geekery of all kinds.',
    domain: 'https://blog.scottnonnenberg.com',

    favicon: '/favicon.ico',

    github: 'https://github.com/scottnonnenberg/blog',
    currentCommit: execSync('git rev-parse HEAD').toString().trim(),

    author: {
      shortName: 'Scott',
      name: 'Scott Nonnenberg',
      email: 'scott@nonnenberg.com',
      twitter: '@scottnonnenberg',
      url: 'https://scottnonnenberg.com',
      image: 'https://cdn.scottnonnenberg.com/img/profile/me_2012_square_300px_full.png',
      blurb:
        "Hi, I'm Scott. I've written both server and client code in many languages for many employers and clients. I've also got a bit of an unusual perspective, since I've spent time in roles outside the pure 'software developer.'",
    },
  },
  plugins: [
    // These are the two places we want Gatsby to look for non-code assets
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
        name: 'assets',
      },
    },

    // This makes our markdown and resultant HTML available in GraphQL
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        pedantic: false,
        plugins: [
          // Code highlighting
          {
            resolve: 'gatsby-remark-highlight.js',
            options: {
              exclude: ['text'],
            },
          },

          // Little link icons next to headers to make it easy to copy a link to that
          //   section of the page.
          'gatsby-remark-autolink-headers',

          // A blurred placeholder baked into the HTML for initial load.
          {
            resolve: 'gatsby-remark-images',
            options: {
              disableBgImageOnAlpha: true,
            },
          },

          // If we link to a file in a post, we want that file availabe.
          //   Note: Default excluded file extensions: png, jpg, jpeg, bmp, tiff
          'gatsby-remark-copy-linked-files',

          // Automatically replace plain quotes with smart quotes when translating
          //   markdwon to HTML.
          'gatsby-remark-smartypants',
        ],
      },
    },

    // We want all the syntactic niceties of sass.
    'gatsby-plugin-sass',

    // We want to generate on-disk d.ts files for all of our css module files.
    'gatsby-plugin-dts-css-modules',

    // Allows advanced preprocessing of images - creating multiple sizes, the small
    //   blurred preview images, etc.
    'gatsby-transformer-sharp',

    // The core provider of sharp, the image processing utility.
    'gatsby-plugin-sharp',

    // Allows us to refer to files with an absolute path on the client side.
    //   See also .storybook/main.js, and scripts/util/setupModulePath.ts for Node.js
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        css: join(__dirname, 'css'),
        mailchimp$: join(__dirname, 'mailchimp.ts'),
        src: join(__dirname, 'src'),
      },
    },

    // Minifies our class names in production. In development, classnames are descriptive,
    //   like 'HTMLPreview-module--title--3dwpy'. In production, it's just 'b'.
    'gatsby-plugin-mini-css-class-name',

    // Simple plugin to allow us to put lang=en into our top-level <html> tag. Necessary
    //   for a 100% Lighthouse score.
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },

    // Allows us to set top-level page attributes during the server-side rendering stage.
    'gatsby-plugin-react-helmet',

    // Detailed analysis of what ends up in our client-side Javascript files.
    'gatsby-plugin-webpack-bundle-analyser-v2',

    // Catch post/preview links and keep navigation within SPA. For performance!
    'gatsby-plugin-catch-links',

    // Turns off JavaScript for the built site. You still get Javascript in development.
    // 'gatsby-plugin-no-javascript',

    // Further optimizations for a no-Javascript world, giving us a separate CSS file and
    //   removing further unneeded elements from our built files.
    // {
    //   resolve: 'gatsby-plugin-no-javascript-utils',
    //   options: {
    //     // We're already doing this with gatsby-plugin-no-javascript
    //     noScript: true,
    //     noSourcemaps: true,
    //     removeGeneratorTag: false,
    //     removeReactHelmetAttrs: true,
    //     noInlineStyles: true,
    //     removeGatsbyAnnouncer: true,
    //   },
    // },
  ],
};

export default gatsbyConfig;

// Not used, except to double-check that our config matches what Gatsby expects
export const typecheck: GatsbyConfig = gatsbyConfig;
