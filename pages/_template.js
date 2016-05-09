import React from 'react';
import { Link } from 'react-router';
import catchLinks from 'catch-links';

import { prefixLink } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import { config } from 'config';

import '../css/styles.less';


export default class RootTemplate extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    catchLinks(this.refs.parent, href => this.context.router.push(href));
  }

  render() {
    let header;

    if (this.props.location.pathname === prefixLink('/')) {
      header = (
        <div>
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {config.blogTitle}
          </h1>
          <div
            style={{
              marginBottom: rhythm(1),
            }}
            dangerouslySetInnerHTML={{ __html: config.tagLine }}
          />
        </div>
      );
    }
    else {
      header = (
        <div>
          <h3>
            <Link
              style={{
                color: 'inherit',
              }}
              to={prefixLink('/')}
            >
              « {config.blogTitle}
            </Link>
          </h3>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </div>
      );
    }

    return (
      <div
        ref="parent"
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(2)} ${rhythm(0.5)}`,
          paddingTop: rhythm(0.5),
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        {header}
        {this.props.children}
      </div>
    );
  }
}
