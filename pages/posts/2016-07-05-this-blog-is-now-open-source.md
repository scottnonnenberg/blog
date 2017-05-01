---
rank: 16
title: This blog is now open source!
date: 2016-07-05T18:43:01.950Z
layout: post
path: /this-blog-is-now-open-source/
next: /private-node-js-modules-a-journey/
previous: /notate-better-javascript-callstacks/
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
2. When it's time to post, I use [this export script](https://github.com/mangini/gdocs2md/blob/master/converttomarkdown.gapps) to email the Markdown version to myself.
3. I create the new file for the post using `npm run make-post -- "Post Title"`. In many cases I'll update the filename and _[frontmatter](https://jekyllrb.com/docs/frontmatter/)_ date to reflect a future publish date.
4. I copy the script-generated Markdown into the new file, then start cleaning it up. The export script inserts blank lines between every bullet item and line of code, so I fix that manually. It can also easily mess up bold/italic formatting, so I'm finding more and more that I use Markdown text-formatting syntax inside Google Docs.
5. Some cleanup tasks can be automated, so I run `npm run clean-post` to remove smart quotes, absolute links to my own blog (which should be relative to [preserve the SPA](/practical-gatsby-js/#local-links)), and duplicated links (same target as text).
6. Next is a final visual check and edit, via `npm run develop` and a browser at http://localhost:8000. This has the benefit of hot reload, so I can see any file updates immediately.
7. If I've added any new tags, I run `npm run generate-tags` to ensure there's a JavaScript file in `pages/tags/` for each.
8. With that, I'm ready to commit the changes in [Git](https://git-scm.com/) - one new post, and an update to the `next` link in the next-to-last post. Maybe a new tag file or two.
9. Final check with `npm run build-production`, `npm run serve` and a browser at http://localhost:8000.
10. With that static file server running, I can check for broken links on the new post: `npm run check-links -- http://localhost:8000/post-title/`.
11. With everything in good shape, I can push the files in `public/` to production! Before I post to social media, it's a good idea to verify the post metadata with [Facebook](https://developers.facebook.com/tools/debug/) and [Twitter](https://cards-dev.twitter.com/validator) debugging tools.

Whew! It's quite a bit, eh? I won't lie - I would absolutely like [a better solution](https://github.com/gatsbyjs/gatsby/issues/33) for the tags. :0)

The project readme also covers these key commands. But some of the more complex aspects of the project aren't covered there. Let's take a look...

## Tests

While I do rely on visual inspection for my post content, I will be notified via a _build_- or _develop_-time error if my _frontmatter_ is malformed. I can't use the same technique to tell if my [React](https://facebook.github.io/react/) components are in good shape - I either get somewhat cryptic errors during _build_, or I need to navigate through the entire site in _develop_ mode.

I wanted better.

I added [Enzyme](https://github.com/airbnb/enzyme) to the project and started testing my React components in [Node.js](https://nodejs.org/) with [Mocha](https://mochajs.org/). Enzyme is a great tool, and things were going swimmingly. Until I loaded my first React component that loaded Gatsby-specific modules:

```javascript
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers';
```

Both of these are fake modules, provided via custom [Webpack](https://webpack.github.io/) module resolution. They don't exist in Node.js!

### Fake modules

To get my tests to run, I brought in a new node module I had never used before: [`mock-require`](https://github.com/boblauer/mock-require). For example, I can make a fake `config` module like this, in [`test/setup/fakes/config.js`](https://github.com/scottnonnenberg/blog/blob/e2b953fbe1bd1e134de42cb71cb432c5f3791982/test/setup/fakes/config.js):

```javascript
import fs from 'fs';
import path from 'path';

import mock from 'mock-require';
import toml from 'toml';

const configPath = path.join(__dirname, '../../../config.toml');
export const config = toml.parse(fs.readFileSync(configPath).toString());

mock('config', {
  config,
});
```

I had to tell [`eslint-plugin-import`](https://github.com/benmosher/eslint-plugin-import) about these fakes too, because it was giving me lint errors for missing dependencies. That's why you see the `export const config` above; to satisfy the [`import/named`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md) rule. My `import/resolver` setting now [includes two paths](https://github.com/scottnonnenberg/blog/blob/dc92cd27f1d63cf4e7f8782c6dc4dc0b44cdba0e/.eslintrc.js#L17-L23):

```javascript
{
  settings: {
    'import/resolver': {
      node: {
        paths: [
          // to enable absolute paths
          __dirname,

          // so it finds fakes
          path.resolve(__dirname, 'test/setup/fakes')
        ],
      },
    },
  },
}
```

### Loading stylesheets

I ran into another roadblock the first time I tried to load a React component that imported a stylesheet:

```javascript
import 'css/styles.less';
```

Node.js can't load that! Node.js can only load JavaScript and JSON files!

Another new node module to the rescue: [`css-modules-require-hook`](https://github.com/css-modules/css-modules-require-hook). It didn't take much to make it load the [Less](http://lesscss.org/) and do nothing with it. I was [back in business](https://github.com/scottnonnenberg/blog/blob/3b3c7786702d98266b8aa6106d5592baf7d7851b/test/setup/css.js):

```javascript
import hook from 'css-modules-require-hook';

hook({
  extensions: '.less',
});
```

Again, ESLint needed a little help dealing with these problematic dependencies. In this case, I told `eslint-plugin-import` to [ignore JSON and stylesheets entirely](https://github.com/scottnonnenberg/eslint-config-thehelp/blob/313901f55c86fb94cf2a9ca18e29132b761975e5/core.js#L11-L17):

```javascript
{
  settings: {
    'import/ignore': [
      'node_modules',
      '\\.json$',
      '\\.(scss|less|css)$',
    ],
  },
}
```

### Manual test script

Yep, my automated tests are pretty great, and give me better confidence that the project is in good shape. Especially when making React changes. But I don't (and can't, really) check for everything with my automated tests, so I made myself a manual test script capturing the stuff not included in the easy-to-remember `npm test` shorthand.

In [`test/manual.txt`](https://github.com/scottnonnenberg/blog/blob/a315ddc9bf92ba9051e0b28dde0308bc26bcfbc3/test/manual.txt) you'll find all sorts of stuff. Mention of SPA scroll and link behavior, tricky per-browser stuff. Analytics verifications. RSS/Atom validation, etc. Some easy-to-run scripts too...

## Checking for broken links

This is another form of testing, one all-too-often neglected. A broken link can sometimes come from author error, because the URL never existed in the first place. But more often it's due to the shifting sands of the ever-changing internet. But that's not why I started investigating this space. I wanted to ensure that [deep links](/practical-gatsby-js/#anchor-links) pointing within my blog still worked!

Immediately after starting my search I was happy to discover that the Node.js ecosystem had come through once more: [`broken-link-checker`](https://github.com/stevenvachon/broken-link-checker) is a node module that does exactly what you'd expect. After a little bit of difficulty trying to use it with Node.js v6 ([now fixed - by me!](https://github.com/stevenvachon/broken-link-checker/pull/32)), I was in business. In my [`package.json`](https://github.com/scottnonnenberg/blog/blob/45ca0189f9a86f64c02bb7a1b04bb84573288b07/package.json#L18-L21) I've got four scripts:

```JSON
{
  "scripts": {
    "check-internal-links": "broken-link-checker http://localhost:8000/ --recursive --ordered --exclude-external --filter-level=3",
    "check-external-links": "broken-link-checker http://localhost:8000/ --recursive --ordered --exclude-internal --filter-level=3",
    "check-links": "broken-link-checker --ordered --filter-level=3",
    "check-deep-links": "babel-node scripts/check_deep_links.js",
  }
}
```

The first is very quick, since it keeps the checks local. The second takes longer, useful to do only occasionally to find those pesky sites without true _permalinks_. The third is useful for checking both internal and external links for a single URL - like when I'm about to publish a new post.

The fourth is a script I wrote which piggybacks on top of a `broken-link-checker` local-only run. It harvests those links, then ensures that any link ending in '#hash' has a corresponding `id="hash"` in the page. From [`scripts/check_deep_links.js`](https://github.com/scottnonnenberg/blog/blob/dc92cd27f1d63cf4e7f8782c6dc4dc0b44cdba0e/scripts/check_deep_links.js):

```javascript
if (contents.indexOf(` id="${id}"`) !== -1) {
  console.log(`${goodPrefix}${chalk.cyan(pathname)} contains '${chalk.blue(id)}'`);
  return true;
}
```

## Features

Some of the key parts of my blog required some creative solutions, code that might not be necessary using more fully-featured blogging tools. :0)

### Tagging

Because dynamic routing support in Gatsby is still forthcoming, I do a little bit of code generation to make my tags system work. First, I put all the logic for a single tag page into [one React component](https://github.com/scottnonnenberg/blog/blob/dc92cd27f1d63cf4e7f8782c6dc4dc0b44cdba0e/src/TagPage.js), so I could easily refer to it. Then I generated [this simple file](https://github.com/scottnonnenberg/blog/blob/12e542df91469d4407a36b9bb86aa3d713934ebd/src/_tagTemplate.js) into `pages/tags` for each tag, with 'TAG' replaced:

```javascript
import React from 'react';

import TagPage from 'src/TagPage';

export default function TagPageHost(props) {
  return <TagPage tag="TAG" {...props} />;
}
```

The meat of this process is in [`scripts/generate_tags.js`](https://github.com/scottnonnenberg/blog/blob/37b76b10e22e008934e6c6dfc3fd9f5e33da4632/scripts/generate_tags.js) and [`src/util/getTagCounts.js`](https://github.com/scottnonnenberg/blog/blob/12e542df91469d4407a36b9bb86aa3d713934ebd/src/util/getTagCounts.js).

### Popular posts

My popular posts list is taken directly from my [Piwik](http://piwik.org/) analytics data, an instance I manage myself. I'll cover it more deeply in the future, but for now I'll just say that I like to have full, private access to my data. :0)

In [`scripts/update_rankings.js`](https://github.com/scottnonnenberg/blog/blob/7b3da5cc07f8fd797582fcc3bae0b70d4d8d4fd4/scripts/update_rankings.js) I pull data from my Piwik instance, then update the `rank` _frontmatter_ value in all posts found in the data:

```javascript
function getNewContents(rank, contents) {
  const existingRank = /^rank: [0-9]+$/m;
  const newRank = /^[^-]*---/; // allows other stuff in file before ---

  if (existingRank.test(contents)) {
    return contents.replace(existingRank, `rank: ${rank}`);
  }

  return contents.replace(newRank, `---\nrank: ${rank}`);
}
```

### HTMLPreview

In my [last post I mentioned an `HTMLPreview` React component](/practical-gatsby-js/#html-previews) I use, and the `<div>` separator I use to specify what part of the post should be included in the preview. Now we can take a look at the details. The key is this method in the component, in [`src/HTMLPreview.js`](https://github.com/scottnonnenberg/blog/blob/37b76b10e22e008934e6c6dfc3fd9f5e33da4632/src/HTMLPreview.js#L19-L24):

```javascript
getHTMLPreview(post) {
  const html = post.data.body;
  const preFold = getPreFoldContent(html);
  const textLink = ` <a href="${prefixLink(post.path)}">Read more&nbsp;»</a>`;
  return appendToLastTextBlock(preFold, textLink);
}
```

[`getPreFoldContent()`](https://github.com/scottnonnenberg/blog/blob/12e542df91469d4407a36b9bb86aa3d713934ebd/src/util/getPreFoldContent.js) returns post content above the `<div>` separator, and eliminates any post explainers surrounded with square brackets (like at the top of this post). [`appendToLastTextBlock()`](https://github.com/scottnonnenberg/blog/blob/dc92cd27f1d63cf4e7f8782c6dc4dc0b44cdba0e/src/util/appendToLastTextBlock.js) is a relatively complicated method which inserts the provided 'Read More' link at the end of the last block with text in it. This is to allow for Markdown-generated `<p></p>` blocks around images or videos.

Both of these methods are also used in RSS/Atom/JSON generation, as well as the `<meta>` tags at the top of every page...

### Meta tags

Playing well in the modern world of social media previews takes some work. [Facebook](https://developers.facebook.com/docs/sharing/webmasters#markup), [Twitter](https://dev.twitter.com/cards/overview) and [Google](https://developers.google.com/search/docs/data-types/data-type-selector#site-structure-and-authorized-presence) each have different page metadata used to tune the presentation of your content.

[`src/util/generateMetaTags.js`](https://github.com/scottnonnenberg/blog/blob/b24cc91ce4f7b44145cb2298418c3aaea43efc60/src/util/generateMetaTags.js) generates tags for all three, using data from the target post and from your `config.toml`, returning an array then [used by `html.js`](https://github.com/scottnonnenberg/blog/blob/dc92cd27f1d63cf4e7f8782c6dc4dc0b44cdba0e/html.js#L21). Because it's an array, React requires the `key` property in the [JSX](https://jsx.github.io/):

```javascript
function create(name, value) {
  return <meta key={name} property={name} content={value} />;
}
```

For URLs generated for a post, I include a lot more data - images, description (built from the post preview), [JSON-LD](http://json-ld.org/), etc:

```javascript
[
  create('og:image', socialImage),
  create('twitter:image', socialImage),

  create('og:type', 'article'),
  create('og:title', data.title),
  create('og:description', description),
  create('article:published_time', date),

  create('twitter:card', twitterCardType),
  create('twitter:title', data.title),
  create('twitter:description', description),

  <script
    key="ld"
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(ld, null, '  ') }}
  />,
]
```

As the manual test script says, it's highly useful to test these tags using the official debugging tools provided by your target platforms.

### Fancy underlines

After encountering some better-looking links in the wild and reading [this great post](https://eager.io/blog/smarter-link-underlines/), I decided to use some [fancy CSS tricks for my links](https://github.com/scottnonnenberg/blog/blob/fe11498b5da21343a86613cd70ecdd0820d5616b/css/styles.less#L67-L73). We create a shadow behind the text which is the same color as the background, then add a gradient background for the underline. The shadow around descenders will interrupt the link underline, making the text easier to read. It works pretty well.

Sadly, because I don't have a way to specify link classes in markdown, I have to do something weird to eliminate inappropriate underlines from linked images: literal HTML including a `class` property. From my [Dangerous Cliffs of Node.js post markdown](https://github.com/scottnonnenberg/blog/blob/fe11498b5da21343a86613cd70ecdd0820d5616b/pages/posts/2015-02-11-the-dangerous-cliffs-of-node-js.md):

```html
<a class="plain" href="https://www.flickr.com/photos/craigmoulding/5881291261">
  <img
    src="https://static.sinap.ps/blog/2015/02_feb/beware_dangerous_cliff-1423614563162.jpg"
    alt="dangerous cliffs via craigmoulding on flickr"
  >
</a>
```

I think it's a reasonable tradeoff, but you might not agree. Now you know, and you can decide!

## Go for it!

There's a lot more to explore: [RSS/Atom XML generation](https://github.com/scottnonnenberg/blog/blob/a75189fec32f61ec6871d5765f349d8200b9f143/scripts/util/buildFeeds.js), [JSON generation](https://github.com/scottnonnenberg/blog/blob/369b65e9544f49d2fa63ef2176ed340d23c76c76/scripts/generate_json.js), [staging config and builds](https://github.com/scottnonnenberg/blog/blob/45ca0189f9a86f64c02bb7a1b04bb84573288b07/package.json#L14), [SPA navigation tracking in `gatsby-browser.js`](https://github.com/scottnonnenberg/blog/blob/dc92cd27f1d63cf4e7f8782c6dc4dc0b44cdba0e/gatsby-browser.js#L17-L29), and more. This is your chance to take something that works and tweak it. Make it something that really works for you!

Lemme know if you have any questions, and feel free to submit pull requests. Just remember to delete my posts first! :0)


