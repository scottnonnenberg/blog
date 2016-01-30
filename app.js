
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

  const data = page.data || {};
  const title = data.title || page.path;

  if (first) {
    first = false;
  }
  else {
    window._paq.push(['setCustomUrl', page.path]);
    window._paq.push(['setDocumentTitle', document.domain + '/' + title]);
    window._paq.push(['trackPageView']);
  }
}
