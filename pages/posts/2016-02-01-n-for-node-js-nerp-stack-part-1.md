---
rank: 9
title: N for Node.js (NERP stack part 1)
date: 2016-02-01T20:56:37.104Z
layout: post
path: /n-for-node-js-nerp-stack-part-1/
next: /a-35lb-weight-swing-in-two-years/
previous: /a-modest-async-proposal/
tags:
  - javascript
  - software
  - nodejs
  - nerp-stack
---

What is the NERP stack? I'm glad you asked! It's a fun little development stack acronym, my counterpoint to [MEAN](http://mean.io/). In Part 1, we consider the Pros and Cons of Node.js!

<div class='fold'></div>

## Don't be so MEAN

What is it? It's a set of development technologies, frequently called a 'stack':

* **M** = [Mongo](https://www.mongodb.org/)
* **E** = [ExpressJS](http://expressjs.com/)
* **A** = [AngularJS](https://angularjs.org/)
* **N** = [Node.js](https://nodejs.org/)

According to Google Trends, [MEAN first became popular around October 2013](https://www.google.com/trends/explore#q=MEAN%20node.js&cmpt=q&tz=Etc%2FGMT%2B8). At that time, Node.js was really starting to gain traction, Angular had recently clawed its way to the top of the frontend javascript framework dogpile, and Mongo was the NoSQL 'get started this afternoon' tutorial darling.

Now, here we are, over two years later, and we've realized the error of our ways. Angular's [tendency toward nested controllers](https://www.quora.com/What-is-the-best-way-to-communicate-between-nested-controllers-in-AngularJS), [confusing `$scope`](https://github.com/angular/angular.js/wiki/Understanding-Scopes), [hard-to-debug two-way binding](https://docs.angularjs.org/tutorial/step_04) and so on have unseated it from its frontend throne. And many [have realized the substantial downsides of Mongo](https://longtermlaziness.wordpress.com/2012/08/24/a-post-you-wish-to-read-before-considering-using-mongodb-for-your-next-app/). Sadly, new articles are [still being posted recommending MEAN](https://medium.com/@dickeyxxx/mean-the-monolith-crusader-47b2c30936cd).

This is the first in a series meant to bring balance to the force. Er, I mean, tech acronyms on the internet.

## Time to NERP!

Say you're new to the world of Node.js. What should your default stack be? I humbly propose the NERP stack:

* **N** = Node.js
* **E** = ExpressJS
* **R** = [ReactJS](https://facebook.github.io/react/)
* **P** = [PostgreSQL](http://www.postgresql.org/)

A quick introduction to the new players in this updated acronym:

* **PostgreSQL** is a battle-tested, open-source relational database appropriate for tutorial-style use and for high-traffic production websites. It's not a hip NoSQL database, but it can do schema-free JSON if you so desire. You're likely already familiar with SQL databases, so you'll be right at home.

* **React** is a radical rethinking of the way we approach frontend development, which brings big benefits. Its recommended one-way data flow, taken directly from software architectures first developed in the 1960s, makes things more predictable and verifiable.

Let's get into the details!

## N for Node.js

Node.js is a good choice for our first foray into the technologies of NERP stack, since it's also part of MEAN. But that's not enough reason to use it. We'd better be sure, because we can't use Express, also shared between the two acronyms, unless we also choose Node.js.

So, let's remind ourselves why Node.js is interesting in the first place.Yes, [lots of people](https://www.quora.com/What-companies-are-using-Node-js-in-production) [are using it](https://github.com/nodejs/node-v0.x-archive/wiki/Projects,-Applications,-and-Companies-Using-Node), but is that enough? Are there more reasons beyond simply following the crowd? I believe the answer is a resounding "yes!"

## The Pros

First let's talk about the good things about Node.js:

1. Follows the unix ethos
2. Many modules available via npm
3. Native support for asynchronous programming
4. Same language client and server

### 1. Follows the unix ethos

On the unix command line you can compose things very easily from a set of very basic components. For example, we can chain three tools together and very easily accomplish something that would take many confused clicks in most GUIs - _delete all items which match a search query ('temp') within a directory hierarchy_:

```bash
find . | grep temp | xargs rm
```

Node.js itself is a small package. The [V8 javascript engine](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)), a minimal set of [core libraries](https://nodejs.org/docs/latest/api/), and the [`npm` command line tool](https://docs.npmjs.com/cli/npm). That's it. There's a very high bar for things making it into the installer, and everything else is delivered as a user package.

Thus Node.js is very lightweight. You can use it to [build a command-line utility](http://cruft.io/posts/node-command-line-utilities/) like one of the unix tools above. Or you can use it like the shell itself above: chaining a lot of modules together to build a more complex whole. Node.js is particularly well-suited for [microservices](http://martinfowler.com/articles/microservices.html), which bring the unix ethos to the web.

### 2. Many modules available via npm

With `npm` in the box, and very few core libraries, Node.js was set up for a strong ecosystem from the start. And it didn't disappoint: there is an unbelievable amount of energy in the Node.js ecosystem. The [npm registry](https://www.npmjs.com/) has a huge number of libraries, about 230k as of this writing. And many new libraries are published every day!

Want to print color to the console? Use [`chalk`](https://www.npmjs.com/package/chalk). Want to parse command-line arguments? Try [`commander`](https://www.npmjs.com/package/commander). The generic utilities you'll want on day one? [`lodash`](https://www.npmjs.com/package/lodash). And it goes on and on and on. Full [command-line tools you install globally](https://www.npmjs.com/package/yo), [complete server frameworks](https://www.npmjs.com/package/restify), [development tools](https://www.npmjs.com/package/less), and more.

And it's all open source. When you install a node module, the code is right there, on disk like the old days of pre-minified web pages. You can learn from them, modify them, even contribute improvements back to them. That's the beauty of open source. You can stand on the shoulders of giants, then contribute back to the community and allow others to stand on your shoulders.

### 3. Native support for asynchronous programming

One Node.js web service process can handle many, many concurrent connections. How? Node.js is made for the internet! Just as a web page or image is broken into a lot of little packets for transmission over TCP/IP, Node.js does best working a little bit at a time. But unlike other servers like [Ruby on Rails](http://rubyonrails.org/) or [Apache](http://www.apache.org/), it does all the work on one thread.

The key to being so productive on one thread is [asynchronous I/O](https://en.wikipedia.org/wiki/Asynchronous_I/O). Going to disk, going to a database, going to a web service across the internet - all of them are treated the same: request the data, and then do other things while you wait for the response.

Now, you might be saying to yourself: "But other frameworks do this!" Sure, platforms like [EventMachine](https://github.com/eventmachine/eventmachine) (Ruby) and [Tornado](http://www.tornadoweb.org/en/stable/) (Python) have the same single-threaded asynchronous I/O. The difference is that in the world of Node.js, anything you install via `npm` is compatible with it. Installations via `gem` or `pip` will likely use synchronous APIs, which would eliminate most of the benefits of EventMachine or Tornado.

### 4. Same language client and server

Everyone is clamoring for richer experiences on the web: [interactivity](http://www.awwwards.com/websites/web-interactive/), [dynamic visualizations](https://github.com/mbostock/d3/wiki/Gallery), [full application-style experiences](https://www.zoho.com/). And all that logic will ultimately be running in JavaScript, so you'll need to know it or a [language that compiles down to it](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS).

Node.js allows you to take that knowledge to the server! One developer can implement a feature from the database all the way to the client-side, with no [waiting for another team to do their part](/systems-and-incentives/)! You can even share the exact same code on the server and in the browser, like [data validations](https://www.npmjs.com/package/validator) or [HTML rendering](http://www.infoq.com/news/2015/08/netflix-universal-javascript).

In this world you can reduce complexity. No more maintaining completely different environments for the server and the browser. You can use the [same coding standards](https://github.com/airbnb/javascript), [linting tools and configuration](http://eslint.org/), [test frameworks](https://karma-runner.github.io/), etc. across all of your development.

## The Cons

Now let's consider the other side, the negative aspects of Node.js. You already know about the [dangerous cliffs](/the-dangerous-cliffs-of-node-js/). What else is there?

1. JavaScript
2. Too much choice
3. Too much change
4. It's not as fast as you think

### 1. JavaScript

Let's face it. Nobody really likes JavaScript. Okay, it has some [good parts](http://shop.oreilly.com/product/9780596517748.do), but the people who profess to love it likely have a bit of [Stockholm Syndrome](https://en.wikipedia.org/wiki/Stockholm_syndrome). Your internet captors have forced you to use it so long, you now believe that you like it!

It's got [no proper number type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type). It has only [very limited support for immutability](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) (though it does have [immutable](https://facebook.github.io/immutable-js/) [libraries](https://github.com/rtfeldman/seamless-immutable)). It does no enforcement of any kind on function parameters - you can add too many or provide none at all. Its `arguments` keyword looks like an `Array`, but you'd get an error if you tried to `arguments.slice()`. It's got no real hash maps, since all object keys are first coerced to strings. And that's just the beginning of its [many, many quirks](/node-js-is-not-magical/#a-bit-tricky).

If you want to produce quality code, [linting](http://eslint.org/) is necessary. The language and runtime won't help.

### 2. Too much choice

The number of packages available on npm is a double-edged sword. It makes finding the right library for your needs that much harder. Say you're looking for a generic set of utility functions: do you use [`underscore`](http://underscorejs.org/), [`lodash`](https://lodash.com/), or [something else](https://www.google.com/search?q=javascript%20utility%20library)?

[How do you decide?](/node-js-is-not-magical/#choosing-wisely) If you're on a team of people who have each used different options in the past, how will you decide what to use for a new project? When you make a final choice, will those unfamiliar with that library cause more bugs?

### 3. Too much change

You start a new project and decide on [`grunt`](http://gruntjs.com/) for your project automation framework. A couple months later your new hires start complaining that you're not using [`gulp`](http://gulpjs.com/) for your automation. The next month your designer says that [`broccoli`](http://broccolijs.com/) is the latest thing. Now your developers want to follow the latest trend - [npm scripts directly in the project's package.json](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.m2ripxj4m).

Things move fast in the JavaScript world. The latest and greatest is changing all the time, and the temptation is to follow along. But that's too much churn for an individual project. And so, a reasonably mature project just one year old feels hopelessly behind to any twitter-using, up-to-the-moment developer.

### 4. It's not as fast as you think

There's been a lot of [discussion about how fast Node.js is](https://www.google.com/search?q=node.js%20fast), but the truth is that those benefits largely come from its handling of asynchronous I/O and use of one thread. Yes, V8 is a high-quality execution engine for JavaScript, with its [Crankshaft compile-time and runtime optimization component](http://blog.chromium.org/2010/12/new-crankshaft-for-v8.html).

But other technologies are very fast to begin with. [Java Virtual Machines](https://benchmarksgame.alioth.debian.org/u64q/javascript.html) have very mature hotspot optimization. [C and C++](https://benchmarksgame.alioth.debian.org/u64q/compare.php?lang=v8&lang2=gpp) lack garbage collection overhead and can be hand-tuned down to the finest detail. When these technologies start using [the same single thread and async I/O techniques](https://www.nginx.com/blog/thread-pools-boost-performance-9x/), they can go faster than Node.js.

Of course, so much of it comes down to the specific workload, as well as the specific algorithms and data structures used. But it's a mistake to say that Node.js is fast without also including some sort of reference point.

## Conclusion: It's worth it

Given all that, is Node.js worth it? I believe that it is. Things are moving fast, and you have to use JavaScript. But the large ecosystem and using JavaScript on both client and server can increase your productivity. You'll have lots of small, well-factored projects and services in no time!

## NERP FTW!

Alright! I think our N is solidly justified. We are well on our way to building an acronym which will stand the test of time! Will this one will be even more popular than LAMP? We can certainly dream.

Now you're ready for [*E for Express (NERP stack part 2)*](/e-for-express-nerp-stack-part-2/)...
