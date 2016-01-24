import React from 'react';
import { RouteHandler, Link } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import { link } from 'gatsby-helpers';
import { rhythm, fontSizeToMS } from 'utils/typography'

import '../css/styles.css';

export default class RootTemplate extends React.Component {
  render() {
    let header;

    if (this.props.state.path === link('/')) {
      header = (
        <div>
          <h1
            style={{
              fontSize: fontSizeToMS(2.5).fontSize,
              lineHeight: fontSizeToMS(2.5).lineHeight
            }}
          >
            <Link
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
              to={link('/')}
            >
              {this.props.config.blogTitle}
            </Link>
          </h1>
          <div
            style={{
              marginBottom: rhythm(1)
            }}
          > A blog about software development and geekery of all kinds.
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
                textDecoration: 'none',
                color: 'inherit'
              }}
              to={link('/')}
            >
              &lt; {this.props.config.blogTitle}
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
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(2)} ${rhythm(1/2)}`
        }}
      >
        {header}
        <RouteHandler {...this.props}/>
      </Container>
    );
  }
}
