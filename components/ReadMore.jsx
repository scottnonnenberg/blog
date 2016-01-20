import React from 'react';
import { Link } from 'react-router';
import { prune, include as includes } from 'underscore.string';
import find from 'lodash/collection/find';
import { rhythm, fontSizeToMS } from 'utils/typography'
import { link } from 'gatsby-helpers'

export default class extends React.Component {
  renderNext(post) {
    if (!post) {
      return;
    }

    const html = post.data.body;
    const body = prune(html.replace(/<[^>]*>/g, ''), 200);

    return <div>
      <h6
        style={{
          margin: 0,
          fontSize: fontSizeToMS(-1).fontSize,
          lineHeight: fontSizeToMS(-1).lineHeight,
          letterSpacing: -0.5
        }}
      >
        NEXT:
      </h6>
      <h3
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link
          to={post.path}
          query={{next: true}}
        >
          {post.data.title}
        </Link>
      </h3>
      <p>{body}</p>
    </div>;
  }

  renderPrevious(post) {
    if (!post) {
      return;
    }

    const html = post.data.body;
    const body = prune(html.replace(/<[^>]*>/g, ''), 200);

    return <div>
      <h6
        style={{
          margin: 0,
          fontSize: fontSizeToMS(-1).fontSize,
          lineHeight: fontSizeToMS(-1).lineHeight,
          letterSpacing: -0.5
        }}
      >
        PREVIOUS:
      </h6>
      <h3
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link
          to={post.path}
          query={{previous: true}}
        >
          {post.data.title}
        </Link>
      </h3>
      <p>{body}</p>
    </div>;
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
      return React.createElement("noscript", null);
    }
    else {
      return (
        <div>
          {this.renderNext(nextPost)}
          {this.renderPrevious(previousPost)}
        </div>
      );
    }
  }
}
