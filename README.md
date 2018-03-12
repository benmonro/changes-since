[![npm][npm-img]][npm-url] [![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/benmonro/changes-since)[![downloads][downloads-img]][npm-url]
[![GitHub issues](https://img.shields.io/github/issues-raw/badges/shields.svg)](https://github.com/benmonro/changes-since/issues)

Filter your CHANGELOG to view/format changes since a specific version.  Uses [chast](https://github.com/benmonro/chast) to parse the changelog.

[npm-img]: https://img.shields.io/npm/v/changes-since.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/changes-since
[downloads-img]: https://img.shields.io/npm/dm/changes-since.svg?style=flat-square

# CLI

## Install



For CLI:
```
yarn global add change-since
```


## Usage


```shell
> cd /path/with/changelog

> changes-since 1.0.0
### Bug Fixes

* added std-version 
* added tests & build business 
* deleted old changelog 

### Features

* first version, based on changelog-parser 
```

# API

## Install

``` 
yarn add changes-since
```

## Usage: 

```javascript
import changesSince, {format} from 'changes-since';

const changeLog = "# Change Log ...";

const filtered = changesSince(changeLog, {since: "1.0.0"}); //returns a chast object

console.log(format(ast)); //will log a formatted representation of all the changes (grouped together) 

```
