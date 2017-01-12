---
rank: 34
title: Customizing Agile
date: 2016-06-07T16:51:17.622Z
layout: post
path: /customizing-agile/
next: /eslint-part-1-exploration/
previous: /contract-new-techniques-old-technology/
tags:
  - agile
  - software
  - business
---

Ever since the term _Agile_ started to take hold in larger organizations, there's been a [growing](https://twitter.com/RonJeffries/status/718045486372954112) [backlash](https://twitter.com/bm2yogi/status/681848547281514496) among developers. Sadly, this is to be expected. As I pointed out [in my last post on _Agile_](/the-why-of-agile/), people want a set of rigid best practices, not a true new way of thinking.

So, how might we save it? I've already talked through [the reasons for the standard practices](/the-why-of-agile/#the-why-of-agile-practices). Now that we understand it, we can change it. Let's exercise a new muscle: taking a standard cookie-cutter plan and tuning it for your specific team, project, or organization.

<div class='fold'></div>

## Definitions

First, some definitions. We've been using the word _Agile_ a lot, but what does it mean, exactly? Where do terms like _standup_ and _sprint_ come from? Our first clue comes from [agilemethodology.org](http://agilemethodology.org/), the first result from a search for 'agile.' It is sure to differentiate between _Agile_ and _Scrum_. But it's interesting to note that _Scrum_ comes up after only four sentences, and is the same size in the [tag cloud](http://agilemethodology.org/#tagcloud) on the page. And the term 'sprint', mentioned under the _Agile_ header, is actually a _Scrum_ term.

These two concepts are wound together so tightly it's hard to tell the difference.

### What is Agile?

It's key to understand that none of the practices generally associated with _Agile_ came from it. And that's because _Agile_ endorses no specific processes whatsoever. The term came to prominence via a [2001 meeting](http://agilemanifesto.org/history.html) of [industry luminaries](http://agilemanifesto.org/authors.html) which resulted in [_The Agile Manifesto_](http://agilemanifesto.org/):

> _"**Individuals and interactions** over processes and tools_<br>
> _**Working software** over comprehensive documentation_<br>
> _**Customer collaboration** over contract negotiation_<br>
> _**Responding to change** over following a plan_<br>
>
> _That is, while there is value in the items on the right, we value the items on the left more."_

Yes, _Agile_ does value incremental improvement and regular checkins, mentioned in its more detailed [twelve principles](http://agilemanifesto.org/principles.html). But it does not specify formats, interval lengths, or names. Those largely come from _Scrum_.

### What is Scrum?

Surprisingly, _Scrum_ predates _Agile_. First appearing in [a 1986 paper](https://cb.hbsp.harvard.edu/cbmp/product/86116-PDF-ENG), it was refined and branded for a subsequent 1995 [OOPSLA](https://en.wikipedia.org/wiki/OOPSLA) paper: ["SCRUM Development Process."](http://www.jeffsutherland.org/oopsla/schwapub.pdf) In contrast to the *Manifesto*, it's interesting to note the term 'process' in the name of the paper. The familiar terms _sprint_, _Product Owner_, and _backlog_ all make an appearance. Other familiar terms, like _Scrum Master_, _sprint planning meeting_ and _impediment_ do not. Those terms are new.

The additional terminology came from businesses built up around the original concept, providing [books](http://www.amazon.com/gp/product/038534645X), [trainings](https://www.scrum.org/Courses), [certifications](https://www.scrumalliance.org/certifications/practitioners/certified-scrummaster-csm) and [conferences](https://www.scrumalliance.org/courses-events/events/global-gatherings/2016/orlando-2016). I took one of these Scrum trainings in January 2010, thanks to [Microsoft](https://www.microsoft.com/). The way it was presented, it was very easy to think of it as the Holy Grail solution to [Visual Studio](https://www.visualstudio.com/en-us/visual-studio-homepage-vs.aspx)'s long [waterfall](https://en.wikipedia.org/wiki/Waterfall_model)-style releases. So you can understand why it has taken hold in larger companies.

But it's key to understand that _Scrum_ is a process, with rigid roles and predefined meeting schedules. Lots of time is spent [debating as to what role has what authority](https://www.mountaingoatsoftware.com/blog/making-the-decision-to-abnormally-terminate-a-sprint), appealing to some imaginary 'true' definition.

So let's really practice _Agile_, and value:

> _"**Individuals and interactions** over processes and tools"_

## Change for the people

Let's talk about a few potential changes to the standard _Scrum_-centric way of doing things, and what kind of effect it might have on your project. We'll start with small changes, and work up from there...

### No subtasks

Yes, pretty much everyone solves complicated problems by breaking them down into smaller chunks. But not everyone does it consciously. In my experience, asking developers to put their subtasks into the system provides them absolutely no value, while also making them wonder how you are using that data. Is management trying to make performance decisions based on it? Scheduling decisions? That's not a good idea, nor is the mere suggestion of it to the team.

Try taking a break from this requirement. I'm sure your developers have been asking for this. If they haven't, here's a scary thought: maybe that's because they're afraid of what you might say!

### Allow multi-sprint efforts

The whole of software development doesn't fit into two-week chunks. If you try to force everything into your sprints, you'll miss out on a whole category of potential great work.

If a developer, in tune with business need, says they need a while, come up with a plan to enable that. Your instinct will be to try to break it up into smaller milestones and deliverables, but [deep creativity comes from empty time](https://hbr.org/2015/11/to-get-more-creative-become-less-productive). In this case your periodic checkins should be less focused on material productivity, and more focused on conceptual productivity.

### No cost for tasks

Sometimes developers get frustrated with the time it takes to come up with costs for tasks. Or it seems pointless. Or you're having trouble with consistency.

There are a lot of reasons you might want to experiment here. Try removing all costs from your backlog and sprint tasks. Instead, you can focus entirely on splitting them up to be of similar size. Once they are all comparable, you have the same visibility into velocity you had before!

_Note: You might end up with a kind of bi-modal solution. Full feature-size items and small 'fit-and-finish' bugs. It's a good compromise when you have bugs coming from outside the development team._

### No velocity

What you measure is what you are focused on, what is most likely to improve over time. What if your only overall metric was a survey of the dev team asking "Did you perform at your potential for this sprint?" Or how about "Were you happy in your job this sprint?"

I've seen a very clear correlation between developer performance and overall mood and job satisfaction. Developers very frequently have very high standards for themselves. At the very least you'll likely get quite revealing justifications for "no" answers.

### Temporarily drop retrospectives

Retrospectives form the backbone of a [feedback loop](/the-why-of-agile/#feedback-loops) that will gradually transform your development team into the best it can be. But it does take work to address the impediments raised during these meetings. Without that, the loop will never close and the benefits of of the meetings will be lost.

Crunch time happens. If you know you won't be able to work on impediments in the face of a big milestone, temporarily suspend your retrospectives. But know that you will be building up debt. Keep track of the pressure building up on the team.

You might be tempted to think the feedback you still get without retrospectives is good enough, but it's shadow of what a healthy retrospective system will elicit. Dedicated retrospectives, with proof that raised impediments are addressed, send a message that feedback is important.

### No initial sprint plan

Teams sometimes get themselves into a paradox. They want to sign up for a certain amount of work every sprint, but they can never quite do it. They always fall short. Sometimes it really is because of some unpredictable external factor like emergency production bugs. But most of the time it's plain overoptimism. [Deadlines can make people do unexpected things](https://keen.io/blog/143850394061/how-should-deadlines-be-used-in-software).

Try eliminating your sprint plan. You'll work directly from the backlog. Assure the team that progress is very important, but you trust that they'll work at the speed which is right for them. Here it helps to [connect the dev effort with the overall organizational mission](/systems-and-incentives/#keep-the-system-in-mind) to provide the urgency now no longer provided by arbitrary deadlines.

This might actually be harder on your _Product Owner_, because you'll want to get a little bit further ahead of the team than usual. Hey, it's possible that the team will come alive without as much pressure!

### No sprints

If discarding your sprint plan works for your team, you are already very close to eliminating sprints entirely. In this approach the team works continuously, pulling from the backlog whenever ready for a new task. The _Product Owner_ is always working slightly ahead of the developers, making sure the backlog will be ready for them. You'll find that this is similar to the stripped-down [Kanban Method](https://en.wikipedia.org/wiki/Kanban).

Of course, even with no sprints, with [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery) in place, you might still find that demos and retrospectives will happen roughly on the same schedule as before.

### No meetings

Something about regularly-scheduled meetings breeds apathy. It's fair, of course, because that standard slot makes attendees feel that they have no power over whether it happens. One easy step might be to say to your team: "if we get X done, meeting Y doesn't have to happen!" It will force you and the team to understand the purpose of the meeting.

Meetings are especially painful for developers, whose coding flow is broken by any interruption. The frustration they feel starts there, and when they perceive that their value added or received at the meeting is low, they'll question its very existence. Try waiting for the team to request a meeting. You'll figure out what the right cadence should be.

When I was a [project manager for the Visual Studio Languages team](http://scottnonnenberg.com/work/#microsoft-2003-q-3-to-2010-q-3), I built a weekly status system with email templates that worked really well. We had meetings every Friday morning to go over the information, but it was no longer necessary. I asked around in preparation for scaling it back, and was surprised: the team really liked the meeting. They saw it as a method of getting together once a week, getting face time with people they didn't normally work with. That's a far better purpose for a meeting!

Maybe make your one standing meeting on Friday afternoons, with cool demos, tasty snacks, and alcohol! :0)

## The Theme

You may have noticed that there's a theme behind all of this: trusting the development team. If given the tools to succeed, it will. Your developers want to do well. Listen to them!

As the [Tao Te Ching](https://en.wikipedia.org/wiki/Tao_Te_Ching) says:

> _"The world is ruled by letting things take their course. It cannot be ruled by interfering."_

Your task is to [build a system which will naturally push your developers towards success](/systems-and-incentives/#keep-the-system-in-mind). Give them a chance to get to know your customers themselves - get rid of your layers of analysts. Ensure that they know the business well, especially the causal lines between their actions and business success. Clear the path ahead of them. Eliminate anything holding them back. Encourage experimentation to settle disagreements or to break through analysis paralysis.

Now imagine a system of quick development and immediate feedback: [feature flags](https://en.wikipedia.org/wiki/Feature_toggle) to allow features under active development to go to production, [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery) automatically pushing every merged [pull request](https://help.github.com/articles/using-pull-requests/) to production, and near-immediate direct customer feedback after every deploy. Your developers are working in a quick feedback loop with customers, understanding better and better what features and behaviors are valuable.

You can start to see how the software would naturally get good, really fast.

## What's best for your team?

All we have are intuitions, built up from experience over the years. But your experience may be limited, and this kind of stuff is frequently unintuitive. Try things out, see what happens! And above all, listen to your teams. If they have a recommendation, try it out! Adapt!

As *The Agile Manifesto* says, we value:

> _"**Responding to change** over following a plan"_

---

_A little bit more:_

Does that customer-focused iterative development seem unrealistic to you? I'll be first to admit that true agility requires some key technical tools and practices. Check out my next Agile post: [The technology side of _Agile_](/the-technology-side-of-agile/).

You might be wondering why I'm so interested in this. I have a unique perspective. I've spent [a lot of time in a number of software development roles](https://scottnonnenberg.com/work/):

- [as a _developer_](/contract-new-techniques-old-technology/), working within these systems
- [as a _project manager_](/12-things-i-learned-from-microsoft/), designing these systems
- [as a _consultant_](/contract-an-unusual-skillset/), working with both developers and project managers to tune these systems


