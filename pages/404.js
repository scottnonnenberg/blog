import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';

import { rhythm } from 'src/util/typography';

import Author from 'src/Author';


export default function NotFound() {
  const title = "Couldn't find that!";

  return <DocumentTitle title={`${title} | ${config.blogTitle}`}>
    <div>
      <h1>{title}</h1>
      Looks like something went a little wrong!
      <h3
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(2),
        }}
      ><Link to={prefixLink('/')}>« Go back home</Link></h3>
      <hr
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(2),
        }}
      />
      <Author />
    </div>
  </DocumentTitle>;
}
