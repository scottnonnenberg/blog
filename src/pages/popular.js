import React from 'react';

import flow from 'lodash/fp/flow';
import sortBy from 'lodash/fp/sortBy';
import map from 'lodash/fp/map';
import take from 'lodash/fp/take';
import drop from 'lodash/fp/drop';
import filter from 'lodash/fp/filter';

import { graphql } from 'gatsby';
import { rhythm } from 'src/util/typography';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';
import Author from 'src/components/Author';

import TextPreview from 'src/components/TextPreview';
import PostLink from 'src/components/PostLink';

const TEXT_PREVIEW_POSTS = 10;
const POST_LINKS = 10;

const sortPosts = flow(
  filter(post => Boolean(post.frontmatter.rank)),
  sortBy(post => post.frontmatter.rank)
);

const getTextPreviews = flow(
  take(TEXT_PREVIEW_POSTS),
  map(post =>
    <li key={post.fields.slug}>
      <TextPreview post={post} />
    </li>
  ),
);
const getPostLinks = flow(
  drop(TEXT_PREVIEW_POSTS),
  take(POST_LINKS),
  map(post =>
    <li key={post.fields.slug}>
      <PostLink post={post} />
    </li>
  ),
);


export default function Popular({ location, data }) {
  const posts = data.allMarkdownRemark.edges.map(item => item.node);
  const sorted = sortPosts(posts);

  const title = 'Popular Posts';

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <div>
        <h1>{title}</h1>
        <ol>
          {getTextPreviews(sorted)}
          {getPostLinks(sorted)}
        </ol>
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(1),
          }}
        />
        <Author />
      </div>
    </Wrapper>
  );
}

// Popular.propTypes = {
//   route: React.PropTypes.object.isRequired,
// };

export const pageQuery = graphql`
  query {
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
            rank
          }
        }
      }
    }
  }
`;
