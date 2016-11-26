import React from 'react';
import DocumentTitle from 'react-document-title';

import flow from 'lodash/fp/flow';
import sortBy from 'lodash/fp/sortBy';
import map from 'lodash/fp/map';
import take from 'lodash/fp/take';
import drop from 'lodash/fp/drop';
import filter from 'lodash/fp/filter';

import { config } from 'config';

import getPosts from 'src/util/getPosts';
import { rhythm } from 'src/util/typography';

import Author from 'src/Author';
import TextPreview from 'src/TextPreview';
import PostLink from 'src/PostLink';


const TEXT_PREVIEW_POSTS = 10;
const POST_LINKS = 10;

const getTextPreviews = flow(
  // filter(post => Boolean(post.data.rank)),
  sortBy(post => post.data.rank),
  take(TEXT_PREVIEW_POSTS),
  map(post =>
    <li key={post.path}>
      <TextPreview post={post} />
    </li>
  ),
);
const getPostLinks = flow(
  filter(post => Boolean(post.data.rank)),
  sortBy(post => post.data.rank),
  drop(TEXT_PREVIEW_POSTS),
  take(POST_LINKS),
  map(post =>
    <li key={post.path}>
      <PostLink post={post} />
    </li>
  ),
);


export default function Popular(props) {
  const title = 'Popular Posts';
  const posts = getPosts(props.route.pages);

  return (
    <DocumentTitle title={`${title} | ${config.blogTitle}`}>
      <div>
        <h1>{title}</h1>
        <ol>
          {getTextPreviews(posts)}
          {getPostLinks(posts)}
        </ol>
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(1),
          }}
        />
        <Author />
      </div>
    </DocumentTitle>
  );
}

Popular.propTypes = {
  route: React.PropTypes.object.isRequired,
};
