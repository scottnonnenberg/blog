---
rank: 19
title: "Be a scientist (Dev productivity tip #3)"
date: 2016-11-29T20:38:21.622Z
path: /be-a-scientist-dev-productivity-tip-3/
tags:
  - dev-productivity
  - software
---

I've been [told that I'm a very productive developer](https://scottnonnenberg.com/work/#scotts-value-add-is-beyond-mere-lines-of-code-h). And it's not magic! Welcome to number three of  [my developer productivity tips](/tags/dev-productivity/): **Be a scientist**.

Scientists are curious, always learning, creative, and they know that they don't know everything. Let's talk about how you can be more like a scientist in your software development.

<div class='fold'></div>

## The Scientific Method

Let's first take a quick look at [The Scientific Method](https://en.wikipedia.org/wiki/Scientific_method). It's the engine at the core of science, so familiar from high school classes, but [painstakingly formed over hundreds of years](https://en.wikipedia.org/wiki/History_of_scientific_method#Ibn_al-Haytham):

> 1. Define a question
> 2. Gather information and resources
> 3. Form an explanatory hypothesis
> 4. Test the hypothesis by performing an experiment and collecting data in a reproducible manner
> 5. Analyze the data
> 6. Interpret the data and draw conclusions that serve as a starting point for new hypothesis
> 7. Publish results
> 8. Retest (frequently done by other scientists)

Doesn't that look familiar? That looks a lot like how I debug problems in an application!

When tracking down the cause of a bug (_Step 1_), I first gather some initial data (_Step 2_) then develop a theory as to what the problem could be (_Step 3_). From there it's a loop, new information results in new theories and new validations (_Step 4-6_, then back to _Step 3_). When I have a solution, I [submit a pull request](https://help.github.com/articles/about-pull-requests/), publishing my results to others (_Step 7_) so they can try it out for themselves (_Step 8_).

So if we have that much in common with scientists, what else can we learn from them?

## Rigor

I had a science professor in college who really drove home the need for rigor in the laboratory. We were to keep meticulous track of every action: experiment steps, measurements captured, and any pertinent thoughts. Our lab notebooks were graded just like the final experiment results.

Since August 2013 I've been using [a lab notebook-style setup](/a-system-for-2015/). I always have an editor window open to a kind of daily scratchpad where I keep track of anything interesting. It's especially useful for keeping track of where I found solutions online, or the set of things I've tried and discarded in a particularly deep investigation. Or, better, the set of things I'm about to try during an investigation. A little brainstorming and prioritization goes a long way!

You can try it for yourself! I released the shell and Node.js scripts I use for this to [my `thoughts-system` repo on GitHub](https://github.com/scottnonnenberg/thoughts-system).

It goes far deeper than the lab notebook. The notebook is just a tool to help track the rigor itself. A scientist must control experiment variables very closely, or the results will be useless!

Here are a few examples of ways I apply rigor to my coding:

* When I write a test, I flip product code or test code back and forth to ensure that the test will fail without the code I just wrote.
* Before I make a commit in git, I do a final review of all of my code changes. I want to be sure that I really mean to make that set of changes. I like [GitX](https://rowanj.github.io/gitx/) for this - not flashy and not new, but it does its very simple job.
* When I'm about to submit a pull request, I'll again review the code. As I read, I capture the key components of the change for the pull request summary. I want reviewers to understand what I was trying to do, and that's a lot harder to determine with just the code.
* When I'm tracking down a particularly tricky bug, I pay very close attention to how much change I've applied. The more changes I make to the code, the more I feel pressure to capture it in a commit or revert back to a known state with just my learnings.

The point is that we have some really great tools to help us systematically poke and prod the code. Logging and log files, test suites, source control, dependency and OS versions, even techniques for throttling network speeds and latency.

We have the tools to put our software on a well-lit microscope slide to figure out what's happening!

## Creativity

Creativity is a largely-unacknowledged skill in science. We praise scientists for their discoveries and experimental results. But how do they come up with that all-important hypothesis which will form the core of their next groundbreaking experiment? Creativity!

That creativity is even more important in software development, as we iterate in the small scale to implement features and fix bugs. We flip from Step 6 to Step 3 many times in the span of an hour. Hopefully. :0)

On a recent contract I was implementing some tests in [PhantomJS](http://phantomjs.org/)/[Selenium](http://docs.seleniumhq.org/), and it kind of looked like the tests were passing. But this was a server-rendered [React](https://facebook.github.io/react/)/[Node.js](https://nodejs.org/) application which had never been tested with PhantomJS before. And I could tell that the Javascript wasn't working as expected - when I told PhantomJS to click a link, the server would log another page view. So the [single-page application](https://en.wikipedia.org/wiki/Single-page_application) wasn't intercepting clicks. Maybe it wasn't booting up at all!

But I had no errors on the PhantomJS console!

What next? I had to use what I knew about the app and about the application and PhantomJS, then apply some creativity in placing `try`/`catch`/`console.log()` statements. After a couple tries I finally had an error to work with.

Now I was in familiar territory. Moving from one error to the next. A series of creativity-generated hypotheses, and I was on to the next error. Eventually everything was in good shape and I had learned a lot: We needed to install our [Symbol polyfill](https://github.com/medikoo/es6-symbol) earlier. And exceptions thrown during the initial run of code loaded with [Webpack](https://webpack.github.io/)'s `require.ensure()` (for code splitting) never hit the browser console.

Creativity is the fairy dust to supercharge that rigorous hypothesis-test-analyze loop!

It's even important if the goal isn't fixing a tough bug, simply staying productive in the face of inaccessible wireless or development servers.

## Curiosity

Scientists are driven by a deep need to understand the world, why it is how it is, and how exactly it works. It wasn't enough for them to get a good grade in their science classes, or read books describing how others explored the intricacies of the world. They needed to do it for themselves.

We, as developers, need to have that same hunger. How exactly does the system work?

You're answering this question for yourself all the time when you try out a new API. The learning process is augmented by that same hypothesis-test-analyze loop as before, but in this case this is knowledge that will be used later to create something of value. Or help you track down a bug.

I'm initially a bit frustrated when I find out that my code has a bug in it. But the very next thought is "how could that happen?" I may have made a simple mistake, but there's likely also something wrong with my model of how the system works, the assumptions I have about the system or how it is used.

And this is the key. As developers, we need to be hyper-aware of anything that violates those assumptions. Follow your nose if things don't make sense, if your mental model no longer matches reality. Pursue things that smell fishy until you understand. You might just find bugs or uncover big misunderstandings. If not, you'll be better prepared for the future.

## Humility

The life of a scientist is tough. Most of the time a multi-month or -year experiment returns negative results: the hypothesis was wrong. Yes, some good data was collected. Yes we learned something. But that's it. No big discovery. No accolades. It's just part of the job. On to the next experiment.

As software developers, we write code with bugs. Or worse, we make the wrong assumptions when designing an entire system. There's unplanned downtime, and business is lost.

We make mistakes. It's just part of the job. Good data was collected. [It's an opportunity to learn](http://www.bbc.com/news/health-35929557).

[Be kind to others and yourself](https://briangilham.com/blog/2016/10/10/be-kind), and continue on with the job.

## Ah, what a fine day... for programming!

We don't [wear lab coats](https://www.youtube.com/watch?v=6gpBvMdrQDc) or work with [beakers](https://youtu.be/yQj2NP25TIo?t=53s) and dangerous chemicals. But we do have a lot in common with scientists.

See if it helps to imagine yourself as a scientist. Try out a lab notebook of some kind. Stay alert for things that don't smell right, always maintaining that mental model of the system. Be creative in your problem solving, but know that you'll make mistakes.

You'll be a whole lot more productive!


