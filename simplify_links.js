import fs from 'fs';
import path from 'path';

import _ from 'lodash';

import loadPosts from './utils/loadPosts';

const posts = loadPosts();

_.forEach(posts, function(post) {
  // console.log('checking', url);

  let contents = post.contents;
  const dupeLink = /\[([^\)]+)\]\(\1\)/g;

  let match = dupeLink.exec(contents);
  contents = contents.replace(dupeLink, function(full, substring) {
    return substring;
  })

  // while (match ) {
  //   console.log(post.path);
  //   console.log(match[0]);
  //   match = dupeLink.exec(contents);
  // }

  fs.writeFileSync(post.path, contents);
});
