import './util/setupModulePath';

import _ from 'lodash';

import loadPosts from 'scripts/util/loadPosts';
import writeIfDifferent from 'scripts/util/writeIfDifferent';

import * as globalConfig from 'gatsby-config';

const config = globalConfig.siteMetadata;

const limit = parseInt(process.argv[2], 10) || 1;
const posts = loadPosts({
  limit,
  markdown: false,
});

function removeSmartQuotes(value?: string) {
  if (!value) {
    return value;
  }

  return value.replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
}

function removeDupeLinks(contents?: string) {
  if (!contents) {
    return contents;
  }

  const dupeLink = /\[([^\)]+)\]\(\1\)/g;
  return contents.replace(dupeLink, (full: string, substring: string) => substring);
}

_.forEach(posts, post => {
  if (!post.path) {
    console.error('Malformed post:', post);
    throw new Error("Post was missing path, can't write it!");
  }

  console.log('checking', post.path);

  const withoutSmartQuotes = removeSmartQuotes(post.contents);
  const withoutDupeLinks = removeDupeLinks(withoutSmartQuotes);
  if (!withoutDupeLinks) {
    return;
  }

  const withoutDomain = withoutDupeLinks.split(config.domain).join('');

  writeIfDifferent(post.path, withoutDomain);
});
