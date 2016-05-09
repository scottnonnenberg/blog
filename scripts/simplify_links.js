import _ from 'lodash';

import loadPosts from '../utils/loadPosts';
import writeIfDifferent from '../utils/writeIfDifferent';


const limit = parseInt(process.argv[2], 10) || 1;
const posts = loadPosts({
  limit,
  markdown: false,
});

_.forEach(posts, post => {
  console.log('checking', post.path);

  const dupeLink = /\[([^\)]+)\]\(\1\)/g;
  const contents = post.contents.replace(dupeLink, (full, substring) => substring);

  // let match = dupeLink.exec(contents);
  // while (match ) {
  //   console.log(post.path);
  //   console.log(match[0]);
  //   match = dupeLink.exec(contents);
  // }

  writeIfDifferent(post.path, contents);
});
