---
rank: 23
title: 'Contract: Teaching!'
date: 2015-10-09T16:53:00.000Z
layout: post
path: /contract-teaching/
next: /open-source-and-feelings-the-awesome/
previous: /the-dangerous-cliffs-of-node-js/
tags:
  - business
  - reactjs
  - nodejs
  - software
---

![Social Security Administration Logo](https://static.sinap.ps/blog/2015/10_oct/ssa/ssa-logo.png)

If you're a frequent visitor at [gammacorvi.com](https://gammacorvi.com/) (and of course you should be), you may have noticed an unusual entry under the [Clients heading](https://gammacorvi.com/#clients): the [Social Security Administration](http://www.ssa.gov/) (SSA). Yes, I recently spent three weeks in Baltimore, Maryland, teaching SSA developers about [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [node.js](https://nodejs.org/), [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development), [express](http://expressjs.com/), [react.js](https://facebook.github.io/react/), [git](http://git-scm.com/), and much more.

It was quite a bit different from recent contracts, because I didn't write any code. I was simply there for knowledge transfer, via three primary tools:

1. Hands-on classroom training
2. Pair/mob programming
3. Node.js overview session

<div class='fold'></div>

## Node.js? SSA? What??

Before we jump into what I did for them, you're probably a bit surprised. Why is the SSA interested in using new open-source technology when they've been using other technologies for so long? The answer is [The United States Digital Service](https://www.whitehouse.gov/digital/united-states-digital-service) (USDS). In their words, USDS is:

> "Teams of problem solvers making government services simple, effective, and efficient."

In the case of their engagement with SSA, USDS recommended Node.js for its productivity, simplicity, and because it is free and open source. Business as usual had been high-value contracts simply for access to proprietary software, with additional consulting and support contracts required to be productive with that software.

With the decision to use Node.js made but few resources of their own, USDS needed to pull others in to help bring SSA up to speed. They came across my name, and my availability and experience matched what they were looking for. This is what I did for them...

![United States Digital Service Logo](https://static.sinap.ps/blog/2015/10_oct/ssa/usds-logo.png)

## 1. Hands-on classroom training

I was surprised when they asked for actual classroom training. I can point to any number of problems with the standard classroom training approach, but that actually makes me a better teacher. The classroom isn't such a bad place, really - it does actually give you the opportunity to support most [learning styles](https://en.wikipedia.org/wiki/Learning_styles).

My classroom technique focuses on exercises. Most of the 15 modules we covered over the three days included just a little bit of lecture, and a lot of tasks to be done individually. A student could completely ignore my lecture and just use the materials I prepared beforehand, following the instructions in the readme. These standalone-ready assets will be useful for the SSA going forward, as more developers will likely need to learn about Node.js over the coming years.

I spent a lot of time with students one-on-one as they progressed through the material, helping them wherever they were: stuck on the first task, wrestling with a bug halfway through, or looking for what to do next after finishing. Common sticking points became very clear as I walked around the room, and a couple quick announcements allowed everyone to move faster.

My goal was to get developers familiar with standard tools and approaches, confident in their ability to tackle new APIs without my help. Just about all exercises had students reading official documentation for the modules in use. With only three weeks on site, I had to be focused on building habits and attitudes.

## ![my desk at the head of the classroom](https://static.sinap.ps/blog/2015/10_oct/ssa/head-of-classroom.jpg)

## 2. Pair/mob programming

Once the classroom time was complete, I worked with the dev team to start developing real features on their pilot project. A few times early on it was me and another developer pair programming a feature, the developer with hands on the keyboard. But we quickly settled into a rhythm: a bigger room with a large screen on the wall, one person on the keyboard, and a whole group of us watching and giving advice. This is usually called mob programming. It made sense; with more people in the room, more could learn from my guidance.

The shift in focus to real development of features changed the tone; these weren't toy examples anymore. The energy in the room was far higher, since was how they'd be doing things going forward: create a branch in git, write tests first, write production-quality code, then submit a pull request. No doubt about it, getting good at this process would pay big dividends.

That is why I prefer this kind of learning, in the process of developing new features, on an as-needed basis. In contrast to predefined curriculum and purely illustrative tasks, there is no doubt as to whether the material will be useful in the future.

I surfed the energy level, constantly trying to keep developers at that edge where they still had to work a little to suss it out for themselves, prompting only when necessary. With the larger group in the room the entire group can be working on the problem. We spent the majority of my time onsite in the mob.

![mob programming screen](https://static.sinap.ps/blog/2015/10_oct/ssa/mob-programming-screen.jpg)

## 3. Node.js overview session

SSA also asked me to address a wider audience to help build awareness about Node.js. One team had decided to pilot a project with it, perhaps other groups might also be interested?

With this hour-long talk, my goal was to speak in a language that my audience understood. Happily, I've long been able to bridge the gap between the business and technical side. At Microsoft I was a Program Manager, doing this very thing. It's one of the reasons my contracts generally go well: successful communication.

In this case, my audience was high-level technology leaders. I started from the beginning - what are the actual components that make up Node.js, why is it special, and what is the value can it provide to an organization. Demos are always crowd-pleasers, so I did a quick live-code to show off asynchronous vs synchronous code, then the minimal code required to build an API producing data from a database.

This lead to a healthy Q&A session. I noticed a clear trend in the questions I got from people who were encountering Node.js for the first time. They were looking for direct replacements for current tools. I'd get questions like "How do I do distributed transactions?" or "How do I connect it to an enterprise configuration server?" My goal with these questions was to break it down, get down to the specific scenario. Distributed transactions help you solve a set of problems. But what's actual problem? Transactional database updates then hit another service on success only? That's just basic asynchronous Node.js code and support for database transactions. No fancy library required.

## ![SSA parking lot](https://static.sinap.ps/blog/2015/10_oct/ssa/ssa-parking-lot.jpg)

## The result?

Let's start with some quotes from their developers:

> "That's the best training I've ever been to"

>"I realized how much we didn't know"

I was brought in to help prepare them for a new project just starting up. That project still has aggressive goals and deadlines, and they still have a lot to learn. You can only learn so much in three weeks. But they know now what they should know, have materials to help them learn it, and have a new confidence that was missing before I arrived.


## What about you?

Perhaps your company is also looking to make the jump from expensive proprietary software to high-productivity, community-driven open source technologies? Reach out and Gamma Corvi might just be able to help! Your developers will thank you.
