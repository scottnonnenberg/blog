import React, { ReactElement } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { LocationType } from 'src/types/Location';
import { SiteMetadataQueryType } from 'src/types/queries';

import 'css/styles.less';

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
    <div className="wrapper__container">
      {renderHeader(blogTitle, url)}
      {children}
    </div>
  );
}

export default Wrapper;

function renderHeader(blogTitle: string, url: string): ReactElement | null {
  if (url === '/') {
    return (
      <div>
        <h1 className="wrapper__main-header">{blogTitle}</h1>
        <div className="wrapper__blog-summary">
          {'A blog about '}
          <Link to={SOFTWARE_DEVELOPMENT_URL}>software development</Link>
          {' and '}
          <Link to={GEEKERY_URL}>geekery</Link> <Link to={OF_URL}>of</Link>{' '}
          <Link to={ALL_URL}>all</Link> <Link to={KINDS_URL}>kinds</Link>.
        </div>
        <hr className="wrapper__divider" />
      </div>
    );
  }

  return (
    <div>
      <h3>
        <Link className="wrapper__back-link" to={'/'}>
          {`« ${blogTitle}`}
        </Link>
      </h3>
      <hr className="wrapper__divider" />
    </div>
  );
}
