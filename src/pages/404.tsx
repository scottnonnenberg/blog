/* eslint-disable filenames/match-exported */

// Though it's strange, it's important to name this '404' so Gatsby and our hosting
//   infrastructure understand the resultant filename: '404.html'

import React, { ReactElement } from 'react';
import { Link, PageProps } from 'gatsby';

import Wrapper from 'src/components//Wrapper';
import SEO from 'src/components/SEO';

import styles from './NotFound.module.scss';

export type PropsType = PageProps<null, null>;

export default function NotFound({ location }: PropsType): ReactElement | null {
  const title = "Couldn't find that!";

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} location={location} />
      <h1>{title}</h1>
      Looks like something went a little wrong!
      <h3 className={styles.divider}>
        <Link to="/">« Go back home</Link>
      </h3>
    </Wrapper>
  );
}
