import forEach from 'lodash/forEach';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import fromPairs from 'lodash/fromPairs';
import toPairs from 'lodash/toPairs';

export default function getTagCounts(posts) {
  const lookup = Object.create(null);

  forEach(posts, function(post) {
    forEach(post.data.tags, function(tag) {
      const list = lookup[tag] = lookup[tag] || [];
      list.push(post);
    });
  });

  let counts = toPairs(lookup);

  counts = map(counts, function(array) {
    return [array[0], array[1].length];
  });

  counts = sortBy(counts, function(array) {
    return array[1];
  });

  counts.reverse();

  return fromPairs(counts);
}
