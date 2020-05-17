/* eslint-disable import/no-commonjs, thehelp/no-mutation */

const path = require('path');
const { filter, flatten, get, includes, sortBy, uniq } = require('lodash');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPostPage = path.resolve('./src/dynamic-pages/post.tsx');
  const tagPage = path.resolve('./src/dynamic-pages/tag.tsx');
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
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

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges.map(item => item.node);

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: post.fields.slug,
      component: blogPostPage,
      context: {
        slug: post.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create tag pages
  const tags = sortBy(uniq(flatten(posts.map(post => post.frontmatter.tags))));

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
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = node.frontmatter.path;

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
