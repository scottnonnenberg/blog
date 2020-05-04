const filter = require('lodash/filter');
const includes = require('lodash/includes');
const get = require('lodash/get');

module.exports = function getPostsWithTag(posts, tag) {
  return filter(posts, post => includes(get(post, 'frontmatter.tags'), tag));
};
