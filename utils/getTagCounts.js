import forEach from 'lodash/forEach';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import fromPairs from 'lodash/fromPairs';
import toPairs from 'lodash/toPairs';


export default function getTagCounts(posts) {
  const lookup = Object.create(null);

  forEach(posts, post => {
    forEach(post.data.tags, tag => {
      const list = lookup[tag] = lookup[tag] || [];
      list.push(post);
    });
  });

  let counts = toPairs(lookup);

  counts = map(counts, array => [array[0], array[1].length]);
  counts = sortBy(counts, array => array[1]);
  counts.reverse();

  return fromPairs(counts);
}
