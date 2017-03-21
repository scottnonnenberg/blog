---
title: "Think in alternatives (Dev productivity tip #5)"
date: 2017-03-21T20:07:25.090Z
layout: post
path: /think-in-alternatives-dev-productivity-tip-5/
next:
previous: /getting-started-with-elixir/
tags:
  - dev-productivity
  - software
---

I've been [told that I'm a very productive developer](https://scottnonnenberg.com/work/#scott-is-a-meticulous-thinker-and-he-produces-cod). And I'm sharing how I do it. Welcome to the fifth in [my developer productivity tips series](/tags/dev-productivity/): **Think in alternatives.**

Your solution works, yes. Did you consider any other alternatives? Do you have a good reason for choosing your solution over those alternatives?

<div class='fold'></div>

## The one true way

*How many times have you been talking with others about a technical solution and have heard "it's the only way" or "it's the right way" used as a justification? If not, you're one of the lucky ones. If you have, did it win the argument? Why do you think that is?*

I was first exposed to this kind of thinking in the late 90s on [slashdot.org](https://slashdot.org/). Mac vs. Windows was an ongoing religious war. There would be fiery, long-winded arguments, and the occasional random "Linux is the best!" comment. I'd spend time reading, imagining that I was objectively gathering all of the best arguments and I'd eventually come up with the 'right' answer.

That way of thinking followed me through school and even into my career in software. But it's not right.

It's wrong to think as if there is a single, objective right answer. Sure, in a very narrow space with a whole lot of very specific context and qualification, it might apply. Even `1+1` has more than one answer, based on the [radix](https://en.wikipedia.org/wiki/Radix) chosen: in base 2 the answer is 10, and in base 10 the answer is 2!

Once human behavior is brought into the equation, the options become infinite.

## Multiple correct solutions?

My first experience with the truth of infinite alternatives came in the form of my first programming class at Cal Poly, SLO. We were to turn in our assignments to a 'robot' which would run a battery of secret tests against it. If a submission failed you'd either get a plain 'failed' response or a cryptic set of test names, nothing more.

I struck up a rivalrous friendship with a few others in the class, and we'd compete to get the assignment done first. When we were all done, we'd sit back and hang out together. In that dorm room idleness, a friend had a compelling thought: "I wonder how different our implementations are?"

It was quite an idea. We had all passed what we imagined to be a large battery of tests which had been built up over the years. Given that highly rigorous constraint, how similar were our implementations? Since we were a bit afraid of sharing our code with each other, the first test was to write some new, larger tests to see if our applications continued to match output. Our first surprise was when our algorithms didn't quite match at large scale. Was one of us wrong? Maybe, but we definitely all solved the problem at hand.

Later, as the class wound down, we finally shared our code. It was very, very different. In fact, it was so different that it was a pain to try to understand the other implementations. I didn't fully dig in, aside from that initial feeling: "this is so foreign!"

## A classic continuum

Okay, so there are many, many solutions to any given problem. What's the right way to think about that? We don't have much practice, since this kind of attitude isn't easy to teach: complete freedom in an assignment doesn't guarantee that the target concept is exercised, and it makes grading a whole lot harder.

So, this is a skill we have to build up for ourselves.

A useful tool to help in generating alternatives is that of an axis. A continuum with an infinite number of options along it, with two interrelated concepts at each end.

The most classic of these is that of *memory usage vs. [CPU](https://en.wikipedia.org/wiki/Central_processing_unit) time*. A given solution to a problem uses a certain amount of memory, and a certain number of processor instructions working with that data. These two concepts are on one continuum because you generally have to trade one for the other.

Sorting is a perfect example here. Most people immediately go to [Quicksort](https://en.wikipedia.org/wiki/Sorting_algorithm#Quicksort) as the 'right' solution. But [Heapsort](https://en.wikipedia.org/wiki/Sorting_algorithm#Heapsort) is guaranteed to take a maximum of [`O(n log n)`](https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/) time at the cost of `O(n)` memory usage, where Quicksort uses `O(log n)` memory usage for `O(n log n)` time in the average case, with possible `O(n^2)` worst cases.

So, with Heapsort, you get better CPU time characteristics at the cost of more memory usage.

It's all about the tradeoffs.

## A few more axes

*Memory usage vs. CPU time* is just one of the axes we can use to think about potential [sorting algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm). We could consider other traits:

* Does it maintain the original ordering of same-value entries?
* Is it parallelizable across multiple threads/cores/machines?
* Is there an algorithm well-tuned for your predictable set of inputs?
* For embedded or other limited environments, you might consider the number of comparisons or writes to memory.

That's a lot - and it's very specific to sorting algorithms.

What about some other axes that might be interesting to software in general? Here's a small list. Think about the code you've been working on lately - what would it look like at each extreme of these axes? What would it look like in the middle?

* **Implement yourself vs. Off-the-shelf component** - It's easy to think of off-the-shelf components as cost-free in the open-source world, but it's not so simple. One thing is for sure - writing it yourself is very costly.
* **Minimal code vs. Readable code** - It makes the function longer when you break up a complex expression into a number of explaining variables.
* **Terse vs. Long variable/function/module names** - Similarly, a function will get visually bigger, and probably broken over more lines if long variable names are used.
* **Documentation vs. Self-explanatory code** - Some believe that you can name everything in a function perfectly such that no documentation is required. Others don't.
* **Stateful vs. Stateless** - Do you need to keep state over time to accomplish your goals? If so, where should that state be stored?
* **Unit testing vs. End-to-end testing** - Does it makes sense to unit test this code? Or perhaps just integration tests for this part? Both?
* **Object-Oriented Design vs. Functional Design** - Can the solution be built up from simple functions, or does it require functions and data to be mixed in 'objects?'
* **Declarative vs. Imperative** - Can you achieve your goals by stating them like in SQL? Or do you have to specify every step manually?
* **Static typing vs. Dynamic typing** - Does it help to declare all of your types up front? Or perhaps it's better to discover them as you learn more about the problem domain?
* **Security vs. Ease of use** - Do you need two-factor authentication? Or perhaps you don't even need users to log in?
* **Simplicity vs. Performance** - Occasionally certain optimizations are required to get the absolute best performance, and the code loses its clarity and simplicity.
* **Hardcoded vs. Customizable** - What if that number was right in the source file? Pulled from configuration files? A user-configurable option?
* **You aren't going to need it (YAGNI) vs. Extensible** - Do you need an interface for that, if there's only one thing implementing it? Or do you want to be ready for the second?
* **Don't Repeat Yourself (DRY) vs. Code locality** - If you have one place for everything, then it might be a bit tough to understand what anything is doing. You could repeat code to make a given section of the app easier to reason about.

But wait a second. Are these really in just two dimensions? Is it always either/or?

## Breaking out of the box

Let's consider _Don't Repeat Yourself (DRY) vs. Code locality_: Having all the code for a given scenario in one place makes it easier to understand - no trips across the codebase, into some sort of `utilities` directory, to figure out what's going on. But, if you need to make one change to one common workflow across the entire app, you do want all code related to it in one place. You might forget to change one of the copies otherwise.

So how do we balance this? We need a way to get the benefits of both.

One answer is **documentation**. You don't need to make a trip across the codebase and read the code if the documentation is readily available, trustworthy, and comprehensive.

None of these axes are truly as restrictive as they may suggest. _Object-Oriented Design vs. Functional Design_ is only listed as a single axis because they are the two most common programming paradigms today. [There are others](https://en.wikipedia.org/wiki/Programming_paradigm).

Some of the axes are like a smooth slider, from one to the other. Others are like a switch in a couple positions. Others are just waiting to be transformed into a different type of control, with the application of your innovative new perspective. Can you break out of the box with your creative solution?

## Really? More productive?

Programming is not easy, especially in high-pressure environments. The temptation is to use the first working solution that comes to mind. If the problem is very complex, this first solution can take long enough that you feel that you have no other choice. You think to yourself: "Any more time spent would be wasted!"

Absolutely not true! You know what's wasteful? Writing code and tests, preparing a pull request, passing continuous integration, including others in code reviews, then needing to do it all over again because someone else spent the time to sit down and think about the problem, and so came up with a better solution.

You can avoid that by considering alternatives to the best of your ability, and including discussion of them in your pull request summary, or mentioning them during the code review. If there are yet more alternatives you haven't considered, it's a time for others to help you grow. If not, you can expand others' minds while also keeping the conversation focused on your solution.

## It's all tradeoffs

Think about every solution, every decision, as a collection of smaller decisions made across a collection of different types of controls, like a [sound mixing board](https://www.google.com/search?tbm=isch&q=sound+mixing+board). Consider different positions for those controls, and be ready to have a discussion about every one of them.

This way of thinking is about more than just your code. You'll notice a whole lot less high emotion during discussions if you and your team consider everything as a collection of tradeoffs. Now you have a vocabulary to talk about individual or team/organization preferences, and how that should affect your solutions.

Think in alternatives. And always be on the lookout for ways to break out the box, to find a better alternative entirely!

