export default function intersperce(items, toInject) {
  if (!items || !items.length) {
    return [];
  }

  var start = [items[0]];

  return items.slice(1).reduce(function(result, item) {
      return result.concat([toInject, item]);
  }, start);
};
