import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import map from 'lodash/map';
import toPairs from 'lodash/toPairs';
import { link } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import getTagCounts from 'utils/getTagCounts';
import getPosts from 'utils/getPosts';

import Author from 'components/Author';
import { config } from 'config';


export default class TagIndex extends React.Component {
  render() {
    const title = 'Tags';
    const posts = getPosts(this.props.route.pages);
    const tags = getTagCounts(posts);
    const tagLinks = map(toPairs(tags), ([tag, count]) => (
       <li
        key={tag}
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link to={link(`/tags/${tag}/`)} >{tag}</Link>
        <span
          style={{
            color: 'lightgray'
          }}
        >
          {` ${count} ${count === 1 ? 'entry' : 'entries'}`}
        </span>
      </li>
    ));

    return (
      <DocumentTitle title={`${title} | ${config.blogTitle}`}>
        <div>
          <h1>{title}</h1>
          <ul>
            {tagLinks}
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
    );
  }
}
