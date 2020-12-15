import { writeFileSync } from 'fs';
import { join, relative, resolve } from 'path';

import { copy } from 'fs-extra';
import { Feed } from 'feed';

import { getPreFoldContent } from 'src/util/getPreFoldContent';
import { fixLocalLinks } from 'src/util/fixLocalLinks';
import { appendToLastTextBlock } from 'src/util/appendToLastTextBlock';
import { getTagCounts } from 'src/util/getTagCounts';
import { removeTags } from 'src/util/removeTags';
import { prune } from 'src/util/prune';

import { PostType } from 'src/types/Post';

import {
  BuildArgs,
  CreateNodeArgs,
  CreatePagesArgs,
  CreateResolversArgs,
  Node,
} from 'gatsby';

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

function getHTMLPreview(html: string, slug: string): string | undefined {
  const preFold = getPreFoldContent(html);
  const textLink = ` <a href="${slug}">Read more&nbsp;»</a>`;
  return appendToLastTextBlock(preFold, textLink);
}

const MAX_TEXT_PREVIEW = 200;
function getTextPreview(html: string) {
  const preFold = getPreFoldContent(html);
  const noTags = removeTags(preFold);
  if (!noTags) {
    throw new Error(`No tags returned for html: ${preFold}`);
  }

  return prune(noTags, MAX_TEXT_PREVIEW);
}

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
                htmlPreview
                textPreview
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
    const tagCounts = getTagCounts(posts);

    tagCounts.forEach(({ tag }) => {
      if (!tag) {
        return;
      }

      const postsWithTag = posts.filter(post => post?.frontmatter?.tags?.includes(tag));

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
      const slug: string | undefined = node?.frontmatter?.path;
      if (!slug) {
        throw new Error(`Post was missing path: ${JSON.stringify(node)}`);
      }
      createNodeField({
        name: 'slug',
        node,
        value: slug,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createResolvers: ({ createResolvers }: CreateResolversArgs): any => {
    const resolvers = {
      MarkdownRemark: {
        htmlPreview: {
          type: 'String',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resolve: async (source: PostType, args: any, context: any, info: any) => {
            const htmlField = info.schema.getType('MarkdownRemark').getFields()['html'];
            const html = await htmlField.resolve(source, args, context, info);

            const slug = source?.frontmatter?.path;
            if (!slug) {
              throw new Error(`source was missing path: ${JSON.stringify(source)}`);
            }
            return getHTMLPreview(html, slug);
          },
        },
        textPreview: {
          type: 'String',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          resolve: async (source: PostType, args: any, context: any, info: any) => {
            const htmlField = info.schema.getType('MarkdownRemark').getFields()['html'];
            const html = await htmlField.resolve(source, args, context, info);

            return getTextPreview(html);
          },
        },
      },
    };
    createResolvers(resolvers);
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
                textPreview
                htmlPreview
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
    const now = new Date();

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
      copyright: `All rights reserved ${now.getFullYear()}, Scott Nonnenberg`,
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

      const htmlPreview = post?.htmlPreview;
      if (!htmlPreview) {
        console.error('Malformed post', post);
        throw new Error('Post metadata was missing htmlPreview');
      }

      const description = fixLocalLinks(htmlPreview, siteMetadata.domain);
      const link = siteMetadata.domain + data.path;

      feed.addItem({
        title: data.title,
        link,
        description,
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
    const json = posts.map(post => {
      if (!post.frontmatter) {
        console.error('Malformed post', post);
        throw new Error('Post was missing frontmatter!');
      }

      const htmlPreview = post?.htmlPreview;
      if (!htmlPreview) {
        console.error('Malformed post', post);
        throw new Error('Post metadata was missing htmlPreview');
      }

      const preview = fixLocalLinks(htmlPreview, siteMetadata.domain);
      const url = siteMetadata.domain + post.frontmatter.path;

      return {
        title: post.frontmatter.title,
        date: post.frontmatter.date,
        preview,
        url,
        tags: post.frontmatter.tags,
      };
    });

    const allPath = join(__dirname, 'public/all.json');
    const recentPath = join(__dirname, 'public/recent.json');
    writeFileSync(allPath, JSON.stringify(json, null, '  '));
    writeFileSync(recentPath, JSON.stringify(json.slice(0, 10), null, '  '));
  },
};

export default gatsbyNode;
