---
title: 盒模型
order: 1
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

# 盒模型

- `box-sizing` 默认值是 `content-box`, 不包括`padding`、 `margin` 、 `border`
- `border-box` 则包括`padding` 、`margin` 、`border`

## 建议

使用 border-box 控制尺寸更加直观, 因此，很多网站都会加入下面的代码

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
