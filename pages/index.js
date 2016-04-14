import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import map from 'lodash/map';
import { prefixLink } from 'gatsby-helpers';

import getPosts from 'utils/getPosts';
import { rhythm } from 'utils/typography';

import Author from 'components/Author';
import PostLink from 'components/PostLink';
import TextPreview from 'components/TextPreview';
import HTMLPreview from 'components/HTMLPreview';
import { config } from 'config';


export default class Index extends React.Component {
  render() {
    const posts = getPosts(this.props.route.pages);
    const htmlPreviewPosts = posts.slice(0, 5);
    const textPreviewPosts = posts.slice(5, 10);
    const plainPosts = posts.slice(10);

    const htmlPreviews = map(htmlPreviewPosts, post => (
      <HTMLPreview key={post.path} post={post} />
    ));
    const textPreviews = map(textPreviewPosts, post => (
      <TextPreview key={post.path} post={post} />
    ));
    const plainLinks = map(plainPosts, post => (
      <PostLink key={post.path} post={post} />
    ));

    return (
      <DocumentTitle title={config.blogTitle}>
        <div>
          <hr
            style={{
              marginBottom: rhythm(1)
            }}
          />
          <ol className='menu'>
            <li><Link to={prefixLink('/popular/')}>Popular Posts</Link></li>
            <li><Link to={prefixLink('/tags/')}>Tags</Link></li>
            <li><a href="https://scottnonnenberg.com">About Me</a></li>
            <li>
              <a href="/rss.xml" target="_blank">RSS</a>/<a href="/atom.xml" target="_blank">Atom</a>
            </li>
          </ol>
          <hr
            style={{
              marginBottom: rhythm(1)
            }}
          />
          {htmlPreviews}
          {textPreviews}
          {plainLinks}
          <hr
            style={{
              marginTop: rhythm(2),
              marginBottom: rhythm(2)
            }}
          />
          <div
            style={{
              marginTop: rhythm(1.5)
            }}
          >
            <Author {...this.props} />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
