import type { ReactElement } from 'react';
import React from 'react';
import type { PageProps } from 'gatsby';
import { graphql, Link } from 'gatsby';

import { getTagCounts } from 'src/util/getTagCounts';

import Wrapper from 'src/components/Wrapper';
import SEO from 'src/components/SEO';

import type { AllPostsQueryType } from 'src/types/queries';
import { countItem, tagItem } from './tags.module.scss';

export type PropsType = PageProps<AllPostsQueryType, null>;

// Note: strange to make this component lowercase, but we want a final path of /tags/
//   and our eslint rules want this component name to match the filename.
export default function tags({ data, location }: PropsType): ReactElement | null {
  const title = 'Tags';
  const posts = data.allMarkdownRemark.edges.map(item => item.node);

  const tagCounts = getTagCounts(posts);
  const tagLinks = tagCounts.map(({ tag, count }) => {
    const countString = ` ${count} ${count === 1 ? 'entry' : 'entries'}`;
    return (
      <li key={tag} className={tagItem}>
        <Link to={`/tags/${tag}/`}>{tag}</Link>
        <span className={countItem}>{countString}</span>
      </li>
    );
  });

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <h1>{title}</h1>
      <ul>{tagLinks}</ul>
    </Wrapper>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        blogTitle
        author {
          url
          blurb
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;
