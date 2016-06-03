/* eslint-disable thehelp/no-array-mutation */

import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';

export default function getPosts(allPages) {
  const posts = filter(allPages, page => {
    const data = page.data;
    return page.path && page.path !== '/' && data && data.body && !data.draft;
  });

  return sortBy(posts, page => page.data.date).reverse();
}
