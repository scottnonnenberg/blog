
import React from 'react';
import { Link } from 'react-router';
import { prune } from 'underscore.string';

import { link } from 'gatsby-helpers'

import { rhythm, fontSizeToMS } from 'utils/typography'
import shortDate from 'utils/shortDate';


export default class TextPreview extends React.Component {
  render() {
    const post = this.props.post;
    const html = post.data.body;
    const body = prune(html.replace(/<[^>]*>/g, ''), 200);

    return <div>
      <h3
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link to={link(post.path)}>
          {post.data.title} <span
            style={{
              color: 'lightgray'
            }}
          >{' ' + shortDate(post.data.date)}</span>
        </Link>
      </h3>
      <p>{body} <Link to={link(post.path)}>Read more »</Link></p>
    </div>;
  }
}
