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

_[This is an adaptation of a talk I gave at the [Seattle React.js meetup in March 2016](http://www.meetup.com/seattle-react-js/events/228965559/) [Direct link to screencast.](https://www.youtube.com/watch?v=Wpkc8o1V_SU)]_

I’ve been on the web for a long time. I was hand-editing HTML with [Notepad](https://en.wikipedia.org/wiki/Microsoft_Notepad) all the way back in 1997, uploading to [jps.net](http://www.yelp.com/biz/o1-communications-el-dorado-hills) or [Geocities](https://en.wikipedia.org/wiki/Yahoo!_GeoCities) via [FTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol) with my parents’ [14.4 kbit/s modem](https://en.wikipedia.org/wiki/Modem#Echo_cancellation.2C_9600_and_14.2C400). So I have a lot of experience running websites from static files.

[Gatsby](https://github.com/KyleAMathews) is the first site generation tool I’ve used which feels right to me. It balances its production static file experience with a dynamic, full-fidelity authoring experience.

<div class='fold'></div>

## What is Gatsby?

It’s a node module which weaves together [React.js](https://facebook.github.io/react/), [React-Router](https://github.com/reactjs/react-router), [webpack](https://webpack.github.io/), and [webpack-static-site-generator](https://github.com/markdalgleish/static-site-generator-webpack-plugin). You get a nice development experience with hot-reload for page contents, styles and page structure, and you're working with the same markup as what is generated to disk for production builds. It’s as simple as running `gatsby develop` or `gatsby build` on the command-line.

It’s particularly interesting for me because these are all the [same tools I use to build web applications](https://blog.scottnonnenberg.com/r-for-react-nerp-stack-part-3/). Gatsby configures everything for you, resulting in the same benefits with a lot less work setting up a new project.

Big thanks to [Kyle Mathews](https://github.com/KyleAMathews) for starting and continuing to maintain the project. He initially released it back in [March 2015](https://github.com/gatsbyjs/gatsby/releases/tag/v0.1.0), and the most recent version is [0.9.1, released April 9 2016](https://github.com/gatsbyjs/gatsby/releases/tag/v0.9.1). I've submitted [five pull requests thus far](https://github.com/gatsbyjs/gatsby/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3Ascottnonnenberg), and I think I'll continue! :0)

## Why static files?

Gatsby’s production build gives you a collection of static files. It’s quite a bit different from [tumblr](https://www.tumblr.com/), [ghost](https://ghost.org/) or [wordpress](https://wordpress.org/), all generated on-demand from a database.

With static files you can easily serve them with minimal configuration, using your favorite CDN, [github pages](https://pages.github.com/), or your own server with [nginx](https://www.nginx.com/). You don’t need to worry about updating your published site due to a newly-discovered vulnerability in one of your dependencies. Or maintaining a database. They won’t hog memory or CPU. They’ll continue doing their job through years of operating system and server updates.

Now, you may be thinking "that approach is fine for blogs and other toy sites, but not my site!" It’s true. Blogs, documentation sites, and company or product marketing sites are all ideal cases for static sites. They are modified/deployed only by privileged users, and changed relatively infrequently. But let’s get creative! What about a shopping site?

Let’s really think about it. How often does the list of products change? Stock changes quickly, yes, but the overall set of products? What if you generated your entire site every night, and anything dynamic was via targeted javascript talking to a separate API? You could cache those static files aggressively. Just make sure your users haven’t disabled javascript!

## Why single-page web app?

A surprising aspect of Gatsby is that it isn’t just an authoring and basic static file build tool. It also assembles a full javascript [Single-Page App (SPA)](https://en.wikipedia.org/wiki/Single-page_application) for your site. Once it’s loaded in a user’s browser, no further page requests are made!

If you’re not familiar with SPAs, they use [browser history APIs](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to make it seem like you are navigating between different pages on a site. But you aren't. Not really. The loaded app has all it needs to generate each user-requested page on-demand, using cached or newly-requested data from the server. With Gatsby, all posts are loading up front - as you navigate through the site, the only subsequent requests are for page assets like images.

Why would you want this? Well, perhaps you’re in a coffee shop and you want to download as much as possible while your connection is still new and fresh. Or you’re on a wireless connection where high latency makes each round trip with the server take a while - get the entire site at once, and subsequent navigations will be quick.

But SPAs are not always a good idea. Let’s do some quick math for my blog:

* Plain HTML files:
    * Initial download: **8-14kb, gzipped**
    * Subsequent pages: **8-14kb, gzipped**
* Single-Page App:
    * Initial download: **~230kb, gzipped** (218kb bundle.js + 8-14kb for html page)
    * Subsequent pages: **none**

And what’s the average number of pageviews per session on my blog? **Two.** That means, the average user will download **200kb** more than they need. Not to mention all the effort spent decompressing, parsing and running all that code!

And it will only get worse as I add more posts to my site. So I turned off the SPA. What you’re looking at right now is a flat HTML file generated from markdown and React components at build time.

## Getting started

Starting off with Gatsby is a snap, since it has a couple starter kits ready for you. To jump in with the blog starter kit:

```bash
git clone https://github.com/gatsbyjs/gatsby-starter-blog
cd gatsby-starter-blog
npm install
npm run dev
```

Open your browser to `localhost:8000` and you're off and running. Update files and watch the hot reload magic happen before your eyes!

## Happy Gatsby-ing!

I really like React because of its flexibility - I can pre-render to static files, I can render on-demand on the server, or I can render on-demand on the client. And Gatsby makes it very easy to unlock that potential.

---

_A little bit more:_

Kyle Mathews recently gave a talk on Gatsby: [http://www.slideshare.net/kylemathews/presentation-on-gatsby-to-sf-static-web-tech-meetup](http://www.slideshare.net/kylemathews/presentation-on-gatsby-to-sf-static-web-tech-meetup)
