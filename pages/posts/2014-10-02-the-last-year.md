---
rank: 14
title: The Last Year
date: 2014-10-02T20:00:00.000Z
layout: post
path: /the-last-year/
next: /node-js-is-not-magical/
previous: /autumn-associations/
tags:
  - business
  - career
  - software
---

It’s [Fall, a time for reflection](/autumn-associations/), and it has been about a year since I posted [Why I Left LIFFFT](/why-i-left-liffft/). I think a little business update is in order. Let’s talk about how I’ve been filling my days...

<div class='fold'></div>

![taking javascript seriously](https://static.sinap.ps/blog/2014/Oct/taking_javascript_seriously_me-1412211402696.jpg)

## Presentations

After giving a quick example of [some cool stuff](https://github.com/scottnonnenberg/learn-node) I’ve done with Node.js at the [Learn Node SeattleJS](http://www.meetup.com/seattlejs/events/134937662/) meetup last September, I was invited to speak at the [Seattle Software Craftsmanship](http://www.meetup.com/seattle-software-craftsmanship/) meetup. About a month later, I spoke there about Javascript.

Seattle Software Craftsmanship is made up of folks who really care about architecture and the craft of building software, so they look down on Javascript a bit. My goal wasn’t to make them like Javascript. I had a more realistic goal: to help them deal better with the Javascript they are forced to write.

_[Taking Javascript Seriously](http://www.meetup.com/seattle-software-craftsmanship/events/143419342/)_
<br>
Abstract: _Yep, javascript is a scripting language, and many consider it just a necessary evil of web development. But you're still spending time writing it, right? Perhaps more importantly, you're also debugging it. Let's talk about a few techniques you can use to start thinking about it like the rest of your "real" coding. Almost all of what I'll cover applies both to server and browser javascript._
[ [Slides]( http://scottnonnenberg.github.io/taking-javascript-seriously/dist/slides.html#/)
 / [Video](https://www.youtube.com/watch?v=ULbE-IqDwmw)
 / [Slides Source]( https://github.com/scottnonnenberg/taking-javascript-seriously) ]

A couple months later, SSC asked me to come back again. This time I didn’t have a topic on the tip of my tongue. But I do have a lot of passions. So I came up with a problem near and dear to my heart: helping coders with their non-code skills.

_[Social Engineering for Good, Not Evil](http://www.meetup.com/seattle-software-craftsmanship/events/159243162/)_
<br>
Abstract: _When I last spoke at SSC, it was about Javascript. We covered a lot of information, but I'm no TJ Holowaychuk or Jeremy Ashkenas.  As Software Craftspeople, we think a lot about the software itself - yet it's not anything I spoke about in my last talk that makes me different from those Javascript luminaries. It's how they interact with people, with the world. In this talk I'll cover some techniques you can use to engineer higher creativity, better relationships, and a better career._
[ [Slides](http://scottnonnenberg.github.io/social-engineering-for-good/dist/slides.html#/)
/ [Audio](https://s3.amazonaws.com/blog-scottnonnenberg-com/2014/Oct/Social+Engineering+for+Good%2C+Not+Evil+at+SSC.m4a)
/ [Slides Source]( https://github.com/scottnonnenberg/social-engineering-for-good) ]

![open source](https://static.sinap.ps/blog/2014/Oct/open_source-1412211395097.png)

## Open Source

For several years now, I’ve been using Open Source Software pretty heavily. Of course there were the dabblings with Linux in college, but starting at Microsoft mostly quashed that. Four years ago, when I jumped headlong back into the world of code, I chose Ruby on Rails. Not long after, bought my first Mac, based heavily on open-source technology. Now I host my Node.js apps on Ubuntu VPS machines.

In the last year I’ve really tried to increase my contributions back to the community. My pull requests have been approved for a number of projects ([postgres-adapter](https://github.com/jugglingdb/postgres-adapter),
[jugglingdb](https://github.com/1602/jugglingdb), [groc](https://github.com/nevir/groc), and
[grunt-mocha-cli](https://github.com/Rowno/grunt-mocha-cli)). But my bigger focus is on original projects filling needs not covered adequately by the community today.

## TheHelp

I’ve started and worked on quite a few Node.js projects at this point, and I started noticing some patterns. Standard things that just about all projects needed. Nearly two years ago now, I created a private library I called TheHelp, hoping to use it for my project and release it to the public too. I did use it heavily in all my projects. It grew and grew.

A year ago, I realized that I’d never release TheHelp in its current state. I needed to split it up. As I investigated this possibility, I was surprised to discover something like ten separate components hiding inside that one project. So I started the process of splitting TheHelp into its component parts. Everything got a lot cleaner.

So far, I’ve released six TheHelp components via github and npm, with more on the way:

- [thehelp-project](https://github.com/thehelp/project) - Easy setup of grunt-based automation (jshint, testing, doc gen, partial watch, etc.) for javascript projects of all kinds.
- [thehelp-client-project](https://github.com/thehelp/client-project) - Easy setup of grunt-based testing, optimization and release preparation for requirejs-based client javascript.
- [thehelp-test](https://github.com/thehelp/test) - One-step install for client/server testing tools: chai, mocha, sinon and code coverage via blanket.
- [thehelp-core](https://github.com/thehelp/core) - Basic logging, environment and error management functionality for javascript client/server applications.
- [thehelp-messaging](https://github.com/thehelp/messaging) - A lightweight package for sending SMS via Twilio, and email via Sendgrid. Also makes it easy to receive SMS and email from these services in express-based apps.

Install ‘em and let me know what you think! :0)


![company logos](https://static.sinap.ps/blog/2014/Oct/clients-1412211376291.jpg)

## Contracting

Last October, a couple software development contracts fell into my lap, and I took the one focused on my platform of choice: Node.js. This kicked off a number of contracts over the past year. Happily, I have been able to avoid the mistakes of the past and keep my hours low - 20 hours or less per week. I can make progress towards my own goals while also making my client happy.

In the last year, I’ve worked on three contracts:

- [Mulesoft](http://www.mulesoft.com/) - For a re-entry into the world of contracting, it was idyllic. I worked on it by myself, and the project started from scratch. Two months.
- [Walmart Labs](http://www.walmartlabs.com/) - This project was quite a contrast. The project was very large, and well under way by the time I started on it. But I did get a chance to work with some of the first people to use Node.js in a corporate environment, at scale, in production. Five months.
- [Haiku Deck](https://www.haikudeck.com/) - This one is a cross between the previous two contracts. It’s a previously-existing project and I’m working with others on it, but it’s nowhere near the size of the Walmart contract. I’m three weeks in and it seems to be going well. :0)


![gamma corvi bird](https://static.sinap.ps/blog/2014/Oct/gamma_corvi_bird-1412211369527.png)

## Introducing Gamma Corvi

In the last year I discovered some of the interesting ways the law doesn’t consider Sole Proprietorships to be real companies. The most impactful for me, discovered in setting up one of my contracts, was that [Sole Proprietors are often considered employees, not independent contractors](http://www.forbes.com/sites/robertwood/2012/05/09/irs-provides-template-for-employee-vs-contractor-mess/).

So I incorporated: [Gamma Corvi, Inc.](https://gammacorvi.com) I do my contract work through it, and will soon be releasing original applications through it too. It feels good to have full legitimacy. It’s got an accountant, a lawyer, a payroll setup, and a real business bank account. Gamma Corvi, Inc. is for real. :0)

I named it after [the brightest star in the Corvus constellation](http://en.wikipedia.org/wiki/Gamma_Corvi), itself named for the Corvid family of birds. Why? Because I've grown fond of the smart little crows common in my neighborhood. I even added some easter eggs with [crow-related trivia and videos](https://www.youtube.com/watch?v=QqLU-o7N7Kw) to [the company web site](https://gammacorvi.com)!

## But what does it mean?

I feel like the last several years have prepared me for this time in my life. I’m learning a lot, releasing projects, doing contracts, living how I want. But honestly, the last few years have all felt like that. Actually, the last three years. Come to think of it, it’s been exactly three years since I left Microsoft.

Before my departure, I remember being very nervous about leaving Microsoft. I wasn’t sure exactly what was going to happen next once I turned in my keycard. Now, after three years I can say that even those low-confidence post-Microsoft expectations were all wrong. But that’s a good thing! Growth!

My time since Microsoft hasn’t always been comfortable, but it has been very rewarding. Here’s to another year of closing my eyes and stepping out into the void. :0)
