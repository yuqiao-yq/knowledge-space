---
title: this
order: 16
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

## 关于 this

### this 到底是什么

`this` 关键字是 JavaScript 中最复杂的机制之一。它是一个很特别的关键字，被自动定义在所有函数的作用域中。

`this` 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。 `this` 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。 `this` 就是记录的其中一个属性，会在函数执行的过程中用到。

### 全局作用域中的 this

在全局作用域下，`this` 指向全局对象（浏览器中为 window 对象）。

```js
console.log(this === window); // true
```

### 函数中的 this

在严格模式下，如果函数中 `this` 没有被执行环境（execution context）定义，那它指向 `undefined`

非严格模式下: 谁调用指向谁

在函数中使用 `this`，它的指向完全取决于函数是如何被调用的

|   调用方式    |        示例         | 函数中的 this 指向 |
| :-----------: | :-----------------: | :----------------: |
| 通过 new 调用 |   `new method()`    |       新对象       |
|   直接调用    |     `method()`      |      全局对象      |
| 通过对象调用  |   `obj.method()`    |     前面的对象     |
|     call      | `method.call(ctx)`  | call 的第一个参数  |
|     apply     | `method.apply(ctx)` | apply 的第一个参数 |

#### 独立函数调用

什么叫独立函数调用，就是没有任何对象调用他，该函数的 `this` 就指向全局对象（浏览器中为 `window` 对象）。

```js
function fn () {
  console.log(this === window) // true
  function f1 () {
    console.log(this === window) // true
  }
  f1()
}
fn()


上面的例子，我们独立调用了函数 fn 和 f1，他们this都指向window。现在我们改变一下fn中this的指向，看看 f1 是否受影响：

function fn () {
  console.log(this === o) // true
  function f1 () {
    console.log(this === window) // true
  }
  f1()
}
var o = {}
fn.call(o)

// 现在我们改变了fn 中 this 的指向，但是f1 并没有受影响。
// 所以 独立调用函数的this指向全局对象，跟调用环境的 this 指向无关。
```

#### 对象函数的调用

```js
function sayHello() {
  console.log('你好，我是' + this.name);
}
var obj = {
  name: '李白',
  sayHello: sayHello,
};
obj.sayHello(); // 你好，我是李白
```

我们使用 `obj.sayHello()` 的形式，让 obj 调用 sayHello 函数，所以 sayHello 中的 this 指向 obj。我们把上面的例子稍微做一下改变：

```js
function sayHello() {
  console.log('你好，我是' + this.name);
}
var obj = {
  name: '李白',
  sayHello: sayHello,
};
var name = '杜甫';
var bar = obj.sayHello;
obj.sayHello(); // 你好，我是李白
bar(); // 你好，我是杜甫
```

看完这个例子之后可能会很疑惑，这跟上面的有什么区别？这个例子我们用一个**变量 bar 保存了 obj.sayHello 的引用**，然后独立调用 `bar()`，实际上就是独立调用 `sayHello()`,而我们知道独立调用函数，函数的 this 指向全局对象，此时 sayHello 的 this 指向 window。

### 函数的 `call`，`apply`和 `bind`方法

如果想要强行改变 this 的指向，可以使用 `Function.prototype` 提供的 `call`，`apply`和 `bind`方法。

```js
function add(b, c) {
  console.log(this.a + b + c);
}
var a = 1;
add(1, 1); // 3
var obj = {
  a: 2,
};
add.call(obj, 1, 1); // 4
add.apply(obj, [1, 1]); // 4
```

我们使用 `call`和 `apply`方法，让 `add()`的 this 指向了 `obj`对象，所以输出的结果为 4。这里 `call`和 `apply`方法的本质相同，只是传参不同。而 `bind`方法和他俩有一个明显的区别：使用 `bind`方法绑定 `this` 指向返回一个新函数，并且这个新函数的 `this` 会永久指向绑定的对象，无法改变。

```js
function sayName() {
  console.log(this.name);
}
var name = '杜甫';
var obj = {
  name: '李白',
};
var obj2 = {
  name: '王维',
};
var say = sayName.bind(obj);
say(); // 李白
say.call(obj2); // 李白
say.bind(obj2)(); // 李白
```

这个例子中我们使用 `bind` 方法让 `say` 函数的 `this` 绑定了 `obj`，使用 `call` 和 `bind` 都无法改变 `say` 函数中 `this` 的指向。

### 构造函数中的 `this`

当一个函数用作构造函数时（使用 new 关键字），它的 this 指向 new 的新对象。

```js
function Person(name) {
  this.name = name;
}
var p1 = new Person('李白');
console.log(p1.name); // 李白
```

我们使用 `new` 关键字，构造一个对象 `p1`，构造过程中 `this` 指向了这个新对象 `p1`，所以 `p1.name`就是所传入的 `name` `'李白'`。

但是在使用构造函数时需要注意一点：如果构造函数没有返回值，会默认返回构造出来的对象，但是如果函数有返回值，那么就返回这个值。

```js
function Person(name) {
  this.name = name;
  return { name: '杜甫' };
}
var p1 = new Person('李白');
console.log(p1.name); // 杜甫
```

### 箭头函数的 this

上面我们说过绝大多数情况 `this` 是动态绑定的，而箭头函数就是那个例外。 箭头函数的 `this` 和所在词法环境的 `this` 一致。

```js
var obj = {
  name: '李白',
  sayName: function say() {
    return () => {
      console.log(this.name);
    };
  },
};
var name = '杜甫';
obj.sayName()(); // 李白
```

看这个例子，当前箭头函数的在 `say` 函数内，即所在词法环境是 `say` 函数，他的 `this` 与 say() 中 `this` 一致。当 `obj` 调用 `sayName()`时（调用 `say()`），`say` 的指向为 `obj`，所以箭头函数指向 `obj`，`obj.sayName()()` 输出 `李白`。 我们来看换成普通函数会是什么结果：

```js
var obj = {
  name: '李白',
  sayName: function say() {
    return function () {
      console.log(this.name);
    };
  },
};
var name = '杜甫';
obj.sayName()(); // 杜甫
```

我们可以把 `obj.sayName()()`分成两部分看:

- 第一部分：`obj.sayName()`拿到了 `function(){console.log(this.name)}`
- 第二部分：`(obj.sayName())()`在全局独立调用得到的函数

因此，`function(){console.log(this.name)}`这个函数的 this 指向全局对象(window),输出 `杜甫`。

### this 的优先级

我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的顺序来进行判断：

- 1. 函数是否在 `new` 中调用（new 绑定）？如果是的话 `this` 绑定的是新创建的对象。 `var bar = new foo()`
- 2. 函数是否通过 `call`、`apply`（显式绑定）或者硬绑定调用？如果是的话，`this` 绑定的是指定的对象。 `var bar = foo.call(obj2)`
- 3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。 `var bar = obj1.foo()`
- 4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。 `var bar = foo()`
