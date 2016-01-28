import React from 'react';
import { Link } from 'react-router';
import includes from 'underscore.string/include';

import find from 'lodash/collection/find';
import { link } from 'gatsby-helpers'

import { rhythm, fontSizeToMS } from 'utils/typography'
import shortDate from 'utils/shortDate';

import TextPreview from 'components/TextPreview';


export default class ReadMore extends React.Component {
  renderItem(label, post) {
    if (!post) {
      return;
    }

    return (
      <div>
        <h5
          style={{
            margin: 0,
            fontSize: fontSizeToMS(-0.5).fontSize,
            lineHeight: fontSizeToMS(-0.5).lineHeight,
            letterSpacing: -0.5
          }}
        >
          {label}:
        </h5>
        <TextPreview post={post} />
      </div>
    );
  }

  render() {
    const nextPath = this.props.post.next;
    const previousPath = this.props.post.previous;
    let nextPost, previousPost;

    if (nextPath) {
      nextPost = find(this.props.pages, function(page) {
        return includes(page.path, nextPath.slice(1, -1));
      });
    }
    if (previousPath) {
      previousPost = find(this.props.pages, function(page) {
        return includes(page.path, previousPath.slice(1, -1));
      });
    }

    if (!nextPost && !previousPost) {
      return <noscript/>;
    }
    else {
      return (
        <div>
          {this.renderItem('NEXT', nextPost)}
          {this.renderItem('PREVIOUS', previousPost)}
        </div>
      );
    }
  }
}
