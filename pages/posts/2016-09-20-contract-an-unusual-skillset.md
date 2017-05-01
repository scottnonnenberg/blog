---
rank: 58
title: "Contract: An unusual skillset"
date: 2016-09-20T19:25:01.850Z
layout: post
path: /contract-an-unusual-skillset/
next: /breaking-the-node-js-event-loop/
previous: /understand-the-problem-dev-productivity-tip-1/
tags:
  - training
  - contract
  - nodejs
  - reactjs
  - javascript
  - business
---

![Social Security Administration Logo](https://static.sinap.ps/blog/2016/09_sep/ssa/ssa-logo-banner.png)

I've spoken before about my [training](/tags/training/) and [development](/contract-new-techniques-old-technology/) contracts, but my second stint at the [Social Security Administration (SSA)](https://www.ssa.gov/) was an interesting mashup. I worked with the code itself as well as with developers, project managers and executives. It was a great opportunity to use my unusual skillset: [spanning the tech/non-tech divide](/from-tech-person-to-people-person/)...

<div class='fold'></div>

## Background

My [first stint at SSA](/contract-teaching/) was primarily about technical training: knowledge transfer of [Node.js](https://nodejs.org/) and [React](https://facebook.github.io/react/) concepts to senior developers who would soon be starting a project. After a lot of classroom training and [mob programming](https://en.wikipedia.org/wiki/Mob_programming), I left them with a very basic app showing most of the techniques they'd need to use, and a lot of training materials.

The week after my departure, those senior developers started working with a larger team on the project. Since I never got the chance to meet these new people, the people I had worked with were faced with a second level of knowledge transfer. And it was even more than I had covered: specific dependency choices for the project, architectural patterns, project workflows, etc.

Twelve weeks later, I was brought in again. It was a chance to see where my teachings had taken root, and for me to course-correct if necessary. But this time I would have an impact beyond the pure technical.

## More time with senior developers

My first moments back on site put me face to face with the senior developers I had originally worked with. They gave me an overview of what had happened since my last visit: personnel changes, milestones hit, the overall structure of the project. It didn't take long for us to get into their challenges.

Progress on the project and new members on the team had raised architecture and coding standard questions. And I hadn't been around to answer them. So that was the first order of business. Anything the senior leads couldn't explain clearly to the rest of the team was our first order of business! High level discussions soon gave way to the very specific, so we moved to the keyboards.

I pair programmed with each of the senior developers, addressing any remaining uncertainty in real time, with real code. This was highly-leveraged time, because any code was destined for the style guide and central utility libraries, addressing very common questions and scenarios.

## Working with new team members

As the questions from the senior developers became less urgent, I circulated through the larger team. I introduced myself and discovered that my name was known! It wasn't just my information that had found its way to these new team members! And so, I answered enthusiastic questions from these new developers on the project. As awareness of my presence there spread, I was increasingly sought out by people across the project.

More than once multiple subteam representatives arrived trying to ask questions while I was pairing with a senior developer. But that was a good thing! I'd help the sub-teams debug their code, talk about how they might approach an upcoming daunting task, and tie it all to larger "why?" concepts - then return to the original pair programming.

As I spent more time with the larger team, some common questions and themes became clear. I assembled a list of topics that would be useful to most folks, and asked to get a one-hour meeting scheduled, open to the whole team. At the appointed time, the room filled to standing room only, then that hour extended to an hour and a half as I answered question after question. So we scheduled another. Only after that second meeting was I satisfied; the most urgent, universal topics had been addressed.

With most of the big stuff addressed, I started detailed code reviews. I had each subteam put their code on a big, wall-mounted display, then talk through the code line by line. This is where I was able to really see how the teams had been doing. I pointed out unnecessary code, pushed for simplifying wherever possible with smaller functions and files, warned about potential issues, covered associated concepts with quick refreshers, and so on. This was some real progress!

## Working with DevOps

When my presence became known to the wider organization, I was invited to several meetings with [development/operations (DevOps)](https://en.wikipedia.org/wiki/DevOps) folks. They had never been asked to deploy Node.js apps before, so we talked about process managers, reverse proxies, and the right server topology. The big surprise for them here was the process affinity for Node.js: because it is single-threaded, you'll get the best performance running one Node.js process per real processor.

Then we started talking about monitoring and logging. I had briefly touched on my principles for these during my initial trainings there, but the right people were in the room now. We talked about the [ELK Stack](https://www.elastic.co/products) ([ElasticSearch](https://www.elastic.co/products/elasticsearch), [Logstash](https://www.elastic.co/products/logstash), and [Kibana](https://www.elastic.co/products/kibana)) for logging infrastructure, and the [statsd](https://github.com/etsy/statsd)/[graphite](http://graphite.wikidot.com/) stack for monitoring. One good for text and full-text searching, the other for quantifiable metrics. By using both of these tools, they could get away from needing to parse logfiles to discover patterns or trends in the data generated by the app.

## Bridging the divide

As all of these detailed discussions were happening, I was absorbing the bigger picture.

Early on I spent the better part of a couple days sitting quietly in [standard project meetings](/the-why-of-agile/#the-why-of-agile-practices), paying close attention. I started to develop some theories, so I switched from passive observation to actively asking questions. I sought out specific people. I spoke to project participants of all roles: leads, project managers, and senior leaders as well as the developers.

I was able to build trust with the developers because I am a developer. But I was also able to build trust with the other roles on the project because I've spent time running projects, designing features and talking to customers. And I've spent a lot of time with senior leaders in various organizations.

And so, with that trust and the information I'd gathered, I started to bridge the gap between the various roles on the project. I could help people express their frustrations in a way that would make it more likely that they would be heard. I could help explain to one group why another group was behaving the way it was. And I had high-level recommendations for changes to the project. But of course I can't tell you what those were. :0)

## Reception

Once again, my client really seemed to appreciate my contributions:

> _"We have used Scott several times to help us transition to Node.js and related technologies. From training developers new to Node.js, to performing mob programming with our lead developers on frameworks and advanced topics. Scott's in-depth understanding and ability to transfer knowledge of Node.js and asynchronous programming really helped jump start our project."_ - [Bill Cole](https://www.linkedin.com/in/bill-cole-45391a40), Chief Architect of Disability Case Processing System

## The Future

It's possible that I'll go back for a third stint with the SSA, but it's hard to tell for sure. What I do know is that I'm ready. And I'm ready to help out any other organization writing software, especially if it's using Javascript, React, or Node.js. I can write and critique code, help design features and process, and even help everyone work together more smoothly.

Sound interesting? [Let me know!](mailto:scott@nonnenberg.com)
