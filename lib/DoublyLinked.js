/* doublylinked
 ------------------------
 (c) 2017-present Panates
 SQB may be freely distributed under the MIT license.
 For details and documentation:
 https://panates.github.io/doublylinked/
 */
'use strict';

/**
 * Expose `DoublyLinked`.
 */

module.exports = DoublyLinked;

/**
 * @param {*} elementN - The elements to add to the end of the list
 * @constructor
 */
function DoublyLinked(elementN) {
  Object.defineProperties(this, {
    '_priv': {
      value: {},
      writable: true,
      enumerable: false,
      configurable: false
    }
  });
  this._priv.head = null;
  this._priv.tail = null;
  this._priv.length = 0;
  if (arguments.length)
    this.push.apply(this, arguments);
}

DoublyLinked.prototype = {

  /**
   *
   * @returns {*}
   */
  get cursor() {
    return this._priv.cursor;
  },

  /**
   *
   * @returns {*}
   */
  get head() {
    return this._priv.head;
  },

  /**
   *
   * @returns {int}
   */
  get length() {
    return this._priv.length;
  },

  /**
   *
   * @returns {*}
   */
  get tail() {
    return this._priv.tail;
  }

};

/**
 * Merges cursor list with and given lists/values into new list
 *
 * @param {String} args... - Lists and/or values to concatenate into a new list
 * @return {DoublyLinked} - A new DoublyLinked instance
 * @public
 */
DoublyLinked.prototype.concat = function(args) {
  var result = new DoublyLinked();
  const merge = function(acc, node) {
    acc.push(node);
    return acc;
  };
  this.reduce(merge, result);
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] instanceof DoublyLinked)
      arguments[i].reduce(merge, result);
    else result.push(arguments[i]);
  }

  return result.reset();
};

/**
 * Returns the iterator object contains entries
 *
 * @return {{next: next, _first: boolean}}
 */
DoublyLinked.prototype.entries = function() {
  return this[Symbol.iterator]();
};

/**
 * Tests whether all elements in the list pass the test implemented by
 * the provided function (from left to right)
 *
 * @param {Function} callback - Function to test for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @return {Boolean} - true if the callback function returns a truthy value for every list element; otherwise, false
 * @public
 */
DoublyLinked.prototype.every = function(callback, thisArg) {
  if (typeof callback !== 'function')
    throw new TypeError(String(callback) + ' is not a function');
  const priv = this._priv;
  if (!(priv.length && callback))
    return true;
  thisArg = thisArg !== undefined ? thisArg : this;
  var tmp = priv.head;
  var nxt;
  var i = 0;
  while (tmp) {
    nxt = tmp.next;
    if (!callback.call(thisArg, tmp.value, i++, thisArg))
      return false;
    tmp = nxt;
  }
  return true;
};

/**
 * Tests whether all elements in the list pass the test implemented by
 * the provided function (from right to left)
 *
 * @param {Function} callback - Function to test for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @return {Boolean} - true if the callback function returns a truthy value for every list element; otherwise, false
 * @public
 */
DoublyLinked.prototype.everyRight = function(callback, thisArg) {
  if (typeof callback !== 'function')
    throw new TypeError(String(callback) + ' is not a function');
  const priv = this._priv;
  if (!(priv.length && callback))
    return true;
  thisArg = thisArg !== undefined ? thisArg : this;
  var tmp = priv.tail;
  for (var i = 0; i < priv.length; i++) {
    if (!callback.call(thisArg, tmp.value, priv.length - i - 1, thisArg))
      return false;
    tmp = tmp.prev;
  }
  return true;
};

/**
 * Creates a new list with all elements that pass the test implemented
 * by the provided function
 *
 * @param {Function} callback - Function to test for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @return {DoublyLinked} - A new list with the elements that pass the test
 * @public
 */
DoublyLinked.prototype.filter = function(callback, thisArg) {
  if (typeof callback !== 'function')
    throw new TypeError(String(callback) + ' is not a function');
  thisArg = thisArg !== undefined ? thisArg : this;
  var index = 0;
  return this.reduce(function(acc, value) {
    if (callback.call(thisArg, value, index++, thisArg))
      acc.push(value);
    return acc;
  }, new DoublyLinked());
};

/**
 * Returns the value of the first element in the list that satisfies
 * the provided testing function. Otherwise undefined is returned
 *
 * @param {Function} callback - Function to test for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @return {*} - A value in the list if an element passes the test; otherwise, undefined
 * @public
 */
DoublyLinked.prototype.find = function(callback, thisArg) {
  if (typeof callback !== 'function')
    throw new TypeError(String(callback) + ' is not a function');
  const priv = this._priv;
  if (!(priv.length))
    return;
  thisArg = thisArg !== undefined ? thisArg : this;
  var tmp = priv.head;
  for (var i = 0; i < priv.length; i++) {
    if (callback.call(thisArg, tmp.value, i, thisArg)) {
      priv.cursor = tmp;
      this._eof = false;
      return tmp.value;
    }
    tmp = tmp.next;
  }
  priv.cursor = undefined;
};

/**
 * Executes a provided function once for each list element (from left to right)
 *
 * @param {Function} callback - Function to execute for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @public
 */
DoublyLinked.prototype.forEach = function(callback, thisArg) {
  this.every(function(element, index, instance) {
    callback.call(this, element, index, instance);
    return true;
  }, thisArg);
};

/**
 * Executes a provided function once for each list element (from right-to-left)
 *
 * @param {Function} callback - Function to execute for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @public
 */
DoublyLinked.prototype.forEachRight = function(callback, thisArg) {
  this.everyRight(function(element, index, instance) {
    callback.call(this, element, index, instance);
    return true;
  }, thisArg);
};

/**
 * Determines whether an list includes a certain element,
 * returning true or false as appropriate
 *
 * @param {*} searchElement - The element to search for
 * @param {int} [fromIndex = 0] - The position in this list at which to begin searching for searchElement
 * @return {Boolean} - true if the searchElement found in the list; otherwise, false
 * @public
 */
DoublyLinked.prototype.includes = function(searchElement, fromIndex) {

  const sameValueZero = function(x, y) {
    return x === y ||
        (typeof x === 'number' && typeof y === 'number' &&
            isNaN(x) && isNaN(y));
  };

  fromIndex = fromIndex || 0;
  if (fromIndex < 0)
    fromIndex = this.length + fromIndex;
  this.find(function(element, index) {
    return index >= fromIndex && sameValueZero(element, searchElement);
  });
  return !!this.cursor;
};

/**
 * Adds one or more elements right after the cursor node of the list and returns
 * the new length of the list
 *
 * @param {*} elementN - The elements to add after cursor node
 * @returns {int} - The new length of the list
 * @public
 */
DoublyLinked.prototype.insert = function(elementN) {
  const priv = this._priv;
  var node;
  for (var i = 0; i < arguments.length; i++) {
    node = new Node(this, arguments[i]);
    if (priv.length) {
      priv.cursor.next = node;
      node.prev = priv.cursor;
      priv.cursor = node;
    } else {
      priv.head = node;
      priv.tail = node;
      priv.cursor = node;
    }
    priv.length++;
    this._eof = false;
  }
  return priv.length;
};

/**
 * Joins all elements of the list into a string and returns this string
 *
 * @param {String} separator - Specifies a string to separate each pair of adjacent elements of the list
 * @return {String} - A string with all list elements joined. If length is 0, the empty string is returned
 * @public
 */
DoublyLinked.prototype.join = function(separator) {
  separator = separator || ',';
  var out = '';
  this.forEach(function(value) {
    out += (out ? separator : '') + value;
  });
  return out;
};

/**
 * Creates a new list with the results of calling a provided function on
 * every element in the calling list
 *
 * @param {Function} callback - Function that produces an element of the new list
 * @return {DoublyLinked} - A new list with each element being the result of the callback function
 * @public
 */
DoublyLinked.prototype.map = function(callback) {
  if (typeof callback !== 'function')
    throw new TypeError(String(callback) + ' is not a function');
  var out = new DoublyLinked();
  this.forEach(function(value, index, instance) {
    out.push(callback(value, index, instance));
  });
  return out.reset();
};

/**
 * Moves cursor to the next and returns its value
 *
 * @return {*} - Returns value of next node to the cursor. If cursor reaches to the end it returns undefined
 * @public
 */
DoublyLinked.prototype.next = function() {
  if (this._priv.cursor === this._priv.tail) {
    this._eof = true;
    return undefined;
  }
  var c = this._priv.cursor ? this._priv.cursor.next : this._priv.head;
  this._priv.cursor = c;
  return c && c.value;
};

/**
 * Moves cursor to the previous and returns its value
 *
 * @return {*} - Returns value of previous node to the cursor. If cursor reaches to the head it returns undefined
 * @public
 */
DoublyLinked.prototype.prev = function() {
  var c;
  if (this._eof) {
    this._eof = false;
    c = this._priv.cursor = this._priv.tail;
    return c && c.value;
  }
  c = this._priv.cursor && this._priv.cursor.prev;
  this._priv.cursor = c;
  return c && c.value;
};

/**
 * Removes the last element from the list and returns that element
 *
 * @returns {*} - The removed element from the list; undefined if the list is empty.
 * @public
 */
DoublyLinked.prototype.pop = function() {
  var ret = this.tail;
  if (ret) {
    ret.remove();
    return ret.value;
  }
};

/**
 * Adds one or more elements to the end of the list and returns
 * the new length of the list
 *
 * @param {*} elementN - The elements to add to the end of the list
 * @returns {int} - The new length of the list
 * @public
 */
DoublyLinked.prototype.push = function(elementN) {
  const priv = this._priv;
  var node;
  for (var i = 0; i < arguments.length; i++) {
    node = new Node(this, arguments[i]);
    if (priv.length) {
      priv.tail.next = node;
      node.prev = priv.tail;
      priv.tail = node;
    } else {
      priv.head = node;
      priv.tail = node;
    }
    priv.length++;
  }
  return priv.length;
};

/**
 * Applies a function against an accumulator and each element in
 * the list (from left-to-right) to reduce it to a single value
 *
 * @param {Function} callback - Function to execute on each element in the list
 * @param {*} [initialValue] - Value to use as the first argument to the first call of the callback
 * @return {*} - The value that results from the reduction
 * @public
 */
DoublyLinked.prototype.reduce = function(callback, initialValue) {
  if (typeof callback !== 'function')
    throw new TypeError(String(callback) + ' is not a function');
  var accumulator = initialValue;
  const self = this;
  this.forEach(function(value, index) {
    accumulator = callback(accumulator, value, index, self);
  });
  return accumulator;
};

/**
 * Applies a function against an accumulator and each element in
 * the list (from right-to-left) to reduce it to a single value
 *
 * @param {Function} callback - Function to execute on each element in the list
 * @param {*} [initialValue] - Value to use as the first argument to the first call of the callback
 * @return {*} - The value that results from the reduction
 * @public
 */
DoublyLinked.prototype.reduceRight = function(callback, initialValue) {
  if (typeof callback !== 'function')
    throw new TypeError(String(callback) + ' is not a function');
  var accumulator = initialValue;
  const self = this;
  this.forEachRight(function(value, index) {
    accumulator = callback(accumulator, value, index, self);
  });
  return accumulator;
};

/**
 * Removes an element from the list
 *
 * @param {*} element - The element to be removed
 * @param {int} [fromIndex = 0] - The position in this list at which to begin searching for element
 * @return {*} - Returns removed element if found, undefined otherwise
 * @public
 */
DoublyLinked.prototype.remove = function(element, fromIndex) {
  if (this.includes(element, fromIndex)) {
    const cur = this.cursor;
    cur.remove();
    return cur.value;
  }
};

/**
 * Resets cursor to head
 *
 * @return {DoublyLinked} - Returns the DoublyLinked instance which this method is called
 * @public
 */
DoublyLinked.prototype.reset = function() {
  this._priv.cursor = null;
  this._eof = false;
  return this;
};

/**
 * Reverses a list in place. The first array element becomes the last, and the last list element becomes the first.
 *
 * @return {DoublyLinked} - Returns the DoublyLinked instance which this method is called
 * @public
 */
DoublyLinked.prototype.reverse = function() {
  var cur = this.head;
  var p, n;
  for (var i = 0; i < this._priv.length; i++) {
    p = cur.prev;
    n = cur.next;
    cur.prev = n;
    cur.next = p;
    cur = n;
  }
  p = this._priv.head;
  n = this._priv.tail;
  this._priv.head = n;
  this._priv.tail = p;
  this.reset();
  return this;
};

/**
 * Removes the first element from the list and returns that element
 *
 * @returns {*} - The removed element from the list; undefined if the list is empty
 * @public
 */
DoublyLinked.prototype.shift = function() {
  var ret = this.head;
  if (ret) {
    ret.remove();
    return ret.value;
  }
};

/**
 * Tests whether all elements in the list pass the test implemented by
 * the provided function (from left to right)
 *
 * @param {Function} callback - Function to test for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @public
 */
DoublyLinked.prototype.some = function(callback, thisArg) {
  return !this.every(function(element, index, instance) {
    return !callback.call(this, element, index, instance);
  }, thisArg);
};

/**
 * Tests whether at least one element in the list passes the test
 * implemented by the provided function (from right to left)
 *
 * @param {Function} callback - Function to test for each element
 * @param {*} [thisArg] - Value to use as this when executing callback
 * @public
 */
DoublyLinked.prototype.someRight = function(callback, thisArg) {
  return !this.everyRight(function(element, index, instance) {
    return !callback.call(this, element, index, instance);
  }, thisArg);
};

/**
 * Returns a new array containing elements of the list
 *
 * @return {Array} - A new Array instance contains elements of the list
 * @public
 */
DoublyLinked.prototype.toArray = function() {
  return this.reduce(function(acc, value) {
    acc.push(value);
    return acc;
  }, []);
};

/**
 * Returns a string representing the specified list and its elements.
 * @return {string} - Returns a string representing the specified list and its elements.
 */
DoublyLinked.prototype.toString = function() {
  return 'DoublyLinked(' + this.join() + ')';
};

/**
 * Adds one or more elements to the beginning of the list
 * the new length of the list
 *
 * @param {*} elementN - The elements to add to the front of the list
 * @returns {int} - The new length of the list
 * @public
 */
DoublyLinked.prototype.unshift = function(elementN) {
  const priv = this._priv;
  var node;
  for (var i = 0; i < arguments.length; i++) {
    node = new Node(this, arguments[i]);
    if (priv.length) {
      priv.head.prev = node;
      node.next = priv.head;
      priv.head = node;
    } else {
      priv.head = node;
      priv.tail = node;
    }
    priv.length++;
  }
  return priv.length;
};

/**
 * Returns the iterator object contains entries
 *
 * @return {Object} - Returns the iterator object contains entries
 */
DoublyLinked.prototype[Symbol.iterator] = function() {
  var _cursor;
  const self = this;
  return {
    next: function() {
      _cursor = _cursor ? _cursor.next : self.head;
      return {
        value: _cursor && _cursor.value,
        done: !_cursor
      };
    }
  };
};

/**
 *
 * @constructor
 */
function Node(list, value) {
  this.list = list;
  this.value = value;
}

Node.prototype.remove = function() {
  if (!this.list)
    return;
  if (this.prev)
    this.prev.next = this.next;
  if (this.next)
    this.next.prev = this.prev;
  if (this === this.list._priv.cursor)
    this.list._priv.cursor = this.next || this.prev;
  if (this === this.list._priv.head)
    this.list._priv.head = this.next;
  if (this === this.list._priv.tail)
    this.list._priv.tail = this.prev;
  this.list._priv.length--;
  this.prev = null;
  this.next = null;
  this.list = null;
};
