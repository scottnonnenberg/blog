import { useStaticQuery, graphql } from 'gatsby';

import React from 'react';
import { Helmet } from 'react-helmet';

import getPreFoldContent from 'src/util/getPreFoldContent';
import extractImage from 'src/util/extractImage';


function create(name, value) {
  return (
    <meta key={name} property={name} content={value} />
  );
}

function removeHTML(html) {
  return html.replace(/<[^>]*>/g, '');
}

function generatePostSpecificTags(post, siteMetadata, url) {
  if (!post) {
    return [];
  }

  const data = post.frontmatter;
  const date = data.date.toJSON ? data.date.toJSON() : data.date;

  const postImage = extractImage(post.html);
  const preFold = getPreFoldContent(post.html);
  const description = removeHTML(preFold);
  const twitterCardType = postImage ? 'summary_large_image' : 'summary';
  const socialImage = postImage || siteMetadata.author.image;

  const ld = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    'publisher': {
      '@type': 'Organization',
      'name': siteMetadata.blogTitle,
      'logo': siteMetadata.author.image,
    },
    'author': {
      '@type': 'Person',
      'name': siteMetadata.author.name,
      'image': siteMetadata.author.image,
      'url': siteMetadata.author.url,
      'description': siteMetadata.author.blurb,
    },
    'headline': data.title,
    'datePublished': date,
    url,
    description,
    'image': {
      '@type': 'ImageObject',
      'url': socialImage,
    },
    'mainEntityOfPage': url,
  };

  return [
    create('og:image', socialImage),
    create('twitter:image', socialImage),

    create('og:type', 'article'),
    create('og:title', data.title),
    create('og:description', description),
    create('article:published_time', date),

    create('twitter:card', twitterCardType),
    create('twitter:title', data.title),
    create('twitter:description', description),

    <script
      key="ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld, null, '  ') }}
    />,
  ];
}

function generateMetaTags(siteMetadata, post, location) {
  const url = siteMetadata.domain + location.pathname;

  const tags = [
    create('generator', 'https://www.gatsbyjs.org'),
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

  return tags.concat(postSpecific);
}

function getTitle(siteMetadata, post, pageTitle) {
  if (post) {
    return `${post.frontmatter.title} | ${siteMetadata.blogTitle}`;
  }

  return `${pageTitle} | ${siteMetadata.blogTitle}`;
}

function SEO({ pageTitle, post, location }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            blogTitle
            favicon
            domain
            author {
              name
              email
              twitter
              url
              image
              icon
              blurb
            }
          }
        }
      }
    `
  );
  const { siteMetadata } = site;

  return (
    <Helmet>
      <title>{getTitle(siteMetadata, post, pageTitle)}</title>
      <link rel="shortcut icon" href={siteMetadata.favicon} />
      {generateMetaTags(siteMetadata, post, location)}
    </Helmet>
  );
}

export default SEO;



