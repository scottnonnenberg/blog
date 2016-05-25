import React from 'react';
import DocumentTitle from 'react-document-title';
import map from 'lodash/map';

import { config } from 'config';

import { rhythm } from 'src/util/typography';
import getPosts from 'src/util/getPosts';
import getPostsWithTag from 'src/util/getPostsWithTag';

import TextPreview from 'src/TextPreview';
import PostLink from 'src/PostLink';
import Author from 'src/Author';

const TEXT_PREVIEW_POSTS = 5;

export function _getTextPreviews(posts) {
  const sliced = posts.slice(0, TEXT_PREVIEW_POSTS);
  return map(sliced, post => <TextPreview key={post.path} post={post} />);
}

export function _getPlain(posts) {
  const plainPosts = posts.slice(TEXT_PREVIEW_POSTS);
  return map(plainPosts, post => <PostLink key={post.path} post={post} />);
}

export default function TagPage(props) {
  const tag = props.tag;

  const title = `Posts tagged '${tag}'`;
  const posts = getPosts(props.route.pages);
  const postsWithTag = getPostsWithTag(posts, tag);

  return (
    <DocumentTitle title={`${title} | ${config.blogTitle}`}>
      <div>
        <h1>{title}</h1>
        {_getTextPreviews(postsWithTag)}
        {_getPlain(postsWithTag)}
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(2),
          }}
        />
        <Author />
      </div>
    </DocumentTitle>
  );
}

TagPage.propTypes = { // eslint-disable-line
  tag: React.PropTypes.string.isRequired,
  route: React.PropTypes.object.isRequired,
};
