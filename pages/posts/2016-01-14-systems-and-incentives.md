---
rank: 42
title: Systems and Incentives
date: 2016-01-14T17:54:26.000Z
layout: post
path: /systems-and-incentives/
next: /a-running-update/
previous: /enterprise-node-jsjavascript-difficulties/
tags:
  - business
  - software
---

Over the years, in various software development roles, I've learned to stop thinking of people as individuals. But it's not a bad thing...

<div class='fold'></div>

## Frustration

*A couple years ago I was working on two layers of an application: the Node.js proxy/translation middle tier, and the backbone-based single-page web app. After some investigation into my highest-priority task, I determined that I didn't have what I needed to implement it without a change in the third layer: the backend. I assembled a message with the intended customer experience and our high priority for the feature, then sent it off to the backend team.*

*The response was that they could deliver my requested functionality in **three months**. I escalated to leadership, and that ETA shrank to two months. I joked that I should just go make the change myself in their system, then moved to the next task on the backlog.*

*Fast forward to a couple weeks later. The same backend team calls me and asks for my signoff on a change coming in the next release of their system. As I pushed toward clarity with many questions, it dawned on me that this new feature was worthless from my perspective. It didn't enable any new features for the customer, and would require changes from me to keep key functionality from breaking.*

## Who's the asshole?

Putting these two situations side-by-side, we just weren't getting along. How could they be so out of touch with my needs? With the customer's needs? As far as I knew, I was their only client. Were they just selfish, using scheduling as an excuse to be lazy? Was I being selfish?

The answer: **neither**. It turns out that we were both being reasonable.

Their system, the incentive structure for their team, was different from my system and its incentives. We like to think of ourselves and others as independent agents, but we're always inside of a context. What may look like a bad or selfish person is simply someone responding to their system. Unless we make particular effort, we'll wrongly evaluate others' behavior in our context.

## The Conflict

What was defined as success for me was not defined as success for them. Just like me, members of the backend team were trying to do a 'good job.' For them, a 'good job' was to deliver what they promised, and to avoid bugs in the features delivered. A 'good job' for me was to deliver a different set of features.

Because I was working on features for the browser, I thought I had a better handle on user needs, therefore my requests were better justified. But it's ultimately their backlog against my backlog.

This kind of conflict is a common problem in large companies.

## A simpler system

Smaller companies, especially early-stage startups, don't have this problem very often. Why is that? It's because their systems are designed to encourage the right behavior.

In these kinds of organizations, everyone has a clear goal in mind - bottom line impact to the business. You can trace everything you do to that bottom line. So instead of abstract backlog versus backlog priority negotiations, you can talk about each item and its potential for increased customer satisfaction or revenue, using real data.

Additionally, smaller teams frequently empower each individual to do whatever it takes for the business. There's no backend team, because everyone works on the entire app. It's true agile, because every feature in the single, prioritized backlog is a true user story, resulting in new business value.

## Keep the system in mind!

So you're not at a small, agile organization. What can you do? You can take on a new perspective.

If you're an individual contributor, try some of these:

1. *Think in terms of systems and incentives*. When working with another person, especially on another team, learn about their system. Focus on any overlap in incentives and make potential conflicts widely known as early as possible.
2. *Move the discussion away from the abstract to quantified potential business value* (increased revenue or customer satisfaction, or even decreased costs) when planning work or negotiating priorities. Rigorously develop these projections with real data, real customer input.
3. *Reduce the number of steps between you and the customer*, ideally talking to customers yourself. With every step, the customer message will be garbled by the different systems and incentives in place for those conveying that message. It's that old game of telephone.
4. *Treat the internal teams you deliver to as paying customers*. In theory their happiness is tied to customer happiness, since they do deliver to customers.

If you're a lead, you can consider a few more, higher-level tasks. Even without the power to directly change these, you could still lobby for them:

5. *Empower individuals to solve complete problems*. Build a [culture of pull requests](http://neilb.org/2014/12/31/pr-etiquette.html) for internal projects, so anyone who needs something could implement it. Consider using technologies like [Node.js](https://nodejs.org/), which make it easier for one developer to implement a feature from the database all the way to the web browser.
6. *Focus on group-level incentives based on business metrics*. Abstract metrics will encourage people to game the system. Too much focus on individual incentives can threaten team cohesiveness and minimize knowledge sharing.

## The right perspective

No matter where you are in an organization, this kind of approach is useful. And it turns out that understanding the larger context is useful in many situations beyond business.

Some might even call it empathy.
