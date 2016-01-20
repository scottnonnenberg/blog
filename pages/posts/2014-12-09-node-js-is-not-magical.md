---
title: Node.js is not magical
date: 2014-12-09T18:00:00.000Z
layout: post
path: /node-js-is-not-magical/
next: /hippie-experiments/
previous: /the-last-year/
---

![node.js](https://static.sinap.ps/blog/2014/Dec/nodejs_logo-1417834491072.png)

All the cool kids are using Node.js these days. But perhaps more interesting, big companies are using it too. In the spring, I contracted with Walmart Labs and saw it firsthand. They’re getting good results with it, and that’s legitimizing the platform. Maybe your team or company is even starting to think about moving to it.

But the publicity around these large-scale rollouts almost always results in soundbites, dangerous when taken without context. Exciting statements about return on investment, reduced application latency, better performance, reduced hardware usage. The most misleading of these soundbites is *higher developer productivity*:

* PayPal: ["Built almost twice as fast with fewer people"](https://www.paypal-engineering.com/2013/11/22/node-js-at-paypal/)
* LinkedIn: ["development time was unusually fast](http://venturebeat.com/2011/08/16/linkedin-node/)"
* Yahoo: ["biggest advantage that node.js provides is ‘speed and ease of development’"](http://www.zdnet.com/the-rewards-of-running-server-side-javascript-revealed-7000027060/)
* Ebay: ["We wanted to build ql.io very quickly in a very small team"](http://www.ebaytechblog.com/2011/11/30/announcing-ql-io/#.VC7YiCldWrw)

Yes, Node.js can result in higher productivity, but it’s not magical. Getting that higher productivity first requires developers to internalize several new, potentially very foreign mindsets:

1. *Javascript*
2. *Test or die!*
3. *Evented async*
4. *Small projects*
5. *Open source*

Let’s get started!

### 1. Javascript

The first thing to consider is your team’s familiarity with Javascript. Yes, [you can compile from some other language into Javascript](https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js), but you you’ll still need to know the underlying technology. Happily, there are both pros and cons:

##### Ubiquity

This is one of the key reasons I use Node.js for my applications. I can write code and templates which run on both the server and in the browser, reducing code duplication and context-switching costs. You also can write [Windows 8 apps with Javascript](http://dev.windows.com/en-us/develop/winjs). [OSX Automation](https://developer.apple.com/library/prerelease/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/index.html#//apple_ref/doc/uid/TP40014508). [CouchDB map/reduce functions](http://wiki.apache.org/couchdb/Introduction_to_CouchDB_views#Map_Functions). Even [PostgreSQL](https://blog.heroku.com/archives/2013/6/5/javascript_in_your_postgres) [stored procedures](https://blog.heroku.com/archives/2013/6/5/javascript_in_your_postgres).

##### A bit tricky

Javascript is a crazy little language. Up until the past few years, it was frequently relegated to designer-ish frontend folks who wrote little snippets of it to handle jQuery events. Real computer scientists didn’t use it unless they had to. But more and more sites needed substantial client-side interactivity. And then Node.js came out.

So Javascript retains, for compatibility reasons, all the quirks it started out with as just a little utility language for the browser:

* Truthiness and falsiness
* `===` vs `==`
* Prototype inheritance
* Unexpected values of ‘this’
* ‘undefined’ and ‘null’ are different; [undefined keyword can actually have a value](https://twitter.com/scottnonnenberg/status/543129736222760960)
* Complex but powerful scope and closure rules
* Functions as first class objects

There have been a few strides toward cleaning things up. [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) is an optional modernization statement which removes some of the more problematic legacy features. Saving Javascript developers from themselves since 2009. Use it!

##### Dynamically, weakly typed

If you’re coming from [statically, strongly typed](http://en.wikipedia.org/wiki/Strong_and_weak_typing) languages like C++, C#/.NET or Java, the similar syntax will only distract you from the radical differences. Javascript is dynamically typed, so its compiler simply ensures that the file’s syntax is well-formed. It is also weakly typed, which means that its runtime won’t catch things like using a string as an array - you’ll just end up treating every letter like an element of the array.

So, since neither the compiler nor the runtime is going to catch your mistakes beforehand, your program will work just fine until a problematic line of code is actually hit. Then it crashes. Or worse, the bug will create subtle corruption in your data! Linters like [jshint](http://jshint.com/) can help catch simple mistakes like use of undefined variables, but what you really need is a more comprehensive approach to ensuring quality in your app...

### 2. Test or Die!

A Node.js app is incomplete without tests. Without a compiler, tests are your only automated way to know if the application is in good shape or completely broken. Tests are also your lifeline when changes to the project are needed. How can you know if a change was good without some way to talk about the state of the application before and after?

When I hear about teams writing applications in record time, I wonder what kind of test coverage they have. How do they feel when making bug fixes? Confident or nervous? Are they able to release updates to their newly-released API while guaranteeing no breaking changes? [Al Shalloway gave a great talk](http://www.meetup.com/seattle-software-craftsmanship/events/159240012/) at the [Seattle Software Craftsmanship meetup](http://www.meetup.com/seattle-software-craftsmanship/) in Spring 2014 - he said that "good architecture makes change easy." In statically-typed languages you can use interfaces and rely on compiler errors. In Javascript, we accomplish this with good tests.

The good news is that there are tools which make testing really easy. [mocha](http://mochajs.org/) and [chai](http://chaijs.com/) are great choices for your test harness and fluid assertions. Need to test an API? Try [supertest](https://github.com/tj/supertest). Need to stub out some dependencies? Try [sinon](http://sinonjs.org/). Try [blanket](http://blanketjs.org/) or [istanbul](http://gotwarlost.github.io/istanbul/) for code coverage. You can even use [nock](https://github.com/pgte/nock) to return fake responses from remote servers.

Now you’re cooking with fire! Just remember that you’re in a world where a variable can be anything. Test like crazy and code defensively. Now you can start thinking about bigger issues...

### 3. Evented Async

Every other mainstream development platform is synchronous by default. iOS. Ruby on Rails. Java. .NET. C++. C. Yes, you can break out of that with in-process concurrency via multithreading and shared data structures. But this is a big headache. You never really know when a thread might be preempted. It’s damned scary.

This is where Node.js is truly different. Each process has only a single thread, so everything shares data structures but nothing is actually concurrent. This makes it substantially easier to reason about - no locks, no semaphores, no volatile keyword.

An event loop is used to leverage the full power of that single thread:

1. You run some code requesting some sort of I/O and give it a function (a callback). I/O is: reading a file, making a web request, starting another process, etc.
2. Control then returns to the event loop. This is how Node.js makes very efficient use of hardware resources.
3. Later, when the result of that I/O is ready, an event is added to the event queue. The next time through the event loop your provided function runs, called either with an error or the desired I/O results as parameters. Your code is off and running, doing something with those results.

A Node.js process does this over and over, very quickly. It is constantly looping through those events, calling callbacks with the results of async operations, and kicking off more async operations. It must not be held up by any long-running synchronous task. That would slow down or stop everything. The event loop needs lots of small chunks of work.

As my friend [Kav](https://twitter.com/kavla) likes to say, It’s best to think about Node.js processes as if they are the cashier at a fast food restaurant. When you order, he or she conveys that to the kitchen, takes your payment, then tells you when the order is ready. You don’t have long conversations with the cashier because that would hold up the line.

So you shouldn’t be calculating the standard deviation of a million records in Node.js. Nor making unbounded queries to a database, unless you’re streaming those results back to your client, small chunks at a time. Node.js is best-suited for coordinating or proxying between various back-end web services and databases, doing lots of little bits of work.

### 4. Small Projects

Now that we understand Node.js core strengths a little bit better, we can be more creative with your architecture. Some of your services may be developed with Node.js, others may be older versions of your applications for compatibility or to make a transition easier. This heterogeneous system can still be a unified interface to your clients - use that strong proxying capability.

The Node.js community is inspired by the unix approach; lots of small utilities that each do their job well and work well together. Node.js itself leads by example, shipping only with the most basic of utilities. This can be a shock for those coming from large enterprise frameworks, which have a large footprint, and try to include everything you’ll ever need. After working like that, you may not be comfortable going outside the core framework, or managing multiple projects. But your first Node.js application almost certainly included a few node modules, third-party modules provided by the fully-featured [npm](https://www.npmjs.org/) command-line tool and cloud repository.

Once using these node modules become familiar, it’s only a few steps to refactoring parts of your application out into libraries, used just like those node modules. You can easily share common logic across your set of small services. More than any other platform I’ve ever used, Node.js really reduces the friction for this kind of factorization.

### 5. Open Source

Node.js itself is open source, and so are all the node modules you installed via npm. If you don’t use much open source software already, you’re in a new world!

##### NPM

First, a primer on npm. The public npm registry has about [110,000 packages](https://www.npmjs.org/) at this point, and npm pulls them down very quickly and easily. On an install, the requested package is installed along with all of its dependencies, and their dependencies, and so on. It’s a powerful and flexible system. A project can have multiple versions of the same project installed in different parts of its dependency tree.

##### Licenses

To be honest, npm is not set up to allow for easy license auditing. And there are all sorts of licenses used by node modules. The good news is that other [people have run into this](http://stackoverflow.com/questions/16274841/output-all-licenses-of-installed-node-js-libraries) and written some tools which may be useful to you. And, for the most part projects choose either the [MIT License](https://spdx.org/licenses/MIT), [BSD License](http://spdx.org/licenses/BSD-3-Clause-Attribution), or the [Apache License](http://spdx.org/licenses/Apache-2.0). All of these are very friendly to commercial use, focusing primarily on the complete lack of any guarantee or warranty.

##### Choosing wisely

And that brings us to choosing wisely in a world of open source. At the beginning, all the modules look the same. The first you encounter will likely be some of the most famous modules of all: [underscore](https://www.npmjs.org/package/underscore)/[lodash](https://www.npmjs.org/package/lodash), [commander](https://www.npmjs.org/package/commander), [express](https://www.npmjs.org/package/async), [async](https://www.npmjs.org/package/express), etc. These are all heavily used, mainstream modules.

As you get a little more comfortable, you’ll start to stray from the beaten path. This is the time to be a little more skeptical of new packages:

* What are the alternatives in the same problem domain?
* How is the documentation? Or, how does the code itself look - perhaps it has some good comments?
* How many npm installs has it had recently? (npm provides nice little charts)
* How many active issues and pull requests are there on the repository? How old are they?
* How many stars on npm or github does it have? How many people are watching the project on github?
* Is it being actively maintained? When was the last time it was updated? When was it initially released?
* Who wrote it? What else have they written?
* Can you tell what changed from last version to this version? Is there a history or changelog?

Yes, that list is a bit daunting. There’s a lot to pay attention to. The good news is that this is a vibrant community! There are usually a lot of solutions out there for any given problem.

##### Participating

Okay, you’ve made some dependency decisions, but you’ve found a bug in one of your installed node modules. You can file the issue on the github project, or you could make the fix yourself and submit a pull request to the project. Now you’re contributing back to the world of open source! While waiting for your fix to be merged, you can even temporarily use your fork with your fix. A radical idea for those new to the ways of open source. :0)

When you’re ready, the next step could be to sign on as an official maintainer for a project, or release an original project of your own.

### Node.js: Is it worth it?

After all that, is it still worth using Node.js? **Yes.** I particularly like the ability to share code server/client. And I do feel more productive than I have with other platforms. All those little quirks of Javascript are feeling downright homey. And I have the whole node.js ecosystem at my fingertips, with easily-accessed source code to make up for any lacking documentation.

Thanks for reading! Now, if you do decide to make the transition to Node.js, you can rest assured that you’re moving to it for the right reasons. Good luck!

#### Toward zen!

---

A little bit more:

* If you’re just getting started, you might consider my library [thehelp-project](https://github.com/thehelp/project) to kickstart your project’s automation. I've also got a [few other libraries that might be useful](https://github.com/thehelp) for you...
* Some resources for learning Node.js:
    * [http://nodeschool.io/](http://nodeschool.io/)
    * [https://www.codeschool.com/courses/real-time-web-with-node-js](https://www.codeschool.com/courses/real-time-web-with-node-js)
    * [http://www.quora.com/What-are-the-best-resources-to-learn-Node-js](http://www.quora.com/What-are-the-best-resources-to-learn-Node-js)
* A very detailed post from someone moving from .NET to MEAN (**M**ongo/**E**xpress.js/**A**ngular.js/**N**ode.js)  https://www.airpair.com/mean-stack/posts/developers-moving-dotnet-to-mean
* PayPal talks about training their C++/Java developers in Javascript and Node.js. People and Processes are just as important as the technology itself: https://www.youtube.com/watch?v=bvDtEcQdGs0

