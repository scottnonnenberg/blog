Patches are an easy way to make a small change to a dependency without fully forking it.

@types/react
  Small change to allow us to put a 'rel' attribute on our <form> tag in EmailSignup.tsx.

gatsby-plugin-mini-css-class-name
  Extended to handle WebPack 5 configurations provided in Gatsby v3. The traversal algorithm for finding the CSS modules loader needed to be more comprehensive.

gatsby-plugin-no-javascript
  Extended to remove three additional elements:
    - A style tag added by gatsby-remark-autolink-headers
    - A script tag added by gatsby-remark-autolink-headers
    - A 90k polyfill.js file pulled in by Gatsby

gatsby-plugin-scss-typescript
  So we can generate the scss.d.ts files on develop and on build, deeper changes to bring the compatibility needed to combine css-loader and typings-for-css-modules-loader.
