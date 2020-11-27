---
title: 'Understand the problem (Dev productivity tip #1)'
date: 2016-09-13T17:15:51.682Z
path: /understand-the-problem-dev-productivity-tip-1/
tags:
  - dev-productivity
  - feedback-loop
  - software
---

I've been [told that I'm a very productive developer](https://scottnonnenberg.com/work/#scotts-value-add-is-beyond-mere-lines-of-code-h). How do I do it? You're about to find out! Welcome to the first of [my developer productivity tips](/tags/dev-productivity/): **Understand the Problem**.

Tutorials and bootcamps are all about book knowledge. For maximum coding productivity, you need deep knowledge of exactly what needs to be built and why!

<div class='fold'></div>

## Learning the tools

Think back to some of your first language classes, back when you were young. You focused on vocabulary, grammar and sentence structure. And there was nothing creative about it. You analyzed and memorized, playing with toy scenarios. The point was to get comfortable with the tools themselves. The content didn't matter.

Online tutorials, college classes, even multi-month tech bootcamps - all of these are still playing with toy scenarios. Small projects, usually done individually and for a short time. It makes sense, because the focus of learning is the tools. The process is the same as with learning English or Spanish, but the tools themselves are different: algorithms, libraries and language a computer understands.

## Using the tools

Outside of school, think about your use of language. Writing messages to friends, writing posts for social media, writing blog posts, or even writing a novel or work of nonfiction. Do you think about language or grammar? Very infrequently, compared to the topic at hand! The language itself is secondary. Language is a tool to communicate ideas.

Algorithms, libraries and programming languages are tools to create programs, servers and web pages, yes. But the the specific tool choices are not important. What is important is that the end result supports an individual or organizational goal.

As programmers, our expertise is in the technology itself. But to be truly productive, we need to deeply understand the larger context.

## The problem domain

Have you ever worked with a _[product owner](https://www.mountaingoatsoftware.com/agile/scrum/product-owner)_? Or, at Microsoft, a _Program Manager_? At Amazon, a _Technical Program Manager_? Have you worked with a software specification? Have you implemented code to match mockups?

A specification or mockup is a limited attempt build a mapping between organizational need and detailed software requirements. A _product owner_ is a step better, a living attempt to map between priorities and specific behaviors. Each of these attempts to define the _[problem domain](https://en.wikipedia.org/wiki/Problem\_domain)_ for the project.

How does this relate to my productivity? Even with a high-quality, detailed, and recent spec, I encounter surprises as I write code, situations the spec didn't cover. The same is true even for a generally-available friendly neighborhood _product owner_ - if our conversations are limited to features, later I'll encounter decision points not previously discussed.

And this interrupts my flow. When I have a question, I need to seek out busy people and wait for their response before I can move forward.

I avoid this by asking a whole lot of questions before I write any code. Far beyond what might be useful immediately. I consider it my job to know at least as much about the _problem domain_ as a _product owner_. I need to be able to predict the decisions they'd make, since neither the spec nor our conversations can ever be comprehensive.

## Doing the research

If you were writing a biography, you'd spend a huge amount of time on research. You'd do everything you could to build a full picture of your subject's life. Let's similarly be deliberate in building understanding of the _problem domain_. After all, we're writing software real people will use!

Here are some techniques I've found useful:

### 1. Dig for the larger context

[Five Whys](https://en.wikipedia.org/wiki/5_Whys) is a good place to start for _understanding the business_. The key is to draw lines between the software and organizational goals. What makes the company or software unique in the market? What evidence do you have for the answers to that question? Don't be afraid to ask the hard questions!

_Understanding your customers_ is a little bit harder. You may have many different classes of users, or they might not be nearby. If you can, talk directly with them, in person, to [determine _what_ it is that they really like](/from-tech-person-to-people-person/#3-verify) about the software, and _why_. If you can't get direct access, analytics is your best bet for the _what_. Where do your users spend their time and money?

Pay attention to how these two spaces interact. Where do they match up? Where do they conflict? One classic conflict is advertising: users complain about ads, but that's how the business makes money!

### 2. Build and use mental models

Have you ever sat down to write code after a requirements conversation, and immediately have questions for your _product owner_? I've definitely found situations where clarity upon leaving a requirements discussion hasn't survived the switch to my more rigorous programming mode.

But I have also found that you can short-circuit this process with mental models.

While talking about feature requirements with a _product owner_, start designing solutions in your head. At the beginning these won't be very detailed, but you'll get better. Eventually you'll be able to catch possible bugs and interesting corner cases at this stage, surfacing tradeoffs back to your business owner real-time. You build a very tight [feedback loop](/the-why-of-agile/#feedback-loops) this way. It's also a great opportunity to stitch together the high and low level. You can match primary scenarios up against corner cases to better get a feel for priorities.

You can almost think of this as an early test process. You'll improve your understanding of both the business side and the technology side.

### 3. Confront risk head-on

Some tech solutions don't come easily as you build your mental models. It's something your team hasn't done before, or something you don't feel confident about. Or, when you dig for the larger business context you don't reach clarity - you find that no one in the organization is really sure about the right approach.

When you encounter one of these, it's time to break through the fear. You need information, and you won't get it by worrying!

Design tests to get the information you need. A [spike](http://agiledictionary.com/209/spike/) to write some proof of concept code. Test with a minimal prototype or [concierge MVP](http://ibuildmvps.com/blog/the-concierge-minimum-viable-product-maximizes-customer-learning) in front of real users. You can be scientific here: have a theory and test it out! Validate that intuition you developed talking to your users!

Develop a sixth sense for these kind of risks. It pays to explicitly seek them out so you can start your testing sooner rather than later. It may take a while to get an answer!

## Clarity of thought

> _"Whenever there's something wrong with your writing, suspect that there's something wrong with your thinking." - [Patricia T. O'Conner](https://www.goodreads.com/author/quotes/63015.Patricia_T_O_Conner)_

I can tell when I don't have an adequately specific goal in mind for a bit of programming - the tests are really hard to write. I have to start asking questions or doing research. When the tests flow out of me, I know enough to write code confidently.

Ask questions until you're satisfied, even if you annoy people! You'll be more productive, and everyone involved will have a better understanding.
