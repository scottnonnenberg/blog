import fs from 'fs';

import _ from 'lodash';

import loadPosts from '../utils/loadPosts';

const limit = parseInt(process.argv[2]) || 1;
const posts = loadPosts({
  limit,
  markdown: false
});

_.forEach(posts, function(post) {
  console.log('checking', post.path);

  const dupeLink = /\[([^\)]+)\]\(\1\)/g;
  const contents = post.contents.replace(dupeLink, function(full, substring) {
    return substring;
  });

  // let match = dupeLink.exec(contents);
  // while (match ) {
  //   console.log(post.path);
  //   console.log(match[0]);
  //   match = dupeLink.exec(contents);
  // }

  fs.writeFileSync(post.path, contents);
});
