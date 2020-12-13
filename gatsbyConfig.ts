import { join } from 'path';

import { GatsbyConfig } from 'gatsby';

const gatsbyConfig = {
  siteMetadata: {
    blogTitle: 'Scott Nonnenberg',
    tagLine: 'A blog about software development and geekery of all kinds.',
    domain: 'https://blog.scottnonnenberg.com',

    favicon: '/favicon.ico',

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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        pedantic: false,
        plugins: [
          {
            resolve: 'gatsby-remark-highlight.js',
            options: {
              exclude: ['text'],
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              disableBgImageOnAlpha: true,
            },
          },
          // Default excluded file extensions: png, jpg, jpeg, bmp, tiff
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        css: join(__dirname, 'css'),
        mailchimp$: join(__dirname, 'mailchimp.ts'),
        src: join(__dirname, 'src'),
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-less',
    'gatsby-plugin-mini-css-class-name',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-no-javascript',
    {
      resolve: 'gatsby-plugin-no-javascript-utils',
      options: {
        noSourcemaps: true,
        removeGeneratorTag: false,
        removeReactHelmetAttrs: true,
        noInlineStyles: true,
        removeGatsbyAnnouncer: true,
        // Note: this one causes the build to crash if you turn it on
        removeFocusWrapper: false,
        removePreloadLinks: true,
      },
    },
  ],
};

export default gatsbyConfig;

// Not used, except to double-check that our config matches what Gatsby expects
export const typecheck: GatsbyConfig = gatsbyConfig;
