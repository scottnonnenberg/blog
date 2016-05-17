import filter from 'lodash/filter';
import includes from 'lodash/includes';
import get from 'lodash/get';

export default function getPostsWithTag(posts, tag) {
  return filter(posts, post => includes(get(post, 'data.tags'), tag));
}
