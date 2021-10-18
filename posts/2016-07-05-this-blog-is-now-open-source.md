---
rank: 16
title: This blog is now open source!
date: 2016-07-05T18:43:01.950Z
updatedDate: 2021-10-17T23:07:40.223Z
updatedCommit: aeac0ae7e5fbdc6ab8c0678ba211731e368e6bf3
path: /this-blog-is-now-open-source/
tags:
  - gatsbyjs
  - open-source
  - javascript
  - reactjs
  - nodejs
---

_[I've got a [Gatsby introduction post](/static-site-generation-with-gatsby-js/), as well as [an intermediate-level post](/practical-gatsby-js/) for more specifics. I'd probably call this one an advanced-level post.]_

I just [open-sourced this blog](https://github.com/scottnonnenberg/blog), based on the [Gatsby](https://github.com/gatsbyjs/gatsby) static site generator. Very meta! You could be reading this on GitHub! I thought I'd walk through some of the more interesting details, and exactly how I use it.

<div class='fold'></div>

## My Workflow

Okay, so you've taken a look at the project, and you're feeling overwhelmed. I built up to all of this complexity over a couple months!

Let's start by talking about how exactly I write and publish a new post:

1. Posts start on [Google Docs](https://www.google.com/docs/about/). I have an _Outline_ folder with lots of ideas and an _In Progress_ folder where I work on drafts. I try to write more than I post in a given week, so I'm always getting more and more ahead of schedule. The Google Docs editor makes it really easy to bang out a post without worrying about [Markdown](https://en.wikipedia.org/wiki/Markdown) formatting. I can also invite others to review a post before it goes live.
2. When it's time to publish, I use [Google Docs Add-on](https://workspace.google.com/marketplace/app/docs_to_markdown/700168918607) get the Markdown version of the post.
3. I create the new file for the post using `yarn run make-post -- "Post Title"`. In many cases I'll update the filename and _[frontmatter](https://jekyllrb.com/docs/frontmatter/)_ date to reflect a future publish date.
4. I copy the script-generated Markdown into the new file, then start cleaning it up. The export script inserts blank lines between every bullet item and line of code, so I fix that manually. It can also easily mess up bold/italic formatting, so I'm finding more and more that I use Markdown text-formatting syntax inside Google Docs.
5. Some cleanup tasks can be automated, so I run `yarn run clean-post` to remove smart quotes, absolute links to my own blog (which should be relative to [preserve the SPA](/practical-gatsby-js/#local-links)), and duplicated links (same target as text).
6. Next is a final visual check and edit, via `yarn run develop` and a browser at http://localhost:8000. This has the benefit of hot reload, so I can see any file updates immediately.
7. Final check with `yarn run build-production`, `yarn run serve` and a browser at http://localhost:8000.
8. Now it's time to get the build in good shape. `yarn ready` checks for a successful build, type errors, code formatting, and broken links.
9. With that, I'm ready to commit the changes in [Git](https://git-scm.com/) - one new file under `posts/`
10. With everything in place, I can push to production! Before I post to social media, it's a good idea to verify the post metadata with [Facebook](https://developers.facebook.com/tools/debug/) and [Twitter](https://cards-dev.twitter.com/validator) debugging tools.

The project readme also covers these key commands. But some of the more complex aspects of the project aren't covered there. Let's take a look...

## Testing React components

While I do rely on visual inspection for my post content, I will be notified via a _build_- or _develop_-time error if my _frontmatter_ is malformed. I can't use the same technique to tell if my [React](https://facebook.github.io/react/) components are in good shape - I either get somewhat cryptic errors during _build_, or I need to navigate through the entire site in _develop_ mode.

I wanted better.

I added [Storybook](https://storybook.js.org/) to the project and added a good set of permutations for each React component in the project. You can start this up with `yarn storybook`.

Take a look at the configuration in `.storybook` to see what was needed to get it to work. You need to replicate what Gatsby is doing. The trickiest bit was the `loader-shim.js` file, necessary to make `gatsby-link` work properly.

### Manual test script

Yep, my automated tests are pretty great, and give me better confidence that the project is in good shape. Especially when making React changes. But I don't (and can't, really) check for everything with my automated tests, so I made myself a manual test script capturing the stuff not included in the easy-to-remember `yarn ready` shorthand.

In [`test/manual.txt`](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/test/manual.txt) you'll find imporatnat stuff:
- RSS/Atom validation
- Meta tag validation with the various social services.
- Proper configuration for the host - we want trailing slashes, proper redirects, and caching.
- Checking for broken links, which brings us to...

## Checking for broken links

This is another form of testing, one all-too-often neglected. A broken link can sometimes come from author error, because the URL never existed in the first place. But more often it's due to the shifting sands of the ever-changing internet. But that's not why I started investigating this space. I wanted to ensure that [deep links](/practical-gatsby-js/#anchor-links) pointing within my blog still worked!

Immediately after starting my search I was happy to discover that the Node.js ecosystem had come through once more: [`broken-link-checker`](https://github.com/stevenvachon/broken-link-checker) is a node module that does exactly what you'd expect. In my [`package.json`](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/package.json#L19-L22) I've got four scripts:

```
"check-internal-links": "broken-link-checker http://localhost:8000/ --recursive --ordered --exclude-external --filter-level=3",
"check-external-links": "broken-link-checker http://localhost:8000/ --recursive --ordered --exclude-internal --filter-level=3",
"check-links": "broken-link-checker --ordered --filter-level=3",
"check-deep-links": "babel-node scripts/check_deep_links.js",
```

The first is very quick, since it keeps the checks local. The second takes longer, useful to do only occasionally to find those pesky sites without true _permalinks_. The third is useful for checking both internal and external links for a single URL - like when I'm about to publish a new post.

The fourth is a script I wrote which piggybacks on top of a `broken-link-checker` local-only run. It harvests those links, then ensures that any link ending in '#hash' has a corresponding `id="hash"` in the page. From [`scripts/check_deep_links.ts`](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/scripts/check_deep_links.ts):

```javascript
if (contents.indexOf(` id="${id}"`) !== -1) {
  console.log(`${goodPrefix}${chalk.cyan(pathname)} contains '${chalk.blue(id)}'`);
  return true;
}
```

## Features

Some of the key parts of my blog required some creative solutions, code that might not be necessary using more fully-featured blogging tools. :0)

### Tagging

Gatsby's powerful APIs allow for arbitrary file creation, which allows me to create tag pages quite easily. I [query for the proper data](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L71-L104) (in this case, all posts), then [calculate the tag counts](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/src/util/getTagCounts.ts), then [generate the pages](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L132-L170):

```javascript
createPage({
  path: `/tags/${tag}`,
  component: tagPage,
  context: {
    tag,
    withText,
    justLink,
  },
});
```

### Popular posts

My popular posts list is calculated from _frontmatter_ **rank** data. Those ranks used to be taken directly from my analytics, but at the moment I have no analytics. Privacy for the win!

The magic here is all [in the GraphQL query](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/src/pages/popular.tsx#L41-L55):

```
allMarkdownRemark(limit: 20, sort: { fields: [frontmatter___rank], order: ASC }) {
```

### HTMLPreview

In my [last post I mentioned an `HTMLPreview` React component](/practical-gatsby-js/#html-previews) I use, and the `<div>` separator I use to specify what part of the post should be included in the preview. Now we can take a look at the details. The [`<HtmlPreview />` component](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/src/components/HTMLPreview.tsx) does render the pre-fold data, but it doesn't generate it. 

The preview is generated [deep in the GraphQL query](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L215-L228) to reduce our bundle sizes. We want to pass as little data as possible to the pages so our `page-data.json` files aren't inflated unecessarily.

We're defining a new queryable field in the GraphQL here. The tricky part is fetching the GraphQL fields generated by `gatsby-transformer-remark` to get the HTML it generates from our markdown files:

```typescript
htmlPreview: {
  type: 'String',
  resolve: async (source: PostType, args: any, context: any, info: any) => {
    const htmlField = info.schema.getType('MarkdownRemark').getFields()['html'];
    const html = await htmlField.resolve(source, args, context, info);

    const slug = source?.frontmatter?.path;
    if (!slug) {
      throw new Error(`source was missing path: ${JSON.stringify(source)}`);
    }
    return getHTMLPreview(html, slug);
  },
},
```

`getHtmlPreview` is [defined up-file](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L48-L52):

```typescript
function getHTMLPreview(html: string, slug: string): string | undefined {
  const preFold = getPreFoldContent(html);
  const textLink = ` <a href="${slug}">Read more&nbsp;»</a>`;
  return appendToLastTextBlock(preFold, textLink);
}
```

And finally, [`getPreFoldContent()`](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/src/util/getPreFoldContent.ts) returns post content above the `<div>` separator, and eliminates any post explainers surrounded with square brackets (like at the top of this post). [`appendToLastTextBlock()`](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/src/util/appendToLastTextBlock.ts) is a relatively complicated method which inserts the provided 'Read More' link at the end of the last block with text in it. This is to allow for Markdown-generated `<p></p>` blocks around images or videos.

Both of these methods are also used in RSS/Atom/JSON generation, as well as the `<meta>` tags at the top of every page...

### Meta tags

Playing well in the modern world of social media previews takes some work. [Facebook](https://developers.facebook.com/docs/sharing/webmasters#markup), [Twitter](https://dev.twitter.com/cards/overview) and [Google](https://developers.google.com/search/docs/data-types/data-type-selector#site-structure-and-authorized-presence) each have different page metadata used to tune the presentation of your content.

[`SEO.tsx`](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/src/components/SEO.tsx) generates tags for all three, using data from the target post and from top-level site metadata, returning components used by `react-helmet`. 

```typescript
function SEO({ pageTitle, post, location }: PropsType): ReactElement | null {
  const data: SiteMetadataQueryType = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              name
              email
              twitter
              url
              image
              blurb
            }
            blogTitle
            domain
            favicon
            tagLine
          }
        }
      }
    `
  );
  const { siteMetadata } = data.site;

  return (
    <Helmet>
      <title>{`${pageTitle} | ${siteMetadata.blogTitle}`}</title>
      <link rel="shortcut icon" href={siteMetadata.favicon} />
      {generateMetaTags(siteMetadata, post, location)}
    </Helmet>
  );
}
```

As the manual test script says, it's highly useful to test these tags using the official debugging tools provided by your target platforms.

## Go for it!

There's a lot more to explore: [RSS/Atom XML generation](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L294-L350), [JSON generation](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L352-L380), and more. This is your chance to take something that works and tweak it. Make it something that really works for you!

Lemme know if you have any questions, and feel free to submit pull requests. Just remember to delete my posts first! :0)


