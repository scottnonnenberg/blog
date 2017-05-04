---
title: What's a Monad? Digging into Haskell
date: 2017-05-03T21:07:06.915Z
layout: post
path: /what-s-a-monad-digging-into-haskell/
next:
previous: /hard-won-lessons-five-years-with-node-js/
tags:
---

_[Warning: This is a very long post. You might consider skipping the entire "Learning you for great good!" section, jumping directly to the "Well, what's a Monad?" section]_

My functional journey started [with Javascript techniques](/a-functional-distinction/), grew as [I briefly explored a few functional languages](/getting-started-with-elixir/#my-road-to-elixir), then bloomed as I [got comfortable with Elixir](/getting-started-with-elixir/). Going further has finally defined some long-nebulous terms and shown me the power of both [algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type) and compiler assurance that a given function is truly [pure](https://en.wikipedia.org/wiki/Pure_function).

<div class='fold'></div>

## Why go beyond Elixir?

Before you think anything else, let me first say that I still think [Elixir](http://elixir-lang.org/) is great. The concurrency primitives it inherits from [Erlang/OTP](https://en.wikipedia.org/wiki/Open_Telecom_Platform) are top-notch, and its own innovations like easy macro use via `quote`/`unquote` are truly powerful. For example: [Absinthe, a GraphQL library for Elixir](http://absinthe-graphql.org/), uses macros for compile-time validation that your schema is sound. I've written a good bit of Elixir code now, including custom [Ecto](https://github.com/elixir-ecto/ecto) and Absinthe data types.

But I am [always trying to improve](/tags/stack-improvements/). And in my internet wanderings I encountered [this excellent video about OCaml](https://www.youtube.com/watch?v=kZ1P8cHN3pY). A couple key points stuck out for me:

1. Because [OCaml](http://ocaml.org/) ensures exhaustive pattern-matching against algebraic data types, the [compiler can assist you in changing all references to to a given type](https://youtu.be/kZ1P8cHN3pY?t=16m5s). Similar to changing an interface in [Java](https://www.java.com/).
2. Algebraic data types can be arranged such that [invalid states are not possible to express](https://youtu.be/kZ1P8cHN3pY?t=18m6s). No need for manually-implemented guards.

These points spoke directly to my real-world experiences. I wanted these features.

## Exploring Dialyzer

I was excited to try [Dialyzer](http://erlang.org/doc/man/dialyzer.html), having had a great experience with gradual typing in JavaScript via [Flow](https://flow.org/). Flow's [disjoint unions](https://flow.org/blog/2015/07/03/Disjoint-Unions/) give you something close to the expressive power of a language like OCaml. And so, I expected Dialyzer to give me a similar level of power. I slowly added type annotations to my entire project, pushed forward by [Credo, a linter for Elixir](https://github.com/rrrene/credo).

The first surprise was that Dialyzer doesn't work on `.exs` files. And [Mix understands only `.exs` files](https://hexdocs.pm/mix/Mix.Tasks.Test.html) in your `test/` directory when you run `mix test`. So, no gradual typing for your tests. At least, [not without jumping through some hoops](http://learningelixir.joekain.com/dialyzer-and-integration-tests/).

Second, errors I expected did not materialize. This Elixir code has a few problems:

```elixir
@spec test(item :: :one | :two | :three) :: :four | :five
def test(item) do
  case item do
    :zero -> :four
    :one -> :five
    :two -> :six
  end
end
```

There are three errors I would like Dialyzer to catch for me here:

1. The potential values for `path` are three different atoms: `:one`, `:two`, and `:three`. But the `case` statement pattern-matching refers to `:zero` - that's not a potential value.
2. The `case` statement is also missing the potential value `:three` in this case.
3. The return value is specified as `:four` or `:five`, but the value `:six` is returned in that third case.

I am disappoint.

[At least those `@spec` statements are still useful documentation](https://elixirforum.com/t/is-dialyzer-worth-the-effort/4814).

So I guess I'm looking for static typing. What language has that but also universal immutability and a functional design like Elixir?

## What's a Haskell?

Isn't it pretty obscure? Like, not really used by anyone in production? And people who do use it have no problem injecting terms like 'monad' into everyday conversation. But I did hear that it is always immutable, like Elixir. And that it will draw nice lines around all of your [I/O](https://en.wikipedia.org/wiki/Input/output) too.

Let's dig in.

First, it should be noted that it's named after [Haskell Curry](https://en.wikipedia.org/wiki/Haskell_Curry), and [currying](https://en.wikipedia.org/wiki/Currying) is a pretty important concept in functional programming. They really reached for the stars in naming this thing! That level of gravity fits, because the language was designed by a working group that evolved out of a 1987 conference called "Functional Programming Languages and Computer Architecture." [In the words of one of the committee members](https://www.haskell.org/onlinereport/preface-jfp.html):

> The committee's primary goal was to design a language that satisfied these constraints:
>
> 1. It should be suitable for teaching, research, and applications, including building large systems.
> 2. It should be completely described via the publication of a formal syntax and semantics.
> 3. It should be freely available. Anyone should be permitted to implement the language and distribute it to whomever they please.
> 4. It should be based on ideas that enjoy a wide consensus.
> 5. It should reduce unnecessary diversity in functional programming languages.

An interesting outcome of #1 is that it is considered to be very academic. And because of #3 there are [quite a few compilers available](https://wiki.haskell.org/Implementations).

The good news is that at this point [haskell.org is pretty clear about where you should start](https://www.haskell.org/downloads):

* [Glasgow Haskell Compiler (GHC)](https://www.haskell.org/ghc/) - `ghc` to compile, `ghci` for [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
* [Haskell build tool](https://www.haskell.org/downloads#stack) - `stack`
* [Haskell package manager](https://www.haskell.org/cabal/) - `cabal`

Okay, now what?

## Learning you for great good!

I had come across the ["Learn You a Haskell for Great Good!"](http://learnyouahaskell.com/introduction) tutorial a couple times before, but never had the motivation to power through it. This time I was on a mission. Here are my notes - things I thought were surprising or particularly important as I went through each section.

### Day 1

From the introduction all the way to [7. Modules](http://learnyouahaskell.com/modules):
- No parens when you call a function
- Interesting: "We usually use `'` to either denote a strict version of a function (one that isn't lazy) or a slightly modified version of a function or a variable. Because `'` is a valid character in functions, we can make a function like this."
- Backticks change `fn 1 2` to ``1 \`fn\` 2``
- "functions can't begin with uppercase letters"
- Lists have to have the same type in them, no mixing
- `:` is the 'append to head of list' operator, a cheap operation
- `++` is 'assemble a new list by combining' which is a pretty costly operation
- `!!` indexes into a list, zero-indexed
- Lists can be compared "When using `<`, `<=`, `>` and `>=` to compare lists, they are compared in lexicographical order. First the heads are compared. If they are equal then the second elements are compared"
- `head`/`tail` as expected for working with lists. `last`/`init` are their opposite.
- More list functions: `length`, `null` (`True` if list is empty), `reverse`, `take`, `drop`, `maximum`, `minimum`, `sum`, `product`, `elem`
- Ranges: `[1..20]`, `['a'..'z']`, `['A'..'Z']`. Can reverse, can provide more than one number to give you an amount per step, and you can leave out the end for an infinite list!
- `Int` is a bounded integer, `Integer` is unbounded
- Infinite lists: `cycle`, `repeat`, `replicate`
- List comprehensions: `[x*2 | x <- [1..10], x*2 >= 12]` First section: the value taken, second section (could be more than one): the range, third section (also allows multiple): the filters. Multiple values give you a cross product.
- Tuples use parens `(1, 2)`. Note: each tuple size is its own type, so you can't mix lengths in a list.
- `zip` combines two lists to one list of pairs. It will truncate the longer list.
- Interesting: `let rightTriangles' = [ (a,b,c) | c <- [1..10], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2, a+b+c == 24]`
- auto-currying! `fn x y = x + y`. `fn 1` returns a function that takes one number.
- `:t` or `:type` in `ghci` is extremely useful!
- Important set of typeclasses:
  - `Eq` is for equality, inequality
  - `Ord` is an extension of equality - for ordering of elements
  - `Show` is converting to string for console
  - `Read` is converting from string
  - `Enum` a set of sequential types
  - `Bounded` ends of the range. `minBound` and `maxBound` are essentially polymorphic constants
  - `Num` anything that standard arithmetic operations (`+`, `-`, etc.) apply to
  - `Integral` restricts `Num` to whole numbers
  - `Floating` restricts `Num` to types that can represent non-whole numbers
- Type inference is really important - `read "5" - 2` works, because it knows we're looking for an integer. but plain `read "5"` wouldn't. Need this: `read "5" :: Int`
- Functions can be defined multiple types, with different pattern matching in the parameter list
- `_` in a pattern match is something you don't care about and won't use
- By default GHC doesn't seem to care about whether your pattern matches (at least in a function declaration) are exhaustive, so you get runtime errors
- Can get access to both the overall value and the components of the pattern match with `@` syntax `all@first:rest`
- Pipe character (`|`) is used for a set of pattern-matching expressions within one function overload.
- `otherwise` is a funny keyword mapped to `True`, useful in pattern matching
- `where` keyword gives you an opportunity to massage your parameters a bit before running a bunch of piped guard statements through it
- `let`/`in` expression where you do a bunch of setup, and then the result of the expression is the result of it all
- `case` expression uses pattern matching across one incoming value
- Example of a lambda function (anonymous function): `(\xs -> length xs > 15)` key is the `\` which apparently looks a little bit like a lambda symbol (λ)
- Interesting - these are the same due to auto-currying:
  ```haskell
  addThree :: (Num a) => a -> a -> a -> a
  addThree x y z = x + y + z
  addThree = \x -> \y -> \z -> x + y + z
  ```
- In a function declaration, the thick arrow separates the type declaration from the actual signature (separated by thin arrows)
- `foldl` is reduce, starting from the beginning of the list. `foldr` from the right. `foldll` and `foldrl` are the same, but they don't require a separate starting value. The first element taken from the list is the accumulator.
- If you want all of the accumulator values produced going through the list, use the `scanX` methods, just like `foldX`
- Because of currying, the primary target of most operations will be the last parameter of the method (totally opposite of Elixir). Map, for example is `map :: (a -> b) -> [a] -> [b]`. Also,  "if you have a function like `foo a = bar b a`, you can rewrite it as `foo = bar b`"
- You can write `reverse` as `foldl (flip (:)) []`
- the `$` operator has a very low precedence, so `x $ stuff` functions as `x (stuff)`: `f $ x = f x`. Nicer chaining when doing several steps in a row.
- the `.` operator composes functions `f . g = \x -> f (g x)` (or `f . g x = f $ g x` given currying). Nicer chaining without the actual function parameters, to prepare one callable function out of a number of constituent steps.
- Putting it together:
  `replicate 100 (product (map (*3) (zipWith max [1,2,3,4,5] [4,5,6,7,8])))`
  becomes
  `replicate 100 . product . map (*3) . zipWith max [1,2,3,4,5] $ [4,5,6,7,8]`
- `import` pulls everything in globally, but you can add `qualified` to ensure that all references in the file retain that namespace (and `as` to change that name). You can also use `hiding` to provide a list of things in that module NOT to include.
- The `Data.List` module has a lot of really useful methods: `intersperse`, `intercalate`, `transpose`, `concat`, `concatMap`, `and`, `or` (you'll probably use `any` and `all`, since they take a predicate) and so on: https://downloads.haskell.org/~ghc/latest/docs/html/libraries/base-4.9.0.0/Data-List.html
- "When using lazy folds on really big lists, you might often get a stack overflow error" so you can use Data.List's variants with an apostrophe
- For historical reasons, `length` takes an `Int` and not an `Integer` (or better `Integral`) so you can use Data.List's `genericLength` instead. There are other methods like this.
- `Data.Char` for string handling.
- `Data.Map` for key/value behavior. A map is printed out as `fromList [("key1",1),("key2",2)]`
- `Data.Set` for sorted, unique list. Implemented with trees like map. Displayed as `fromList [1, 2, 3]`
- Super-useful, returned by `Data.Map.lookup`: `data Maybe a = Nothing | Just a`
- To declare a module:

```haskell
module Something.Name (
  fn1,
  fn2
) where

fn1 x = x^1
fn2 x = x^2
```

### Questions:

* Where is the standard API documentation for Haskell? Or am I expected to rely on `:t` and `:i` in the console?
  * Okay, this was recommended: https://downloads.haskell.org/~ghc/latest/docs/html/libraries/
* Integer expands to BigInteger automatically?
  * "An Integer is a type that can contain arbitrary-precision integers, like the Java BigInteger." The `Int` type is not so flexible. Don't restrict things to `Int`. Probably use `Integral` or `Numeric`.
  * http://stackoverflow.com/questions/1184296/why-can-haskell-handle-very-large-numbers-easily
* Fractional?/Rational? seems to be a better way to deal with decimals, since it preserves the intended meaning (no Float/Double approximations). When does Haskell use these instead of Floats? pi is a float.
  * `Data.Ratio` is what you get with `1 % 3` (requires an import of `Data.Ratio`)
  * `Fractional` is what you get with `1 / 3`
* How do you get more information about typeclasses? `:t Eq` or `:t Ord` give you an error.
  * Answer: `:info Eq` (or `:i`) gives you information about the typeclass
* Can you make the compiler tell you about non-exhaustive pattern matching?
  * `ghc --make -Wall` checks for exhaustiveness!
  * So many more options! https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/flags.html
  * Wow, GHC supports literate programming out of the box! https://wiki.haskell.org/Literate_programming
* How does `Data.Char` deal with unicode? Are `toUpper` and `toLower` unicode-aware?
  * It's not good.
  * To get `ghci` to show unicode characters properly, I had to install [`unicode-show`](https://hackage.haskell.org/package/unicode-show) and start up with `ghci -interactive-print=Text.Show.Unicode.uprint`
  * According to [this blog post](http://blog.ezyang.com/2010/08/strings-in-haskell/), `Data.Text` is good for 'packed' (not a linked list) UTF-16 strings. Sadly, it doesn't pass all of these tests: https://mortoray.com/2013/11/27/the-string-type-is-broken/

```haskell
Prelude Data.Text> noel = pack "noël"
Prelude Data.Text> Data.Text.reverse noel
"l̈eon"
```

### Day 2

From [8. Types and Typeclasses](http://learnyouahaskell.com/making-our-own-types-and-typeclasses) to a bit of [9. I/O](http://learnyouahaskell.com/input-and-output):

- `data` keyword allows you to create a new type. If it contains types after the name, it creates a function with that arity which constructs the type.
- hand-waving on `deriving (Show)` which is required for your type to be printed to the console.
- Export types from a module like this: `Point(..)` (includes all constructors). Interesting: "We could also opt not to export any value constructors for `Shape` by just writing `Shape` in the export statement. That way, someone importing our module could only make shapes by using the auxiliary functions" This is how `Map.Map` is exported - you can only create one with `fromList`
- Record syntax gives you the same kind of custom type, except each field is named!
- So far we've seen `data Type` followed by concrete type classes, like `Float` or `Int`. You can parameterize your type with a lowercase value, usually `a`. `data Maybe a = Nothing | Just a` can be applied to any type. `Maybe` by itself doesn't make sense, but `Maybe Int` does.
- But: "it's a very strong convention in Haskell to never add typeclass constraints in data declarations" - an example is `Map k v` which is almost always `Ord k` so the lookup tree can be ordered. What ends up happening is that all the functions that operate on `Map k v` specify that the `k` must be `Ord k` and then there are a couple functions that just don't care about whether the `k` is ordered.
- term: 'nullary'. A function that takes no parameters.
- Very cool stuff. You can do things like `[minBound..maxBound] :: Day` after defining this:
```haskell
data Day = Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday
  deriving (Eq, Ord, Show, Read, Bounded, Enum)
```
- Use type synonyms like this `type Name = String` to make your function signatures easier to deal with. These can also be parameterized like `type AssocList k v = [(k,v)]`. Or use partial application: `type IntMap = Map Int`. The key difference is that these don't produce new functions - the names specified after `type` can only be used in type declarations and casts.
- Disappointing. Would have appreciated a more self-explanatory type for capturing error/result duality: "when we're interested in how some function failed or why, we usually use the result type of `Either a b`, where `a` is some sort of type that can tell us something about the possible failure and `b` is the type of a successful computation. Hence, errors use the `Left` value constructor while results use `Right`."
- Whoa - control over precedence and associative direction (left/right) with `infixr` and `infixl`!
- "pattern matching is actually about matching constructors", so even new operators you define, elements of your `data` types
- Recursive types! Easy binary tree. And that's how lists are defined, anyway. :0)
- `class` keyword essentially gives you interfaces, like `Eq` which provides `(==)` and `(/=)`. `instance` provides an implementation of a `class` against a given type.
- "Most of the times, class constraints in class declarations are used for making a typeclass a subclass of another typeclass and class constraints in instance declarations are used to express requirements about the contents of some type"
- `id` is "a standard library function that takes a parameter and returns the same thing"
- `Functor` represents things that can be mapped over: `class Functor f where\n fmap :: (a -> b) -> f a -> f b `. `f` could be a list, for example. There are some rules about Functor behavior, like: order should be maintained.
- Checking for `kind` using `:k` in `ghci` - `*` means 'a concrete type.' `* -> *` means a concrete type will be generated when a concrete type is provided. `Maybe` has that type, but `Maybe Int` is a final concrete type.
- Empty is represented as `()` - it's an empty tuple, with a type of `()`.
- `<-` operator, like `name <- getLine` - "You can read that piece of code like this: perform the I/O action `getLine` and then bind its result value to `name`"
- It's [function colors](http://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/) again! "You can think of an I/O action as a box with little feet that will go out into the real world and do something there (like write some graffiti on a wall) and maybe bring back some data. Once it's fetched that data for you, the only way to open the box and get the data inside it is to use the `<-` construct. And if we're taking data out of an I/O action, we can only take it out when we're inside another I/O action."
- `do` keyword allows for a sequence of operations. `let` can be used freely.
- The `return` makes an I/O action out of a pure value. "`return` is sort of the opposite to `<-`"
- `when` from `Control.Monad` is essentially "if something then do some I/O action else `return ()`"
- `mapM`, `forM`, for mapping over I/O actions
- `getContents` for a streaming representation of stdio. `interact` is similar, but it pulls a line at a time, handing it to you to respond or not.
- For dealing with files, `System.IO` - `readFile`, `writeFile`, `appendFile`. Low level, streaming methods are `openFile` and `withFile` in `System.IO`. Can set how files are buffered when streaming with `hSetBuffering`
- When working with files, you'll work with a file handle. All of the methods that operate on stdio are available for file handles as well: `hGetContents`, `hGetLine`, `hPutStr`, etc.
- For command-line tools, `System.Environment` has `getArgs` and `progName`. Looks like we'll need a tool to combine things like `--cows 5` into one object
- To get a random number, you have to do some surprising stuff with the generator - because a pure function can't return something different given the same inputs. So you have to keep track of the generator, and repeatedly pass that into subsequent calls: `(r, gen) = random (mkStdGen 949494) :: (Int, StdGen)` (from `System.Random`)
- `randoms` is useful, an infinite list of random numbers based on an initial generator
- `randomR` and `randomRs` are the same, but with bounds
- `System.Random.getStdGen :: IO StdGen` for that initial seed! `newStdGen` updates the global generator so if you call `getStdGen` again, you'll get something different.
- The overhead of `List` can be onerous when dealing with files, can use `Data.ByteString` (not lazy at all) and `Data.ByteString.Lazy` (not as lazy as `List`). A lot of the same behaviors as list - `:` is `cons`. You probably want to use the strict version `cons'` so the bytes get packed into larger chunks.
- Lots of filesystem manipulation goodies in `System.Directory`

### Questions:

* Where can I find more examples of `IO` management? For example, is there a web server out there built on top of Haskell? Perhaps a game loop?
  * GraphQL handling: https://github.com/jdnavarro/graphql-haskell
  * A library for handling data requests in parallel, batching, etc. https://github.com/facebook/Haxl
  * Accessing redis: https://hackage.haskell.org/package/hedis
  * Accessing postgres: https://hackage.haskell.org/package/postgresql-simple
  * Web frameworks: https://wiki.haskell.org/Web/Frameworks
* What's a good Haskell argument processing library?
  * Seems reasonable: https://github.com/vincenthz/hs-cli
* "indentation is important in Haskell" - how, exactly?
  * From https://en.wikibooks.org/wiki/Haskell/Indentation:
  * The golden rule of indentation: "Code which is part of some expression should be indented further in than the beginning of that expression"
  * Very important for the grouping of statements in `let` and `do`. Two choices:

```haskell
let thing1
    thing2
    thing3
```

```haskell
let
  thing1
  thing2
  thing3
```

### Day 3

From a bit more [9. I/O](http://learnyouahaskell.com/input-and-output) to [11. Functors and Monoids](http://learnyouahaskell.com/functors-applicative-functors-and-monoids):

- Interesting! "Pure code can throw exceptions, but it they can only be caught in the I/O part of our code"
- `System.IO.Error.catchIOError :: IO a -> (IOError -> IO a) -> IO a`
- A number of useful methods for pattern-matching in an exception handler: `System.IO.Error.isXXXError`
- Can extract data from `IOError` with `System.IO.Error.ioeXXX`
- You can rely on exception handling in your `IO` methods, or you can return something like `IO (Either a b)` to have the compiler help you deal with the fact that something went wrong.
- The `instance` keyword is key to applying a typeclass (like `Functor`) to a new type.
- "If you ever find yourself binding the result of an I/O action to a name, only to apply a function to that and call that something else, consider using `fmap`, because it looks prettier."
- `Functor`'s `fmap` is kind of like unboxing, applying a function, then re-boxing. But then you consider that `->` is a functor, and you can `fmap` functions themselves: "`fmap` acts just like . for functions" - function composition. Chaining. Sadly the analogy starts to break down. "You can think of fmap as either a function that takes a function and a functor and then maps that function over the functor, or you can think of it as a function that takes a function and lifts that function so that it operates on functors."
- Laws of `Functor`:
  - "if we map the id function over a functor, the functor that we get back should be the same as the original functor" (noop)
  - "composing two functions and then mapping the resulting function over a functor should be the same as first mapping one function over the functor and then mapping the other one" (associativity)
  - `Applicative` is a `Functor` with an even greater ability to be composed. `Just (+3) <*> Just 9` results in `Just 12`
- `Functor` -> `Applicative` is like going up a 'meta' level: `(\x -> "hello " ++ show x) `fmap` Just 1`, to `Just (\x -> "hello " ++ show x) <*> Just 1`. Or: `Just (+) <*> Just 3 <*> Just 5` gives `Just 8`
- Laws of `Applicative`:
  - `pure f <*> x` is equivalent to `fmap f x`
  - `pure id <*> v = v`
  - `pure (.) <*> u <*> v <*> w = u <*> (v <*> w)`
  - `pure f <*> pure x = pure (f x)`
  - `u <*> pure y = pure ($ y) <*> u`
- `<$>` is pretty much the same thing as `fmap`. So we can do this: `(++) <$> Just "johntra" <*> Just "volta"`, which is equivalent to this: `(++) "johntra" "volta"` (except for the `Maybe` wrapper)
- When doing applicative operations on lists, it's a permutation explosion. You can avoid this with a zip (each first pair is combined, then each second pair is combined, etc.) via `ZipList`: `getZipList $ (+) <$> ZipList [1,2,3] <*> ZipList [100,100,100]` returns `[101,102,103]`
- `newtype` keyword is used for simple wrapping of another type, likely for new implementations (with `instance` keyword) of different `typeclass` methods - like `ZipList`. It's a little bit faster than types created with `data` - no wrapping/unwrapping.
- `Monoid` type class. "A monoid is when you have an associative binary function and a value which acts as an identity with respect to that function. When something acts as an identity with respect to a function, it means that when called with that function and some other value, the result is always equal to that other value. `1` is the identity with respect to `*` and `[]` is the identity with respect to `++`"
- "It's worth noting that the decision to name mappend as it's named was kind of unfortunate, because it implies that we're appending two things in some way. While `++` does take two lists and append one to the other, `*` doesn't really do any appending, it just multiplies two numbers together"
- Laws of `Monoid`:
  - `mappend mempty x = x`
  - `mappend x mempty = x`
  - `mappend (mappend x y) z = mappend x (mappend y z)` (Notice that monoids don't require that `mappend a b` be equal to `mappend b a`)
- `Data.Foldable` exports generic `foldXX` methods that work on any `Foldable` type.

### Day 4

We're finally talkin' [12. Monads](http://learnyouahaskell.com/a-fistful-of-monads)! Today is also when we complete the tutorial.

- Monads! "are just beefed up applicative functors, much like applicative functors are only beefed up functors"
- "monads are just applicative functors that support `>>=`": `(>>=) :: m a -> (a -> m b) -> m b` where `m` is `Applicative`
- Boo! Second of a couple places where tutorial out of date. It says that `Monad` is not declared with an `Applicative` type constraint, but it is.
- Interesting that `pure` and `return` are exactly the same. Based on that prior point, seems like `return` came before `pure`
- A funny pole-walking analogy to help explain `>>=`: `return (0,0) >>= landLeft 1 >>= banana >>= landRight 1`
- Okay, a pretty cool reveal that made me smile - nested use of `>>=` with lambdas to preserve context becomes `do`:

```haskell
foo :: Maybe String
foo = Just 3   >>= (\x ->
      Just "!" >>= (\y ->
      Just (show x ++ y)))
```

Can be rewritten as this. We could even take that last line and turn it into a `return` to make it simpler...

```
foo :: Maybe String
foo = do
  x <- Just 3
  y <- Just "!"
  Just (show x ++ y)
```

- "It's important to remember that do expressions are just different syntax for chaining monadic values."
- "When pattern matching fails in a `do` expression, the `fail` function is called."
- Interesting. It keeps talking about the 'list monad' representing non-determinism - a number of possible results in a given computation. I guess it is the way to make sense of permutation explosions.
- More rewrites with monads - a list comprehension can be rewritten in `do` notation, as long as you write your own `guard` function to replicate the filter clauses
- Laws of `Monad`:
  - `return x >>= f` is equivalent to `f x`
  - `m >>= return` is equivalent to `m`
  - `(m >>= f) >>= g` is equivalent to `m >>= (\x -> f x >>= g)` (same thing as Applicative associativity, it's just that the 'unboxing'/'boxing' makes the syntax a little harder.
- If you define a Monadic function composition operator `f <=< g = (\x -> g x >>= f)` then this becomes easier to grok:
  - `f <=< return` is equivalent to `f`
  - `return <=< f` is equivalent to `f`
  - `f <=< (g <=< h)` is equivalent to `(f <=< g) <=< h`
- Useful command for seeing what you have installed: `ghc-pkg list`
- `Control.Monad.Writer` - keeping track of some `Monoid` along with the primary target of the calculation. Could be used for logging, if `String` or `[String]` is used for the `Monoid`
- Key to remember, when using `[]` as a `Writer`'s `Monoid` - it's slow to append to the end of a list, fast to prepend. So be sure to make things right-associative, use tail-call recursion (essentially: attach the log before calculating the next level of recursion)
- `DiffList` is a higher-performance type than a plain list
- "the function monad is also called the reader monad" "if we have a lot of functions that are all just missing one parameter and they'd eventually be applied to the same thing, we can use the reader monad to sort of extract their future results and the `>>=` implementation will make sure that it all works out."
- For modeling state in a pure world, the state monad: `Control.Monad.State` - `newtype State s a = State { runState :: s -> (a,s) }`
- Ouch, can't run the `State` examples exactly as provided! :0(
- A number of functions available that work on `Monad` instead of `Applicative`:
  - `fmap` -> `liftM`
  - `<*>` -> `ap`
  - `liftA2` -> `liftM2`
  - `filter` -> `filterM`
  - `mapM` -> `mapM_`
  - `foldl` -> `foldM`
- `join` is a `flatten` call for a `Monad`: `join (Just (Just 9))` results in `Just 9` - but it only works for two layers. `m >>= f` is equivalent to `join (fmap f m)`
- `Data.Ratio.Rational` for no loss of precision when doing math on non-integers! It's written as a fraction with a percentage sign: `1 % 4` and it only resolves to something else when you need it to
- Interesting - tutorial presents a `Probability` monad to track the probability of a given outcome along with the value of that outcome
- The tutorial frequently defines this operator to make chaining easier: `x -: f = f x`
- Zipper - a pattern whereby you navigate through a data structure, keeping enough state to reassemble the datastructure from wherever you are in it.
- `break` takes a list and a predicate - the first item in the pair is the set of items for which the predicate returned false. When the predicate returns true, the rest of those items are the second item in the pair.

### Questions:

* Where is DiffList?
    * Apparently here: https://hackage.haskell.org/package/dlist-0.5/docs/Data-DList.html
    * (via http://stackoverflow.com/questions/25254985/benefit-of-difflist)
* Why won't the examples compile? What's the difference between `State` and `StateT`?
    * "The problem is that State is not standalone data type (or rather newtype), but it is the StateT transformer applied to Identity monad. Actually, it's defined as `type State s = StateT s Identity`" (via http://stackoverflow.com/questions/9697980/the-state-monad-and-learnyouahaskell-com)
    * Key was to continue using `State` in type hints (::), but `state` when calling the function. Confusing.
    * People hand-wave `type State s = StateT s Identity` like that's supposed to help me understand the difference between them. What is `Identity`?
    * Helps a bit: http://stackoverflow.com/questions/28645505/why-is-identity-monad-useful
* What year did this tutorial come out?
    * April 2011. Makes sense that some stuff is out of date.
* What if you wanted a `Writer [String] (Maybe Int)` how would that work? Would the nice `do` syntax still apply, or would we need to develop yet another level of meta introspection/execution?
    * The surprise, to me, is that all the methods below fully deal with `Maybe` and `Writer`. I guess that's my big question - I haven't seen a good example of truly pure functions used on the stuff inside Monads. I suppose that inside any of these methods I could be calling pure functions instead of simply `return (Just x)`.

```haskell
dropFourOrLess :: Maybe Int -> Writer [String] (Maybe Int)
dropFourOrLess Nothing = return Nothing
dropFourOrLess (Just x)
    | x > 4 = do
        tell ["Keeping " ++ show x]
        return (Just x)
    | otherwise = do
        tell [show x ++ " is too small, dropping"]
        return Nothing

dropTenOrMore :: Maybe Int -> Writer [String] (Maybe Int)
dropTenOrMore Nothing = return Nothing
dropTenOrMore (Just x)
    | x < 10 = do
        tell ["Keeping " ++ show x]
        return (Just x)
    | otherwise = do
        tell [show x ++ " is too large, throwing it away"]
        return Nothing

main :: IO ()
main = putStrLn $ show $ return (Just 10) >>= dropFourOrLess >>= dropTenOrMore
```

Outputs this:

```text
WriterT (Identity (Nothing,["Keeping 10","10 is too large, throwing it away"]))
```

## Well, what's a Monad?

> _"Monads are this strange, mysterious, weird but powerful, expressive pattern that we can use for doing programming, and they come with curse. The 'monadic curse' is that once someone learns what monads are and how to use them, they lose the ability to explain it to other people."_ - [Douglas Crockford](https://youtu.be/b0EF0VTs9Dc?t=43s)

I now understand this difficulty. I understand why all the previous articles about Monads I've read were pretty much incomprehensible. The truth is that if you want to understand Monads as they really are, and not in metaphor, you need to start from a couple basic building blocks.

### 1. [Functor](https://en.wikibooks.org/wiki/Haskell/The_Functor_class)

The functional concept of mapping an operation over the contents of something is now quite widely known thanks to libraries like [Lodash](https://lodash.com/). Lodash has the ability to map over JavaScript objects and arrays. A `Functor` is anything that can be mapped over with `fmap`. `<$` is the simplest form of this, replacing all values inside the `Functor` with a single value:

```haskell
Prelude> fmap (+ 1) (Just 4)
Just 5
Prelude> 5 <$ (Just 4)
Just 5
```

### 2. [Applicative](https://en.wikibooks.org/wiki/Haskell/Applicative_functors)

`Applicative` is a `Functor` which is more composable. We can create a new `Applicative` from a value with the `pure` function, for example. And we can apply functions that don't know anything about the `Applicative` to the values inside:

```haskell
Prelude> pure 5
5
Prelude> pure 5 :: Maybe Int
Just 5
Prelude> (+) <$> Just 1 <*> Just 4
Just 5
Prelude> Just (+) <*> Just 1 <*> Just 4
Just 5
```

### 3. [Monad](https://en.wikibooks.org/wiki/Haskell/Understanding_monads)

Drumroll please. A `Monad` is an `Applicative` which implements two new functions. `return` is exactly like `pure`, assembling a `Monad` from a raw value. `>>=` is a new operator which takes a `Monad`, extracts the value from it and gives it to the provided function, which is then responsible for returning a new `Monad`. Take a look at these chained calls using lambda functions:

```haskell
Prelude> return 0 >>= (\i -> return (i + 1)) >>= (\j -> return (j + 4))
5
Prelude> return 0 >>= (\i -> return (i + 1)) >>= (\j -> return (j + 4)) :: Maybe Int
Just 5
```

Notice how `return` eliminates the need to specify the exact `Monad` we want. This then allows us to change the meaning of the expression with a type hint. This expression works for any `Monad` whose contents are compatible with `+` and can be initialized with `0`.

Now you're probably wondering what the big deal is. Sure, it's a collection of traits. And that `Maybe` thing is a `Monad`, whatever. But there are a whole lot of others: `IO`, `List`, `Either a`, `Control.Monad.State` and so on. You can see the available set by typing `:i Monad` into `ghci` (more are added to this list as you import new modules). Explore these and get a feel for the ideas they encapsulate. Most aren't as neatly described as `Maybe`, a container for another value (or `Nothing`). Some are a whole lot more abstract. For example: encapsulating a future state (`State`), or side effects (`IO`).

This wide applicability one of the reasons people have such a hard time explaining the `Monad` concept. But at least now all those claims that [JavaScript Promises are Monads](https://www.google.com/search?q=javascript+promise+monad) make a bit more sense!

### Bonus: [Monoid](https://en.wikibooks.org/wiki/Haskell/Monoids)

You'll see this everywhere as you explore Haskell, so it's worth covering. It only seems scary because the term `Monad` is pretty scary. Two behaviors are specified: the ability to create an empty `Monoid`, and the ability to combine two different `Monoid`s into one final `Monoid`:

```haskell
Prelude> mempty :: [Int]
[]
Prelude> mappend [1] [2, 3]
[1,2,3]
```

## Going forward

Haskell is incredibly powerful, and incredibly complex. I see now why it has the reputation it does. There's a huge barrier to entry, and it really is vastly different from the set of languages primarily taught and used today. What might pull someone into this world? You can't get a job doing it if you don't know it yet!

I'm not really comfortable with it, but I do plan to practice. I'm drawn to the value provided by its type system and the restrictions around I/O, but I've also heard about its unpredictability regarding performance. I'm especially looking forward to exploring its concurrency capabilities. We'll see!

I feel like I'm at a good stopping point in my functional programming journey. At least for now... who knows, maybe [Idris](https://www.idris-lang.org/) is in my future!

---

_A few resources:_

* Dialyzer:
    * A good overview from ElixirConf 2016: https://www.youtube.com/watch?v=JT0ECYZ9FaQ
    * Is it worthwhile? https://elixirforum.com/t/is-dialyzer-worth-the-effort/4814
    * Adding typespecs in Elixir http://elixir-lang.org/getting-started/typespecs-and-behaviours.html
    * A Mix task to use it easily: https://github.com/jeremyjh/dialyxir
* Another Haskell tutorial option: http://howistart.org/posts/haskell/1/index.html
* Haskell cheat sheets:
    * Haskell Syntax http://cheatsheet.codeslower.com/CheatSheet.pdf
    * Haskell Operators http://www.imada.sdu.dk/~rolf/Edu/DM22/F06/haskell-operatorer.pdf
* Haskell commentary:
    * https://mobile.twitter.com/lucasdicioccio/status/852974061546352642
      * A heartening message for those of us just starting out with Haskell
    * http://www.virtuouscode.com/2017/04/04/the-pretentious-haskell-phase/
      * Writing code in Haskell is like _"wandering around that crystal palace, repeatedly smacking nose-first into transparent panes of breathtaking beauty and diamond-hard ontological perfection"_
      * Great comment: _"I think Rich Hickey says it best 'Haskell is a beautiful language but life is too short' :D"_
    * https://metarabbit.wordpress.com/2017/05/02/i-tried-haskell-for-5-years-and-heres-how-it-was/
      * _"For minor tasks... I will not use Haskell; I'll do it Python: It has a better REPL environment, no need to set up a cabal file, it is easier to express simple loops... The easy things are often a bit harder to do in Haskell."_
    * vs. OCaml https://www.quora.com/Which-of-Haskell-and-OCaml-is-more-practical
      * This discussion was useful in helping me decide between them. Personally, I don't like or need OCaml's OO features, nor its mutability.
    * https://pragprog.com/magazines/2012-08/thinking-functionally-with-haskell
      * Features a fun, totally different  fizz-buzz solution in Haskell

