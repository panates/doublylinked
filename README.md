# doublylinked

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][devdependencies-image]][devdependencies-url]

## About

Doubly linked list implementation for JavaScript with iterator and array-like interface

## Installation

  - `$ npm install doublylinked [--save]`

## Methods

* [`DoublyLinked.prototype.concat()`](#doublylinkedprototypeconcat)
* [`DoublyLinked.prototype.entries()`](#doublylinkedprototypeentries) 
* [`DoublyLinked.prototype.every()`](#doublylinkedprototypeevery)
* [`DoublyLinked.prototype.everyRight()`](#doublylinkedprototypeeveryright)
* [`DoublyLinked.prototype.filter()`](#doublylinkedprototypefilter)
* [`DoublyLinked.prototype.find()`](#doublylinkedprototypefind)
* [`DoublyLinked.prototype.forEach()`](#doublylinkedprototypeforeach)
* [`DoublyLinked.prototype.forEachRight()`](#doublylinkedprototypeforeachright)
* [`DoublyLinked.prototype.includes()`](#doublylinkedprototypeincludes)
* [`DoublyLinked.prototype.insert()`](#doublylinkedprototypeinsert)
* [`DoublyLinked.prototype.join()`](#doublylinkedprototypejoin)
* [`DoublyLinked.prototype.map()`](#doublylinkedprototypemap)
* [`DoublyLinked.prototype.next()`](#doublylinkedprototypenext)
* [`DoublyLinked.prototype.prev()`](#doublylinkedprototypeprev)
* [`DoublyLinked.prototype.pop()`](#doublylinkedprototypepop)
* [`DoublyLinked.prototype.push()`](#doublylinkedprototypepush)
* [`DoublyLinked.prototype.reduce()`](#doublylinkedprototypereduce)
* [`DoublyLinked.prototype.reduce()`](#doublylinkedprototypereduce)
* [`DoublyLinked.prototype.reduceRight()`](#doublylinkedprototypereduceright)
* [`DoublyLinked.prototype.remove()`](#doublylinkedprototyperemove)
* [`DoublyLinked.prototype.reset()`](#doublylinkedprototypereset)
* [`DoublyLinked.prototype.reverse()`](#doublylinkedprototypereverse)
* [`DoublyLinked.prototype.shift()`](#doublylinkedprototypeshift)
* [`DoublyLinked.prototype.some()`](#doublylinkedprototypesome)
* [`DoublyLinked.prototype.someRight()`](#doublylinkedprototypesomeright)
* [`DoublyLinked.prototype.toArray()`](#doublylinkedprototypetoarray)
* [`DoublyLinked.prototype.toString()`](#doublylinkedprototypetostring)
* [`DoublyLinked.prototype.unshift()`](#doublylinkedprototypeunshift)
* [`DoublyLinked.prototype[@@Symbol.iterator]`](#doublylinkedprototypesymboliterator)

### DoublyLinked.prototype.concat()

Merges cursor list with and given lists/values into new list.

```js
list.concat(otherList1[, element1[, ...[otherList2]]])
```
##### Parameters

- *valueN :* Lists and/or values to concatenate into a new list

- *Return value :* A new DoublyLinked instance



### DoublyLinked.prototype.every()

Tests whether all elements in the list pass the test implemented by the provided function (from left to right)

```js
list.every(callback[, thisArg])
```
##### Parameters

- *callback :* Function to test for each element, taking three arguments:
    
    - *currentValue :* The current element being processed in the list
    
    - *index :* The index of the current element being processed in the list
    
    - *list :* The list every was called upon

- *thisArg :* Value to use as this when executing callback

- *Return value :* true if the callback function returns a truthy value for every list element; otherwise, false



## Properties

#### cursor

Returns current located node of the list

#### head

Returns first node of the list

#### length

Returns the element count of the list

#### head

Returns last node of the list

## Node Compatibility

  - node `>= 4.0`;
  
### License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/doublylinked.svg
[npm-url]: https://npmjs.org/package/doublylinked
[travis-image]: https://img.shields.io/travis/panates/doublylinked/master.svg
[travis-url]: https://travis-ci.org/panates/doublylinked
[coveralls-image]: https://img.shields.io/coveralls/panates/doublylinked/master.svg
[coveralls-url]: https://coveralls.io/r/panates/doublylinked
[downloads-image]: https://img.shields.io/npm/dm/doublylinked.svg
[downloads-url]: https://npmjs.org/package/doublylinked
[gitter-image]: https://badges.gitter.im/panates/doublylinked.svg
[gitter-url]: https://gitter.im/panates/doublylinked?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[dependencies-image]: https://david-dm.org/panates/doublylinked/status.svg
[dependencies-url]:https://david-dm.org/panates/doublylinked
[devdependencies-image]: https://david-dm.org/panates/doublylinked/dev-status.svg
[devdependencies-url]:https://david-dm.org/panates/doublylinked?type=dev
[quality-image]: http://npm.packagequality.com/shield/doublylinked.png
[quality-url]: http://packagequality.com/#?package=doublylinked
