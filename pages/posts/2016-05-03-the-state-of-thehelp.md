---
rank: 35
title: The State of thehelp
date: 2016-05-03T16:59:47.221Z
layout: post
path: /the-state-of-thehelp/
next:
previous: /contract-react-training/
tags:
  - open-source
  - nodejs
  - javascript
  - software
---

[The collection of node modules and client libraries](https://github.com/thehelp) I released under the `thehelp` family name has been available now for about a year and a half. It's been a good run, but now it's time to take stock. What's next for `thehelp`?

<div class='fold'></div>

## Background

`thehelp` started out as a single private utilities library where I put all my helper and infrastructure methods, JavaScript for both client and server. By February 2013 it had its `thehelp` name  and was helping me get new projects up and running quickly. It was important, since a few of the things I was trying to do were tricky to set up: [in-browser testing](https://github.com/thehelp/test/blob/master/src/client/thehelp-test/harness.js) via [Blanket](http://blanketjs.org/), [RequireJS](http://requirejs.org/), [Mocha](https://mochajs.org/), and [PhantomJS](http://phantomjs.org/), for example. As it grew I started to split it into smaller libraries.

The first burst of public release activity in June 2014 was to get [`thehelp-project`](https://github.com/thehelp/project) released, because people were interested. When I talked about this little library I used to make things easier on myself, people paid attention. I even sent it directly to a friend who wanted to use it on a contract before it was public.

After the release, I was relieved. I had broken the seal! My first public node module!

The second burst of activity was much bigger. I had wanted to give a client the option of using my [`thehelp-cluster`](https://github.com/thehelp/cluster) library to allow their server to shut down gracefully both in error and maintenance cases. But to do it, I needed to release several other support libraries it depended on. That set of seven releases extended all the way from late August 2014 to late October 2014.

It was exhausting. I realized how much more rigorous I felt I needed to be if I was going to release something publically. Especially since [`thehelp-cluster` tests are quite involved](https://github.com/thehelp/cluster/tree/master/test/integration/server).

## Lessons Learned

Now, a year and a half later, a very long time in the tech space, what have I learned?

### Open-source projects need marketing

First, none of my libraries ever got much usage. This is despite the fact that they do address some important scenarios I haven't seen addressed elsewhere. That's because like any new effort involving people, from company to charity to party, you need to make sure people know about it.

That means marketing, something I didn't really understand that at the time. It just feels wrong, doesn't it? Advertising your own open-source tool. Yes, sometimes things do develop naturally, but that's the exception and not the rule.

### Dogfooding is important

[Dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) is using your own product for real scenarios, relying on it like a customer would. I did have this advantage, since I had been using all of this code for my own projects for quite a while before release. And I continued to use it after release. I like to think that it kept my code quality quite high. Of course I didn't have many users, so it's hard to tell!

### Things are changing quickly

At the time I released `thehelp`, there was still an industry-wide debate between the two primary JavaScript module formats: [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) and [Asynchronous Module Definition (AMD)](https://en.wikipedia.org/wiki/Asynchronous_module_definition). I chose AMD and RequireJS because I liked that I didn't need to wait for a build step, nor rely on source maps while developing. But in 2016 CommonJS (or [ES2015 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)) and [Webpack](https://webpack.github.io/) are the de-facto choice. I'm fine with it, because Webpack's [watch mode](https://webpack.github.io/docs/cli.html) is quite fast.

The story is similar on the project automation front. Even in mid-2014, [Grunt](http://gruntjs.com/) was starting to be superseded by [Gulp](http://gulpjs.com/). At the time I didn't think Gulp's complexity was worth the effort to switch over given my scenarios, and in a way I was right. I skipped that generation and went all the way to plain [`npm` scripts](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.m2ripxj4m). Simpler is better.

Now knowing how quickly things change, I'm not sure I'd extract these kinds of project architecture decisions into some separate dependency. At the same time, I did have quite a few projects, and the consistency across them made it much easier for me. We'll see.

### UMD for client libraries

It doesn't matter which packaging system you use internally. The right way to release a client library for full compatibility is the [Universal Module Definition (UMD)](https://github.com/umdjs/umd). Then you're not excluding any potential user of your library - seamless compatibility with all bundlers, but no need for one if you're going old-school.

My personal module/bundler decision wouldn't have mattered so much if I had released UMD client libraries. Of course, the fact of the matter is that many libraries today don't even bother with this, since so many people are using a CommonJS-compatible bundler. You can always turn a CommonJS library into a single UMD-compatible file yourself!

### Dependency rollup projects are challenging

The point of `thehelp-project` was to be a single install, providing a huge amount of project automation functionality right out of the box. It accomplished its goal, but at what cost? Dependencies would update beneath me, and if I didn't update my users wouldn't get it. How should I map my version across all my dependencies for proper [semver](http://semver.org/)? Is my public API surface area the union of all my dependencies? How might I have ever moved from Grunt to Gulp, as some people requested?

To be fair, there was one beautiful moment in the life of `thehelp-project`. In [version 3.4.0](https://github.com/thehelp/project/releases/tag/v3.4.0) I switched from using Blanket for code coverage to using [Istanbul](https://gotwarlost.github.io/istanbul/). Things got a whole lot better across all my projects, very quickly, very easily.

### Small single-purpose libraries

`thehelp` started as one big utilities project, so my mindset was wrong to begin with. I did make some good progress away from that in splitting it up, but I needed to go further. [It's a sign when the name of your project is generic](http://blog.codinghorror.com/i-shall-call-it-somethingmanager/), like `thehelp-core`. And I probably should have named `thehelp-cluster` to `thehelp-graceful-shutdown`, capturing its true purpose.

It's all connected - smaller, more focused libraries with good names would have been easier to market!

## Deprecated

As you might suspect given what I've learned, some of my `thehelp` libraries are going away. They'll still be available via `npm` and GitHub. I just won't be releasing new versions. [Maybe you're interested](mailto:scott@nonnenberg.com)?

### [thehelp-project](https://github.com/thehelp/project)

I just made my last planned fix to this project [to make it compatible with npm 3.x](https://github.com/thehelp/project/releases). The fact is that it was too broad and too low-level. And things are moving too fast. I recommend that you use `npm` scripts tailored to your project's specific needs. You'll appreciate the simplicity, flexibility, and in many cases, improved performance.

### [thehelp-client-project](https://github.com/thehelp/client-project)

This project did too many things:

* **Simplified RequireJS tasks** - It's worth the effort to [learn Webpack](https://webpack.github.io/docs/tutorials/getting-started/).
* **Simplified unit-testing via [Sauce Labs](https://saucelabs.com/)** - I recommend that you tunnel with [ngrok](https://ngrok.com/) and use the [unit testing Sauce Labs API](https://wiki.saucelabs.com/display/DOCS/JavaScript+Unit+Testing+Methods) directly.
* **[Annotating client files with project information](https://github.com/thehelp/client-project/blob/master/src/server/preamble_renderer.js#L69)** - I might just pull this into its own library at some point.

### [thehelp-core](https://github.com/thehelp/core)

Again, this library tried to do too many things:

* **[Setting up `winston` logging](https://github.com/thehelp/core/blob/master/src/server/logs.js)** - You probably want to be in control of this stuff anyway. Or maybe you use [Bunyan](https://github.com/trentm/node-bunyan) instead of [Winston](https://github.com/winstonjs/winston)?
* **[Merging file-based configuration with environment variables](https://github.com/thehelp/core/blob/master/src/server/env.js)** - I recommend that you use the excellent [config](https://github.com/lorenwest/node-config) node module instead.
* **[Breadcrumbs (annotated callstacks for better debuggability)](https://github.com/thehelp/core/blob/master/src/both/thehelp-core/breadcrumbs.js)** - I recently split this functionality into a smaller library. I might just release it!

### [thehelp-test](https://github.com/thehelp/test)

This project was absolutely worthwhile to configure browser testing in the world of AMD. Webpack eliminates that difficulty. There are some Webpack/[Sinon.JS](http://sinonjs.org/) configuration hiccups, but they are [easily resolved](https://github.com/webpack/webpack/issues/177#issuecomment-195535314).

Unit testing with Sauce Labs? You will need [this code](https://github.com/thehelp/test/blob/master/src/client/thehelp-test/sauce_reporter.js) so Sauce Labs picks up your test results.

Want code coverage in the browser? [Instrument your code with a Istanbul Webpack plugin](https://github.com/deepsweet/istanbul-instrumenter-loader), then run your tests with the excellent [`mocha-phantomjs`](https://github.com/nathanboktae/mocha-phantomjs) command-line tool like this:

```bash

mocha-phantomjs --hooks ./test/extract_coverage_hook.js http://localhost:8000/tests.html

```

You can extract Istanbul's code coverage information via this code in your hook, then process it with the Istanbul command-line tool:

```javascript
var fs = require('fs');

module.exports = {
  afterEnd: function(data) {
    var cov = data.page.evaluate(function() {
      return window.__coverage__;
    });

    if (!cov) {
      console.log('No coverage data collected.');
    }
    else {
      console.log('Writing coverage to \'coverage/client/coverage.json\'');
      fs.makeTree('coverage/client');
      fs.write('coverage/client/coverage.json', JSON.stringify(cov));
    }
  },
};
```

_Note: this is not a [Node.js](https://nodejs.org/) environment, so I recommend just writing the file to disk here._

## Still Useful

These libraries are more focused, so I still use them. I definitely think they're worth keeping around!

### [thehelp-messaging](https://github.com/thehelp/messaging)

This little library helps you send and receive [Twilio](https://www.twilio.com/) SMS, and [Sendgrid](https://sendgrid.com/) email. I still use it in my applications. It's way more lightweight than the official [Twilio Node.js SDK](https://twilio.github.io/twilio-node/), though if you so desire it can leverage some of the SDK's encryption functionality for verifying incoming messages.

### [thehelp-log-shim](https://github.com/thehelp/log-shim)

An idea I still haven't seen anywhere else: allowing a library to participate in the logging choices made for the overall process.

I just used it recently for a command-line app whose functionality is also available via API. Its command-line interface sets the logging level based on the verbosity selected, but if called via the API those same log messages will automatically go to your installed Winston or Bunyan.

### [thehelp-last-ditch](https://github.com/thehelp/last-ditch)

Another idea I haven't seen elsewhere: when a process crashes, get the message out as many ways as possible: email, SMS, stderr, to disk synchronously, and finally to [statsd](https://github.com/etsy/statsd).

As you can tell, I don't like silent failures. I have seen crashes where the filesystem was not available to store logs, and I didn't like not knowing what happened. Not one bit!

### [thehelp-cluster](https://github.com/thehelp/cluster)

With no movement or replacement in sight for the [deprecated `domain` Node.js API](https://github.com/nodejs/node/issues/66), I'm still happily using this library for all my Node.js servers. I'm not alone - [Hapi](http://hapijs.com/) continues to use [`domain`](https://nodejs.org/api/domain.html) to keep servers stable.

Don't let the name fool you. This library is really about graceful shutdown of an [Express](http://expressjs.com/)-based Node.js server, no need for a [`cluster`](https://nodejs.org/api/cluster.html) of processes. Think about it for a second. What happens to users of your server when you deploy a new version? Or it crashes?

## Woo! Open Source!

I think Open Source Software is important to enable learning, for making software available to everyone, and as a fun endeavor for me. I will absolutely keep participating!

You'll definitely see me continue to [submit pull requests to existing projects](https://scottnonnenberg.com/open-source/). And I will likely release more of my own libraries, but this time with hard-won wisdom. :0)

