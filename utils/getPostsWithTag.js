import filter from 'lodash/filter';
import includes from 'lodash/includes';

export default function getPostsWithTag(posts, tag) {
  return filter(posts, post => includes(post.data.tags, tag));
}

