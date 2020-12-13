import { writeFileSync } from 'fs';
import { copy } from 'fs-extra';
import { join, relative, resolve } from 'path';
import { compact, filter, flatten, get, includes, sortBy, uniq } from 'lodash';

import getPreFoldContent from 'src/util/getPreFoldContent';
import fixLocalLinks from 'src/util/fixLocalLinks';
import appendToLastTextBlock from 'src/util/appendToLastTextBlock';

import { Feed } from 'feed';
import moment from 'moment';

import { BuildArgs, CreateNodeArgs, CreatePagesArgs, Node } from 'gatsby';

import { AllDataQueryType, AllPostsQueryType } from 'src/types/queries';

type RawAllPostsQueryType = {
  errors?: Array<Error>;
  data?: AllPostsQueryType;
};

type RawAllDataType = {
  errors?: Array<Error>;
  data?: AllDataQueryType;
};

// We would like to use the official GatsbyNode type here, but the onCreateNode typings
//   are forcing the node parameter type to {}, causing problems for us when we give it
//   a real type.
// https://github.com/gatsbyjs/gatsby/blob/54e3d7ae24924215ae9e0976b89e185159d9e38f/packages/gatsby/index.d.ts#L284-L288

type NodeType = Node & {
  frontmatter?: {
    path: string;
  };
};

const gatsbyNode = {
  createPages: async ({ graphql, actions }: CreatePagesArgs): Promise<void> => {
    const { createPage } = actions;

    const blogPostPage = resolve('./src/dynamic-pages/post.tsx');
    const tagPage = resolve('./src/dynamic-pages/tag.tsx');
    const result: RawAllPostsQueryType = await graphql(
      `
        {
          allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
              node {
                html
                fields {
                  slug
                }
                frontmatter {
                  date
                  tags
                  title
                  path
                }
              }
            }
          }
        }
      `
    );

    if (result.errors) {
      throw result.errors;
    }
    if (!result.data) {
      console.error('Query results malformed', result);
      throw new Error('Query returned no data!');
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges.map(item => item.node);

    posts.forEach((post, index) => {
      const next = index === 0 ? null : posts[index - 1];
      const previous = index === posts.length - 1 ? null : posts[index + 1];

      const path = post?.fields?.slug;
      if (!path) {
        throw new Error(`Page had missing slug: ${JSON.stringify(post)}`);
      }

      createPage({
        path,
        component: blogPostPage,
        context: {
          slug: path,
          previous,
          next,
        },
      });
    });

    // Create tag pages
    const tags = sortBy(uniq(flatten(posts.map(post => post?.frontmatter?.tags))));

    tags.forEach(tag => {
      if (!tag) {
        return;
      }

      const postsWithTag = filter(posts, post =>
        includes(get(post, 'frontmatter.tags'), tag)
      );

      createPage({
        path: `/tags/${tag}`,
        component: tagPage,
        context: {
          tag,
          postsWithTag,
        },
      });
    });
  },

  onCreateNode: ({ node, actions }: CreateNodeArgs<NodeType>): void => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
      const path: string | undefined = node?.frontmatter?.path;
      if (!path) {
        throw new Error(`Post was missing path: ${JSON.stringify(node)}`);
      }

      createNodeField({
        name: 'slug',
        node,
        value: path,
      });

      const absolutePath = node?.fileAbsolutePath;
      if (typeof absolutePath !== 'string') {
        throw new Error(`Post was missing fileAbsolutePath: ${JSON.stringify(node)}`);
      }
      const relativePath = relative(__dirname, absolutePath);

      createNodeField({
        name: 'relativePath',
        node,
        value: relativePath,
      });
    }
  },

  onPostBuild: async ({ graphql }: BuildArgs): Promise<void> => {
    const result: RawAllDataType = await graphql(
      `
        {
          site {
            siteMetadata {
              blogTitle
              favicon
              domain
              author {
                name
                email
                twitter
                url
                image
                blurb
              }
            }
          }
          allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
              node {
                html
                fields {
                  slug
                }
                frontmatter {
                  date
                  tags
                  title
                  path
                }
              }
            }
          }
        }
      `
    );

    if (result.errors) {
      throw result.errors;
    }
    if (!result.data) {
      console.error('Query results malformed', result);
      throw new Error('Query returned no data!');
    }

    // Write favicon to public folder
    await copy(`${__dirname}/assets/favicon.ico`, `${__dirname}/public/favicon.ico`);

    // Write RSS and Atom
    const posts = result.data.allMarkdownRemark.edges.map(item => item.node);
    const { siteMetadata } = result.data.site;
    const now = moment(new Date());

    const author = {
      name: siteMetadata.author.name,
      email: siteMetadata.author.email,
      link: siteMetadata.author.url,
    };

    const feed = new Feed({
      title: siteMetadata.blogTitle,
      id: `${siteMetadata.domain}/`,
      description: siteMetadata.tagLine,
      link: siteMetadata.domain,
      copyright: `All rights reserved ${now.format('YYYY')}, Scott Nonnenberg`,
      feed: `${siteMetadata.domain}/atom.xml`,
      author,
    });

    const mostRecent20 = posts.slice(0, 20);
    mostRecent20.forEach(post => {
      if (!post.frontmatter) {
        console.error('Malformed post', post);
        throw new Error('Post was missing frontmatter!');
      }

      const data = post.frontmatter;
      if (!data.title || !data.date) {
        console.error('Malformed post', post);
        throw new Error('Post metadata was missing title or date');
      }

      const preFoldContent = fixLocalLinks(
        getPreFoldContent(post.html),
        siteMetadata.domain
      );
      const url = siteMetadata.domain + data.path;
      const readMore = ` <a href="${url}">Read more&nbsp;»</a>`;
      const withCallToAction = appendToLastTextBlock(preFoldContent, readMore);

      feed.addItem({
        title: data.title,
        link: url,
        description: withCallToAction,
        content: fixLocalLinks(post.html, siteMetadata.domain),
        date: new Date(data.date),
        author: [author],
      });
    });

    const rssPath = join(__dirname, 'public/rss.xml');
    const atomPath = join(__dirname, 'public/atom.xml');
    writeFileSync(rssPath, feed.rss2());
    writeFileSync(atomPath, feed.atom1());

    // Write JSON
    const json = compact(
      posts.map(post => {
        if (!post.frontmatter) {
          console.error('Malformed post', post);
          throw new Error('Post was missing frontmatter!');
        }

        const preFoldContent = fixLocalLinks(
          getPreFoldContent(post.html),
          siteMetadata.domain
        );
        const url = siteMetadata.domain + post.frontmatter.path;
        const readMore = ` <a href="${url}">Read more&nbsp;»</a>`;
        const withCallToAction = appendToLastTextBlock(preFoldContent, readMore);

        return {
          title: post.frontmatter.title,
          date: post.frontmatter.date,
          preview: withCallToAction,
          url,
          tags: post.frontmatter.tags,
        };
      })
    );

    const allPath = join(__dirname, 'public/all.json');
    const recentPath = join(__dirname, 'public/recent.json');
    writeFileSync(allPath, JSON.stringify(json, null, '  '));
    writeFileSync(recentPath, JSON.stringify(json.slice(0, 10), null, '  '));
  },
};

export default gatsbyNode;
