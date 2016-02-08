import React from 'react';
import Typography from 'typography';
import DocumentTitle from 'react-document-title';

import { link } from 'gatsby-helpers';

import { TypographyStyle } from 'utils/typography';
import generateMetaTags from 'utils/generateMetaTags';
import CurrentState from 'components/CurrentState';


import highlightTheme from 'css/solarized-light.css';
import generalStyles from 'css/styles.css';


const now = new Date();
const buster = now.getTime();

export default class HTML extends React.Component {
  render() {
    const title = this.props.title || DocumentTitle.rewind();
    const { domainPiwik, domainCDN, favicon } = this.props.config || {};

    const state = CurrentState.rewind();
    const path = state ? state.path : null;
    const metaTags = generateMetaTags(this.props.page, this.props.config, path);

    const piwikSetup = `
      window._paq = window._paq || [];
      window._paq.push(['setTrackerUrl', '${domainPiwik}/piwik.php']);
      window._paq.push(['setSiteId', '3']);
      window._paq.push(['setCookieDomain', '*.scottnonnenberg.com']);
      window._paq.push(['setDomains', ['*.scottnonnenberg.com']]);
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['setDocumentTitle', document.domain + '/pre-js/' + document.title]);
      window._paq.push(['trackPageView']);
      window._paq.push(['enableHeartBeatTimer']);

      window.start = new Date();

      // add tag
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript';
      g.defer=true; g.async=true; g.src='${domainCDN}/js/piwik/2.15.0/piwik.min.js';
      s.parentNode.insertBefore(g,s);
    `;

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
          <style dangerouslySetInnerHTML={{__html: generalStyles + highlightTheme}} />
        </head>
        <body className="landing-page">
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script async defer src={link("/bundle.js?t=" + buster)} />
          <script type="text/javascript" dangerouslySetInnerHTML={{__html: piwikSetup}} />
          <noscript>
            <img src={`${domainPiwik}/piwik.php?idsite=3&rec=1`} style={{border: 0}} />
          </noscript>
        </body>
      </html>
    );
  }
}

HTML.defaultProps = { body: "" };
