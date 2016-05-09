import React from 'react';

import find from 'lodash/find';

import { fontSizeToMS } from 'utils/typography';

import TextPreview from 'components/TextPreview';

function includes(target, substring) {
  if (!target || !target.indexOf) {
    return false;
  }

  return target.indexOf(substring) !== -1;
}


export default class ReadMore extends React.Component {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
    posts: React.PropTypes.array.isRequired,
  }

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
            letterSpacing: -0.5,
          }}
        >
          {label}:
        </h5>
        <TextPreview post={post} />
      </div>
    );
  }

  render() {
    const posts = this.props.posts;
    const nextPath = this.props.post.next;
    const previousPath = this.props.post.previous;
    let nextPost;
    let previousPost;

    if (nextPath) {
      nextPost = find(posts, page => includes(page.path, nextPath.slice(1, -1)));
    }
    if (previousPath) {
      previousPost = find(posts, page => includes(page.path, previousPath.slice(1, -1)));
    }

    if (!nextPost && !previousPost) {
      return <noscript />;
    }

    return (
      <div>
        {this.renderItem('NEXT', nextPost)}
        {this.renderItem('PREVIOUS', previousPost)}
      </div>
    );
  }
}
