/* eslint-disable */
const assert = require('assert');
const DoublyLinked = require('../');

describe('Iteration', function() {

  let list = new DoublyLinked();

  beforeEach(function() {
    list.reset();
  });

  it('should push elements', function() {
    assert.strictEqual(list.length, 0);
    for (let i = 0; i < 10; i++) {
      list.push(i);
    }
    assert.strictEqual(list.length, 10);
    assert.strictEqual(list.head.value, 0);
    assert.strictEqual(list.tail.value, 9);
    list.reset();
    for (let i = 0; i < 10; i++) {
      assert.strictEqual(list.next(), i);
    }
  });

  it('should unshift elements', function() {
    list = new DoublyLinked();
    assert.strictEqual(list.length, 0);
    for (let i = 9; i >= 0; i--) {
      list.unshift(i);
    }
    assert.strictEqual(list.length, 10);
    assert.strictEqual(list.head.value, 0);
    assert.strictEqual(list.tail.value, 9);
    list.reset();
    for (let i = 0; i < 10; i++) {
      assert.strictEqual(list.next(), i);
    }
  });

  it('should next() return undefined after last element', function() {
    assert.strictEqual(list.cursor, undefined);
    for (let i = 0; i < 10; i++) {
      assert.strictEqual(list.next(), i);
    }
    assert.strictEqual(list.next(), undefined);
  });

  it('should prev() return undefined after first element', function() {
    list.next();
    list.next();
    assert.strictEqual(list.cursor.value, 1);
    list.prev();
    assert.strictEqual(list.cursor.value, 0);
    assert.strictEqual(list.prev(), undefined);
  });

  it('should prev() return last element after eof', function() {
    assert.strictEqual(list.cursor, undefined);
    for (let i = 0; i < 10; i++) {
      assert.strictEqual(list.next(), i);
    }
    assert.strictEqual(list.next(), undefined);
    assert.strictEqual(list.next(), undefined);
    assert.strictEqual(list.prev(), 9);
  });

  it('should concat() other list', function() {
    const source = new DoublyLinked(1, 2);
    const other = new DoublyLinked('a', 'b', 'c');
    const merged = source.concat(other);
    assert.strictEqual(merged.next(), 1);
    assert.strictEqual(merged.next(), 2);
    assert.strictEqual(merged.next(), 'a');
    assert.strictEqual(merged.next(), 'b');
    assert.strictEqual(merged.next(), 'c');
    assert.strictEqual(merged.next(), undefined);
  });

  it('should concat() other elements', function() {
    const source = new DoublyLinked(1, 2);
    const merged = source.concat('a', 'b', 'c');
    assert.strictEqual(merged.next(), 1);
    assert.strictEqual(merged.next(), 2);
    assert.strictEqual(merged.next(), 'a');
    assert.strictEqual(merged.next(), 'b');
    assert.strictEqual(merged.next(), 'c');
    assert.strictEqual(merged.next(), undefined);
  });

  it('should every() continue iteration while callback returns true', function() {
    let i = 0;
    let result = list.every((element, index, instance) => {
      assert.strictEqual(index, i++);
      assert.strictEqual(instance, list);
      assert(element <= 5);
      return (element < 5);
    });
    assert.strictEqual(i, 6);
    assert.strictEqual(result, false);
  });

  it('should every() return true when all callback returns true', function() {
    let i = 0;
    let result = list.every((element, index, instance) => {
      assert.strictEqual(index, i++);
      assert.strictEqual(instance, list);
      return true;
    });
    assert.strictEqual(result, true);
  });

  it('should every() return true when list is empty', function() {
    const l = new DoublyLinked();
    const result = l.every(() => false);
    assert.strictEqual(result, true);
  });

  it('should every() use thisArg', function() {
    const _this = {};
    list.every(function(element, index, instance) {
      assert.strictEqual(instance, _this);
      return false;
    }, _this);
  });

  it('should every() throw error if no callback given', function() {
    assert.throws(() => list.every());
  });

  it('should everyRight() return false when callback returns false', function() {
    let i = 9;
    const result = list.everyRight((element, index, instance) => {
      assert.strictEqual(index, i--);
      assert.strictEqual(instance, list);
      assert(element >= 5);
      return (element > 5);
    });
    assert.strictEqual(result, false);
  });

  it('should everyRight() return true when all callback returns true', function() {
    let i = 9;
    const result = list.everyRight((element, index, instance) => {
      assert.strictEqual(index, i--);
      assert.strictEqual(instance, list);
      return true;
    });
    assert.strictEqual(result, true);
  });

  it('should everyRight() return true when list is empty', function() {
    const l = new DoublyLinked();
    const result = l.everyRight(() => false);
    assert.strictEqual(result, true);
  });

  it('should everyRight() use thisArg', function() {
    const _this = {};
    list.everyRight((element, index, instance) => {
      assert.strictEqual(instance, _this);
      return false;
    }, _this);
  });

  it('should everyRight() throw error if no callback given', function() {
    assert.throws(() => list.everyRight());
  });

  it('should filter() return new list', function() {
    const l = new DoublyLinked(1, 2, 3);
    const result = l.filter((element, index, instance) => {
      assert.strictEqual(element - 1, index);
      assert.strictEqual(instance, l);
      return element !== 2;
    });
    assert.notStrictEqual(result, l);
    assert.strictEqual(result.next(), 1);
    assert.strictEqual(result.next(), 3);
  });

  it('should filter() use thisArg', function() {
    const _this = {};
    list.filter(function(element, index, instance) {
      assert.strictEqual(instance, _this);
      return false;
    }, _this);
  });

  it('should filter() throw error if no callback given', function() {
    assert.throws(() => list.filter());
  });

  it('should find() return locate cursor and return its value', function() {
    const result = list.find((element, index, instance) => {
      assert.strictEqual(element, index);
      assert.strictEqual(instance, list);
      return element > 5;
    });
    assert.strictEqual(result, 6);
    assert.strictEqual(list.cursor.value, 6);
    assert.strictEqual(list.next(), 7);
  });

  it('should find() use thisArg', function() {
    const _this = {};
    list.find((element, index, instance) => {
      assert.strictEqual(instance, _this);
      return true;
    }, _this);
  });

  it('should find() return undefined if list is empty', function() {
    const l = new DoublyLinked();
    const result = l.find(() => true, this);
    assert.strictEqual(result, undefined);
  });

  it('should find() throw error if no callback given', function() {
    assert.throws(() => list.find());
  });

  it('should forEach() iterate all nodes (left to right)', function() {
    let i = 0;
    list.forEach((element, index, instance) => {
      assert.strictEqual(element, index);
      assert.strictEqual(instance, list);
      assert.strictEqual(element, i++);
    });
    assert.strictEqual(i, 10);
  });

  it('should forEach() use thisArg', function() {
    const _this = {};
    list.forEach((element, index, instance) => {
      assert.strictEqual(instance, _this);
    }, _this);
  });

  it('should forEach() skip process if list is empty', function() {
    const l = new DoublyLinked();
    l.forEach(() => assert(0, 'Failed'));
  });

  it('should forEach() throw error if no callback given', function() {
    assert.throws(() => list.forEach());
  });

  it('should forEachRight() iterate all nodes (right to left)', function() {
    let i = 9;
    list.forEachRight((element, index, instance) => {
      assert.strictEqual(element, index);
      assert.strictEqual(instance, list);
      assert.strictEqual(element, i--);
    });
    assert.deepStrictEqual(i, -1);
  });

  it('should forEachRight() use thisArg', function() {
    const _this = {};
    list.forEachRight((element, index, instance) => {
      assert.strictEqual(instance, _this);
    }, _this);
  });

  it('should forEachRight() skip process if list is empty', function() {
    const l = new DoublyLinked();
    l.forEachRight(() => assert(0, 'Failed'));
  });

  it('should forEachRight() throw error if no callback given', function() {
    assert.throws(() => list.forEachRight());
  });

  it('should includes() return locate cursor and return true or false', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 3, 6, NaN);
    assert.strictEqual(l.includes(3), true);
    assert.strictEqual(l.cursor.value, 3);
    assert.strictEqual(l.includes(NaN), true);
    assert(isNaN(l.cursor.value));
    assert.strictEqual(l.includes(100), false);
    assert.strictEqual(l.cursor, undefined);
    assert.strictEqual(l.includes(3, -3), true);
    assert.strictEqual(l.cursor.value, 3);
    assert.strictEqual(l.next(), 6);
  });

  it('should insert() values after current cursor', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 3, 6, NaN);
    assert.strictEqual(l.includes(3), true);
    l.insert('a', 'b', 'c');
    assert.strictEqual(l.cursor.value, 'c');
    assert.strictEqual(l.prev(), 'b');
    assert.strictEqual(l.prev(), 'a');
    assert.strictEqual(l.prev(), 3);
  });

  it('should insert() is list is empty', function() {
    const l = new DoublyLinked();
    l.insert('a', 'b', 'c');
    assert.strictEqual(l.cursor.value, 'c');
    assert.strictEqual(l.prev(), 'b');
    assert.strictEqual(l.prev(), 'a');
    assert.strictEqual(l.prev(), undefined);
  });

  it('should join() list values', function() {
    const l = new DoublyLinked(1, 2, 'a', 'b');
    assert.strictEqual(l.join(), '1,2,a,b');
    assert.strictEqual(l.join(';'), '1;2;a;b');
  });

  it('should map() create a new list', function() {
    let i = 0;
    const l = list.map((element, index, instance) => {
      assert.strictEqual(element, index);
      assert.strictEqual(instance, list);
      assert.strictEqual(element, i++);
      return element + 10;
    });
    assert.notStrictEqual(l, list);
    assert.strictEqual(l.next(), 10);
    assert.strictEqual(l.next(), 11);
    assert.strictEqual(l.length, list.length);
  });

  it('should map() throw error if no callback given', function() {
    assert.throws(() => list.map());
  });

  it('should pop() remove node from tail and return its value', function() {
    const l = new DoublyLinked(1, 2, 3, 4);
    assert.strictEqual(l.length, 4);
    assert.strictEqual(l.pop(), 4);
    assert.strictEqual(l.length, 3);
    assert.strictEqual(l.pop(), 3);
    assert.strictEqual(l.length, 2);
    assert.strictEqual(l.pop(), 2);
    assert.strictEqual(l.length, 1);
    assert.strictEqual(l.pop(), 1);
    assert.strictEqual(l.length, 0);
    assert.strictEqual(l.pop(), undefined);
    assert.strictEqual(l.length, 0);
    assert.strictEqual(l.head, undefined);
    assert.strictEqual(l.tail, undefined);
  });

  it('should reduce() iterate all nodes set accumulator (left to right)', function() {
    let i = 0;
    let acc = 100;
    const result = list.reduce((accumulator, value, index, instance) => {
      assert.strictEqual(value, i);
      assert.strictEqual(index, i++);
      assert.strictEqual(instance, list);
      assert.strictEqual(accumulator, acc);
      acc = acc + value;
      return acc;
    }, acc);
    assert.strictEqual(result, 145);
  });

  it('should reduce() throw error if no callback given', function() {
    assert.throws(() => list.reduce());
  });

  it('should reduceRight() iterate all nodes set accumulator (left to right)', function() {
    let i = 9;
    let acc = 100;
    const result = list.reduceRight((accumulator, value, index, instance) => {
      assert.strictEqual(value, i);
      assert.strictEqual(index, i--);
      assert.strictEqual(instance, list);
      assert.strictEqual(accumulator, acc);
      acc = acc + value;
      return acc;
    }, acc);
    assert.strictEqual(result, 145);
  });

  it('should reduceRight() throw error if no callback given', function() {
    assert.throws(() => list.reduceRight());
  });

  it('should remove() find and remove node', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 5);
    assert.strictEqual(l.length, 5);
    assert.strictEqual(l.remove(4), 4);
    assert.strictEqual(l.length, 4);
    assert.strictEqual(l.cursor.value, 5);
    assert.strictEqual(l.remove(5), 5);
    assert.strictEqual(l.length, 3);
    assert.strictEqual(l.cursor.value, 3);
    assert.strictEqual(l.remove(1), 1);
    assert.strictEqual(l.length, 2);
    assert.strictEqual(l.cursor.value, 2);
  });

  it('should remove() do nothing if element is not found', function() {
    const l = new DoublyLinked(1, 2, 3, 4, 5);
    assert.strictEqual(l.length, 5);
    assert.strictEqual(l.remove(10), undefined);
    assert.strictEqual(l.length, 5);
  });

  it('should reverse() change the elements order in place', function() {
    const l = new DoublyLinked(1, 2, 3);
    l.reverse();
    assert.strictEqual(l.next(), 3);
    assert.strictEqual(l.next(), 2);
    assert.strictEqual(l.next(), 1);
  });

  it('should toArray() create new array filled with list values', function() {
    const l = new DoublyLinked(1, 2, 3);
    const arr = l.toArray();
    assert.deepStrictEqual(arr, [1, 2, 3]);
  });

  it('should shift() remove node from head and return its value', function() {
    const l = new DoublyLinked(1, 2, 3, 4);
    assert.strictEqual(l.length, 4);
    assert.strictEqual(l.shift(), 1);
    assert.strictEqual(l.length, 3);
    assert.strictEqual(l.shift(), 2);
    assert.strictEqual(l.length, 2);
    assert.strictEqual(l.shift(), 3);
    assert.strictEqual(l.length, 1);
    assert.strictEqual(l.shift(), 4);
    assert.strictEqual(l.length, 0);
    assert.strictEqual(l.shift(), undefined);
    assert.strictEqual(l.length, 0);
    assert.strictEqual(l.head, undefined);
    assert.strictEqual(l.tail, undefined);
  });

  it('should some() continue iteration while callback returns false', function() {
    let i = 0;
    let result = list.some((element, index, instance) => {
      assert.strictEqual(index, i++);
      assert.strictEqual(instance, list);
      assert(element <= 5);
      return (element === 5);
    });
    assert.strictEqual(i, 6);
    assert.strictEqual(result, true);
  });

  it('should some() return false when all callback returns false', function() {
    let i = 0;
    let result = list.some((element, index, instance) => {
      assert.strictEqual(index, i++);
      assert.strictEqual(instance, list);
      return false;
    });
    assert.strictEqual(result, false);
  });

  it('should some() return false when list is empty', function() {
    const l = new DoublyLinked();
    const result = l.some(() => false);
    assert.strictEqual(result, false);
  });

  it('should some() use thisArg', function() {
    let _this = {};
    list.some((element, index, instance) => {
      assert.strictEqual(instance, _this);
      return false;
    }, _this);
  });

  it('should some() throw error if no callback given', function() {
    assert.throws(() => list.some());
  });

  it('should someRight() continue iteration while callback returns false', function() {
    let i = 9;
    const result = list.someRight((element, index, instance) => {
      assert.strictEqual(index, i--);
      assert.strictEqual(instance, list);
      assert(element >= 5);
      return (element === 5);
    });
    assert.strictEqual(i, 4);
    assert.strictEqual(result, true);
  });

  it('should some() return false when all callback returns false', function() {
    let i = 9;
    let result = list.someRight((element, index, instance) => {
      assert.strictEqual(index, i--);
      assert.strictEqual(instance, list);
      return false;
    });
    assert.strictEqual(result, false);
  });

  it('should someRight() return false when list is empty', function() {
    const l = new DoublyLinked();
    const result = l.someRight(() => false);
    assert.strictEqual(result, false);
  });

  it('should someRight() use thisArg', function() {
    const _this = {};
    list.someRight((element, index, instance) => {
      assert.strictEqual(instance, _this);
      return false;
    }, _this);
  });

  it('should someRight() throw error if no callback given', function() {
    assert.throws(() => list.someRight());
  });

  it('should toString() returns string represtation', function() {
    const l = new DoublyLinked(1, 2, 'a', 'b');
    assert.strictEqual(l.toString(), 'DoublyLinked(1,2,a,b)');
  });

  it('should entries() returns an Iterator object', function() {
    const iterator = list.entries();
    assert.strictEqual(iterator.value, undefined);
    for (let i = 0; i < 10; i++) {
      assert.strictEqual(iterator.next().value, i);
    }
    assert.strictEqual(iterator.next().value, undefined);
  });

  it('should iterate with for/of', function() {
    let k = 0;
    // noinspection JSAnnotator
    for (const i of list) {
      assert.strictEqual(i, k++);
    }
  });

  it('should remove with node.remove() method', function() {
    const l = new DoublyLinked(1, 2, 3, 4);
    assert.strictEqual(l.length, 4);
    l.next();
    l.next();
    let c = l.cursor;
    c.remove();
    assert.strictEqual(l.length, 3);
    assert.strictEqual(l.cursor.value, 3);
    c.remove();
    assert.strictEqual(l.length, 3);
    assert.strictEqual(l.cursor.value, 3);
    c = l.cursor;
    l.next();
    c.remove();
    assert.strictEqual(l.length, 2);
    assert.strictEqual(l.cursor.value, 4);
  });

});
