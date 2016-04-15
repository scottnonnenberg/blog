import React from 'react';
import { Link } from 'react-router';

import { prefixLink } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import { config } from 'config';

import '../css/styles.css';

export default class RootTemplate extends React.Component {
  render() {
    let header;

    if (this.props.location.pathname === prefixLink('/')) {
      header = (
        <div>
          <h1
            style={{
              marginBottom: 0
            }}
          >
            {config.blogTitle}
          </h1>
          <div
            style={{
              marginBottom: rhythm(1)
            }}
          >
            {config.tagLine}
          </div>
        </div>
      );
    }
    else {
      header = (
        <div>
          <h3>
            <Link
              style={{
                color: 'inherit'
              }}
              to={prefixLink('/')}
            >
              « {config.blogTitle}
            </Link>
          </h3>
          <hr
            style={{
              marginBottom: rhythm(1)
            }}
          />
        </div>
      );
    }

    return (
      <div
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(2)} ${rhythm(1/2)}`,
          paddingTop: rhythm(1/2),
          marginRight: 'auto',
          marginLeft: 'auto'
        }}
      >
        {header}
        {this.props.children}
      </div>
    );
  }
}
