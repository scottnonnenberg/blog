import { graphql } from 'gatsby';

const query = graphql`
  query {
    site {
      siteMetadata {
        blogTitle
        author {
          url
          icon
          blurb
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
          }
        }
      }
    }
  }
`;

export default query;
