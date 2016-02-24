
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

function getDuration() {
  const start = window.start || new Date();
  const now = new Date();
  const difference = now.getTime() - start.getTime();

  if (difference === 0) {
    return null;
  }
  else {
    return difference;
  }
}

exports.onRouteChange = function(state, page) {
  window._paq = window._paq || [];

  if (!page) {
    return;
  }

  const data = page.data || {};
  const title = data.title || page.path;

  if (first) {
    first = false;
    window._paq.push(['trackEvent', 'javascript', 'load', 'duration', getDuration()]);
  }
  else {
    window._paq.push(['setCustomUrl', page.path]);
    window._paq.push(['setDocumentTitle', document.domain + '/' + title]);
    window._paq.push(['trackPageView']);
  }
};
