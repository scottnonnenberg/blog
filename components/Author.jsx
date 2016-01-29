import React from 'react';
import { Link } from 'react-router';

import find from 'lodash/collection/find';
import { link } from 'gatsby-helpers';

import { rhythm, fontSizeToMS } from 'utils/typography'


export default class Author extends React.Component {
  render() {
    const config = this.props.config;
    const image = config.authorImage;
    const url = config.authorURL;
    const blurb = config.authorBlurb;

    return (
      <div className="author">
        <a href={url}><img
          src={image}
          style={{
            float: 'left',
            marginRight: rhythm(1/4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2)
          }}
        /></a>
        <div dangerouslySetInnerHTML={{__html: blurb}} />
      </div>
    );
  }
};
