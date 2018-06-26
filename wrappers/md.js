import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import map from 'lodash/map';

import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';

import { rhythm } from 'src/util/typography';
import intersperse from 'src/util/intersperse';
import shortDate from 'src/util/shortDate';

import ReadMore from 'src/ReadMore';
import Author from 'src/Author';
import EmailSignup from 'src/EmailSignup';

import 'css/solarized-light.less';


export default class MarkdownWrapper extends React.Component {
  static propTypes = {
    route: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    setTimeout(this.scroll, 0);
  }

  componentWillReceiveProps() {
    setTimeout(this.scroll, 0);
  }

  scroll() {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }

  renderTagLinks(tags) {
    if (!tags || !tags.length) {
      return null;
    }

    const tagLinks = map(tags, tag =>
      <Link key={tag} to={prefixLink(`/tags/${tag}/`)}>{tag}</Link>
    );

    return <div><em>Tags:</em> {intersperse(tagLinks, ', ')}</div>;
  }

  render() {
    const post = this.props.route.page;
    const posts = this.props.route.pages;

    const data = post.data;
    const tags = data.tags;

    return (
      <DocumentTitle title={`${data.title} | ${config.blogTitle}`}>
        <div className="post">
          <h1 style={{ marginBottom: 0 }}>{data.title}</h1>
          <h3
            style={{
              color: 'lightgray',
              marginTop: 0,
              marginBottom: '1em',
              fontWeight: 'normal',
              letterSpaacing: '-2px',
            }}
          >{shortDate(post.data.date)}</h3>

          <div className="markdown" dangerouslySetInnerHTML={{ __html: data.body }} />
          <EmailSignup text="Enjoy this post? Sign up for free updates!" />
          <div
            className="metadata"
            style={{
              display: 'block',
              marginTop: rhythm(1),
              marginBottom: rhythm(1),
            }}
          >
            <div><em>Posted:</em> {moment(data.date).format('MMMM D, YYYY')}</div>
            {this.renderTagLinks(tags)}
          </div>
          <hr
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(1),
            }}
          />
          <Author />
          <hr
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(2),
            }}
          />
          <ReadMore post={post} posts={posts} />
        </div>
      </DocumentTitle>
    );
  }
}
