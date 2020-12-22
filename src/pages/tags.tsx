import React, { ReactElement } from 'react';
import { graphql, Link, PageProps } from 'gatsby';

import { getTagCounts } from 'src/util/getTagCounts';

import Wrapper from 'src/components/Wrapper';
import SEO from 'src/components/SEO';

import styles from './tags.module.scss';

import { AllPostsQueryType } from 'src/types/queries';

export type PropsType = PageProps<AllPostsQueryType, null>;

// Note: strange to make this component lowercase, but we want a final path of /tags/
//   and our eslint rules want this component name to match the filename.
export default function tags({ data, location }: PropsType): ReactElement | null {
  const title = 'Tags';
  const posts = data.allMarkdownRemark.edges.map(item => item.node);

  const tags = getTagCounts(posts);
  const tagLinks = tags.map(({ tag, count }) => {
    const countString = ` ${count} ${count === 1 ? 'entry' : 'entries'}`;
    return (
      <li key={tag} className={styles.tag}>
        <Link to={`/tags/${tag}/`}>{tag}</Link>
        <span className={styles.count}>{countString}</span>
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
