import React from 'react';
import { Link } from 'react-router';

import { link } from 'gatsby-helpers'

import { rhythm, fontSizeToMS } from 'utils/typography'
import shortDate from 'utils/shortDate';
import getPreFoldContent from 'utils/getPreFoldContent';


export default class TextPreview extends React.Component {
  render() {
    const post = this.props.post;
    const html = post.data.body;
    const preFold = getPreFoldContent(html);
    const body = preFold.replace(/<[^>]*>/g, '');

    return <div>
      <h3
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link to={link(post.path)}>
          {post.data.title}
        </Link>
        <span className="date">
          {' ' + shortDate(post.data.date)}
        </span>
      </h3>
      <p>{body} <Link to={link(post.path)}>Read more »</Link></p>
    </div>;
  }
}
