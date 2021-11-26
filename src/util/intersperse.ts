import type { ReactElement } from 'react';

export function intersperse(
  items?: Array<ReactElement | string>,
  toInject?: string
): Array<ReactElement | string> {
  if (!items || !items.length) {
    return [];
  }
  if (!toInject) {
    return items;
  }

  const start = items[0];
  if (!start) {
    return [];
  }

  return items
    .slice(1)
    .reduce((result, item) => result.concat([toInject, item]), [start]);
}
