---
title: 媒体查询
order: 11
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

# 媒体查询

## 什么是`媒体查询`

媒体查询英文全称 Media Query，顾名思义就是会查询用户所使用的媒体或者媒介。

在现在，网页的浏览终端是越来越多了。用户可以通过不同的终端来浏览网页，例如：PC，平板电脑，手机，电视等。尽管我们无法保证一个网站在不同屏幕尺寸和不同设备上看起来一模一样，但是至少要让我们的 Web 页面能适配用户的终端。

在 `CSS3` 中的 `Media Query`（媒体查询）模块就是用来让一个页面适应不同的终端的。

## Media Type 设备类型

|       值       |                     设备类型                     |
| :------------: | :----------------------------------------------: |
|    **All**     |                     所有设备                     |
|  **Braille**   |             盲人用点字法触觉回馈设备             |
|  **Embossed**  |                    盲文打印机                    |
|  **Handheld**  |                     便携设备                     |
|   **Print**    |              打印用纸或打印预览视图              |
| **Projection** |                   各种投影设备                   |
|   **Screen**   |                    电脑显示器                    |
|   **Speech**   |                 语音或音频合成器                 |
|     **Tv**     |                  电视机类型设备                  |
|    **Tty**     | 使用固定密度字母栅格的媒介，比如电传打字机和终端 |

虽然上面的表列出来了这么多，但是常用的也就是 `all`（全部）、`screen`（屏幕）和 `print`（页面打印或打印预览模式）这三种媒体类型。

## 媒体类型引用方法

### 1. `link` 方法

`link` 方法引入媒体类型其实就是在 `link` 标签引用样式的时候，通过 `link` 标签中的 `media` 属性来指定不同的媒体类型

```html
<link rel="stylesheet" href="index.css" media="screen" />
<link rel="stylesheet" href="print.css" media="print" />
```

### 2. `xml` 方式

`xml` 方式和 `link` 方式比较相似，也是通过 `media` 属性来指定

```xml
<? xml-stylesheet rel="stylesheet" media="screen" href="style.css" ?>
```

### 3. `@import` 方式

`@import` 引入媒体类型主要有两种方式，一种是在 `CSS` 样式表中通过 `@import` 调用另一个样式文件，另外一种是在 `style` 标签中引入。

#### 在样式文件中引入媒体类型

```css
@import url(index.css) screen;
@import url(print.css) print;
```

#### 在 `style` 标签中引入媒体类型

```html
<style>
  @import url(index.css) screen;
  @import url(print.css) print;
</style>
```

### 4. `@meida` 的方式

`@media` 是 `CSS3` 中新引进的一个特性，称为媒体查询。`@media` 引入媒体也有两种方式

#### 在样式文件中引入媒体类型

```css
@media screen {
  /* 具体样式 */
}
```

#### 在 `style` 标签中引入媒体类型

```html
<style>
  @media screen {
    /* 具体样式 */
  }
</style>
```

## 媒体查询具体语法

```
Media Type（判断条件）+ CSS（符合条件的样式规则）
```

```html
<link rel="stylesheet" media="screen and (max-width:600px)" href="style.css" />
```

```css
@meida screen and (max-width:600px) {
  /* 具体样式 */
}
```

上面的两个例子中都是使用 `width` 来进行的样式判断，但是实际上还有很多特性都可以被用来当作样式判断的条件

<img src="./assets/MediaFeature.png" alt="media-query" style="zoom:100%;" />

有了 Media Query，我们能在不同的条件下使用不同的样式，使页面在不同的终端设备下达到不同的渲染效果。

这里有一个具体的公式如下：

```css
@media 媒体类型 and (媒体特性) {
  /* 具体样式 */
}
```

来看几个具体示例。

1. 最大宽度 `max-width`

该特性是指媒体类型小于或等于指定宽度时，样式生效，例如：

```css
@media screen and (max-width: 480px) {
  /* 具体样式 */
}
/* 当屏幕宽度小于或等于 480px 时，样式生效 */
```

2. 最小宽度 `min-width`

该特性和上面相反，及媒体类型大于或等于指定宽度时，样式生效，例如：

```css
@media screen and (min-width: 480px) {
  /* 具体样式 */
}
/* 当屏幕宽度大于或等于 480px 时，样式生效 */
```

3. 多个媒体特性混合使用

当需要多个媒体特性时，使用 `and` 关键字将媒体特性结合在一起，例如：

```css
@media screen and (min-width: 480px) and (max-width: 900px) {
  /* 具体样式 */
}
/* 当屏幕大于等于 480px 并且小于等于 900px 时，样式生效。 */
```

4. 设备屏幕的输出宽度 `Device Width`

在智能设备上，例如 iphone、ipad 等，可以通过 min-device-width 和 max-device-width 来设置媒体特性，例如：

```css
/* 在智能设备上，当屏幕小于等于 480px 时样式生效 */
@media screen and (max-device-height: 480px) {
  /* 具体样式 */
}
```

5. `not` 关键字

`not` 关键词可以用来排除某种制定的媒体特性，示例如下：

```css
/* 样式代码将被用于除了打印设备和屏幕宽度小于或等于 900px 的所有设备中 */

@media not print and (max-width: 900px) {
  /* 具体样式 */
}
```

6. 未指明 Media Type

如果在媒体查询中没有明确的指定 Media Type，那么其默认值为 `all`

```css
/* 适用于屏幕尺寸小于或等于 900px 的所有设备 */
@media (max-width: 900px) {
  /* 具体样式 */
}
```

[MDN 关于媒体查询的内容](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries/Using_media_queries)
