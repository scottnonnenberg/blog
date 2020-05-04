/* eslint-disable import/no-commonjs */

const path = require('path');

module.exports = {
  siteMetadata: {
    blogTitle: 'Scott Nonnenberg',
    tagLine: 'A blog about software development and geekery of all kinds.',
    domain: 'https://blog.scottnonnenberg.com',
    linkPrefix: '/',

    favicon: '/favicon.ico',
    domainCDN: 'https://static.sinap.ps',

    author: {
      shortName: 'Scott',
      name: 'Scott Nonnenberg',
      email: 'scott@nonnenberg.com',
      twitter: '@scottnonnenberg',
      url: 'https://scottnonnenberg.com',
      image: 'https://static.sinap.ps/img/profile/me_2012_square_300px_full.png',
      icon: 'https://static.sinap.ps/img/profile/me_2012_square_300px.jpg',
      blurb: "Hi, I'm Scott. I've written both server and client code in many languages for many employers and clients. I've also got a bit of an unusual perspective, since I've spent time in roles outside the pure 'software developer.'",
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/pages/posts`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-highlight.js',
            options: {
              exclude: ['text'],
            },
          },
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        css: path.join(__dirname, 'css'),
        mailchimp$: path.join(__dirname, 'mailchimp.js'),
        src: path.join(__dirname, 'src'),
      },
    },
    'gatsby-plugin-less',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-no-javascript',
  ],
};
