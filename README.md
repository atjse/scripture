# [script]ure

[![Greenkeeper badge](https://badges.greenkeeper.io/ntbx/scripture.svg)](https://greenkeeper.io/)

[![Travis CI - Build Status][travis-badge]][travis-url]
[![Coveralls - Code Coverage Status][cov-badge]][cov-url]
[![JavaScript Style Guide][jsstd-badge]][jsstd-url]
[![PRs Welcome][pr-badge]][pr-url]

A helper tool to **keep package.json lean** by extracting 
**your NPM scripts into a separate file**.

---

scripture `[noun]`: 
 - from Latin *scrīptūra* `("a writing, scripture")`
 - a body of authoritative writings or anything written 

---

## Installation

```bash
# Using NPM
npm install scripture --save-dev
```

```bash
# Using Yarn
yarn add scripture --dev
```

## Initialization

 - Run with the help of `npx`:
 
   ```bash
   npx scripture init
   ```
   
 - Setup `scripture` manually in your `package.json`:
 
   ```json
   ...
   "scripts": {
     "the": "scripture"
   }
   ...
   ```

## Usage

Run your scripts via npm prepending the word `the`, e.g.:

```bash
# Run the build script
npm run the build

# Run the test
npm run the test
```

## Contribution

**Any contribution is appreciated**. 
***Thank you, have fun!***

## License

[MIT](LICENSE.md) @ [Richard Szakacs](https://www.github.com/richardszkcs)

 [travis-badge]: https://travis-ci.org/atjse/scripture.svg?branch=master
 [travis-url]:   https://travis-ci.org/atjse/scripture

 [cov-badge]:    https://coveralls.io/repos/github/atjse/scripture/badge.svg?branch=master
 [cov-url]:      https://coveralls.io/github/atjse/scripture?branch=master

 [jsstd-badge]:  https://img.shields.io/badge/code_style-standard-brightgreen.svg
 [jsstd-url]:    https://standardjs.com

 [pr-badge]:     https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
 [pr-url]:       CONTRIBUTING.md
