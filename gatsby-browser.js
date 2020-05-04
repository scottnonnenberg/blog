/* eslint-disable import/no-commonjs, immutable/no-let, thehelp/no-mutation, thehelp/no-array-mutation */

let first = true;

function getDuration() {
  const start = window.start || new Date();
  const now = new Date();
  const difference = now.getTime() - start.getTime();

  if (difference === 0) {
    return null;
  }

  return difference;
}

exports.onRouteUpdate = ({ location }) => {
  window._paq = window._paq || [];

  if (first) {
    first = false;
    window._paq.push(['trackEvent', 'javascript', 'load', 'duration', getDuration()]);
  }
  else {
    window._paq.push(['setCustomUrl', location.pathname]);
    window._paq.push(['setDocumentTitle', location.pathname]);
    window._paq.push(['trackPageView']);
  }
};
