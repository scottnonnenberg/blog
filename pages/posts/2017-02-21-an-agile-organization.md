---
title: An Agile organization
date: 2017-02-21T22:15:12.585Z
layout: post
path: /an-agile-organization/
next: /getting-started-with-elixir/
previous: /2017-twenty-years-online/
tags:
  - agile
  - software
  - business
---

What does an *Agile* company look like? Most discussion of *Agile* is about the *software development methodology*, therefore only the software parts of an organization. But leadership wants to be able to promise specific dates to their customers, owners or sponsors! Publicly-traded companies have specific quarterly targets to hit!

How can we bring these two sides into alignment? I’ve already covered [what *Agile* is and why it is important](/the-why-of-agile/), [some ideas for customizing it](/customizing-agile/), and [some technology to enable it](/the-technology-side-of-agile/). Now let’s talk about making the business itself *Agile*.

<div class='fold'></div>

## Create a chain of trust

A couple years ago, I was connected with the CEO of a relatively new startup via my [Startup Weekend](https://startupweekend.org/) involvement. He wanted to talk, given [my background](https://scottnonnenberg.com/work/). We set up a time for the video call. His very first question was: *"How do I know my developers are doing a good job?"*

It was such a perfect expression of that standard distrust across [the technical/non-technical divide](/from-tech-person-to-people-person/). Without any technical expertise he cannot independently verify the claims made by his technical team. Are they slacking off? Are they taking advantage of him? Is he that desperate owner of a broken down car, and they are the smirking auto mechanics?

Repair that relationship by building a chain of trust from business decision-makers all the way through to every technical team member. Generally this means choosing a very trustworthy leader of that organization. You want to trust not just this person’s direct technical capabilities, but also their trust decisions in others. That’s what creates the chain of trust. Anyone on the team is then deserving of trust.

Of course, you will need to verify that trust occasionally: ["trust, but verify."](https://en.wikipedia.org/wiki/Trust,_but_verify) Triangulate: ask different types of people from different parts of the organization for their opinion. Just remember to [account for bias](http://curt-rice.com/2013/10/01/what-the-worlds-best-orchestras-can-teach-us-about-gender-discrimination/). And if you’re really feeling unsure, don’t rule out third party involvement. The financial industry does it all the time in the form of [external audits](https://en.wikipedia.org/wiki/External_auditor).

## But, but...

The next question was *"We keep having trouble delivering features on time, after promising them to our customers! But we’re Agile! How do I ensure that we hit those dates?"*

It all fell into place. His situation was clear. Missed deadlines can very easily chip away at that trust. Especially when charged with that kind of urgency: needing to deliver on a promise made to a paying customer.

How do you marry a rigid schedule with *Agile* development techniques? You don’t. Sure, you can put big buffers into every part of the process to try to improve on-time delivery chances. But there’s something better.

Instead of giving him what he wanted, I presented an entirely new way of thinking about software development in relation to his business. The rest of this article is a summary of what we discussed.

## Respect the work

First, software development is hard work! But because it’s abstract, it can sometimes seem soft, fuzzy, or even easy to outsiders. Or as if [‘tough deadlines’ can make it go faster](http://www.issendai.com/psychology/sick-systems.html). Writing software is a whole lot more like writing a novel than it is like a magic spell. A lot more like designing and building a new type of aircraft carrier while it is in rough ocean, occupied, and under attack, versus assembling an already-designed bridge from concrete, steel struts, and rebar.

Because of that, development needs to be considered as an exploration into the unknown! Developers might get a little bit faster as they spend more time with a codebase, but by definition every new feature is different from anything currently in the project. And different from things they’ve done in the past. Thus nobody knows how long it will take, or if it will even work out at all.

And it turns out that the same thing is true on the business side as well. Will that new product succeed or fail? Will users pay more for that meticulously planned new feature?

## Manage expectations

So, what do we do? How do we set expectations based on that kind of uncertainty? It turns out that [Apple Inc.](https://en.wikipedia.org/wiki/Apple_Inc.) is a good example here. They don’t talk publicly about any of their products until they are ready for final release.

It’s important to note how much preparation goes into an Apple announcement. First, they are fully confident in the product itself, having refined it with the help of [internal](https://www.macrumors.com/2016/06/28/apple-employee-watchos-3-wheelchair-beta-test/) and [external users](https://developer.apple.com/support/beta-software/). Second, their supply chain is in place, ready to distribute the product to all stores, or online worldwide. Next, the support organization is ready to handle problems reported with the new product. The list goes on.

When announced, an Apple product is ready to go. Makes you wonder how many projects are cancelled without seeing the light of day, doesn’t it? How close to release did they get?

To do this means that your public communications can only refer to what exists today. You’ll sell and advertise based on only the features currently released widely. When talking directly with a customer or potential customer, you might mention features currently in beta and what other customers think of those features. But never discuss readiness for wide release. And certainly no dates.

## Collaborate closely

Now the organization has room to develop the right product. You’re no longer in the world of long schedules, detailed timelines, and a book of requirements thrown over the wall to the technical side of the organization.

Close collaboration means that all disciplines come together to develop a business which is well-supported by product. This is the only way to make good decisions when the tradeoffs involved cross discipline boundaries. For example, if the business needs a certain feature, but it especially costly, can the business somehow be changed to require a different feature? The feedback loop goes both ways. It’s worth noting that technical CEOs often do this well out of the gate because the complicated interplay between business and product priorities can happen in one head.

This close *internal* collaboration is only part of it. Yes, you only announce products widely when they are ready widely. But you’ll have a whole host of customers involved in different parts of your processes: providing their perspective in interviews, using [concierge MVPs](http://ibuildmvps.com/blog/the-concierge-minimum-viable-product-maximizes-customer-learning), validating prototypes, and trying features via alpha and beta test programs. Customers who are most insistent about needing release dates can be added to these programs to get early access, give feedback and see the progress real-time.

## Create a risk backlog

What does it look like to manage this kind of cross-discipline, user-focused collaboration? Well, we did this when I was at the [Nordstrom Innovation Lab](https://scottnonnenberg.com/work/#nordstrom-2012-q-2-to-q-4). Pretty much the same [Kanban](https://en.wikipedia.org/wiki/Kanban) you’re used to!

It’s easy to imagine the backlog for a software product. Items are usually user-visible features. But even that backlog will include abstract things like a [spike](https://en.wikipedia.org/wiki/Spike_(software_development)) to investigate some sort of new feature, technology, or approach. This is an explicit risk reduction act. And it’s key to note that in a fully *Agile* organization, adding a feature to the product (usually behind a [feature flag](http://stackoverflow.com/questions/7707383/what-is-a-feature-flag)) is just the middle of a longer process: from initial customer discussions all the way through to final public release.

So the backlog for the entire organization will be a prioritized set of risks: business, technical, distribution, etc. In-progress items will all be iterative processes to discover methods of reducing or eliminating those risks. Your organization will be running tests, gathering data, and analyzing results. [Like scientists](/be-a-scientist-dev-productivity-tip-3/).

Over time the backlog will be less about risk reduction, and more about realization of potential benefit. More about upside than downside. Just remember to keep some high-risk items in play all the time, or you’ll fall prey to the [Innovator’s Dilemma](https://en.wikipedia.org/wiki/The_Innovator%27s_Dilemma)!

## Eat the world!

> _"Software is eating the world"_ - [Marc Andreessen](http://a16z.com/2016/08/20/why-software-is-eating-the-world/)

It is claimed that [more than half of internal software projects fail](http://www.cio.com/article/3068502/project-management/more-than-half-of-it-projects-still-failing.html). And [90% of startups fail](http://www.forbes.com/sites/neilpatel/2015/01/16/90-of-startups-will-fail-heres-what-you-need-to-know-about-the-10/#22848e9455e1). At the same time, companies which can effectively wield technology have a huge advantage over their competitors, in just about every space. Its benefits for efficiency and scale are unparalleled.

But what does that really mean, to be effective with technology?

In today’s world, it means true customer-focused coevolution of business and technology. You don’t finish one, then create the other. The business model and the technology evolve together over time toward a [going concern](https://en.wikipedia.org/wiki/Going_concern) and the tools to support it.

Your job is to create an organization, a system, to enable this. Build on my ideas, and be *Agile*!

