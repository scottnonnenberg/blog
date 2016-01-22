import React from 'react';
import { RouteHandler, Link } from 'react-router';
import sortBy from 'lodash/collection/sortBy';
import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import DocumentTitle from 'react-document-title';
import { link } from 'gatsby-helpers';
import { rhythm, fontSizeToMS } from 'utils/typography'

export default class extends React.Component {
  render() {
    let pages = filter(this.props.pages, function(page) {
      const data = page.data;
      return page.path && page.path !== '/' && data && !data.draft
    })
    pages = sortBy(pages, page => page.data.date);

    const pageLinks = map(pages, page => (
      <li
        key={page.path}
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link to={link(page.path)}>{page.data.title || page.path}</Link>
      </li>
    ));

    return (
      <DocumentTitle title={this.props.config.blogTitle}>
        <div>
          <p
            style={{
              marginBottom: rhythm(2.5)
            }}
          >
            <img
              src="//www.gravatar.com/avatar/6d4e229c0d24e92a2d15499acab531d8?d=404"
              style={{
                float: 'left',
                marginRight: rhythm(1/4),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2)
              }}
            />
            Written by <strong>{this.props.config.authorName}</strong> who lives and works in Seattle building useful things. <a href="https://twitter.com/scottnonnenberg">You should follow him on Twitter</a>
          </p>
          <ul>
            {pageLinks.reverse()}
          </ul>
        </div>
      </DocumentTitle>
    )
  }
}
