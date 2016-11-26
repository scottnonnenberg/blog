---
rank: 13
title: Breaking the Node.js event loop
date: 2016-09-27T16:06:36.530Z
layout: post
path: /breaking-the-node-js-event-loop/
next: /systems-for-collaboration/
previous: /contract-an-unusual-skillset/
tags:
  - break-it
  - nodejs
  - javascript
  - software
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/bMHB6zb9AXY?start=904" frameborder="0" allowfullscreen></iframe>

_[Taken from Part 3 of [my talk at the Seattle Node.js meetup on 7/24/2015](http://www.meetup.com/Seattle-Node-js/events/222999198/). [Code](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/tree/master/src/demos/3.%20Event%20loop%20unavailability). [Direct link to original screencast](https://youtu.be/bMHB6zb9AXY?t=15m4s). [My original Dangerous Cliffs of Node.js post](/the-dangerous-cliffs-of-node-js/).]_

Asynchronous programming is difficult to wrap your mind around: [threads](https://en.wikipedia.org/wiki/Thread_(computing)), [semaphores](https://en.wikipedia.org/wiki/Semaphore_(programming)), and [deadlocks](https://en.wikipedia.org/wiki/Deadlock), oh my! On one hand, [Node.js](https://nodejs.org/) makes this a whole lot easier: no [locking](http://stackoverflow.com/questions/34524/what-is-a-mutex) or [mid-execution interruptions](https://en.wikipedia.org/wiki/Preemption_(computing)). But its event loop is foreign territory. Let's explore by poking it and prodding it - let's try to break it!

<div class='fold'></div>

## Too-long tasks

The first way to break the event loop is to execute a task that takes too long. Take a look at [this short script](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/blob/master/src/demos/3.%20Event%20loop%20unavailability/a.%20block%20event%20loop.js):

```javascript
var fs = require('fs');

var doSyncWork = function() {
  var start = new Date();
  var now = new Date();
  console.log('doSyncWork: start');
  while (now.getTime() - start.getTime() < 1000) {
    now = new Date();
  }
  console.log('doSyncWork: done');
};

var getFile = function() {
  var start = new Date();
  console.log('getFile: start');
  fs.readFile('nonexistent', function() {
    var now = new Date();
    var delta = now.getTime() - start.getTime();
    console.log('getFile: done,', delta + 'ms');
  });
};

var previous;
var writeInterval = function() {
  var delta;
  var now = new Date();
  if (previous) {
    delta = now.getTime() - previous.getTime();
  }
  console.log('writeInterval:', delta ? delta + 'ms' : '-');
  previous = now;
};


setInterval(writeInterval, 100);

setTimeout(getFile, 250);

setTimeout(function() {
  getFile();
  doSyncWork();
}, 500);

setTimeout(function() {
  process.exit();
}, 2000);
```

We set up an [interval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) to fire every 100ms, logging how long it has been since the last call. Then, after 250ms, we run `getFile()` which goes to disk asynchronously and prints how long that took. Finally, at 500ms we call `getFile()` again then immediately call `doSyncWork()`, a very evil function which takes one whole second to do its _synchronous_ work.

Let's run it:

```text
writeInterval: -
writeInterval: 141ms
getFile: start
getFile: done, 1ms
writeInterval: 104ms
writeInterval: 106ms
getFile: start
doSyncWork: start
doSyncWork: done
writeInterval: 1047ms
getFile: done, 1000ms
writeInterval: 102ms
writeInterval: 104ms
writeInterval: 104ms
writeInterval: 106ms
```

There are a few key things to note. First, that initial `getFile()` call takes 1ms to go to the filesystem and return its result. Next, the first couple `writeInterval()` calls are spaced out by a little bit over 100ms, as requested. These are both signs of a healthy event loop, always ready to take on a new task.

But it gets interesting around the `doSyncWork()` call. First, note that no `writeInterval()` calls happen during that synchronous work - they are skipped entirely! Second, the `getFile()` call takes 1000ms to finish - it is started before the event loop is blocked, and finishes after the event loop is available once more.

It's key to note that this also happens on a server. If one visitor to your Node.js server is able get a long task onto the event loop, all other requests will be delayed, just like `getFile()` was. Unlike Ruby on Rails, with its separate thread per request, a Node.js server allows one operation to monopolize all resources in the process.

### Mitigations

* **Don't use 'sync' methods** - The very first step is to avoid using synchronous methods like [fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options) which will block both your code and the entire process until the requested file is returned. Don't say you weren't warned - the 'sync' is in the name!
* **Use limits for incoming data** - data can come from all sorts of places: APIs you call, customer uploads, or data stores you control. You can use [Express middleware](https://github.com/expressjs/body-parser#limit) to limit incoming data, and provide [limit parameters](http://knexjs.org/#Builder-limit) when you request data.
* **Use streams** - if you can't avoid large payloads, you can use [streams](https://nodejs.org/api/stream.html) to break that one big task into smaller tasks. Even tasks you might assume will require all the data, like working with [JSON-formatted data](https://github.com/dominictarr/JSONStream) or [HTML](https://www.npmjs.com/package/htmlparser2).
* **Keep long tasks off the event loop** - if you can't avoid some sort of long computation, set up some sort of [work queue](https://github.com/OptimalBits/bull) to manage where and when that work will happen. Consider using something well-suited to the scenario, especially if the computation is involved, like [R](https://www.r-project.org/) or [Julia](http://julialang.org/). This might all happen on the same machine, via [separate processes](https://nodejs.org/api/child_process.html), but your best bet is to include other worker machines for greater scalability.

## Too many tasks

The other way to break the event loop is to put too many tasks onto it. Your server may be working through each task very quickly, but there are just too many! [The next script](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/blob/master/src/demos/3.%20Event%20loop%20unavailability/b.%20overload%20event%20loop.js) is a little more complicated, designed to replicate a server under load:

```javascript
var async = require('async');
var toobusy = require('toobusy-js');

var LAUNCH_DELAY = 10; // 100 requests/second
var SYNC_WORK = 8; // 8ms of synchronous work per task
var TASK_DELAY = 20;

var concurrent = 0;
var completed = 0;

var doSyncWork = function() {
  var start = new Date();
  var now = new Date();
  while (now.getTime() - start.getTime() < SYNC_WORK) {
    now = new Date();
  }
};

var doTask = function() {
  concurrent += 1;

  setTimeout(function() {
    concurrent -= 1;
    completed += 1;
    doSyncWork();
  }, TASK_DELAY);
};

var writeStatus = function() {
  console.log('lag:', toobusy.lag());
  console.log(' concurrent:', concurrent);
  console.log('  completed:', completed);
  completed = 0;
};

setInterval(writeStatus, 250);

var previous;

var go = function() {
  setTimeout(function() {
    var now = new Date();
    var count = 1;

    if (previous) {
      // replicating lots of events coming in while event loop blocked
      var delta = now.getTime() - previous.getTime();
      count = Math.floor(delta / LAUNCH_DELAY);
    }

    for (var i = 0; i < count; i+= 1) {
      doTask();
    }

    previous = now;
    go();
  }, LAUNCH_DELAY);
};

go();
```

The two key variables to look at are `LAUNCH_DELAY` and `SYNC_WORK`. Doing some quick math, you can see that 100 requests per second, each taking 8ms of work, adds up to 800ms of work per 1000ms. The server will be able to handle that load, and here's the confirmation:

```text
lag: 0
 concurrent: 1
  completed: 16
lag: 4
 concurrent: 3
  completed: 25
lag: 4
 concurrent: 2
  completed: 21
lag: 3
 concurrent: 2
  completed: 20
lag: 2
 concurrent: 3
  completed: 19
lag: 1
 concurrent: 2
  completed: 19
^C
```

The server is keeping up. It's getting work done, and the _lag_, the time it takes to get through the even loop, is quite low. Now, if we change `LAUNCH_DELAY` to 5, doubling the load to 200 requests per second, the amount of work per 1000ms will now be 1600ms. Let's watch the process struggle:

```text
lag: 0
 concurrent: 9
  completed: 35
lag: 64
 concurrent: 22
  completed: 75
lag: 156
 concurrent: 81
  completed: 108
lag: 247
 concurrent: 129
  completed: 137
lag: 165
 concurrent: 206
  completed: 218
lag: 524
 concurrent: 329
  completed: 348
lag: 1111
 concurrent: 526
  completed: 556
^C
```

That is not a healthy event loop. Every iteration is getting slower, and the process never gets a chance to catch its breath under the constant influx of new tasks. This is what will happen to a Node.js server under heavy load. That `getFile()` call from the first script will take over a second on this server, because that's how long it takes to get through the event loop. Once more, interaction between independent user requests can happen in a single Node.js process.

### Mitigations

* **Detect health trends** - You can't do anything about potential load issues if you never saw it coming. The first thing to do is install some sort of process health monitor. For the event loop, I like sending data from [`toobusy-js`](https://github.com/lloyd/node-toobusy) to [`statsd`](https://github.com/etsy/statsd)/[`graphite`](http://graphite.wikidot.com/) on regular intervals. With this information in hand, you can add capacity before things start to fall apart.
* **Reject new work under heavy load** - Sadly, you can never predict that massive influx of traffic. As we saw above, a Node.js process can grind to a halt under high load even if new nodes are starting to come online to share the burden. We can use `toobusy-js` once more here to build [middleware that rejects new requests when things aren't looking good](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/blob/master/src/demos/3.%20Event%20loop%20unavailability/c.%20express%2C%20limits.js#L17-L26). From there, you can [set your load-balancer to try another node](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream) if it gets this kind of 'too busy' response.

## Break it to learn it!

Breaking something is important for truly understanding it. [As Neil deGrasse Tyson said](https://www.youtube.com/watch?v=8Xe7J8uR__w&t=7s):

> _"...because children are born scientists, they are always turning over rocks and plucking petals off flowers, they are always doing stuff that by and large is destructive. That's what exploration really is when you think about it. An adult scientist is a kid who never grew up. That's what an adult scientist does."_

Software is the perfect playground - it takes some real effort to produce impactful negative  consequences from experimentation. No need to replace broken eggs, or clean up the mess. No pain or injury. Just revert the changes to source code or restore data from backup.

So, break that event loop! Know what happens when you forget a callback or call it twice! Test your apps under load! Experiment!

You'll get better at both designing systems and debugging them.

