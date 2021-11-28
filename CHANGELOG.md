# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.6.0](https://github.com/scottnonnenberg/blog/compare/v2.5.0...v2.6.0) (2021-11-28)


### Features

* **post:** New post "A Typescript onramp", fix in-header code snippets ([8a87181](https://github.com/scottnonnenberg/blog/commit/8a871819227914ab1a2db39a9cead514f3fc1e40))


### Bug Fixes

* **lint:** Add missing .eslintrc.js files in /test and /script ([5b765aa](https://github.com/scottnonnenberg/blog/commit/5b765aa7b1cd15679cd495cdbeeee684d532c9ef))

## [2.5.0](https://github.com/scottnonnenberg/blog/compare/v2.4.0...v2.5.0) (2021-11-26)


### Features

* **lint:** Add eslint cache for faster small changes ([2a534ff](https://github.com/scottnonnenberg/blog/commit/2a534ff266d2f30ee79d86f832b764df1bdc7914))
* **lint:** Update to my latest lint libraries, get lint clean ([8bb1f53](https://github.com/scottnonnenberg/blog/commit/8bb1f53e2daba406d98358155857e3034dcce730))
* **typescript:** Update typescript and turn on some additional checks ([0d86788](https://github.com/scottnonnenberg/blog/commit/0d86788eea35c20ed38370ff1137577ecaa38936))

## [2.4.0](https://github.com/scottnonnenberg/blog/compare/v2.3.0...v2.4.0) (2021-11-14)


### Features

* **post:** New post "Don't write Javascript" and new typescript tag ([46f049c](https://github.com/scottnonnenberg/blog/commit/46f049cf679edcf933a6b811335a38c88e7f6fe8))

## [2.3.0](https://github.com/scottnonnenberg/blog/compare/v2.2.0...v2.3.0) (2021-10-31)


### Features

* **post:** New post "Better web development and deployment" ([c59609f](https://github.com/scottnonnenberg/blog/commit/c59609fcc5e2fc48d4b07a673b8802d6997e9837))


### Bug Fixes

* **post:** Fix a couple bugs in 'ESLint Part 2: Contribution' ([60f7217](https://github.com/scottnonnenberg/blog/commit/60f72172c2b6254d77118f7b97fabc5e464a3bc4))
* **post:** Fix formatting bug in 'Focus: Dev Produtivity Tip [#2](https://github.com/scottnonnenberg/blog/issues/2)' ([f4ef47e](https://github.com/scottnonnenberg/blog/commit/f4ef47e7fffb5e0fb60c85b823aad6fb7e85919e))

## [2.2.0](https://github.com/scottnonnenberg/blog/compare/v2.1.1...v2.2.0) (2021-10-18)


### Features

* **dates:** Eliminate short/longDate in favor of one renderDate ([ec91e13](https://github.com/scottnonnenberg/blog/commit/ec91e13006384d5ea51ba1d2e0e06d5c4fb2e239))
* **new-post:** The great gatsby upgrade ([c249e10](https://github.com/scottnonnenberg/blog/commit/c249e100eaf2f1a7640e36f086eb0e60fd20d757))
* **post:** Update old Gatsby posts ([aeac0ae](https://github.com/scottnonnenberg/blog/commit/aeac0ae7e5fbdc6ab8c0678ba211731e368e6bf3))
* **update-commit:** Pages can now link to their update commit ([ebbff0c](https://github.com/scottnonnenberg/blog/commit/ebbff0cfa3f6c85c595b4197a423ba60e95a948d))
* **updated-date:** Posts can now have an updated date ([8f5e311](https://github.com/scottnonnenberg/blog/commit/8f5e3110f4b9ebc3983a04469d47e5dfd13a7ac2))

### [2.1.1](https://github.com/scottnonnenberg/blog/compare/v2.1.0...v2.1.1) (2021-09-23)


### Bug Fixes

* **deps:** Add missing js-string-escape to yarn-offline-cache ([3a3848b](https://github.com/scottnonnenberg/blog/commit/3a3848b3a9ef54cc91353189ed017965d4928701))

## [2.1.0](https://github.com/scottnonnenberg/blog/compare/v2.0.0...v2.1.0) (2021-09-23)


### Features

* **gatsby:** Upgrade to Gatsby v3 ([0c51a24](https://github.com/scottnonnenberg/blog/commit/0c51a2415778601d36abba1891741817babc50eb))


### Bug Fixes

* **css-minify:** Restore CSS minification with Gatsby 3/Webpack 5 patch ([2e65e4d](https://github.com/scottnonnenberg/blog/commit/2e65e4d7789adf60bc1c49df41ff34df033b8984))
* **img:** Fix capitalized JPG extensions - now they're responsive ([a66805c](https://github.com/scottnonnenberg/blog/commit/a66805c370b89fbdb4645b9785c2d22e19adc857))
* **typed-css:** Fix typed css by removing typescript plugin ([c9d17e6](https://github.com/scottnonnenberg/blog/commit/c9d17e60476bb2f4894249753e68d35d88644847))
* **webpack:** Eliminate PackFileCacheStrategy/FileSystemInfo warnings ([2b70f92](https://github.com/scottnonnenberg/blog/commit/2b70f92e772146e49f538cb658a0eb3b59cda464))

## [2.0.0](https://github.com/scottnonnenberg/blog/compare/v1.20.2...v2.0.0) (2020-12-22)


### Features

* **archive:** Point '20 years online' links to new endpoint ([8eafa67](https://github.com/scottnonnenberg/blog/commit/8eafa67389bea71005040dcfc49e9cf97bc74876))
* **assets:** Pull assets local, introduce image-processing plugins ([f40c7ea](https://github.com/scottnonnenberg/blog/commit/f40c7ea6cdfb76e849b8e1ba255aea07ede6dced))
* **caching:** Long timeout for static files, five minutes for pages ([e163c2f](https://github.com/scottnonnenberg/blog/commit/e163c2f5e51364782f94504979d9d3882fe88b0b))
* **ci:** GitHub Actions for CI, using yarn offline cache for perf ([c694949](https://github.com/scottnonnenberg/blog/commit/c6949494f896e6f7f9ef81516629a5ce4afd2bf0))
* **css-modules:** Put component-specific styles into <name>.module.less ([ebedb0e](https://github.com/scottnonnenberg/blog/commit/ebedb0e266417ab20c8250acecf2248475750053))
* **docs:** Improved readme and more comprehensive explanatory comments ([76a87e0](https://github.com/scottnonnenberg/blog/commit/76a87e09648c02103d0873b2876aaece8c62eadc))
* **gatsby:** Move to Gatsby V2 ([7dfc4b3](https://github.com/scottnonnenberg/blog/commit/7dfc4b39618ccc77c324b31677257f919c5e794e))
* **lighthouse-100:** Proper contrast, meta description, h3 tag order ([1093019](https://github.com/scottnonnenberg/blog/commit/10930193d2114d26ea3cd7ffc1ef89961663bf03))
* **link-to-github:** Link to post on GitHub in post.tsx ([a1a2ecd](https://github.com/scottnonnenberg/blog/commit/a1a2ecdb04688c77b36d4f0ded9cf53ef354de7d))
* **page-data:** Further decrease page-data size with better queries ([494452d](https://github.com/scottnonnenberg/blog/commit/494452d8643de9bfe164762a400cda4f690ae78b))
* **page-data:** Take page-data.json size down by precomputing previews ([fe72525](https://github.com/scottnonnenberg/blog/commit/fe725251510d8fb75ef9d23f022dc622a5ae9182))
* **perf:** Minify css classes, no inline CSS, strip unnecessary markup ([1f861fb](https://github.com/scottnonnenberg/blog/commit/1f861fb22fec4e502dc7172e4840d5e10f4dd811))
* **prettier:** Introduce prettier and update all files ([c9b8984](https://github.com/scottnonnenberg/blog/commit/c9b89840b2b7c0db96e9d89df0ff022ebbfd10b6))
* **redirects:** Add vercel.json for redirects on tumblr-era posts ([dc794ec](https://github.com/scottnonnenberg/blog/commit/dc794ec6984f7e4ae28e46abf0314ace497cca98))
* **remove-lodash:** To make the bundle smaller, simplify ([cf55baa](https://github.com/scottnonnenberg/blog/commit/cf55baaffc3af2ff61a961afd10a2af5b4d93f29))
* **remove-moment:** To make the bundle smaller, simplify ([40d7254](https://github.com/scottnonnenberg/blog/commit/40d7254ff4618a4cb68618bd31d896a8e44bb2db))
* **remove-underscore.string:** To make the bundle smaller, simplify ([fa8f380](https://github.com/scottnonnenberg/blog/commit/fa8f3805fcd3acf1f7fd6086e51de0ea371ce91b))
* **static:** Pull author image into assets, blur image during loading ([4e38909](https://github.com/scottnonnenberg/blog/commit/4e38909d39d27ae945fd6666385b420c3a72a2aa))
* **storybook:** Initial storybook setup, basic set of stories ([9f3fb16](https://github.com/scottnonnenberg/blog/commit/9f3fb16d6104c76e2b61d8ea39a56976f56a7919))
* **style:** Use SCSS instead of LESS ([ee9614c](https://github.com/scottnonnenberg/blog/commit/ee9614c5db78ef8cc08db7bdbc1b1d35f425c540))
* **trailing-slash:** Force trailing slashes, update redirects ([3fc018b](https://github.com/scottnonnenberg/blog/commit/3fc018bc79b86a8d98d900a0be4f5a8b86433901))
* **typed-css:** d.ts files generated for SCSS Modules on develop/build ([2ecc642](https://github.com/scottnonnenberg/blog/commit/2ecc642603f8598ea6c4b757814400bbbed935a5))
* **typescript:** The great move to typescript! ([fc57953](https://github.com/scottnonnenberg/blog/commit/fc57953f1d8f8ca2c5f9b04e5f0d4fbbbb5dc184))


### Bug Fixes

* **caching:** Ensure that page-data files are not cached long-term ([2185e1b](https://github.com/scottnonnenberg/blog/commit/2185e1bd431e49bf2630131fa35a45c4bfca25ed))
* **check-deep-links:** Capture all deep links, even to same page ([85fcd2c](https://github.com/scottnonnenberg/blog/commit/85fcd2ce0472904c832c9c821e2d21a17d794732))
* **CI:** Get CI based on Github Actions passing ([040ac8d](https://github.com/scottnonnenberg/blog/commit/040ac8d1ce1a8da822df91bd754156770f95933f))
* **dependency:** Remove js-only dependencies after bad rebase ([8a86804](https://github.com/scottnonnenberg/blog/commit/8a868043bd461ffe72f1f06014aa654225dc4727))
* **deploy:** Add mailchimp.ts to project to support build ([f99d550](https://github.com/scottnonnenberg/blog/commit/f99d5504d643468188005e05aa3a7b4591e754ae))
* **headers:** Remove h5 from ReadMore to eliminate out-of-order warning ([aab6c98](https://github.com/scottnonnenberg/blog/commit/aab6c983f7abee22be82a5a0acddcfee8896eadf))
* **meta-tags:** Ensure post images are absolute, and images to non-posts ([f7037a0](https://github.com/scottnonnenberg/blog/commit/f7037a0df504eb4c23d0191ead3a21ce6204d4d4))
* **metadata:** an application/ld+json script tag that react-helmet likes ([ed070db](https://github.com/scottnonnenberg/blog/commit/ed070db64e83b504af787fbc2c146114eb59f2cc))
* **mobile:** Tighten up EmailSignup, fix index top link wrapping ([9321d50](https://github.com/scottnonnenberg/blog/commit/9321d50ebda30d9a6d0744264bdbf7bbaef05f98))
* **package.json:** Production is for stuff in bundle, rimraf not rm ([6d9a726](https://github.com/scottnonnenberg/blog/commit/6d9a7265a72657c7d56e15f2d2e940f0a59f5d9f))
* **post:** A couple tweaks to 'From Tech Person...' post ([0dfa4db](https://github.com/scottnonnenberg/blog/commit/0dfa4db99eda603046c4fb59451ae8cbb3c51e84))
* **post:** A little tweak to 'Top ten pull requests' ([dd7b33f](https://github.com/scottnonnenberg/blog/commit/dd7b33f404956f1ab5f1be2a5818d832193c9afb))
* **post:** Add links to referenced sections at top of Haskell post ([2e9cb87](https://github.com/scottnonnenberg/blog/commit/2e9cb87f66c8e3f2a674e9a7c63b741a70ebb7ca))
* **post:** Fix code fence on 'better async redux' post ([f75833c](https://github.com/scottnonnenberg/blog/commit/f75833cc6a1ceef85d5213406f923480a3a5fba4))
* **post:** Fix formatting of 'Systems and Incentives' post ([309af88](https://github.com/scottnonnenberg/blog/commit/309af8857ac625ea6d58a6cd8f640c47a5e14761))
* **post:** Fix links containing _ within _ for emphasis ([f612c86](https://github.com/scottnonnenberg/blog/commit/f612c86ef0456b8bf98dab00001d7f5d3d12ab87))
* **post:** Fix list on '12 things I learned from Microsoft' post ([a3ffc5d](https://github.com/scottnonnenberg/blog/commit/a3ffc5d11f87a25d3c6a2872ff840746fcc095d3))
* **post:** Improve flow of 'Hard won lessons: Five years...' post ([bbab72a](https://github.com/scottnonnenberg/blog/commit/bbab72aaba0f83a776203f886d6e0fdecc4f6dac))
* **post:** Slight change to 'Six Books' post for better flow ([10b2699](https://github.com/scottnonnenberg/blog/commit/10b2699092d06d33389aea9d63e767d5eb479873))
* **project-file:** Properly exclude scss.d.ts files ([b4ce8e3](https://github.com/scottnonnenberg/blog/commit/b4ce8e3c57c523a9913696faf5a99834231a6dd7))
* **style:** Reintroduce orange as background of EmailSignup ([518aa91](https://github.com/scottnonnenberg/blog/commit/518aa91dbe6e4dbbd0006ab6695bc41ef7eb4edb))
* **style:** Remove half-height line at bottom of multiline code blocks ([126a7f8](https://github.com/scottnonnenberg/blog/commit/126a7f86b4fcb7e8f170b2b02518645d6af10fbd))
* **styles:** Remove all link highlighting on hover. It's time. ([c137a19](https://github.com/scottnonnenberg/blog/commit/c137a1915053cbac3d5026a27379ca65d646a606))
* **tag-page:** Remove duplicated posts in list ([abf2a32](https://github.com/scottnonnenberg/blog/commit/abf2a3203a21b9acc7e531ceea33098d1c6b13e2))

<a name="1.20.2"></a>
## [1.20.2](https://github.com/scottnonnenberg/blog/compare/v1.20.1...v1.20.2) (2018-06-26)


### Bug Fixes

* **post:** Add dates to the top of articles ([16b89f7](https://github.com/scottnonnenberg/blog/commit/16b89f7))



<a name="1.20.1"></a>
## [1.20.1](https://github.com/scottnonnenberg/blog/compare/v1.20.0...v1.20.1) (2017-06-01)


### Bug Fixes

* **post:** Update health checkin - proper CDN, a few tweaks ([a62dcb9](https://github.com/scottnonnenberg/blog/commit/a62dcb9))



<a name="1.20.0"></a>
# [1.20.0](https://github.com/scottnonnenberg/blog/compare/v1.19.1...v1.20.0) (2017-05-31)


### Features

* **post:** Add 'A holistic health checkin' ([eb35789](https://github.com/scottnonnenberg/blog/commit/eb35789))



<a name="1.19.1"></a>
## [1.19.1](https://github.com/scottnonnenberg/blog/compare/v1.19.0...v1.19.1) (2017-05-17)


### Bug Fixes

* **post:** Replace iMessage with Twitter DMs ([4cbb239](https://github.com/scottnonnenberg/blog/commit/4cbb239))



<a name="1.19.0"></a>
# [1.19.0](https://github.com/scottnonnenberg/blog/compare/v1.18.0...v1.19.0) (2017-05-17)


### Bug Fixes

* **post:** Add haskell type annotation to code sample ([3000b99](https://github.com/scottnonnenberg/blog/commit/3000b99))


### Features

* **post:** Add Starting on Signal post ([bad3983](https://github.com/scottnonnenberg/blog/commit/bad3983))



<a name="1.18.0"></a>
# [1.18.0](https://github.com/scottnonnenberg/blog/compare/v1.17.0...v1.18.0) (2017-05-04)


### Bug Fixes

* **post:** Tune up my language history in ESLint Part 3 ([811483a](https://github.com/scottnonnenberg/blog/commit/811483a))


### Features

* **bio:** Update bio to reflect changed status ([d5afbc2](https://github.com/scottnonnenberg/blog/commit/d5afbc2))
* **tags:** Introduce some needed new tags: elixir, functional ([9a7b27f](https://github.com/scottnonnenberg/blog/commit/9a7b27f))



<a name="1.17.0"></a>
# [1.17.0](https://github.com/scottnonnenberg/blog/compare/v1.16.2...v1.17.0) (2017-05-04)


### Bug Fixes

* **post:** Fix broken link in Haskell post ([1503da9](https://github.com/scottnonnenberg/blog/commit/1503da9))


### Features

* **popularity:** Post rankings now up-to-date as of 4/30 ([6ac3de6](https://github.com/scottnonnenberg/blog/commit/6ac3de6))
* **post:** Add new Haskell blog post ([868eb99](https://github.com/scottnonnenberg/blog/commit/868eb99))



<a name="1.16.2"></a>
## [1.16.2](https://github.com/scottnonnenberg/blog/compare/v1.16.1...v1.16.2) (2017-04-21)


### Bug Fixes

* **post:** Fix the link to Yarn in Hard-won Node.js lessons post ([0f0550f](https://github.com/scottnonnenberg/blog/commit/0f0550f))



<a name="1.16.1"></a>
## [1.16.1](https://github.com/scottnonnenberg/blog/compare/v1.16.0...v1.16.1) (2017-04-20)


### Bug Fixes

* **typo:** Fix a few typos in Hard-won Node.js lessons post ([a918e2a](https://github.com/scottnonnenberg/blog/commit/a918e2a))



<a name="1.16.0"></a>
# [1.16.0](https://github.com/scottnonnenberg/blog/compare/v1.15.1...v1.16.0) (2017-04-19)


### Bug Fixes

* **deps:** Add react-dom dependency as requested by enzyme ([44deb46](https://github.com/scottnonnenberg/blog/commit/44deb46))
* **post:** Fix link to mongodb in Node.js stories post ([b5eab54](https://github.com/scottnonnenberg/blog/commit/b5eab54))
* **post:** Remove . in "Node.is" (was being interpreted as url) ([0b423d6](https://github.com/scottnonnenberg/blog/commit/0b423d6))


### Features

* **post:** Add Node.js stories post, new lessons learned tag ([d5119a8](https://github.com/scottnonnenberg/blog/commit/d5119a8))
* **tag:** Add lessons-learned tag to some old posts ([b563671](https://github.com/scottnonnenberg/blog/commit/b563671))



<a name="1.15.1"></a>
## [1.15.1](https://github.com/scottnonnenberg/blog/compare/v1.15.0...v1.15.1) (2017-04-06)


### Bug Fixes

* **post:** Fix a few typos in "Better Git configuration" ([885071a](https://github.com/scottnonnenberg/blog/commit/885071a))



<a name="1.15.0"></a>
# [1.15.0](https://github.com/scottnonnenberg/blog/compare/v1.14.2...v1.15.0) (2017-04-05)


### Features

* **post:** Add "Better Git configuration" ([aedcfe5](https://github.com/scottnonnenberg/blog/commit/aedcfe5))
* **tag:** Add 'git' tag ([d0537f4](https://github.com/scottnonnenberg/blog/commit/d0537f4))



<a name="1.14.2"></a>
## [1.14.2](https://github.com/scottnonnenberg/blog/compare/v1.14.1...v1.14.2) (2017-03-28)


### Bug Fixes

* **post:** Add eslint tag to Flow post ([1ae8fce](https://github.com/scottnonnenberg/blog/commit/1ae8fce))



<a name="1.14.1"></a>
## [1.14.1](https://github.com/scottnonnenberg/blog/compare/v1.14.0...v1.14.1) (2017-03-21)


### Bug Fixes

* **post:** Add tags to dev productivity post ([a9643ca](https://github.com/scottnonnenberg/blog/commit/a9643ca))



<a name="1.14.0"></a>
# [1.14.0](https://github.com/scottnonnenberg/blog/compare/v1.13.2...v1.14.0) (2017-03-21)


### Bug Fixes

* **post:** Renamed Elixir post to reflect post date ([1da9e4a](https://github.com/scottnonnenberg/blog/commit/1da9e4a))


### Features

* **post:** Add "Think in alternatives" post ([d7eee8e](https://github.com/scottnonnenberg/blog/commit/d7eee8e))



<a name="1.13.2"></a>
## [1.13.2](https://github.com/scottnonnenberg/blog/compare/v1.13.1...v1.13.2) (2017-03-14)


### Bug Fixes

* **post:** Fix a few typos in "Getting started with Elixir" ([fdc8780](https://github.com/scottnonnenberg/blog/commit/fdc8780))



<a name="1.13.1"></a>
## [1.13.1](https://github.com/scottnonnenberg/blog/compare/v1.13.0...v1.13.1) (2017-03-08)


### Bug Fixes

* **post:** Fix link to dangerous cliffs ([b43c895](https://github.com/scottnonnenberg/blog/commit/b43c895))



<a name="1.13.0"></a>
# [1.13.0](https://github.com/scottnonnenberg/blog/compare/v1.12.0...v1.13.0) (2017-03-07)


### Bug Fixes

* **post:** Fix double 'my' ([3a98fba](https://github.com/scottnonnenberg/blog/commit/3a98fba))
* **post:** Forward link in Agile series, other small fixes ([09e6ad2](https://github.com/scottnonnenberg/blog/commit/09e6ad2))


### Features

* **post:** Add post "Getting started with Elixir" ([c72a6f9](https://github.com/scottnonnenberg/blog/commit/c72a6f9))



<a name="1.12.0"></a>
# [1.12.0](https://github.com/scottnonnenberg/blog/compare/v1.11.1...v1.12.0) (2017-02-21)


### Bug Fixes

* **post:** Change 'agile' to 'Agile' in 'Technology of' title ([f6293a7](https://github.com/scottnonnenberg/blog/commit/f6293a7))


### Features

* **post:** Add "An Agile organization" ([df672d5](https://github.com/scottnonnenberg/blog/commit/df672d5))



<a name="1.11.1"></a>
## [1.11.1](https://github.com/scottnonnenberg/blog/compare/v1.11.0...v1.11.1) (2017-02-11)


### Bug Fixes

* **post:** Add v1/v2 to homepage links on 'twenty years online' ([bb175de](https://github.com/scottnonnenberg/blog/commit/bb175de))



<a name="1.11.0"></a>
# [1.11.0](https://github.com/scottnonnenberg/blog/compare/v1.10.0...v1.11.0) (2017-02-07)


### Bug Fixes

* **post:** Fix a couple typos in 'pull request review mistakes' ([8100e14](https://github.com/scottnonnenberg/blog/commit/8100e14))


### Features

* **post:** Add "2017: Twenty years online" ([bd98d40](https://github.com/scottnonnenberg/blog/commit/bd98d40))



<a name="1.10.0"></a>
# [1.10.0](https://github.com/scottnonnenberg/blog/compare/v1.9.1...v1.10.0) (2017-01-25)


### Bug Fixes

* **post:** Small typo in "Understand the problem" ([1fd130a](https://github.com/scottnonnenberg/blog/commit/1fd130a))


### Features

* **post:** Top 10 pull request review mistakes ([9a3c736](https://github.com/scottnonnenberg/blog/commit/9a3c736))
* **tag:** Add new tag: feedback-loop ([b3d6d66](https://github.com/scottnonnenberg/blog/commit/b3d6d66))



<a name="1.9.1"></a>
## [1.9.1](https://github.com/scottnonnenberg/blog/compare/v1.9.0...v1.9.1) (2017-01-11)


### Bug Fixes

* **post:** Update first paragraph - add link, streamline ([fb60f87](https://github.com/scottnonnenberg/blog/commit/fb60f87))



<a name="1.9.0"></a>
# [1.9.0](https://github.com/scottnonnenberg/blog/compare/v1.8.0...v1.9.0) (2017-01-11)


### Bug Fixes

* **post:** Update back link to deep link to feedback loop section ([3b5c46c](https://github.com/scottnonnenberg/blog/commit/3b5c46c))


### Features

* **post:** Add "Find a test rhythm" post ([172d369](https://github.com/scottnonnenberg/blog/commit/172d369))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/scottnonnenberg/blog/compare/v1.7.0...v1.8.0) (2016-12-20)


### Features

* **post:** Add 'First, listen' post ([3afc16c](https://github.com/scottnonnenberg/blog/commit/3afc16c))



<a name="1.7.0"></a>
# [1.7.0](https://github.com/scottnonnenberg/blog/compare/v1.6.0...v1.7.0) (2016-12-13)


### Features

* **post:** Six books for greater context ([e691682](https://github.com/scottnonnenberg/blog/commit/e691682))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/scottnonnenberg/blog/compare/v1.5.0...v1.6.0) (2016-12-06)


### Bug Fixes

* **post:** A couple tweaks to "Web application test strategy" ([cc1a23e](https://github.com/scottnonnenberg/blog/commit/cc1a23e))


### Features

* **post:** Add "Better docs and static analysis" ([f93fd81](https://github.com/scottnonnenberg/blog/commit/f93fd81))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/scottnonnenberg/blog/compare/v1.4.0...v1.5.0) (2016-11-29)


### Bug Fixes

* **post:** Fix typo in 'R for React' post, add link ([e30d71b](https://github.com/scottnonnenberg/blog/commit/e30d71b))
* **update-rankings:** User proper id for the site ([737ecaa](https://github.com/scottnonnenberg/blog/commit/737ecaa))


### Features

* **popular:** Show 20 posts, show last 10 as plain links ([9ec92fc](https://github.com/scottnonnenberg/blog/commit/9ec92fc))
* **post:** Add "Be a scientist" post ([ce550ac](https://github.com/scottnonnenberg/blog/commit/ce550ac))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/scottnonnenberg/blog/compare/v1.3.0...v1.4.0) (2016-11-16)


### Bug Fixes

* **post:** Fix typo in "four books for greater understanding" ([6da009e](https://github.com/scottnonnenberg/blog/commit/6da009e))


### Features

* **post:** Add "Web application test strategy" ([3c1ce6a](https://github.com/scottnonnenberg/blog/commit/3c1ce6a))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/scottnonnenberg/blog/compare/v1.2.0...v1.3.0) (2016-11-08)


### Features

* **post:** Add "Fear of the subjective" post ([0b35a1d](https://github.com/scottnonnenberg/blog/commit/0b35a1d))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/scottnonnenberg/blog/compare/v1.1.0...v1.2.0) (2016-11-02)


### Features

* **post:** Add "Breaking other servers with Node.js", break-it tag ([8444a8e](https://github.com/scottnonnenberg/blog/commit/8444a8e))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/scottnonnenberg/blog/compare/v1.0.0...v1.1.0) (2016-10-25)


### Features

* **post:** Add Focus (Dev productivity tip [#2](https://github.com/scottnonnenberg/blog/issues/2)), dev-productivity tag ([8b8d665](https://github.com/scottnonnenberg/blog/commit/8b8d665))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/scottnonnenberg/blog/compare/v0.18.0...v1.0.0) (2016-10-24)


### Features

* **piwik:** Clean up piwik config, bring its javascript local ([193b2eb](https://github.com/scottnonnenberg/blog/commit/193b2eb))


### BREAKING CHANGES

* piwik: Structure of piwik config has changed. There are now
just four keys used: `url`, `js`, `id`, and `token`.



<a name="0.18.0"></a>
# [0.18.0](https://github.com/scottnonnenberg/blog/compare/v0.17.0...v0.18.0) (2016-10-18)


### Bug Fixes

* **post:** Forward link to new Agile post ([4637589](https://github.com/scottnonnenberg/blog/commit/4637589))


### Features

* **post:** Add "Technology of Agile" post ([3c87c21](https://github.com/scottnonnenberg/blog/commit/3c87c21))



<a name="0.17.0"></a>
# [0.17.0](https://github.com/scottnonnenberg/blog/compare/v0.16.1...v0.17.0) (2016-10-11)


### Features

* **post:** Add stack improvements [#2](https://github.com/scottnonnenberg/blog/issues/2) post, stack-improvements tag ([de4d02b](https://github.com/scottnonnenberg/blog/commit/de4d02b))



<a name="0.16.1"></a>
## [0.16.1](https://github.com/scottnonnenberg/blog/compare/v0.16.0...v0.16.1) (2016-10-09)


### Bug Fixes

* **design:** Fix mobile formatting of mailchimp signup ([f145915](https://github.com/scottnonnenberg/blog/commit/f145915))



<a name="0.16.0"></a>
# [0.16.0](https://github.com/scottnonnenberg/blog/compare/v0.15.0...v0.16.0) (2016-10-09)


### Bug Fixes

* **deprecated:** onRouteChange (deprecated) -> onRouteUpdate ([59d965b](https://github.com/scottnonnenberg/blog/commit/59d965b))
* **design:** index.js - tighten up menu and email signup box ([6560d1c](https://github.com/scottnonnenberg/blog/commit/6560d1c))
* **mailchimp:** Add input/label spacing, tweak placeholder/title ([a685b99](https://github.com/scottnonnenberg/blog/commit/a685b99))


### Features

* **design:** Larger, centered index.js menu, explicit line-break ([34f8f48](https://github.com/scottnonnenberg/blog/commit/34f8f48))
* **mailchimp:** Email signup on homepage, bottom of post pages ([556c89a](https://github.com/scottnonnenberg/blog/commit/556c89a))
* **mailchimp:** Link to previous emails, privacy assurance ([044d8b1](https://github.com/scottnonnenberg/blog/commit/044d8b1))



<a name="0.15.0"></a>
# [0.15.0](https://github.com/scottnonnenberg/blog/compare/v0.14.0...v0.15.0) (2016-10-04)


### Bug Fixes

* **post:** A few tweaks to "breaking the event loop"  ([81d3ded](https://github.com/scottnonnenberg/blog/commit/81d3ded))


### Features

* **post:** Add "systems for collaboration" post ([50c23e2](https://github.com/scottnonnenberg/blog/commit/50c23e2))



<a name="0.14.0"></a>
# [0.14.0](https://github.com/scottnonnenberg/blog/compare/v0.13.2...v0.14.0) (2016-09-27)


### Bug Fixes

* **post:** Run clean-post on "Breaking the Node.js event loop" post ([7e39e7b](https://github.com/scottnonnenberg/blog/commit/7e39e7b))
* **post:** Update LAUNCH_DELAY to correct starting number, 10 ([a2f73de](https://github.com/scottnonnenberg/blog/commit/a2f73de))


### Features

* **post:** Add "Breaking the event loop" post ([5b966fb](https://github.com/scottnonnenberg/blog/commit/5b966fb))



<a name="0.13.2"></a>
## [0.13.2](https://github.com/scottnonnenberg/blog/compare/v0.13.1...v0.13.2) (2016-09-22)


### Bug Fixes

* **post:** Fix type in "Contract: An unusual skillset" intro ([d94cdd1](https://github.com/scottnonnenberg/blog/commit/d94cdd1))



<a name="0.13.1"></a>
## [0.13.1](https://github.com/scottnonnenberg/blog/compare/v0.13.0...v0.13.1) (2016-09-20)


### Bug Fixes

* **post:** Move to social-ready SSA logo ([7e6d3b9](https://github.com/scottnonnenberg/blog/commit/7e6d3b9))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/scottnonnenberg/blog/compare/v0.12.0...v0.13.0) (2016-09-20)


### Bug Fixes

* **post:** Add link to 'Blog is now open source!' from Practical Gatsby ([1ea4a37](https://github.com/scottnonnenberg/blog/commit/1ea4a37))
* **post:** Add some missing markdown code fence types ([0a61ddb](https://github.com/scottnonnenberg/blog/commit/0a61ddb))
* **post:** Run clean-post on 'understand the problem' post ([01a2ffb](https://github.com/scottnonnenberg/blog/commit/01a2ffb))
* **post:** Run clean-post on private node.js modules ([0c9fd13](https://github.com/scottnonnenberg/blog/commit/0c9fd13))
* **post:** Tweak CircleCI post's coverage of Node.js version management ([4e5a170](https://github.com/scottnonnenberg/blog/commit/4e5a170))


### Features

* **post:** Add 'Contract: An unusual skillset' ([5362f03](https://github.com/scottnonnenberg/blog/commit/5362f03))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/scottnonnenberg/blog/compare/v0.11.0...v0.12.0) (2016-09-13)


### Features

* **dev-tip-1:** Add first developer productivity tip post! ([7fe9bbc](https://github.com/scottnonnenberg/blog/commit/7fe9bbc))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/scottnonnenberg/blog/compare/v0.10.0...v0.11.0) (2016-08-03)


### Features

* **post:** Add 'modern evidence requirements' post ([3e3db9d](https://github.com/scottnonnenberg/blog/commit/3e3db9d))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/scottnonnenberg/blog/compare/v0.9.0...v0.10.0) (2016-07-26)


### Features

* **post:** Add 'Hands-on with CircleCI and Node.js' post ([46d757a](https://github.com/scottnonnenberg/blog/commit/46d757a))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/scottnonnenberg/blog/compare/v0.8.0...v0.9.0) (2016-07-19)


### Bug Fixes

* **post:** Make these things Node.js/Javascript specific ([d007b6f](https://github.com/scottnonnenberg/blog/commit/d007b6f))


### Features

* **post:** Add 'Better changelogs, strings, and paths' post ([ab6cb6e](https://github.com/scottnonnenberg/blog/commit/ab6cb6e))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/scottnonnenberg/blog/compare/v0.7.2...v0.8.0) (2016-07-12)


### Bug Fixes

* **popular:** update date range to include up to July 10 ([d00c472](https://github.com/scottnonnenberg/blog/commit/d00c472))


### Features

* **post:** add 'private node modules' post ([7bbe2b7](https://github.com/scottnonnenberg/blog/commit/7bbe2b7))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/scottnonnenberg/blog/compare/v0.7.1...v0.7.2) (2016-07-06)


### Bug Fixes

* **post:** fix typo in 'this blog is open source' ([3449a9e](https://github.com/scottnonnenberg/blog/commit/3449a9e))
* **post:** improve links to 'open source' post from other gatsby posts ([75c1195](https://github.com/scottnonnenberg/blog/commit/75c1195))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/scottnonnenberg/blog/compare/v0.7.0...v0.7.1) (2016-07-06)


### Bug Fixes

* **post:** Fix typo, improve readability in 'Open source' post ([7cb4808](https://github.com/scottnonnenberg/blog/commit/7cb4808))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/scottnonnenberg/blog/compare/v0.6.4...v0.7.0) (2016-07-06)


### Features

* **post:** add 'This blog is now open source!' post. So meta! ([cc53e10](https://github.com/scottnonnenberg/blog/commit/cc53e10))



<a name="0.6.4"></a>
## [0.6.4](https://github.com/scottnonnenberg/blog/compare/v0.6.3...v0.6.4) (2016-06-29)


### Bug Fixes

* **post:** fix API in notate post ([c0798a9](https://github.com/scottnonnenberg/blog/commit/c0798a9))



<a name="0.6.3"></a>
## [0.6.3](https://github.com/scottnonnenberg/blog/compare/v0.6.2...v0.6.3) (2016-06-28)


### Bug Fixes

* **social:** move to a smaller, but still square/full image for shares ([77441c5](https://github.com/scottnonnenberg/blog/commit/77441c5))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/scottnonnenberg/blog/compare/v0.6.1...v0.6.2) (2016-06-28)


### Bug Fixes

* **social:** profile image take two, bigger but still square ([77ee0cb](https://github.com/scottnonnenberg/blog/commit/77ee0cb))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/scottnonnenberg/blog/compare/v0.6.0...v0.6.1) (2016-06-28)


### Bug Fixes

* **social:** Move to square authorImage for facebook sharing ([9e6901f](https://github.com/scottnonnenberg/blog/commit/9e6901f))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/scottnonnenberg/blog/compare/v0.5.0...v0.6.0) (2016-06-28)


### Bug Fixes

* **post:** add 'open-source' tag to all ESLint posts ([b7ebbcb](https://github.com/scottnonnenberg/blog/commit/b7ebbcb))
* **post:** Add link to my library in notate post intro ([af10d8b](https://github.com/scottnonnenberg/blog/commit/af10d8b))
* **post:** final cleanup on Notate blog post ([4631484](https://github.com/scottnonnenberg/blog/commit/4631484))
* **tags:** add nvc tag to carrots not sticks post ([47dc183](https://github.com/scottnonnenberg/blog/commit/47dc183))


### Features

* **post:** add notate blog post ([dd688fc](https://github.com/scottnonnenberg/blog/commit/dd688fc))
* **tags:** add new empathy tag, apply to six posts ([3a90e92](https://github.com/scottnonnenberg/blog/commit/3a90e92))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/scottnonnenberg/blog/compare/v0.4.0...v0.5.0) (2016-06-23)


### Bug Fixes

* **post:** backtick to singlequote in ESLint Part 1 post ([00c6511](https://github.com/scottnonnenberg/blog/commit/00c6511))
* **post:** Proper link to job on scottnonnenberg.com ([2f5c50f](https://github.com/scottnonnenberg/blog/commit/2f5c50f))


### Features

* **post:** Add Carrots, Not Sticks post ([8d0e0cf](https://github.com/scottnonnenberg/blog/commit/8d0e0cf))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/scottnonnenberg/blog/compare/v0.3.0...v0.4.0) (2016-06-22)


### Bug Fixes

* **post:** Fix a couple typos in ESLint Part 3 ([2d21803](https://github.com/scottnonnenberg/blog/commit/2d21803))
* **post:** the state of thehelp - remove extra newlines ([54addb5](https://github.com/scottnonnenberg/blog/commit/54addb5))


### Features

* **plain-links:** Restore hover behavior for plain links ([81c77d5](https://github.com/scottnonnenberg/blog/commit/81c77d5))
* **popular:** Update date range to include June 19 ([3ffe53c](https://github.com/scottnonnenberg/blog/commit/3ffe53c))
* **post:** Add ESLint part 3, update forward references ([9afb0df](https://github.com/scottnonnenberg/blog/commit/9afb0df))
* **scripts:** Do production build right before release ([eeda09d](https://github.com/scottnonnenberg/blog/commit/eeda09d))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/scottnonnenberg/blog/compare/v0.2.0...v0.3.0) (2016-06-16)


### Bug Fixes

* **post:** Edits to ESLint Part 2 after finishing Part 3 ([70dc5e3](https://github.com/scottnonnenberg/blog/commit/70dc5e3))
* **post:** Link ESlint part 1 to ESLint part 2, tweaks to part 2 ([c634e3b](https://github.com/scottnonnenberg/blog/commit/c634e3b))
* **post:** Remove TODOs from the top of ESLint part two post ([41f72bd](https://github.com/scottnonnenberg/blog/commit/41f72bd))
* **post:** Tune wording of ESLint part 2 post, fix part 1 link ([2b5276b](https://github.com/scottnonnenberg/blog/commit/2b5276b))
* **post:** Update heading in ESLint part 2 ([dc1ffab](https://github.com/scottnonnenberg/blog/commit/dc1ffab))


### Features

* **post:** Add ELlint Part 2 post ([29b259d](https://github.com/scottnonnenberg/blog/commit/29b259d))
* **tags:** Add eslint tag page ([043474f](https://github.com/scottnonnenberg/blog/commit/043474f))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/scottnonnenberg/blog/compare/v0.1.1...v0.2.0) (2016-06-16)


### Bug Fixes

* **check_deep_links:** Reference scoped notate ([709f7da](https://github.com/scottnonnenberg/blog/commit/709f7da))
* **dependencies:** force punycode < 2.x so static site gen works ([f64e14a](https://github.com/scottnonnenberg/blog/commit/f64e14a))
* **loadPosts:** exclude license.txt from loadPosts ([a79c424](https://github.com/scottnonnenberg/blog/commit/a79c424))
* **post:** Add ESlint logo to Eslint post ([f987f95](https://github.com/scottnonnenberg/blog/commit/f987f95))
* **post:** ESLint part 1 - Fix link to eslint-plugin-import ([d02fadd](https://github.com/scottnonnenberg/blog/commit/d02fadd))
* **post:** Fix link to eslint-plugin-filenames ([69907f8](https://github.com/scottnonnenberg/blog/commit/69907f8))
* **post:** Link to eslint-plugin-no-js was incorrect ([39b8900](https://github.com/scottnonnenberg/blog/commit/39b8900))
* **post:** Update to eslint logo with proper transparency ([ed7cae7](https://github.com/scottnonnenberg/blog/commit/ed7cae7))
* **post:** Update to social-ready image ([825f336](https://github.com/scottnonnenberg/blog/commit/825f336))


### Features

* **gatsby:** Update to gatsby 0.11.3 - dependencies added and updated ([8a410a1](https://github.com/scottnonnenberg/blog/commit/8a410a1))
* **post:** Add ESLint Part 1 post ([1f91fed](https://github.com/scottnonnenberg/blog/commit/1f91fed))



<a name="0.1.1"></a>
## 0.1.1 (2016-06-13)
