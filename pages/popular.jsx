import React from 'react';
import DocumentTitle from 'react-document-title';

import sortBy from 'lodash/collection/sortBy';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';

import getPosts from 'utils/getPosts';
import { rhythm } from 'utils/typography';

import Author from 'components/Author';
import TextPreview from 'components/TextPreview';


export default class Popular extends React.Component {
  render() {
    const title = 'Popular Posts';

    let posts = getPosts(this.props.pages);

    posts = filter(posts, post => Boolean(post.data.rank));
    posts = sortBy(posts, post => post.data.rank);
    posts = posts.slice(0, 10);

    const pageLinks = map(posts, post => (
      <li key={post.path}>
        <TextPreview  post={post} />
      </li>
    ));

    return (
      <DocumentTitle title={`${title} | ${this.props.config.blogTitle}`}>
        <div>
          <h1>{title}</h1>
          <ol>
            {pageLinks}
          </ol>
          <hr
            style={{
              marginTop: rhythm(2),
              marginBottom: rhythm(1)
            }}
          />
          <Author {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
}
