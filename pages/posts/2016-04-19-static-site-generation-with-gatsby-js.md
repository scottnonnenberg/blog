---
title: Static site generation with Gatsby.js
date: 2016-04-19T21:06:19.300Z
layout: post
path: /static-site-generation-with-gatsby-js/
next:
previous: /feeling-the-bern/
tags:
  - reactjs
  - nodejs
  - javascript
  - open-source
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Wpkc8o1V_SU" frameborder="0" allowfullscreen></iframe>

_[This is an adaptation of a talk I gave at the [Seattle React.js meetup in March 2016](http://www.meetup.com/seattle-react-js/events/228965559/) ([screencast](https://www.youtube.com/watch?v=Wpkc8o1V_SU) embedded above), with some [additional detail](/static-site-generation-with-gatsby-js/#gatsby-tips-and-gotchas) for actually using it!]_

I’ve been on the web for a long time. I was hand-editing HTML with [Notepad](https://en.wikipedia.org/wiki/Microsoft_Notepad) all the way back in 1997, uploading to [jps.net](http://www.yelp.com/biz/o1-communications-el-dorado-hills) or [Geocities](https://en.wikipedia.org/wiki/Yahoo!_GeoCities) via [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) with my parents’ [14.4 kbit/s modem](https://en.wikipedia.org/wiki/Modem#Echo_cancellation.2C_9600_and_14.2C400). So I have a lot of experience running websites from static files.

[Gatsby](https://github.com/KyleAMathews) is the first tool I’ve used which feels right to me. It balances its production static file experience with a dynamic, full-fidelity authoring experience.

<div class='fold'></div>

## What is Gatsby?

It’s a node module which weaves together [React.js](https://facebook.github.io/react/), [React-Router](https://github.com/reactjs/react-router), [webpack](https://webpack.github.io/), and [webpack-static-site-generator](https://github.com/markdalgleish/static-site-generator-webpack-plugin). You get a nice development experience with hot-reload for page contents, styles and page structure, and you're working with the same markup as what is generated to disk for production builds. It’s as simple as running `gatsby develop` or `gatsby build` on the command-line.

It’s particularly interesting for me because these are all the [same tools I use to build web applications](https://blog.scottnonnenberg.com/r-for-react-nerp-stack-part-3/). Gatsby configures everything for you, resulting in the same benefits with a lot less work setting up a new project.

Big thanks to [Kyle Mathews](https://github.com/KyleAMathews) for starting and continuing to maintain the project. He initially released it back in [March 2015](https://github.com/gatsbyjs/gatsby/releases/tag/v0.1.0), and the most recent version is [0.9.1, released April 9 2016](https://github.com/gatsbyjs/gatsby/releases/tag/v0.9.1).

## Why static files?

Gatsby’s production build gives you a collection of static files. It’s quite a bit different from [tumblr](https://www.tumblr.com/), [ghost](https://ghost.org/) or [wordpress](https://wordpress.org/), all generated on-demand from a database.

With static files you can easily serve them with minimal configuration, using your favorite CDN, [github pages](https://pages.github.com/), or your own server with [nginx](https://www.nginx.com/). You don’t need to worry about updating your published site due to a newly-discovered vulnerability in one of your dependencies. Or maintaining a database. They won’t hog memory or CPU. They’ll continue doing their job through years of operating system and server updates.

Now, you may be thinking "that approach is fine for blogs and other toy sites, but not my site!" It’s true. Blogs, documentation sites, company or product marketing sites are all ideal cases for static sites. They are modified/deployed only by privileged users, and changed relatively infrequently. But let’s get creative! What about a shopping site?

Let’s really think about it. How often does the list of products change? Stock changes quickly, yes, but the overall set of products? What if you generated your entire site every night, and anything dynamic was via targeted javascript talking to a separate API? You could cache those static files aggressively. Just make sure your users haven’t disabled javascript!

## Why single-page web app?

A surprising aspect of Gatsby is that it isn’t just an authoring and basic static file build tool. It also assembles a full javascript Single-Page App (SPA) for your site. Once it’s loaded in a user’s browser, no further page requests are made!

If you’re not familiar with SPAs, they use [browser history APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to make it look like it is navigating between different pages on a site. But it isn’t. The loaded app has all it needs to generate each of user-requested page on-demand, using cached or newly-requested data. With Gatsby, all posts are loading up front - as you navigate through the site, the only subsequent requests are for images.

Why would you want this? Well, perhaps you’re in a coffee shop and you want to download as much as possible while your connection is still new and fresh. Or you’re on a wireless connection where high latency makes each round trip with the server take a while - get the entire site at once, and subsequent navigations will be quick.

But SPAs are not always a good idea. Let’s do some quick math for my blog:

* Plain HTML files:
    * Initial download: **8-14kb, gzipped**
    * Subsequent pages: **8-14kb, gzipped**
* Single-Page App:
    * Initial download: **~230kb, gzipped** (218kb bundle.js + 8-12kb for html page)
    * Subsequent pages: **none**

And what’s the average number of pageviews per session on my blog? **Two.** That means, the average user will download **200kb** more than they need. Not to mention all the effort spent decompressing, parsing and running all that code!

And it will only get worse as I add more posts to my site. So I turned off the SPA. What you’re looking at right now is a flat HTML file generated from markdown and React components at build time.

## Gatsby Tips and Gotchas

#### Upgrades

Gatsby is still in flux, so upgrading between versions can be pretty rough. `0.7` to `0.8` was a good amount of work because React-Router updated beneath it. `0.8` to `0.9` was far easier. Happily, the [release notes](https://github.com/gatsbyjs/gatsby/releases) are getting better with every release.

#### Directory structure

Start with the [Gatsby Blog Starter Kit](https://github.com/gatsbyjs/gatsby-starter-blog), but remember that your posts can be structured however you want. They don't have to be in subfolders like that.

#### Navigate hook

You can get central notifications on route changes in [`gatsby-browser.js`](https://github.com/gatsbyjs/gatsby#structure-of-a-gatsby-site). Useful if your site usage tracker isn't HTML5 History API-aware.

#### Don’t want the SPA?

You need `bundle.js` in `develop` mode because there’s no server rendering, but not in `build` mode. You don’t want `styles.css` in `develop` mode, but you need it in `build` mode because webpack won’t be there to inject the styles.

The key is to know which mode you’re in. This is how I do it in my HTML React component (`html.js` in root directory):

```
// inside HTML component render() method
const productionBuild = Boolean(this.props.body);
```

#### Caching

The Gatsby Blog Starter Kit [doesn’t support good caching practices by default](https://github.com/gatsbyjs/gatsby-starter-blog/blob/dc2746a93f8a553985366a0c00c137e3a381b8d5/html.js#L35). You can   by adding a cache buster to your HTML React component. Then you can tell your host that `bundle.js` or `style.css` should be cached by browsers for a long time.

```
// outside the HTML component
const now = new Date();
const buster = now.getTime();

// inside its render() method
<script src={`/bundle.js?t=${buster}`}/>
```

#### Meta tags

For the [best formatting in your shares to social media](https://moz.com/blog/meta-data-templates-123), and the [best treatment by search engines](https://support.google.com/webmasters/answer/79812?hl=en), you’ll want to add some structured data to your page, usually `meta` tags. To do that, you’ll need page-specific details in your HTML React component. In `render()` you can access complete React-Router information on `props`:

  * `location` - its `pathname` key will give you the current URL
  * `routes` - an array of all matched routes. The last one will be the target page, and its `data` key will include all [frontmatter](https://jekyllrb.com/docs/frontmatter/) from the top of the file as well as `body`, the final HTML generated from the target file.

Jjust remember that you won’t get these in `develop` mode, only `build`.

#### Deep linking

Say you’d like to allow for deep-linking into your posts using headers. There’s a great plugin for [`markdown-it`](https://github.com/markdown-it/markdown-it) to do this: [`markdown-it-anchor`](https://www.npmjs.com/package/markdown-it-anchor).

Sadly, without Gatsby’s [forthcoming plugin system (slide 25)](http://www.slideshare.net/kylemathews/presentation-on-gatsby-to-sf-static-web-tech-meetup), I need to maintain my own local fork to change how markdown is generated.

Even sadder, the world of scrolling in SPAs is pretty nasty. Browsers do some interesting  tricks to make sure your deep link works even if some images aren’t loaded yet, and today a SPA needs to try to replicate that. I’ve tried this in `wrappers/md.js`, but I’m not really satisfied with it.

```
// inside MarkdownWrapper component
scroll: function() {
  const hash = window.location.hash;
  if (hash) {
    const id = hash.replace('#','');
    const element = document.getElementById(id);
    if (element && element.scrollIntoView) {
      element.scrollIntoView();
    }
  }
},

componentDidMount: function() {
  setTimeout(this.scroll, 0);
},

componentWillReceiveProps: function() {
  setTimeout(this.scroll, 0);
},
```

#### Local links

By default, links to other pages in your site from markdown-generated HTML will cause a full refresh of the page, defeating the purpose of a SPA. You can fix that with the [`catch-links`](https://github.com/substack/catch-links) node module. Try something like this in `wrappers/md.js`:

```
import catchLinks from ‘catch-links’;

// inside MarkdownWrapper component
contextTypes: {
  router: React.PropTypes.object.isRequired
},

componentDidMount: function() {
  const _this = this;
  catchLinks(this.refs.markdown, function(href) {
    _this.context.router.push(href);
  });
},

render: function() {
  const htmlFromMarkdown = this.props.route.data.body;
  // ...
  <div
    ref="markdown"
    className="markdown"
    dangerouslySetInnerHTML={{__html: htmlFromMarkdown}}
  />
  // ...
}
```

## Processing markdown directly

I’ve found a few reasons to parse my markdown files outside of the Gatsby infrastructure:

* I have a tool that connects to my analytics system to get the latest stats, then injects a `rank` property into the frontmatter of my markdown files. I sort on that on my [popular](https://blog.scottnonnenberg.com/popular) page.
* I wrote a little script to generate [Atom](http://blog.scottnonnenberg.com/atom.xml)/[RSS](https://blog.scottnonnenberg.com/rss.xml) feed XML files. The excellent [`feed`](https://github.com/jpmonette/feed) node module was quite useful.
* My [tags](https://blog.scottnonnenberg.com/tags) page is built with frontmatter data from all my posts. My tool generates a very basic javascript file for each tag into the `pages/tags` directory of my project. This is because [Gatsby doesn’t yet support dynamic routing](https://github.com/gatsbyjs/gatsby/issues/33).

So, here’s my code to get all posts ready for further processing. Note that I use a simple `readdirSync()` because all my posts are in that single directory for now. You could easily switch this to using [`glob`](https://github.com/isaacs/node-glob).

```
import fs from ‘fs’;
import path from ‘path’;

import _ from ‘lodash’;
import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
});

export default function loadPosts() {
  const postsPath = path.join(__dirname, '../pages/posts');
  const postFiles = fs.readdirSync(postsPath);

  const posts = _.map(postFiles, function(file) {
    const filePath = path.join(postsPath, file);
    const contents = fs.readFileSync(filePath).toString();
    const metadata = frontMatter(contents);

    return {
      path: filePath,
      contents: contents,
      body: md.render(metadata.body),
      data: metadata.attributes
    };
  });
}

```

## Happy Gatsby-ing!

I really like React because of its flexibility - I can pre-render to static files, I can render on-demand on the server, or I can render on-demand on the client. And Gatsby makes it very easy to unlock that potential.

---

_A little bit more:_

Kyle Mathews recent gave a talk on Gatsby: [http://www.slideshare.net/kylemathews/presentation-on-gatsby-to-sf-static-web-tech-meetup](http://www.slideshare.net/kylemathews/presentation-on-gatsby-to-sf-static-web-tech-meetup)

This blog is based on Gatsby. The code samples were copied from within the same git repository. Meta!
