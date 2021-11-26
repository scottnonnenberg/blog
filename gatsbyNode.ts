/* eslint-disable no-console, @scottnonnenberg/thehelp/absolute-or-current-dir */

import { writeFileSync } from 'fs';
import { join, relative, resolve } from 'path';

import { Feed } from 'feed';
import type {
  BuildArgs,
  CreateNodeArgs,
  CreatePagesArgs,
  CreateResolversArgs,
  Node,
} from 'gatsby';

// Note: we need to use relative paths here because app-module-path causes WebPack 5 to throw
//   PackFileCacheStrategy/FileSystemInfo warnings. Even though the overall build works.
import type { PostType } from 'src/types/Post';
import type { AllDataQueryType, AllPostsQueryType } from 'src/types/queries';

import { appendToLastTextBlock } from './src/util/appendToLastTextBlock';
import { fixLocalLinks } from './src/util/fixLocalLinks';
import { getPreFoldContent } from './src/util/getPreFoldContent';
import { getTagCounts } from './src/util/getTagCounts';
import { prune } from './src/util/prune';
import { removeTags } from './src/util/removeTags';

const POST_COUNT_FOR_FEEDS = 20;
const RECENT_COUNT_FOR_SYNDICATION = 10;
const TAG_POSTS_WITH_HTML_PREVIEW = 5;

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

function getHTMLPreview(html: string, slug: string): string {
  const preFold = getPreFoldContent(html);
  if (!preFold) {
    throw new Error('getHTMLPreview: Missing pre-fold content!');
  }

  const textLink = ` <a href="${slug}">Read more&nbsp;»</a>`;
  return appendToLastTextBlock(preFold, textLink);
}

const MAX_TEXT_PREVIEW = 200;
function getTextPreview(html: string) {
  const preFold = getPreFoldContent(html);
  if (!preFold) {
    throw new Error('getTextPreview: Missing pre-fold content!');
  }

  const noTags = removeTags(preFold);
  if (!noTags) {
    throw new Error(`getTextPreview: No tags returned for html: ${preFold}`);
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

    if (result.errors?.length) {
      throw result.errors[0] ?? new Error('Something went wrong!');
    }
    if (!result.data) {
      console.error('Query results malformed', result);
      throw new Error('Query returned no data!');
    }

    // Create a page for each blog post
    const posts = result.data.allMarkdownRemark.edges.map(item => item.node);

    posts.forEach((post, index) => {
      const next = index === 0 ? null : posts[index - 1];
      const previous = index === posts.length - 1 ? null : posts[index + 1];

      const path = post.fields?.slug;
      if (!path) {
        throw new Error(`Page had missing slug: ${JSON.stringify(post)}`);
      }

      createPage({
        path,
        component: blogPostPage,
        context: {
          slug: path,
          previous: previous && {
            ...previous,
            htmlPreview: undefined,
          },
          next: next && {
            ...next,
            htmlPreview: undefined,
          },
        },
      });
    });

    // Create a page for each tag
    const tagCounts = getTagCounts(posts);

    tagCounts.forEach(({ tag }) => {
      if (!tag) {
        return;
      }

      const postsWithTag = posts.filter(post => post.frontmatter?.tags?.includes(tag));
      const withText: Array<PostType> = [];
      const justLink: Array<PostType> = [];

      // By removing some of this data, we can reduce the size of the page-data.json for
      //   this page.
      postsWithTag.forEach((post, index) => {
        if (index <= TAG_POSTS_WITH_HTML_PREVIEW) {
          withText.push({
            ...post,
            htmlPreview: undefined,
          });
        } else {
          justLink.push({
            ...post,
            htmlPreview: undefined,
            textPreview: undefined,
          });
        }
      });

      createPage({
        path: `/tags/${tag}`,
        component: tagPage,
        context: {
          tag,
          withText,
          justLink,
        },
      });
    });
  },

  // This is the easy way to add fields to a given GrapnQL node.
  // Note: values generated here are persisted in Gatsby's build cache, so it should be
  //   reserved for values that don't change very often. If you make a change here while
  //   running 'yarn develop', you'll need to both shut down and `yarn clean` before it
  //   will show up.
  onCreateNode: ({ node, actions }: CreateNodeArgs<NodeType>): void => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
      const slug: string | undefined = node.frontmatter?.path;
      if (!slug) {
        throw new Error(`Post was missing path: ${JSON.stringify(node)}`);
      }
      createNodeField({
        name: 'slug',
        node,
        value: slug,
      });

      const absolutePath = node['fileAbsolutePath'];
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

  // This server-side calculation of htmlPreview/textPreview ensure that Gatsby's
  //   generated page-data.json files don't balloon out of control. We get complex here,
  //   adding custom fields to the GraphQL, because gatsby-transformer-remark lazily
  //   generates HTML from markdown. We only get html when we call that plugin's resolver
  //   manually!
  // Thanks, @zaparo! https://github.com/gatsbyjs/gatsby/issues/17045#issuecomment-529161439
  /* eslint-disable max-params, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  createResolvers: ({ createResolvers }: CreateResolversArgs): any => {
    const resolvers = {
      MarkdownRemark: {
        htmlPreview: {
          type: 'String',
          resolve: async (source: PostType, args: any, context: any, info: any) => {
            const htmlField = info.schema.getType('MarkdownRemark').getFields().html;
            const html = await htmlField.resolve(source, args, context, info);

            const slug = source.frontmatter?.path;
            if (!slug) {
              throw new Error(`source was missing path: ${JSON.stringify(source)}`);
            }
            return getHTMLPreview(html, slug);
          },
        },
        textPreview: {
          type: 'String',
          resolve: async (source: PostType, args: any, context: any, info: any) => {
            const htmlField = info.schema.getType('MarkdownRemark').getFields().html;
            const html = await htmlField.resolve(source, args, context, info);

            return getTextPreview(html);
          },
        },
      },
    };
    createResolvers(resolvers);
  },
  /* eslint-enable max-params, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

  // Build key assets that live next to built files in public/
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

    if (result.errors?.length) {
      throw result.errors[0] ?? new Error('Something went wrong!');
    }
    if (!result.data) {
      console.error('Query results malformed', result);
      throw new Error('Query returned no data!');
    }

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

    const mostRecent = posts.slice(0, POST_COUNT_FOR_FEEDS);
    mostRecent.forEach(post => {
      if (!post.frontmatter) {
        console.error('Malformed post', post);
        throw new Error('Post was missing frontmatter!');
      }
      if (!post.html) {
        console.error('Malformed post', post);
        throw new Error('Post was missing html!');
      }

      const data = post.frontmatter;
      if (!data.title || !data.date || !data.path) {
        console.error('Malformed post', post);
        throw new Error('Post metadata was missing title, date, or path');
      }

      const htmlPreview = post.htmlPreview;
      if (!htmlPreview) {
        console.error('Malformed post', post);
        throw new Error('Post metadata was missing htmlPreview');
      }

      const description = fixLocalLinks(htmlPreview, siteMetadata.domain);
      const link = `${siteMetadata.domain}${data.path}`;

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
      const data = post.frontmatter;
      if (!data.path) {
        console.error('Malformed post', post);
        throw new Error('Post metadata was missing path');
      }

      const htmlPreview = post.htmlPreview;
      if (!htmlPreview) {
        console.error('Malformed post', post);
        throw new Error('Post metadata was missing htmlPreview');
      }

      const preview = fixLocalLinks(htmlPreview, siteMetadata.domain);
      const url = `${siteMetadata.domain}${data.path}`;

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
    writeFileSync(
      recentPath,
      JSON.stringify(json.slice(0, RECENT_COUNT_FOR_SYNDICATION), null, '  ')
    );
  },
};

export default gatsbyNode;
