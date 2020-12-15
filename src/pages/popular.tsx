import React, { ReactElement } from 'react';
import { graphql, PageProps } from 'gatsby';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';

import { getTextPreviews, getPostLinks } from './index';

import { PostType } from 'src/types/Post';
import { AllPostsQueryType } from 'src/types/queries.d';

const TEXT_PREVIEW_POSTS = 10;
const POST_LINKS = 10;

export type PropsType = PageProps<AllPostsQueryType, null>;

export default function popular({ location, data }: PropsType): ReactElement | null {
  const posts = data.allMarkdownRemark.edges.map(item => item.node);
  const sorted = sortPosts(posts);

  const title = 'Popular Posts';

  const text = sorted.slice(0, TEXT_PREVIEW_POSTS);
  const link = sorted.slice(TEXT_PREVIEW_POSTS, TEXT_PREVIEW_POSTS + POST_LINKS);

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <h1>{title}</h1>
      <ol>
        {[...getTextPreviews(text), ...getPostLinks(link)].map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </Wrapper>
  );
}

const sortPosts = function (posts: Array<PostType>) {
  return posts
    .filter((post: PostType) => Boolean(post?.frontmatter?.rank))
    .sort(
      (left: PostType, right: PostType) =>
        (left?.frontmatter?.rank || 0) - (right?.frontmatter?.rank || 0)
    );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          textPreview
          fields {
            slug
          }
          frontmatter {
            title
            rank
            date
          }
        }
      }
    }
  }
`;
