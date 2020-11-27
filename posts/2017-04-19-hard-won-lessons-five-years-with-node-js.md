---
rank: 1
title: "Hard-won lessons: Five years with Node.js"
date: 2017-04-19T19:21:36.109Z
path: /hard-won-lessons-five-years-with-node-js/
tags:
  - lessons-learned
  - nodejs
  - javascript
  - software
---

After five years working with [Node.js](https://nodejs.org/), I've learned a lot. I've already [shared](/the-dangerous-cliffs-of-node-js/) [a few](/enterprise-node-jsjavascript-difficulties/) [stories](/private-node-js-modules-a-journey/), but this time I wanted to focus on the ones I learned the hard way. Bugs, challenges, surprises, and the lessons you can apply to your own projects!

<div class='fold'></div>

## Basic concepts

Any new platform has its share of [tricky bits](/node-js-is-not-magical/#a-bit-tricky), but at this point these concepts are second-nature for me. Digging into a bug you caused is a good way to ensure that you learn. Even if it is a bit painful!

### Classes

*When I was first getting started with Node.js, I was writing a [scraper](https://scottnonnenberg.com/work/#liffft-2012-q-1-to-2013-q-2). It didn't take me long to realize that if I didn't do something, I'd make a whole lot of requests in parallel. This alone was an important discovery. But since I hadn't yet fully internalized [the power of the ecosystem](/n-for-node-js-nerp-stack-part-1/#2-many-modules-available-via-npm), I sat down and wrote my own parallelism limiter. It worked, and made sure that there were never more than N requests in progress at any given time.*

*Later, I needed to introduce a second area of parallelism limits in the app, to ensure that we only pulled the information for N users at a time. But I started running into really weird problems when I introduced a second instance of my class into the process. My logs didn't make sense. Eventually I realized that [CoffeeScript](http://coffeescript.org/)'s class property syntax didn't give me a new array for every instance, but one shared across all of them!*

Coming from object-oriented languages, I was used to classes. But I didn't fully understand what CoffeeScript's language constructs were producing behind the scenes. Learn your tools well. [Verify all assumptions](/be-a-scientist-dev-productivity-tip-3/).

### NaN

*Once, on a contract, I had implemented a sort based on user preferences which would apply throughout a multi-step workflow. But we were seeing really weird behavior - the order didn't stay the same. We were sending the same set of user preferences every time, but the order of items was changing!*

*I was confused. This was supposed to be deterministic. Same data in, same data out! Initial investigations didn't find anything, so I finally added extremely verbose logging. That's when the `NaN`s showed up. A previous calculation had created them, and they were wreaking havoc with the sort algorithm. [They aren't equal to themselves or anything else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN), so they broke [the sort's needed transitivity](https://cs.stackexchange.com/questions/19013/is-transitivity-required-for-a-sorting-algorithm).*

Be careful with JavaScript math operations. It's better to have [strong guarantees about incoming data](http://json-schema.org/), but you can [check the results of your calculations too](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN).

### Logic after callback

*Working on one of my Postgres-connected personal apps, I noticed a strange behavior when tests failed. After an initial test failure, the rest of the tests would each time out! It didn't happen very often, because my tests didn't fail that often, but it was there. And it was starting to get annoying. I decided to dig in.*

*My code was using the [`pg`](https://github.com/brianc/node-postgres) node module, so I delved into the `node_modules` directory and started adding logging. I discovered that `pg` needed to do some internal cleanup when a request was complete, which it did after calling the user-provided callback. So, when an exception was thrown, this code was skipped. Therefore `pg` was in a bad state, not ready for the next request. I [submitted a pull request](https://github.com/brianc/node-postgres/pull/282) which was [ultimately re-implemented and released in `v1.0.2`](https://github.com/brianc/node-postgres/compare/v1.0.1...v1.0.2).*

Get into the habit of calling callbacks as the last statement in your functions. It's also a good idea to prefix it with a `return` statement too. Sometimes it can't be on the last line, but it should always be the last thing.

## Architecture

Individual lines of code can have bugs, but it can be a whole lot more painful when the design of the application itself has a bug...

### Blocking the event loop

*On a contract I was asked to take an existing [Single-Page Web Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) built in [React.js](https://facebook.github.io/react/) and make it render on the server. After fixing a few areas which assumed it was running inside a browser, I had it all working. Because I'm painfully aware that [synchronous work can bring a Node.js server to its knees](/breaking-the-node-js-event-loop/), I added a new datapoint to our stats collection for the server: how long was each page taking to render?*

*As the data started to roll in, it became clear that things weren't in good shape. It had been easy to set up, but some of our pages were taking over 400ms to render. Far, far too long for a production server! My [Gatsby](/static-site-generation-with-gatsby-js/) experience had prepared me well for the next step, rendering to static files.*

Think really hard about what you're asking your Node.js server to do. Synchronous work is really bad news. Rendering any HTML is a lot of synchronous work, and can slow things down - not just with React.js but also with lightweight tools like [Jade/Pug](https://pugjs.org)! Even the type-checking phase for a large [GraphQL](https://github.com/graphql/graphql-js) payload can take a lot of synchronous time!

For React.js specifically, [Dale Bustad](https://twitter.com/divmain)'s [Rapscallion](https://github.com/FormidableLabs/rapscallion) is a promising approach, splitting up all that synchronous work to render a React component tree into a string. [Redfin's `react-server`](https://github.com/redfin/react-server) is another, more heavyweight, attempt to improve this.

### Implicit dependencies

*I was already up to speed for the contract, so I was implementing features at a good clip. But I was told that, for my next feature, I could refer to another one of their Node.js apps for help with the implementation.*

*I jumped in and took a look at the [Express middleware](/e-for-express-nerp-stack-part-2/#2-simple-composition) function for the endpoint in question. And I found a whole lot of references to `req.randomThing` and even some `req.randomFunction()` calls. I then proceeded to search back through every single middleware function which had run before, to figure out what exactly was going on.*

Make your dependencies explicit, unless it's absolutely necessary to do otherwise. For example, instead of adding locale-specific strings to `req.messages`, pass `req.locale` to a directly-accessed `var getMessagesForLocale = require('./get_messages')`. Now you can explicitly see what your code relies on. It goes the other way too - if you're the developer of `random_thing.js` you'd certainly like to know which parts of the project are using your code!

### Data, APIs, and versions

*My client wanted me to add features to a Node.js API which was acting as the backend for many installed native apps, both tablets and phones. I quickly discovered that I couldn't just add a field, because the apps had been coded defensively - their first action with an incoming payload was to do a strict schema verification.*

*Given this and the application itself, it became clear that they needed two new types of versioning. One to surface to API clients, so they could upgrade and get access to our new features. The other [in the data itself](/p-for-postgres-nerp-stack-part-4/#schema-free-or--ful) to ensure that we could reliably implement all of these new features on top of [MongoDB](https://en.wikipedia.org/wiki/MongoDB). As I did the work to add these to the application, I reflected on how development of the first version must have gone.*

There's something about [JavaScript's mutable objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) that gets people excited about [document stores](https://en.wikipedia.org/wiki/Document-oriented_database). "I can create any kind of object in my code, just let me store it somewhere!" Sadly, these people seem to leave after writing the initial app. They don't have to think about the second, third, or fourth version. I've learned. I use Postgres, and I think about versioning in the first version.

### Provisioning

*As the senior Node.js expert on a large contract project, the DevOps expert came to me to talk about their production setup. It was taking a long time to get new machines provisioned in the datacenters, and he wanted to make sure their plan was sound. I appreciated that.*

*I nodded my head when he said that they were running a single Node.js process per server. I stopped when he mentioned that each of these servers had four physical cores. I explained that only one core would be used per server, and he shrugged - it was the only kind of server he could get. They were primarily a .NET shop, and they had a standard way of doing things. We introduced [`cluster`](https://nodejs.org/api/cluster.html) not long after that.*

It's a tough one to get your head around, coming from other platforms. Node.js is all on one thread, whereas just about every other mainstream web server platform scales with the server: just add cores. Use `cluster`, but [pay close attention](https://medium.com/@jongleberry/when-node-js-is-the-wrong-tool-for-the-job-6d3325fac85c#.hsiovst5b) - it's not a magical solution.

## Testing

I've written a lot of JavaScript now, and I've learned that [testing is absolutely and totally necessary](/node-js-is-not-magical/#2-test-or-die). Really.

### Low-hanging fruit

*My client explained that they had no Node.js experts after theirs had departed, and I was the replacement. They had big plans for the project, which had been the primary topic of discussion before I started. But they were now more forthright with the situation: they realized that things weren't in good shape. But they wanted to do things right this time.*

*I was disappointed at the level of test coverage, but there were at least some tests. And I was happy to see that [JSHint](http://jshint.com/) was already in place. Just to be sure, I did an audit of the current ruleset. I was surprised to see that the [`unused`](http://jshint.com/docs/options/#unused) option was not turned on. I turned it on and was shocked at the sheer number of new errors. I spent a few hours just deleting code.*

Coding in JavaScript is difficult. But we have tools to make it a bit more reasonable. [Learn to use ESLint effectively](/eslint-part-1-exploration/). With a little bit of annotation, [Flow](/better-docs-and-static-analysis/) can help catch functions being called improperly. A lot of value with minimal effort.

### Test cleanup

*I was once asked to help a developer figure out where a test failure was coming from during a test run. When we looked at the test output coming from [`mocha`](https://mochajs.org/) we could see that the error was firing during a specific test. But that was a red herring! When we looked closely at the callstack, it became clear that the error was coming from code totally unrelated to that test.*

*Upon deeper investigation, we discovered that a previous test had claimed to be finished and successful while also having kicked off a set of async operations. The exceptions then thrown from that code were interpreted by `mocha`'s process-level handler as belonging to the actively-running test. Further investigation found mocking which also hadn't been cleaned up, leaking into other tests.*

If you're using callbacks, you need to end your test with `done()`. It's an easy code review - if there's any kind of function nesting in the test, it should probably have a `done()`. It is a bit tricky, though, because you can't call a `done` you don't initially provide to the function. One of those [classic code review mistakes](/top-ten-pull-request-review-mistakes/). Also, use [Sinon](http://sinonjs.org/)'s [sandbox](http://sinonjs.org/releases/v1.17.7/sandbox/) feature - it can help ensure that things are put back in place after your test finishes.

### Mutability

*The standard way of doing things on this contract, this project, was to run unit tests or integration tests separately. Or at least when doing local development. But [Jenkins](https://jenkins.io/) would do a full test run, covering both sets of tests. One of my pull requests introduced a couple new tests, and it failed on Jenkins. I was very confused. The tests passed locally!*

*After some fruitless wonderings, I flipped into high-detail mode. I ran the exact command I knew Jenkins was using to run the tests. It took a while, but I was able to replicate the issue. The mind reeled, trying to figure out what was different between the runs. I had nothing. Verbose logging to the rescue! Two long runs later, I could see some differences between the runs. After a couple false starts I had the right logging in place, and it became clear: the unit tests had modified some key application data used by the integration tests!*

These kinds of bugs are extremely difficult to track down. Though I was proud to have found this bug, I find myself more and more interested in immutability. [Immutable.js](https://facebook.github.io/immutable-js/) is nice, but you have to drop [`lodash`](https://lodash.com/). [`seamless-immutable`](https://github.com/rtfeldman/seamless-immutable) [silently fails when you try to change things](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) (which then does work in production).

You can see why [I'm interested in Elixir](/getting-started-with-elixir/): all data in [Elixir](http://elixir-lang.org/) is always immutable.

## The Ecosystem

Much of getting good with Node.js is simply working in the larger ecosystem effectively. Choosing good dependencies and managing them well.

### Dependencies and versions

*I use [a tool based on `webpack-static-site-generator`, Gatsby,](/static-site-generation-with-gatsby-js/) to generate [this blog](/this-blog-is-now-open-source/). As part of preparing the [Git](https://git-scm.com/) repository for public release, I deleted my `node_modules` directory and installed from scratch. Usually this works out for me, since [I use specific version numbers in my `package.json`](https://github.com/scottnonnenberg/blog/commit/9058f1d3bd7f29aeefd4beffe07d3c0135338416) . But this time things stopped working. And they stopped working in the weirdest way: no useful error message of any kind.*

*Because I had contributed a number of pull requests to Gatsby, I knew the codebase pretty well. My first step was to jump in and add some key logging statements. I had an error message! I had some trouble interpreting it, though. I dug into `webpack-static-site-generator` and discovered that it uses [Webpack](https://webpack.github.io/) to create a big `bundle.js` with all of your application code, and then proceeds to run it under Node.js. Crazy! And that was where the error came from - deep inside that file, when run under Node.js.*

*Now I was hot on the trail. After a few more minutes I had a specific bit of code to attach to the error message I initially needed to dig to find. It was a dependency with new [ES6 language features](http://es6-features.org/) running on Node.js version 4! It turned out that [a dependency had an unbounded sub-dependency, pulling in a too-new version of `punycode`](https://github.com/scottnonnenberg/blog/commit/f64e14acfabb64d0f5dfbcc42206eb2bb3057da4).*

Lock your entire dependency tree to specific versions with [Yarn](https://yarnpkg.com/). If you can't do that, lock your direct dependencies to specific versions. But do know that your dependencies' too-loose dependency versions could still get you into this situation.

When it's time to upgrade, small changes, one at a time, are far easier to investigate if things go wrong. Install or upgrade a small number of dependencies at a time. And use a [Continuous Integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration) server for frequent from-scratch installations of node modules.

### Documentation and versions

*I was using [Async.js](https://github.com/caolan/async) in one of my projects, specifically its [`filterLimit`](https://github.com/caolan/async/blob/v1.5.2/README.md#filter) function. I had a list of paths, and I wanted to go to the filesystem to grab some trait on the file which would then determine if the path would remain in the list. I wrote my filter method in the normal async way, with the standard `callback(err, result)` async signature. But things weren't working.*

*I went to the documentation, [which at that time was right on the front page of the GitHub project](https://github.com/caolan/async/tree/1e6a63270a996a6052acaf6e79dd2e4fa4fc7cc9). I looked at the entry for `filterLimit`, and it had the signature I expected: `callback(err, result)`. I went back to my project and ran `npm outdated` - I was on `v1.5.2` and the most recent was `v2.0.0-rc.1`. I wasn't going to upgrade to that, so I did a full `npm info async` to see whether I was on the latest pre-2.x version. I was.*

*Still confused, I went back to my code and added extremely verbose logging. No dice. Finally, I went into the Async.js source on GitHub. What was this stupid function doing? And that's when I realized what had happened - the `master` branch on GItHub had 2.x code. If I wanted documentation for my installed version, `1.5.2`, I would have to look back in history. When I did, I discovered that the proper signature was `callback(result)`, with no ability to propagate errors.*

Pay very close attention to the version number of the documentation you reference. It's easy to get lazy, since the first documentation you encounter often works: the method hasn't changed lately, or you're on the latest version. Double-check it.

### New Relic doesn't get it

*I was tasked with digging deep into the performance of a Node.js server for a client, so they gave me access to their monitoring tool: [New Relic](https://newrelic.com/). I had used New Relic in the monitoring of a client's [Rails](http://rubyonrails.org/) app years previous, and I had done some New Relic/Node.js feasibility analysis for another client, so I knew generally how the system worked, and I knew about [the ways it integrates into Express and asynchronous calls](https://github.com/newrelic/node-newrelic).*

*So, I started in. It had surprisingly comprehensive traces of how incoming requests were handled: the Express middleware run, and calls out to other servers. But I looked everywhere and couldn't find that key process-level metric: the health of the event loop. So, I worked around it. I manually sent metrics from [`toobusy-js`](https://github.com/strml/node-toobusy) to New Relic and created a new chart based on it.*

*With this additional data, I had more confidence in my analysis. Sure enough, the spikes in event loop latency numbers coincided with spikes in what New Relic calls 'time spent in requests.' I dug in and had a disturbing realization: the numbers didn't hold together. The total time spent for the request, and line items inside that trace didn't add up. Sometimes there was an 'other' category that tried to clean things up, other times there wasn't.*

Don't use New Relic to monitor Node.js apps. It has no understanding of the Node.js event loop. Its stacked 'average time spent' charts are absolutely misleading - given a slow event loop, the highlighted endpoints will be the ones which defer to the event loop the most. New Relic can detect that there's a problem, but it won't help you track down where the problem actually is.

If you need more reasons not to use New Relic, here are two more:

1. Its default views are [averages, a bad way to represent real-world data](https://www.dynatrace.com/blog/why-averages-suck-and-percentiles-are-great/). You have to dig past the default views to get to the reasonable charts, like the 95th percentile. But don't get too comfortable, because you can't add these charts to custom dashboards!
2. It doesn't understand use of `cluster` on one machine. If you manually submit data like event loop latency numbers from `toobusy-js`, only one data point per second will win for the entire server. Even if you have four worker processes.

## Learned well!

[Memory of emotional events is retained with more clarity and detail](https://en.wikipedia.org/wiki/Emotion_and_memory). Thus, each of these situations is nicely seared into my brain. You won't remember it quite as well as I do, but maybe if you imagine my struggle that will help?

Amazingly, my initial outline for this post started with twice as many situations worth mentioning, as well a lot which weren't Node.js specific. Watch for more posts like this one!
