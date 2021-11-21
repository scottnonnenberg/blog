import './util/setupModulePath';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import writeIfDifferent from 'scripts/util/writeIfDifferent';

import globalConfig from 'gatsbyConfig';

const config = globalConfig.siteMetadata;

const postsPath = join(__dirname, '../posts');
const mdFileFilter = /.md$/;

type BasicPostType = {
  contents: string;
  path: string;
};

function loadPosts(limit?: number): Array<BasicPostType> {
  const postFiles = readdirSync(postsPath);

  return postFiles
    .filter(file => mdFileFilter.test(file))
    .sort()
    .reverse()
    .slice(0, limit)
    .map(file => {
      const path = join(postsPath, file);
      const contents = readFileSync(path).toString();

      return {
        path,
        contents,
      };
    });
}

const firstArgument = process.argv[2];
const limit = firstArgument ? parseInt(firstArgument, 10) || 1 : 1;
const posts = loadPosts(limit);

function removeSmartQuotes(value?: string): string | undefined {
  if (!value) {
    return value;
  }

  return value.replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
}

function removeDupeLinks(contents?: string): string | undefined {
  if (!contents) {
    return contents;
  }

  const dupeLink = /\[([^)]+)\]\(\1\)/g;
  return contents.replace(dupeLink, (_full: string, substring: string) => substring);
}

posts.forEach(post => {
  console.log('checking', post.path);

  const withoutSmartQuotes = removeSmartQuotes(post.contents);
  const withoutDupeLinks = removeDupeLinks(withoutSmartQuotes);
  if (!withoutDupeLinks) {
    return;
  }

  const withoutDomain = withoutDupeLinks.split(config.domain).join('');

  writeIfDifferent(post.path, withoutDomain);
});
