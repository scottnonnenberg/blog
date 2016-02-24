import filter from 'lodash/collection/filter';
import includes from 'lodash/collection/includes';

export default function getPostsWithTag(posts, tag) {
  return filter(posts, post => includes(post.data.tags, tag));
}

