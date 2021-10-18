---
rank: 5
title: Static site generation with Gatsby.js
date: 2016-04-19T21:06:19.300Z
updatedDate: 2021-10-17T23:07:40.223Z
updatedCommit: aeac0ae7e5fbdc6ab8c0678ba211731e368e6bf3
path: /static-site-generation-with-gatsby-js/
tags:
  - reactjs
  - gatsbyjs
  - javascript
  - open-source
  - software
  - speaking
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/Wpkc8o1V_SU" frameborder="0" allowfullscreen></iframe>

_[This is an update to a talk I gave at the [Seattle React.js meetup in March 2016](http://www.meetup.com/seattle-react-js/events/228965559/). [Direct link to screencast.](https://www.youtube.com/watch?v=Wpkc8o1V\_SU) Looking for detailed tips on using Gatsby? [I've got a post for that!](/practical-gatsby-js/) Also, you can get into the deep details now that [this blog is open source!](/this-blog-is-now-open-source/)]_

I've been on the web for a long time. I was hand-editing HTML with [Notepad](https://en.wikipedia.org/wiki/Microsoft_Notepad) all the way back in 1997, uploading to [jps.net](http://www.yelp.com/biz/o1-communications-el-dorado-hills) or [Geocities](https://en.wikipedia.org/wiki/Yahoo!_GeoCities) via [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) with my parents' [14.4 kbit/s modem](https://en.wikipedia.org/wiki/Modem#Echo_cancellation.2C_9600_and_14.2C400). So I have a lot of experience running websites from static files.

[Gatsby](https://www.gatsbyjs.com/) is the first site generation tool I've used which feels right to me. It balances its production static file experience with a dynamic, full-fidelity authoring experience.

<div class='fold'></div>

## What is Gatsby?

It's a node module which weaves together [React.js](https://facebook.github.io/react/), [reach-router](https://github.com/reach/router), and [webpack](https://webpack.github.io/). You get a nice development experience with hot-reload for page contents, styles and page structure, and you're working with the same markup as what is generated to disk for production builds. It's as simple as running `gatsby develop` or `gatsby build` on the command-line.

It's particularly interesting for me because these are all the [same tools I use to build web applications](/r-for-react-nerp-stack-part-3/). Gatsby configures everything for you, resulting in the same benefits with a lot less work setting up a new project.

Big thanks to [Kyle Mathews](https://github.com/KyleAMathews) for starting and continuing to maintain the project. He initially released it back in [March 2015](https://github.com/gatsbyjs/gatsby/releases/tag/v0.1.0), and the most recent version is [3.14.0, released September 2021](https://github.com/gatsbyjs/gatsby/releases/tag/gatsby%403.14.0). I submitted [five pull requests in the early days](https://github.com/gatsbyjs/gatsby/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Ascottnonnenberg), and I reserve the right to jump back in! :0)

## Why static files?

Gatsby's production build gives you a collection of static files. It's quite a bit different from [tumblr](https://www.tumblr.com/), [ghost](https://ghost.org/) or [wordpress](https://wordpress.org/), all generated on-demand from a database.

With static files you can easily serve them with minimal configuration, using your favorite CDN, [github pages](https://pages.github.com/), or your own server with [nginx](https://www.nginx.com/). You don't need to worry about updating your published site due to a newly-discovered vulnerability in one of your dependencies. Or maintaining a database. A static site won't hog memory or CPU. It will continue doing its job through years of operating system and server updates.

Now, you may be thinking "that approach is fine for blogs and other toy sites, but not my site!" It's true. Blogs, documentation sites, and company or product marketing sites are all ideal cases for static sites. They are modified/deployed only by privileged users, and changed relatively infrequently. But let's get creative! What about a shopping site?

Let's really think about it. How often does the list of products change? Stock changes quickly, yes, but the overall set of products? What if you generated your entire site every night, and anything dynamic was via targeted javascript talking to a separate API? You could cache those static files aggressively. Just make sure your users haven't disabled javascript!

## Why single-page web app?

A surprising aspect of Gatsby is that it isn't just an authoring and basic static file build tool. It also assembles a full javascript [Single-Page App (SPA)](https://en.wikipedia.org/wiki/Single-page_application) for your site. Once it's loaded in a user's browser, further navigations are extremely fast due to Gatsby's pre-fetching of the users's likely next page.

If you're not familiar with SPAs, they use [browser history APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to make it seem like you are navigating between different pages on a site. But you aren't. Not really. The loaded app has or can request what it needs to generate each user-requested page on the fly. With Gatsby, the user's likely next steps are loaded up front - as you navigate through the site, often the only subsequent request is for page assets like images, and `page-data.json` files are fetched as the user gets deeper into your site.

Why would you want this? Performance is the first reason. Load time is nearly instantaneous if Gatsby has `page-data.json` files for it. It can also help if you're on a wireless connection where high latency makes each round trip with the server take a while - Gatsby will fetch information to render your intended page before you click the link.

But SPAs are not always a good idea. Let's do some quick math for my blog, excluding images:

* A plain HTML post:
    * [Initial download](https://blog.scottnonnenberg.com/a-holistic-health-checkin/): **10.5kb brotli'd** for the page, **2.9kb brotli'd** for css.
    * [Click a second page](https://blog.scottnonnenberg.com/a-35lb-weight-swing-in-two-years/): **11.1kb, brotli'd**
* A javascript-enabled post:
    * [Initial download](https://blog-js.scottnonnenberg.com/a-holistic-health-checkin/): **110kb, brotli'd** for the page, several javascript files and several JSON files.
    * [Click a second page](https://blog-js.scottnonnenberg.com/a-35lb-weight-swing-in-two-years/): **9.2kb, brotli'd** two JSON files describing this new page.

That's **97kb** extra for that first page load in the SPA. The good news is that the statically-generated HTML will be ready long before the javascript is, so we don't sacrifice much in the way of user experience. But it is **8x** the size of its plain HTML/CSS alternative. That multiplier can be worse - Gatsby's pre-fetch didn't kick in here. Pre-fetching will sometimes add several pages of `page-data.json` data to an initial page download. 

Of course, any pre-fetched page won't require any new data to render, but again may involve some downloads due to another set of of pre-fetch pages.

You'll have to figure out if the benefits of a javascript-enabled site are worth it for you. If you have any interactivity at all, maybe it is! 

## Getting started

Starting off with Gatsby is a snap, since it has quite a nice onboarding experience

```bash
yarn global add gatsby-cli
gatsby new
```

It will guide you through the process of initial project setup, and you'll very soon have a skeleton site running at `localhost:8000`. Update files and watch the hot reload magic happen before your eyes!

## Happy Gatsby-ing!

I really like React because of its flexibility - I can pre-render to static files, I can render on-demand on the server, or I can render on-demand on the client. And Gatsby makes it very easy to unlock that potential.

Thinking about jumping in? Take a look at my [Practical Gatsby.js post](/practical-gatsby-js/), to find out how to turn off javascript and make other important tweaks to your Gatsby site!

