---
title: 集合
order: 19
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /JavaScript
  title: JavaScript
  order: 3
---

## `set` 集合

一直以来，JS 只能使用数组和对象来保存多个数据，缺乏像其他语言那样拥有丰富的集合类型。因此，ES6 新增了两种集合类型（set 和 map），用于在不同的场景中发挥作用。

**`set`用于存放不重复的数据**

### 创建`set`集合

```js
new Set(); //创建一个没有任何内容的set集合

new Set(iterable); //创建一个具有初始内容的set集合，内容来自于可迭代对象每一次迭代的结果
```

### 对`set`集合进行后续操作

- `add(数据)`: 添加一个数据到`set`集合末尾，如果数据已存在，则不进行任何操作
  - `set`使用`Object.is`的方式判断两个数据是否相同，但是，针对`+0`和`-0`，`set`认为是相等
- `has(数据)`: 判断`set`中是否存在对应的数据
- `delete(数据)`：删除匹配的数据，返回是否删除成功
- `clear()`：清空整个 set 集合
- `size`: 获取`set`集合中的元素数量，只读属性，无法重新赋值

### 与数组进行相互转换

```js
const s = new Set([x, x, x, x, x]);
// set本身也是一个可迭代对象，每次迭代的结果就是每一项的值
const arr = [...s];
```

### 遍历`set`集合

- `for...of`
- `forEach(callback(value, key, set), thisArg)`: 遍历`set`集合，执行回调函数
- `forEach(item,index,s)` - 注意：`set`集合中不存在下标，因此`forEach`中的回调的第二个参数和第一个参数是一致的，均表示`set`中的每一项
- `keys()`: 返回一个遍历器对象，该对象包含`set`集合中每一项的键名
- `values()`: 返回一个遍历器对象，该对象包含`set`集合中每一项的键值

### 手写`set`

```js
class MySet {
  constructor(iterator = []) {
    //验证是否是可迭代的对象
    if (typeof iterator[Symbol.iterator] !== 'function') {
      throw new TypeError(`你提供的${iterator}不是一个可迭代的对象`);
    }
    this._datas = [];
    for (const item of iterator) {
      this.add(item);
    }
  }

  get size() {
    return this._datas.length;
  }

  add(data) {
    if (!this.has(data)) {
      this._datas.push(data);
    }
  }

  has(data) {
    for (const item of this._datas) {
      if (this.isEqual(data, item)) {
        return true;
      }
    }
    return false;
  }

  delete(data) {
    for (let i = 0; i < this._datas.length; i++) {
      const element = this._datas[i];
      if (this.isEqual(element, data)) {
        //删除
        this._datas.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  clear() {
    this._datas.length = 0;
  }

  *[Symbol.iterator]() {
    for (const item of this._datas) {
      yield item;
    }
  }

  forEach(callback) {
    for (const item of this._datas) {
      callback(item, item, this);
    }
  }

  /**
   * 判断两个数据是否相等
   * @param {*} data1
   * @param {*} data2
   */
  isEqual(data1, data2) {
    if (data1 === 0 && data2 === 0) {
      return true;
    }
    return Object.is(data1, data2);
  }
}
```

## `map` 集合

键值对（key value pair）数据集合的特点：键不可重复

`map`集合专门用于存储多个键值对数据。

在`map`出现之前，我们使用的是对象的方式来存储键值对，键是属性名，值是属性值。

使用对象存储有以下问题：

- 键名只能是字符串
- 获取数据的数量不方便
- 键名容易跟原型上的名称冲突

### 创建`map`集合

```js
new Map(); //创建一个没有任何内容的map集合

new Map(iterable); //创建一个具有初始内容的map集合，内容来自于可迭代对象每一次迭代的结果
// 但是，它要求每一次迭代的结果必须是一个长度为2的数组，数组第一项表示键，数组的第二项表示值
new Map([
  ['a', 3],
  ['b', 4],
]); // a => 3, b => 4
```

### 对`map`集合进行后续操作

- `set(key,value)`: 设置一个键值对，如果`key`已经存在，则更新对应的`value`
- `get(key)`: 获取`key`对应的`value`
- `has(key)`: 判断`map`中是否存在对应的数据
- `delete(key)`：删除匹配的数据，返回是否删除成功
- `clear()`：清空整个 `map` 集合
- `size`: 获取`map`集合中的元素数量，只读属性，无法重新赋值

### 与数组进行相互转换

```js
const m = new Map([
  [x, x],
  [x, x],
]);
// map本身就是一个可迭代对象，每次迭代的结果就是每一项的值
const arr = [...m];
```

### 遍历`map`集合

- `for...of`: 每次迭代得到的是一个长度为 2 的数组
- `forEach(value,key,m)`: 参数 1：每一项的值，参数 2：每一项的键，参数 3：map 本身

### 手写`map`

```js
class MyMap {
  constructor(iterable = []) {
    //验证是否是可迭代的对象
    if (typeof iterable[Symbol.iterator] !== 'function') {
      throw new TypeError(`你提供的${iterable}不是一个可迭代的对象`);
    }
    this._datas = [];
    for (const item of iterable) {
      // item 也得是一个可迭代对象
      if (typeof item[Symbol.iterator] !== 'function') {
        throw new TypeError(`你提供的${item}不是一个可迭代的对象`);
      }
      const iterator = item[Symbol.iterator]();
      const key = iterator.next().value;
      const value = iterator.next().value;
      this.set(key, value);
    }
  }

  set(key, value) {
    const obj = this._getObj(key);
    if (obj) {
      //修改
      obj.value = value;
    } else {
      this._datas.push({
        key,
        value,
      });
    }
  }

  get(key) {
    const item = this._getObj(key);
    if (item) {
      return item.value;
    }
    return undefined;
  }

  get size() {
    return this._datas.length;
  }

  delete(key) {
    for (let i = 0; i < this._datas.length; i++) {
      const element = this._datas[i];
      if (this.isEqual(element.key, key)) {
        this._datas.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  clear() {
    this._datas.length = 0;
  }

  /**
   * 根据key值从内部数组中，找到对应的数组项
   * @param {*} key
   */
  _getObj(key) {
    for (const item of this._datas) {
      if (this.isEqual(item.key, key)) {
        return item;
      }
    }
  }

  has(key) {
    return this._getObj(key) !== undefined;
  }

  /**
   * 判断两个数据是否相等
   * @param {*} data1
   * @param {*} data2
   */
  isEqual(data1, data2) {
    if (data1 === 0 && data2 === 0) {
      return true;
    }
    return Object.is(data1, data2);
  }

  *[Symbol.iterator]() {
    for (const item of this._datas) {
      yield [item.key, item.value];
    }
  }

  forEach(callback) {
    for (const item of this._datas) {
      callback(item.value, item.key, this);
    }
  }
}
```

## `WeakSet` 和 `WeakMap`

### `WeakSet`

使用该集合，可以实现和`set`一样的功能，不同的是：

- 它内部存储的对象地址不会影响垃圾回收
- 只能添加对象
- 不能遍历（不是可迭代的对象）、没有 size 属性、没有 forEach 方法

```js
let obj = {
  name: 'yj',
  age: 18,
};
const set = new Set();
const wSet = new WeakSet();
set.add(obj);
wSet.add(obj);

obj = null;
console.log(set); // 有值
console.log(wSet); // 空
```

### `WeakMap`

类似于`map`的集合，不同的是：

- 它的键存储的地址不会影响垃圾回收
- 它的键只能是对象
- 不能遍历（不是可迭代的对象）、没有 size 属性、没有 forEach 方法
