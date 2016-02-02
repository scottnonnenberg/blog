import React from 'react';
import { Link, Navigation } from 'react-router';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import catchLinks from 'catch-links';

import map from 'lodash/collection/map';
import { link } from 'gatsby-helpers';

import { rhythm, fontSizeToMS } from 'utils/typography';
import intersperse from 'utils/intersperse';

import ReadMore from 'components/ReadMore';
import Author from 'components/Author';


export default React.createClass({
  displayName: 'MarkdownWrapper',

  mixins: [Navigation],

  scroll() {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#','');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  },

  componentDidMount() {
    var _this = this;

    catchLinks(this.refs.markdown, function(href) {
      _this.transitionTo(href);
    });

    setTimeout(this.scroll, 0);
  },

  componentWillReceiveProps() {
    setTimeout(this.scroll, 0);
  },

  render() {
    const data = this.props.page.data;
    const tags = data.tags;
    const tagLinks = map(tags, tag => (
      <Link key={tag} to={link(`/tags/${tag}/`)}>{tag}</Link>
    ));

    return (
      <DocumentTitle title={`${data.title} | ${this.props.config.blogTitle}`}>
        <div className="post">
          <h1>{data.title}</h1>
          <div ref="markdown" className="markdown" dangerouslySetInnerHTML={{__html: data.body}}/>
          <hr
            style={{
              marginTop: rhythm(2),
              marginBottom: rhythm(1)
            }}
          />
          <div className="metadata"
            style={{
              display: 'block',
              marginTop: rhythm(1),
              marginBottom: rhythm(1)
            }}
          >
            <div><em>Posted:</em> {moment(data.date).format('MMMM D, YYYY')}</div>
            <div><em>Tags:</em> {intersperse(tagLinks, ', ')}</div>
          </div>
          <hr
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(1)
            }}
          />
          <Author {...this.props} />
          <hr
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(2)
            }}
          />
          <ReadMore post={data} {...this.props}/>
        </div>
      </DocumentTitle>
    );
  }
});
