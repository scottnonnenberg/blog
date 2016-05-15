import './util/setupModulePath'; // eslint-disable-line

import _ from 'lodash';

import loadPosts from 'scripts/util/loadPosts';
import writeIfDifferent from 'scripts/util/writeIfDifferent';


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

_.forEach(posts, post => {
  console.log('checking', post.path);

  const contents = removeSmartQuotes(post.contents);

  writeIfDifferent(post.path, contents);
});
