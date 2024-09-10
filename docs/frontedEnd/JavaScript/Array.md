---
title: 数组
order: 5
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

## 数组

虽然 ECMAScript 数组与其他语言中的数组都是数据的有序列表，但与其他语言不同的是，ECMAScript 数组的每一项可以保存任何类型的数据。也就是说，可以用数组的第一个位置来保存字符串，用第二位置来保存数值，用第三个位置来保存对象，以此类推。而且，ECMAScript 数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。

## 1. 数组的创建

创建数组的基本方式有两种。第一种是使用 Array 构造函数

```js
var colors = new Array();

如果预先知道数组要保存的项目数量，也可以给构造函数传递该数量，而该数量会自动变成length属性的值。
var colors = new Array(20); // 创建length值为20的数组

也可以向Array构造函数传递数组中应该包含的项
var colors = new Array("red", "blue", "green"); // 创建了一个包含3个字符串值的数组

给构造函数传递一个值也可以创建数组。但这时候问题就复杂一点了，因为如果传递的是数值，则会按照该数值创建包含给定项数的数组；而如果传递的是其他类型的参数，则会创建包含那个值的只有一项的数组。
var colors = new Array(3);           // 创建一个包含3项的数组
var names = new Array("Greg");       // 创建一个包含1项，即字符串"Greg"的数组

在使用Array构造函数时也可以省略new操作符
var colors = Array(3);               // 创建一个包含3项的数组
var names = Array("Greg");           // 创建一个包含1项，即字符串"Greg"的数组
```

创建数组的第二种基本方式是使用数组字面量表示法。数组字面量由一对包含数组项的方括号表示，多个数组项之间以逗号隔开

```js
var colors = ["red", "blue", "green"];   // 创建一个包含3个字符串的数组
var names = [];                          // 创建一个空数组
var values = [1,2,];                     // 不要这样！这样会创建一个包含2或3项的数组
var options = [,,,,,];                   // 不要这样！这样会创建一个包含5或6项的数组

与对象一样，在使用数组字面量表示法时，也不会调用Array构造函数
```

## 2. 读取、修改数组

在读取和设置数组的值时，要使用方括号并提供相应值的基于 0 的数字索引

```js
ar colors = ["red", "blue", "green"];    // 定义一个字符串数组
alert(colors[0]);                         // 显示第一项
colors[2] = "black";                      // 修改第三项
colors[3] = "brown";                      // 新增第四项

方括号中的索引表示要访问的值。
如果索引小于数组中的项数，则返回对应项的值，就像这个例子中的colors[0]会显示"red"一样。
设置数组的值也使用相同的语法，但会替换指定位置的值。
如果设置某个值的索引超过了数组现有项数，如这个例子中的colors[3]所示，数组就会自动增加到该索引值加1的长度（就这个例子而言，索引是3，因此数组长度就是4）
```

数组的项数保存在其 length 属性中，这个属性始终会返回 0 或更大的值

```js
var colors = ['red', 'blue', 'green']; // 创建一个包含3个字符串的数组
var names = []; // 创建一个空数组

alert(colors.length); //3
alert(names.length); //0
```

数组的 length 属性很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项。

```js
var colors = ["red", "blue", "green"];     // 创建一个包含3个字符串的数组
colors.length = 2;
alert(colors[2]);                 //undefined

这个例子中的数组colors一开始有3个值。
将其length属性设置为2会移除最后一项（位置为2的那一项），结果再访问colors[2]就会显示undefined了。
如果将其length属性设置为大于数组项数的值，则新增的每一项都会取得undefined值
var colors = ["red", "blue", "green"];    // 创建一个包含3个字符串的数组
colors.length = 4;
alert(colors[3]);                 //undefined
```

```js
var colors = ["red", "blue", "green"];         // 创建一个包含3个字符串的数组
colors[99] = "black";                          // （在位置99）添加一种颜色
alert(colors.length);  // 100

在这个例子中，我们向colors数组的位置99插入了一个值，结果数组新长度（length）就是100（99+1）。
而位置3到位置98实际上都是不存在的，所以访问它们都将返回undefined。
```

## 3. 检测数组

对于一个网页，或者一个全局作用域而言，使用 `instanceof`操作符就能确定某个对象是不是数组

```js
if (value instanceof Array) {
  //对数组执行某些操作
}
```

`instanceof`操作符的问题在于，它假定单一的全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 Array 构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

为了解决这个问题，ECMAScript 5 新增了 Array.isArray()方法。这个方法的目的是最终确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。

```js
if (Array.isArray(value)) {
  //对数组执行某些操作
}
```

## 4. 转换方法

### `toLocaleString()`、`toString()`、`valueOf()`

所有对象都具有 `toLocaleString()`、`toString()`和 `valueOf()`方法。其中，调用数组的 `toString()`和 `valueOf()`方法会返回相同的值，即由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。实际上，为了创建这个字符串会调用数组每一项的 toString()方法。

```js
var colors = ["red", "blue", "green"];      // 创建一个包含3个字符串的数组
alert(colors.toString());     // red,blue,green
alert(colors.valueOf());      // red,blue,green
alert(colors);                // red,blue,green

在这里，我们首先显式地调用了toString()和valueOf()方法，以便返回数组的字符串表示，每个值的字符串表示拼接成了一个字符串，中间以逗号分隔。
最后一行代码直接将数组传递给了alert()。
由于alert()要接收字符串参数，所以它会在后台调用toString()方法，由此会得到与直接调用toString()方法相同的结果。

另外，toLocaleString()方法经常也会返回与toString()和valueOf()方法相同的值，但也不总是如此。
当调用数组的toLocaleString()方法时，它也会创建一个数组值的以逗号分隔的字符串。
而与前两个方法唯一的不同之处在于，这一次为了取得每一项的值，调用的是每一项的toLocaleString()方法，而不是toString()方法。

var person1 = {
    toLocaleString : function () {
        return "Nikolaos";
    },
    toString : function() {
        return "Nicholas";
    }
};

var person2 = {
    toLocaleString : function () {
        return "Grigorios";
    },
    toString : function() {
        return "Greg";
    }
};

var people = [person1, person2];
alert(people);                           //Nicholas,Greg
alert(people.toString());                //Nicholas,Greg
alert(people.toLocaleString());          //Nikolaos,Grigorios

我们在这里定义了两个对象：person1和person2。
而且还分别为每个对象定义了一个toString()方法和一个toLocaleString()方法，这两个方法返回不同的值。
然后，创建一个包含前面定义的两个对象的数组。
在将数组传递给alert()时，输出结果是"Nicholas,Greg"，因为调用了数组每一项的toString()方法（同样，这与下一行显式调用toString()方法得到的结果相同）。
而当调用数组的toLocaleString()方法时，输出结果是"Nikolaos,Grigorios"，原因是调用了数组每一项的toLocaleString()方法。
```

### `join()`

数组继承的 toLocaleString()、toString()和 valueOf()方法，在默认情况下都会以逗号分隔的字符串的形式返回数组项。而如果使用 `join()`方法，则**可以使用不同的分隔符**来构建这个字符串。`join()`方法只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。

```js
var colors = ["red", "green", "blue"];
alert(colors.join(","));       //red,green,blue
alert(colors.join("||"));      //red||green||blue

在这里，我们使用join()方法重现了toString()方法的输出。
在传递逗号的情况下，得到了以逗号分隔的数组值。而在最后一行代码中，我们传递了双竖线符号，结果就得到了字符串"red||green||blue"。
如果不给join()方法传入任何值，或者给它传入undefined，则使用逗号作为分隔符。IE7及更早版本会错误的使用字符串"undefined"作为分隔符。
如果数组中的某一项的值是null或者undefined，那么该值在join()、toLocale-String()、toString()和valueOf()方法返回的结果中以空字符串表示。
```

## 5. 栈方法

栈是一种 LIFO（Last-In-First-Out，后进先出）的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部。

### `push`

`push()`方法接收任意数量的参数，把它们逐个添加到数组末尾，并**返回修改后的数组长度**

参数： item...（多个数组项）

```js
let arr = ['a', 'b', 'c'];
const count = arr.push('d');
console.log(count); // 4
console.log(arr); // [ 'a', 'b', 'c', 'd' ]
```

### `pop`

`pop()`方法从数组末尾移除最后一项，减少数组的 length，**返回移除的项**

参数：无

```js
let arr = ['a', 'b', 'c'];
const item = arr.pop();
console.log(item); // 'c'
console.log(arr); // [ 'a', 'b' ]
```

## 6. 队列方法

队列数据结构的访问规则是 FIFO（First-In-First-Out，先进先出）。队列在列表的末端添加项，从列表的前端移除项。

### `shift()`

`shift()`方法移除数组中的第一项，**并返回该项**，同时数组长度减 1

参数：无

```js
let arr = ['a', 'b', 'c'];
const item = arr.shift();
console.log(item); // 'a'
console.log(arr); // [ 'b', 'c' ]
```

### `unshit()`

`unshit()`方法在数组前端添加任意个项，并**返回新数组的长度**

参数：item...(多个数组项)

## 7. 重排序方法

### `reverse()`

`reverse()`方法用于反转数组中每一项，并**返回反转后的数组**

参数：无

```js
let arr = ['a', 'b', 'c'];
console.log(arr.reverse()); // [ 'c', 'b', 'a' ]
```

### `sort()`

在默认情况下，`sort()`方法按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。为了实现排序，`sort()`方法会调用每个数组项的 `toString()`转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值，`sort()`方法比较的也是字符串。

参数：compareFunction(可选)

```js
var values = [0, 1, 5, 10, 15];
values.sort();
alert(values);     //0,1,10,15,5

即使例子中值的顺序没有问题，但sort()方法也会根据测试字符串的结果改变原来的顺序。
因为数值5虽然小于10，但在进行字符串比较时，"10"则位于"5"的前面，于是数组的顺序就被修改了。
不用说，这种排序方式在很多情况下都不是最佳方案。
因此sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。
```

比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。

```js
function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}
```

这个比较函数可以适用于大多数数据类型，只要将其作为参数传递给 sort()方法即可

```js
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); //0,1,5,10,15
```

在将比较函数传递到 `sort()`方法之后，数值仍然保持了正确的升序。当然，也可以通过比较函数产生降序排序的结果，只要交换比较函数返回的值即可。

```js
function compare(value1, value2) {
  if (value1 < value2) {
    return 1;
  } else if (value1 > value2) {
    return -1;
  } else {
    return 0;
  }
}

var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); // 15,10,5,1,0
```

> reverse()和 sort()方法的返回值是经过排序之后的数组

对于数值类型或者其 `valueOf()`方法会返回数值类型的对象类型，可以使用一个更简单的比较函数。这个函数只要用第二个值减第一个值即可(升级排序)

```js
function compare(value1, value2){
    return value2 - value1;
}
由于比较函数通过返回一个小于零、等于零或大于零的值来影响排序结果，因此减法操作就可以适当地处理所有这些情况。
```

```js
简写;
const arr = arr.sort((a, b) => a - b); // 从小到大排序
```

## 8. 操作方法

### 拼接 `concat()`

`concat()`方法创建当前数组一个副本，然后将接收到的参数添加到这个副本末尾，最后**返回新构建的数组**

参数：item...(可以是数组项，也可以是数组)

```js
let arr = [1, 2, 3];
let newArr = arr.concat(4, 5, [6, 7]);
console.log(newArr); // [ 1, 2, 3, 4, 5, 6, 7 ]
```

### 截取 `slice()`

`slice()`方法基于当前数组中的一或多个项**创建一个新数组, 不会直接改变原数组**

slice(start,end)

参数: start(要返回项的起始位置),end(要返回项的结束位置，可选)

如果不传入参数二，那么将从参数一的索引位置开始截取，一直到数组尾

```js
let arr = [1, 2, 3, 4];
let newArr = arr.slice(1, 3); // 表示复制从位置1开始，到位置2结束
console.log(newArr); // [ 2, 3 ]
```

**如果 slice 方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置**

例如，在一个包含 5 项的数组上调用 slice(-2,-1)与调用 slice(3,4)得到的结果相同。如果结束位置小于起始位置，则返回空数组。

###### `slice`无参调用可以将对象转化成数组

```js
var testObj = {
  0: 'prop0',
  1: 'prop1',
  2: 'prop2',
  3: 'prop3',
  length: 4,
};
var kkk = Array.prototype.slice.call(testObj);
console.log(kkk);
// ['prop0', 'prop1', 'prop2', 'prop3']
```

### 插入、删除、替换 `splice()`

**`splice()`方法用法有多种，根据不同的用法需要传递的参数也不一样**

- 删除：可以删除任意数量的项，指定两个参数：删除的第一项位置和删除的数量
- 插入：可以向指定位置插入任意数量的项，第一个参数：插入的位置，第二个参数 0（删除 0），第三个参数以后要插入的项
- 替换：可以将指定位置的项替换，**第一个参数要替换项的位置，第二个替换项个数，第三个参数以后新的项**

`splice()`**会直接改变原数组**

```js
let arr = [1, 2, 3, 4, 5];
arr.splice(0, 1);
console.log(arr); // [ 2, 3, 4, 5 ]
arr.splice(1, 0, 'hello', 'world');
console.log(arr); // [ 2, 'hello', 'world', 3, 4, 5 ]
arr.splice(3, 1, 'js');
console.log(arr); // [ 2, 'hello', 'world', 'js', 4, 5 ]
```

## 9. 位置方法

### `indexOf()`

`indexOf()`方法从头开始查找指定项，找到返回对应数组下标，没找到返回 -1

参数：item(要查找的数组项),index(指定开始查找的位置，可选)

```js
let arr = [1, 2, 3, 4, 5];
console.log(arr.indexOf(3)); // 2
console.log(arr.indexOf(3, 3)); // -1
```

### `lastIndexOf()`

**`lastIndexOf()`方法用法和 `indexOf`基本一致，只是从数组尾部开始查找**

## 10. 迭代方法

### `every()`

**`every()`方法对数组中每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true**

参数：callback(item, index, arr)

```js
let arr = [3, 4, 5, 6];
let result = arr.every((item) => item > 2);
console.log(result); // true
```

### `some()`

**`some()`方法对数组中任意一项运行给定函数，如果该函数对任意一项返回 true，则返回 true**

参数：callback(item, index, arr)

```js
let arr = [1, 2, 3, 4];
let result = arr.some((item) => item > 3);
console.log(result); // true
```

### `map()`

`map()`方法对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组，**不改变原数组**

参数：callback(item, index, arr)

```js
let arr = [1, 2, 3];
let result = arr.map((item) => item * 2);
console.log(result); // [ 2, 4, 6 ]
```

### `filter()`

`filter()`方法对数组中的每一项运行给定函数，返回该函数调用会返回 true 的项组成的数组，**不改变原数组**

参数：callback(item, index, arr)

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.filter((item) => item > 2);
console.log(result); // [3, 4, 5]
```

### `forEach()`

`forEach()`方法对数组中的每一项都运行给定函数，**没有返回值**，**不改变原数组**

参数：callback(item, index, arr)

```js
let arr = [1, 2, 3, 4, 5];
arr.forEach((item) => {
  console.log(item); // 1 2 3 4 5
});
```

## 11. 缩小方法

**`reduce()`方法对数组中的每一项执行一个 reducer 函数(升序执行)，并将结果汇总为单个返回值**

```coffeescript
参数：callback(
		accumulator, // 累计器累计回调的返回值
		currentValue, // 数组中正在处理的元素
		currentIndex, // 数组中正在处理的元素的索引，如果提供了initialValue，则起始索引号为0，否则为1，可选
		array // 调用reducer的数组
	),initialValue // 作为第一次调用callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错，可选

```

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((accumulator, current, index, array) => {
  return accumulator + current;
});
console.log(result); // 15 1+2+3+4+5

let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((accumulator, current, index, array) => {
  return accumulator + current;
}, 10);
console.log(result); // 25 10+1+2+3+4+5
```

**`reduceRight()`方法用法与 `reduce()`方法一致，只是 redeceRight()方法调用从数组尾部开始，向前遍历**

参考**高阶函数**内容

## 12. ES6 新增方法

- **1、`from()`方法将类似数组的对象和可遍历的对象转化为数组**

参数：arrayLike(想要转换成数组的伪数组对象或可迭代对象)，mapFn(如果指定了该参数，新组数中的每个元素会执行此回调函数，可选)，thisArg(执行回调函数时 this 对象，可选)

```js
let arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};
console.log(Array.from(arrayLike)); // [1, 2, 3]

let arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};
console.log(Array.from(arrayLike, (item) => item * 2)); // [2, 4, 6]
```

在实际应用中更多应用于 Dom 操作返回的集合以及函数内部的 arguments 对象

- **2、`of()`方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型**

参数：item...(任意个参数，将按顺序返回数组中的元素)

```js
let result = Array.of(2, 3, 4);
console.log(result); // [ 2, 3, 4 ]
```

- **3、`copyWithin()`方法，在当前数组内部，将指定位置的成员复制到其他位置(会覆盖原有位置成员)，返回当前数组**

参数：target(从该位置开始替换数据)，start(从该位置开始读取数据，默认为 0，如果为负值表示倒数，可选)，end(到该位置前，停止读取数据，默认为数组长度，如果为负值，表示倒数)

```js
let arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3, 5);
console.log(arr); // [ 4, 5, 3, 4, 5 ]
```

- **4、`find()`方法用于找出第一个符合条件的数组成员，若没有符合条件的，返回 undefined**

参数：callback(item, index, arr)

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.find((item) => item > 3);
console.log(result); // 4
```

- **5、`findIndex()`方法用法与 `find()`方法相似，返回第一个符合条件的成员的位置，若没有符合条件的，返回-1**
- **6、`fill()`方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引**

参数：value(填充数组元素的值)，start(起始索引，可选)，end(终止索引，可选)

```js
let arr = [1, 2, 3, 4, 5];
arr.fill(6, 2, 5);
console.log(arr); // [ 1, 2, 6, 6, 6 ]
```

- **7、`entries()`、`keys()`、`values()` , 三个数组遍历方法，返回一个遍历器对象，`entries()`键值对的遍历，`keys()`键名的遍历，`values()`键值的遍历**

参数：无

```js
let arr = ['a', 'b', 'c'];
for (let idx of arr.keys()) {
  console.log(idx); // 0 1 2
}
for (let item of arr.values()) {
  console.log(item); // 'a' 'b' 'c'
}
for (let [idx, item] of arr.entries()) {
  console.log(idx + '---' + item); // '0---a' '1---b' '2---c'
}
```

- **8、`includes()`方法用来判断一个数组是否包含一个指定的值，如果包含返回 true，否则返回 false**

参数：value(要查找的元素)，start(开始查找的位置，可选)

```js
let arr = ['a', 'b', 'c'];
console.log(arr.includes('a')); // true
console.log(arr.includes('d')); // false
```

- **9、`flat()`方法会按照一个指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素和并到一个新数组中返回**

参数：depth(要提取数组的嵌套结构深度，默认为 1，可选)

```js
let arr = ['a', 'b', ['c', 'd']];
let result = arr.flat(); // ["a", "b", "c", "d"]
let arr1 = ['a', ['b', ['c']]];
//使用 Infinity 作为深度，展开任意深度的嵌套数组
let result1 = arr1.flat(Infinity); // ["a", "b", "c"]
```

## 13. 类型化数组

### 数字存储的前置知识

- 计算机必须使用固定的位数来存储数字，无论存储的数字是大是小，在内存中占用的空间是固定的。

- n 位的无符号整数能表示的数字是`2^n`个，取值范围是：`0 ~ 2^n - 1`

- n 位的有符号整数能表示的数字是`2^n`个，取值范围是：`-2^(n-1) ~ 2^(n-1) - 1`

- 浮点数表示法可以用于表示整数和小数，目前分为两种标准：

  - 32 位浮点数：又称为单精度浮点数，它用 1 位表示符号，8 位表示阶码，23 位表示尾数
  - 64 位浮点数：又称为双精度浮点数，它用 1 位表示符号，11 位表示阶码，52 位表示尾数

- JS 中的所有数字，均使用双精度浮点数保存

### 类型化数组

类型化数组：用于优化多个数字的存储

- `Int8Array`: 8 位有符号整数（-128 ~ 127）
- `Uint8Array`: 8 位无符号整数（0 ~ 255）
- `Int16Array`: ...
- `Uint16Array`: ...
- `Int32Array`: ...
- `Uint32Array`: ...
- `Float32Array`:
- `Float64Array`

#### 如何创建数组

```js
let arr = new Int8Array(8); // 创建一个长度为8的数组

let arr = Int8Array.of(1, 2, 3); // 创建一个包含1,2,3的数组

let arr = Int8Array.from([1, 2, 3]); // 创建一个包含1,2,3的数组

let arr1 = new Int8Array(arr); // arr1 !== arr 转化得注意精度
```

#### 数组成员

- 类型化数组成员，均以 0 开头
- 类型化数组成员，均以 0 结尾
- 类型化数组成员，均以 0 开头，0 结尾

```js
let arr = new Int8Array(8);
```

#### 获取数组长度

```js
let arr = new Int32Array(10);
console.log(arr.length); // 得到元素数量 10
console.log(arr.byteLength); // 得到占用的字节数 40
```

#### 操作

其他的用法跟普通数组一致，但是：

- 不能增加和删除数据，类型化数组的长度固定
- 一些返回数组的方法，返回的数组是同类型化的新数组

## 14. ArrayBuffer

`ArrayBuffer`：一个对象，用于存储一块固定内存大小的数据。

```js
new ArrayBuffer(字节数);

const bf = new ArrayBuffer(8); // 创建一个长度为8字节的ArrayBuffer

const bf2 = bf.slice(3, 5);

console.log(bf, bf2);
```

可以通过属性`byteLength`得到字节数，可以通过方法`slice`得到新的 ArrayBuffer

### 读写 ArrayBuffer

#### 使用`DataView`

通常会在需要混用多种存储格式时使用 `DataView`

```js
//创建了一个用于存储10个字节的内存空间
const bf = new ArrayBuffer(10);

const view = new DataView(bf, 3, 4);

// console.log(view);

view.setInt16(1, 3);
console.log(view);

console.log(view.getInt16(1));
```

#### 使用类型化数组

每一个类型化数组都对应一个 ArrayBuffer，如果没有手动指定 ArrayBuffer，类型化数组创建时，会新建一个 ArrayBuffer

```js
const bf = new ArrayBuffer(10); //10个字节的内存

const arr1 = new Int8Array(bf);
const arr2 = new Int16Array(bf);
console.log(arr1 === arr2);
console.log(arr1.buffer === arr2.buffer);

arr1[0] = 10;

console.log(arr1);
console.log(arr2);
```

```js
const bf = new ArrayBuffer(10); //10个字节的内存
const arr = new Int16Array(bf);
arr[0] = 2344; //操作了两个字节
console.log(arr);
```

对于`ArrayBuffer`的运用案例，参考[自定义组件中的制作黑白图片](http://localhost:8000/#/myComponents/自定义组件/图片处理)
