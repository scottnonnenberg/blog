import React, { ReactElement } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import 'css/global.less';
import styles from './Wrapper.module.less';

import Author from 'src/components/Author';

import { LocationType } from 'src/types/Location';
import { SiteMetadataQueryType } from 'src/types/queries';

const SOFTWARE_DEVELOPMENT_URL = '/tags/software/';
const GEEKERY_URL = '/star-wars-cards/';
const OF_URL = '/woot-shirts/';
const ALL_URL = '/cycling-computers-and-posture/';
const KINDS_URL = '/a-35lb-weight-swing-in-two-years/';

type PropsType = {
  location: LocationType;
  children: React.ReactNode;
};

function Wrapper({ location, children }: PropsType): ReactElement | null {
  const data: SiteMetadataQueryType = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            blogTitle
          }
        }
      }
    `
  );

  const blogTitle = data.site.siteMetadata.blogTitle;
  const url = location.pathname;

  return (
    <div className={styles.container}>
      {renderHeader(blogTitle, url)}
      {children}
      <hr className={styles.divider} />
      <Author />
    </div>
  );
}

export default Wrapper;

function renderHeader(blogTitle: string, url: string): ReactElement | null {
  if (url === '/') {
    return (
      <div>
        <h1 className={styles.header}>{blogTitle}</h1>
        <div className={styles.blogSummary}>
          {'A blog about '}
          <Link to={SOFTWARE_DEVELOPMENT_URL}>software development</Link>
          {' and '}
          <Link to={GEEKERY_URL}>geekery</Link> <Link to={OF_URL}>of</Link>{' '}
          <Link to={ALL_URL}>all</Link> <Link to={KINDS_URL}>kinds</Link>.
        </div>
        <hr />
      </div>
    );
  }

  return (
    <div>
      <h3>
        <Link className={styles.backLink} to={'/'}>
          {`« ${blogTitle}`}
        </Link>
      </h3>
      <hr />
    </div>
  );
}
