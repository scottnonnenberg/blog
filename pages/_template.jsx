import React from 'react';
import { RouteHandler, Link } from 'react-router';

import { link } from 'gatsby-helpers';

import { rhythm, fontSizeToMS } from 'utils/typography'
import CurrentState from 'components/CurrentState';

import '../css/styles.css';


export default class RootTemplate extends React.Component {
  render() {
    let header;

    if (this.props.state.path === link('/')) {
      header = (
        <div>
          <h1
            style={{
              marginBottom: 0
            }}
          >
            {this.props.config.blogTitle}
          </h1>
          <div
            style={{
              marginBottom: rhythm(1)
            }}
          >
            {this.props.config.tagLine}
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
              « {this.props.config.blogTitle}
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
        <CurrentState state={this.props.state} />
        {header}
        <RouteHandler {...this.props}/>
      </div>
    );
  }
}
