---
title: 迭代器和生成器
order: 18
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

## 迭代器

### 背景知识

#### 什么是迭代？

从一个数据集合中按照一定的顺序，不断取出数据的过程

#### 迭代和遍历的区别？

迭代强调的是依次取数据，并不保证取多少，也不保证把所有的数据取完

遍历强调的是要把整个数据依次全部取出

#### 迭代器

对迭代过程的封装，在不同的语言中有不同的表现形式，通常为对象

#### 迭代模式

一种设计模式，用于统一迭代过程，并规范了迭代器规格：

- 迭代器应该具有得到下一个数据的能力
- 迭代器应该具有判断是否还有后续数据的能力

### JS 中的迭代器

JS 规定，如果一个对象具有 next 方法，并且该方法返回一个对象，该对象的格式如下：

```js
{value: 值, done: 是否迭代完成}
```

则认为该对象是一个迭代器

含义：

- `next`方法：用于得到下一个数据
- 返回的对象
  - `value`：下一个数据的值
  - `done`：boolean，是否迭代完成

```js
const arr = [1, 2, 3, 4, 5];
//迭代数组arr
const iterator = {
  i: 0, //当前的数组下标
  next() {
    var result = {
      value: arr[this.i],
      done: this.i >= arr.length,
    };
    this.i++;
    return result;
  },
};

//让迭代器不断的取出下一个数据，直到没有数据为止
let data = iterator.next();
while (!data.done) {
  //只要没有迭代完成，则取出数据
  console.log(data.value);
  //进行下一次迭代
  data = iterator.next();
}

console.log('迭代完成');
```

迭代器是数据与操作过程分离，不需要每次都重新写一遍操作过程

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9];

// 迭代器创建函数  iterator creator
function createIterator(arr) {
  let i = 0; //当前的数组下标
  return {
    next() {
      var result = {
        value: arr[i],
        done: i >= arr.length,
      };
      i++;
      return result;
    },
  };
}

const iter1 = createIterator(arr1);
const iter2 = createIterator(arr2);
```

例子：依次得到斐波拉契数列前面 n 位的值

```js
// 依次得到斐波拉契数列前面n位的值
// 1 1 2 3 5 8 13 .....

//创建一个斐波拉契数列的迭代器
function createFeiboIterator() {
  let prev1 = 1,
    prev2 = 1, //当前位置的前1位和前2位
    n = 1; //当前是第几位

  return {
    next() {
      let value;
      if (n <= 2) {
        value = 1;
      } else {
        value = prev1 + prev2;
      }
      const result = {
        value,
        done: false,
      };
      prev2 = prev1;
      prev1 = result.value;
      n++;
      return result;
    },
  };
}

const iterator = createFeiboIterator();
```

### 可迭代协议

#### 概念回顾

- 迭代器(iterator)：一个具有 next 方法的对象，next 方法返回下一个数据并且能指示是否迭代完成
- 迭代器创建函数（iterator creator）：一个返回迭代器的函数

```js
//可迭代对象
var obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    const keys = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        const propName = keys[i];
        const propValue = this[propName];
        const result = {
          value: {
            propName,
            propValue,
          },
          done: i >= keys.length,
        };
        i++;
        return result;
      },
    };
  },
};

for (const item of obj) {
  console.log(item); // {propName:"a", propValue:1}
}
```

#### 可迭代协议

ES6 规定，如果一个对象具有知名符号属性 Symbol.iterator，并且属性值是一个迭代器创建函数，则该对象是可迭代的（iterable）

#### `for-of` 循环

`for-of` 循环用于遍历可迭代对象，格式如下

```js
//迭代完成后循环结束
for (const item of iterable) {
  //iterable：可迭代对象
  //item：每次迭代得到的数据
}
```

#### 展开运算符与可迭代对象

展开运算符可以作用于可迭代对象，这样，就可以轻松的将可迭代对象转换为数组

```js
var obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    const keys = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        const propName = keys[i];
        const propValue = this[propName];
        const result = {
          value: {
            propName,
            propValue,
          },
          done: i >= keys.length,
        };
        i++;
        return result;
      },
    };
  },
};

const arr = [...obj];
console.log(arr);

function test(a, b) {
  console.log(a, b);
}

test(...obj);
```

## 生成器 (Generator)

### 什么是生成器？

生成器是一个通过构造函数 Generator 创建的对象，生成器既是一个迭代器，同时又是一个可迭代对象

### 如何创建生成器？

生成器的创建，必须使用生成器函数（Generator Function）

### 如何书写一个生成器函数呢？

```js
//这是一个生成器函数，该函数一定返回一个生成器
function* method() {}
```

### 生成器函数内部是如何执行的？

生成器函数内部是为了给生成器的每次迭代提供的数据

每次调用生成器的`next`方法，将导致生成器函数运行到下一个`yield`关键字位置

`yield`是一个关键字，该关键字只能在生成器函数内部使用，表达“产生”一个迭代数据。

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9];

// 迭代器创建函数  iterator creator
function* createIterator(arr) {
  for (const item of arr) {
    yield item;
  }
}

const iter1 = createIterator(arr1);
const iter2 = createIterator(arr2);
```

```js
//创建一个斐波拉契数列的迭代器
function* createFeiboIterator() {
  let prev1 = 1,
    prev2 = 1, //当前位置的前1位和前2位
    n = 1; //当前是第几位
  while (true) {
    if (n <= 2) {
      yield 1;
    } else {
      const newValue = prev1 + prev2;
      yield newValue;
      prev2 = prev1;
      prev1 = newValue;
    }
    n++;
  }
}

const iterator = createFeiboIterator();
```

### 有哪些需要注意的细节？

- 生成器函数可以有返回值，返回值出现在第一次 `done` 为 `true` 时的 `value` 属性中
- 调用生成器的 `next` 方法时，可以传递参数，传递的参数会交给 yield 表达式的返回值
- 第一次调用 `next` 方法时，传参没有任何意义
- 在生成器函数内部，可以调用其他生成器函数，但是要注意加上`*`号

```js
function* test() {
  console.log('第1次运行');
  yield 1;
  console.log('第2次运行');
  yield 2;
  console.log('第3次运行');
  return 10;
}

const generator = test();

// generator.next()
```

```js
function* test() {
  console.log('函数开始');

  let info = yield 1;
  console.log(info);
  info = yield 2 + info;
  console.log(info);
}

const generator = test();
// generator.next()
// generator.next(10)
```

```js
function* t1() {
  yield 'a';
  yield 'b';
}

function* test() {
  yield* t1();
  yield 1;
  yield 2;
  yield 3;
}

const generator = test();
// generator.next()
```

### 生成器的其他 API

- `return` 方法：调用该方法，可以提前结束生成器函数，从而提前让整个迭代过程结束
- `throw` 方法：调用该方法，可以在生成器中产生一个错误

## 迭代器应用--异步任务控制

```js
function* task() {
  const d = yield 1;
  console.log(d);
  // //d : 1
  const resp = yield fetch('http://101.132.72.36:5100/api/local');
  const result = yield resp.json();
  console.log(result);
}

run(task);

function run(generatorFunc) {
  const generator = generatorFunc();
  let result = generator.next(); //启动任务（开始迭代）, 得到迭代数据
  handleResult();
  //对result进行处理
  function handleResult() {
    if (result.done) {
      return; //迭代完成，不处理
    }
    //迭代没有完成，分为两种情况
    //1. 迭代的数据是一个Promise
    //2. 迭代的数据是其他数据
    if (typeof result.value.then === 'function') {
      //1. 迭代的数据是一个Promise
      //等待Promise完成后，再进行下一次迭代
      result.value
        .then((data) => {
          result = generator.next(data);
          handleResult();
        })
        .catch((err) => {
          result = generator.throw(err);
          handleResult();
        });
    } else {
      //2. 迭代的数据是其他数据，直接进行下一次迭代
      result = generator.next(result.value);
      handleResult();
    }
  }
}
```
