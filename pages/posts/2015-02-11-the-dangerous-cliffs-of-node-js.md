---
hits: 681
title: The dangerous cliffs of Node.js
date: 2015-02-11T17:52:00.000Z
layout: post
path: /the-dangerous-cliffs-of-node-js/
next: /contract-teaching/
previous: /a-system-for-2015/
tags:
  - business
  - nodejs
  - javascript
  - software
---

[![dangerous cliffs via craigmoulding on flickr](https://static.sinap.ps/blog/2015/02_feb/beware_dangerous_cliff-1423614563162.jpg)](https://www.flickr.com/photos/craigmoulding/5881291261)

It’s not all roses in the world of [Node.js](http://nodejs.org/). In fact, more than just about every other platform I’ve used, it can feel like a precarious mountain path with a long cliff below. Yes, it features some very beautiful vistas, but one wrong step and it’s all over. Let’s cover four of those simple mistakes with substantial, unexpected consequences, as well as some potential guardrails.

<div class='fold'></div>

### Crashes

The simplest of these mistakes is the classic crash. My code has done this so very many times. It’s easy; just try to get a key from an null object, or try to call a string like a function, and you’ve crashed.

```language-javascript
var x = 5;
x.getData();
// TypeError: Object 5 has no method 'getData'

var y;
y.left = 6;
// TypeError: Cannot set property 'left' of undefined
```

The difference in Node.js is the [event loop](/node-js-is-not-magical/). When you ask for a file from disk, your provided callback will be called directly by the system on a future turn of the event loop. A crash in that callback will immediately take down the entire process. I’ll say that again - **in an asynchronous callback, a crash will immediately take down the entire process**. Ah, brings me back to those core dumps I got all the time when I was writing C++...

So, the general approach in the world of Node.js is to let the process crash. Just restart it with apps like [`forever`](https://github.com/foreverjs/forever), [`nodemon`](https://github.com/remy/nodemon), [`pm2`](https://github.com/Unitech/pm2), or OS-level systems like [`upstart`](http://upstart.ubuntu.com/), [`runit`](http://smarden.org/runit/), [`systemd`](http://en.wikipedia.org/wiki/Systemd), etc. Maybe capture the error with its callstack via [`process.on(‘uncaughtException’)`](http://nodejs.org/api/process.html#process_event_uncaughtexception) and report it somewhere. This feels a bit weird at first, especially if you’re used to the standard application server approach: catching the error, serving an error page, and moving on.

Sadly, even quick restarts will result in [socket hang-ups](http://stackoverflow.com/questions/16995184/nodejs-what-does-socket-hang-up-actually-mean) for your clients. In the worst case, if you have a multi-stage async operation in progress, it can even result in corrupt or inconsistent data. What else do you expect if you immediately take down the process?

##### Mitigations:

* [`thehelp-cluster`](https://github.com/thehelp/cluster) is a library I wrote to shut down your [`express`](http://expressjs.com/) server gracefully when a crash happens. It first responds with an error to the original request (via your [`express` error handler](http://expressjs.com/guide/error-handling.html)), then closes all open [keepalive connections](http://stackoverflow.com/questions/20763999/how-does-http-keep-alive-work), and finally takes the process down when all outstanding requests are complete. After a crash your process is in an unknown state, so I thought it prudent to shut down as soon as possible.
* [`hapi`](http://hapijs.com/) is also resilient to crashes in endpoint handlers. It keeps the server alive after crashes, which could result in unexpected behavior or memory leaks.
* Both of these solutions use [`domain`](http://nodejs.org/api/domain.html). Sadly, [domains are deprecated despite having no good replacement solution](https://github.com/iojs/io.js/issues/66).

[![dangerous cliffs via sarah_c_murray of flickr](https://static.sinap.ps/blog/2015/02_feb/cliff_edges_are_dangerous-1423614893374.jpg)](https://www.flickr.com/photos/sarah_c_murray/5448305160)

### Hangs

*Last November one of my node.js apps started taking a really long time to respond. It was responding in about a minute, where I was expecting it to be far less than a second. First, I looked at the application logs on the app node the slow requests were coming from, and found no responses that took longer than a few ms.*

*Confused, I looked at my load balancer’s logs and discovered that the app node which actually served me the response I saw was the second one tried, and 60 seconds was the load balancer’s timeout. After some poking of the problematic first app node, I discovered that my node processes were hanging when they [requested session data from redis](https://github.com/tj/connect-redis).*

Node.is really, really good at doing a lot async operations in parallel. [Promises](https://www.promisejs.org) and libraries like [`async`](https://github.com/caolan/async) help you kick off several at once and then do something when they’re all complete. But what happens when one of those async calls never returns? In Rails, for example, if a page takes too long to gather data and render, an error is raised. In the Node.js world, it just looks like the user cancelled the request.

Happily, a lot of libraries have timeouts and will return errors in these kinds of cases. [`superagent`](https://github.com/visionmedia/superagent) and [`request`](https://github.com/request/request) will return a timeout error even if the underlying web request never returns. [`redis`, however, can get into a bad state](https://www.exratione.com/2013/01/nodejs-connections-will-end-close-and-otherwise-blow-up/) and hang on all async requests (be sure to listen for both *‘error’* and *‘end’* events on your redis client object). This is a perfect example of why we all need to understand our dependencies well.

But even if you’ve fully vetted all your third-party libraries, it’s still easy to cause this yourself by forgetting a `res.send()` or `next()` call somewhere. Or even easier, in a multi-branch async method, forgetting to call the callback in an infrequently-hit branch.

##### Mitigations:

* Monitor nginx logs for hang notifications. By default they are in the error-specific log file, and look like this: *upstream timed out (110: Connection timed out)*
* Install express logging. I use the [`morgan`](https://github.com/expressjs/morgan) express logger, which installs a [high-resolution timer](http://nodejs.org/api/process.html#process_process_hrtime) you can access via the `:response-time` token. I’ve found that on hangs it [outputs not a duration but a dash](https://github.com/expressjs/morgan/blob/master/index.js#L263), but this can also mean that the user cancelled the action. Either way, lots of dashes for `:response-time` is a bad sign.
* `hapi` doesn’t seem to output anything to the logs on a hang, even with the [`good-console`](https://www.npmjs.com/package/good-console) plugin in place. :0(
* Even if you’re detecting these situations, I think we can agree that we don’t want users waiting very long to finally get no response. By default, `express` and `hapi` will both keep a connection open until the remote client gives up, and I’ve seen Chrome to be something like two minutes, and [`nginx`](http://nginx.org/) is 60 seconds by default. `hapi` does have a [built-in route timeout option](http://hapijs.com/api#route-options) you’ll want to investigate. `express` is a little tricker. You can use middleware like [`timeout`](https://github.com/expressjs/timeout), but you will need watch for your long-running handlers attempting to send responses after the timeout error has already been sent to the client.
* If you’re not writing a server interacting with clients, then embrace logging. The only way to catch a hang in this scenario is by detecting missing log entries!

[![dangerous cliffs via 9610484@N05 on flickr](https://static.sinap.ps/blog/2015/02_feb/dangerous_cliffs-1423615251162.jpg)](https://www.flickr.com/photos/9610484@N05/3483050503)

### Blocking the event loop

*My first Node.js app backed a site with heavy client-side interactivity, and delivered the required data in three big chunks. Some of that data went back as far as a year to enable all the interactivity we wanted in the charts. More and more data built up every day, adding to the size. Things just didn’t seem snappy with all that data flying around. It became clear that getting the data from the data store, then transforming it and sending it to the client, took long enough to slow down the event loop.*

With the event loop rapidly processing through many small tasks, a Node.js process is healthy. You keep this in mind as you implement a standard web application endpoint: you validate an incoming request’s user and parameters, then make a request for some data from a database, transform it slightly, and send it back to the client.

What could be wrong with that? Well, if the database query doesn’t include any kind of limit, we could get an order of magnitude more records than expected. The transformation step would then take more than a couple milliseconds.

For all that data transformation time, the process is unresponsive to other requests. [Callbacks from your `setInterval` calls are dropped](https://gist.github.com/scottnonnenberg/56597f27c6cd44dfbfee). Even if other in-progress responses would take just a couple milliseconds, they will all need to wait until their turn on the single-threaded event loop. Every in-flight request will have that wait time added to its response time. All of your users will see delays, not just the one that requested the large data set.

##### Mitigations:

* Prefer streams. [`streams`](http://nodejs.org/api/stream.html) are the way to handle large amounts of data without taking down the process. Put the time in to [learn how to](http://www.sitepoint.com/basics-node-js-streams/) [use them effectively](https://github.com/substack/stream-handbook).
* If you must get all the data up front, be sure that you include some kind of __limit__ clause, and check any user-provided bounds input.
* Monitor your request response times. [New Relic](http://newrelic.com/nodejs) plugs into Express automatically, or you can use [`morgan`](https://github.com/expressjs/morgan) support for response times. The `good-console` plugin for `hapi` includes response times by default. Because one too-long synchronous code block will delay everything else, you’ll see very clear patterns in the data.

[![dangerous cliffs via swotai on flickr](https://static.sinap.ps/blog/2015/02_feb/sheer_unstable_cliffs-1423615339192.jpg)](https://www.flickr.com/photos/swotai/3028197916)

### Too much concurrency

*For my last contract I needed to write a program to process 11.6 gigabytes of JSON data, transforming it before injecting it into a database. Happily, [JSONStream](https://github.com/dominictarr/JSONStream) was there to assist in handling the data little bits at a time, because I certainly couldn’t load it all into memory at once. I had it implemented in short order, then started my first run.*

*It was working, but the JSON processing it was just a little bit faster than the import into the database, so memory usage increased as the database imports fell further and further behind. The solution? Periodically call [`stream.pause()`](http://nodejs.org/api/stream.html#stream_readable_pause), then wait on all outstanding database import calls, then call [`stream.resume()`](http://nodejs.org/api/stream.html#stream_readable_resume). With that key application of [backpressure](http://engineering.voxer.com/2013/09/16/backpressure-in-nodejs/), my program was free to rip through all that data in about 45 minutes, with constant memory usage.*

Node.js is really good at kicking off a lot of concurrent tasks. But like anything, it’s good to think about the long-term in addition to the short term. Otherwise, it’s really easy to get into a state where you’ve bitten off more than you can chew. Or worse, perhaps you’re fine, but a service you depend on is starting to buckle under the pressure of your application’s highly-concurrent onslaught.

##### Mitigations:

* Use something like [`toobusy-js`](https://github.com/STRML/node-toobusy) to monitor your event loop latency. At its most basic, it will detect a slow event loop, which can be a sign of high load or long synchronous processing. You can also use it to turn away requests under high latency, avoiding runaway failure as more incoming requests add load to an already-struggling process.
* Limit the number of concurrent requests you make to a downstream service. It’s just polite, especially if you don’t own that service. While you're at it, make sure you're well-read on [`agent`](http://nodejs.org/api/http.html#http_class_http_agent), keep-alive and sockets. It's impolite _and_ slow to close and reopen lots of sockets if you don't need to.
* If you do own the downstream service, or you know the failure modes of the third party service really well, you might consider using the [Circuit Breaker ](http://martinfowler.com/bliki/CircuitBreaker.html)[pattern](http://martinfowler.com/bliki/CircuitBreaker.html). Here is a [node implementation](https://github.com/ryanfitz/node-circuitbreaker).
* In failure cases, consider using [exponential back-off](https://github.com/MathieuTurcotte/node-backoff), because Node.js is also good at retrying things very quickly: ["If you have all these fast node processes on lots of servers, all trying to connect to a database that went down, you can take down a production firewall. Just saying."](http://youtu.be/5ttx8Nkgjl8?t=47m5s)

[![dangerous cliffs via daveynin on flickr](https://static.sinap.ps/blog/2015/02_feb/rocky_trail-1423614995322.jpg)](https://www.flickr.com/photos/daveynin/4787623561)

### Getting to the summit

Of course, testing is the first line of defense to prevent all of these things. But a production service needs resiliency. These mitigations are [defense in depth](http://en.wikipedia.org/wiki/Defense_in_depth_%28computing%29) techniques, so if an issue does get to production, its effect will be minimized.

With all this in place, and our service humming along in production, we can relax for a bit. Maybe even enjoy the view.
