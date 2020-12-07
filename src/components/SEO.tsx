import { useStaticQuery, graphql } from 'gatsby';

import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import getPreFoldContent from 'src/util/getPreFoldContent';
import extractImage from 'src/util/extractImage';

import { LocationType } from 'src/types/Location';
import { PostType } from 'src/types/Post';
import { SiteMetadataType } from 'src/types/SiteMetadata';
import { SiteMetadataQueryType } from 'src/types/queries';

type PropsType = {
  location: LocationType;
  pageTitle: string;
  post?: PostType;
};

function create(name?: string, value?: string): ReactElement | null {
  if (!name || !value) {
    return null;
  }

  return <meta key={name} property={name} content={value} />;
}

function removeHTML(html?: string): string | undefined {
  if (!html) {
    return html;
  }
  return html.replace(/<[^>]*>/g, '');
}

function generatePostSpecificTags(
  post: PostType | undefined,
  siteMetadata: SiteMetadataType,
  url: string
): Array<ReactElement | null> {
  if (!post) {
    return [];
  }

  const data = post?.frontmatter;
  if (!data) {
    throw new Error(`Page had missing frontmatter: ${JSON.stringify(data)}`);
  }

  const postImage = extractImage(post.html);
  const preFold = getPreFoldContent(post.html);
  const description = removeHTML(preFold);
  const twitterCardType = postImage ? 'summary_large_image' : 'summary';
  const socialImage = postImage || siteMetadata.author.image;

  const ld = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.blogTitle,
      logo: siteMetadata.author.image,
    },
    author: {
      '@type': 'Person',
      name: siteMetadata.author.name,
      image: siteMetadata.author.image,
      url: siteMetadata.author.url,
      description: siteMetadata.author.blurb,
    },
    headline: data.title,
    datePublished: data.date,
    url,
    description,
    image: {
      '@type': 'ImageObject',
      url: socialImage,
    },
    mainEntityOfPage: url,
  };

  return [
    create('og:image', socialImage),
    create('twitter:image', socialImage),

    create('og:type', 'article'),
    create('og:title', data.title),
    create('og:description', description),
    <meta key="description" name="description" content={description} />,
    create('article:published_time', data.date),

    create('twitter:card', twitterCardType),
    create('twitter:title', data.title),
    create('twitter:description', description),

    <script key="ld" type="application/ld+json">
      {JSON.stringify(ld, null, '  ')}
    </script>,
  ];
}

function generateMetaTags(
  siteMetadata: SiteMetadataType,
  post: PostType | undefined,
  location: LocationType
): Array<ReactElement | null> {
  const url = siteMetadata.domain + location.pathname;

  const tags = [
    <link key="canonical" rel="canonical" href={url} />,
    <link
      key="alternate"
      rel="alternate"
      type="application/rss+xml"
      title={siteMetadata.blogTitle}
      href={`${siteMetadata.domain}/rss.xml`}
    />,
    create('og:site_name', siteMetadata.blogTitle),
    create('og:url', url),
    create('twitter:url', url),
    create('twitter:site', siteMetadata.author.twitter),
  ];

  const postSpecific = generatePostSpecificTags(post, siteMetadata, url);
  if (!postSpecific.length) {
    tags.push(
      <meta key="description" name="description" content={siteMetadata.tagLine} />
    );
  }

  return tags.concat(postSpecific);
}

function SEO({ pageTitle, post, location }: PropsType): ReactElement | null {
  const data: SiteMetadataQueryType = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              name
              email
              twitter
              url
              image
              blurb
            }
            blogTitle
            domain
            favicon
            tagLine
          }
        }
      }
    `
  );
  const { siteMetadata } = data.site;

  return (
    <Helmet>
      <title>{`${pageTitle} | ${siteMetadata.blogTitle}`}</title>
      <link rel="shortcut icon" href={siteMetadata.favicon} />
      {generateMetaTags(siteMetadata, post, location)}
    </Helmet>
  );
}

export default SEO;
