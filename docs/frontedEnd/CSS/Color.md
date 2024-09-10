---
title: 颜色
order: 4
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

# 颜色

## 颜色的 alpha 通道

颜色的 alpha 通道标识了色彩的透明度，它是一个 0~1 之间的取值，0 标识完全透明，1 标识完全不透明

在 css 中使用 rgba 可以为颜色添加 alpha 通道

```css
.alpha {
  /* 一个完全透明的颜色，等同于 transparent */
  color: rgba(0, 0, 0, 0);
  /* 一个完全不透明的颜色，等同于rgb */
  color: rgba(0, 0, 0, 1);
  /* 一个半透明的颜色 */
  color: rgba(0, 0, 0, 0.5);
}
```

rgba 还可以有多种书写方式，例如`rgba(0, 0, 0, 0.5)`还可以写为：

- `rgb(0 0 0 / 50%)`
- `#00000080`
