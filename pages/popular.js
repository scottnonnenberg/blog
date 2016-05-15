import React from 'react';
import DocumentTitle from 'react-document-title';

import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import filter from 'lodash/filter';

import { config } from 'config'; // eslint-disable-line

import getPosts from 'utils/getPosts';
import { rhythm } from 'utils/typography';

import Author from 'components/Author';
import TextPreview from 'components/TextPreview';


const LIMIT = 10;

export default function Popular(props) {
  const title = 'Popular Posts';

  let posts = getPosts(props.route.pages);

  posts = filter(posts, post => Boolean(post.data.rank));
  posts = sortBy(posts, post => post.data.rank);
  posts = posts.slice(0, LIMIT);

  const pageLinks = map(posts, post =>
    <li key={post.path}>
      <TextPreview post={post} />
    </li>
  );

  return (
    <DocumentTitle title={`${title} | ${config.blogTitle}`}>
      <div>
        <h1>{title}</h1>
        <ol>
          {pageLinks}
        </ol>
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(1),
          }}
        />
        <Author {...this.props} />
      </div>
    </DocumentTitle>
  );
}

Popular.propTypes = {
  route: React.PropTypes.object.isRequired,
};
