---
rank: 9
title: The Why of Agile
date: 2016-01-12T17:47:36.000Z
layout: post
path: /the-why-of-agile/
next: /enterprise-node-jsjavascript-difficulties/
previous: /the-trouble-with-promises/
tags:
  - business
  - software
  - books
---

I had a nickname in my family when I was very young: "Bu’why." I got it because I would ask 'but why?' so very often of the people around me. Most of the time they’d attempt to answer, but their frustration became apparent in the nickname.

To this day, I’m still interested in the 'why' behind things. I’ve read a [whole book on traffic patterns](http://www.amazon.com/gp/product/B001BAGWQE/ref=dp-kindle-redirect?ie=UTF8&btkr=1) because I needed to know the deep 'why' behind traffic jams. I’ve read a [whole book on sleep](http://www.amazon.com/gp/product/B008XOG2N4?redirect=true&ref_=kinw_myk_ro_title) to try to get better rest. I believe the 'why' is very important.

<div class='fold'></div>

## Best Practices

> "Commercial or professional procedures that are accepted or prescribed as being correct or most effective" ([Wikipedia](https://en.wikipedia.org/wiki/Best_practice))

Sadly, most people don’t want the ‘why,’ they just want the ‘what.’ They’re busy! They want an off-the-shelf solution that fixes their problems: Diets, software modules, workout plans, software development methodologies, all with big promises about what you’ll get if you just stick to the plan.

"That last system we tried was a failure due to intrinsic problems with the system itself. This new system is better. This time it’s gonna be perfect!" This is Holy Grail thinking. Maybe things won’t go too badly with the new system, but the expectations are unrealistically high. Nobody’s any happier. There’s no real improvement. Why is that?

## Software Development is Complex

I first became aware of [The Cynefin Framework](https://en.wikipedia.org/wiki/Cynefin_Framework) in 2012 when I was on a contract at the [Nordstrom Innovation Lab](http://www.startuplessonslearned.com/2011/10/case-study-nordstrom-innovation-lab.html). It looks at the complexity of a given system to determine what kind of approaches can be used within that system. It breaks systems into [four categories, usually presented in a grid](https://commons.wikimedia.org/wiki/File:Cynefin_as_of_1st_June_2014.png):

* **Obvious**
  * The system has well-known, simple relationships
  * *Examples*: Stacking Shelves, Mowing a Lawn
  * *Approach*: Determine category, apply appropriate ruleset
* **Complicated**
  * With enough analysis, cause and effect can be predicted
  * *Examples:* Skyscrapers, X-Ray Machines
  * *Approach*: Analyze situation beforehand, determine techniques
* **Complex**
  * Cause and effect only seen in retrospect, and do not repeat.
  * *Examples:* Stock Market, Weather
  * *Approach:* Probe problem domain, adapt techniques
* **Chaotic**
  * Cause and effect not perceivable
  * *Examples:* Natural disasters and other emergency situations
  * *Approach:* Act and adapt

You’ll notice that the more difficult a system is to predict, the greater the need for adaptation over time. This makes sense; a complex system like the Stock Market will immediately respond to any attempt to establish a rigid set of rules for dealing with stocks, rendering those rules useless. Success in that domain requires constant learning and adaptation.

The question is: where is Software Development in that continuum? Some might claim that it’s just an engineering problem, so it’s like designing and building a skyscraper. Others, burned in their years developing software, might claim that it is completely unpredictable like one long natural disaster.

I’d argue that it sometimes Complicated, and sometimes Chaotic. But most of the time, it’s Complex.

## Dealing with the Complex

Cynefin tells us that no set of best practices can tell us how to act in a given Complex system. It does say that some initial heuristics can be useful, but our focus should be on probing the problem domain and adapting our approach over time.

This sounds familiar, doesn’t it? Every time a development team takes on a new type of functionality for a given project, uncertainty goes up. The only way to know if a given solution is going to work at all is to explore a bit. And that’s just the software system under development. There are five other complex systems at play:

* The development team
* The larger organization
* The current production application
* The users of the production application
* The business environment

Any one of these systems could easily cause problems for a tightly planned development project. An unexpected set of business-impacting production bugs. An unexpected sickness in the dev team. The business environment suddenly demands a change in direction.

This is the Why of [Agile](http://agilemethodology.org/). Agile helps a development team deal with all of these things, establishing a framework for adaptation over time. Agile is about giving a team the tools to become the best, most productive team it can be.

## The Why of Agile Practices

Let’s talk about some of the specific ‘ceremonies’ and why they exist. We need to break out of the ‘must’ or ‘should’ mindset. We don’t do these things because they are required, we do them to get something out of them. If we’re not getting that anymore, then we can make a change.

* **Sprints -** Human capacity to plan is small. If things go wrong, they don’t go too wrong. Also limits the impact of external forces by mostly locking scope down at beginning.
* **Rigorous definition of "done"** - Avoids [‘technical debt’](https://en.wikipedia.org/wiki/Technical_debt) by ensuring that when a task is considered complete, nothing is left over.
* **Story points not hours** - Ensures that estimation is a tool solely for getting to planning and execution consistency within a team over time. Prevents managers from saying "dev team isn’t at capacity," or attempts to game the system.
* **Spikes** - This is literally ‘probing the problem domain’ from the Cynefin Complex domain to increase certainty and enable planning.
* **Sprint Demos** - Developers proudly showing off what they’ve done with live demos. Celebrating and getting excited about what they’ll be able to do next sprint.
* **Retrospectives** - This the core adaptation engine of Agile. If you were to do just one thing, do this. But you must address the impediments and other issues raised here.
* **Backlog grooming** - Once the sprint starts, there shouldn’t be a huge amount of back-and-forth between the business folks and developers. These meetings are primarily about the business preparing the tasks for the sprint, developers occasionally included.
* **Sprint planning** - This meeting is primarily about developers estimating tasks and planning the sprint. Business folks should be there for any final clarifying questions about the tasks.

Now it makes a little more sense why agile coaches say things like "early in your adoption of Agile, your estimates will be off." It’s all about gradual adaptation and improvement. Estimates get better, impediments are removed, and the team gradually pays down whatever technical debt it had before.

## Feedback Loops

> "The section of a control system that allows for feedback and self-correction and that adjusts its operation according to differences between the actual and the desired or optimal output." ([American Heritage® Dictionary](http://www.thefreedictionary.com/feedback+loop))

Agile can create a feedback loop which leads you towards your ultimate goal. Each step is a small win, leading to feeling good, leading to more wins. It’s like a Thermostat, except you don’t quite know what the target temperature is yet. It turns out that feedback loops are also the 'why' behind [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) and [Lean Startup](http://theleanstartup.com/).

The question for you: How might you tune your software development feedback loops to enable your teams to be the best they can be?
