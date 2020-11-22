/* eslint-disable filenames/no-index -- necessary if we want to generate index.html! */

import React, { ReactElement } from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import map from 'lodash/map';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';

import PostLink from 'src/components/PostLink';
import TextPreview from 'src/components/TextPreview';
import HTMLPreview from 'src/components/HTMLPreview';
import EmailSignup from 'src/components/EmailSignup';

import { PostType } from 'src/types/Post';
import { AllPostsQueryType } from 'src/types/queries.d';

const HTML_PREVIEW_POSTS = 5;
const TEXT_PREVIEW_POSTS = 5;

export type PropsType = PageProps<AllPostsQueryType, null>;

export default function index({ data, location }: PropsType): ReactElement | null {
  const posts = data.allMarkdownRemark.edges.map(item => item.node);

  const html = posts.slice(0, HTML_PREVIEW_POSTS);
  const text = posts.slice(HTML_PREVIEW_POSTS, HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  const link = posts.slice(HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);

  return (
    <Wrapper location={location}>
      <SEO pageTitle="Blog" location={location} />
      <h3 className="index__links">
        <span className="index__links__nowrap">
          <Link to="/popular/">Popular Posts</Link>
          {' - '}
          <Link to="/tags/">Tags</Link>
          {' - '}
        </span>
        <span className="index__links__nowrap">
          <a href="/rss.xml">RSS</a>
          {' - '}
          <a href="/atom.xml">Atom</a>
          {' - '}
          <a href="https://scottnonnenberg.com">About Me</a>
        </span>
      </h3>
      <EmailSignup callToAction="Get updates straight to your inbox!" />
      <hr />
      {getHTMLPreviews(html)}
      {getTextPreviews(text)}
      {getPostLinks(link)}
    </Wrapper>
  );
}

export function getHTMLPreviews(posts: Array<PostType>): Array<ReactElement | null> {
  return map(posts, post => {
    const slug = post?.fields?.slug;
    if (!slug) {
      throw new Error(`Page has missing slug: ${JSON.stringify(post)}`);
    }

    return <HTMLPreview key={slug} post={post} />;
  });
}

export function getTextPreviews(posts: Array<PostType>): Array<ReactElement | null> {
  return map(posts, post => {
    const slug = post?.fields?.slug;
    if (!slug) {
      throw new Error(`Page has missing slug: ${JSON.stringify(post)}`);
    }

    return <TextPreview key={slug} post={post} />;
  });
}

export function getPostLinks(posts: Array<PostType>): Array<ReactElement | null> {
  return map(posts, post => {
    const slug = post?.fields?.slug;
    if (!slug) {
      throw new Error(`Page has missing slug: ${JSON.stringify(post)}`);
    }

    return <PostLink key={slug} post={post} />;
  });
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
