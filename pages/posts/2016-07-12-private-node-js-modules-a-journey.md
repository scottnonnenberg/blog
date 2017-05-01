---
rank: 17
title: "Private Node.js modules: A journey"
date: 2016-07-12T18:34:05.655Z
layout: post
path: /private-node-js-modules-a-journey/
next: /better-changelogs-strings-and-paths/
previous: /this-blog-is-now-open-source/
tags:
  - nodejs
  - javascript
  - software
---

One of the [best benefits](/node-js-is-not-magical/#4-small-projects) of [Node.js](https://nodejs.org/) is the ease of extracting code into its own new project. But you probably won't want to make that code fully [public](https://www.npmjs.com).

It took me quite a while to get to a solution I was happy with for my private modules. Let's start at the beginning.

<div class='fold'></div>

## Clumsy beginnings: git submodules

I built my [first Node.js app](https://scottnonnenberg.com/work/#liffft-2012-q-1-to-2013-q-2) in 2012, using a single `git` repository. Having come from [Rails](http://rubyonrails.org/), this was very comfortable. As we got closer to that first demo with customers, the project gained new dependencies, new application-specific code, but also a good amount of code I could already tell would be useful across apps. So, as I worked on my next few Node.js apps later that year, I extracted this utility code into a [separate library called `thehelp`](/the-state-of-thehelp/#background).

I didn't want to make my utility project available publicly, so the official `npm` registry was out. I was probably a bit scarred from my experience with [Ruby gems](https://rubygems.org/), because I also shied away from anything like a 'real' dependency.

After mulling it over, I realized that I had the tools right in front of me to share code between projects: `git`! I used [`git` submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to share the code across my projects. I made the experience as nice as possible with [tags](https://git-scm.com/book/en/Git-Basics-Tagging) and a custom shell script to check for and upgrade to new versions.

But all dependencies needed by the submodule had to be included in the parent project's `package.json`. It was an ugly, error-prone, manual process.

At least I can laugh about it now.

## Evolution: git + npm

As `thehelp` grew, it became clear that I needed to split it up. But I didn't want to use the same mechanism as before - the manual `package.json` updates were already painful with just one package.

Again I considered the tools I had in front of me. I was a lot more comfortable with `npm` now, and this time I discovered that `npm` and `git` could play together nicely. With a [`git+ssh` dependency in my `package.json`](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies) I could install dependencies directly from a `git` repository. Simple and easy! Especially since I was already good at using tags for each release.

The great `thehelp` split happened in late 2013, and it was an easy transition. It was so much nicer having smaller, more focused projects. And there were no sad manual steps! I streamlined things by writing some code to pull `git+ssh` paths out of my `package.json` and tell me if I was on the latest version. Here's the core tag-processing algorithm, from my never-released `git-latest-version` project:

```javascript
Latest.prototype.parseTags = function(tags) {
  var tagRegex = /^v?\d+\.\d+\.\d+$/;

  return _(tags)
    .filter(function(tag) {
      return tagRegex.test(tag.name);
    })
    .map(function(tag) {
      return tag.name;
    })
    .sort(function(left, right) {
      return semver.compare(left, right);
    })
    .reverse()
    .value();
};
```

## Scaling issues

This worked very well for me until the spring of 2014. The first issue I ran into was intermittent 'connection reset by peer' errors when I ran an `npm install`. It wasn't an urgent problem because it would usually work the second time. After a while I finally figured it out: for an empty project with a lot of new dependencies to install, [npm opened a lot of concurrent connections](https://github.com/npm/npm/issues/3911#issuecomment-43971253). And most servers reject that many parallel SSH sessions.

The second issue was more than an intermittent annoyance. Like a good Node.js citizen, I upgraded to `npm@1.4.x`. But I discovered that a ['correctness change'](https://github.com/npm/npm/pull/4104) now caused [all of my `git+ssh` dependencies to be reinstalled during every `npm install`](https://github.com/npm/npm/issues/4191#issuecomment-38370399). Because of [`thehelp-project`](https://github.com/thehelp/project) this meant a re-download of [phantomjs](http://phantomjs.org/). It meant more connections to remote `git` servers, and more frequent 'connection reset by peer' errors.

`npm install` was now a long, error-prone process, even if I just added one new dependency or changed one tag.

So, I reverted to an old version of `npm` and started looking for alternatives. I had lived on the fringe for too long with `git` submodules and `git+ssh`.

## Biting the bullet: sinopia

With this update to my techniques, I needed to move beyond the tools already in hand. And so, I researched open-source tools to give me a local `npm` registry. I could run a full copy of the `npm` registry, but that was too heavyweight. I had a gut sense for the level of effort I was ready to put into this. [`sinopia`](https://github.com/rlidwka/sinopia) fit the bill.

It was great! `sinopia` is a lightweight little Node.js server, proxying my connection to the `npm` registry, caching node module packages and metadata to disk. It made all of my private packages look just like modules straight from the npm registry.

It had a nice unexpected benefit, too! With it installed on my laptop, I could now run an `npm install` without an internet connection! All previously-installed node modules would always ready to be installed again. For almost two years, I had `sinopia` configured to start when I logged into my laptop, always proxying in the background. Its storage directory, full of `.tgz` files, got up to 543 megabytes.

Sadly, the project has lost steam and [hasn't seen updates in quite some time](https://github.com/rlidwka/sinopia/issues/376). Whenever I thought about it, I realized I was getting more and more nervous about it. When would it break completely?

## Now: npm private modules

I got my answer when I tried to use an [`npm` private module](https://www.npmjs.com/private-modules) with `sinopia`. I could download a public [scoped package](https://docs.npmjs.com/misc/scope) [with a config change](https://github.com/rlidwka/sinopia/issues/376#issuecomment-195497794), but `sinopia` [doesn't understand how to send your credentials](https://github.com/rlidwka/sinopia/issues/278#issuecomment-176731408) to `npm`. Once you start using `npm` private modules, you can no longer use `sinopia`.

That's mostly okay. After all, you have a new place for your private modules now!

However, you will lose those offline installs without another solution. And I've got one for you! I did some searching and found [`npm_lazy`](https://github.com/mixu/npm_lazy), a simple little caching `npm` proxy. I quickly discovered that it didn't support `npm` private modules either, so I [submitted a pull request to add it](https://github.com/mixu/npm_lazy/pull/65). With it now merged you can forge ahead without fear!

I'm feeling good. I like `npm` private modules, even though I periodically [run into lack of support for them](https://github.com/sarbbottam/eslint-find-rules/pull/104). I've released [a number of scoped modules now](https://www.npmjs.com/~scottnonnenberg) by just flipping the switch from private to public. Easy!

I'm thinking this setup will last at least another year or two. :0)

## The landscape

For a long time, if you wanted private node modules, there were either costly private 'enterprise' solutions, or lightweight open-source solutions. Slowly, as competition increased, services started to claim the middle ground, and then [`npm` itself released private module support in April 2015](http://blog.npmjs.org/post/116379479775/npm-private-modules-are-here).

[`npm` plans](https://www.npmjs.com/pricing) allow unlimited packages at $7 per developer, per month. No server management hassles, no strange configurations. Just normal `npm` and your normal `npm` user, the same high-availability infrastructure we know and love.

But perhaps you don't want to store your private code offsite. [`npm` enterprise](https://www.npmjs.com/enterprise) was first released in late 2014 and gives you a seamless, [easily-installed](https://www.youtube.com/watch?v=mKMaG0cixXw), on-premises registry experience. If need support for other types of private modules, [Sonatype's Nexus](http://www.sonatype.com/download-oss-sonatype) (among [others](https://binary-repositories-comparison.github.io/)) might be a better fit.

You'll have to decide if your organization is willing to store its private code offsite. If you already use [Github](https://github.com/), you've already made your decision. :0)

## Lots of small projects

Learn from my mistakes! Get used to frequently creating lots of little projects, and take advantage of the systems that make it easy. Maybe install via `git+ssh` during high-churn development, then pay the $7/mo. for `npm` private modules.

There are great emergent benefits to small, well-factored projects: better testing of what's in each project, momentum towards [Single Responsibility Principle (SRP)](https://en.wikipedia.org/wiki/Single_responsibility_principle), practice in creating good API surface area and documentation, greater comfort with `npm` and node modules, and so on.

Reduce the friction of doing this with a private registry of some kind. You'll thank me.

