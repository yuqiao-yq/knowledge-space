---
title: 函数
order: 9
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

## 1. 函数定义和调用

### 1.1 定义函数

#### 函数的普通定义

在 JavaScript 中，定义函数的方式如下：

```js
function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

上述 abs() 函数的定义如下：
	function 指出这是一个函数定义；
	abs 是函数的名称；
	(x)括号内列出函数的参数，多个参数以,分隔；
	{ ... } 之间的代码是函数体，可以包含若干语句，甚至可以没有任何语句。
```

#### 函数标识记法

在 JavaScript 中，函数实际上也是一种数据，也是一个对象，。也就是说，我们可以把一个函数赋值给一个变量。

`function(){ return 1;}`是一个函数表达式。函数表达式可以被命名，称为命名函数表达式

```js
var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};

//abs()函数实际上是一个函数对象，而函数名 abs 可以视为指向该函数的变量;
在这种方式下， function (x) { ... } 是一个匿名函数，它没有函数名。但是，这个匿名函数赋值给了变量 abs ，所以，通过变量abs就可以调用该函数。

var f = function myFunc() { // 这里myFunc是函数的名字，而不是变量；
	return 1;
};

如果我们对函数变量调用typeof，操作符返回的字符串将会是"function"
```

上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一 个 `;`，表示赋值语句结束。

#### return

函数体内部语句在执行时，一旦执行到 `return` 时，函数就执行完毕并将结果返回。因此，函数内部通过条件判断和循环可以实现非常复杂的逻辑。

如果没有 `return` 语句，函数执行完毕后也会返回结果，只是结果为 `undefined` 。

#### 函数的作用域

```js
var a = 0;
function m() {
  a++;
}
function m2() {
  var a = 7;
  m();
  console.log(a); // 7
}

m2();
console.log(a); // 1
```

**内部作用域能访问的外部，取决于函数定义的位置，与调用的位置无关**

### 1.2 调用函数

在函数名后加括号即可调用该函数，括号内可以选填是否添加参数；

#### 参数

实参 < 形参 ：形参将收到 undefined ，计算结果为 NaN

实参 > 形参 ：只取到形参个数，多余的那部分只会被忽略掉

#### **arguments**

只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。 arguments 类似 Array 但它不是一个 Array。

```js
function foo(x) {
  alert(x); // 10
  for (var i = 0; i < arguments.length; i++) {
    alert(arguments[i]); // 10, 20, 30
  }
}
foo(10, 20, 30);
```

利用 arguments ，可以获得调用者传入的所有参数。即使函数不定义任何参数，还是可以拿到参数的值

```js
function abs() {
  if (arguments.length === 0) {
    return 0;
  }
  var x = arguments[0];
  return x >= 0 ? x : -x;
}
abs(); // 0
abs(10); // 10
abs(-9); // 9
```

arguments 最常用于判断传入参数的个数

```js
// foo(a[, b], c)
// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
function foo(a, b, c) {
  if (arguments.length === 2) {
    // 实际拿到的参数是a和b，c为undefined
    c = b; // 把b赋给c
    b = null; // b变为默认值
  } // ...
}
// 要把中间的参数 b 变为“可选”参数，就只能通过 arguments 判断，然后重新调整 参数并赋值。
```

```js
function doAdd() {
  if (arguments.length == 1) {
    alert(arguments[0] + 10);
  } else if (arguments.length == 2) {
    alert(arguments[0] + arguments[1]);
  }
}

doAdd(10); //20
doAdd(30, 20); //50
// 函数doAdd()会在只有一个参数的情况下给该参数加上10；如果是两个参数，则将那个参数简单相加并返回结果。因此，doAdd(10)会返回20，而doAdd(30,20)则返回50。
```

arguments 对象可以与命名参数一起使用

```js
function doAdd(num1, num2) {
  if (arguments.length == 1) {
    alert(num1 + 10);
  } else if (arguments.length == 2) {
    alert(arguments[0] + num2);
  }
}

// 在重写后的这个doAdd()函数中，两个命名参数都与arguments对象一起使用。由于num1的值与arguments[0]的值相同，因此它们可以互换使用（当然，num2和arguments[1]也是如此）
```

关于 arguments 的行为，还有一点比较有意思。那就是它的值永远与对应命名参数的值保持同步

```js
function doAdd(num1, num2) {
    arguments[1] = 10;
    alert(arguments[0] + num2);
}

每次执行这个doAdd()函数都会重写第二个参数，将第二个参数的值修改为10。因为arguments对象中的值会自动反映到对应的命名参数，所以修改arguments[1]，也就修改了num2，结果它们的值都会变成10。不过，这并不是说读取这两个值会访问相同的内存空间；它们的内存空间是独立的，但它们的值会同步。但这种影响是单向的：修改命名参数不会改变arguments中对应的值。
另外还要记住，如果只传入了一个参数，那么为arguments[1]设置的值不会反应到命名参数中。这是因为arguments对象的长度是由传入的参数个数决定的，不是由定义函数时的命名参数的个数决定的。

关于参数还要记住最后一点：没有传递值的命名参数将自动被赋予undefined值。这就跟定义了变量但又没有初始化一样。例如，如果只给doAdd()函数传递了一个参数，则num2中就会保存undefined值。

严格模式对如何使用argumetns对象做出了一些限制。首先，像前面例子中那样的赋值会变得无效。也就是说，即使把arguments[1]设置为10，num2的值仍然还是undefined。其次，重写arguments的值会导致语法错误（代码将不会执行）。

/
/ JS中的所有参数传递的都是值，不可能通过引用传递参数。
```

#### **rest**参数

为了获取除了已定义参数 a 、 b 之外的参数，我们不得不用 arguments ，并且循环要从索引 2 开始以便排除前两个参数，这种写法很别扭，只是为了获得额外的 rest 参数，有没有更好的方法？

```js
function foo(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i<arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

ES6标准引入了rest参数，上面的函数可以改写为：
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}
foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]
foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
```

rest 参数只能写在最后，前面用 ` ...` 标识，从运行结果可知，传入的参数先绑定 a 、 b ，多余的参数以数组形式交给变量 rest ，所以，不再需要 arguments 我们就获取了全部参数。如果传入的参数连正常定义的参数都没填满,也不要紧，rest 参数会接收一个空数组（注意不是 undefined ）。

### 1.3 递归

递归函数是在一个函数通过名字调用自身的情况下构成的

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}
```

这是一个经典的递归阶乘函数。虽然这个函数表面看来没什么问题，但下面的代码却可能导致它出错。

```js
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); //出错！

以上代码先把factorial()函数保存在变量anotherFactorial中，然后将factorial变量设置为null，结果指向原始函数的引用只剩下一个。但在接下来调用anotherFactorial()时，由于必须执行factorial()，而factorial已经不再是函数，所以就会导致错误。在这种情况下，使用arguments.callee可以解决这个问题。

我们知道，arguments.callee是一个指向正在执行的函数的指针，因此可以用它来实现对函数的递归调用

function factorial(num){
    if (num <= 1){
        return 1;
    } else {
        return num * arguments.callee(num-1);
    }
}

/*return num * arguments.callee(num-1)*/通过使用arguments.callee代替函数名，可以确保无论怎样调用函数都不会出问题。因此，在编写递归函数时，使用arguments.callee总比使用函数名更保险。

但在严格模式下，不能通过脚本访问arguments.callee，访问这个属性会导致错误。不过，可以使用命名函数表达式来达成相同的结果。

var factorial = (function f(num){
    if (num <= 1){
        return 1;
    } else {
        return num * f(num-1);
    }
});
以上代码创建了一个名为f()的命名函数表达式，然后将它赋值给变量factorial。即便把函数赋值给了另一个变量，函数的名字f仍然有效，所以递归调用照样能正确完成。这种方式在严格模式和非严格模式下都行得通。
```

## 2. 作用域

### 变量的作用域

在 JavaScript 中，变量的定义并不是以代码块作为作用域的，而是以函数作为作用域。

如果变量是在某个函数中定义的，那么它在函数以外的地方是不可见的。

而如果该变量是定义在 `if`或者 `for`这样的代码块中的，它在代码块之外是可见的。

“全局变量”指的是定义在所有函数之外的变量（也就是定义在全局代码中的变量），与之相对的是“局部变量”，所指的则是在某个函数中定义的变量。

其中，函数内的代码可以像访问自己的局部变量那样访问全局变量，反之则不行。

    **如果内部函数和外部函数的变量名重名怎么办？**

JavaScript 的函数在查找变量时从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。

#### 全局作用域

不在任何函数内定义的变量就具有全局作用域。

JS 默认有一个全局对象 window ，全局作用域的变量实际上被绑定到 `window`的一个属性，直接访问全局变量 `a `和访问 `window.a `是完全一样的。

#### 名字空间

全局变量会绑定到 window 上，不同的 JavaScript 文件如果使用了相同的全局变量，或者定义了相同名字的顶层函数，都会造成命名冲突，并且很难被发现。 减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：

```js
// 唯一的全局变量MYAPP:
var MYAPP = {};
// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;
// 其他函数:
MYAPP.foo = function () {
  return 'foo';
};
```

#### 变量提升

```js
var a = 123;
function f() {
	alert(a);
	var a = 1;
	alert(a);
}
f();

// 第一次显示为 undefined
// 第二次显示为 1

等价于：
var a = 123;
function f() {
	var a; 	// same as: var a = undefined; 函数域始终优先于全局域，不会显示全局的a
	alert(a); // undefined
	a = 1;
	alert(a); // 1
}
```

##### 函数优先

函数声明和变量声明都会被提升。但是一个值得注意的细节（这个细节可以出现在有多个“重复”声明的代码中）是函数会首先被提升，然后才是变量。

```js
foo(); // 1
var foo;
function foo() {
  console.log('1');
}
foo = function () {
  console.log('2');
};

// 会输出 1 而不是 2 ！这个代码片段会被引擎理解为如下形式：
function foo() {
  console.log('1');
}
foo(); // 1
foo = function () {
  console.log('2');
};
```

## 3.方法

在一个对象中绑定函数，称为这个对象的方法。

```js
var xiaoming = {
	name: '小明',
	birth: 1990
};
如果我们给 xiaoming 绑定一个函数，就可以做更多的事情。比如，写个 age() 方法，返回 xiaoming 的年龄
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};
xiaoming.age; // function xiaoming.age()
xiaoming.age(); // 今年调用是25,明年调用就变成26了
// 在一个方法内部， this是一个特殊变量，它始终指向当前对象，也就是xiaoming这个变量。所以，this.birth可以拿到 xiaoming的birth属性。
```

拆开写：

```js
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}
var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
};
xiaoming.age(); // 25, 正常结果
getAge(); // NaN

//JavaScript的函数内部如果调用了 this ，那么这个 this 到底指向谁？
// 答案是，视情况而定！如果以对象的方法形式调用，比如 xiaoming.age() ，该函数的 this 指向被调用的对象，也就是 xiaoming ，这是符合我们预期的。
// 如果单独调用函数，比如 getAge() ，此时，该函数的 this 指向全局对象，也就是 window 。

这么写也不行
var fn = xiaoming.age; // 先拿到xiaoming的age函数
fn(); // NaN
要保证 this 指向正确，必须用 obj.xxx() 的形式调用！
```

### ES5 中新增方法

## 4. 匿名函数

我们可以这样定义一个函数：

```js
var f = function (a) {
  return a;
};
```

通过这种方式定义的函数常被称为匿名函数（即没有名字的函数），特别是当它不被赋值给变量单独使用的时候。在这种情况下，此类函数有两种优雅的用法：

1.可以将匿名函数作为参数传递给其他函数，这样，接收方函数就能利用我们所传递的函数来完成某些事情。

2.可以定义某个匿名函数来执行某些一次性任务。

## 5. 回调函数

### 5.1 异步与同步

异步（Asynchronous, async）是与同步（Synchronous, sync）相对的概念。

传统单线程编程中，程序的运行是同步的（同步不意味着所有步骤同时运行，而是指步骤在一个控制流序列中按顺序执行）。而异步的概念则是不保证同步的概念，也就是说，一个异步过程的执行将不再与原有的序列有顺序关系。

简单来理解就是：同步按你的代码顺序执行，异步不按照代码顺序执行，异步的执行效率更高。

> 早上起来不论你是先刷牙还是先洗脸，都要等一个事情完毕后才能进行下一项，这就是一个同步的例子；
>
> 然后刷牙的时候你也可以烧水喝 （不用等你刷完牙）这就是一个异步的例子。

<img src="./assets/async-sync.png" alt="img" style="zoom: 50%;" />

```js
//异步代码示例
function a() {
  console.log('执行a函数');
  setTimeout(function () {
    console.log('执行a函数的延迟函数');
  }, 1000);
}
function b() {
  console.log('执行函数b');
}
a();
b();
// 打印结果： 执行a函数；
//          执行函数b;
//          执行a函数的延迟函数
```

> 注：调用 setTimeout 函数会在一个时间段过去后在队列中添加一个任务。这个时间段作为函数的第二个参数被传入。如果队列中没有其它任务，任务会被马上处理。但是，如果有其它任务，setTimeout 任务必须等待其它任务处理完。因此第二个参数仅仅表示最少的时间 而非确切的时间。
>
> **所以即使，时间设置为 0，也是会照样先执行函数 b**

```js
// 同步代码示例
let a = 0;
function change() {
  a = 1;
}
function print() {
  console.log(a);
}
change();
print(); // 输出结果为 1

// print函数会等change函数完成之后去执行，所以结构输出为1，因为change函数修改了全局变量a的值，change执行之后才执行的print函数
```

### 5.2 回调函数

    回调函数是一段可执行的代码段，它作为一个参数传递给其他的代码，其作用是在需要的时候方便调用这段（回调函数）代码。

我们仅仅传递了函数定义，并没有在参数中执行函数。我们并不传递像平时执行函数一样带有一对执行小括号()的函数。

需要注意的很重要的一点是回调函数并不会马上被执行。它会在包含它的函数内的某个特定时间点被“回调”（就像它的名字一样）

> 回调与同步、异步并没有直接的联系，回调只是一种实现方式，既可以有同步回调**，**也可以有异步回调**，**还可以有事件处理回调和延迟函数回调。

```js
function compute(a, b, callback) {
  // compute函数作为参数，没有被直接执行；
  callback(a, b); // 在compute的函数体里面，传进去的callback打了括号，这么写的就是为了在函数体里面把你传进来的callback函数执行掉。并且在执行的时候，把另外两个参数传给它。
}
```

## 6. 箭头函数

ES6 标准新增了一种新的函数：Arraw Function（箭头函数）

```js
x => x * x

等价于

function (x) {
    return x * x;
}
```

箭头函数相当于匿名函数，并且简化了函数定义。箭头函数有两种格式，一种像上面的，只包含一个表达式，连 `{ ... }` 和 `return` 都省略掉了。

还有一种可以包含多条语句，这时候就不能省略 `{ ... } `和 `return`

```js
(x) => {
  if (x > 0) {
    return x * x;
  } else {
    return -x * x;
  }
};
```

如果参数不是一个，就需要用括号 () 括起来：

```js
// 两个参数:
(x, y) => x * x + y * y

// 无参数:
() => 3.14

// 可变参数:
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }return sum;
}
```

如果要返回一个对象，就要注意，如果是单表达式，这么写的话会报错：

```js
x => { foo: x } // 报错

因为和函数体的 { ... } 有语法冲突，所以要改为：
x => ({ foo: x })
```

### 注意细节

- 箭头函数中，不存在`this`、`arguments`、`new.target`，如果使用了，则使用的是函数外层的对应的`this`、`arguments`、`new.target`
- 箭头函数没有原型
- 箭头函数不能作用构造函数使用

### 应用场景

- 临时性使用的函数，并不会可以调用它，比如：
  - 事件处理函数
  - 异步处理函数
  - 其他临时性的函数
- 为了绑定外层 this 的函数
- 在不影响其他代码的情况下，保持代码的简洁，最常见的，数组方法中的回调函数

## 7. 即时函数 (立即执行函数 / 自调函数)

将函数的定义放进一对括号中，然后外面再紧跟一对括号即可。（一般都是匿名函数）

其中，第二对括号起到的是“立即调用”的作用，同时它也是我们向匿名函数传递参数的地方。

自动执行，执行完成之后立即释放。

IIFE —— immediately-invoked function

```js
(function () {
  alert('boo');
})();

也可以将第一对括号闭合于第二对括号之后(
  (function () {
    alert('boo');
  })(),
); // w3c建议
```

使用即时（自调）匿名函数的好处是不会产生任何全局变量。当然，缺点在于这样的函数是无法重复执行的（除非您将它放在某个循环或其他函数中）。这也使得即时函数非常适合于执行一些一次性的或初始化的任务。

拓展：只有表达式才能被执行符号执行

```js
(function test1() {
    console.log(1)
})(); // 1

let test2 = function() {
    console.log(1)
}(); // 1

function test3() {
    console.log(1)
}(); // Uncaught SyntaxError
```

## 8. 内部(私有)函数

在一个函数内部定义另一个函数

```js
function outer(param) {
	function inner(theinput) {
		return theinput * 2;
	}
	return 'The result is ' + inner(param);
}

当我们调用全局函数 outer()时，本地函数 inner()也会在其内部被调用。
由于inner()是本地函数，它在 outer()以外的地方是不可见的，所以我们也能将它称为私有函数。
```

使用私有函数的优点：

- 有助于我们确保全局名字空间的纯净性（这意味着命名冲突的机会很小）。
- 确保私有性——这使我们可以选择只将一些必要的函数暴露给“外部世界”，而保留属于自己的函数，使它们不为该应用程序的其他部分所用。

## 9. 闭包

### 9.1 作用域链

JavaScript 中不存在大括号级的作用域，但它有函数作用域，也就是说，在某函数内定义的所有变量在该函数外是不可见的。但如果该变量是在某代码块中被定义的（如在某个 if 或 for 语句中），那它在代码块外是可见的。

```js
// 如果我们在函数 outer()中定义了另一个函数 inner()，那么，在inner()中可以访问的变量既来自它自身的作用域，也可以来自其“父级”作用域。
// 这就形成了一条作用域链（scope chain），该链的长度（或深度）则取决于我们的需要。

var global = 1;
function outer(){
	var outer_local = 2;
	function inner() {
		var inner_local = 3;
		return inner_local + outer_local + global;
	}
	return inner();
}

现在让我们来测试一下inner()是否真的可以访问所有变量：
outer(); // 6
```

### 9.2 利用闭包突破作用域链

让我们先通过图示的方式来介绍一下闭包的概念。让我们通过这段代码了解其中奥秘:

```js
var a = 'global variable';
var F = function () {
  var b = 'local variable';
  var N = function () {
    var c = 'inner local';
  };
};
```

首先当然就是全局作用域 G，我们可以将其视为包含一切的宇宙。

<img src="./assets/image-20210111110332889.png" alt="image-20210111110332889" style="zoom: 33%;" />

其中可以包含各种全局变量（如 a1，a2）和函数（如 F）

<img src="./assets/image-20210111110402519.png" alt="image-20210111110402519" style="zoom:50%;" />

每个函数也都会拥有一块属于自己的私用空间，用以存储一些别的变量（例如 b）以及内部函数（例如 N）

<img src="./assets/image-20210111110424760.png" alt="image-20210111110424760" style="zoom: 33%;" />

在上图中，如果我们在 a 点，那么就位于全局空间中。而如果是在 b 点，我们就在函数 F 的空间里，在这里我们既可以访问全局空间，也可以访问 F 空间。如果我们在 c 点，那就位于函数 N 中，我们可以访问的空间包括全局空间、F 空间和 N 空间。其中，a 和 b 之间是不连通的，因为 b 在 F 以外是不可见的。但如果愿意的话，我们是可以将 c 点和 b 点连通起来的，或者说将 N 与 b 连通起来。当我们将 N 的空间扩展到 F 以外，并止步于全局空间以内时，就产生了一件有趣的东西——闭包。

<img src="./assets/image-20210111110446551.png" alt="image-20210111110446551" style="zoom:50%;" />

知道接下来会发生什么吗？N 将会和 a 一样置身于全局空间。而且由于函数还记得它在被定义时所设定的环境，因此它依然可以访问 F 空间并使用 b。这很有趣，因为现在 N 和 a 同处于一个空间，但 N 可以访问 b，而 a 不能。

那么，N 究竟是如何突破作用域链的呢？我们只需要将它们升级为全局变量（不使用 var 语句）或通过 F 传递（或返回）给全局空间即可。

### 9.3 闭包

首先，我们先来看一个函数。这个函数与之前所描述的一样，只不过在 F 中多了返回 N，而在函数 N 中多了返回变量 b，N 和 b 都可通过作用域链进行访问。

```js
var a = "global variable";
var F = function () {
	var b = "local variable";

	var N = function () {
		var c = "inner local";
		return b;
	};
	return N;
};

函数F中包含了局部变量b，因此后者在全局空间里是不可见的。
> b; // ReferenceError: b is not defined

函数N有自己的私有空间，同时也可以访问f()的空间和全局空间，所以b对它来说是可见的。因为F()是可以在全局空间中被调用的（它是一个全局函数），所以我们可以将它的返回值赋值给另一个全局变量，从而生成一个可以访问F()私有空间的新全局函数。

var inner = F();
> inner(); // "local variable"
```

下面这个例子的最终结果与之前相同，但在实现方法上存在一些细微的不同。在这里 F()不再返回函数了，而是直接在函数体内创建一个新的全局函数 inner()

```js
首先，我们需要声明一个全局函数的占位符。尽管这种占位符不是必须的，但最好还是声明一下，然后，我们就可以将函数F()定义如下：

var inner; // placeholder
var F = function (){
	var b = "local variable";

	var N = function () {
		return b;
	};
	inner = N;
};

现在，请读者自行尝试，F()被调用时会发生什么：

> F();

我们在 F()中定义了一个新的函数 N()，并且将它赋值给了全局变量 inner。由于N()是在 F()内部定义的，它可以访问 F()的作用域，所以即使该函数后来升级成了全局函数，但它依然可以保留对F()作用域的访问权。

> inner(); // "local variable".


```

事实上，每个函数都可以被认为是一个闭包。因为每个函数都在其所在域（即该函数的作用域）中维护了某种私有联系。但在大多数时候，该作用域在函数体执行完之后就自行销毁了——除非发生一些有趣的事（比如像上一小节所述的那样），导致作用域被保持。

根据目前的讨论，我们可以说，如果一个函数会在其父级函数返回之后留住对父级作用域的链接的话 ，相关闭包就会被创建起来。但其实每个函数本身就是一个闭包，因为每个函数至少都有访问全局作用域的权限，而全局作用域是不会被破坏的。

让我们再来看一个闭包的例子。这次我们使用的是函数参数（function parameter）。该参数与函数的局部变量没什么不同，但它们是隐式创建的（即它们不需要使用 var 来声明）。我们在这里创建了一个函数，该函数将返回一个子函数，而这个子函数返回的则是其父函数的参数：

```js
function F(param) {
	var N = function(){
		return param;
	};
	param++;
	return N;
}

然后我们可以这样调用它：
var inner = F(123);
inner(); // 124

请注意，当我们的返回函数被调用时(N被赋值时函数并没有被调用，调用是在N被求值，也就是执行return N;语句时发生的),
param++已经执行过一次递增操作了。所以inner()返回的是更新后的值。
由此我们可以看出，函数所绑定的是作用域本身，而不是在函数定义时该作用域中的变量或变量当前所返回的值。
```

### 9.4 循环中的闭包

```js
让我们来看一个三次的循环操作，它在每次迭代中都会创建一个返回当前循环序号的新函数。该新函数会被添加到一个数组中，并最终返回。
function F() {
	var arr = [], i;
	for (i = 0; i < 3; i++) {
		arr[i] = function () {
			return i;
		};
	}
	return arr;
}

下面，我们来运行一下函数，并将结果赋值给数组arr。

var arr = F();

现在，我们拥有了一个包含三个函数的数组。您可以通过在每个数组元素后面加一对括号来调用它们。
按通常的估计，它们应该会依照循环顺序分别输出0、1和2，下面就让我们来试试：

> arr[0](); // 3

> arr[1](); // 3

> arr[2](); // 3

显然，这并不是我们想要的结果。究竟是怎么回事呢？
原来我们在这里创建了三个闭包，而它们都指向了一个共同的局部变量 i。
但是，闭包并不会记录它们的值，它们所拥有的只是相关域在创建时的一个连接（即引用）。
在这个例子中，变量i恰巧存在于定义这三个函数域中。
对这三个函数中的任何一个而言，当它要去获取某个变量时，它会从其所在的域开始逐级寻找那个距离最近的i值。
由于循环结束时i的值为3，所以这三个函数都指向了这一共同值。

为什么结果是3不是2呢？这也是一个值得思考的问题，它能帮助你更好地理解for循环，请自行思考。

那么，应该如何纠正这种行为呢？答案是换一种闭包形式：

function F() {
	var arr = [], i;
	for(i = 0; i < 3; i++) {
		arr[i] = (function (x){
			return function () {
				return x;
			}
		}(i));
	}
	return arr;
}

这样就能获得我们预期的结果了：

var arr = F();

> arr[0](); // 0

> arr[1](); // 1

> arr[2](); // 2

在这里，我们不再直接创建一个返回i的函数了，而是将i传递给了另一个即时函数。
在该函数中，i就被赋值给了局部变量x，这样一来，每次迭代中的x就会拥有各自不同的值了。

或者，我们也可以定义一个“正常点的”内部函数（不使用即时函数）来实现相同的功能。要点是在每次迭代操作中，我们要在中间函数内将i的值“本地化”。

function F() {
	function binder(x) {
		return function(){
			return x;
		};
	}
	var arr = [], i;
	for(i = 0; i < 3; i++) {
		arr[i] = binder(i);
	}
	return arr;
}
```

### 9.5 getter 与 setter

假设现在有一个变量，它所表示的是某类特定值，或某特定区间内的值。我们不想将该变量暴露给外部。因为那样的话，其他部分的代码就有直接修改它的可能，所以我们需要将它保护在相关函数的内部，然后提供两个额外的函数——一个用于获取变量值，另一个用于给变量重新赋值。并在函数中引入某种验证措施，以便在赋值之前给予变量一定的保护。另外，为简洁起见，我们对该类中的验证部分进行了简化：即这里只处理数字值。

```js
我们需要将 getter 和 setter 这两种函数放在一个共同的函数中，并在该函数中定义secret变量，这使得两个函数能够共享同一作用域。具体代码如下：

var getValue, setValue;
(function() {
	var secret = 0;
	getValue = function(){
		return secret;
	};
	setValue = function (v) {
		if (typeof v === "number") {
			secret = v;
		}
	};
}());

在这里，所有一切都是通过一个即时函数来实现的，我们在其中定义了全局函数setValue()和getValue()，并以此来确保局部变量secret的不可直接访问性。

> getValue(); // 0

> setValue(123);

> getValue(); // 123

> setValue(false);

> getValue(); // 123
```

### 9.6 迭代器

```js
在最后一个关于闭包应用的示例（这也是本章的最后一个示例）中，我们将向您展示闭包在实现迭代器方面的功能。

通常情况下，我们都知道如何用循环来遍历一个简单的数组，但是有时候我们需要面对更为复杂的数据结构，它们通常会有着与数组截然不同的序列规则。
这时候就需要将一些“谁是下一个”的复杂逻辑封装成易于使用的 next()函数，然后，我们只需要简单地调用next()就能实现对于相关的遍历操作了。

在下面这个例子中，我们将依然通过简单数组，而不是复杂的数据结构来说明问题。
该例子是一个接受数组输入的初始化函数，我们在其中定义了一个私有指针i，该指针会始终指向数组中的下一个元素。

function setup(x) {
	var i = 0;

	return function(){
		return x[i++];
	};
}

现在，我们只需用一组数据来调用一下setup()，就可创建出我们所需要的next()函数，具体如下：

var next = setup(['a', 'b', 'c']);

这是一种既简单又好玩的循环形式：我们只需重复调用一个函数，就可以不停地获取下一个元素。

next(); // "a"

next(); // "b"

next(); // "c"
```

## 10. 高阶函数

JavaScript 的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

### `map`

`map()` 遍历一个数组，会返回相同长度的操作后的数组；一般不会改变原数组，除非回调函数去修改了原数组。

```js
var array1 = [1,4,9,16];
const map1 = array1.map(x => x *2);

console.log(map1);
// Array [2,8,18,32]

而这样写时：
var array1 = [1, 4, 9, 16];
const map1 = array1.map(x => {
    if (x == 4) {
        return x * 2;
    }
});

console.log(map1);
// Array [undefined, 8, undefined, undefined]
为什么会出现三个undefined呢？而不是预期的[1,8,9,16]

这样写只是增加了一个条件，即x的值为4时才乘以2，
之所以会出现undefined，是因为map()方法创建了一个新数组，但新数组并不是在遍历完array1后才被赋值的，而是每遍历一次就得到一个值。
所以，下面这样修改后就正确了：
var array1 = [1, 4, 9, 16];
const map1 = array1.map(x => {
    if (x == 4) {
        return x * 2;
    }
    return x;
});

```

利用 map 快速将数字转换为字符串：

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
```

利用 map 快速将字符串转换为数字：

```js
var arr = ['1', '2', '3'];
var r = arr.map(Number);

console.log(r); // 1,2,3


这里用arr.map(parseInt)会变成 1,NaN,NaN，原因：

由于map()接收的回调函数可以有3个参数：callback(currentValue, index, array)，通常我们仅需要第一个参数，而忽略了传入的后面两个参数。
不幸的是，parseInt(string, radix)没有忽略第二个参数，导致实际执行的函数分别是：

parseInt('1', 0); // 1, 按十进制转换

parseInt('2', 1); // NaN, 没有一进制

parseInt('3', 2); // NaN, 按二进制转换不允许出现3

可以改为r = arr.map(Number);，因为Number(value)函数仅接收一个参数。
```

### `reduce`

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

reduce() 可以作为一个高阶函数，用于函数的 compose。

reduce()方法可以搞定的东西，for 循环，或者 forEach 方法有时候也可以搞定，那为啥要用 reduce()？这个问题，之前我也想过，要说原因还真找不到，唯一能找到的是：通往成功的道路有很多，但是总有一条路是最捷径的，亦或许 reduce()逼格更高。

```js
// 语法：
arr.reduce(callback,initialValue)

返回最后一个值，reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，
接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。
```

例子

```js
// 不设置 initialValue 初始值
var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
console.log(arr, sum);
/*
打印结果：
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
*/

// 设置 initialValue 初始值
var  arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0) //注意这里设置了初始值
console.log(arr, sum);
/*
打印结果：
0 1 0
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
这个例子index是从0开始的，第一次的prev的值是我们设置的初始值0，数组长度是4，reduce函数循环4次。
*/

// 结论：如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。
// 如果这个数组为空，运用reduce是什么情况？
var  arr = [];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
//报错，"TypeError: Reduce of empty array with no initial value"
但是要是我们设置了初始值就不会报错
var  arr = [];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0)
console.log(arr, sum); // [] 0

// 一般来说，提供初始值更加安全
```

**reduce 简单用法**

```js
数组求和，求乘积
var  arr = [1, 2, 3, 4];
var sum = arr.reduce((x,y) => x + y)
var mul = arr.reduce((x,y) => x * y)
console.log( sum ); //求和，10
console.log( mul ); //求乘积，24
```

**reduce 高级用法**

```js
(1)计算数组中每个元素出现的次数

let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

let nameNum = names.reduce((pre,cur) => {
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1
  }
  return pre
},{})
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```

```js
(2)数组去重

let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur) => {
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]
```

```js
(3)将二维数组转化为一维

let arr = [[0, 1], [2, 3], [4, 5]]
let newArr = arr.reduce((pre,cur) => {
    return pre.concat(cur)
},[])
console.log(newArr); // [0, 1, 2, 3, 4, 5]
```

```js
(4)将多维数组转化为一维

let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
const newArr = function(arr){
   return arr.reduce((pre,cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur),[])
}
console.log(newArr(arr)); //[0, 1, 2, 3, 4, 5, 6, 7]
```

```js
(5)对象里的属性求和

var result = [
    {
        subject: 'math',
        score: 10
    },
    {
        subject: 'chinese',
        score: 20
    },
    {
        subject: 'english',
        score: 30
    }
];

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
console.log(sum) //60
```

```js
(6)将[1,3,1,4]转为数字1314

function addDigitValue(prev,curr,curIndex,array){
        var exponent = (array.length -1) -curIndex;
        var digitValue = curr*Math.pow(10,exponent); // Math.pow(i, 3) //i 的三次方
        return prev + digitValue;
    }
     var arr6 = [1,3,1,4];
     var result7 = arr6.reduce(addDigitValue,0)
    console.info('result7',result7)
```

### `reduceRight`

> 该方法用法与 `reduce()`其实是相同的，只是遍历的顺序相反，它是从数组的最后一项开始，向前遍历到第一项。

如果调用 `reduceRight()` 时提供了 `initialValue` 参数，则 `prevValue` 等于 `initialValue`，`curValue` 等于数组中的最后一个值。如果没有提供 `initialValue` 参数，则 `prevValue` 等于数组最后一个值， `curValue` 等于数组中倒数第二个值。

### `filter`

filter 也是一个常用的操作，它用于把 `Array`的某些元素过滤掉，然后返回剩下的元素。

和 `map()`类似，`Array`的 `filter()`也接收一个函数。和 `map()`不同的是，`filter()`把传入的函数依次作用于每个元素，然后根据返回值是 `true`还是 `false`决定保留还是丢弃该元素。

```js
例如，在一个Array中，删掉偶数，只保留奇数，可以这么写：

var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
// [1, 5, 9, 15]
```

```js
把一个Array中的空字符串删掉;
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var r = arr.filter(function (s) {
  return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
// ['A', 'B', 'C']
```

`filter()`接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示 `Array`的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

```js
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
  console.log(element); // 依次打印'A', 'B', 'C'
  console.log(index); // 依次打印0, 1, 2
  console.log(self); // self就是变量arr
  return true;
});
```

```js
利用filter，可以巧妙地去除Array的重复元素：
var
    r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
console.log(r.toString());
// apple,strawberry,banana,pear,orange
去除重复元素依靠的是indexOf总是返回第一个元素的位置，后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了。
```

filter() 筛选数组对象

```js
单个条件筛选：
let arr = [
	    {a:'苹果',b:'面包',c:'吃'},
	    {a:'香蕉',b:'面包',c:'不吃'},
	    {a:'香蕉',b:'苹果',c:'吃'},
	    {a:'苹果',b:'香蕉',c:'不吃'},
	  ]
console.log(arr.filter(item => item.a=== '苹果' ))//[{a:'苹果',b:'面包',c:'吃'},{a:'苹果',b:'香蕉',c:'不吃'}]
```

```js
多个条件筛选：

let a = '苹果'; //筛选参数a
let b = '面包'; //筛选参数b
let c = ''     //筛选参数c
let arr = [
	    {a:'苹果',b:'面包',c:'吃'},
	    {a:'香蕉',b:'面包',c:'不吃'},
	    {a:'香蕉',b:'苹果',c:'吃'},
	    {a:'苹果',b:'香蕉',c:'不吃'},
	  ];
arr = arr.filter(item => (a?item.a === a : true) && (b?item.b === b : true) && (c?item.c === c : true))

console.log(arr) // 筛选结果: [{a:'苹果',b:'面包',c:'吃'}]
```

### `find()`

它会在数组里面找，找到第一个符合条件的元素，它就立即返回当前元素，不会继续往下找，如果数组中的所有元素都不符合条件，则返回 undefined。返回通过测试（函数内判断）的数组的第一个元素的值。为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 true 时, `find() `返回符合条件的元素，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 undefined

注意: `find()` 对于空数组，函数是不会执行的。注意: `find()` 并没有改变数组的原始值。

```js
/ 语法：
array.find(function(currentValue, index, arr),thisValue)

参数说明：
参数1：function(currentValue, index,arr)必需。数组每个元素需要执行的函数。
函数参数:
	currentValue 必需。当前元素
	index可选。当前元素的索引值
	arr可选。当前元素所属的数组对象

参数2：thisValue
可选。 传递给函数的值一般用 “this” 值。
如果这个参数为空， “undefined” 会传递给 “this” 值
```

例子

```js
查找数组中第一个大于14的元素。

var age=[12,42,34,10];
let a=this.age.find((x)=>{
		return x>14;
 });
console.log(a);//打印结果42


// 可以简化为 let a = this.age.find(x => x > 14)
```

### `findIndex()`

从数组中查找第一个符合条件的元素，然后返回该元素的索引，如果找到第一个符合条件的元素就不再继续往下找，如果找不到，则返回-1。

返回传入一个测试条件（函数）符合条件的数组第一个元素位置。为数组中的每个元素都调用一次函数执行：

- 当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 -1

注意: findIndex() 对于空数组，函数是不会执行的。注意: findIndex() 并没有改变数组的原始值。

例子:

```js
let flag = this.treeAbout.findIndex((item) => item.id === params.data.id);
```

### `forEach`

`forEach()` 遍历数组并对每个数组成员应用一些具有副作用的操作。

会改变原数组。

没有返回值。

例子：

```js
var array = ['a', 'b', 'c'];

array.forEach(function (element) {
  console.log(element);
});
```

`forEach()`方法中的回调函数有三个参数：

- 第一个参数是遍历的数组内容-----value，
- 第二个参数是对应的数组索引-----index
- 第三个参数是数组本身-----arr

```js
var arr = ['你好', '我好', '大家好', '才是', '真的好'];
arr.forEach(function (value, index, arr) {
  // 输出为array数组的每一个元素
  // 注意 value在前
  console.log(value);
  console.log(index);
  console.log(arr);
});
```

arr 必须是一个真正的数组，**当 arr 为伪数组则会报错**：

```javascript
let btns = document.getElementsByTagName('button');
console.log('btns', btns); //得到一个伪数组
btns.forEach((item) => console.log(item));

// Uncaught TypeError: btns.forEach is not a function
```

### `sort()`

排序算法

排序也是在程序中经常用到的算法。无论使用冒泡排序还是快速排序，排序的核心是比较两个元素的大小。如果是数字，我们可以直接比较，但如果是字符串或者两个对象呢？直接比较数学上的大小是没有意义的，因此，比较的过程必须通过函数抽象出来。通常规定，对于两个元素 `x`和 `y`，如果认为 `x < y`，则返回 `-1`，如果认为 `x == y`，则返回 `0`，如果认为 `x > y`，则返回 `1`，这样，排序算法就不用关心具体的比较过程，而是根据比较结果直接排序。

JavaScript 的 `Array`的 `sort()`方法就是用于排序的，但是排序结果可能让你大吃一惊：

```js
// 看上去正常的结果:
['Google', 'Apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];

// apple排在了最后:
['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']

// 无法理解的结果:
[10, 20, 1, 2].sort(); // [1, 10, 2, 20]

第二个排序把apple排在了最后，是因为字符串根据ASCII码进行排序，而小写字母a的ASCII码在大写字母之后。

第三个排序结果是什么鬼？简单的数字排序都能错？

这是因为Array的sort()方法默认把所有元素先转换为String再排序，结果'10'排在了'2'的前面，因为字符'1'比字符'2'的ASCII码小。


```

如果不知道 `sort()`方法的默认排序规则，直接对数字排序，绝对栽进坑里！

幸运的是，`sort()`方法也是一个高阶函数，它还可以接收一个比较函数来实现自定义的排序。

```js
/ 要按数字大小排序，我们可以这么写：
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
});
console.log(arr); // [1, 2, 10, 20]

/ 如果要倒序排序，我们可以把大的数放前面：
var arr = [10, 20, 1, 2];
arr.sort(function (x, y) {
    if (x < y) {
        return 1;
    }
    if (x > y) {
        return -1;
    }
    return 0;
}); // [20, 10, 2, 1]


```

```js
默认情况下，对字符串排序，是按照ASCII的大小比较的，现在，我们提出排序应该忽略大小写，按照字母序排序。要实现这个算法，不必对现有代码大加改动，只要我们能定义出忽略大小写的比较算法就可以：

var arr = ['Google', 'apple', 'Microsoft'];
arr.sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) {
        return -1;
    }
    if (x1 > x2) {
        return 1;
    }
    return 0;
}); // ['apple', 'Google', 'Microsoft
忽略大小写来比较两个字符串，实际上就是先把字符串都变成大写（或者都变成小写），再比较。

从上述例子可以看出，高阶函数的抽象能力是非常强大的，而且，核心代码可以保持得非常简洁。

最后友情提示，sort()方法会直接对Array进行修改，它返回的结果仍是当前Array：
var a1 = ['B', 'A', 'C'];
var a2 = a1.sort();
a1; // ['A', 'B', 'C']
a2; // ['A', 'B', 'C']
a1 === a2; // true, a1和a2是同一对象
```

### `every()`

`every()`方法可以判断数组的所有元素是否满足测试条件。

例如，

```javascript
给定一个包含若干字符串的数组，判断所有字符串是否满足指定的测试条件：
var arr = ['Apple', 'pear', 'orange'];
console.log(arr.every(function (s) {
    return s.length > 0;
})); // true, 因为每个元素都满足s.length>0

console.log(arr.every(function (s) {
    return s.toLowerCase() === s;
})); // false, 因为不是每个元素都全部是小写
```

## 11. generator（生成器）

generator（生成器）是 ES6 标准引入的新的数据类型。一个 generator 看上去像一个函数，但可以返回多次。

我们先复习函数的概念。一个函数是一段完整的代码，调用一个函数就是传入参数，然后返回结果：

```js
function foo(x) {
  return x + x;
}

var r = foo(1); // 调用foo函数
```

函数在执行过程中，如果没有遇到 `return`语句（函数末尾如果没有 `return`，就是隐含的 `return undefined;`），控制权无法交回被调用的代码。

generator 跟函数很像，定义如下：

```js
function* foo(x) {
  yield x + 1;
  yield x + 2;
  return x + 3;
}
```

generator 和函数不同的是，generator 由 `function*`定义（注意多出的 `*`号），并且，除了 `return`语句，还可以用 `yield`返回多次。

大多数同学立刻就晕了，generator 就是能够返回多次的“函数”？返回多次有啥用？

还是举个栗子吧。

我们以一个著名的斐波那契数列为例，它由 `0`，`1`开头：

```js
0 1 1 2 3 5 8 13 21 34 ...
```

要编写一个产生斐波那契数列的函数，可以这么写：

```js
function fib(max) {
  var t,
    a = 0,
    b = 1,
    arr = [0, 1];
  while (arr.length < max) {
    [a, b] = [b, a + b];
    arr.push(b);
  }
  return arr;
}

// 测试:
fib(5); // [0, 1, 1, 2, 3]
fib(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

函数只能返回一次，所以必须返回一个 `Array`。但是，如果换成 generator，就可以一次返回一个数，不断返回多次。用 generator 改写如下：

```js
function* fib(max) {
  var t,
    a = 0,
    b = 1,
    n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
  return;
}
```

**直接调用试试**：

```
fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
```

直接调用一个 generator 和调用函数不一样，`fib(5)`仅仅是创建了一个 generator 对象，还没有去执行它。

调用 generator 对象有两个方法，一是不断地调用 generator 对象的 `next()`方法：

```js
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
```

`next()`方法会执行 generator 的代码，然后，每次遇到 `yield x;`就返回一个对象 `{value: x, done: true/false}`，然后“暂停”。返回的 `value`就是 `yield`的返回值，`done`表示这个 generator 是否已经执行结束了。如果 `done`为 `true`，则 `value`就是 `return`的返回值。

当执行到 `done`为 `true`时，这个 generator 对象就已经全部执行完毕，不要再继续调用 `next()`了。

**第二个方法**:

直接用 `for ... of`循环迭代 generator 对象，这种方式不需要我们自己判断 `done`：

```js
function* fib(max) {
  var t,
    a = 0,
    b = 1,
    n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
  return;
}
for (var x of fib(10)) {
  console.log(x); // 依次输出0, 1, 1, 2, 3, ...
}
```

**generator 和普通函数相比，有什么用？**

因为 generator 可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个 generator 就可以实现需要用面向对象才能实现的功能。

```js
例如，用一个对象来保存状态，得这么写：

var fib = {
    a: 0,
    b: 1,
    n: 0,
    max: 5,
    next: function () {
        var
            r = this.a,
            t = this.a + this.b;
        this.a = this.b;
        this.b = t;
        if (this.n < this.max) {
            this.n ++;
            return r;
        } else {
            return undefined;
        }
    }
};
```

```js
/ 要生成一个自增的ID，可以编写一个next_id()函数：
var current_id = 0;

function next_id() {
    current_id ++;
    return current_id;
}

由于函数无法保存状态，故需要一个全局变量current_id来保存数字。
/
/ 不用闭包，试用generator改写：
function* next_id() {
    var current_id = 1;
	while(current_id < 100) {
		yield current_id;
		current_id ++;
	}
	return
}

// 测试:
var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 100; x ++) {
    if (g.next().value !== x) {
        pass = false;
        console.log('测试失败!');
        break;
    }
}
if (pass) {
    console.log('测试通过!');
}
```

用对象的属性来保存状态，相当繁琐。

generator 还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。

```js
/ 没有generator之前，用AJAX时需要这么写代码：

ajax('http://url-1', data1, function (err, result) {
    if (err) {
        return handle(err);
    }
    ajax('http://url-2', data2, function (err, result) {
        if (err) {
            return handle(err);
        }
        ajax('http://url-3', data3, function (err, result) {
            if (err) {
                return handle(err);
            }
            return success(result);
        });
    });
});
回调越多，代码越难看。
/
/ 有了generator的美好时代，用AJAX时可以这么写：

try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
}
catch (err) {
    handle(err);
}
看上去是同步的代码，实际执行是异步的。
```

## 12. 内建函数

全局对象的方法

<img src="./assets/image-20210110195633336.png" alt="image-20210110195633336" style="zoom:50%;" />

<img src="./assets/image-20210110195709820.png" alt="image-20210110195709820" style="zoom: 50%;" />

<img src="./assets/image-20210110195724255.png" alt="image-20210110195724255" style="zoom:50%;" />
