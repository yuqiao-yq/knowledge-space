---
title: 变量&常量
order: 1
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

## 1. 变量

变量是用于存放数据的容器。我们通过变量名获取数据、修改数据。

变量在使用时分为两步：

1. 声明变量
2. 赋值

### 1.1、变量的初始化

声明一个变量并赋值，我们称之为变量的初始化。

### 1.2、更新变量

一个变量被重新复赋值后，它原有的值就会被覆盖，变量值将以最后一次的值为准。

### 1.3、同时声明多个变量

同时声明多个变量时，只需要写一个 var，多个变量名之间使用英文逗号隔开。 `var age 10， name =zs, sex=2;`

### 1.4、声明变量特殊情况

<img src="./assets/image-20210222105031568.png" alt="image-20210222105031568" style="zoom: 67%;" />

如果在声明变量时，省略 var 的话，该变量就会变成全局变量，如全局作用域中存在该变量，就会更新其值。

```js
var a = 1; //此处声明的变量a为全局变量
function foo() {
  a = 2; //此处的变量a也是全局变量
  console.log(a); //2
}
foo();
console.log(a); //2
```

ES5 只有两种声明变量的方法：`var`命令和 `function`命令。ES6 除了添加 `let`和 `const`命令，还有另外两种声明变量的方法：`import`命令和 `class`命令

### 1.5、变量命名规范

<img src="./assets/image-20210222105128085.png" alt="image-20210222105128085" style="zoom: 80%;" />

## 2. 常量

由于 var 和 let 申明的是变量，如果要申明一个常量，在 ES6 之前是不行的，我们通常用全部大写的变量来表示“这是一个常量，不要修改它的值”：

```JS
var PI = 3.14;
```

ES6 标准引入了新的关键字 const 来定义常量， const 与 let 都具有块级作用域：

```js
'use strict';
const PI = 3.14;
PI = 3; // 某些浏览器不报错，但是无效果！
PI; // 3.14
```

**改变一个用 const 声明的对象**

实际上，`const`保证的并不是变量的值不得改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型的数据（主要是对象和数组），变量指向数据的内存地址，保存的只是一个指针，`const`只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

准确的说，是 `const` 声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配，并不是说 const 声明的变量其内部内容不可变。

对象（包括数组和函数）在使用 `const` 声明的时候依然是可变的。 使用 `const` 来声明只会保证变量不会被重新赋值。

```js
const s = [5, 6, 7];
s = [1, 2, 3]; // 会报错
s[2] = 45; // s的第三项会被改变
console.log(s); // [5, 6, 45]
```

**防止对象改变**

`const` 声明并不会真的保护数据不被改变。 为了确保数据不被改变，JavaScript 提供了一个函数 `Object.freeze`

当一个对象被冻结的时候，你不能再对它的属性再进行增、删、改的操作。 任何试图改变对象的操作都会被阻止，却不会报错。

```js
let obj = {
  name: 'FreeCodeCamp',
  review: 'Awesome',
};
Object.freeze(obj);
obj.review = 'bad';
obj.newProp = 'Test';
console.log(obj); //  { name: "FreeCodeCamp", review: "Awesome" }
```

```js
// 将对象彻底冻结
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  });
};
```

## 3. var、 let、const 的区别

|  | var | let | const |
| :-: | :-: | :-: | :-: |
| **块级作用域** | × | √ | √ |
| **变量声明会提升** | √ | × （变量只能在声明之后使用） | × （变量只能在声明之后使用） |
| **给全局添加属性** | 全局变量；会将该变量添加为全局对象的属性 | × | × |
| **可以重复声明** | √ | × | × |
| **暂时性死区** | × | √ （声明变量之前，该变量都是不可用的） | √ （声明变量之前，该变量都是不可用的） |
| **初始值设置** | × | × | 必须设置初始值 |
| **改变指针指向** | / | 可以更改指针指向（可以重新赋值） | × （不允许） |

### 3.1 块级作用域

#### 为什么需要块级作用域？

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

第一种场景，内层变量可能会覆盖外层变量。

```javascript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
```

第二种场景，用来计数的循环变量泄露为全局变量。

```javascript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```

上面代码中，变量 `i`只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

#### ES6 的块级作用域

`let`实际上为 JavaScript 新增了块级作用域。

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
// 上面的函数有两个代码块，都声明了变量n，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是 10。
```

ES6 允许块级作用域的任意嵌套。

```javascript
{
  {
    {
      {
        {
          let insane = 'Hello World';
        }
        console.log(insane); // 报错
      }
    }
  }
}
// 上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。第四层作用域无法读取第五层作用域的内部变量。
```

内层作用域可以定义外层作用域的同名变量。

```javascript
{
  {
    {
      {
        let insane = 'Hello World';
        {
          let insane = 'Hello World';
        }
      }
    }
  }
}
```

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

```javascript
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

#### 块级作用域与函数声明

函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。

```javascript
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch (e) {
  // ...
}
```

上面两种函数声明，根据 ES5 的规定都是非法的。

但是，浏览器没有遵守这个规定，为了兼容以前的旧代码，还是支持在块级作用域之中声明函数，因此上面两种情况实际都能运行，不会报错。

ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于 `let`，在块级作用域之外不可引用。

```javascript
function f() {
  console.log('I am outside!');
}

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!');
    }
  }

  f();
})();
```

上面代码在 ES5 中运行，会得到“I am inside!”，因为在 `if`内声明的函数 `f`会被提升到函数头部，实际运行的代码如下。

```javascript
// ES5 环境
function f() {
  console.log('I am outside!');
}

(function () {
  function f() {
    console.log('I am inside!');
  }
  if (false) {
  }
  f();
})();
```

ES6 就完全不一样了，理论上会得到“I am outside!”。因为块级作用域内声明的函数类似于 `let`，对作用域之外没有影响。但是，如果你真的在 ES6 浏览器中运行一下上面的代码，是会报错的，这是为什么呢？

```javascript
// 浏览器的 ES6 环境
function f() {
  console.log('I am outside!');
}

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!');
    }
  }

  f();
})();
// Uncaught TypeError: f is not a function
```

上面的代码在 ES6 浏览器中，都会报错。

原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在[附录 B](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-block-level-function-declarations-web-legacy-compatibility-semantics)里面规定，浏览器的实现可以不遵守上面的规定，有自己的[行为方式](http://stackoverflow.com/questions/31419897/what-are-the-precise-semantics-of-block-level-functions-in-es6)。

- 允许在块级作用域内声明函数。
- 函数声明类似于 `var`，即会提升到全局作用域或函数作用域的头部。
- 同时，函数声明还会提升到所在的块级作用域的头部。

注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作 `let`处理。

根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于 `var`声明的变量。上面的例子实际运行的代码如下。

```javascript
// 浏览器的 ES6 环境
function f() {
  console.log('I am outside!');
}
(function () {
  var f = undefined;
  if (false) {
    function f() {
      console.log('I am inside!');
    }
  }

  f();
})();
// Uncaught TypeError: f is not a function
```

考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

```javascript
// 块级作用域内部的函数声明语句，建议不要使用
{
  let a = 'secret';
  function f() {
    return a;
  }
}

// 块级作用域内部，优先使用函数表达式
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
```

另外，还有一个需要注意的地方。ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。

```javascript
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

上面代码中，第一种写法没有大括号，所以不存在块级作用域，而 `let`只能出现在当前作用域的顶层，所以报错。第二种写法有大括号，所以块级作用域成立。

函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。

```javascript
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
('use strict');
if (true) function f() {}
```

### 3.2 变量提升

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
// 变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。
```

如果使用 let，声明的变量仅在块级作用域内有效，最后输出的是 6。

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
// 变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
```

但是

```js
for (var i = 0; i < 5; i++) {
  console.log(i);
}
// 1; 2; 3; 4; 5;
```

以下是一个经典的关于 var 和 let 的一个例子：

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}
// 该代码运行后，会在控制台打印出10个10.
```

若修改为：

```javascript
for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}
// 则该代码运行后，就会在控制台打印出0-9.
```

再者

```js
// 一个通常的解决方法是使用立即执行的函数表达式（IIFE）来捕获每次迭代时i的值
for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 100 * i);
  })(i);
}
// 或者
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
// 每隔一秒，会打印出1个10,累计打印10次.
```

另外，`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
// 上面代码正确运行，输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
```

函数声明和变量声明都会被提升。但是一个值得注意的细节（这个细节可以出现在有多个“重复”声明的代码中）是函数会首先被提升，然后才是变量。详见函数部分

## 3.3 暂时性死区

只要块级作用域内存在 `let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量 `tmp`，但是块级作用域内 `let`又声明了一个局部变量 `tmp`，导致后者绑定这个块级作用域，所以在 `let`声明变量前，对 `tmp`赋值会报错。

ES6 明确规定，如果区块中存在 `let`和 `const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用 `let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```

上面代码中，在 `let`命令声明变量 `tmp`之前，都属于变量 `tmp`的“死区”。

“暂时性死区”也意味着 `typeof`不再是一个百分之百安全的操作。

```javascript
typeof x; // ReferenceError
let x;
```

上面代码中，变量 `x`使用 `let`命令声明，所以在声明之前，都属于 `x`的“死区”，只要用到该变量就会报错。因此，`typeof`运行时就会抛出一个 `ReferenceError`。

作为比较，如果一个变量根本没有被声明，使用 `typeof`反而不会报错。

```javascript
typeof undeclared_variable; // "undefined"
```

上面代码中，`undeclared_variable`是一个不存在的变量名，结果返回“undefined”。所以，在没有 `let`之前，`typeof`运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

有些“死区”比较隐蔽，不太容易发现。

```javascript
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
```

上面代码中，调用 `bar`函数之所以报错（某些实现可能不报错），是因为参数 `x`默认值等于另一个参数 `y`，而此时 `y`还没有声明，属于“死区”。如果 `y`的默认值是 `x`，就不会报错，因为此时 `x`已经声明了。

```javascript
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

另外，下面的代码也会报错，与 `var`的行为不同。

```javascript
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```

上面代码报错，也是因为暂时性死区。使用 `let`声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量 `x`的声明语句还没有执行完成前，就去取 `x`的值，导致报错”x 未定义“。

ES6 规定暂时性死区和 `let`、`const`语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 3.4 顶层对象的属性

顶层对象，在浏览器环境指的是 `window`对象，在 Node 指的是 `global`对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```javascript
window.a = 1;
a; // 1

a = 2;
window.a; // 2
```

上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，`window`对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，**`var`命令和 `function`命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性**。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a; // 1

let b = 1;
window.b; // undefined
```

上面代码中，全局变量 `a`由 `var`命令声明，所以它是顶层对象的属性；全局变量 `b`由 `let`命令声明，所以它不是顶层对象的属性，返回 `undefined`。

### 3.5 globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 `window`，但 Node 和 Web Worker 没有 `window`。
- 浏览器和 Web Worker 里面，`self`也指向顶层对象，但是 Node 没有 `self`。
- Node 里面，顶层对象是 `global`，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 `this`关键字，但是有局限性。

- 全局环境中，`this`会返回顶层对象。但是，Node.js 模块中 `this`返回的是当前模块，ES6 模块中 `this`返回的是 `undefined`。
- 函数里面的 `this`，如果函数不是作为对象的方法运行，而是单纯作为函数运行，`this`会指向顶层对象。但是，严格模式下，这时 `this`会返回 `undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 `eval`、`new Function`这些方法都可能无法使用。

综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。

```javascript
// 方法一
typeof window !== 'undefined'
  ? window
  : typeof process === 'object' && typeof require === 'function' && typeof global === 'object'
  ? global
  : this;

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
};
```

[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入 `globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的 `this`。

垫片库[`global-this`](https://github.com/ungap/global-this)模拟了这个提案，可以在所有环境拿到 `globalThis`。

## 4. 执行环境及作用域

执行环境的类型总共只有两种——全局和局部（函数）

执行环境定义了 `变量`或 `函数`有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。

`全局执行环境`是最外围的一个执行环境。根据 ECMAScript 实现所在的宿主环境不同，表示执行环境的对象也不一样。在 Web 浏览器中，全局执行环境被认为是 `window对象`，因此所有全局变量和函数都是作为 `window`对象的属性和方法创建的。某个执行环境中的所有代码执行完毕后，该环境被销毁，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退 出——例如关闭网页或浏览器——时才会被销毁）。

每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个 `环境栈`中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAScript 程序中的执行流正是由这个方便的机制控制着。

当代码在一个环境中执行时，会创建变量对象的一个 `作用域链`（scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 arguments 对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数。这些环境之间的联系是线性、有次序的。每个环境都可以向上搜索作用域链，以查询变量和函数名；但任何环境都不能通过向下搜索作用域链而进入另一个执行环境。

`标识符解析`是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。

### 预解析

JavaScript 代码是由浏览器中的 JavaScript 解析器来执行的。 Javascript 解析器在运行 Java Script 代码的时候分为两：预解析和代码执行。

- 预解析 js 引擎会把 js 里面所有的 var 还有 function 提升到当前作用域的最前面
- 代码执行 按照代码书写的顺序从上往下执行

预解析分为变量预解析（变量提升）和函数预解析（函数提升）

- 变量提升就是把所有的变量声明提升到当前的作用域最前面，不提升赋值操作；
- 函数提升就是把所有的函数声明提升到当前作用域的最前面，不调用函数

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

> 用 var 的函数表达式的函数调用必须写在函数表达式的下面

```js
预解析案例1;
var num = 10;
fun();
function fun() {
  console.log(num);
  var num = 20;
}

// 相当于
var num;
function fun() {
  var num;
  console.log(num); // undefined
  num = 20;
}
num = 10;
fun();
```

```js
预解析案例2;
var num = 10;
function fn() {
  console.log(num);
  var num = 20;
  console.log(num);
}
fn();

// 相当于
var num;
function fn() {
  var num;
  console.log(num); // undefined
  num = 20;
  console.log(num); // 20
}
num = 10;
fn();
```

```js
预解析案例3;
var a = 18;
f1();
function f1() {
  var b = 9;
  console.log(a);
  console.log(b);
  var a = '123';
}

// 相当于
var a;
function f1() {
  var b;
  var a;
  b = 9;
  console.log(a); // undefined
  console.log(b); // 9
  a = '123';
}
a = 18;
f1();
```

```js
预解析案例4;
f1();
console.log(c);
console.log(b);
console.log(a);
function f1() {
  var a = (b = c = 9);
  console.log(a);
  console.log(b);
  console.log(c);
}

// 相当于
function f1() {
  var a;
  a = b = c = 9;
  // 相当于var a = 9; b = 9; c = 9; b、c直接赋值，没有用var声明，是全局变量；
  // 集体声明：var a = 9, b = 9, c = 9;
  console.log(a); // 9
  console.log(b); // 9
  console.log(c); // 9
}
f1();
console.log(c); // 9
console.log(b); // 9
console.log(a); // 报错，a is not defind
```

### 延长作用域链

有些语句可以在作用域链的前端临时增加一个变量对象，该变量对象会在代码执行后被移除。在两种情况下会发生这种现象。具体来说，就是当执行流进入下列任何一个语句时，作用域链就会得到加长：

- `try-catch`语句的 `catch`块；
- `with`语句。

这两个语句都会在作用域链的前端添加一个变量对象。对 `with`语句来说，会将指定的对象添加到作用域链中。对 `catch`语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明。

```js
function buildUrl() {
  var qs = '?debug=true';
  with (location) {
    var url = href + qs;
  }
  return url;
}
// 在此，with语句接收的是location对象，因此其变量对象中就包含了location对象的所有属性和方法，而这个变量对象被添加到了作用域链的前端。
// buildUrl()函数中定义了一个变量qs。当在with语句中引用变量href时（实际引用的是location.href），可以在当前执行环境的变量对象中找到。
// 当引用变量qs时，引用的则是在buildUrl()中定义的那个变量，而该变量位于函数环境的变量对象中。
// 至于with语句内部，则定义了一个名为url的变量，因而url就成了函数执行环境的一部分，所以可以作为函数的值被返回。
```

## 5. 变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

### 5.1 数组的解构赋值

#### 基本用法

以前，为变量赋值，只能直接指定值。

```js
let a = 1;
let b = 2;
let c = 3;
```

ES6 允许写成下面这样。

```js
let [a, b, c] = [1, 2, 3];
// 上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值
```

本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。下面是一些使用嵌套数组进行解构的例子。

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3
let [, , third] = ['foo', 'bar', 'baz'];
third; // "baz"
let [x, , y] = [1, 2, 3];
x; // 1
y; // 3
let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]
let [x, y, ...z] = ['a'];
x; // "a"
y; // undefined
z; // []
```

如果解构不成功，变量的值就等于 `undefined`

```javascript
let [foo] = [];
let [bar, foo] = [1];
// 以上两种情况都属于解构不成功，foo的值都会等于undefined
```

另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

```js
let [x, y] = [1, 2, 3];
x; // 1
y; // 2
let [a, [b], d] = [1, [2, 3], 4];
a; // 1
b; // 2
d; // 4
```

如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
// 上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）
```

对于 Set 结构，也可以使用数组的解构赋值

```js
let [x, y, z] = new Set(['a', 'b', 'c']);
x; // "a"
```

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值

```js
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth, seven, eight] = fibs();
console.log(first, second, third, fourth, fifth, sixth, seven, eight); // 0 1 1 2 3 5 8 13
// 上面代码中，fibs是一个 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
```

#### 指定默认值

解构赋值允许指定默认值

```js
let [foo = true] = [];
foo; // true
let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```

注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，只有当一个数组成员严格等于 `undefined`，默认值才会生效。

```js
let [x = 1] = [undefined];
x; // 1
let [x = 1] = [null];
x; // null
// 上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。
```

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```js
function f() {
  console.log('aaa');
}
let [x = f()] = [1];

// 上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码

let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明

```js
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined
// 上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。
```

### 5.2 对象的解构赋值

解构不仅可以用于数组，还可以用于对象

#### 基本用法

```js
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo; // "aaa"
bar; // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo; // "aaa"
bar; // "bbb"
let { baz } = { foo: 'aaa', bar: 'bbb' };
baz; // undefined
```

如果解构失败，变量的值等于 `undefined`。

```js
let { foo } = { bar: 'baz' };
foo; // undefined
```

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量

```js
// 例一
let { log, sin, cos } = Math;
// 例二
const { log } = console;
log('hello'); // hello
```

如果变量名与属性名不一致，必须写成下面这样

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz; // "aaa"
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f; // 'hello'
l; // 'world'
```

这实际上说明，对象的解构赋值是下面形式的简写

```js
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz; // "aaa"
foo; // error: foo is not defined
// 上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo
```

与数组一样，解构也可以用于嵌套结构的对象

```js
let obj = {
  p: ['Hello', { y: 'World' }],
};
let {
  p: [x, { y }],
} = obj;
x; // "Hello"
y; // "World"

// 这时p是模式，不是变量，因此不会被赋值。如果p也要作为变量赋值，可以写成下面这样

let obj = {
  p: ['Hello', { y: 'World' }],
};
let {
  p,
  p: [x, { y }],
} = obj;
x; // "Hello"
y; // "World"
p; // ["Hello", {y: "World"}]
```

下面是另一个例子

```js
const node = {
  loc: {
    start: {
      line: 1,
      column: 5,
    },
  },
};
let {
  loc,
  loc: { start },
  loc: {
    start: { line },
  },
} = node;
line; // 1
loc; // Object {start: Object}
start; // Object {line: 1, column: 5}
// 上面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。
// 注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
```

下面是嵌套赋值的例子

```js
let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
obj; // {prop:123}
arr; // [true]
```

如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错

```js
// 报错
let {
  foo: { bar },
} = { baz: 'baz' };
// 上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。
// 原因很简单，因为foo这时等于undefined，再取子属性就会报错
```

注意，对象的解构赋值可以取到继承的属性

```js
const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);
const { foo } = obj1;
foo; // "bar"
// 上面代码中，对象obj1的原型对象是obj2。foo属性不是obj1自身的属性，而是继承自obj2的属性，解构赋值可以取到这个属性
```

#### 指定默认值

```js
var { x = 3 } = {};
x; // 3
var { x, y = 5 } = { x: 1 };
x; // 1
y; // 5
var { x: y = 3 } = {};
y; // 3
var { x: y = 3 } = { x: 5 };
y; // 5
var { message: msg = 'Something went wrong' } = {};
msg; // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于 `undefined`

```js
var { x = 3 } = { x: undefined };
x; // 3
var { x = 3 } = { x: null };
x; // null
// 上面代码中，属性x等于null，因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效。
```

#### 已经声明的变量用于解构赋值

如果要将一个已经声明的变量用于解构赋值，必须非常小心

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
// 上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
// 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

// 正确的写法
let x;
({x} = {x: 1});
// 上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行
```

#### 解构赋值等号左边不放置任何变量名

解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式

```js
({} = [true, false]);
({} = 'abc');
({} = []);
// 上面的表达式虽然毫无意义，但是语法是合法的，可以执行。
```

#### 对数组进行对象属性的解构

由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构

```js
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
first; // 1
last; // 3
// 上面代码对数组进行对象解构。数组arr的0键对应的值是1，[arr.length - 1]就是2键，对应的值是3。
// 方括号这种写法，属于“属性名表达式”
```

### 5.3 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象

```js
const [a, b, c, d, e] = 'hello';
a; // "h"
b; // "e"
c; // "l"
d; // "l"
e; // "o"
```

类似数组的对象都有一个 **length**属性，因此还可以对这个属性解构赋值

```js
let { length: len } = 'hello';
len; // 5
```

### 5.4 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象

```js
let { toString: s } = 123;
s === Number.prototype.toString; // true
let { toString: s } = true;
s === Boolean.prototype.toString; // true
// 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值
```

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于 `undefined`和 `null`无法转为对象，所以对它们进行解构赋值，都会报错

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

### 5.5 函数参数的解构赋值

函数的参数也可以使用解构赋值

```js
function add([x, y]) {
  return x + y;
}
add([1, 2]); // 3
// 上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。
// 对于函数内部的代码来说，它们能感受到的参数就是x和y
```

下面是另一个例子

```js
[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b);
// [ 3, 7 ]
```

函数参数的解构也可以使用默认值

```js
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}
move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
// 上面代码中，函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值
```

下面的写法会得到不一样的结果

```js
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
// 上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果。
```

` undefined` 就会触发函数参数的默认

```js
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

### 5.6 圆括号问题

解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

#### 不能使用圆括号的情况

##### （1）变量声明语句

```js
// 全部报错
let [(a)] = [1];
let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};
let { o: ({ p: p }) } = { o: { p: 2 } };
// 上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。
```

##### （2）函数参数

函数参数也属于变量声明，因此不能带有圆括号

```js
// 报错
function f([(z)]) { return z; }
// 报错
function f([z,(x)]) { return x; }
```

##### （3）赋值语句的模式

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
// 上面代码将整个模式放在圆括号之中，导致报错。
```

```js
// 报错
[({ p: a }), { x: c }] = [{}, {}];
// 上面代码将一部分模式放在圆括号之中，导致报错
```

#### 可以使用圆括号的情况

可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```js
[b] = [3]; // 正确
({ p: d } = {}); // 正确
[parseInt.prop] = [3]; // 正确
// 上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致
```

### 5.7 变量的解构赋值用途

#### （1）**交换**变量的值

```js
let x = 1;
let y = 2;
[x, y] = [y, x];
// 上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰
```

#### **（2）从函数返回多个值**

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2,
  };
}
let { foo, bar } = example();
```

#### **（3）函数参数的定义**

解构赋值可以方便地将一组参数与变量名对应起来

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

#### **（4）提取 JSON 数据**

解构赋值对提取 JSON 对象中的数据，尤其有用

```js
let jsonData = {
  id: 42,
  status: 'OK',
  data: [867, 5309],
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]
// 上面代码可以快速提取 JSON 数据的值
```

#### **（5）函数参数的默认值**

```js
jQuery.ajax = function (
  url,
  {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  } = {},
) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写 `var foo = config.foo || 'default foo';`这样的语句

#### **（6）遍历 Map 结构**

任何部署了 Iterator 接口的对象，都可以用 `for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + ' is ' + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样

```js
// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [, value] of map) {
  // ...
}
```

#### **（7）输入模块的指定方法**

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰

```js
const { SourceMapConsumer, SourceNode } = require('source-map');
```

## 6. 垃圾收集

JavaScript 具有自动垃圾收集机制，执行环境会负责管理代码执行过程中使用的内存。而在 C 和 C++之类的语言中，开发人员的一项基本任务就是手工跟踪内存的使用情况，这是造成许多问题的一个根源。在编写 JavaScript 程序时，开发人员不用再关心内存使用问题，所需内存的分配以及无用内存的回收完全实现了自动管理。这种垃圾收集机制的原理其实很简单：找出那些不再继续使用的变量，然后释放其占用的内存。为此，垃圾收集器会按照固定的时间间隔（或代码执行中预定的收集时间），周期性地执行这一操作。

下面我们来分析一下函数中局部变量的正常生命周期。局部变量只在函数执行的过程中存在。而在这个过程中，会为局部变量在栈（或堆）内存上分配相应的空间，以便存储它们的值。然后在函数中使用这些变量，直至函数执行结束。此时，局部变量就没有存在的必要了，因此可以释放它们的内存以供将来使用。在这种情况下，很容易判断变量是否还有存在的必要；但并非所有情况下都这么容易就能得出结论。垃圾收集器必须跟踪哪个变量有用哪个变量没用，对于不再有用的变量打上标记，以备将来收回其占用的内存。用于标识无用变量的策略可能会因实现而异，但具体到浏览器中的实现，则通常有两个策略。

### 6.1 标记清除

JavaScript 中最常用的垃圾收集方式是标记清除（mark-and-sweep）。当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。

可以使用任何方式来标记变量。比如，可以通过翻转某个特殊的位来记录一个变量何时进入环境，或者使用一个“进入环境的”变量列表及一个“离开环境的”变量列表来跟踪哪个变量发生了变化。说到底，如何标记变量其实并不重要，关键在于采取什么策略。

垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记（当然，可以使用任何标记方式）。然后，它会去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后，垃圾收集器完成内存清除工作，销毁那些带标记的值并回收它们所占用的内存空间。

到 2008 年为止，IE、Firefox、Opera、Chrome 和 Safari 的 JavaScript 实现使用的都是标记清除式的垃圾收集策略（或类似的策略），只不过垃圾收集的时间间隔互有不同。

### 6.2 引用计数

另一种不太常见的垃圾收集策略叫做引用计数（reference counting）。引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是 1。如果同一个值又被赋给另一个变量，则该值的引用次数加 1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减 1。当这个值的引用次数变成 0 时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾收集器下次再运行时，它就会释放那些引用次数为零的值所占用的内存。

Netscape Navigator 3.0 是最早使用引用计数策略的浏览器，但很快它就遇到了一个严重的问题：循环引用。循环引用指的是对象 A 中包含一个指向对象 B 的指针，而对象 B 中也包含一个指向对象 A 的引用。

```js
function problem() {
  var objectA = new Object();
  var objectB = new Object();

  objectA.someOtherObject = objectB;
  objectB.anotherObject = objectA;
}
// 在这个例子中，objectA和objectB通过各自的属性相互引用；也就是说，这两个对象的引用次数都是2。在采用标记清除策略的实现中，由于函数执行之后，这两个对象都离开了作用域，因此这种相互引用不是个问题。但在采用引用计数策略的实现中，当函数执行完毕后，objectA和objectB还将继续存在，因为它们的引用次数永远不会是0。假如这个函数被重复多次调用，就会导致大量内存得不到回收。为此，Netscape在Navigator 4.0中放弃了引用计数方式，转而采用标记清除来实现其垃圾收集机制。可是，引用计数导致的麻烦并未就此终结。
```

IE 中有一部分对象并不是原生 JavaScript 对象。例如，其 BOM 和 DOM 中的对象就是使用 C++以 COM（Component Object Model，组件对象模型）对象的形式实现的，而 COM 对象的垃圾收集机制采用的就是引用计数策略。因此，即使 IE 的 JavaScript 引擎是使用标记清除策略来实现的，但 JavaScript 访问的 COM 对象依然是基于引用计数策略的。换句话说，只要在 IE 中涉及 COM 对象，就会存在循环引用的问题。下面这个简单的例子，展示了使用 COM 对象导致的循环引用问题：

```js
var element = document.getElementById("some_element");
var myObject = new Object();
myObject.element = element;
element.someObject = myObject;
// 这个例子在一个DOM元素（element）与一个原生JavaScript对象（myObject）之间创建了循环引用。其中，变量myObject有一个名为element的属性指向element对象；而变量element也有一个属性名叫someObject回指myObject。由于存在这个循环引用，即使将例子中的DOM从页面中移除，它也永远不会被回收。

为了避免类似这样的循环引用问题，最好是在不使用它们的时候手工断开原生JavaScript对象与DOM元素之间的连接。例如，可以使用下面的代码消除前面例子创建的循环引用：

myObject.element = null;
element.someObject = null;
//将变量设置为null意味着切断变量与它此前引用的值之间的连接。当垃圾收集器下次运行时，就会删除这些值并回收它们占用的内存。

为了解决上述问题，IE9把BOM和DOM对象都转换成了真正的JavaScript对象。这样，就避免了两种垃圾收集算法并存导致的问题，也消除了常见的内存泄漏现象。
```

### 6.3 性能问题

垃圾收集器是周期性运行的，而且如果为变量分配的内存数量很可观，那么回收工作量也是相当大的。在这种情况下，确定垃圾收集的时间间隔是一个非常重要的问题。说到垃圾收集器多长时间运行一次，不禁让人联想到 IE 因此而声名狼藉的性能问题。IE 的垃圾收集器是根据内存分配量运行的，具体一点说就是 256 个变量、4096 个对象（或数组）字面量和数组元素（slot）或者 64KB 的字符串。达到上述任何一个临界值，垃圾收集器就会运行。这种实现方式的问题在于，如果一个脚本中包含那么多变量，那么该脚本很可能会在其生命周期中一直保有那么多的变量。而这样一来，垃圾收集器就不得不频繁地运行。结果，由此引发的严重性能问题促使 IE7 重写了其垃圾收集例程。

随着 IE7 的发布，其 JavaScript 引擎的垃圾收集例程改变了工作方式：触发垃圾收集的变量分配、字面量和（或）数组元素的临界值被调整为动态修正。IE7 中的各项临界值在初始时与 IE6 相等。如果垃圾收集例程回收的内存分配量低于 15%，则变量、字面量和（或）数组元素的临界值就会加倍。如果例程回收了 85%的内存分配量，则将各种临界值重置回默认值。这一看似简单的调整，极大地提升了 IE 在运行包含大量 JavaScript 的页面时的性能。

事实上，在有的浏览器中可以触发垃圾收集过程，但我们不建议这样做。在 IE 中，调用 `window.CollectGarbage()`方法会立即执行垃圾收集。在 Opera 7 及更高版本中，调用 `window.opera.collect()`也会启动垃圾收集例程。

### 6.4 管理内存

使用具备垃圾收集机制的语言编写程序，开发人员一般不必操心内存管理的问题。但是，JavaScript 在进行内存管理及垃圾收集时面临的问题还是有点与众不同。其中最主要的一个问题，就是分配给 Web 浏览器的可用内存数量通常要比分配给桌面应用程序的少。这样做的目的主要是出于安全方面的考虑，目的是防止运行 JavaScript 的网页耗尽全部系统内存而导致系统崩溃。内存限制问题不仅会影响给变量分配内存，同时还会影响调用栈以及在一个线程中能够同时执行的语句数量。

因此，确保占用最少的内存可以让页面获得更好的性能。而优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为 null 来释放其引用——这个做法叫做解除引用（dereferencing）。这一做法适用于大多数全局变量和全局对象的属性。局部变量会在它们离开执行环境时自动被解除引用

```js
function createPerson(name){
    var localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}

var globalPerson = createPerson("Nicholas");
// 手工解除globalPerson的引用
globalPerson = null;

// 在这个例子中，变量globalPerson取得了createPerson()函数返回的值。在createPerson()函数内部，我们创建了一个对象并将其赋给局部变量localPerson，然后又为该对象添加了一个名为name的属性。最后，当调用这个函数时，localPerson以函数值的形式返回并赋给全局变量globalPerson。由于localPerson在createPerson()函数执行完毕后就离开了其执行环境，因此无需我们显式地去为它解除引用。但是对于全局变量globalPerson而言，则需要我们在不使用它的时候手工为它解除引用，这也正是上面例子中最后一行代码的目的。

不过，解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收。
```
