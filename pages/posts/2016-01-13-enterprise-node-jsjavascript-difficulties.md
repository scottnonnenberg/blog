---
rank: 15
title: Enterprise Node.js/Javascript Difficulties
date: 2016-01-13T18:18:12.000Z
layout: post
path: /enterprise-node-jsjavascript-difficulties/
next: /systems-and-incentives/
previous: /the-why-of-agile/
tags:
  - business
  - nodejs
  - software
---

I’ve worked with quite a few large companies over the years, and some very clear patterns have emerged regarding change. It’s hard. It’s a big deal to switch over to new development technologies, but [big organizations are starting to take the plunge](https://www.quora.com/What-companies-are-using-Node-js-in-production).

Maybe you’re a manager seeing developers ask for change, or maybe you’re a developer wanting to use better technologies inside a company resistant to change. Let’s talk about some of the challenges you'll face in moving to Node.js and generally heavier javascript use:

1. Difficult to motivate change
2. Too much to learn at once
3. Windows Node.js development is hard
4. Stepping on each other’s toes

Then we’ll talk about some of my recommendations for making all of this smoother.

<div class='fold'></div>

## 1. Difficult to motivate change

First let’s talk about why Node.js is interesting. Developers are excited about Javascript on the server primarily because they already know javascript. They are writing lots of code for the browser using javascript, and now with Node.js they can focus on just one language. Because this is driving large amounts of energy into the ecosystem, there are many, many open source modules available on npm.

This makes for higher productivity, since you can jump right into the business logic once you’ve chosen your dependencies. So you can perhaps make the ‘increased productivity’ and ‘lower costs’ business case. Business leaders love to hear those two phrases.

However, developers can be surprisingly resistant to these changes. It makes sense; many enterprise developers are used to C# and Visual Studio, or Java and a similarly heavyweight IDE. At least in the near term, ‘high productivity’ means continuing to use what they’ve been using for years. Here I’ve found success in creating an initial spark of excitement by showing concrete examples of Node.js simplicity: [connect to a database](http://knexjs.org/) and [produce JSON at an HTTP endpoint](http://expressjs.com/) in a minute or two.

Once everyone is motivated it’s still a tenuous position, because there’s...

## 2. Too much to learn at once

The size and energy in the ecosystem is a double-edged sword. Lots of alternatives for any given scenario. But that doesn’t make it easy to choose. Sometimes there are just two clear big players like Hapi and Express, and then the rest for niche scenarios and experts. But frontend frameworks are nowhere near as clear cut: Angular, React, Ember, Backbone/Marionette, Knockout, or something else?

This is particularly hard if you’re not coming from heavy javascript use on the client side - asynchronous coding patterns are new, as is all the needed tooling: linting, client-side packaging, heavy reliance on command-line tools like npm, and lighter-weight code editors.

And it’s not just the new core application functionality. It’s also source control (git and pull requests), development approaches (TDD, smaller projects, continuous integration, continuous deployment), and starting to interact with the larger javascript community (github, blogs, twitter, slack/gitter, etc.)

So you’ve selected your initial set of dependencies. But you have another set of challenges ahead of you, because most large organizations use Windows.

## 3. Windows Node.js development is hard

I’m happy to say that I don’t have any hands-to-keyboard experience on this. But I have pair programmed with a lot of people who were using Windows, and I felt their pain.

First, the Command Window is horrible. It has limited formatting options for text size and colors, and is particularly hard to read for test failures: red text on a black background. Nobody I worked with could fix this, even spending multiple minutes trying to customize the colors. Also, when trying to track down a bug, we’d run into a limited number of lines of history saved, so we’d have try again and save output to a file or just output less information. And of course, copy/paste of text to and from the console is way harder than it needs to be.

Second, when installing modules from npm, deep nesting of dependencies can cause problems given Windows’ limited file path size (happily, [npm 3 is addressing this](http://www.felixrieseberg.com/npm-v3-is-out-and-its-a-really-big-deal-for-windows/)). But that’s not as bad as the simple fact that many node developers just aren’t thinking about windows. Many npm modules fail to install in the first place, with symlinks, improper use of paths, shell scripts, and the assumption that build tools like gcc or python are available.

Third, I’ve even run into a crazy situation: basic code behaving differently on Windows. For example:

```javascript
var start = new Date();
var fn = function() {
  var now = new Date();
  var delta = now.getTime() - start.getTime();
  console.log('delta: ' + delta);
}
setTimeout(fn, 0);
```

On OSX and Linux in a healthy Node.js process, `fn` will run very quickly, reporting either 0ms or 1ms in elapsed time. On Windows 7, 15ms or 16ms will be reported. That’s the smallest resolution possible on Windows. To avoid this, you’ll want to use `process.nextTick()` instead.

Lastly, in big organizations, machines are usually locked down. Developers can't install what they need. And developers sometimes get machines which are slow or just hobbled by antivirus, because it is standard across the organization. This is especially painful because a node.js process loads all source files on startup: usually hundreds of files. Every test run, every app restart. I fully recommend SSDs or flash storage, and disabled antivirus for development directories!

Maybe you’ve worked through some of these challenges, working with IT to change the ‘standard’ developer workstation. Maybe even some sort of virtual machine-based solution. Now you’re off and running, developing features. But you’ve started...

## 4. Stepping on each other’s toes

Unlike traditional application servers which make it very hard for one programmer to interfere with another, it’s very easy in the world of javascript.

In Java or C#, it takes some effort to implement a shared singleton. In Javascript, anything returned by a module is shared across the entire process. Other code gets that exact mutable object via `require()`.

Most traditional application servers create a new thread for every incoming request. On the one hand, this makes it harder to coordinate between them, but it does ensure that a problem in one thread does not affect another. In Javascript, it’s all on one thread. There are no race conditions inside the process, but a [crash anywhere in the application takes the whole process down](/the-dangerous-cliffs-of-node-js/).

Asynchronous code is the way of Javascript. What before would have been done in serial on one thread is now done in parallel. Thinking that way requires a change, and early on in that learning process, tough bugs happen frequently, like forgetting to pass a callback (crash), forgetting to call a callback (hang), and double-calling callbacks (crazy logging, unexpected behavior, or crash - very hard to debug). Improper use of async techniques by one developer can even cause test failures during another developer’s tests!

## Recommendations

How to avoid some of these challenges? Or, better put, how can you minimize the impact of all of this? As always, with that question: start small. Don’t try to change the world at once.

My recommendation is to start a pilot project with just a few people. Choose developers carefully - the project should have at least one person who is excited, and another who is reluctant to try the new technology. One will document all the great stuff, the other will document all the problematic stuff. The tension between them will ensure that their final recommendation is reasonably unbiased.

Then, depending on your focus, choose one of these.

1. A small part of an existing website - a small public-facing feature or an admin interface. Reimplement in your client-side framework of choice (I like [React.js](https://facebook.github.io/react/)).
2. A small part of an existing API. Reimplement it in Node.js. Use something like [nginx](https://www.nginx.com/resources/wiki/) to selectively proxy traffic and make this change completely seamless. (By the way, this will prepare you for smaller deployable units in your API layer.)

I prefer reimplementation because it will remove any debate about requirements, you’ll be able to focus on the differences between the two implementations.

## Building Expertise

This forward team will learn a whole lot. It will be in a perfect spot to make all the initial dependency decisions and build guidelines for the rest of the organization. It will also tune its debugging skill for the target platform, ready to be a resource for others. And this is probably the time to pull in an expert like me - I can help you choose those dependencies, establish a learning plan, and generally move faster.

The key is to push this small bit of functionality all the way to production. Only then will you learn enough to know whether making a larger change is worthwhile.

Once you’re feeling good, expand from there! Good luck!

---

Additional resources:

* Minimum timer resolution in Javascript is different per browser and OS. *Windows/Chrome* is very small, *Windows/Internet Explorer* is bigger. And things have changed since these were published:
  * https://www.nczonline.net/blog/2011/12/14/timer-resolution-in-browsers/
  * https://www.sencha.com/blog/a-survey-of-javascript-timers-on-mobile/
* Learning:
  * A nice little intro to git: http://rogerdudler.github.io/git-guide/
  * What is Test-Driven Development (TDD) https://en.wikipedia.org/wiki/Test-driven_development
  * A path towards TDD maturity: http://blog.testdouble.com/posts/2014-01-25-the-failures-of-intro-to-tdd.html
* Windows and Node.js
  * Alternatives to the default Windows Command Prompt: http://stackoverflow.com/questions/60950/is-there-a-better-windows-console-window
  * More detailed discussion about Node.js/Windows issues: http://stackoverflow.com/questions/12581416/node-js-development-windows-or-linux
* The best approach for jumping in without much previous experience is a starter kit. Javascript projects require a lot of configuration out of the box, so start with a better box!
  * React starter kit with hot-reload. Client-only. No flux implementation. https://github.com/bradleyboy/yarsk
  * Universal React app built with Express, redux for flux implementation. https://github.com/choonkending/react-webpack-node
  * Express app with substantial API support. Worth an investigation (look at the installed middleware), but I wouldn’t base a new project on this. Minimal tests. https://github.com/sahat/hackathon-starter
