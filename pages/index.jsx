import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import sortBy from 'lodash/collection/sortBy';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import { link } from 'gatsby-helpers';

import getPosts from 'utils/getPosts';
import { rhythm } from 'utils/typography'

import Author from 'components/Author';
import PostListEntry from 'components/PostListEntry';
import TextPreview from 'components/TextPreview';
import HTMLPreview from 'components/HTMLPreview';


export default class Index extends React.Component {
  render() {
    const posts = getPosts(this.props.pages);
    const highlightPost = posts[0];
    const textPreviewPosts = posts.slice(1, 6);
    const plainPosts = posts.slice(6);

    const textPreviews = map(textPreviewPosts, post => (
      <li key={post.path}>
        <TextPreview post={post} />
      </li>
    ));
    const plainLinks = map(plainPosts, post => (
      <PostListEntry key={post.path} post={post} />
    ));

    return (
      <DocumentTitle title={this.props.config.blogTitle}>
        <div>
          <hr
            style={{
              marginBottom: rhythm(1)
            }}
          />
          <ol
            style={{
              listStyle: 'none',
              marginLeft: 0
            }}
          >
            <li
              style={{
                display: 'inline',
                marginRight: rhythm(1)
              }}
            ><Link to={link('/popular/')}>Popular Posts</Link></li>
            <li
              style={{
                display: 'inline',
                marginRight: rhythm(1)
              }}
            ><Link to={link('/tags/')}>Tags</Link></li>
            <li
              style={{
                display: 'inline',
                marginRight: rhythm(1)
              }}
            ><a href="https://scottnonnenberg.com">About Me</a></li>
            <li
              style={{
                display: 'inline',
                marginRight: rhythm(1)
              }}
            ><a href="/rss.xml" target="_blank">RSS</a>/<a href="/atom.xml" target="_blank">Atom</a></li>

          </ol>
          <hr
            style={{
              marginBottom: rhythm(2)
            }}
          />
          <HTMLPreview post={highlightPost} />
          <hr
            style={{
              marginTop: rhythm(2),
              marginBottom: rhythm(2)
            }}
          />
          <ul>
            {textPreviews}
            {plainLinks}
          </ul>
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
    )
  }
}
