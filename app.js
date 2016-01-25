
exports.loadContext = function(callback) {
  var context = require.context('./pages', true);
  if (module.hot) {
    module.hot.accept(context.id, function() {
      context = require.context('./pages', true);
      return callback(context);
    });
  }
  return callback(context);
};


var first = true;

exports.onRouteChange = function(state, page, pages, config) {
  window._paq = window._paq || [];

  if (!page) {
    return;
  }

  const title = data.title || page.path;

  if (first) {
    window._paq.push(['trackPageView', 'blog/boot-js/' + title]);
    first = false;
  }
  else {
    const data = page.data || {};
    window._paq.push(['setCustomUrl', page.path]);
    window._paq.push(['setDocumentTitle', 'blog/js/' + title]);
    window._paq.push(['trackPageView']);
  }
}
