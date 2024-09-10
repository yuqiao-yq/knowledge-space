---
title: 精灵图
order: 7
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

# 精灵图

## 什么是精灵图

- 精灵图其实就是把多个小图片整合到一张大图片上，这样就可以通过 `background-position` 来选择要显示的图片部分
- 精灵图的原理是通过 CSS 的 `background-position` 和 `background-size` 属性来实现的

### 为什么需要使用精灵图

- 背景图片是单独加载的，如果背景图片很多，加载的图片就很多，会降低页面加载速度
- 背景图片都是通过`background-image`来引入的，如果背景图片很多，就会有很多的`background-image`属性，导致页面代码十分臃肿，维护起来也不方便

### 精灵图的优点

- 减少服务器请求次数，提高页面加载速度
- 减少图片的字节，减少图片体积，提高页面加载速度

### 精灵图的缺点

- 维护麻烦，如果图片有修改，需要修改对应的 CSS 代码
- 图片本身放大会失真，所以精灵图适合用于小图标

## 如何使用精灵图

### 精灵图的使用

- 精灵图的图片命名要规范，尽量按照模块来命名
- 精灵图的图片尽量使用 PNG 格式，因为 PNG 格式支持透明度，可以做出更好的效果
- 精灵图的图片尽量使用 GIF 格式，因为 GIF 格式支持透明度，可以做出更好的效果
- 精灵图的图片尽量使用 PNG 格式，因为 PNG 格式支持透明度，可以做出更好的效果

示例

```html
<div class="item"></div>
<style>
  .item {
    /* 调整宽高使只展示需要的图片大小 */
    width: 85px;
    height: 60px;
    /* 设置背景，修改x y 轴位置 */
    background: url(./img/sprite.jpg) no-repeat -280px -240px;
  }
</style>
```
