---
title: 事件
order: 21
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

# 事件

## DOM 事件的注册和移除

### _DOM_ 注册事件

使用 _JavaScript_ 为 _DOM_ 元素注册事件的方式有多种。但是并不是一开始就设计了多种方式，而是随着技术的发展，发展前一种方式有所缺陷，所以设计了新的 _DOM_ 元素注册事件的方式。

这里我们就一起来总结一下 _DOM_ 中注册事件的方式有哪些。

#### _HTML_ 元素中注册事件

_HTML_ 元素中注册的事件，又被称之为行内事件监听器。这是在浏览器中处理事件最原始的方法。

具体的示例如下：

```html
<button onclick="test('张三')">点击我</button>
```

```js
function test(name) {
  console.log(`我知道你已经点击了，${name}`);
}
```

在上面的代码中，我们为 _button_ 元素添加了 _onclick_ 属性，然后绑定了一个名为 _test_ 的事件处理器。

在 _JavaScript_ 中只需要书写对应的 _test_ 事件处理函数即可。

但是有一点需要注意，就是这种方法已经过时了，原因如下：

- _JavaScript_ 代码与 _HTML_ 标记混杂在一起，破坏了结构和行为分离的理念。
- 每个元素只能为每种事件类型绑定一个事件处理器。
- 事件处理器的代码隐藏于标记中，很难找到事件是在哪里声明的。

但是如果是做简单的事件测试，那么这种写法还是非常方便快捷的。

#### _DOM0_ 级方式注册事件

这种方式是首先取到要为其绑定事件的元素节点对象，然后给这些节点对象的事件处理属性赋值一个函数。

这样就可以达到 _JavaScript_ 代码和 _HTML_ 代码相分离的目的。

具体的示例如下：

```html
<button id="test">点击我</button>
```

```js
var test = document.getElementById('test');
test.onclick = function () {
  console.log('this is a test');
};
```

这种方式虽然相比 _HTML_ 元素中注册事件有所改进，但是它也有一个缺点，那就是它依然存在每个元素只能绑定一个函数的局限性。

下面我们尝试使用这种方式为同一个元素节点绑定 _2_ 个事件，如下：

```js
var test = document.getElementById('test');
test.onclick = function () {
  console.log('this is a test');
};
test.onclick = function () {
  console.log('this is a test,too');
};
```

当我们为该 _DOM_ 元素绑定 _2_ 个相同类型的事件时，后面的事件处理函数就会把前面的事件处理函数给覆盖掉。

#### _DOM2_ 级方式注册事件

_DOM2_ 级再次对事件的绑定方式进行了改进。

_DOM2_ 级通过 _addEventListener_ 方法来为一个 _DOM_ 元素添加多个事件处理函数。

该方法接收 _3_ 个参数：事件名、事件处理函数、布尔值。

如果这个布尔值为 _true_，则在捕获阶段处理事件，如果为 _false_，则在冒泡阶段处理事件。若最后的布尔值不填写，则和 _false_ 效果一样，也就是说默认为 _false_，在冒泡阶段进行事件的处理。

接下来我们来看下面的示例：这里我们为 _button_ 元素绑定了 _2_ 个事件处理程序，并且 _2_ 个事件处理程序都是通过点击来触发。

```js
var test = document.getElementById('test');
test.addEventListener(
  'click',
  function () {
    console.log('this is a test');
  },
  false,
);
test.addEventListener(
  'click',
  function () {
    console.log('this is a test,too');
  },
  false,
);
```

在上面的代码中，我们通过 _addEventListener_ 为按钮绑定了 _2_ 个点击的事件处理程序，_2_ 个事件处理程序都会执行。

另外需要注意的是，在 _IE_ 中和 _addEventListener_ 方法与之对应的是 _attachEvent_ 方法。

### _DOM_ 移除事件

通过 _DOM0_ 级来添加的事件，删除的方法很简单，只需要将 _DOM_ 元素的事件处理属性赋值为 _null_ 即可。

例如：

```js
var test = document.getElementById('test');
test.onclick = function () {
  console.log('this is a test');
  test.onclick = null;
};
```

在上面的代码中，我们通过 _DOM0_ 级的方式为 _button_ 按钮绑定了点击事件，但是在事件处理函数中又移除了该事件。所以该事件只会生效一次。

如果是通过 _DOM2_ 级来添加的事件，我们可以使用 _removeEventLister_ 方法来进行事件的删除。

需要注意的是，如果要通过该方法移除**某一类事件类型的一个事件**的话，在通过 _addEventListener_ 来绑定事件时的写法就要稍作改变。

先单独将绑定函数写好，然后 _addEventListener_ 进行绑定时第 _2_ 个参数传入要绑定的函数名即可。

示例如下：

```js
var test = document.getElementById('test');
//DOM 2级添加事件
function fn1() {
  console.log('this is a test');
  test.removeEventListener('click', fn1); // 只删除第一个点击事件
}
function fn2() {
  console.log('this is a test,too');
}
test.addEventListener('click', fn1, false);
test.addEventListener('click', fn2, false);
```

在上面的代码中，我们为 _button_ 元素绑定了两个 _click_ 事件，之后在第一个事件处理函数中，对 _fn1_ 事件处理函数进行了移除。所以第一次点击时，_fn1_ 和 _fn2_ 都会起作用，之后因为 _fn1_ 被移除，所以只会 _fn2_ 有作用。

### 真题解答

- 总结一下 _DOM_ 中如何注册事件和移除事件

> 参考答案：
>
> 注册事件的方式常见的有 _3_ 种方式：
>
> - _HTML_ 元素中注册的事件：这种方式又被称之为行内事件监听器。这是在浏览器中处理事件最原始的方法。
>
> - _DOM0_ 级方式注册事件：这种方式是首先取到要为其绑定事件的元素节点对象，然后给这些节点对象的事件处理属性赋值一个函数。
>
> - _DOM2_ 级方式注册事件：_DOM2_ 级通过 _addEventListener_ 方法来为一个 _DOM_ 元素添加多个事件处理函数。
>
>   该方法接收 _3_ 个参数：事件名、事件处理函数、布尔值。
>
>   如果这个布尔值为 _true_，则在捕获阶段处理事件，如果为 _false_，则在冒泡阶段处理事件。若最后的布尔值不填写，则和 _false_ 效果一样，也就是说默认为 _false_，在冒泡阶段进行事件的处理。
>
> 关于移除注册的事件，如果是 _DOM0_ 级方式注册的事件，直接将值设置为 _null_ 即可。如果是 _DOM2_ 级注册的事件，可以使用 _removeEventListener_ 方法来移除事件。

## _DOM_ 事件的传播机制

### 事件与事件流

事件最早是在 _IE3_ 和 _NetscapeNavigator2_ 中出现的，当时是作为分担服务器运算负担的一种手段。

要实现和网页的互动，就需要通过 _JavaScript_ 里面的事件来实现。

每次用户与一个网页进行交互，例如点击链接，按下一个按键或者移动鼠标时，就会触发一个事件。我们的程序可以检测这些事件，然后对此作出响应。从而形成一种交互。

这样可以使我们的页面变得更加的有意思，而不仅仅像以前一样只能进行浏览。

在早期拨号上网的年代，如果所有的功能都放在服务器端进行处理的话，效率是非常低的。

所以 _JavaScript_ 最初被设计出来就是用来解决这些问题的。通过允许一些功能在客户端处理，以节省到服务器的往返时间。

_JavaScript_ 中采用一个叫做事件监听器的东西来监听事件是否发生。这个事件监听器类似于一个通知，当事件发生时，事件监听器会让我们知道，然后程序就可以做出相应的响应。

通过这种方式，就可以避免让程序不断地去检查事件是否发生，让程序在等待事件发生的同时，可以继续做其他的任务。

#### 事件流

当浏览器发展到第 _4_ 代时（_IE4_ 及 _Netscape4_），浏览器开发团队遇到了一个很有意思的问题：页面的哪一部分会拥有某个特定的事件？

想象在一张纸上的一组同心圆。如果把手指放在圆心上，那么手指指向的不是一个圆，而是纸上的所有圆。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-094941.png" alt="image-20211002174941387" style="zoom: 33%;" />

好在两家公司的浏览器开发团队在看待浏览器事件方面还是一致的。

如果单击了某个按钮，他们都认为单击事件不仅仅发生在按钮上，甚至也单击了整个页面。

但有意思的是，_IE_ 和 _Netscape_ 开发团队居然提出了差不多是完全相反的事件流的概念。

_IE_ 的事件流是事件冒泡流，而 _Netscape_ 的事件流是事件捕获流。

#### 事件冒泡流

_IE_ 的事件流叫做事件冒泡（_event bubbling_），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

以下列 _HTML_ 结构为例，来说明事件冒泡。如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

如果单击了页面中的 _div_ 元素，那么这个 _click_ 事件沿 _DOM_ 树向上传播，在每一级节点上都会发生，按照如下顺序进行传播：

1. _div_
2. _body_
3. _html_
4. _document_

所有现代浏览器都支持事件冒泡，但在具体实现在还是有一些差别。

_IE9、Firefox、Chrome、Safari_ 将事件一直冒泡到 _window_ 对象。

我们可以通过下面的代码，来查看文档具体的冒泡顺序，示例如下：

```html
<div id="box" style="height:100px;width:300px;background-color:pink;"></div>
<button id="reset">还原</button>
```

```js
// IE8 以下浏览器返回 div body html document
// 其他浏览器返回 div body html document window
reset.onclick = function () {
  history.go();
};
box.onclick = function () {
  box.innerHTML += 'div\n';
};
document.body.onclick = function () {
  box.innerHTML += 'body\n';
};
document.documentElement.onclick = function () {
  box.innerHTML += 'html\n';
};
document.onclick = function () {
  box.innerHTML += 'document\n';
};
window.onclick = function () {
  box.innerHTML += 'window\n';
};
```

在上面的示例中，我们为 _div_ 以及它的祖先元素绑定了点击事件，由于事件冒泡的存在，当我们点击 _div_ 时，所有祖先元素的点击事件也会被触发。

如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-092307.png" alt="image-20211002172307085" style="zoom:50%;" />

#### 事件捕获流

_Netscape Communicator_ 团队提出的另一种事件流叫做事件捕获（_event captruing_）。

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。

事件捕获的思想是在事件到达预定目标之前就捕获它。

以同样的 _HTML_ 结构为例来说明事件捕获，如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

在事件捕获过程中，_document_ 对象首先接收到 _click_ 事件，然后事件沿 _DOM_ 树依次向下，一直传播到事件的实际目标，即 _div_ 元素：

1. _document_
2. _html_
3. _body_
4. _div_

_IE9、Firefox、Chrome、Safari_ 等现代浏览器都支持事件捕获，但是也是从 _window_ 对象开始捕获。

下面我们来演示一个事件捕获流的示例：

```html
<div id="box" style="height:100px;width:300px;background-color:pink;"></div>
<button id="reset">还原</button>
```

```js
// IE8 以下浏览器不支持
// 其他浏览器返回 window document html body div
reset.onclick = function () {
  history.go();
};
box.addEventListener(
  'click',
  function () {
    box.innerHTML += 'div\n';
  },
  true,
);
document.body.addEventListener(
  'click',
  function () {
    box.innerHTML += 'body\n';
  },
  true,
);
document.documentElement.addEventListener(
  'click',
  function () {
    box.innerHTML += 'html\n';
  },
  true,
);
document.addEventListener(
  'click',
  function () {
    box.innerHTML += 'document\n';
  },
  true,
);
window.addEventListener(
  'click',
  function () {
    box.innerHTML += 'window\n';
  },
  true,
);
```

在上面的示例中，我们为 _div_ 以及它所有的祖先元素绑定了点击事件，使用的 _addEventListener_ 的方式来绑定的事件，并将第 _2_ 个参数设置为了 _true_ 表示使用事件捕获的方式来触发事件。

效果如下图所示：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-093549.png" alt="image-20211002173549252" style="zoom:50%;" />

#### 标准 _DOM_ 事件流

_DOM_ 标准采用的是**捕获 + 冒泡**的方式。

两种事件流都会触发 _DOM_ 的所有对象，从 _document_ 对象开始，也在 _document_ 对象结束。

换句话说，起点和终点都是 _document_ 对象（很多浏览器可以一直捕获 + 冒泡到 _window_ 对象）

_DOM_ 事件流示意图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-10-02-094149.png" alt="image-20211002174148423" style="zoom:50%;" />

_DOM_ 标准规定事件流包括三个阶段：**事件捕获阶段**、**处于目标阶段**和**事件冒泡阶段**。

- **事件捕获阶段：**实际目标 _div_ 在捕获阶段不会触发事件。捕获阶段从 _window_ 开始，然后到 _document、html_，最后到 _body_ 意味着捕获阶段结束。

- **处于目标阶段：**事件在 _div_ 上发生并处理，但是本次事件处理会被看成是冒泡阶段的一部分。

- **冒泡阶段：**事件又传播回文档。

### 事件委托

上面介绍了事件冒泡流，事件冒泡一个最大的好处就是可以实现事件委托。

事件委托，又被称之为事件代理。在 _JavaScript_ 中，添加到页面上的事件处理程序数量将直接关系到页面整体的运行性能。导致这一问题的原因是多方面的。

首先，每个函数都是对象，都会占用内存。内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的 _DOM_ 访问次数，会延迟整个页面的交互就绪时间。

对事件处理程序过多问题的解决方案就是事件委托。

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

例如，_click_ 事件会一直冒泡到 _document_ 层次。也就是说，我们可以为整个页面指定一个 _onclick_ 事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。

举一个具体的例子，例如现在我的列表项有如下内容：

```html
<ul id="color-list">
  <li>red</li>
  <li>yellow</li>
  <li>blue</li>
  <li>green</li>
  <li>black</li>
  <li>white</li>
</ul>
```

如果我们想把事件监听器绑定到所有的 _li_ 元素上面，这样它们被单击的时候就弹出一些文字，为此我们需要给每一个元素来绑定一个事件监听器。

虽然上面的例子中好像问题也不大，但是想象一下如果这个列表有 _100_ 个元素，那我们就需要添加 _100_ 个事件监听器，这个工作量还是很恐怖的。

这个时候我们就可以利用事件代理来帮助我们解决这个问题。

将事件监听器绑定到父元素 _ul_ 上，这样即可对所有的 _li_ 元素添加事件，如下：

```js
var colorList = document.getElementById('color-list');
colorList.addEventListener('click', function () {
  alert('Hello');
});
```

现在我们单击列表中的任何一个 _li_ 都会弹出东西，就好像这些 _li_ 元素就是 _click_ 事件的目标一样。

并且如果我们之后再为这个 _ul_ 添加新的 _li_ 元素的话，新的 _li_ 元素也会自动添加上相同的事件。

但是，这个时候也存在一个问题，虽然我们使用事件代理避免了为每一个 _li_ 元素添加相同的事件，但是如果用户没有点击 _li_，而是点击的 _ul_，同样也会触发事件。

这也很正常，因为我们事件就是绑定在 _ul_ 上面的。

此时我们可以对点击的节点进行一个小小的判断，从而保证用户只在点击 _li_ 的时候才触发事件，如下：

```js
var colorList = document.getElementById('color-list');
colorList.addEventListener('click', function (event) {
  if (event.target.nodeName === 'LI') {
    alert('点击 li');
  }
});
```

### 真题解答

- 谈一谈事件委托以及冒泡原理

> 参考答案：
>
> 事件委托，又被称之为事件代理。在 _JavaScript_ 中，添加到页面上的事件处理程序数量将直接关系到页面整体的运行性能。导致这一问题的原因是多方面的。
>
> 首先，每个函数都是对象，都会占用内存。内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的 _DOM_ 访问次数，会延迟整个页面的交互就绪时间。
>
> 对事件处理程序过多问题的解决方案就是事件委托。
>
> 事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如，_click_ 事件会一直冒泡到 _document_ 层次。也就是说，我们可以为整个页面指定一个 _onclick_ 事件处理程序，而不必给每个可单击的元素分别添加事件处理程序。
>
> 事件冒泡（_event bubbling_），是指事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

## 阻止事件默认行为

### 什么是默认行为

所谓默认行为，一般是指 _HTML_ 元素所自带的行为。例如点击一个 _a_ 元素表示的是跳转：

```html
<a href="https://www.baidu.com">百度一下</a>
```

在上面的代码中，设置了 _a_ 元素的 _href_ 属性指向百度，当用户点击该 _a_ 元素时，就会跳转至百度。

在例如：

```html
<form action=""></form>
```

上面的代码中我们书写了一个 _form_ 元素，该元素有一个 _action_ 属性，指的是表单内容要提交的地址。而当用户点击表单元素中嵌套的提交按钮时，就会进行一个默认的提交操作。

这些，就是 _HTML_ 元素中的默认行为。

但是有些时候，我们是不需要这些默认行为的，例如，用户在填写了一个表单后，提交信息时我们采用 _ajax_ 来异步发送到服务器，此时就不需要表单 _form_ 元素默认的提交跳转这个行为了。

所以此时，我们就需要阻止默认行为。

### 阻止默认行为的方式汇总

下面我们来对阻止默认行为的方式进行一个总结。

**（1）_cancelable_ 属性**

首先要介绍的是 _cancelable_ 属性，该属性返回一个布尔值，表示事件是否可以取消。

该属性为只读属性。返回 _true_ 时，表示可以取消。否则，表示不可取消。

```html
<a id="test" href="https://www.baidu.com">百度</a>
```

```js
var test = document.getElementById('test');
test.onclick = function (event) {
  test.innerHTML = event.cancelable; // true
};
```

在上面的代码中，我们为 _a_ 元素绑定了一个点击事件，点击之后通过 _event_ 对象的 _cancelable_ 属性来查看该元素的默认行为是否能阻止。

最终返回的是 _true_，说明是能够阻止的。

**（2）_preventDefault_ 方法**

_preventDefault_ 方法是 _DOM_ 中最常见，也是最标准的取消浏览器默认行为的方式，无返回值。

```js
var test = document.getElementById('test');
test.onclick = function (event) {
  event.preventDefault();
};
```

在上面的代码中，我们仍然是通过 _event_ 对象来调用的 _preventDefault_ 方法，从而阻止了 _a_ 元素的默认跳转行为。

**（3）_returnValue_ 属性**

这种方式使用的人比较少，知道这种方式的人也比较少。

首先 _returnValue_ 是一个 _event_ 对象上面的属性。该属性可读可写，默认值是 _true_，将其设置为 _false_ 就可以取消事件的默认行为，与 _preventDefault_ 方法的作用相同。

该属性最早是在 _IE_ 的事件对象中，实现了这种取消默认行为的方式，但是现在大多数浏览器都实现了该方式。

```js
var test = document.getElementById('test');
test.onclick = function (event) {
  event.returnValue = false;
};
```

**（4）_return false_**

_return false_ 是一条语句，该语句写在事件处理函数中也可以阻止默认行为。

但是需要注意的是，如果该条语句写在 _jQuery_ 代码中，能够同时阻止默认行为和阻止冒泡，但是在原生 _JavaScript_ 中只能阻止默认行为。

```js
var test = document.getElementById('test');
test.onclick = function () {
  return false;
};
```

**（5）_defaultPrevented_ 方法**

_defaultPrevented_ 属性也是 _event_ 对象上面的一个属性。该属性表示默认行为是否被阻止，返回 _true_ 表示被阻止，返回 _false_ 表示未被阻止。

```js
var test = document.getElementById('test');
test.onclick = function (event) {
  // 采用两种不同的方式来阻止浏览器默认行为，这是为了照顾其兼容性
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
  // 将是否阻止默认行为的结果赋值给 <a> 标签的文本内容
  test.innerHTML = event.defaultPrevented;
};
```

在上面的代码中，我们点击 _a_ 元素时，使用 _preventDefault_ 方法阻止了浏览器默认行为。

之后访问 _event.defaultPrevented_ 属性会得到 _true_，说明默认行为已经被阻止。

### 真题解答

- 如何阻止默认事件？

> 参考答案：
>
> ```js
> // 方法一：全支持
> event.preventDefault();
> // 方法二：该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
> event.returnValue = false;
> // 方法三：不建议滥用，jQuery 中可以同时阻止冒泡和默认事件
> return false;
> ```
