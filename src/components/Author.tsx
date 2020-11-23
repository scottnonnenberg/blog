import React, { ReactElement } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import styles from './Author.module.less';

import { SiteMetadataQueryType } from 'src/types/queries';

// External
const HOMEPAGE_URL = 'https://scottnonnenberg.com';
const OUTSIDE_URL = 'https://scottnonnenberg.com/work/#nordstrom-2012-q-2-to-q-4';
const ROLES_URL = 'https://scottnonnenberg.com/work/#microsoft-2010-q-3-to-2011-q-3';
const THE_URL =
  'https://scottnonnenberg.com/work/#social-security-administration-2015-q-3';
const WORK_URL = 'https://scottnonnenberg.com/work';

// Internal
const MANY_LANGUAGES_URL = '/eslint-part-3-analysis/#your-fingerprint';
const PERSPECTIVE_URL = '/from-tech-person-to-people-person/';
const UNUSUAL_URL = '/contract-an-unusual-skillset/';

export default function Author(): ReactElement | null {
  const data: SiteMetadataQueryType = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              url
              icon
            }
          }
        }
      }
    `
  );

  const { icon, url } = data.site.siteMetadata.author;

  return (
    <div className="author">
      <a href={url}>
        <img src={icon} className={styles.image} alt="It's me!" />
      </a>
      <div>
        {"Hi, I'm "}
        <a href={HOMEPAGE_URL}>
          <strong>Scott</strong>
        </a>
        {". I've written both server and client code in "}
        <Link to={MANY_LANGUAGES_URL}>many languages</Link>
        {' for '}
        <a href={WORK_URL}>many employers and clients</a>
        {". I've also got a bit of an "}
        <Link to={UNUSUAL_URL}>unusual</Link>{' '}
        <Link to={PERSPECTIVE_URL}>perspective</Link>
        {", since I've spent time in "}
        <a href={ROLES_URL}>roles</a> <a href={OUTSIDE_URL}>outside</a>{' '}
        <a href={THE_URL}>the</a>
        {" pure 'software developer.'"}
      </div>
    </div>
  );
}
