import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import { prefixLink } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';

import Author from 'components/Author';
import { config } from 'config';


export default class NotFound extends React.Component {
  render() {
    const title = 'Couldn\'t find that!';

    return (
      <DocumentTitle title={`${title} | ${config.blogTitle}`}>
        <div>
          <h1>{title}</h1>
          Looks like something went a little wrong!
          <h3
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(2)
            }}
          ><Link to={prefixLink('/')}>« Go back home</Link></h3>
          <hr
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(2)
            }}
          />
          <Author {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
}
