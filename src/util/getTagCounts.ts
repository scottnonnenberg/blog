import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import toPairs from 'lodash/fp/toPairs';
import flatten from 'lodash/fp/flatten';
import fromPairs from 'lodash/fp/fromPairs';
import reverse from 'lodash/fp/reverse';
import groupBy from 'lodash/fp/groupBy';
import flow from 'lodash/fp/flow';

import { PostType } from 'src/types/Post';

export default flow(
  map((post: PostType) =>
    map(tag => [tag, 1])(post?.frontmatter?.tags)
  ),
  flatten,
  groupBy(0),
  toPairs,
  map(([name, list]) => [name, list.length]),
  sortBy(1),
  reverse,
  fromPairs,
);
