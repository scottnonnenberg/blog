import React from 'react';
import { Link } from 'react-router';
import catchLinks from 'catch-links';

import { prefixLink } from 'gatsby-helpers';  // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

import { rhythm } from 'utils/typography';

import 'css/styles.less';


const MAX_WIDTH = 24;
const HALF = 0.5;

export default class RootTemplate extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.getParent = this.getParent.bind(this);
  }

  componentDidMount() {
    catchLinks(this.parentNode, href => this.context.router.push(href));
  }

  getParent(ref) {
    this.parentNode = ref;
  }

  render() {
    let header;

    if (this.props.location.pathname === prefixLink('/')) {
      header = <div>
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
      </div>;
    }
    else {
      header = <div>
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
      </div>;
    }

    return (
      <div
        ref={this.getParent}
        style={{
          maxWidth: rhythm(MAX_WIDTH),
          padding: `${rhythm(2)} ${rhythm(HALF)}`,
          paddingTop: rhythm(HALF),
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
