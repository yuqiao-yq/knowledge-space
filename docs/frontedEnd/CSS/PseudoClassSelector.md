---
title: 伪类选择器
order: 6
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

# 伪类选择器

## 什么是伪类选择器

伪类选择器，就是通过一些条件，来选中元素，比如鼠标悬停在元素上，或者元素获得焦点等。

## 怎样使用伪类选择器

### 常见的用法

```css
input:focus {
  /* 选中聚焦的表单元素 */
}
/* input type为单选，被选中时 */
input:checked {
  /* 选中被选中的表单元素 */
  color: #333;
}
/* input 被选中时 它的兄弟元素 span 的样式 */
input:checked ~ span {
  color: #333;
}

/* input 被禁用时 */

input:disabled {
  /* 选中被禁用的表单元素 */
  color: #333;
}

a:link {
  /* 选中未访问过的超链接 */
}
a:visited {
  /* 选中已访问过的超链接 */
}
div:hover {
  /* 选中鼠标移入的元素 */
}
input:active {
  /* 选中鼠标按下的元素 */
}
div:first-child {
  /* 选中第一个子元素 */
}

div:last-child {
  /* 选中最后一个子元素 */
}

div:nth-child(an + b) {
  /* 选中第「an+b」个子元素 */
  /* a 和 b是常量，n的值会从0开始依次递增 */
}

div:first-of-type {
  /* 选中第一个指定类型的子元素 */
}

div:last-of-type {
  /* 选中最后一个指定类型的子元素 */
}

div:nth-of-type(an + b) {
  /* 选中第「an+b」个指定类型的子元素 */
  /* a 和 b是常量，n的值会从0开始依次递增 */
}
```
