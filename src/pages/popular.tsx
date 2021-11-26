/* eslint-disable react/no-array-index-key */

import type { ReactElement } from 'react';
import React from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';

import type { AllPostsQueryType } from 'src/types/queries.d';
import { getTextPreviews, getPostLinks } from './index';

const TEXT_PREVIEW_POSTS = 10;
const POST_LINKS = 10;

export type PropsType = PageProps<AllPostsQueryType, null>;

// Note: strange to make this component lowercase, but we want a final path of /popular/
//   and our eslint rules want this component name to match the filename.
export default function popular({ location, data }: PropsType): ReactElement | null {
  const posts = data.allMarkdownRemark.edges.map(item => item.node);

  const title = 'Popular Posts';

  const text = posts.slice(0, TEXT_PREVIEW_POSTS);
  const link = posts.slice(TEXT_PREVIEW_POSTS, TEXT_PREVIEW_POSTS + POST_LINKS);

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

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 20, sort: { fields: [frontmatter___rank], order: ASC }) {
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
