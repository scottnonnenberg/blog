---
rank: 20
title: Breaking other servers with Node.js
date: 2016-11-01T20:56:23.605Z
layout: post
path: /breaking-other-servers-with-node-js/
next: /fear-of-the-subjective/
previous: /focus-dev-productivity-tip-2/
tags:
  - break-it
  - nodejs
  - javascript
  - software
  - speaking
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/bMHB6zb9AXY?start=1918" frameborder="0" allowfullscreen></iframe>

_[Taken from the bonus section of [my talk at the Seattle Node.js meetup on 7/24/2015](http://www.meetup.com/Seattle-Node-js/events/222999198/). [Code](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/tree/master/src/demos/5.%20Hammering%20other%20services). [Direct link to original screencast](https://youtu.be/bMHB6zb9AXY?t=15m4s). [My original Dangerous Cliffs of Node.js post](/the-dangerous-cliffs-of-node-js/).]_

If [Node.js](https://nodejs.org/) is good at anything, it's efficient use of local resources in the face of substantial parallelization. It's easy to write a Node.js program which has many, many different things going on at once: requesting from or writing to the filesystem, some sort of database, or an API. But not everything on the internet can handle that level of parallelization so easily.

We've already [learned about the Node.js event loop by breaking it](/breaking-the-node-js-event-loop/). Now let's use the same techniques to learn about how to be a good citizen of the internet. Break it to learn it!

<div class='fold'></div>

## Denial of Service

A couple years ago, I was brought in on [a Node.js contract](http://scottnonnenberg.com/work/#giant-thinkwell-2014-q-3-to-q-4). In our first meeting the client outlined some of the feature and cleanup work they wanted, as expected. But they also brought out a chart showing their upstream error rate as they made requests to [Parse](https://parse.com/) to save and load user data. It wasn't good.

They were getting 'socket hang up' errors (code `ECONNRESET`) from Parse for something like 2% of requests. And, given that the save of a single user-created artifact could take quite a few requests to Parse's [NoSQL](https://en.wikipedia.org/wiki/NoSQL) [Mongo](https://www.mongodb.com/) data store, this was a big problem.

Because these errors only started when they deployed a Node.js server between their clients and Parse, they were right to question Node.js. It was a great question for the external Node.js expert sitting in their conference room. A test of my value.

First, I asked about their `maxSockets` setting for their Parse requests. It wasn't many; and they'd been toying with it. With that information I was sure. It wasn't their problem. It was their upstream which couldn't handle the load. Node.js is really, really good at making lots and lots of requests at the same time. You can easily overload a remote server.

Two weeks later I got word that Parse had fixed their load balancer. No more errors. No change required in the Node.js code.

## What are these sockets?

Before we dive into the Node.js specifics, it's time to talk about [sockets](https://en.wikipedia.org/wiki/Network_socket) just a little bit. Standard [TCP](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)/[IP](https://en.wikipedia.org/wiki/Internet_protocol_suite) sockets are a dedicated, persistent connection between two endpoints, either on the same machine or across a network. And because a socket is persistent, it is a [limited resource](http://stackoverflow.com/questions/410616/increasing-the-maximum-number-of-tcp-ip-connections-in-linux).

TCP/IP was designed to handle the instability of the ramshackle early internet, so sockets remain open and connected in the face of no communication. It is only when one side decides to try to communicate that a broken connection is discovered.

That's how you get a 'socket hang up' error. The local code thought the remote server was still connected, because it hadn't explicitly 'said goodbye.' Maybe the Parse load balancer had been crashing periodically, and that's why it couldn't close the socket properly?

## Parallelism with sockets

Now we know that sockets are a limited resource, and they don't require constant attention. We can start to see why Node.js is really good at this. Lots of open sockets, periodic upkeep required for each. Both for inbound-initiated sockets (servers or responses) and outbound-initiated sockets (external requests).

But you don't have to think about that when you have a number of external requests you'd like to make. Hand those requests to [`superagent`](https://github.com/visionmedia/superagent) or [`request`](https://github.com/request/request) via [`async.js`](https://github.com/caolan/async) or the like, and you're in business! Maybe it starts with just a few requests at a time, but then you get more users and start to scale up.

All of this really matters when you're making 100 or 1000 requests at the same time. Do you make all the requests at once, or limit the number of concurrent requests? Remember, parallel connections to a remote server use a limited resource (sockets), as well as the computational effort to fulfill the request: a database query, a trip to the filesystem, or a bit of data transformation.

## Replicating client and server

I've written some Node.js code to replicate a _client_ and _server_, on your own machine. With it, you can play around with using the _client_ to make a whole lot of parallel requests to the _server_. It's based on the same code we looked at in [my last 'break it to learn it' article](/breaking-the-node-js-event-loop/), with a few new tricks.

In two terminal windows start both the _[server](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/blob/master/src/demos/5.%20Hammering%20other%20services/a.%20remote%20service.js)_ and the _[client](https://github.com/scottnonnenberg/dangerous-cliffs-of-nodejs/blob/master/src/demos/5.%20Hammering%20other%20services/b.%20local%20service.js)_, and watch the log scroll by. By default, the math works and both processes are healthy:

### A healthy pair

The _client_ is happily making lots and lots of requests to the _server_, no errors returned:

```text
concurrent: 16
 completed: 22
    errors: 0
concurrent: 17
 completed: 21
    errors: 0
concurrent: 16
 completed: 23
    errors: 0
concurrent: 16
 completed: 23
    errors: 0
concurrent: 17
 completed: 21
    errors: 0
```

The _server_ is also healthy, keeping up with all incoming requests:

```text
lag: 63
 concurrent: 3
  completed: 28
    sockets: 14
lag: 49
 concurrent: 4
  completed: 27
    sockets: 14
lag: 49
 concurrent: 5
  completed: 26
    sockets: 14
lag: 56
 concurrent: 7
  completed: 26
    sockets: 14
```

### Falling over

Now, with just one change on the _client_, we can overload the _server_. Change the _client_'s `LAUNCH_DELAY` from 10 (100 per second) to 5 (200 per second). Now we start to see some errors:

```text
concurrent: 2469
 completed: 55
    errors: 30
connect ETIMEDOUT 127.0.0.1:3000
concurrent: 2481
 completed: 26
    errors: 1
connect ETIMEDOUT 127.0.0.1:3000
concurrent: 2498
 completed: 25
    errors: 1
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
connect ETIMEDOUT 127.0.0.1:3000
concurrent: 2505
 completed: 34
    errors: 9
```

And the _server_ is definitely not looking good. Its event loop is starting to slow down with so many incoming requests. It can't keep up. Sometimes connection timeouts give it a temporary reprieve, but those errors only visible to the downstream _client_ (the _server_ didn't respond in time to the standard 'create new socket' request).

```text
lag: 804
 concurrent: 213
  completed: 43
    sockets: 256
lag: 1238
 concurrent: 0
  completed: 213
    sockets: 256
lag: 1238
 concurrent: 66
  completed: 62
    sockets: 128
lag: 876
 concurrent: 0
  completed: 66
    sockets: 128
```

## Mitigations

The server does have a `REJECT_IF_TOOBUSY` flag which prevents it from melting down in the face of this high load. This is good for the _server_, but the _client_ will receive errors.

For this post, we're mostly interested in techniques for the client side, since we often deal with servers we don't control. The goal is to design our Node.js _client_ to treat the _server_ respectfully.

### Throttling

You've already seen this kind of behavior with `async.js`, with its [`parallelLimit`](https://github.com/caolan/async#parallel) and [`mapLimit`](https://github.com/caolan/async#mapcoll-iteratee-callback).  Setting `MAX_CONCURRENT` in the _client_ enables a single throttling choke point for all requests to the _server_. Any new request generated when there are `MAX_CONCURRENT` active will be cancelled, a new metric in the logging.

But presumably any app you write is generating requests at its current rate for a reason! You can't just cancel requests! Limiting the number of concurrent requests will either create an ever-increasing backlog or drop some requests.

It's worth noting that each application will have its own requirements. In this case, the fake _client_ produces a constant load, and the _server_ is only being accessed from the one _client_. It consistently gets worse, lagging behind further every second. What if the traffic was more cyclical? In that case, throttling might be useful to flatten out the top of peaks. You'll just need some sort of system to ensure that no requests are dropped: caching them somewhere, maybe telling your users that you'll email them when their request is complete.

### Circuit-breaker pattern

Like throttling, [this technique](http://techblog.netflix.com/2011/12/making-netflix-api-more-resilient.html) also involves canceling or delaying requests. But instead of basing it on the number of concurrent requests, it keeps track of the health of the _server_.

If `CANCEL_IF_RECENT_ERROR` is set to `true` in the _client_, any error returned from the _server_ will cause the client to take a break from requests for a while (`RECENT_ERROR_DELAY`).

This is an extremely simple example of this pattern - imagine using more sophisticated techniques for detecting problems with a remote server (latency or some sort of metric included in responses), and better techniques for dealing with a flagged remote server (instead of a period of zero contact, less parallelism or periodic test requests).

### Socket limits

The [default number of sockets Node.js is willing to make to another domain is `Infinity`](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_new_agent_options). And that's just not nice! Sockets are a limited resource, and so is computing power! Your upstream server likely wasn't designed for that kind of high-use client. Most clients open a limited number of sockets. For example, [modern web browsers make only about six concurrent connections](http://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser).

The solution to this is to create your own [`Agent`](https://nodejs.org/api/http.html#http_class_http_agent) or modify [`http.globalAgent`](https://nodejs.org/api/http.html#http_http_globalagent). By setting [`maxSockets`](https://nodejs.org/api/http.html#http_agent_maxsockets) you can limit the number of sockets used per domain.

Watch, out, though! If you exceed what can be handled with that set of sockets, you'll end up with a lot of requests sitting in very low-level queues, waiting to go out on the wire. You can use the `timeout` option in libraries like `request` and `superagent` ensure that requests don't hang out there forever. To see this in action, you can set `REQUEST_TIMEOUT` in _client_.

Quick errors are better than waiting forever. But it's still not a good user experience.

## The root problem

Fundamentally, the problem here is one of differing capacity across the components of a distributed system. And in many cases those differences only become clear in bursts of higher traffic.

Depending on your scenario, caching in one layer can paper over problems in other layers - at the cost of latency. If you have some way of [communicating up the system](http://engineering.voxer.com/2013/09/16/backpressure-in-nodejs/), that can help too. But there's a cold physics at work here. User expectation and default timeouts are a harsh judge.

Your best bet is to do load testing beforehand, then track production latency and throughput very closely. Find alternatives for anything giving you problems! Your traffic is only going to grow from here, right?


