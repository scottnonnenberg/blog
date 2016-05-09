import React from 'react';
import { Link } from 'react-router';

import { prefixLink } from 'gatsby-helpers';

import { rhythm } from 'utils/typography';
import shortDate from 'utils/shortDate';

export default class PostLink extends React.Component {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
  }

  render() {
    const post = this.props.post;
    const data = post.data;

    return (
      <div
        style={{
          marginBottom: rhythm(0.25),
        }}
      >
        <Link to={prefixLink(post.path)}>
          {data.title || post.path}
        </Link>
        <span className="date">
          {' '}
          {shortDate(data.date)}
        </span>
      </div>
    );
  }
}
