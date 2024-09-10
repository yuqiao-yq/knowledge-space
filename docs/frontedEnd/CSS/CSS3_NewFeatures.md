---
title: CSS3新特性
order: 3
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /css
  title: CSS
  order: 1
---

## CSS3 现状

- 新增的 CSS3 特性有兼容问题，ie9+ 才支持
- 移动端支持优于 PC 端
- 不断改进中
- 应用相对广泛

## CSS3 新增选择器

### 属性选择器

| 选择符      |                    简介                    |
| :---------- | :----------------------------------------: |
| `E[A]`      |          选择具有`A`属性的`E`元素          |
| `E[A="v"]`  |  选择具有`A`属性,且属性值`等于v`的`E`元素  |
| `E[A^="v"]` | 匹配具有`A`属性,且属性值以`v开头`的`E`元素 |
| `E[A$="v"]` | 匹配具有`A`属性,且属性值以`v结尾`的`E`元素 |
| `E[A*="v"]` | 匹配具有`A`属性,且属性值中`含有v`的`E`元素 |

```html
<style>
  /* 属性选择器使用方法 */
  /* 选择的是：  既是button 又有 disabled 这个属性的元素 */
  /* 属性选择器的权重是 10 */
  /* 1.直接写属性 */

  button[disabled] {
    cursor: default;
  }

  button {
    cursor: pointer;
  }
  /* 2. 属性等于值 */

  input[type='search'] {
    color: pink;
  }
  /* 3. 以某个值开头的 属性值 */

  div[class^='icon'] {
    color: red;
  }
  /* 4. 以某个值结尾的 */

  div[class$='icon'] {
    color: green;
  }
  /* 5. 可以在任意位置的 */

  div[class*='icon'] {
    color: blue;
  }
</style>

<button>按钮</button>
<button>按钮</button>
<button disabled="disabled">按钮</button>
<button disabled="disabled">按钮</button>

<input type="text" name="" id="" value="文本框" />
<input type="text" name="" id="" value="文本框" />
<input type="text" name="" id="" value="文本框" />
<input type="search" name="" id="" value="搜索框" />
<input type="search" name="" id="" value="搜索框" />
<input type="search" name="" id="" value="搜索框" />
<div class="icon1">图标1</div>
<div class="icon2">图标2</div>
<div class="icon3">图标3</div>
<div class="iicon3">图标4</div>
<div class="absicon">图标5</div>
```

### 结构伪类选择器

| 选择符             |             简介              |
| :----------------- | :---------------------------: |
| `E:first-child`    |  匹配父元素中第一个子元素`E`  |
| `E:last-child`     | 匹配父元素中最后一个子元素`E` |
| `E:nth-child(n)`   | 匹配父元素中第 n 个子元素`E`  |
| `E:first-of-type`  |      指定类型`E`的第一个      |
| `E:last-of-type`   |     指定类型`E`的最后一个     |
| `E:nth-of-type(n)` |     指定类型`E`的第 n 个      |

<!-- <Alert type="info"> -->

**`nth-child(n)`中的`n`** <br>

- n 可以是数字，从 1 开始；
- n 可以是关键字， `even`偶数，`odd`奇数；
- n 可以是公式，如下
  - 2n -- 偶数；
  - 2n + 1 -- 奇数；
  - 5n -- 5 的倍数，从 5 开始；
  - n + 5 -- 从第 5 个开始（包含第五个）；
  - -n - 5 --前 5 个（包含第五个）

<!-- </Alert> -->

#### `nth-child(n)`和`nth-of-type(n)`的区别

- `nth-child` 对父元素里所有的子元素排序选择。选出第 n 个，再看是否匹配`E`。
- `nth-of-type` 对父元素里面指定子元素进行排序选择。先去匹配`E`，再根据`E`去找第 n 个子元素。

### 伪元素选择器

伪元素在文档树(DOC Tree)中是找不到的 | 选择符 | 简介 | | :------- | :----------: | | `::before` | 在元素内容的前面插入内容 | | `::after` | 在元素内容的后面插入内容 |

`before` 和 `after` 属于行内元素；

`伪元素选择器`与`标签选择器`一样，权重为 1。

```css
/* 语法：  */
div::before {
  content: '', /* 不可缺少 */
  width: 20px;
  height: 20px;
  background-color: red;
}
```

#### 伪元素的特殊用法：清除浮动

- 额外标签法（隔墙法），W3C 推荐做法；
- 父级添加 overflow 属性
- 父级添加 after 伪元素
- 父级添加双伪元素

**额外标签法** <img src="./assets/额外标签法.png" />

这个新的空标签必须为块级元素

后面两种伪元素清除浮动算是第一种额外标签法的升级和优化

```css
/* 使用单冒号是为了兼容低版本浏览器，与双冒号效果一样 */
.clearfix:after {
  display: block; 伪元素必须写的属性 */

  clear: both; 心代码：清除浮动 */

  height: 0;  /* 插入的元素必须为块级
  visibility: hidden; 见这个元素 */
    v
  content: '';  /* 不要看见这个元素 */
}
```

## CSS3 盒子模型

CSS3 中可以通过 box-sizing 来指定盒模型，有两个值：`content-box`、`border-box`

- `box-sizing: content-box`: 盒子大小为 `width` + `padding` + `border`;
- `box-sizing: border-box`: 盒子大小为 `width`

## 滤镜 [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

## 计算 [`calc`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)

## 过渡 [`transition`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

## 2D 转换

旋转，缩放，倾斜或平移[`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)

平移变换[`translate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/translate)

<!-- <Alert type='warn'> -->

- `translate`不会影响到其他元素的位置
- `translate`中百分百单位是相对于自身元素的，`translate(50%, 50%)`
- 对行内标签没有效果 
<!-- </Alert> -->

## 动画 [`Animation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

## 3D 转换

### 3D 位移[`translate3d`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translate3d)

### 3D 旋转[`rotate3d`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate3d)

### 透视[`perspective`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

### 3D 呈现[`transform-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style)
