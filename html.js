import React from 'react';
import DocumentTitle from 'react-document-title';

import { prefixLink } from 'gatsby-helpers';

import { TypographyStyle } from 'utils/typography';
import generateMetaTags from 'utils/generateMetaTags';
import last from 'lodash/last';

import { config } from 'config';

function buildPiwikSetup({domainCDN, domainPiwik}) {
  return `
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
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript';
    g.defer=true; g.async=true; g.src='${domainCDN}/js/piwik/2.15.0/piwik.min.js';
    s.parentNode.insertBefore(g,s);
  `;
}

const now = new Date();
const buster = now.getTime();

export default class HTML extends React.Component {
  render() {
    const buildMode = Boolean(this.props.body);

    const { domainPiwik, domainCDN, favicon, domain } = config || {};
    const title = this.props.title || DocumentTitle.rewind();
    const path = this.props.location ? this.props.location.pathname : null;
    const encodedPath = encodeURIComponent(domain + path);
    const post = this.props.routes ? last(this.props.routes).page : null;

    const metaTags = generateMetaTags(post, config, path);

    const piwikSetup = buildPiwikSetup({domainCDN, domainPiwik});
    const bundle = <script async defer src={prefixLink(`/bundle.js?t=${buster}`)} />;
    const stylesheet =
      <link rel='stylesheet' href={prefixLink(`/styles.css?t=${buster}`)} />;

    let js = bundle;
    let css = null;
    if (buildMode) {
      js = null;
      css = stylesheet;
    }

    return (
      <html lang="en">
        <head>
          <title>{title}</title>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name='viewport' content='initial-scale=1.0'/>
          {metaTags}
          <link rel="shortcut icon" href={favicon}/>
          <TypographyStyle/>
          {css}
        </head>
        <body className="landing-page">
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          {js}
          <script type="text/javascript" dangerouslySetInnerHTML={{__html: piwikSetup}} />
          <noscript>
            <img
              src={`${domainPiwik}/piwik.php?idsite=3&rec=1&url=${encodedPath}`}
              style={{border: 0}}
            />
          </noscript>
        </body>
      </html>
    );
  }
}
