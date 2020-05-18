import React, { ReactElement } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { rhythm } from 'src/util/typography';

import { LocationType } from 'src/types/Location';

import 'css/typography-compat.less';
import 'css/styles.less';

const MAX_WIDTH = 24;
const HALF = 0.5;

const SOFTWARE_DEVELOPMENT_URL = '/tags/software/';
const GEEKERY_URL = '/star-wars-cards/';
const OF_URL = '/woot-shirts/';
const ALL_URL = '/cycling-computers-and-posture/';
const KINDS_URL = '/a-35lb-weight-swing-in-two-years/';

type PropsType = {
  location: LocationType;
  children: React.ReactNode;
};

function renderHeader(blogTitle: string, url: string): ReactElement | null {
  if (url === '/') {
    return (
      <div>
        <h1
          style={{
            marginBottom: 0,
          }}
        >
          {blogTitle}
        </h1>
        <div
          style={{
            marginBottom: rhythm(1),
          }}
        >
          A blog about <Link to={SOFTWARE_DEVELOPMENT_URL}>software development</Link> and{' '}
          <Link to={GEEKERY_URL}>geekery</Link> <Link to={OF_URL}>of</Link>{' '}
          <Link to={ALL_URL}>all</Link> <Link to={KINDS_URL}>kinds</Link>.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>
        <Link
          style={{
            color: 'inherit',
          }}
          to={'/'}
        >
          « {blogTitle}
        </Link>
      </h3>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
    </div>
  );
}

function Wrapper({ location, children }: PropsType): ReactElement | null {
  const { site } = useStaticQuery(
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

  const blogTitle = site.siteMetadata.blogTitle;
  const url = location.pathname;

  return (
    <div
      style={{
        maxWidth: rhythm(MAX_WIDTH),
        padding: `${rhythm(2)} ${rhythm(HALF)}`,
        paddingTop: rhythm(HALF),
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      {renderHeader(blogTitle, url)}
      {children}
    </div>
  );
}

export default Wrapper;
