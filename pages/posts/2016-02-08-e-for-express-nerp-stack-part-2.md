---
title: E for Express (NERP stack part 2)
date: 2016-02-08T22:43:15.846Z
layout: post
path: /e-for-express-nerp-stack-part-2/
next:
previous: /a-35lb-weight-swing-in-two-years/
tags:
  - nodejs
  - nerp-stack
  - software
  - javascript
---

Welcome to Part 2 of my series ([Part 1](/n-for-node-js-nerp-stack-part-1/)) about a new, nicer-than-[MEAN](http://mean.io/), brighter-than-[LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)) development stack. Today we turn to the Pros and Cons of Express.

<div class='fold'></div>

As quick reminder, the NERP stack is:

* **N** = [Node.js](https://nodejs.org/)
* **E** = [ExpressJS](http://expressjs.com/)
* **R** = [ReactJS](https://facebook.github.io/react/)
* **P** = [PostgreSQL](http://www.postgresql.org/)

Like Node.js, we share Express technology with MEAN, but we still need to justify its use in our applications. It’s not the only player in building servers with Node.js...

## To the metal

Before we talk about libraries, we must first talk about what it takes to write a library-free server in Node.js. After all, the very [first bit of code handed to a Node.js beginner](https://nodejs.org/en/about/) is a bare-bones web server:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

That’s it! Just a few calls and a little bit of [ECMAScript 2015 magic](https://github.com/lukehoban/es6features#template-strings). In this example, every HTTP request to port 1337 on the local machine is handled by one function simply returning "Hello World." Easy enough, eh? A very simple starting point you can incrementally build on, in [the unix way](https://yakking.branchable.com/posts/unix-philosophy/).

I find, however, that immediately after getting that working I think to myself "I just want to handle a few URLs." It’s such a basic requirement that I really can’t recommend starting here.

## Enter Express

Once we [install Express](http://expressjs.com/en/starter/installing.html), we can run its [beginner tutorial code](http://expressjs.com/en/starter/hello-world.html):

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

One library, just a few calls, and we send back a simple string like before. But now we don’t send the response all the time: only when the incoming URL is the root path, and the [HTTP verb is GET](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3).

## E for Express

You can clearly see the need for something beyond core Node.js libraries for your servers. But which library? Let’s ensure that our E is justified.

## The Pros

First let’s talk about why you might adopt Express...

1. Follows the unix ethos
2. Simple composition
3. Large ecosystem

### 1. Follows the unix ethos

Like Node.js itself, Express is [small and lightweight](https://github.com/strongloop/express/tree/master/lib), a simple core of only the truly necessary functionality. It does just a little bit, and does it simply and reliably. In fact, [4.x *removed* standard components](http://expressjs.com/en/guide/migrating-4.html#changes) in favor of a smaller surface area. Why? Because you, the developer, are trusted to build the final application with small building blocks. You only use the blocks you need.

### 2. Simple composition

Extending most server libraries typically requires a lot of configuration: lots of documentation, example projects, even boilerplate generators. Express has a very simple interface. Want to add functionality to your server? Create a *middleware* function with this simple signature:

`function(req, res, next)`:
* `req` - the object representing the incoming request from the client. Not too many steps removed from the `req` object you see above in the raw node example.
* `res` - same as the previous, for your response going back to the client.
* `next` - allows a middleware function to pass an error to Express, or simply yields to the next handler when passed nothing.

You can install one of these *middleware* functions globally so every incoming request runs it, or just a subset of your endpoints, or even just one specific endpoint. Once you have the basic concept down, you’re off and running.

### 3. Large ecosystem

The simple *middleware* interface has withstood the test of time, allowing others to build upon it confidently. Now you can find [Express *middleware* components](https://www.npmjs.com/search?q=express) for just about anything. The Express ecosystem is big enough that your average Node.js SDK [will include](http://docs.stormpath.com/nodejs/api/home) [Express middleware](https://twilio.github.io/twilio-node/) or [examples](https://github.com/auth0/node-auth0/tree/master/examples). But you won’t see that for any other server platform.

## The Cons

Now, some of the elements of Express which might give you pause...

1. Not production-ready out of the box
2. Naive route search algorithm
3. Simplicity makes some things tough

### 1. Not production-ready out of the box

It’s time to talk about the major competitor for Express, [Hapi](http://hapijs.com/). Where Express embodies a unix-style stripped-down approach, Hapi takes the opposite approach: provide everything directly. The core Hapi server has a large amount functionality out of the box and works with [a large suite of plugins maintained by the core team](https://github.com/hapijs). You could get away with going straight to production with a Hapi-based server, since it enables many key features by default.

You cannot say the same about Express. You’ll need to research, download and install *middleware* for each of these very basic server needs:

* [logging](https://github.com/expressjs/morgan)
* [session management](https://github.com/expressjs/session)
* [CSRF](https://github.com/expressjs/csurf)
* [CORS](https://github.com/expressjs/cors)
* [404 and error handlin](http://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses)[g](http://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses)
* [graceful shutdown](https://github.com/thehelp/cluster)

As you can see, I’ve given you a head-start on each of these. The unix ethos means that we have to find all the small components required to make an application that does everything we need. We’re not signing up for a complete framework. This is not [Ruby on Rails](http://rubyonrails.org/) or [ASP.NET](https://get.asp.net/). We haven’t even started talking about database access yet!

Of course, these two approaches aren’t so different - for a given problem domain, either you find a new third-party module or you learn about the built-in module inside the comprehensive framework. Do you like hunting for node modules, or do you like digging deep into documentation?

### 2. Naive route-search algorithm

Express uses a naive algorithm to determine which of your endpoint registrations should handle an incoming request: [a linear search through every registered handler for that HTTP verb](https://github.com/strongloop/express/blob/master/lib/router/index.js#L214), [running `RegExp.prototype.exec()` for each](https://github.com/strongloop/express/blob/master/lib/router/layer.js#L125). The more endpoint registrations you have, no matter their structure, the longer that *synchronous* search could take.

I did a test once with hundreds of thousands of endpoints, and it wasn’t pretty. I even found the threshold where the [Node.js process would run out of memory](https://github.com/nodejs/node-v0.x-archive/wiki/FAQ#what-is-the-memory-limit-on-a-node-process)!

The good news is that the loop does end early when Express finds a matching handler. And you can use [Express Router objects](http://expressjs.com/en/4x/api.html#router) to subdivide the search space of your server’s endpoints. Still, it’s worth comparing this to [Hapi’s more complex routing based on URL segments](https://github.com/hapijs/call).

### 3. Simplicity makes some things tough

Yes, that simple *middleware* function signature makes things easy. But it makes some things hard too. For example, Express is all about a chain of *middleware* functions, and the last one sends the response to the client instead of passing control to the next handler. Express itself doesn’t actually know when a request is complete.

So how would you do something at the *end* a request? The answer [is actually a little tricky](https://www.npmjs.com/package/on-finished).

There are quite a few tricky things with Express:

* Returning an error on response timeout, while also preventing attempted second replies to the client
* Debugging *middleware* which calls `next()` more than once, or never calls it
* Figuring out which *middleware* made a given change to `req` (it is frequently used for cross-*middleware* communication, a store for request-global variables)
* Trapping errors caused by *middleware* functions, then returning an error to the originally-requesting client

## Conclusion: It’s a good choice

Even with some of these downsides, Express is a good choice for your Node.js servers. It provides a minimal subset of functionality that just about all developers will need. And the large amount of Express *middleware* available will quickly bring your server to production-ready.

I will admit, though, that this decision is probably the closest of the four technologies in NERP. Hapi is worth some consideration, though it is harder to configure and has a smaller ecosystem.

## Onward and NERP-ward!

Our E is in good shape. Two letters down, and we’re just about even with Ruby on Rails. It only ever had two capital letters in its RoR acronym. Onward!

Stay tuned for *Part 3: R for React*...
