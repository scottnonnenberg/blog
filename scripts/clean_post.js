import './util/setupModulePath';

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import toml from 'toml';

import loadPosts from 'scripts/util/loadPosts';
import writeIfDifferent from 'scripts/util/writeIfDifferent';


const configPath = path.join(__dirname, '../config.toml');
const config = toml.parse(fs.readFileSync(configPath).toString());

const limit = parseInt(process.argv[2], 10) || 1;
const posts = loadPosts({
  limit,
  markdown: false,
});

function removeSmartQuotes(value) {
  return value
    .replace(/[’‘]/g, '\'')
    .replace(/[“”]/g, '"');
}

function removeDupeLinks(contents) {
  const dupeLink = /\[([^\)]+)\]\(\1\)/g;
  return contents.replace(dupeLink, (full, substring) => substring);
}

_.forEach(posts, post => {
  console.log('checking', post.path);

  const withoutSmartQuotes = removeSmartQuotes(post.contents);
  const withoutDupeLinks = removeDupeLinks(withoutSmartQuotes);
  const withoutDomain = withoutDupeLinks.split(config.domain).join('');

  writeIfDifferent(post.path, withoutDomain);
});
