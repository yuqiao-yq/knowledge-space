---
title: 条件判断
order: 7
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

## `if`

JavaScript 使用 `if () { ... } else { ... }`来进行条件判断，其中 `else`语句是可选的。如果语句块只包含一条语句，那么可以省略 `{}`。

省略 `{}`的危险之处在于，如果后来想添加一些语句，却忘了写 `{}`，就改变了 `if...else...`的语义：

```js
var age = 20;
if (age >= 18)
    alert('adult');
else
    console.log('age < 18'); // 添加一行日志
    alert('teenager'); // <- 这行语句已经不在else的控制范围了
上述代码的else子句实际上只负责执行console.log('age < 18');原有的alert('teenager');已经不属于if...else...的控制范围了，它每次都会执行。
```

如果还要更细致地判断条件，可以使用多个 `if...else...`的组合

```js
var age = 3;
if (age >= 18) {
    alert('adult');
} else if (age >= 6) {
    alert('teenager');
} else {
    alert('kid');
}

上述多个if...else...的组合实际上相当于两层if...else...：
var age = 3;
if (age >= 18) {
    alert('adult');
} else {
    if (age >= 6) {
        alert('teenager');
    } else {
        alert('kid');
    }
}

但是我们通常把else if连写在一起，来增加可读性。这里的else略掉了{}是没有问题的，因为它只包含一个if语句。注意最后一个单独的else不要略掉{}。
请注意，if...else...语句的执行特点是二选一，在多个if...else...语句中，如果某个条件成立，则后续就不再继续判断了
```

## `switch`

switch 语句也是多分支语句，它用于基于不同的条件来执行不同的代码。当要针对变量设置一系列的特定值的选项时，就可以使用 switch。

```js
switch(表达式) {
    case value1:
        // 表达式 等于 value1 时要执行的代码
        break;
    case value2:
    case value3:
        // 表达式 等于 value2 、value3 时要执行的代码
        break;
    default:
        // 表达式 不等于任何一个 value 时要执行的代码
       }

/ switch效率比if else高，switch是直接找寻匹配的结果，不用一行行代码的去执行
```
