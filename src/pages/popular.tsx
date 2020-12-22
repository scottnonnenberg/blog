import React, { ReactElement } from 'react';
import { graphql, PageProps } from 'gatsby';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';

import { getTextPreviews, getPostLinks } from './index';

import { AllPostsQueryType } from 'src/types/queries.d';

const TEXT_PREVIEW_POSTS = 10;
const POST_LINKS = 10;

export type PropsType = PageProps<AllPostsQueryType, null>;

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
