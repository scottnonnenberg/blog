import fs from 'fs';

import _ from 'lodash';

import loadPosts from '../utils/loadPosts';


const limit = parseInt(process.argv[2]) || 1;
const posts = loadPosts({
  limit,
  markdown: false
});

function removeSmartQuotes(value) {
  return value
    .replace(/[’‘]/g, '\'')
    .replace(/[“”]/g, '"');
}

_.forEach(posts, function(post) {
  console.log('checking', post.path);

  const contents = removeSmartQuotes(post.contents);

  fs.writeFileSync(post.path, contents);
});
