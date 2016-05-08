import React from 'react';

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

export default function generateMetaTags(page, config, path) {
  const tags = [];
  const url = config.domain + path;
  const blurb = removeHTML(config.authorBlurb);

  // basic page-level stuff
  tags.push(create('generator', 'https://github.com/gatsbyjs/gatsby'));
  tags.push(<link
    key="alternate"
    rel="alternate"
    type="application/rss+xml"
    title={config.blogTitle}
    href={`${config.domain}/rss.xml`}
  />);
  tags.push(<link key="canonical" rel="canonical" href={url} />);

  tags.push(create('og:site_name', config.blogTitle));
  tags.push(create('og:url', url));
  tags.push(create('twitter:url', url));
  tags.push(create('twitter:site', config.authorTwitter));

  if (page && page.data && page.data.body) {
    const data = page.data;
    const image = extractImage(data.body) || config.authorImage;

    tags.push(create('og:image', image));
    tags.push(create('twitter:image', image));

    const date = data.date.toJSON ? data.date.toJSON() : data.date;
    const preFold = getPreFoldContent(data.body);
    const description = removeHTML(preFold);

    tags.push(create('og:type', 'article'));
    tags.push(create('og:title', data.title));
    tags.push(create('og:description', description));
    tags.push(create('article:published_time', date));

    tags.push(create('twitter:card', 'summary'));
    tags.push(create('twitter:title', data.title));
    tags.push(create('twitter:description', description));

    const ld = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      publisher: {
        name: config.blogTitle,
        logo: config.authorImage
      },
      author: {
        '@type': 'Person',
        name: config.authorName,
        image: config.authorImage,
        url: config.authorURL,
        description: blurb
      },
      headline: data.title,
      datePublished: date,
      url,
      description,
      image: {
        '@type': 'ImageObject',
        url: image
      },
      mainEntityOfPage: url
    };

    tags.push(<script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(ld, null, '  ')}}
    />);
  }

  return tags;
}
