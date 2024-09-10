---
title: BFC
order: 9
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /css
  title: CSS
  order: 2
---

# `BFC` 块级格式化上下文(Block formatting context)

## 什么是`BFC`

简单来说，就是页面中的一块渲染区域，并且有一套属于自己的渲染规则，它决定了元素如何对齐内容进行布局，以及与其他元素的关系和相互作用。 当涉及到可视化布局的时候，`BFC` 提供了一个环境，`HTML`元素在这个环境中按照一定规则进行布局。

再简短一点，那就是：**`BFC` 是一个独立的布局环境，`BFC` 内部的元素布局与外部互不影响**

这就好比你在你自己家里面，你想怎么摆放你的家具都可以，你家的家具布局并不会影响邻居家的家具布局。

## `BFC` 的布局规则

- 内部的 Box 会在垂直方向一个接着一个地放置
- Box 垂直方向上的距离由 margin 决定。属于同一个 `BFC` 的两个相邻的 Box 的 margin 会发生重叠
- 每个盒子的左外边框紧挨着包含块的左边框，即使浮动元素也是如此
- `BFC` 的区域不会与浮动 Box 重叠
- `BFC` 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- 计算 `BFC` 的高度时，浮动子元素也参与计算

实际上在一个标准流中 `body` 元素就是一个天然的 `BFC`

## 如何创建 `BFC`

- 根元素
- 浮动元素：`float` 除 `none` 以外的值(`left`, `right`)
- 绝对定位元素：`position` (`absolute`, `fixed`)
- `display` 为 `inline-block`, `table-cell`, `flex`, `inline-flex`
- `overflow` 除了 `visible` 以外的值 (`hidden`, `auto`, `scroll`)

[完整的`BFC`触发方式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)

## `BFC` 的应用

### 1.清除浮动

#### 1.1 解决浮动元素令父元素高度坍塌的问题

```html
<div class="father">
  <div class="son"></div>
</div>

<style>
  .father {
    border: 5px solid;
  }
  .son {
    float: left;
    width: 100px;
    height: 100px;
    background-color: blue;
  }
</style>
```

在上面的代码中，父元素的高度是靠子元素撑起来的，但是一旦我们给子元素设置了浮动，那么父元素的高度就塌陷了

此时我们就可以将父元素设置成一个 `BFC`

```html
<style>
  .father {
    overflow: hidden;
    border: 5px solid;
    /* 将父元素设置为一个 BFC */
  }
  .son {
    float: left;
    width: 100px;
    height: 100px;
    background-color: blue;
  }
</style>
<!-- 效果：可以看到由于父元素变成 BFC，高度并没有产生塌陷了，其原因是在计算 BFC 的高度时，浮动子元素也参与计算 -->
```

#### 1.2 非浮动元素被浮动元素覆盖

```html
<div class="box1"></div>
<div class="box2"></div>

<style>
  .box1 {
    float: left;
    width: 100px;
    height: 50px;
    background-color: red;
  }
  .box2 {
    width: 50px;
    height: 50px;
    background-color: blue;
  }
</style>
```

在上面的代码中，由于 `box1` 设置了浮动效果，所以会脱离标准流，自然而然 `box2` 会往上面跑，结果就被高度和自己一样的 `box1` 给挡住了。

接下来我们设置 `box2` 为 `BFC`

```html
<style>
  .box1 {
    float: left;
    width: 100px;
    height: 50px;
    background-color: red;
  }
  .box2 {
    width: 50px;
    height: 50px;
    overflow: hidden;
    background-color: blue;
  }
</style>
<!-- 效果：由于 BFC 的区域不会与浮动 box 重叠，所以即使 box1 因为浮动脱离了标准流，box2 也不会被 box1 遮挡,会贴着 box1 显示 -->
```

基于此特点，我们就可以制作两栏自适应布局，方法就是给固定栏设置固定宽度，给不固定栏开启 `BFC`。

```html
<div class="left">导航栏</div>
<div class="right">这是右侧</div>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .left {
    float: left;
    width: 200px;
    height: 100vh;
    background-color: skyblue;
  }

  .right {
    width: calc(100% - 200px);
    height: 100vh;
    background-color: yellowgreen;
  }
</style>
```

效果：在上面的代码中，我们要设置两栏布局，左边栏宽度固定，右边栏自适应。结果我们发现右侧出现了空白

究其原因就是右侧区域与浮动盒子重叠

修改 `.right` 部分的代码，添加 `overflow:hidden` 使其成为一个 `BFC`

```html
<style>
  .right {
    width: calc(100% - 200px);
    height: 100vh;
    overflow: hidden;
    background-color: yellowgreen;
  }
</style>
```

### 2.防止垂直 margin 重叠

```html
<div class="box1"></div>
<div class="box2"></div>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .box1 {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    background-color: red;
  }
  .box2 {
    width: 100px;
    height: 100px;
    margin-top: 10px;
    background-color: blue;
  }
  /* 此时box1和box2之间的间距会重叠，只有10px */
</style>
```

此时我们可以在 box2 外部再包含一个 div，并且将这个 div 设置为 BFC

```html
<div class="box1"></div>
<div class="container">
  <div class="box2"></div>
</div>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  .box1 {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    background-color: red;
  }
  .box2 {
    width: 100px;
    height: 100px;
    margin-top: 10px;
    background-color: blue;
  }
  .container {
    overflow: hidden;
  }
</style>
```

## 其他

- [`BFC`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Block_formatting_context) (Block formatting context)：“块级格式化上下文” ，指的是一个独立的布局环境，BFC 内部的元素布局与外部互不影响
- [`IFC`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Inline_formatting_context)（Inline formatting context）：“行内格式化上下文”，也就是一块区域以行内元素的形式来格式化
- [`GFC`]()（GrideLayout formatting contexts）：“网格布局格式化上下文”，将一块区域以 grid 网格的形式来格式化
- [`FFC`]()（Flex formatting contexts）：“弹性格式化上下文“，将一块区域以弹性盒的形式来格式化
