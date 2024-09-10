---
title: 循环
order: 8
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

## `for`

for 循环主要用于把某些代码循环若干次，通常跟计数有关系。

```js
for (初始化变量;条件表达式;计数器更新) {
    // 循环体
}

for循环的3个条件都是可以省略的，如果没有退出循环的判断条件，就必须使用break语句退出循环，否则就是死循环：

for (;;) {     // 无限循环
    doSomething();
}

var x = 0;
for (;;) { // 将无限循环下去
    if (x > 100) {
        break; // 通过if判断来退出循环
    }
    x ++;
}
```

### `for ... in`

`for... in`可以把一个对象的所有属性依次循环出来

```js
var o = {
  name: 'Jack',
  age: 20,
  city: 'Beijing',
};
for (var key in o) {
  console.log(key); // 'name', 'age', 'city'
}
```

要过滤掉对象继承的属性，用 `hasOwnProperty()`来实现：

```js
var o = {
  name: 'Jack',
  age: 20,
  city: 'Beijing',
};
for (var key in o) {
  if (o.hasOwnProperty(key)) {
    console.log(key); // 'name', 'age', 'city'
  }
}
```

由于 `Array`也是对象，而它的每个元素的索引被视为对象的属性，因此，`for ... in`循环可以直接循环出 `Array`的索引：

```js
var a = ['A', 'B', 'C'];
for (var i in a) {
    console.log(i); // '0', '1', '2'
    console.log(a[i]); // 'A', 'B', 'C'
}
/ for ... in对Array的循环得到的是String而不是Number。
```

ECMAScript 对象的属性没有顺序。因此，通过 for-in 循环输出的属性名的顺序是不可预测的。具体来讲，所有属性都会被返回一次，但返回的先后次序可能会因浏览器而异。

### `for ... of`

for … of 遍历获取的是对象的键值

```js
var arr = ['nick', 'freddy', 'mike', 'james'];
for (var item of arr) {
  console.log(item);
}
/*  nick 
	freddy 
	mike 
	james */

var arr = [
  { name: 'nick', age: 18 },
  { name: 'freddy', age: 24 },
  { name: 'mike', age: 26 },
  { name: 'james', age: 34 },
];
for (var item of arr) {
  console.log(item.name, item.age);
}
/*  nick 18
	freddy 24
	mike 26
	james 34
*/
```

### `for in` 与 `for of` 的区别

- for of 无法循环遍历对象
- for in 循环遍历的是数组的键值(索引)，而 for of 循环遍历的是数组的值
- for … in 会遍历对象的整个原型链,性能非常差不推荐使用,而 for … of 只遍历当前对象不会遍历原型链
- 对于数组的遍历,for … in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性),for … of 只返回数组的下标对应的属性值
- for in 会遍历自定义属性，for of 不会
-

## `while`

`while`语句属于前测试循环语句，也就是说，在循环体内的代码被执行之前，就会对出口条件求值。因引，循环体内的代码有可能永远不会被执行。

```js
var i = 0;
while (i < 10) {
  i += 2;
}
```

### `do while`

`do while`语句是一种后测试循环语句，即只有在循环体中的代码执行之后，才会测试出口条件。换句话说，在对条件表达式求值之前，循环体内的代码至少会被执行一次。

```js
var i = 0;
do {
  i += 2;
} while (i < 10);

alert(i);
```

### `break`和 `continue`语句

break 和 continue 语句用于在循环中精确地控制代码的执行。其中，break 语句会立即退出循环，强制继续执行循环后面的语句。而 continue 语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行

```js
ar num = 0;
for (var i=1; i < 10; i++) {
    if (i % 5 == 0) {
       break;
    }
    num++;
}
alert(num);    // 4

这个例子中的for循环会将变量i由1递增至10。在循环体内，有一个if语句检查i的值是否可以被5整除（使用求模操作符）。如果是，则执行break语句退出循环。另一方面，变量num从0开始，用于记录循环执行的次数。在执行break语句之后，要执行的下一行代码是alert()函数，结果显示4。也就是说，在变量i等于5时，循环总共执行了4次；而break语句的执行，导致了循环在num再次递增之前就退出了。

如果在这里把break替换为continue的话，则可以看到另一种结果：
var num = 0;
for (var i=1; i < 10; i++) {
    if (i % 5 == 0) {
        continue;
    }
    num++;
}
alert(num);    // 8
例子的结果显示8，也就是循环总共执行了8次。当变量i等于5时，循环会在num再次递增之前退出，但接下来执行的是下一次循环，即i的值等于6的循环。于是，循环又继续执行，直到i等于10时自然结束。而num的最终值之所以是8，是因为continue语句导致它少递增了一次。
```

### `label`语句

使用 label 语句可以在代码中添加标签，以便将来使用。break 和 continue 语句都可以与 label 语句联合使用，从而返回代码中特定的位置。这种联合使用的情况多发生在循环嵌套的情况下

```js
var num = 0;
outermost:
for (var i=0; i < 10; i++) {
     for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            break outermost;
        }
        num++;
    }
}
alert(num);    //55

在这个例子中，outermost标签表示外部的for语句。如果每个循环正常执行10次，则num++语句就会正常执行100次。换句话说，如果两个循环都自然结束，num的值应该是100。但内部循环中的break语句带了一个参数：要返回到的标签。添加这个标签的结果将导致break语句不仅会退出内部的for语句（即使用变量j的循环），而且也会退出外部的for语句（即使用变量i的循环）。为此，当变量i和j都等于5时，num的值正好是55。
// 不加 outermost 且不用break outermost直接break时,循环在 i 为5，j 为5的时候跳出 j循环，但会继续执行 i 循环，输出 95


同样，continue语句也可以像这样与label语句联用:
var num = 0;
outermost:
for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            continue outermost;
        }
        num++;
    }
}
alert(num);    //95

在这种情况下，continue语句会强制继续执行循环——退出内部循环，执行外部循环。当j是5时，continue语句执行，而这也就意味着内部循环少执行了5次，因此num的结果是95。

虽然联用break、continue和label语句能够执行复杂的操作，但如果使用过度，也会给调试带来麻烦。在此，我们建议如果使用label语句，一定要使用描述性的标签，同时不要嵌套过多的循环。
```

### `with`语句

with 语句的作用是将代码的作用域设置到一个特定的对象中,定义 with 语句的目的主要是为了简化多次编写同一个对象的工作

```js
var qs = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;

上面几行代码都包含location对象。如果使用with语句，可以把上面的代码改写成如下所示：

with(location){
    var qs = search.substring(1);
    var hostName = hostname;
    var url = href;
}

这个重写后的例子中，使用with语句关联了location对象。这意味着在with语句的代码块内部，每个变量首先被认为是一个局部变量，而如果在局部环境中找不到该变量的定义，就会查询location对象中是否有同名的属性。如果发现了同名属性，则以location对象属性的值作为变量的值。
/
/ 严格模式下不允许使用with语句，否则将视为语法错误。
```
