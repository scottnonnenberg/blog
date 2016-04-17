import fs from 'fs';

import _ from 'lodash';

import loadPosts from '../utils/loadPosts';

const posts = loadPosts();

function removeSmartQuotes(value) {
  return value
    .replace(/[’‘]/g, '\'')
    .replace(/[“”]/g, '"');
}

_.forEach(posts, function(post) {
  // console.log('checking', url);

  const contents = removeSmartQuotes(post.contents);

  fs.writeFileSync(post.path, contents);
});
