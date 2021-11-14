---
title: The great gatsby upgrade
date: 2021-10-17T23:07:40.223Z
path: /the-great-gatsby-upgrade/
tags:
  - gatsbyjs
  - reactjs
  - typescript
  - javascript
  - open-source
  - software
---

_[Fourth in a series of posts about [GatsbyJS](/tags/gatsbyjs/). All three initial posts have been updated: [1. Introduction and The SPA Calculation](/static-site-generation-with-gatsby-js/). [2. Tips for productionizing](/practical-gatsby-js/). [3. First notes on this blog's source code](/this-blog-is-now-open-source/).]_

In the past year I've upgraded this blog's version of [Gatsby](https://www.gatsbyjs.com/) not just [once](https://github.com/scottnonnenberg/blog/blob/main/CHANGELOG.md#200-2020-12-22), but [twice](https://github.com/scottnonnenberg/blog/blob/main/CHANGELOG.md#210-2021-09-23). And wow, it has gotten so much better. And so has my blog. [Fork it](https://github.com/scottnonnenberg/blog) and play around! Or, if you're not yet convinced, read on...

<div class='fold'></div>

## A powerful architecture

I could talk about any number of compelling Gatsby features, but the real game-changer for Gatsby is its deep extensibility. In the abstract, it is a system that surfaces data via self-documenting, type-safe [GraphQL](https://graphql.org/) to consuming code, with many built-in primitives for assembling the resultant high-performance web application.

It really is that abstract, because you need to add 'transformers' to Gatsby project to supply the data - there's nothing to start! For example, this blog uses [`gatsby-transformer-filesystem`](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/) to pull files from disk, [`gatsby-transformer-remark`](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/) to turn any markdown files found into HTML, and [`gatsby-transformer-sharp`](https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/) to process large images into various responsive sizes.

With that data, [my code then generates pages and other assets like RSS files](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L294-L350). But not before [tweaking the GraphQL a little as an optimization](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/gatsbyNode.ts#L205-L242) - a perfect sample of the deep extensibility available in the system.

## The ecosystem

A common pitfall of highly-customizable systems is that they are not accessible to the beginner. The most basic 'hello world' requires too many decisions, and the hunt through all the settings can be very lengthy.

Enter [gatsby plugins](https://www.gatsbyjs.com/plugins). Experts can tackle that comprehensive extensibility and package it up for everyone else to use! Some plugins are [very simple](https://www.gatsbyjs.com/plugins/gatsby-plugin-html-attributes), and some are [quite complex indeed](https://www.gatsbyjs.com/plugins/gatsby-source-wordpress).

The gatsby site reports over 2800 searchable plugins as of this writing. It was plenty for me! When updating my blog, things I had to do manually before became as simple as a search, then adding the plugin. No need to manually add and integrate [`catch-links`](https://www.npmjs.com/package/catch-links) - just add [`gatsby-plugin-catch-links`](https://www.gatsbyjs.com/plugins/gatsby-plugin-catch-links/) to your [`gatsby-config.js`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/#gatsby-skip-here)!

## The struggle

I won't lie to you. Despite these improvements, or perhaps because of them, it was not an easy process upgrading from [`0.12.7`](https://github.com/scottnonnenberg/blog/blob/9c2699d56dcf9755e7fbe99eb737f394d102da1f/package.json#L39) to [`3.13.0`](https://github.com/scottnonnenberg/blog/commit/0c51a2415778601d36abba1891741817babc50eb). Gatsby had changed a whole lot! I kept it simple: my goal for the upgrade was to keep the user experience exactly the same. No redesign rabbit holes. But it was still a major effort.

I had big plans in May 2020 of using quarantine time to upgrade to [Gatsby 2](https://www.gatsbyjs.com/blog/2018-09-17-gatsby-v2/). I got pretty far, but then stalled out due to [Storybook](https://storybook.js.org/)/Gatsby incompatibilities. And, of course, the other challenges inherent in trying to establish new routines in the face of [sweeping societal change](https://www.pewresearch.org/2021/03/05/in-their-own-words-americans-describe-the-struggles-and-silver-linings-of-the-covid-19-pandemic/). I bought a [rowing machine](https://shop.concept2.com/indoor-rowers/298-model-d-with-pm5.html) and played a lot of [Magic The Gathering Arena](https://magic.wizards.com/en/mtgarena) (more about both of these in future posts).

I came back in November of that year, started gaining momentum during the course of that month, and finished it all off the week of Thanksgiving. I made almost 60 commits that month! My first successful [Vercel](https://vercel.com/) deployment was [November 23rd 2020](https://github.com/scottnonnenberg/blog/commit/f99d5504d643468188005e05aa3a7b4591e754ae). Then there was another burst of activity in December to [improve performance](https://github.com/scottnonnenberg/blog/commit/fe725251510d8fb75ef9d23f022dc622a5ae9182) and [turn on Javascript in a branch](https://github.com/scottnonnenberg/blog/commits/js).

Now, as fall starts, almost a year later, [I just upgraded to Gatsby 3.13.0](https://github.com/scottnonnenberg/blog/blob/main/CHANGELOG.md#210-2021-09-23).

## Why Gatsby?

I first started using Gatsby in January 2016, and here we are in 2021. This is the longest I've stayed with one blogging platform. It had value for me as a React developer back then, but now it has a large collection of value propositions:

* **[Advanced handling of images, sharp-based preprocessing](https://www.gatsbyjs.com/docs/conceptual/using-gatsby-image/)** - it takes a lot of work to prepare an image for true responsiveness, given all the screen types out there today. [Photoshop automation](https://helpx.adobe.com/photoshop/using/processing-batch-files.html) or [ImageMagick scripts](https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/) can help, but it's a whole lot of bookkeeping to manage it all. Gatsby uses [`sharp`](https://sharp.pixelplumbing.com/) and a lot of performance tuning expertise to make your images look great, all within its comprehensive build step.
* **[High-performance defaults](https://www.gatsbyjs.com/docs/how-to/performance/improving-site-performance/)** - Performance is a key focus of the Gatsby ecosystem, and it means that a gatsby project does advanced things automatically: base64-encoded minimal representation of images along with other types of [progressive enhancement](https://www.gatsbyjs.com/docs/glossary/progressive-enhancement/), [code-splitting](https://webpack.js.org/guides/code-splitting/), and [prefetching](https://www.gatsbyjs.com/docs/how-code-splitting-works/). A fast initial load and fast subsequent clicks too.
* **[Intelligent file generation for proper caching](https://www.gatsbyjs.com/docs/caching/)** - Javascript, images, styles, and other assets are all named based on the hash of their contents. No cache busters needed; all of these files can be cached for a long time. Your public endpoints and the `page-data.json` files representing them can't be cached long-term, and that's it. [My caching configuration for Vercel](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/vercel.json) is quite simple.
* **[Self-documentation via GraphQL](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/)** - A lot of data is surfaced by Gatsby in GraphQL as soon as you add a few plugins, but it's never confusing. [The excellent GraphiQL exploration interface](https://www.gatsbyjs.com/docs/how-to/querying-data/running-queries-with-graphiql/) is available during `gatsby develop`, guiding you towards the queries you need to accomplish your goals.
* **[A push towards best practices](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3#css-modules-are-imported-as-es-modules)** - To be in the Gatsby ecosystem means that you are already using a lot of key best practices for web development, and both the [documentation](https://www.gatsbyjs.com/docs) and [community](https://www.gatsbyjs.com/contributing/community/#where-to-get-support) will continue in that path. For example, it's very easy to turn your Gatsby site into a [Progressive Web Application](https://www.gatsbyjs.com/docs/progressive-web-app/#gatsby-skip-here), if you choose. Sometimes you don't choose, and are instead pushed: [Gatsby 3.0 changed CSS module exports to ES modules](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3#css-modules-are-imported-as-es-modules) because it was the current state of the art. 
* **[React](https://reactjs.org/) and [Webpack](https://webpack.js.org/) under the covers** - These widely-used technologies give you the power, even without writing any Gatsby plugins, to make a Gatsby project a full-blown application or a simple static site. And I'm quite familiar with them, so I'm in my element. 

But I couldn't stop here. I had to go deeper to really make it mine.

## My customizations

Things have changed a lot since late 2016, the last time I made a large change to the technology of my blog. The industry has changed. I've changed. I now have a new set of requirements for code I'll be living with for a while.

* **[Typescript](https://www.typescriptlang.org/)** - Happily, Gatsby 3.0 made this easier: [`gatsby-plugin-typescript` plugin is now included by default](https://www.gatsbyjs.com/plugins/gatsby-plugin-typescript/). But it's still [a bit of a pain](https://github.com/scottnonnenberg/blog/commit/fc57953f1d8f8ca2c5f9b04e5f0d4fbbbb5dc184) to go 100% Typescript for a Gatsby project. Your core `gatsby-node.js` and `gatsby-config.js` files must be Javascript - I've done a few [backflips to keep them typed](https://github.com/scottnonnenberg/blog/commit/4bc1b17a60c2be33e387c712e004a2c636b655b9). And I've also added [a separate script for type-checking](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/package.json#L9), since that isn't done during a build. Next, I'd like to get type-checked GraphQL.
* **[Storybook](https://storybook.js.org/)** - My initial hurdle was with Gatsby's `<Link />` component. At the time, I wrote "Nothing found in my many google searches - people talking about it in the past, but none of their fixes work." The key, months later, was to dig in and understand how I needed to tweak Storybook's Webpack config to make things work. And I'm sure that some bugfixes landed too. But [I got there](https://github.com/scottnonnenberg/blog/commit/9f3fb16d6104c76e2b61d8ea39a56976f56a7919). It's so nice to add a permutation whenever I find a style bug.
* **[SCSS](https://sass-lang.com/)** - Influenced by the Gatsby defaults in the past, I was using [Less](https://lesscss.org/) for my blog. I never really liked it. I'm glad to be back to a familiar CSS preprocessor.
* **[CSS Modules](https://css-tricks.com/css-modules-part-1-need/) with generated [d.ts files](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)** - Gatsby does push you down the CSS modules path, but if I was going to use a more advanced system like this, I wanted typings! It [required a lot of work](https://github.com/scottnonnenberg/blog/commit/2ecc642603f8598ea6c4b757814400bbbed935a5) initially, but with Gatsby 3.0 it just requires a new plugin: [`gatsby-plugin-dts-css-modules`](https://www.gatsbyjs.com/plugins/gatsby-plugin-dts-css-modules/). CSS modules are great - once you have them, you can do really cool things like [minify your class names](https://github.com/scottnonnenberg/blog/commit/1f861fb22fec4e502dc7172e4840d5e10f4dd811)!
* **[GitHub Actions](https://github.com/features/actions) and [Yarn offline cache](https://yarnpkg.com/features/offline-cache/)** - It's a much simpler and much faster [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration) system than I had before!
* **[Prettier](https://prettier.io/)** - [A simple addition to the project](https://github.com/scottnonnenberg/blog/commit/c9b89840b2b7c0db96e9d89df0ff022ebbfd10b6), it keeps everything tidy.

You can see the full set of recent changes in the project's [change log](https://github.com/scottnonnenberg/blog/blob/main/CHANGELOG.md). These are just the highlights! 

## A contentious customization

I've [previously](/static-site-generation-with-gatsby-js/#why-single-page-web-app) [spoken](https://github.com/scottnonnenberg/blog#a-note-about-javascript) about my decision to disable Javascript on my blog. And this time around I did a good amount of work to maintain that decision in the face of a substantial amount of Gatsby change.

But it's not just about the theory - let's allow for the visceral sense of actually navigating with Gatsby's Javascript and without!

This blog has no Javascript (probably where you're reading this): **https://blog.scottnonnenberg.com**

And you can try out the Javascript-enabled version of this blog here, right now: **https://blog-js.scottnonnenberg.com**

What do you think?

## Giving Javascript a chance

The Javascript-enabled site is pretty fast, and most people tell me that they can't tell the difference between Javascript enabled and not. Funny enough, that says to me that downloading all that extra Javascript probably isn't worth it!

I really did give it a good-faith effort, though. I did a bunch of work to take the download size down, both the bundle sizes and the `page-data.json` files.

The very first thing I did was install the excellent [`gatsby-plugin-webpack-bundle-analyser-v2`](https://www.gatsbyjs.com/plugins/gatsby-plugin-webpack-bundle-analyser-v2/) gatsby plugin to help me zero in on problem areas. The obvious next step was to remove [lodash](https://github.com/scottnonnenberg/blog/commit/cf55baaffc3af2ff61a961afd10a2af5b4d93f29), [moment](https://github.com/scottnonnenberg/blog/commit/40d7254ff4618a4cb68618bd31d896a8e44bb2db), and [underscore.string](https://github.com/scottnonnenberg/blog/commit/fa8f3805fcd3acf1f7fd6086e51de0ea371ce91b) from the bundle, implementing myself the few functions I needed.

At that point it was time to look at what the browser was downloading. Spending time in the Network tab of the Chrome Dev Tools, I noticed that the `page-data.json` files for pages like [index](https://blog-js.scottnonnenberg.com), [popular](https://blog-js.scottnonnenberg.com/popular/) and [tags](https://blog-js.scottnonnenberg.com/tags/) were quite large. Again, pretty obvious when I dug in - the React components shouldn't be interacting with HTML at all, because that means all the HTML, for all the pages, has to be shipped to the client!

Now it started getting complex. I needed to think like I was writing a `gatsby-transformer-xxx` plugin - how might I surface just the information needed for each of my components? And the answer, like everything in Gatsby, is "expose it via GraphQL!" This is where the [createResolvers](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#createresolvers-api) Gatsby API comes in:

```typescript
  createResolvers: ({ createResolvers }: CreateResolversArgs): any => {
    const resolvers = {
      MarkdownRemark: {
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

This Typescript adds a new GraphQL field `htmlPreview` alongside the `html` field `gatsby-transformer-remark` already provides for our markdown files. The key tricky bit is that `info.schema.getType` and ultimate `resolve()` call - with those tortured lines we're querying that sibling `html` field in the GraphQL to get what we need to construct our custom result. The [full change](https://github.com/scottnonnenberg/blog/commit/fe725251510d8fb75ef9d23f022dc622a5ae9182) adds another `textPreview` field and updates the consuming GraphQL queries.

It was a really big step forward, and I was finally starting to get comfortable in this environment!

I made a couple more commits to further slim down my React components and I was set. A few principles:

* [Make sure the full `html` field is only fetched when displaying the whole post](https://github.com/scottnonnenberg/blog/commit/f29c243db43113e9529daedca11603853256d086) - everywhere else is some sort of pared-down preview
* [Fetch `htmlPreview`/`textPreview` fields only when necessary.](https://github.com/scottnonnenberg/blog/commit/494452d8643de9bfe164762a400cda4f690ae78b) For the index page, only the first few show HTML previews, the next set are plaintext, and the final set don't have any preview. We can express that right in the query.
* Use the full power of GraphQL, with parameters like `sort`, `skip` and `limit` to fetch minimal data. You can [reach into frontmatter data right in a GraphQL sort/filter clause](https://github.com/scottnonnenberg/blog/blob/f2732d9f118f099d0da63edb82185b478061ea81/src/pages/popular.tsx#L41)!

It's a far cry from the Gatsby of old, putting all of your posts in that single bundle. But it's still not good enough for my use case. I think the exercise was useful, despite that. And just maybe you'll find [my blog's `/js` branch](https://github.com/scottnonnenberg/blog/commits/js) a better starting point!

## Turning off Javascript

My [very first steps towards the Gatsby 2.0](https://github.com/scottnonnenberg/blog/commit/7dfc4b39618ccc77c324b31677257f919c5e794e) upgrade included [`gatsby-plugin-no-javascript`](https://www.gatsbyjs.com/plugins/gatsby-plugin-no-javascript/), because I wasn't about to have a core behavior of my blog go away with this so-called upgrade! It was quick and easy to install. At least the spirit of [my original `noProductionJavascript` option](https://github.com/gatsbyjs/gatsby/pull/181) was still around!

Once I had everything basically working post-upgrade, I started looking at the site more closely. I quickly discovered an errant 85kb Javascript [polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) file still included in my built pages. Disappointed that my plugin missed this, I pulled out one of my favorite quick-and-dirty tools: [`patch-package`](https://www.npmjs.com/package/patch-package). It shortens the fork/fix feedback loop into 'change the node module on disk and run `patch-package`' - no git URLs in your `package.json`, no new fork in your GitHub profile, no fuss. [I eliminated the unnecessary download with a quick patch](https://github.com/scottnonnenberg/blog/commit/26df79d7213cb19f098fac1035836cbbdc495eb9). 

From there I continued to find things that my original no-Javascript plugin wasn't eliminating. I [continued to patch](https://github.com/scottnonnenberg/blog/commit/1f861fb22fec4e502dc7172e4840d5e10f4dd811#diff-60f85a149abe4d1a56eed4ea91fbbd172e445414f30c1d698b58c42db3d9433cR1-R23), but I also found another highly-useful plugin: [`gatsby-plugin-no-javascript-utils`](https://www.gatsbyjs.com/plugins/gatsby-plugin-no-javascript-utils/). It allowed me to [drop inline styles](https://github.com/scottnonnenberg/blog/commit/1f861fb22fec4e502dc7172e4840d5e10f4dd811) for a separate CSS file I could include from all of my pages, caching aggressively. Now I was really in business!

Later, I decided to source the author image at the bottom of my pages from local assets instead of a separate CDN domain, and in so doing give it the same treatment all other images had on the site: a base64-encoded thumbnail, different sizes available for different screens, etc. Enter [`gatsby-image`](https://www.npmjs.com/package/gatsby-image). It was the recommended way to make images responsive, so I jumped in. But then I realized that it didn't work without Javascript! It put some code into a `<noscript>` tag, so it was ready for browsers with Javascript disabled, but not site builders excluding it entirely! I was shocked, because my images in my markdown-generated posts had worked so well, Javascript or no. Exit `gatsby-image`.

But `gatsby-image` didn't go far, really. As you do in this kind of situation, I [replicated much of it](https://github.com/scottnonnenberg/blog/commit/4e38909d39d27ae945fd6666385b420c3a72a2aa) for my author image. This is probably where I felt the most like an outsider in the Gatsby ecosystem, doing something the system wasn't really meant to do. But it works!

## The High and the Low

I definitely had my high points and low points during the process of refreshing my Gatsby knowledge and modernizing my blog.

**The good:**
* The ecosystem is great - you can find plugins that do most things, or at least good inspirations.
* GraphQL is powerful, typed, and self-documenting.
* The modern Gatsby API gives you a lot of extension points. I love that I can easily generate RSS/Atom in the build step without extra scripts.

**The bad:**
* It was a little difficult to turn off Javascript - but at least this time I didn't have to [pull request Gatsby itself](https://github.com/gatsbyjs/gatsby/pulls?q=is%3Apr+author%3Ascottnonnenberg)!
* Storybook was quite difficult to set up when I first tried!
* Typescript still isn't supported perfectly - I want a `gatsby-config.ts`!
* Major version upgrades are still painful, even from 2.x to 3.x.
  * Some key plugins didn't make the major version jump. In some cases that's just warnings on the console, and in other cases it's a full crash. [`patch-package` to the rescue once more!](https://github.com/scottnonnenberg/blog/commit/2e65e4d7789adf60bc1c49df41ff34df033b8984)
  * It was hard to figure out why the promised [v2 to v3 CSS modules change](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3#css-modules-are-imported-as-es-modules) wasn't working. Feels like I just happened to discover that [it was because I still had `gatsby-plugin-typescript` manually installed](https://github.com/scottnonnenberg/blog/commit/c9d17e60476bb2f4894249753e68d35d88644847).
  * I'm getting `The "fixed" and "fluid" resolvers are now deprecated` warnings, which tells me that I'm going to need to go back to `gatsby-image` soon. Maybe it's now ready for no-Javascript builders like me?
* There were some unfortunate breaking changes:
  * With a new markdown parser came new [sensitivities to certain nested formatting operators](https://github.com/scottnonnenberg/blog/commit/f612c86ef0456b8bf98dab00001d7f5d3d12ab87).
  * With a new plugin providing header anchor links, special characters were processed differently. Some deep links into my posts were broken.
  * My blog previously used [Typography.js](https://github.com/KyleAMathews/typography.js), but it hasn't been updated lately and its API had changed too radically. [So I ejected](https://github.com/scottnonnenberg/blog/blob/main/css/typography-compat.scss), using its generated CSS but none of its functionality.


## Fork away!

I've done a bunch of work to modernize my blog, and I like working with it much more than I used to. It's been a rewarding effort.

But it's not just about me. With my [readme and inline comments](https://github.com/scottnonnenberg/blog), it could be useful for you too! Fork it and add new storybook stories and React components! Start with the `/js` branch and add interactivity to the pages! Use it to express yourself, then deploy it to the world!

