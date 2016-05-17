import React from 'react';
import _ from 'lodash';

import getPreFoldContent from './getPreFoldContent';
import extractImage from './extractImage';


function create(name, value) {
  return (
    <meta key={name} property={name} content={value} />
  );
}

function removeHTML(html) {
  return html.replace(/<[^>]*>/g, '');
}

function generatePageSpecificTags(page, config, url) {
  if (!_.get(page, 'data.body')) {
    return [];
  }

  const data = page.data;
  const date = data.date.toJSON ? data.date.toJSON() : data.date;

  const blurb = removeHTML(config.authorBlurb);
  const image = extractImage(data.body) || config.authorImage;
  const preFold = getPreFoldContent(data.body);
  const description = removeHTML(preFold);

  const ld = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    'publisher': {
      '@type': 'Organization',
      'name': config.blogTitle,
      'logo': config.authorImage,
    },
    'author': {
      '@type': 'Person',
      'name': config.authorName,
      'image': config.authorImage,
      'url': config.authorURL,
      'description': blurb,
    },
    'headline': data.title,
    'datePublished': date,
    url,
    description,
    'image': {
      '@type': 'ImageObject',
      'url': image,
    },
    'mainEntityOfPage': url,
  };

  return [
    create('og:image', image),
    create('twitter:image', image),

    create('og:type', 'article'),
    create('og:title', data.title),
    create('og:description', description),
    create('article:published_time', date),

    create('twitter:card', 'summary'),
    create('twitter:title', data.title),
    create('twitter:description', description),

    <script
      key="ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld, null, '  ') }}
    />,
  ];
}
export default function generateMetaTags(page, config, path) {
  const url = config.domain + path;

  const tags = [
    create('generator', 'https://github.com/gatsbyjs/gatsby'),
    <link key="canonical" rel="canonical" href={url} />,
    <link
      key="alternate"
      rel="alternate"
      type="application/rss+xml"
      title={config.blogTitle}
      href={`${config.domain}/rss.xml`}
    />,
    create('og:site_name', config.blogTitle),
    create('og:url', url),
    create('twitter:url', url),
    create('twitter:site', config.authorTwitter),
  ];

  const pageSpecific = generatePageSpecificTags(page, config, url);

  return tags.concat(pageSpecific);
}
