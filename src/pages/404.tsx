/* eslint-disable filenames/match-exported */

import React, { ReactElement } from 'react';
import { Link, PageProps } from 'gatsby';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components//Wrapper';

export type PropsType = PageProps<null, null>;

export default function NotFound({ location }: PropsType): ReactElement | null {
  const title = "Couldn't find that!";

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <h1>{title}</h1>
      Looks like something went a little wrong!
      <h3 className="not-found__divider">
        <Link to="/">« Go back home</Link>
      </h3>
    </Wrapper>
  );
}
