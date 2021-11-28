---
title: A Typescript onramp
date: 2021-11-28T18:46:50.991Z
path: /a-typescript-onramp/
tags:
  - typescript
  - javascript
  - software

---

So you're a Javascript developer, and you want to [stop writing Javascript](/dont-write-javascript/). [Typescript](https://www.typescriptlang.org/) seems like a good option, but you've always used [dynamically-typed languages](https://en.wikipedia.org/wiki/Dynamic_programming_language). You're uncertain about jumping in, or maybe don't feel like you aren't using it to its potential. I think I can help. Let's ramp you into Typescript!

<div class='fold'></div>

## Progressive enhancement

The first thing to know about Typescript is that you can start using it today! There's no need to rename all of your files to `.ts` and laboriously 'typescriptify' all at once. With its [`checkJs`](https://www.typescriptlang.org/tsconfig#checkJs) option enabled, Typescript can analyze and find potential errors in plain Javascript files.

For example, for a Node.js project, you can add core types like this:

```bash
yarn add --dev typescript
yarn add --dev @types/node
```

Then add a basic `tsconfig.json` file like this:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "baseUrl": "./",
  },
  "include": ["./**/*.js"],
}
```

Then you can run Typescript checks, with no generation of compiled Javascript, like this:

```bash
yarn tsc --noEmit
```

You'll probably get more complaints here, as Typescript finds components you're using which have no type definitions. You likely find types for these other modules on [DefinitelyTyped](https://definitelytyped.org/). If you can't, you can throw a `// @ts-ignore` comment right above the offending dependency, and the compiler will stop complaining.

You might be wondering: why does it need these type definitions, if it's just Javascript? Well, just like if it were analyzing your Typescript, it needs to know the structure of your dependencies. For example, in this tiny script, it will catch that extra third parameter passed to `readFileSync`:

```javascript
const { readFileSync } = require('fs');

const json = readFileSync('package.json', 'utf8', 'utf8');
const data = JSON.parse(json);
console.log(data);

const text = JSON.stringify(data);
const weird = text * 5;
console.log(weird);

const reallyWeird = data * 5;
console.log(reallyWeird);
```

And it will also catch that `text * 5` clause, because it knows the result of `JSON.stringify()` is a string, and a string can't be multiplied by five without [strange results](/hard-won-lessons-five-years-with-node-js/#nan). This is our first example of _type inference_, where Typescript is able to determine that the `text` variable is most certainly a `string`, given how it was initialized.

Next, try getting some more value out of these Javascript checks by enabling [a few more compiler options](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#early-benefits). You could also use [JSDoc annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) to get more value out of your plain Javascript checks, but I'd recommend that you move all the way to `.ts` files at this point.

## The `any` escape valve

Note that Typescript didn't catch the `data * 5` clause in the above code, which similarly produced `NaN`. That's because the return value of `JSON.parse()` is `any`, a special value which tells Typescript to let you do anything with that value. Call a function on it, multiply it, use it like an array - whatever!

And it turns out that's how `// @ts-ignore` works with those other dependencies without type definitions. This is your escape valve. As you start to translate a given Javascript file to Typescript, you can use `any` to defer the need for fully-rigorous types.

I certainly don't recommend using it a lot, but it's sometimes a needed tool.

All this, and we haven't written a line of Typescript so far!

## What is a type?

Before we can write Typescript, we need to start at the very beginning. A type, in Javascript, is the kind of data stored in a given variable or expressed in a given constant. So the type of a variable can change, radically:

```javascript
var count = 4;
count = 3;
count = 2;
count = 1;
count = 'Ah ah ah ah!';
count = {
  name: 'The Count',
  catchPhrase: 'Ah ah ah ah!'
  type: 'puppet'
};
```

This single variable went from a number, to a string, to a more complex object. This is dangerous, because most code isn't ready to deal with all three forms of this variable. [Statically-typed languages](https://en.wikipedia.org/wiki/Category:Statically_typed_programming_languages) like Typescript help you avoid this problem. At compile-time, the type of the variable is known either via explicit _type definitions_ or via contextual _type inference_.

Given that type understanding, the compiler helps keep you honest. No, you can't increment the value of `"The Count"`. But you can increment the value of `5`.

You can think of static type-checking like setting a budget for your finances. Writing plain Javascript is like forgetting your budget or having none at all - you just spend and spend and spend. You can very easily overdraft your account, spending more than you should. Typescript is like telling a robot your intended budget - it then automatically checks your spending as you do it, loudly letting you know if things are not in good shape.

With Typescript, you put in effort up front, declaring types and fixing type issues, and you're less likely to have bugs in your code. You also have a form of documentation in the type annotations on your functions. And perhaps most importantly, change is easier in the future. For example, when you add a new required field to the `User` object, the compiler will show errors wherever you create `User` objects, guiding you towards the complete change.

## Type definitions

Now we can start writing our first Typescript. Let's dig into some _type definitions_. I've added code for each section to the [Typescript Playground - click to follow along](https://www.typescriptlang.org/play?#code/DYUwLgBA5glgbiAdgOQIYFsQC4IGcwBOMiUA3AFCwIoYgQC8EA5AMoD2mbiITFA9HwggCBNgVyV4SNJgYQALBSrTacxAFdgwCuQEQAtIf3lyYAJ4AHOgFVcwuQG9yECARCoAJl2BmIMDzj4RCQULso0mIGExGTOEABmGDA+MiAA-FHBsS6oUNgQGugARsIUAL4UAMZc+BDqdgQ4tvaMTi7+OEz+AIxMADRx4amd7Jzc-XG5+QBMAMwDZeT1wgB0iejJZqlyrBwgAO4AFsI8FMsEa0kpqozqiB4g8cQgHhQPoGB055cb15j8gmEonESwaKymOzmvFBqyGNzq90ez1eMIu-h2-mm0Pe4C+YLh-1RK2AbEqqDAMC4OwAwqhEJ5UNDdIIjMZyB8ElctrRMjEIAAfBEPJ7cFHrTbbRi7TBHE7Q8V-Oi3REil4AoQiMQSBXc2SMWYUHWSgqabQmPRGEwckBmEDUtgkxrMIqifaIJgC5hQNxID2CphFYDqHiepiHVAALxAwD9XoIqDM0JtdodYh2LrYbqTtvtjp23oT0L0QK15GTubTjCNtAo5dTBHTwFQlQA1kyLYYTOYrBAAEKoXAwSoAGTYUDyDdacWI8TYOAAFJ8AB5gXkkACUDAAfBA4Gx-KEIPtUAREAvl6u8NEN9vd-uUS4S07FyAV2uoJv6Du9wfBuBR1AC6fjuQQxIeAD6wDPLg74ANoALrlFUNSQCS47CDg-aDiOY4To406ILOL5vleWSbg4EBgIcMC4CskHQSsFj1Ic84AAYAJLIAAYgA8hAAAkDgXmUrGbmUAwuMep7EZeoE3hRVE0XRUHcLRTG4CxrEAOoAIIAErIAJQmvmAIliRJGrAjJ77kZR1G0fRqmMcxbEAKJ6XpPF6UZwmiRA4l-mAAHzrZbhgOop52UpjkgLRABW+6IPOTAADruuZcQxTBEAIeQFRWrhqwzmwyW4HsikkBA4YWFYopMOu7KFRcUlJUwZWYBVUAQOgCZVagCDQFwdD7KIJD1eQ1SIGVoDEmO85oROynQeuyFTQ6ICzVA81NSseRBXN64NcylmlgtRWESV8grY16Fohd87nNdZ0XA8RTqFtbXldRlUPGAqDJC89U6B2bLdjYDQALKoBY+EuLBJJsC26gWAA0ja77wU0DSencwrIkhx2uQOMD2HjiAwBSXBYMdYMQM0BBQzDjB6SA1QEB4AA8clQH0dPY4KuNIqKW46JNtQ9RYWPCIzsN+B43Q4OcCwUBLOVdB4WLwbLHTMJiExhFIET5EwEM8BZUw4LM8x5RNKF1A00xyBLsHq5rFAwPEEAPQ75FxOc0w-BK8Im2YdjAPE0JlEIwB2BAbQQGL62bcliBsPb9izrjQM22LkDolK-j6PG9wcNCucFGw9NO9DsH+Ih5Ae17qf077LjN2C1Z6swel0l46CR9Hsfx4nM1oSnafnAkbBZ9dizHU+Ejl+c3TVxYLs9Ew8Got0geKjsAASco6CYQA)!

Here we tell the compiler that the variable `givenName` is a `string`. Later, if you try to assign it to a `number` the compiler will complain:

```typescript
let givenName: string;
```

You can start to compose smaller building blocks into larger objects. This `User` object has a few name fields which are strings, as well as an `age` field which is a number. Its `id` field is `readonly` and cannot be changed once set, enforced by the Typescript compiler. Its `familyName` field is _optional_, denoted by the question mark. This means that `user.familyName` can either be a `string`, `undefined`, or not a key in the object at all!

```typescript
type User = {
  readonly id: string;
  givenName: string;
  familyName?: string;
  age: number;
};
```

You can also express modality like this, using a _[union type](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)_ - it can only be one of the chosen two values:

```typescript
let familyName: string | undefined;
```

_Union types_ can get a lot more interesting. The compiler won't allow us to assign anything to the `eyeColor` variable but those exact values. We can't even assign a plain `string` to `eyeColor` because it might not be one of those five values!

```typescript
let eyeColor: 'brown' | 'green' | 'blue' | 'hazel' | 'gray';
```

Now we're starting to build up types describing more interesting structures:

```typescript
type BasicLogger = {
  info: (text: string) => void;
  warn: (text: string) => void;
  error: (text: string) => void;
  getLog: () => string;
  _lines: string[];
};
```

If you get a variable of type `BasicLogger` you can call four different functions on it. Three return nothing (`void` means 'no return value'), and take one parameter, `text`, a string. The fourth takes no parameters and returns a single string, the results of all of your logging so far. These are hard requirements, by the way - you can't call these functions with missing or mismatched parameters.

You can also go directly to the logger's `_lines` field and get the lines before they are assembled into the final `string` with `getLog()`. The `[]` addition to the type signifies that it's an array of that type.

There's one final bit of syntax you'll need to know to be able to describe the vast majority of Javascript data structures:

```typescript
type UserMap = {
  [lookupKey: string]: User | undefined;
};
```

We wanted to look up users really fast by their `id`, so a `UserMap` has dynamic keys that represent a user `id`, which point to full `User` objects. Sometimes. Because we can't be guaranteed that every `string` we provide to this object will return a `User`. But a lot of APIs are set up this way, a lot of Javascript objects are designed to be used like this.

```typescript
type UserMap = Record<string, User | undefined>;
```

That object structure is so common, in fact, that there's a built-in Typescript [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html) called `Record` which allows you to very succinctly declare the same `UserMap` type.

## Generics

With `Record` you saw a new syntax: `<` and `>` surrounding other types. This is the concept of _[generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)_. Let's start with a simpler example.

An array has a [certain shape in Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) - [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length), access to individual elements with [`[]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#common_operations), [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)/[`pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop), [`sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) and so on. And we saw above that you can declare an array of numbers with `number[]`. But there's another option ([Typescript playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBGCuBbARgUwE4QFwwILvQEMBPAHgRQwD4YBeGAbQF0BuAKArUwDoAHeCAAsAFAFYAlOwD0UmBnQhMHJFwh8BIgOTR0ASzABzTZLahIsAGaFEugDbEActdQ4d+gzAA+MeGAAmqBb6qH50cCoYarwgvMImbDIwALQpSWxsFr7AULrgMIiEANaoDqgA7vhEZAAqVHE4lSSktTAA3mwwMOioUPDoYHDleARNtXHsAL7piQASIABuGDALS1CCqDBQxLyoEMsWm+sQG-OEeoTItrum4NBdugaCUADKUHqGe-QFxaUVI2RuQx1ExmO5XCwvN7ubDDKqkQEGGhfIolcqNYjjaayADya1W22uoNgyBAICuhEgYW+qL+cJJZNQFOB7CJPmOmCpKN+6NIAFV2cysclUulCBBiGBgDBMpKcnlgIRbLZcP4ADIgAwAUQIimadQsYBwcToNAACgobMc9eIcOaQJbUHq2h1NuhiM7Op1ur1+jBCGVCLpLGBMZ0JjAFVBgIIYMJ5IpxB7PboDnGdegYPpoBTgKgQAdtQp0In2p7PaCGdxbBrhJoFUqVX51Vr0zhnvaeoJ3DAyqgwLAygpDABCTQAGjk6e42eAhRMZamZbWCjKk6L7DDbCmWx2MH5S3opczflcUMMG5gBl0izATkQLhgCIvVhs9jvqAA-Kf3gZJuwZdkuQDAYPT7ug9QwHaDp8gKSben0AxQboxzcN0EBkoswhHp0ugnjAmi4UkACM44up0V43u+OCaO297gKgpFli+diOM41G0eU6zdIxMATOIW4ZFkcrAT0zwYIs6DVLo97ZogsQ2pBFrIY6nDUHBPQIYp9rKahuwYagwgACKEFAqDcGAIBlHE-FTABwmHCuhaKBBSFWgiNBHvBvquWZ3QAFaoNkwhgEMTngZoy6WWFxgmFMbBihKUp2UBl4gMaR6shYPTRiEYFhP6gawPWypqhqYXCCBUBgfOEa3JW1YGLWWVRusfhgeO0rZa1YHcLhE7NTlbXstwFF9u+8SdJlXUhFJMlQNYvD5QGQYRoqJVNmV6YVaJ4kYLNuzzXJNUVlcVY1poA2tftsm8B1l0zdJB0LTVLpTS1IRhUthWrQ2pUtkWwiRWUYXHXVp0NU101+NF-VQyDkzpAYaXxIkIo3OYbIYOqICFPAi30CFq4ALKELw8JngYE5gYKrICBgACSTbIbABNDGJUDkz+gpsHT6DY7jvDTj0ta4SRE5Hrh1Gizxo23mx+EcfRpF8ewvOM6qzPcIQfh+CLfgkSYatM9AWs63rABMxjSLI8ZKLz-N40LUDCER4supL+HS2OLqy1RCsdkr3sqzz7IO4LxzOwR+sdQALIb7Lq5r2u60RJhAA)):

```typescript
const numbers: Array<number> = [];
```

Here we've created a `numbers` variable, an array that will only hold numbers. It's in the shape of an array but with a `number` _type parameter_ put everywhere an array element would go. For example, instead of any value, `pop()` now gives us a `number | undefined`. A `number` if there's something in the array, `undefined` if there's nothing in the array.

You can use _generic type parameters_ as you declare things as well. We've declared our own generic function here, which will create a new array of the chosen type:

```typescript
function makeNewArray<T>(): Array<T> {
  return new Array<T>();
}
```

We have the choice of explicitly providing the _generic type parameter_ when we call this function, or we can rely on the Typescript compiler's _type inference_ of what the parameter should be. Take a look at this code:

```typescript
const rightStrings = makeNewArray<string>();
const leftStrings: Array<string> = makeNewArray();

const booleans = makeNewArray<boolean>();
const users = makeNewArray<User>();
```

Note that we don't need to declare the type on both sides of the `=`. Choose one, and the other will be inferred. And of course, we can provide any type we want as the `T`.

Let's look at a more complex example. Here we've written a function that takes another async function, calls it and returns its value back. If an error is thrown, it will print that out before throwing that error again:

```typescript
async function callAndLogError<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      console.log('callAndLogError: Something went wrong!', error.stack);
    }
    throw error;
  }
}
```

The reason the `<T>` is useful here is that we can call `callAndLogError()` with any function taking no parameters and returning a promise, and that function's return type will flow back out. No loss of type fidelity, even as we do complex things with our functions, and that means that the compiler can better verify our code!

Like our `makeNewArray()` function above, _generic type parameters_ provide 'type hints' in many situations where you're using libraries or utility functions. If you're writing [React](https://reactjs.org/), some of these might be familiar:

```typescript
const userLookup = new Map<string, User>();
const userIdList = new Set<string>();

class UpdateNameForm extends React.Component<PropsType, StateType> { ... }
const buttonRef = React.createRef<HTMLButtonComponent>();
const [name, setName] = React.useState<string | undefined>("Someone Somewhere");
```

In each of these cases, the _generic type parameters_ allow the compiler to give us the checking we expect as we use these variables downstream. In the case of `React.Component` it allows the typescript compiler to ensure that we've properly implemented all of the necessary elements of a React [Component](https://reactjs.org/docs/components-and-props.html), with the right [props](https://reactjs.org/docs/components-and-props.html) and [state](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) shapes.

## Libraries and `interface`

While we're on the topic of libraries, I want to make something very clear: **every library is its own adventure**. It's easy to get caught up in the errors, thinking that you've done something wrong, or don't know Typescript well enough. But in many cases it's the library.

A given library may have crisp, comprehensive _type definitions_, or it might have lots of `any`. It might even have errors in its types, and working code will be flagged by the compiler. Or, as we've discussed, you may find a library with no _type definitions_ at all.

This brings us to the `interface` keyword. The truth is that interfaces are used a lot like the `type` keyword above, just with no `=` character. Here's the same `User` object from before, declared as an interface ([Typescript playground](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgKoGdrIN7IFDLJQRwAmA9iADYCeywpAXMumFKAOYDcByHwANwggAcnAC2EZq3YhuveOOC0xkgPzS2nHoTgcpyEAFdxAI2g8AvnjyhIsRCgxZcvCDQgBhclXJRmAOSmUOQA7iAByAA+yAEcxMKRMUFURhBJsQAWcABeEFQZcVBwNAFWNgiUrMhGmP5odcgAvDi8DIEMAMwBADS8-EKiEgYBAMrkkpTpfbr6zJ0ATDPI7l4+foHxEIl91ngA9PvIALSnNofIALJ0pr4cNZjoyHDI4uSkRlQoocBgmYbkZBgGgAB046B6LEBAElkCCjGAoZJXqBgOI4FQgaCIE9QHCqI4gYD9IjxDQDkdCJVSChKuIwVROIwKcgACpwADWKBgIXEzEyYDAIPQjEO-D+RlMADo6ft0JVBSBKCBhOYoBx9rdyBqtaZ9p0AGwARjgEFMcAALEaAJyIUgAdmNMAAHPaIABWA0WiAW53uhBIAAMnWDBrggYQCwgcqgCH2wJBOM1IS5IGOjJAHOOCEyEAQXKgUtIUrA6BsNIQBOIr3enxQQRTwnToCzObzBci2DcAA8QX5EXZoPAkMhRr8vLn89AAEo4z5gVnY1qEQhGKBUZhdlcr4joHxCJgsLRyHQryynvaEQcOEcAeRBYGAVUXieXK4g3crRhpAFFu-YQAxAAZFsRWQUxyB8EgQAvNpwCHQkAAk4BAUgvigdAXxQLcVwzDkNGQAAKXd52YMdIE8ScC1ndB5ywgBKZoAD5kAEcgGFPQhhFIAjCMYpoWLYjjeEvFZe37ZBKzgdAnnIid2xcXgqSqNgjAQMA-EI8gHyfEAwPvR9n2xSFslQ9CwOQszoEw7F6M4lYQAARzSNJmEIih0VATRZA4fjBPY0hYL2C5TmOcs8yrFAOF8c1MRw69hxQAB1UAKFCN9CBgCAwBzZx6j45jkAABV5YBMAAHjypigrwIA)):

```typescript
interface User {
  readonly id: string;
  givenName: string;
  familyName?: string;
  age: number;
}
```

Now, why would you want to use an interface? The answer is _declaration merging_. Watch what happens if we put another `interface User` clause into this file - now that `User` interface has another required field:

```typescript
interface User {
  eyeColor: 'brown' | 'green' | 'blue' | 'hazel' | 'gray';
}
const user: User = {
  id: 'id3',
  givenName: 'Someone',
  age: 32,
  eyeColor: 'green',
}
```

_Declaration merging_ is how you fix types from a library you're using, or provide your own types from scratch, or even add a few fields to `window`. Because most exported library types and just about all built-in _type definitions_ are interfaces.

It turns out that augmenting a library and providing your types from scratch look the same. [`broken-link-checker`](https://www.npmjs.com/package/broken-link-checker) is a module my blog uses to check for broken links, and it doesn't have type definitions. [These are the minimal types](https://github.com/scottnonnenberg/blog/blob/361aeba419acd761f87e564e485cce03036a0c2e/src/types/broken-link-checker.d.ts) needed to make my code compile:

```typescript
declare module 'broken-link-checker' {
  export interface SiteCheckerResultType {
    url: {
      resolved: string;
    };
  }

  interface OptionsType {
    excludeExternalLinks: boolean;
  }
  interface HandlersType {
    link?: (result: SiteCheckerResultType) => void;
    end?: () => void;
  }

  export class SiteChecker {
    constructor(options: OptionsType, handlers: HandlersType);
    enqueue: (domain: string) => void;
  }
}
```

Augmenting globals requires a slightly different syntax. You can extend `window`, `Array`, `HTMLButtonElement` but I suggest that you keep it to `window`, and keep it to a minimum!

```typescript
declare global {
  interface Window {
    fetchUser: () => Promise<User>;
  }
}
```

It's worth it to add _type definitions_ like this, because the alternative is to leave an `any` in the code. And an `any` means that you're getting very little checking! It's almost like writing plain Javascript, and we don't want that!

## Exhaustive checks and `never`

We've talked about a lot of the basic building blocks of working with Typescript. Now let's talk about a particularly cool kind of validation that Typescript can do for you: _exhaustive checks_.

Let's go back to eye color ([Typescript Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAoiEGED2AbJAnKBeKByARukgO4B2uUAPngOboQTlV74oCuEF1uAFgIYAvCCi610fELgDcAKBkAzNqQDGwAJZJSUMEWUQAzvriJUGABTLT6AFyx4yNOgCUt0mwC2+CJgDeMqFBq8lAWVthYOAREZLhOUH4BAfTAbOhaAIyyAQC+UML60EEhlo7hkXQM5HEJicmpWgBMWVC5+YXBoaURkawcsfH+tRApaVAAzM2tKAWBHSUYZXj8QiLVg0nD9VAALJN50+3FYd1iEv01GyNaAKx7bQOJUJak+sDaRKwQ7q4QAG7e2CeVmaAWAPGiUFIEGIsHQRHQZgABgAxJBKAAmUCUAGtSCQtBB4EDHLYACQ+HRIT7ubKIpyTGTZOQAemZUAAKkgoAVoHwCXCFpooCg1FCoOlrgAaKDAdAgKB8dHo0U0BWQ6HEhbALnGBwYGSsjlcnkK-nwqBCkVi7bS+juJD-FjRJjyIjuOwmRwGtkATTRTz5CumxoYeQF6H0sygIDR1m9jwAtAqlaakGCASdcHQzk8eBBlNiFW903lSOj44kk4rMco8wXI-IFr8+OwDJC04EtLqrDIgA)):

```typescript
type EyeColor = 'brown' | 'green' | 'blue' | 'hazel' | 'gray';

function processEyeColor(color: EyeColor): number {
  if (color === 'brown') {
    return 1;
  } else if (color === 'green') {
    return 2;
  } else if (color === 'blue') {
    return 3;
  } else if (color === 'hazel') {
    return 4;
  } else if (color === 'gray') {
    return 5;
  } else {
    const problem: never = color;
    throw new Error(`Found unknown eye color: ${problem}`);
  }
}
```

First, we've created a _type alias_ here, giving the convenient name of `EyeColor` to the type we declared inline previously.

Next, `processEyeColor` checks against all potential values of the `EyeColor` type, and then throws an error if it finds something unexpected.

The key to ensuring that this set of checks is _exhaustive_, checking for all potential values of `EyeColor`, is this new keyword `never`. This is a special value which indicates that there should be an error if the Typescript compiler believes that we could ever get to that line.

With this construction, the compiler guides us as we make changes to this code - if we add a new value to the `EyeColor` type, we'll get errors until `processEyeColor` gets another check ensuring that it remains _exhaustive_!

Once more we return to _type inference_. Typescript keeps track of the potential values of variables through the flow of your functions. At the top of the function, that `color` variable could have five values, and then with each successive comparison, those potential values [_narrow_](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) until no values are possible, or `never`. To get a feel for this, hover over variables in [Typescript Playground](https://www.typescriptlang.org/play/) or in [VSCode](https://code.visualstudio.com/) and follow along.

## Runtime types and `unknown`

With the _exhaustive checks_ above, you might be wondering: couldn't a value other than `EyeColor` somehow get into that variable? Sure you could present a `<select>` to the user to constrain their input, but what if an old version of the app had more options? Then your types don't describe reality!

One choice might be to relax your types to prevent any strong assumptions about their shape. But this gets dangerous when you start loading JSON from disk, pulling JSON from web APIs, pulling JSON from your [MongoDB](https://en.wikipedia.org/wiki/MongoDB) databases. Three are too many sources of questionable data!

There's another option: runtime validation of your compile-time types. If you've used [`hapi`](https://hapi.dev/), you've used [`joi`](https://www.npmjs.com/package/joi) to write schemas for validation of your incoming and outgoing data. And you're maybe thinking that you don't want to define Typescript types and `joi` types. And I agree - that's tedious.

To solve that, I suggest a library called [`zod`](https://github.com/colinhacks/zod). It allows you to define runtime types using its API, which are then available to Typescript for compile-time validation. Here's the same code to process eye color from above, with both runtime and compile-time guarantees that our code works ([Typescript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzgLzgXzgMyhEcDkyEAJvgNwBQFAxhAHYDO8ApgJ7MDCEANtAMrUAFsxABDOAF4UAOmZ0AriAAUAbXwAjHAHc6+ADQEA5lGZz9Bdd3nNz+QaOTNut46Nb4AugEpKMVmGY4AFF2Ll4oSRlgOkxmKAAePwCITDg2Th5+IRFRAD5KCmYAD0hYLHk6ahhgejgwHGpmBgYQjPClaNoQaMMALjgKgGs6CB0vfoUQdTjECjg4WkZ4MFEoBmZiSPSwrOExaQZRWIAFVfWOytwenzm4YFSlAEIVtY2D+WpG5q9Z+fmYQTaOB0ZhaYJQHBQJQAA3qEC+LVCmSg-QAYqJgNwNnAYBA6mdAukFsj+gASBAvdbEWQQ6DSTDcUQwGByJReNDQm7zNBUeaLJjE8KRSlvYhM0QFeb3OBKWhCiQKtJI8ICPaiWSTaSaUZ0H4IW7zEwweRQOhwACMlG5aW46zuDzl0Ekiu2yNVOQ1imkxlMut+fyNJrNACYregbXbpbLkc6pK6Vdl9nIvZZrHqDXBA6a4ABmMMYJyRh0xhVx5W7D3JkDSeyObjpv6Z5jG7MAFnzEcCUcdEVLSraFaTmtcrAbAebQbgAFYO4XAvrG-zljhLCIJswAG4zKQ9sP-QGjYGg8GQmGoiAVTZDEY6fuC6BkikrrEgDlc9AUHkUOEI1o7KEaNoug3D+TSIgOAE+mYIENGBf7IkoGhWDYMHwnB5YAbWTj4Khv4YYhI44QUAD0xFwAAchA8DiF0YCYswAC01QgIStJQAY0zUKI8h2i8ogsSyETAAwOL+IE146hQpFwAAShUzGsZC-T4KBzTweEaIYlimy4virx3j2j4itScSQvSjLMqy7L4N+sFqfh+BQKIdDELgRFUNJADyqS0Ca6wGKwF5wAwggXtwmxwuooiWKwTYtmaDC4IExDMJg3HcPAG6iMhcDCCYdxLMwoibCkOIHloPRwM5aRsY8VBAA)):

```typescript
import { z } from 'zod';

const eyeColorSchema = z.enum(['brown', 'green', 'blue', 'hazel', 'gray']);
type EyeColor = z.infer<typeof eyeColorSchema>;

export function processEyeColor(incoming: unknown): number {
  const parsed = eyeColorSchema.safeParse(incoming);
  if (!parsed.success) {
    throw new Error(`processEyeColor: Failed to parse eye color: ${parsed.error.flatten()}`);
  }

  const color = parsed.data;

  if (color === eyeColorSchema.enum.brown) {
    return 1;
  } else if (color === eyeColorSchema.enum.green) {
    return 2;
  } else if (color === eyeColorSchema.enum.blue) {
    return 3;
  } else if (color === eyeColorSchema.enum.hazel) {
    return 4;
  } else if (color === eyeColorSchema.enum.gray) {
    return 5;
  } else {
    const problem: never = color;
    throw new Error(`Found unknown eye color: ${problem}`);
  }
}
```

The key is the `z.infer` call which allows Typescript to use _type inference_ to give you access to the type you declared in code. It's the same set of values as before, but `zod` gives us access to the values at runtime as well (like `eyeColorSchema.enum.brown`).

We use `unknown` as the parameter of `processEyeColor`, because we have no idea where this data came from, and we want Typescript to force us to validate it before we use it. `unknown` is the opposite of `any` - you can't use it until you've explicitly verified its shape. Here we could dispense with the parsing and do direct `===` checks against the `unknown` value, but then we'd lose our exhaustiveness guarantee.

That's why we use our schema to parse the value into our expected type. `safeParse` takes `unknown` and [returns](https://github.com/colinhacks/zod#safeparse) a _discriminated union_ type:

```typescript
{ success: true; data: T; } | { success: false; error: ZodError; }
```

These kinds of unions take advantage of Typescript type _narrowing_. If `success` is true, we know that we have a `data` field of the type we expect. If `success` is false, we have an `error` field.

## Recommended configuration

Now you're ready to start using Typescript in your project! You should be able to turn these [compiler type-checking options](https://www.typescriptlang.org/tsconfig#Type_Checking_6248) on quite easily, without a whole lot of pain fixing the issues found:

```json
"allowUnreachableCode": false,
"allowUnusedLabels": false,
"alwaysStrict": true,
"noFallthroughCasesInSwitch": true,
"noImplicitReturns": true,
"noImplicitThis": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"strictBindCallApply": true,
```

I would advise that you turn this next set on as well, but I acknowledge that they might require more changes to your code. It's worth it, though, because the things found are all potential bugs, either now or in the future. In the case of `noImplicitAny`, it means a lurking `any`, which means you're pretty much just writing Javascript!

```json
"noImplicitAny": true,
"noImplicitOverride": true,
"noPropertyAccessFromIndexSignature": true,
"noUncheckedIndexedAccess": true,
"strictFunctionTypes": true,
"strictNullChecks": true,
"strictPropertyInitialization": true,
```

The rest of the type checking rules are, in my view, debatable:

```json
// Almost an aesthetic decision - what does an optional field mean?
"exactOptionalPropertyTypes": true,
// Are you sure that you're always catching real Error objects? If not, turn this on
"useUnknownInCatchVariables": true,
// The definition changes over time!
"strict": true,
```

Alright, with that you've got the type-checking under control.

Now, how will you go from Typescript to the code you ship? You can [tell Typescript to output your code](https://www.typescriptlang.org/tsconfig#outDir) to a `dist/` location, which works fine for a node module or Node.js app. For this method, you could also try a [cutting-edge compiler written in rust](https://swc.rs/) - it wouldn't type-check, but you can easily do that with `tsc --noEmit` like we did above.

If you're building via [Webpack](https://webpack.js.org/), you need to decide: do you want your Webpack build to fail with type-checking failures? Typescript can still generate workable code even if type-checking fails, so this may not be what you want since it slows down the build. You can [turn off type checking in `ts-loader`](https://github.com/TypeStrong/ts-loader#faster-builds), then again use `tsc --noEmit` for type-checking.

Finally, do you want to get even more strict and start using [Typescript-aware `eslint`](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)? Know that it can be very slow - you'll want to use [eslint's caching feature](https://eslint.org/docs/2.0.0/user-guide/command-line-interface#caching). I think it's worthwhile; it has a [whole lot of useful rules](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin). To fully take advantage of Typescript's type-checking, I recommend that you enable at least three rules: [@typescript-eslint/no-explicit-any](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md), [@typescript-eslint/explicit-module-boundary-types](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md), and [@typescript-eslint/no-non-null-assertion](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-assertion.md).

## Don't delay!

Start the move to Typescript sooner rather than later! You can start small, but you and your team will move faster once you have comprehensive types in place, allowing Typescript to give you good compile-time guardrails.

At the very least, write new features in Typescript, avoiding `any` or other type compromises. Otherwise, every new feature you write will take you further from the confidence that Typescript can provide!

I'd love to hear about your challenges in moving to Typescript - please reach out. Maybe I can help, and maybe I can help others in my next article like this!

---

### Further exploration:


* [How to write JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) (key: the file has to end in `.tsx`)
* [String Enums](https://www.typescriptlang.org/docs/handbook/enums.html#string-enums) are probably better than our plain `EyeColor` type above - you get runtime access to the values without `zod`!
* [ReadonlyArray](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonlyarray-type) goes beyond `readonly` fields. It prevents calls to functions that mutate in-place too. Use it.
* [Optional parameters](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters)
* [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) and [construct signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#construct-signatures)
* The built-in types - you can really learn something from these comprehensive type definitions:
    * [Javascript/ECMAScript 5](https://github.com/microsoft/TypeScript/blob/b0ab2a54bbd00a35b70432611c5cd01e5eeb5279/lib/lib.es5.d.ts#L25-L26) - From `NaN` to `Object`
    * [The DOM](https://github.com/microsoft/TypeScript/blob/b0ab2a54bbd00a35b70432611c5cd01e5eeb5279/lib/lib.dom.d.ts#L4238) - From `Document` to `MouseEvent` to `indexedDB`
* Try combining your types into an _[intersection type](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)_ like this: `LeftType & RightType`. You do this with interfaces as well, with [`extends`](https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types).
* [`keyof`](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) and [`typeof`](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) to get meta with your types
* [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) to get even more meta: [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)/[Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype), [Readonly](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype), [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)/[Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys), [Extract](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)/[Exclude](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion), [ReturnType](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)/[Parameters](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype). You can [find them in the code](https://github.com/microsoft/TypeScript/blob/b0ab2a54bbd00a35b70432611c5cd01e5eeb5279/lib/lib.es5.d.ts#L1468-L1541) - most are implemented in plain Typescript, not the compiler special-cases.
* [Constraints on generic type parameters](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) - without these, your variables of type `T` will always be able to be anything, which will greatly limit what you can do with them.
* [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
* [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
