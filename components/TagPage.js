import React from 'react';
import DocumentTitle from 'react-document-title';
import map from 'lodash/map';

import { config } from 'config'; // eslint-disable-line

import { rhythm } from 'utils/typography';
import getPosts from 'utils/getPosts';
import getPostsWithTag from 'utils/getPostsWithTag';

import TextPreview from 'components/TextPreview';
import PostLink from 'components/PostLink';
import Author from 'components/Author';

const TEXT_PREVIEW_POSTS = 5;

export default function TagPage(props) {
  const tag = props.tag;

  const title = `Posts tagged '${tag}'`;
  const posts = getPosts(props.route.pages);
  const postsWithTag = getPostsWithTag(posts, tag);
  const textPreviewPosts = postsWithTag.slice(0, TEXT_PREVIEW_POSTS);
  const plainPosts = postsWithTag.slice(TEXT_PREVIEW_POSTS);

  const textPreviews = map(textPreviewPosts, post =>
    <TextPreview key={post.path} post={post} />
  );
  const plainLinks = map(plainPosts, post =>
    <PostLink key={post.path} post={post} />
  );

  return (
    <DocumentTitle title={`${title} | ${config.blogTitle}`}>
      <div>
        <h1>{title}</h1>
        {textPreviews}
        {plainLinks}
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(2),
          }}
        />
        <Author {...props} />
      </div>
    </DocumentTitle>
  );
}

TagPage.propTypes = {
  tag: React.PropTypes.object.isRequired,
  route: React.PropTypes.object.isRequired,
};
