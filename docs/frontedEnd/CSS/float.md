---
title: 浮动
order: 5
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

# 浮动

## 什么是浮动

### 浮动出现的背景

浮动属性产生之初是为了实现“文字环绕”的效果，让文字环绕图片，从而使网页实现类似 word 中“图文混排”的效果。

### 浮动实现布局

到了后面，浮动渐渐被应用到了页面布局上。因为 HTML 里面的元素，要么是行内元素，要么是块级元素，这种方式是没办法做页面布局的，例如我想实现两个块级元素在一行。此时开发人员就想到了浮动，因为任何东西都可以浮动，而不仅仅是图像，所以浮动的使用范围扩大了，能够用来进行布局。

### 浮动的特性

#### 脱离标准流

```html
<div class="one"></div>
<div class="two"></div>
```

```css
.one {
  float: left;
  width: 80px;
  height: 80px;
  background-color: red;
}

.two {
  width: 150px;
  height: 150px;
  background-color: blue;
}
/* 由于红色的 div 浮动脱离了标准流，所以蓝色的 div 自然而然就往上走了。 */
```

#### 浮动的元素互相贴靠

如果有多个浮动的元素，那么会相互贴靠，如果宽度不足以让后面的盒子贴靠，那么后面浮动的元素会被排列到下一行。

#### 宽度收缩

在没有设置宽度的情况下，块级元素在标准流时很多时独占一行，宽度也会占满整个容器，但是一旦被设置为浮动后，宽度就会收缩。

## 清除浮动

### 为什么要清除浮动

浮动元素会脱离文档流，导致父元素塌陷。

举个例子：一个橡皮筋绑了 10 根筷子，此时橡皮筋就被撑开；当把筷子从橡皮筋中拿出来时，橡皮筋就变回原样。这样当话，父元素中如果有背景图片或是其他样式，就会受到影响。

### 清除浮动的方法

#### 1. 给父元素设置固定的高度

#### 2. clear 属性

给元素样式设置`clear:both` `clear` 属性可以设置为：left、right、both、none。 left 表示清除左浮动，right 表示清除右浮动，both 表示清除左右浮动，none 表示不清除浮动。

```html
<ul>
  <li>导航1</li>
  <li>导航2</li>
  <li>导航3</li>
</ul>
<ul class="two">
  <li>游戏</li>
  <li>动漫</li>
  <li>音乐</li>
</ul>
<style>
  .two {
    clear: left;
  }
  li {
    float: left;
    width: 100px;
    height: 20px;
    background-color: pink;
  }
</style>
```

#### 3. 隔墙法

在两个浮动的元素之间添加一个块级元素，然后将其样式设置`clear:both`

```html
<ul>
  <li>导航1</li>
  <li>导航2</li>
  <li>导航3</li>
</ul>
<div class="clearfix"></div>
<ul class="two">
  <li>游戏</li>
  <li>动漫</li>
  <li>音乐</li>
</ul>
<style>
  .two {
    margin-top: 10px;
  }

  .clearfix {
    clear: both;
  }

  li {
    float: left;
    width: 100px;
    height: 20px;
    background-color: pink;
  }
</style>
```

#### 4. 内墙法

正常情况下，没有高的父元素，里面的子元素一旦浮动，高度也就没有了。

内墙法可以让浮动的元素也能撑开父元素的高。

```html
<div>
  <ul>
    <li>导航1</li>
    <li>导航2</li>
    <li>导航3</li>
  </ul>
  <div class="clearfix"></div>
</div>
<ul class="two">
  <li>游戏</li>
  <li>动漫</li>
  <li>音乐</li>
</ul>

<style>
  .two {
    margin-top: 10px;
  }

  .clearfix {
    clear: both;
  }

  li {
    float: left;
    width: 100px;
    height: 20px;
    background-color: pink;
  }
</style>
```

#### 5.伪元素清除浮动

和第 3 种方法一样，只是第 3 种方法会添加一个冗余元素；使用：after 在浮动元素的父容器后添加一个看不见的块级元素，设置为 clear：both；

```html
<ul class="one">
  <li>导航1</li>
  <li>导航2</li>
  <li>导航3</li>
</ul>
<ul class="two">
  <li>游戏</li>
  <li>动漫</li>
  <li>音乐</li>
</ul>
<style>
  .two {
    margin-top: 10px;
  }

  .one::after {
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
    content: '';
  }

  li {
    float: left;
    width: 100px;
    height: 20px;
    background-color: pink;
  }
</style>
```

#### 6.利用 BFC

`overflow` 属性本来是用作处理溢出内容的显示方式的。

当给父元素添加 `overflow:hidden` 之后，父元素就会形成一个 `BFC`，一块独立的显示区域，不受外界影响，所以通过这种方式也能够去除浮动的副作用。

```html
<ul>
  <li>导航1</li>
  <li>导航2</li>
  <li>导航3</li>
</ul>
<ul class="two">
  <li>游戏</li>
  <li>动漫</li>
  <li>音乐</li>
</ul>
<style>
  .two {
    margin-top: 10px;
  }

  ul {
    overflow: hidden;
  }

  li {
    float: left;
    width: 100px;
    height: 20px;
    background-color: pink;
  }
  /* 我们设置两个父元素 ul 都为 overflow:hidden 之后，两个父元素形成了 BFC，
  我们可以看到父元素的高度也被撑开了，margin 也是正常的。 */
</style>
```

#### 7 标签清除浮动

`br`标签清除浮动 br 标签有一个 clear 属性，设置为 all 可以清除浮动
