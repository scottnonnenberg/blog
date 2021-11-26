import type { ReactElement } from 'react';
import React from 'react';
import type { PageProps } from 'gatsby';
import { graphql, Link } from 'gatsby';

import { intersperse } from 'src/util/intersperse';
import { renderDate } from 'src/util/renderDate';

import Wrapper from 'src/components/Wrapper';
import SEO from 'src/components/SEO';

import EmailSignup from 'src/components/EmailSignup';
import ReadMore from 'src/components/ReadMore';

import Markdown from 'src/components/Markdown';

import type { PostType } from 'src/types/Post';
import { date, divider, header, metadata } from './post.module.scss';

type PageContextType = {
  previous?: PostType;
  next?: PostType;
};

type DataType = {
  markdownRemark: PostType;
  site: {
    siteMetadata: {
      currentCommit: string;
      github: string;
    };
  };
};

export type PropsType = PageProps<DataType, PageContextType>;

export default function post({
  data,
  location,
  pageContext,
}: PropsType): ReactElement | null {
  const { previous, next } = pageContext;

  const currentCommit = data.site.siteMetadata.currentCommit;
  if (!currentCommit) {
    throw new Error(`post.tsx couldn't get currentCommit: ${JSON.stringify(data.site)}`);
  }

  const github = data.site.siteMetadata.github;
  if (!github) {
    throw new Error(`post.tsx couldn't get github: ${JSON.stringify(data.site)}`);
  }

  const postData = data.markdownRemark;
  const title = postData.frontmatter?.title;
  if (!title) {
    throw new Error(`postData.tsx had missing title: ${JSON.stringify(post)}`);
  }

  const publishData = postData.frontmatter?.date;
  if (!publishData) {
    throw new Error(`postData.tsx had missing post date: ${JSON.stringify(post)}`);
  }

  const relativePath = postData.fields?.relativePath;
  if (!relativePath) {
    throw new Error(`postData.tsx had missing relativePath: ${JSON.stringify(post)}`);
  }

  const updatedDate = postData.frontmatter?.updatedDate;
  const updatedDateString = updatedDate ? ` (updated ${renderDate(updatedDate)})` : '';

  const postUpdatedCommit = postData.frontmatter?.updatedCommit;

  return (
    <Wrapper location={location}>
      <SEO pageTitle={title} post={postData} location={location} />
      <h1 className={header}>{title}</h1>
      <div className={date}>{`${renderDate(publishData)}${updatedDateString}`}</div>
      <Markdown html={postData.html} />
      <EmailSignup callToAction="Enjoy this post? Sign up for free updates!" />
      <div className={metadata}>
        <div>
          <em>Posted:</em>
          {` ${renderDate(publishData)}`}
        </div>
        {updatedDate ? (
          <div>
            <em>Updated:</em>{' '}
            {postUpdatedCommit ? (
              <a
                href={`https://github.com/scottnonnenberg/blog/commit/${postUpdatedCommit}`}
              >
                {renderDate(updatedDate)}
              </a>
            ) : (
              renderDate(updatedDate)
            )}
          </div>
        ) : null}
        {renderTagLinks(postData.frontmatter?.tags)}
        <div>
          <em>On GitHub:</em>{' '}
          <a href={`${github}/blob/${currentCommit}/${relativePath}`}>{relativePath}</a>
        </div>
      </div>
      <hr className={divider} />
      <ReadMore previous={previous} next={next} />
    </Wrapper>
  );
}

function renderTagLinks(tags?: Array<string>): ReactElement | null {
  if (!tags || !tags.length) {
    return null;
  }

  const tagLinks = tags.map(tag => (
    <Link key={tag} to={`/tags/${tag}/`}>
      {tag}
    </Link>
  ));

  return (
    <div>
      <em>Tags:</em> {intersperse(tagLinks, ', ')}
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        currentCommit
        github
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      textPreview
      fields {
        slug
        relativePath
      }
      frontmatter {
        title
        date
        updatedDate
        updatedCommit
        tags
      }
    }
  }
`;
