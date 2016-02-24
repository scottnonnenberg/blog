import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';
import sortBy from 'lodash/collection/sortBy';
import zipObject from 'lodash/array/zipObject';
import pairs from 'lodash/object/pairs';

export default function getTagCounts(posts) {
  const lookup = Object.create(null);

  forEach(posts, function(post) {
    forEach(post.data.tags, function(tag) {
      const list = lookup[tag] = lookup[tag] || [];
      list.push(post);
    });
  });

  let counts = pairs(lookup);

  counts = map(counts, function(array) {
    return [array[0], array[1].length];
  });

  counts = sortBy(counts, function(array) {
    return array[1];
  });

  counts.reverse();

  return zipObject(counts);
}
