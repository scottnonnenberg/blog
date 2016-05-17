export default function intersperce(items, toInject) {
  if (!items || !items.length) {
    return [];
  }

  const start = [items[0]];

  return items
    .slice(1)
    .reduce((result, item) => result.concat([toInject, item]), start);
}
