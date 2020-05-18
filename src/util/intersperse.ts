/* eslint-disable @typescript-eslint/no-explicit-any */

export default function intersperse(items?: Array<any>, toInject?: any): Array<any> {
  if (!items || !items.length) {
    return [];
  }

  const start = [items[0]];

  return items.slice(1).reduce((result, item) => result.concat([toInject, item]), start);
}
