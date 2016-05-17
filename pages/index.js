import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import map from 'lodash/map';

import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

import getPosts from 'src/util/getPosts';
import { rhythm } from 'src/util/typography';

import Author from 'src/Author';
import PostLink from 'src/PostLink';
import TextPreview from 'src/TextPreview';
import HTMLPreview from 'src/HTMLPreview';


const HTML_PREVIEW_POSTS = 5;
const TEXT_PREVIEW_POSTS = 5;

const LARGER_MARGIN = 1.5;

function getHTMLPreviews(posts) {
  const sliced = posts.slice(0, HTML_PREVIEW_POSTS);
  return map(sliced, post => <HTMLPreview key={post.path} post={post} />);
}

function getTextPreviews(posts) {
  const sliced = posts.slice(HTML_PREVIEW_POSTS, HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  return map(sliced, post => <TextPreview key={post.path} post={post} />);
}

function getPlain(posts) {
  const sliced = posts.slice(HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  return map(sliced, post => <PostLink key={post.path} post={post} />);
}

export default function Index(props) {
  const posts = getPosts(props.route.pages);

  return (
    <DocumentTitle title={`Blog | ${config.blogTitle}`}>
      <div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ol className="menu">
          <li><Link to={prefixLink('/popular/')}>Popular Posts</Link></li>
          <li><Link to={prefixLink('/tags/')}>Tags</Link></li>
          <li><a href="https://scottnonnenberg.com">About Me</a></li>
          <li>
            <a href="/rss.xml">RSS</a>
            /
            <a href="/atom.xml">Atom</a>
          </li>
        </ol>
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
          <Author {...props} />
        </div>
      </div>
    </DocumentTitle>
  );
}

Index.propTypes = { // eslint-disable-line
  route: React.PropTypes.object.isRequired,
};

