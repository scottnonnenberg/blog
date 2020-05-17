import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import map from 'lodash/map';

import { rhythm } from 'src/util/typography';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';
import Author from 'src/components/Author';

import PostLink from 'src/components/PostLink';
import TextPreview from 'src/components/TextPreview';
import HTMLPreview from 'src/components/HTMLPreview';
import EmailSignup from 'src/components/EmailSignup';

import { PostType } from 'src/types/Post';

const HTML_PREVIEW_POSTS = 5;
const TEXT_PREVIEW_POSTS = 5;

const LARGER_MARGIN = 1.5;

type DataType = {
  allMarkdownRemark: {
    edges: Array<{
      node: PostType;
    }>;
  };
};

function getHTMLPreviews(posts: Array<PostType>) {
  const sliced = posts.slice(0, HTML_PREVIEW_POSTS);
  return map(sliced, post => <HTMLPreview key={post?.fields?.slug} post={post} />);
}

function getTextPreviews(posts: Array<PostType>) {
  const sliced = posts.slice(HTML_PREVIEW_POSTS, HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  return map(sliced, post => <TextPreview key={post?.fields?.slug} post={post} />);
}

function getPlain(posts: Array<PostType>) {
  const sliced = posts.slice(HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  return map(sliced, post => <PostLink key={post?.fields?.slug} post={post} />);
}

export default function Index({ data, location }: PageProps<DataType>) {
  const posts = data.allMarkdownRemark.edges.map(item => item.node);

  return (
    <Wrapper location={location}>
      <SEO pageTitle="Blog" location={location} />
      <div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <h3
          style={{
            textAlign: 'center',
            marginBottom: 0,
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>
            <Link to="/popular/">Popular Posts</Link>
            {' - '}
            <Link to="/tags/">Tags</Link>
            {' - '}
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            <a href="/rss.xml">RSS</a>
            {' - '}
            <a href="/atom.xml">Atom</a>
            {' - '}
            <a href="https://scottnonnenberg.com">About Me</a>
          </span>
        </h3>
        <EmailSignup callToAction="Get updates straight to your inbox!" />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {getHTMLPreviews(posts)}
        {getTextPreviews(posts)}
        {getPlain(posts)}
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
          }
        }
      }
    }
  }
`;
