import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import SEO from 'src/components/SEO';

import map from 'lodash/map';
import toPairs from 'lodash/toPairs';

import { rhythm } from 'src/util/typography';
import getTagCounts from 'src/util/getTagCounts';

import Author from 'src/components/Author';
import Wrapper from 'src/components/Wrapper';

import { PostType } from 'src/types/Post';

const QUARTER = 0.25;
const LARGER_MARGIN = 1.5;

type DataType = {
  allMarkdownRemark: {
    edges: Array<{
      node: PostType;
    }>;
  };
};

export default function Tags({ data, location }: PageProps<DataType>) {
  const title = 'Tags';
  const posts = data.allMarkdownRemark.edges.map(item => item.node);
  const tags = getTagCounts(posts);
  const tagLinks = map(toPairs(tags), ([tag, count]) => (
    <li
      key={tag}
      style={{
        marginBottom: rhythm(QUARTER),
      }}
    >
      <Link to={`/tags/${tag}/`}>{tag}</Link>
      <span
        style={{
          color: 'lightgray',
        }}
      >
        {` ${count} ${count === 1 ? 'entry' : 'entries'}`}
      </span>
    </li>
  ));

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <div>
        <h1>{title}</h1>
        <ul>{tagLinks}</ul>
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(2),
          }}
        />
        <div
          style={{
            marginTop: rhythm(LARGER_MARGIN),
          }}
        >
          <Author />
        </div>
      </div>
    </Wrapper>
  );
}

// TagIndex.propTypes = {
//   route: React.PropTypes.object.isRequired,
// };

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        blogTitle
        author {
          url
          icon
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
            title
            tags
          }
        }
      }
    }
  }
`;
