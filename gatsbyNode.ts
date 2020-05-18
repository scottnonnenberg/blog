import { resolve } from 'path';
import { filter, flatten, get, includes, sortBy, uniq } from 'lodash';

import { CreateNodeArgs, CreatePagesArgs, Node } from 'gatsby';

import { AllPostsQueryType } from 'src/types/queries';

type RawAllPostsQueryType = {
  errors?: Array<Error>;
  data?: AllPostsQueryType;
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

      createPage({
        path: post?.fields?.slug!,
        component: blogPostPage,
        context: {
          slug: post?.fields?.slug,
          previous,
          next,
        },
      });
    });

    // Create tag pages
    const tags = sortBy(uniq(flatten(posts.map(post => post?.frontmatter?.tags))));

    tags.forEach(tag => {
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
      const value = node?.frontmatter?.path;

      createNodeField({
        name: 'slug',
        node,
        value,
      });
    }
  },
};

export default gatsbyNode;
