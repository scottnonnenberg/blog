import React from 'react';
import DocumentTitle from 'react-document-title';
import last from 'lodash/last';

import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

import { TypographyStyle } from 'utils/typography';
import generateMetaTags from 'utils/generateMetaTags';


const now = new Date();
const buster = now.getTime();

export default function HTML(props) {
  const buildMode = Boolean(props.body);

  const post = props.routes ? last(props.routes).page : null;
  const path = props.location ? props.location.pathname : null;
  const metaTags = generateMetaTags(post, config, path);

  const title = props.title || DocumentTitle.rewind();
  const piwikSetup = buildPiwikSetup(config);
  const piwikNoScript = buildPiwikNoScript(path, config);
  const js = getJS(buildMode, config.noProductionJavascript);
  const css = getCSS(buildMode);

  const { favicon } = config;

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0" />
        {metaTags}
        <link rel="shortcut icon" href={favicon} />
        <TypographyStyle />
        {css}
      </head>
      <body className="landing-page">
        <div id="react-mount" dangerouslySetInnerHTML={{ __html: props.body }} />
        {js}
        {piwikSetup}
        {piwikNoScript}
      </body>
    </html>
  );
}

HTML.propTypes = { // eslint-disable-line
  body: React.PropTypes.string,
  title: React.PropTypes.object,
  location: React.PropTypes.object,
  routes: React.PropTypes.object,
};

function buildPiwikSetup({ domainCDN, domainPiwik }) {
  const js = `
    window._paq = window._paq || [];
    window._paq.push(['setTrackerUrl', '${domainPiwik}/piwik.php']);
    window._paq.push(['setSiteId', '3']);
    window._paq.push(['setCookieDomain', '*.scottnonnenberg.com']);
    window._paq.push(['setDomains', ['*.scottnonnenberg.com']]);
    window._paq.push(['enableLinkTracking']);
    window._paq.push(['trackPageView']);
    window._paq.push(['enableHeartBeatTimer']);

    window.start = new Date();

    // add tag
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.defer=true; g.async=true;
    g.src='${domainCDN}/js/piwik/2.15.0/piwik.min.js';
    s.parentNode.insertBefore(g,s);
  `;

  return <script
    type="text/javascript"
    dangerouslySetInnerHTML={{ __html: js }}
  />;
}

buildPiwikSetup.propTypes = {  // eslint-disable-line
  domainCDN: React.PropTypes.string,
  domainPiwik: React.PropTypes.string,
};


function buildPiwikNoScript(path, { domainPiwik, domain }) {
  const encodedPath = encodeURIComponent(domain + path);

  return <noscript>
    <img
      src={`${domainPiwik}/piwik.php?idsite=3&rec=1&url=${encodedPath}`}
      style={{ border: 0 }}
      alt="tracker"
    />
  </noscript>;
}

function getJS(buildMode, noProductionJavascript) {
  const bundle = <script async defer src={prefixLink(`/bundle.js?t=${buster}`)} />;

  if (buildMode && noProductionJavascript) {
    return null;
  }

  return bundle;
}

function getCSS(buildMode) {
  const stylesheet =
    <link rel="stylesheet" href={prefixLink(`/styles.css?t=${buster}`)} />;

  if (buildMode) {
    return stylesheet;
  }
}
