# doublylinked

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][devdependencies-image]][devdependencies-url]

## About

Doubly Circular linked list implementation for JavaScript with iterator and array-like interface

## Installation

  - `npm install doublylinked --save`

## Simple example

```js

}


```

**tasks:** An array of functions to run.

**callback:** An optional callback to run once all the functions have completed. This will be passed the results of the last task's callback.

Each function calls callback(err, result1, result2, ...) to step through next function in array. Callback's first argument must be error or null. After than first argument values are moved to next functions. If error value is not null, waterfall skips next functions and calls result callback. 

```javascript
const waterfall = require('doublylinked');
waterfall([
  function(next) {
    console.log('started');
    next(null, 1, 2);
  },
  function(next, arg1, arg2) {
    let sum = arg1 + arg2;
    console.log('Current sum: ', sum);
    next(null, sum, 3, 4);
  },
  function(next, arg1, arg2, arg3) {
    let sum = arg1 + arg2 + arg3;
    console.log('Current sum: ', sum);
    // arg1 now equals 'three'
    next(null, sum + 10);
  }
], function(err, result) {
  if (err)
    console.error(err);
  else
    console.log('Result: ', result);
});
```
Result output
```
started
Current sum:  3
Current sum:  10
Result:  20
```

`waterfall.every(array, fn, callback)`

**array:** Any array

**fn:** Function to be called for every value. `fn(next, value, index)

**callback:** An optional callback to run once iteration completed.

 

```javascript
const waterfall = require('doublylinked');
var total = 0;
waterfall.every([1, 2, 3, 4],
    function(next, val) {
      total += val;
      next(null);
    },
    function(err) {
      console.log('Total: ' + total);      
    });
```
Result output
```
Total: 10
```
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
