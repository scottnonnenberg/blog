import React from 'react';

import find from 'lodash/find';

import { fontSizeToMS } from 'src/util/typography';

import TextPreview from 'src/TextPreview';


const SMALL_FONT = -0.5;

export default class ReadMore extends React.Component {
  static propTypes = {
    post: React.PropTypes.object.isRequired,
    posts: React.PropTypes.array.isRequired,
  }

  getPath(posts, path) {
    if (path) {
      return find(posts, page => page.path.indexOf(path) !== -1);
    }
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
            fontSize: fontSizeToMS(SMALL_FONT).fontSize,
            lineHeight: fontSizeToMS(SMALL_FONT).lineHeight,
            letterSpacing: SMALL_FONT,
          }}
        >
          {label}:
        </h5>
        <TextPreview post={post} />
      </div>
    );
  }

  render() {
    const data = this.props.post.data;
    const posts = this.props.posts;

    const nextPost = this.getPath(posts, data.next);
    const previousPost = this.getPath(posts, data.previous);

    if (!nextPost && !previousPost) {
      return null;
    }

    return (
      <div>
        {this.renderItem('NEXT', nextPost)}
        {this.renderItem('PREVIOUS', previousPost)}
      </div>
    );
  }
}
