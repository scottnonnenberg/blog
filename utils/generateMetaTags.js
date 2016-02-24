import React from 'react';

import getPreFoldContent from './getPreFoldContent';


function create(name, value) {
  return (
    <meta key={name} name={name} value={value} />
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
  // TODO: og:image
  // TODO: twitter:image

  if (page && page.data) {
    const data = page.data;

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
      publisher: config.blogTitle,
      author: {
        '@type': 'Person',
        name: config.authorName,
        image: config.authorImage,
        url: config.authorURL,
        description: blurb
      },
      headline: data.title,
      url: url,
      datePublished: date,
      description: description
    };

    tags.push(<script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(ld, null, '  ')}}
    />);
  }

  return tags;
}
