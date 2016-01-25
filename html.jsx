import React from 'react';
import Typography from 'typography';
import DocumentTitle from 'react-document-title';
import { link } from 'gatsby-helpers'
import { TypographyStyle } from 'utils/typography'

const now = new Date();
const buster = now.getTime();


export default class Html extends React.Component {
  render() {
    const title = this.props.title || DocumentTitle.rewind();
    const { domainPiwik, domainCDN } = this.props.config || {};

    const piwikSetup = `
      window._paq = window._paq || [];
      window._paq.push(['setTrackerUrl', '${domainPiwik}/piwik.php']);
      window._paq.push(['setSiteId', '3']);
      window._paq.push(['setCookieDomain', '*.scottnonnenberg.com']);
      window._paq.push(['setDomains', ['*.scottnonnenberg.com']]);
      window._paq.push(['enableLinkTracking']);
      window._paq.push(['setDocumentTitle', 'blog/pre-js/' + document.title]);
      window._paq.push(['trackPageView']);

      // add tag
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript';
      g.defer=true; g.async=true; g.src='${domainCDN}/js/piwik/2.15.0/piwik.min.js';
      s.parentNode.insertBefore(g,s);
    `;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
          <title>{title}</title>
          <link rel="shortcut icon" href={this.props.favicon}/>
          <TypographyStyle/>
          <style dangerouslySetInnerHTML={{__html:
            `
              body {
                color: rgb(66,66,66);
              }
              h1,h2,h3,h4,h5,h6 {
                color: rgb(44,44,44);
              }
              a {
                color: rgb(42,93,173);
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
            `
          }}/>
        </head>
        <body className="landing-page">
          <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
          <script src={link("/bundle.js?t=" + buster)}/>
          <script type="text/javascript" dangerouslySetInnerHTML={{__html: piwikSetup}} />
          <noscript>
            <img src={`${domainPiwik}/piwik.php?idsite=3&rec=1`} style={{border: 0}} />
          </noscript>
        </body>
      </html>
    );
  }
}
Html.defaultProps = { body: "" };
