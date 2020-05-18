/* eslint-disable filenames/match-exported */

import React, { ReactElement } from 'react';
import { Link, PageProps } from 'gatsby';

import { rhythm } from 'src/util/typography';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components//Wrapper';
import Author from 'src/components/Author';

export default function NotFound({ location }: PageProps): ReactElement | null {
  const title = "Couldn't find that!";

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <div>
        <h1>{title}</h1>
        Looks like something went a little wrong!
        <h3
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(2),
          }}
        >
          <Link to="/">« Go back home</Link>
        </h3>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(2),
          }}
        />
        <Author />
      </div>
    </Wrapper>
  );
}
