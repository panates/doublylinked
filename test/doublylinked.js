/* eslint-disable */
const assert = require('assert');
const DoublyLinked = require('../');

describe('Iteration', function() {

  var list = new DoublyLinked();

  beforeEach(function() {
    list.reset();
  });

  it('should push elements', function() {
    assert.equal(list.length, 0);
    var i;
    for (i = 0; i < 10; i++) {
      list.push(i);
    }
    assert.equal(list.length, 10);
    assert.equal(list.head.value, 0);
    assert.equal(list.tail.value, 9);
    list.reset();
    for (i = 0; i < 10; i++) {
      assert.equal(list.next(), i);
    }
  });

  it('should unshift elements', function() {
    list = new DoublyLinked();
    assert.equal(list.length, 0);
    var i;
    for (i = 9; i >= 0; i--) {
      list.unshift(i);
    }
    assert.equal(list.length, 10);
    assert.equal(list.head.value, 0);
    assert.equal(list.tail.value, 9);
    list.reset();
    for (i = 0; i < 10; i++) {
      assert.equal(list.next(), i);
    }
  });

  it('should next() return undefined after last element', function() {
    assert.equal(list.cursor, undefined);
    for (var i = 0; i < 10; i++) {
      assert.equal(list.next(), i);
    }
    assert.equal(list.next(), undefined);
  });

  it('should prev() return undefined after first element', function() {
    list.next();
    list.next();
    assert.equal(list.cursor.value, 1);
    list.prev();
    assert.equal(list.cursor.value, 0);
    assert.equal(list.prev(), undefined);
  });

  it('should prev() return last element after eof', function() {
    assert.equal(list.cursor, undefined);
    for (var i = 0; i < 10; i++) {
      assert.equal(list.next(), i);
    }
    assert.equal(list.next(), undefined);
    assert.equal(list.next(), undefined);
    assert.equal(list.prev(), 9);
  });

  it('should concat() other list', function() {
    const source = new DoublyLinked(1, 2);
    const other = new DoublyLinked('a', 'b', 'c');
    const merged = source.concat(other);
    assert.equal(merged.next(), 1);
    assert.equal(merged.next(), 2);
    assert.equal(merged.next(), 'a');
    assert.equal(merged.next(), 'b');
    assert.equal(merged.next(), 'c');
    assert.equal(merged.next(), undefined);
  });

  it('should concat() other elements', function() {
    const source = new DoublyLinked(1, 2);
    const merged = source.concat('a', 'b', 'c');
    assert.equal(merged.next(), 1);
    assert.equal(merged.next(), 2);
    assert.equal(merged.next(), 'a');
    assert.equal(merged.next(), 'b');
    assert.equal(merged.next(), 'c');
    assert.equal(merged.next(), undefined);
  });

  it('should every() continue iteration while callback returns true', function() {
    var i = 0;
    var result = list.every(function(element, index, instance) {
      assert.equal(index, i++);
      assert.equal(instance, list);
      assert(element <= 5);
      return (element < 5);
    });
    assert.equal(i, 6);
    assert.equal(result, false);
  });

  it('should every() return true when all callback returns true', function() {
    var i = 0;
    var result = list.every(function(element, index, instance) {
      assert.equal(index, i++);
      assert.equal(instance, list);
      return true;
    });
    assert.equal(result, true);
  });

  it('should every() return true when list is empty', function() {
    const l = new DoublyLinked();
    var result = l.every(function(element, index, instance) {
      return false;
    });
    assert.equal(result, true);
  });

  it('should every() use thisArg', function() {
    var _this = {};
    list.every(function(element, index, instance) {
      assert.equal(instance, _this);
      return false;
    }, _this);
  });

  it('should every() throw error if no callback given', function(done) {
    try {
      list.every();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should everyRight() return false when callback returns false', function() {
    var i = 9;
    var result = list.everyRight(function(element, index, instance) {
      assert.equal(index, i--);
      assert.equal(instance, list);
      assert(element >= 5);
      return (element > 5);
    });
    assert.equal(result, false);
  });

  it('should everyRight() return true when all callback returns true', function() {
    var i = 9;
    var result = list.everyRight(function(element, index, instance) {
      assert.equal(index, i--);
      assert.equal(instance, list);
      return true;
    });
    assert.equal(result, true);
  });

  it('should everyRight() return true when list is empty', function() {
    const l = new DoublyLinked();
    var result = l.everyRight(function(element, index, instance) {
      return false;
    });
    assert.equal(result, true);
  });

  it('should everyRight() use thisArg', function() {
    var _this = {};
    list.everyRight(function(element, index, instance) {
      assert.equal(instance, _this);
      return false;
    }, _this);
  });

  it('should everyRight() throw error if no callback given', function(done) {
    try {
      list.everyRight();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should filter() return new list', function() {
    const l = new DoublyLinked(1, 2, 3);
    var result = l.filter(function(element, index, instance) {
      assert.equal(element - 1, index);
      assert.equal(instance, l);
      return element !== 2;
    });
    assert.notEqual(result, l);
    assert.equal(result.next(), 1);
    assert.equal(result.next(), 3);
  });

  it('should filter() use thisArg', function() {
    var _this = {};
    list.filter(function(element, index, instance) {
      assert.equal(instance, _this);
      return false;
    }, _this);
  });

  it('should filter() throw error if no callback given', function(done) {
    try {
      list.filter();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should find() return locate cursor and return its value', function() {
    var result = list.find(function(element, index, instance) {
      assert.equal(element, index);
      assert.equal(instance, list);
      return element > 5;
    });
    assert.equal(result, 6);
    assert.equal(list.cursor.value, 6);
    assert.equal(list.next(), 7);
  });

  it('should find() use thisArg', function() {
    var _this = {};
    list.find(function(element, index, instance) {
      assert.equal(instance, _this);
      return true;
    }, _this);
  });

  it('should find() return undefined if list is empty', function() {
    const l = new DoublyLinked();
    var result = l.find(function(element, index, instance) {
      return true;
    }, this);
    assert.equal(result, undefined);
  });

  it('should find() throw error if no callback given', function(done) {
    try {
      list.find();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should forEach() iterate all nodes (left to right)', function() {
    var i = 0;
    list.forEach(function(element, index, instance) {
      assert.equal(element, index);
      assert.equal(instance, list);
      assert.equal(element, i++);
    });
    assert.equal(i, 10);
  });

  it('should forEach() use thisArg', function() {
    var _this = {};
    list.forEach(function(element, index, instance) {
      assert.equal(instance, _this);
    }, _this);
  });

  it('should forEach() skip process if list is empty', function() {
    const l = new DoublyLinked();
    l.forEach(function(element, index, instance) {
      assert(true);
    }, this);
  });

  it('should forEach() throw error if no callback given', function(done) {
    try {
      list.forEach();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should forEachRight() iterate all nodes (right to left)', function() {
    var i = 9;
    list.forEachRight(function(element, index, instance) {
      assert.equal(element, index);
      assert.equal(instance, list);
      assert.equal(element, i--);
    });
    assert.deepEqual(i, -1);
  });

  it('should forEachRight() use thisArg', function() {
    var _this = {};
    list.forEachRight(function(element, index, instance) {
      assert.equal(instance, _this);
    }, _this);
  });

  it('should forEachRight() skip process if list is empty', function() {
    const l = new DoublyLinked();
    l.forEachRight(function(element, index, instance) {
      assert(true);
    }, this);
  });

  it('should forEachRight() throw error if no callback given', function(done) {
    try {
      list.forEachRight();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should includes() return locate cursor and return true or false', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 3, 6, NaN);
    assert.equal(l.includes(3), true);
    assert.equal(l.cursor.value, 3);
    assert.equal(l.includes(NaN), true);
    assert(isNaN(l.cursor.value));
    assert.equal(l.includes(100), false);
    assert.equal(l.cursor, undefined);
    assert.equal(l.includes(3, -3), true);
    assert.equal(l.cursor.value, 3);
    assert.equal(l.next(), 6);
  });

  it('should insert() values after current cursor', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 3, 6, NaN);
    assert.equal(l.includes(3), true);
    l.insert('a', 'b', 'c');
    assert.equal(l.cursor.value, 'c');
    assert.equal(l.prev(), 'b');
    assert.equal(l.prev(), 'a');
    assert.equal(l.prev(), 3);
  });

  it('should insert() is list is empty', function() {
    const l = new DoublyLinked();
    l.insert('a', 'b', 'c');
    assert.equal(l.cursor.value, 'c');
    assert.equal(l.prev(), 'b');
    assert.equal(l.prev(), 'a');
    assert.equal(l.prev(), undefined);
  });

  it('should join() list values', function() {
    const l = new DoublyLinked(1, 2, 'a', 'b');
    assert.equal(l.join(), '1,2,a,b');
    assert.equal(l.join(';'), '1;2;a;b');
  });

  it('should map() create a new list', function() {
    var i = 0;
    const l = list.map(function(element, index, instance) {
      assert.equal(element, index);
      assert.equal(instance, list);
      assert.equal(element, i++);
      return element + 10;
    }, this);
    assert.notEqual(l, list);
    assert.equal(l.next(), 10);
    assert.equal(l.next(), 11);
    assert.equal(l.length, list.length);
  });

  it('should map() throw error if no callback given', function(done) {
    try {
      list.map();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should pop() remove node from tail and return its value', function() {
    const l = new DoublyLinked(1, 2, 3, 4);
    assert.equal(l.length, 4);
    assert.equal(l.pop(), 4);
    assert.equal(l.length, 3);
    assert.equal(l.pop(), 3);
    assert.equal(l.length, 2);
    assert.equal(l.pop(), 2);
    assert.equal(l.length, 1);
    assert.equal(l.pop(), 1);
    assert.equal(l.length, 0);
    assert.equal(l.pop(), undefined);
    assert.equal(l.length, 0);
    assert.equal(l.head, undefined);
    assert.equal(l.tail, undefined);
  });

  it('should reduce() iterate all nodes set accumulator (left to right)', function() {
    var i = 0;
    var acc = 100;
    const result = list.reduce(function(accumulator, value, index, instance) {
      assert.equal(value, i);
      assert.equal(index, i++);
      assert.equal(instance, list);
      assert.equal(accumulator, acc);
      acc = acc + value;
      return acc;
    }, acc);
    assert.equal(result, 145);
  });

  it('should reduce() throw error if no callback given', function(done) {
    try {
      list.reduce();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should reduceRight() iterate all nodes set accumulator (left to right)', function() {
    var i = 9;
    var acc = 100;
    const result = list.reduceRight(function(accumulator, value, index, instance) {
      assert.equal(value, i);
      assert.equal(index, i--);
      assert.equal(instance, list);
      assert.equal(accumulator, acc);
      acc = acc + value;
      return acc;
    }, acc);
    assert.equal(result, 145);
  });

  it('should reduceRight() throw error if no callback given', function(done) {
    try {
      list.reduceRight();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should remove() find and remove node', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 5);
    assert.equal(l.length, 5);
    assert.equal(l.remove(4), 4);
    assert.equal(l.length, 4);
    assert.equal(l.cursor.value, 5);
    assert.equal(l.remove(5), 5);
    assert.equal(l.length, 3);
    assert.equal(l.cursor.value, 3);
    assert.equal(l.remove(1), 1);
    assert.equal(l.length, 2);
    assert.equal(l.cursor.value, 2);
  });

  it('should remove() do nothing if element is not found', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 5);
    assert.equal(l.length, 5);
    assert.equal(l.remove(10), undefined);
    assert.equal(l.length, 5);
  });

  it('should reverse() change the elements order in place', function() {
    const l = new DoublyLinked(1, 2, 3);
    l.reverse();
    assert.equal(l.next(), 3);
    assert.equal(l.next(), 2);
    assert.equal(l.next(), 1);
  });

  it('should toArray() create new array filled with list values', function() {
    const l = new DoublyLinked(1, 2, 3);
    const arr = l.toArray();
    assert.deepEqual(arr, [1, 2, 3]);
  });

  it('should shift() remove node from head and return its value', function() {
    const l = new DoublyLinked(1, 2, 3, 4);
    assert.equal(l.length, 4);
    assert.equal(l.shift(), 1);
    assert.equal(l.length, 3);
    assert.equal(l.shift(), 2);
    assert.equal(l.length, 2);
    assert.equal(l.shift(), 3);
    assert.equal(l.length, 1);
    assert.equal(l.shift(), 4);
    assert.equal(l.length, 0);
    assert.equal(l.shift(), undefined);
    assert.equal(l.length, 0);
    assert.equal(l.head, undefined);
    assert.equal(l.tail, undefined);
  });

  it('should some() continue iteration while callback returns false', function() {
    var i = 0;
    var result = list.some(function(element, index, instance) {
      assert.equal(index, i++);
      assert.equal(instance, list);
      assert(element <= 5);
      return (element === 5);
    });
    assert.equal(i, 6);
    assert.equal(result, true);
  });

  it('should some() return false when all callback returns false', function() {
    var i = 0;
    var result = list.some(function(element, index, instance) {
      assert.equal(index, i++);
      assert.equal(instance, list);
      return false;
    });
    assert.equal(result, false);
  });

  it('should some() return false when list is empty', function() {
    const l = new DoublyLinked();
    var result = l.some(function(element, index, instance) {
      return false;
    });
    assert.equal(result, false);
  });

  it('should some() use thisArg', function() {
    var _this = {};
    list.some(function(element, index, instance) {
      assert.equal(instance, _this);
      return false;
    }, _this);
  });

  it('should some() throw error if no callback given', function(done) {
    try {
      list.some();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should someRight() continue iteration while callback returns false', function() {
    var i = 9;
    var result = list.someRight(function(element, index, instance) {
      assert.equal(index, i--);
      assert.equal(instance, list);
      assert(element >= 5);
      return (element === 5);
    });
    assert.equal(i, 4);
    assert.equal(result, true);
  });

  it('should some() return false when all callback returns false', function() {
    var i = 9;
    var result = list.someRight(function(element, index, instance) {
      assert.equal(index, i--);
      assert.equal(instance, list);
      return false;
    });
    assert.equal(result, false);
  });

  it('should someRight() return false when list is empty', function() {
    const l = new DoublyLinked();
    var result = l.someRight(function(element, index, instance) {
      return false;
    });
    assert.equal(result, false);
  });

  it('should someRight() use thisArg', function() {
    var _this = {};
    list.someRight(function(element, index, instance) {
      assert.equal(instance, _this);
      return false;
    }, _this);
  });

  it('should someRight() throw error if no callback given', function(done) {
    try {
      list.someRight();
    } catch (e) {
      return done();
    }
    assert(true);
  });

  it('should toString() returns string represtation', function() {
    const l = new DoublyLinked(1, 2, 'a', 'b');
    assert.equal(l.toString(), 'DoublyLinked(1,2,a,b)');
  });

  it('should entries() returns an Iterator object', function() {
    const iterator = list.entries();
    assert.equal(iterator.value, undefined);
    for (var i = 0; i < 10; i++) {
      assert.equal(iterator.next().value, i);
    }
    assert.equal(iterator.next().value, undefined);
  });

  it('should iterate with for/of', function() {
    var k = 0;
    // noinspection JSAnnotator
    for (var i of list) {
      assert.equal(i, k++);
    }
  });

  it('should remove with node.remove() method', function() {
    const l = new DoublyLinked(1, 2, 3, 4);
    assert.equal(l.length, 4);
    l.next();
    l.next();
    var c = l.cursor;
    c.remove();
    assert.equal(l.length, 3);
    assert.equal(l.cursor.value, 3);
    c.remove();
    assert.equal(l.length, 3);
    assert.equal(l.cursor.value, 3);
    c = l.cursor;
    l.next();
    c.remove();
    assert.equal(l.length, 2);
    assert.equal(l.cursor.value, 4);
  });

});
