import React from 'react';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import map from 'lodash/map';

import { rhythm } from 'src/util/typography';
import intersperse from 'src/util/intersperse';
import shortDate from 'src/util/shortDate';

import SEO from 'src/components/SEO';
import Wrapper from 'src/components/Wrapper';
import Author from 'src/components/Author';

import ReadMore from 'src/components/ReadMore';
import EmailSignup from 'src/components/EmailSignup';

import 'css/solarized-light.less';


function renderTagLinks(tags) {
  if (!tags || !tags.length) {
    return null;
  }

  const tagLinks = map(tags, tag =>
    <Link key={tag} to={`/tags/${tag}/`}>{tag}</Link>
  );

  return <div><em>Tags:</em> {intersperse(tagLinks, ', ')}</div>;
}

export default function Post({ data, pageContext, location }) {
  const { previous, next } = pageContext;
  const post = data.markdownRemark;

  return (
    <Wrapper location={location} >
      <SEO post={post} location={location} />
      <div className="post">
        <h1 style={{ marginBottom: 0 }}>{post.frontmatter.title}</h1>
        <h3
          style={{
            color: 'lightgray',
            marginTop: 0,
            marginBottom: '1em',
            fontWeight: 'normal',
            letterSpaacing: '-2px',
          }}
        >{shortDate(post.frontmatter.date)}</h3>

        <div className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
        <EmailSignup callToAction="Enjoy this post? Sign up for free updates!" />
        <div
          className="metadata"
          style={{
            display: 'block',
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        >
          <div>
            <em>Posted:</em> {moment(post.frontmatter.date).format('MMMM D, YYYY')}
          </div>
          {renderTagLinks(post.frontmatter.tags)}
        </div>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
        <Author />
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(2),
          }}
        />
        <ReadMore previous={previous} next={next} />
      </div>
    </Wrapper>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;


// static propTypes = {
//   data: React.PropTypes.object.isRequired,
//   location: React.PropTypes.object.isRequired,
//   pageContext: React.PropTypes.object.isRequired,
//   route: React.PropTypes.object.isRequired,
// }
