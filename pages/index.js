import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import map from 'lodash/map';

import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

import getPosts from 'utils/getPosts';
import { rhythm } from 'utils/typography';

import Author from 'components/Author';
import PostLink from 'components/PostLink';
import TextPreview from 'components/TextPreview';
import HTMLPreview from 'components/HTMLPreview';


const HTML_PREVIEW_POSTS = 5;
const TEXT_PREVIEW_POSTS = 5;

const LARGER_MARGIN = 1.5;

export default function Index(props) {
  const posts = getPosts(props.route.pages);
  const htmlPreviewPosts = posts.slice(0, HTML_PREVIEW_POSTS);
  const textPreviewPosts =
    posts.slice(HTML_PREVIEW_POSTS, HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);
  const plainPosts = posts.slice(HTML_PREVIEW_POSTS + TEXT_PREVIEW_POSTS);

  const htmlPreviews = map(htmlPreviewPosts, post =>
    <HTMLPreview key={post.path} post={post} />
  );
  const textPreviews = map(textPreviewPosts, post =>
    <TextPreview key={post.path} post={post} />
  );
  const plainLinks = map(plainPosts, post =>
    <PostLink key={post.path} post={post} />
  );

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
        {htmlPreviews}
        {textPreviews}
        {plainLinks}
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
          <Author {...this.props} />
        </div>
      </div>
    </DocumentTitle>
  );
}

Index.propTypes = {
  route: React.PropTypes.object.isRequired,
};

