/* eslint-disable filenames/match-exported */

import React, { ReactElement } from 'react';
import { Link, PageProps } from 'gatsby';

import Wrapper from 'src/components//Wrapper';
import SEO from 'src/components/SEO';

import styles from './404.module.less';

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
