---
rank: 8
title: Getting started with Elixir
date: 2017-03-07T18:01:14.466Z
path: /getting-started-with-elixir/
tags:
  - elixir
  - functional
  - software
---

The more time I spend with [JavaScript](/tags/javascript/), the more brushes I have with the [dangerous cliffs of Node.js](/the-dangerous-cliffs-of-node-js/), and the more I gravitate toward [functional design](/a-functional-distinction/) principles. Thus, I periodically find myself looking at functional languages. This is the deepest I've gone so far - with [Elixir](http://elixir-lang.org/). I'm excited!

<div class='fold'></div>

## What is it?

Elixir is a [Ruby](https://www.ruby-lang.org/)-like language built on the [Erlang/OTP](https://github.com/erlang/otp), which is known for high availability and fault-tolerance. Initially created in 1986 at Ericsson (hence the Er-), [Erlang](https://www.erlang.org/) and the [Open Telecom Platform](https://en.wikipedia.org/wiki/Open_Telecom_Platform) were primarily used for telephone switches. They were open-sourced in 1998. [Joe Armstrong](https://twitter.com/joeerl), creator of Erlang, talks about reliability [in his 2003 thesis about the creation of Erlang](http://erlang.org/download/armstrong_thesis_2003.pdf):

> _"At the time of writing the largest of these projects is a major Ericsson product, having over a million lines of Erlang code. This product (the AXD301) is thought to be one of the most reliable products ever made by Ericsson"_

> _"Switching systems should run with an acceptable level of service even in the presence of errors. Telephone exchanges are expected to be extremely reliable. Typically having less than two hours of down-time in 40 years."_

Elixir was developed by [José Valim](https://twitter.com/josevalim) at [Plataformatec](http://plataformatec.com.br/), first released in 2011. As a modern language, it has [quite a pedigree, according to Joe Armstrong himself](https://joearms.github.io/published/2013-05-31-a-week-with-elixir.html):

> _"Erlang's syntax derived from [Prolog](https://en.wikipedia.org/wiki/Prolog) and was heavily influenced by [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk), [CSP](https://en.wikipedia.org/wiki/Communicating\_sequential\_processes) and the [functional programming](https://en.wikipedia.org/wiki/Functional_programming). Elixir is heavily influenced by Erlang and [Ruby](https://www.ruby-lang.org/). From Erlang it brings pattern matching, higher order functions and the entire process and error handling "let it crash" philosophy. From Ruby it brings sigils, and shortcut syntaxes. It also adds a few goodies of its own, the `|>`  pipe operator, reminiscent of Prolog's [DCGs](https://en.wikipedia.org/wiki/Definite_clause_grammar) and [Haskell](https://www.haskell.org/) monads (though less complicated, more like the good old unix pipe operator) and the macro quote and unquote operators, which come from the lisp quasiquote and comma operators."_

It's a new language built on top of some very good ideas.

## My road to Elixir

In 2014 I first encountered this eye-opening article: [Object-Oriented Programming is an expensive disaster which must end](http://www.smashcompany.com/technology/object-oriented-programming-is-an-expensive-disaster-which-must-end). I was originally taught [Object-Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming) principles in my first college programming class via C++, and largely stayed in that tradition thereafter, with Java, then C#/.NET, then Ruby. So I was surprised to discover that you didn't need to mix methods and data together in classical "objects" to get all of the claimed benefits of object-oriented design, like [Inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)), [Encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)), and [Polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)). I got very excited by the conclusion of the article:

> _"Functional languages such as Haskell, Erlang and [Clojure](https://clojure.org/) offer powerful approaches to the problems that software developers have always faced. All of the so-called strengths of OOP can be found in these languages. If you are a fan of strict data-typing, then use Haskell. If you are a fan of the Actor model, use Erlang. If you'd like to work in a flexible, dynamic language where Immutable is the default, use Clojure."_

Especially when paired with some of the previous discussion of Erlang, like this:

> _"Erlang is a work of genius and I feel some frustration that it does not get more attention"_

But I took a look, and Erlang wasn't a language I wanted to work in. I didn't like that [a word in your code was a variable if it started with an uppercase character, an Atom otherwise](http://erlang.org/doc/getting_started/seq_prog.html#id62442). And ["Erlang does not have a string data type."](http://erlang.org/doc/getting_started/seq_prog.html#id64399) On top of all that, its site looked like it hadn't been updated in 10 years.

A couple months later, I worked my way through [University of Washington's CSE 341 Programming Languages class](http://courses.cs.washington.edu/courses/cse341/13wi/), learning all about [ML](https://en.wikipedia.org/wiki/ML_(programming_language)). It was pretty inspiring, all that type inference and functional purity! As part of that push, I looked into [OCaml](https://en.wikipedia.org/wiki/OCaml) and the [Js_of_ocaml project](https://ocsigen.org/js_of_ocaml/) a little bit. But I still couldn't see myself writing much code with it.

Another couple months later I took a look at [ClojureScript](https://github.com/clojure/clojurescript) and [Om](https://github.com/omcljs/om), and was impressed, but ultimately didn't like the required conversions back and forth between JavaScript native objects and ClojureScript data types. [Especially when the object came from a custom constructor](http://stackoverflow.com/questions/32467299/clojurescript-convert-arbitrary-javascript-object-to-clojure-script-map/32583549#32583549)!

Finally, this past fall I heard about Elixir from a couple different places, including the 'Trial' zone of the [ThoughtWorks Technology/Tool Radar](https://www.thoughtworks.com/radar/languages-and-frameworks). So I took a look, and was surprised see that it was built on top of Erlang/OTP, the runtime I had been so impressed with years previous. I paged through its very user-friendly tutorial for a little bit, and was pleasantly surprised by its [proper unicode support](http://elixir-lang.org/getting-started/binaries-strings-and-char-lists.html#utf-8-and-unicode), uncommon in [most mainstream languages](https://mathiasbynens.be/notes/javascript-unicode).

It was officially on the list to learn.

## First take: Phoenix

I generally pursue the fastest road to productivity, so not long later I went directly to a full-featured framework. [Phoenix](http://www.phoenixframework.org/) fits the bill, in an attempt to bring [Rails](http://rubyonrails.org/)-like productivity to the world of Elixir. I [installed it](http://www.phoenixframework.org/docs/installation) and went through [the from-scratch getting started tutorial](http://www.phoenixframework.org/docs/up-and-running).

I was impressed. It was very fast and user-friendly, with really nice error message pages. It felt very comfortable!

But I was just typing things I didn't fully understand. This was really cool stuff. I wanted to understand it fully, really savor it.

## Day One: Elixir Basics

A couple weeks later, I had some more time to devote to it. So I went right to the [Elixir guide](http://elixir-lang.org/getting-started/introduction.html) and got started!

I kept track of both the impressive things and the things I thought were worth keeping in mind - either due to being unintuitive, or perhaps even a bit disappointing. I also kept track of questions that weren't answered immediately (or ever, in some cases) by the tutorial itself, then went back and did research later.

### Impressive

* Help in the IEx console! `h()` or `h(String)` or `h(String.match?/2)` (the '/2' specifies the `String.match` overload that takes two parameters)
* Tab-completion in the console! `String.<tab>` or `is_<tab>`
* All data is immutable, but local variables can be re-bound
* Things like `if` are macros which make them like a function that takes a condition, a true block and a false block. `do`/`end` blocks for if are syntactic convenience on top of this. `if false, do: :this, else: :that` ends up being a keyword list, like this: `if(false, [do: :this, else: :that])`
* Excellent string support. Specifically, all the standard problems listed here are fixed: http://mortoray.com/2013/11/27/the-string-type-is-broken/ ([this is a fun commit](https://github.com/elixir-lang/elixir/commit/c093e378d849baceb81b0bc7f373ccc6c8b1c141))
* Powerful pattern-matching with the '=' operator:
    * `[1, 2, third] = [1, 2, 3]` - `third` is now 3
    * `[head | tail] = [1, 2, 3]` - `head` is 1, `tail` is `[2, 3]`
    * `"he" <> rest = "hello"` - `rest` is now `"llo"`
    * `<<0, 1, x :: binary>> = <<0, 1, 2, 3>>` - `x` is now `<<2, 3>>` (need cast to treat `x` as remainder instead of the next single element)
* Guards can be used to ensure that preconditions are always met: for functions, pattern matching, etc.
* The capture operator (`&`) is required to capture a function into a variable or to pass as a parameter: https://hexdocs.pm/elixir/Kernel.SpecialForms.html#&/1
* The Enum module has all the functional list manipulation methods you would expect - `map`, `reduce`, `map_join`, `map_reduce`, `flat_map_reduce`, and so on

### Noteworthy

* `div` and `rem` are the integer division methods, vs. `/` which returns a `float`
* `:value` is an atom, not a string
* You can call methods without a parenthesis, like Ruby. In [1.4.0](https://github.com/elixir-lang/elixir/blob/v1.4/CHANGELOG.md) a [warning was added for no-parameter function calls without a parenthesis](https://github.com/elixir-lang/elixir/pull/3517).
* Single-quote strings are integer lists (`List`), and double-quote strings are real UTF8 strings (`BitString`)
* Lists (`[1, 2, 3]`) are linked-lists, with linear lookup. Tuples (`{1, 2, 3}`) are stored contiguously in memory, with faster sub-item lookup.
* "When counting the elements in a data structure, Elixir also abides by a simple rule: the function is named size if the operation is in constant time (i.e. the value is pre-calculated) or length if the operation is linear"
* Anonymous functions use single-arrow (with dash), not double-arrow (with equals sign)
* `and`/`or`/`not` accept only booleans, while `||`/`&&`/`!` accept all types
* `==` will do type coercion, like `1.0 == 1`. Triple equals does not, so `1.0 !== 1`
* `<` happily accepts all types. Precedence: "number < atom < reference < function < port < pid < tuple < map < list < bitstring"
* Variables can be re-bound in Elixir, so they can be used in pattern-matching two ways. "Use the pin operator ^ when you want to pattern match against an existing variable's value rather than rebinding the variable"
* `_` can be used as a placeholder in matches. "The variable _ is special in that it can never be read from. Trying to read from it gives an unbound variable error"
* "you cannot make function calls on the left side of a match"
* There are some limits to guard expressions: http://elixir-lang.org/getting-started/case-cond-and-if.html#expressions-in-guard-clauses
* `cond`, like else-if in other languages, looks for first result that evaluates to true. "cond considers any value besides nil and false to be true:"
* A 'binary' is a bitstring where the number of bits is divisible by 8. You can create bitstrings with any number of bits per 'entry.'
* Char lists (single-quote strings): "In practice, char lists are used mostly when interfacing with Erlang, in particular old libraries that do not accept binaries as arguments"
* Keyword lists are useful for optional parameters, but can have duplicate keys and have linear lookup. Syntax: `[a: 1, b: 2]`, equivalent to `[{:a, 1}, {:b, 2}]`, created implicitly if the last parameter provided in a function call (`call param1, a: 1, b: 2`). Accessing a certain key uses this syntax: `list[:key]` - both nonexistent key lookups and recursive nonexistent lookups will return nil instead of a crash
* Maps have constant-time lookup, are unique on key, and keys can be of any type. Syntax: `%{:a => 1, 2 => :b}` More useful in pattern matching because "map matches as long as the keys in the pattern exist in the given map." Also, "When all the keys in a map are atoms, you can use the keyword syntax for convenience: `%{a: 1, b: 2}`"
* Two techniques to get map values out: `map.key` (crashes on missing key) and `map[:key]` (returns nil on missing) - `map.key` is recommended to fail fast: http://blog.plataformatec.com.br/2014/09/writing-assertive-code-with-elixir/
* Interesting methods for deep access/modification: `put_in/2` and `update_in/2` (in `Kernel`)
* In a module (`defmodule`), you define functions with `def/2`. For private functions use `defp/2`
* Default parameter value expressions with `\\`. If function has multiple clauses, then the default values have to be in a separate, body-less clause. Like this: `def dowork(x \\ IO.puts "hello")`
* Ranges, like `1..6` are enumerable so `Enum` functions can operate on them. Sadly, `Range.range?` as a way to test for them doesn't match the rest of the `is_<type>/1` functions.

### Questions
* `File.read` seems synchronous - that doesn't seem right. Node.js has trained me to expect [a bunch of work to manage my async](http://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/)!

    * This Erlang process will stop, wait until the file IO is complete, while other Erlang processes can continue on. "On operating systems with thread support, file operations can be performed in threads of their own, allowing other Erlang processes to continue executing in parallel with the file operations." ([Erlang Docs](http://erlang.org/doc/man/file.html) via [GitHub](https://github.com/elixir-lang/elixir/blob/8cee6fc20c3f74cea77faa49ce9169d67b9a9bba/lib/elixir/lib/file.ex#L253))

## Day Two: Going deeper

The next day I continued the language tutorial with [Enumerables and Streams](http://elixir-lang.org/getting-started/enumerables-and-streams.html):

### Impressive

* "Elixir treats documentation as first-class and provides many functions to access documentation" - right inline with `@moduledoc` and `@doc` https://hexdocs.pm/elixir/writing-documentation.html
* The pipe operator turns this: `Enum.sum(Enum.filter(Enum.map(1..100_000, &(&1 * 3)), odd?))` into this: `1..100_000 |> Enum.map(&(&1 * 3)) |> Enum.filter(odd?) |> Enum.sum`. The result of the previous expression is inserted as the first parameter in the next function call.
* Streams give you lazy evaluation with the same pipe syntax. There's even `Stream.cycle` for an infinitely repeating stream!
* `Stream.unfold` is like the opposite of reduce. You need to return a tuple with result and next remaining state, like `String.next_codepoint`.
* Erlang processes are the core building block for concurrency. They are very lightweight - you can create thousands in a given OS Process with very little impact.
* `spawn` and `spawn_link` to create a new Erlang process, but direct use is unlikely. `Task.start` and `Task.start_link` for better monitoring, management by `Supervisor`. `Agent` and `GenServer` take this even further.
* Message-passing via `send` and `receive`! Adding and retrieving things from the process-specific 'mailbox.'
* `File` has a full complement of methods: `cp_r`, `mkdir_p`, `rm_rf`
* Standard set of `Path` manipulation methods as well, paths are plain strings.
* `import` can be customized, excluding or including only parts of the target module. all of the related keywords (`alias`, `require`, `use` too) can be inside of modules or even functions.
* Protocols are like interfaces - `Enumerable`, and so on
* Regular expressions (`~r/foo/i`) are implemented with sigils, a mechanism for extension of the language. Eight different delimiters can be used, depending on what characters are inside, to make things easier: `/ | " ' { [ { <`. Note that these are actually compiled, not created at runtime! :0)
* Other interesting sigils:
    * `~s` sigil for strings with double quotes in it
    * `~S` for strings with no escape characters or interpolation. Very useful for `@doc` and `@moduledoc`
* You can make custom sigils with a `sigil_n` function, where that would provide the `~n` sigil
* Type specifications: `@type` for a type to be reused, then `@spec` to describe the signature of a function (`@typep` for private type). Dialyzer, the built-in Erlang static analysis tool, uses these to analyze the code. Reminds me of [Flow](https://flowtype.org/)!
* All the Erlang standard library code is available! http://erlang.org/doc/apps/stdlib/index.html

### Noteworthy

* Terse, but maybe a bit too much so? Another use of the `&` operator in anonymous functions: `odd? = &(rem(&1, 2) != 0)` is equivalent to `odd? = fn(x) -> rem(x, 2) != 0 end`
* `?<character>` gives you the codepoint for that character
* `receive` will block until it receives something, though you can provide a timeout with after clause. `send` is not blocking.
* Methods with `!` at the end (like `File` methods) will throw if they fail, instead of returning a tuple like `{:error, :enoent}`. Use it if you don't want to handle the error case, just fail fast.
* `Path.expand()` to go from a tilde directory to a full directory
* Turns out that `File`, `IO` and `StringIO` methods actually create a separate process, and what you get back is a PID (process ID)!
* `use` is a macro that expands to pulling in external code and applying its functionality to the current module
* `@keyword` syntax is a compile-time construct specific to Elixir, but is used by all sorts of stuff - adding documentation, tagging test cases in ExUnit, and building a set of middleware to handle an incoming HTTP request with Plug
* Structs provide a compile-time guarantee that only the original fields exist in the map. There's a secret field storing the type of struct. Called 'bare' because no standard protocols, like `Enumerable`, are available on structs. You can use `Map` module methods on them though. `@enforce_keys` for required fields.
* Behaviors seems almost like a protocol, with method shapes defined via `@callback`
* Weirdness with protocols - to handle a type you don't know about, can use `Any`, then `@derive` in a module to fall back to that protocol. A more global solution is `@fallback_to_any` in the protocol itself. Generally, though, an error when there's no specific implementation is better. http://elixir-lang.org/getting-started/protocols.html
* Really common protocols: `String.Chars` (for `to_string` and interpolation), `Enumerable`, and `Inspect` (for IEx console)
* Comprehensions are extremely powerful enumeration constructs, that kind of look like for/in statements http://elixir-lang.org/getting-started/comprehensions.html. The `into` clause allows you to control exactly how all the resultant values are handled, via the `Collectable` protocol.
* `try`/`rescue`/`after` exists, but "Elixir developers rarely use the try/rescue construct". `after` seems useful, as a finally-style cleanup. Can use after without the initial try: `do`/`after`/`end`
* `throw` should be uncommon: "uncommon in practice except when interfacing with libraries that do not provide a proper API" (for finishing computation when it makes sense to)
* Erlang built-ins are available at `:erlang.trunc`, etc.
* When creating typespecs that use an Elixir string, use `String.t`
* `@callback` and `@behavior` work together to create something like interfaces, which will generate compile-time errors if not fully implemented.

### Questions

* How to get the list of things inside a directory? I don't see readdir.
    * `File.ls`
* What is the difference between Protocols, Behaviors and Callbacks?
    * Kind of a subtle difference. Seems that one is about being able supporting different types of data with a given algorithm/intent, and the other is more about contracts and modularization: "Protocols handle polymorphism at the data/type level whereas Behaviours provide it at the module level" https://www.djm.org.uk/posts/elixir-behaviours-vs-protocols-what-is-the-difference/
    * Callbacks are a component of a Behavior, defining a part of its API surface area.
* Now that I know more about Elixir, what are the differences between it and Erlang?
    * Useful article: http://elixir-lang.org/crash-course.html#notable-differences
    * Erlang's end-of-statement character is a period
    * Erlang doesn't allow redefinition of a variable
    * Variables need to start in uppercase, or they are an Atom: `im_an_atom`, vs. `Im_a_var`
    * Elixir normalizes Erlang: "The subject of the function is always the first argument (which allows for the pipe operator). And all data structures functions employ zero-based access."
    * Elixir is better with strings: "string in Erlang refers to char lists and there is a :string module, that's not UTF-8 aware and works mostly with char lists"
    * Erlang does runtime compilation of regular expressions, vs. compile-time in Elixir with the `~r` sigil

## Day Three: Mix

At this point the tutorial moved on from language features to tools and libraries that come along with the language. First up: [`mix`](http://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html) - the project automation tool, used for generating projects, running tests, installing dependencies, and more:

### Impressive

* Really compiling! Adding `@doc` attributes and showing them in IEx console with `h()` is beautiful! :0)
* `@doctest` in your test file verifies the code examples in your documentation
* ExDoc takes these same inline docs and builds a web page like the official Elixir docs: https://hexdocs.pm/elixir

### Noteworthy

* `MIX_ENV=prod` (other options = dev, test)
* `use ExUnit.Case, async: true` gives you a parallel test run. As you might expect, ":async must only be set if the test case does not rely on or change any global values"
* Important! "we should never convert user input to atoms. This is because atoms are not garbage collected"
* Hex is the package manager. `mix hex.outdated` and `mix deps.get` are both very useful
* You can pull dependencies directly from a git repository, even specify a tag.
* Annoying: Pattern matching for maps requires `%{item: item}` instead of just `%{item}`. What I want is the tuple syntax: `{first, second}`
* When a linked process of yours ends, your process is sent a message like `{:DOWN, ref, :process, pid, reason}` - `ref` is the same thing that comes back from `Process.monitor(pid)`
* `GenServer` allows you to write a 'client' API and 'server' functionality in one module. Callbacks/Behaviors in Elixir facilitate this functional split - callbacks are run in the process created for the 'server'
* The test context in ExUnit, available from callbacks like setup and test, "includes some default keys, like :case, :test, :file and :line"
* "When we say 'project' you should think about Mix. Mix is the tool that manages your project. When we talk about applications, we talk about OTP. Applications are the entities that are started and stopped as a whole by the runtime."

### Questions:

* How do you get the docs of a module compiled in memory with `c()`?
    * Sadly, you cannot. It has to be compiled down into a `.beam` file, which is not done in IEx. It is, actually, it just goes to memory. And that's not accessible, it seems, to `h()` https://groups.google.com/forum/#!topic/elixir-lang-talk/ItAtcQFsLAI
* How do you define your own attributes to add onto tests? I was getting errors.
    * `@tag :external` - you don't specify a new attribute, but give it a new value.
* How do you do `mix test --watch`?
    * https://github.com/lpil/mix-test.watch
* How exactly does code coverage work? How do the reports work?
    * `mix test --cover`, which uses built-in OTP coverage system https://github.com/elixir-lang/elixir/blob/8cee6fc20c3f74cea77faa49ce9169d67b9a9bba/lib/mix/lib/mix/tasks/test.ex#L136-L151
* Why am I getting 'warning: usage of `Earmark.to_html` is deprecated.' errors when trying to build HTML docs with `ex_doc`? Is there an `ex_doc` issue?
    * Fixed! Updated ExDoc from `0.14.5` to `0.15.0` - it was released three weeks after I ran into the bug.
    * Fix: https://github.com/elixir-lang/ex_doc/commit/8abeedc44a8c311ed99aef98fcad5a21b4dd6506
* Looking at the types/callbacks in `GenServer`, I see a `term()` type, and I'm not sure what that is, where it's coming from
    * `term()` is an alias for `any()` per https://hexdocs.pm/elixir/typespecs.html
* How do you get a list of all running OTP Applications in the VM?
    * `Application.started_applications()`

## Day Four: OTP and Meta-Programming

Four days in, and I'm finally ready to dig into the core concepts for fault-tolerant applications in the world of Erlang/OTP: [`Supervisor` and `Application`](http://elixir-lang.org/getting-started/mix-otp/supervisor-and-application.html#understanding-applications)!

### Impressive

* `:observer.start()` to show a built-in Erlang monitor GUI - the Applications tab at the top shows you a visual representation of the process tree for all top-level OTP applications.
* `Supervisor` will restart your processes for you, with a number of configurable strategies: https://hexdocs.pm/elixir/Supervisor.html#module-strategies
* "Mix generates a mix.lock file that guarantees _repeatable builds_. The lock file must be checked in to your version control system, to guarantee that everyone who uses the project will use the same dependency versions as you."
* `with` construct is the pattern-matching corollary to `|>` operator
* Wow. `quote` returns an Abstract Syntax Tree (AST) for the code provided, and `unquote` will execute that AST. http://elixir-lang.org/getting-started/meta/quote-and-unquote.html
* `Macro.to_string/1` will produce the original source code for a provided AST
* `quote(do: if(true, [do: :this, else: :that]))` is equivalent to `quote(do: if true do :this else :that end)`
* `unquote_splicing` takes a block of code and behaves as if that code was copied into the current context. For code blocks, for inserting array elements.
* Macros take code constructs and transform them into other code constructs, which are injected back into the original code. `Macro.expand_once` helps you debug them, by showing you the intermediate code before it is run or turned into bytecode.
* Macros don't interfere with variables already in their target scope, unless `var!()` surrounds the target value

### Noteworthy

* `~> 1.0` means the most recent of `1.x.x`
* Mix supports 'umbrella projects.' Umbrella projects allow you to create one project that hosts many applications while keeping all of them in a single source code repository. Use the '--umbrella' on `mix new`. 'apps_path' instead of 'app' inside of 'def project' in mix.exs.
* '--sup' on 'mix new' builds supervision tree for you
* Ouch! "proper DateTime implementation requires a TimeZone database which currently is not provided as part of Elixir."
* Much of Elixir can be overridden with macros, but some parts can't be overridden, called 'special forms' https://hexdocs.pm/elixir/Kernel.SpecialForms.html
* With great power comes great responsibility - some key tips for macros: http://elixir-lang.org/getting-started/meta/macros.html#write-macros-responsibly
* Wow, finally with the DSLs section we can understand how Phoenix, Plug, ExUnit and more provide much of the functionality they do.
* Examples of special macro names: `__using__` (run on `use` keyword) and `__before_compile__` (run right before code generation). See `Module` documenation.
* '@attributes' and macros go well together, because they are both compile-time only. An `@attribute` can provide the temporary storage a macro might need.
* `@behaviour` attribute (defined in `Module`) has the british spelling.

### Questions

* What is a good time zone database/library for Elixir?
    *  https://github.com/bitwalker/timex

## I'm excited!

After all that, I started a project to use my new knowledge: GraphQL and Postgres in a [certain domain of interest](/star-wars-cards/). So far it's been extremely productive. Unlike the Node.js/Javascript world, I don't feel like I'm fighting the system anymore - for async operations, for the pure functional style I like, for the basics like testing and documentation. I spend a lot of time with the [Elixir docs](https://hexdocs.pm/elixir/Enum.html) and a lot less searching for new modules.

Check it out - I suspect you'll enjoy it too!

---

_Resources:_

* The excellent Elixir getting started tutorial: http://elixir-lang.org/getting-started/introduction.html
* Elixir APIs:
    * Docs: https://hexdocs.pm/elixir
    * Source: https://github.com/elixir-lang/elixir/tree/master/lib/elixir/lib
* Erlang APIs:
    * Docs: http://erlang.org/doc/apps/kernel/index.html
    * Source: https://github.com/erlang/otp/tree/master/lib/kernel/src
* `GenServer` and `Supervisor` cheat sheets: https://github.com/benjamintanweihao/elixir-cheatsheets
* Related tools:
    * Mix task runner: https://hexdocs.pm/mix/
    * Hex package registry: https://hex.pm/
    * ExUnit test runner: https://hexdocs.pm/ex_unit/
    * ExDoc documentation generator: https://github.com/elixir-lang/ex_doc
* Huge list of Elixir/Erlang libraries: https://github.com/h4cc/awesome-elixir
* The high level:
    * What's the next big language? Javascript? Elixir? http://lebo.io/2015/03/02/steve-yegges-next-big-language-revisited.html
    * "I didn't have this much fun programming on the server since I initially discovered django." https://dvcrn.github.io/elixir/clojure/clojurescript/2016/01/22/sweet-sweet-elixir.html
    * Comparing Elixir and Go https://blog.codeship.com/comparing-elixir-go/
    * Comparing Elixir and Clojure https://www.quora.com/Functional-Programming-Why-choose-Clojure-over-Elixir
    * Using it in production, coming from Ruby: http://blog.carbonfive.com/2016/08/08/elixir-in-the-trenches/
* Newsletters:
    * http://plataformatec.com.br/elixir-radar
    * https://elixirweekly.net/
