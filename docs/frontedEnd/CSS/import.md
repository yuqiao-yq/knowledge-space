---
title: import指令
order: 10
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

# import 指令

## 什么是`import`指令

`import` 指令是用来导入 `CSS` 样式的

### 1.在`HTML`文件中导入外部样式

```html
<style>
  @import url('./index.css');
</style>
```

### 2.在`CSS`文件中导入外部样式

```css
@import url('./index.css');
```

### 3. `@import`规则还支持媒体查询，因此可以允许依赖媒体的导入

```css
@import 'mobstyle.css' screen and (max-width: 768px);
/* 只在媒体为 screen 且视口最大宽度 768 像素时导入 "mobstyle.css" 样式表 */
```

```css
@import 'printstyle.css' print;
/* 只在媒体为 print 时导入 "printstyle.css" 样式表 */
```

## `@impor`和`link` 的区别

- 形式上：`@import` 指令是 CSS 提供的，而 `link` 标签是 `HTML` 提供的
- 加载顺序：比如 在 `a.css` 中使用 `import` 引用 `b.css`，只有当使用当使用 `import` 命令的宿主 `css` 文件 `a.css` 被下载、解析之后，浏览器才会知道还有另外一个 `b.css` 需要下载，这时才去下载，然后下载后开始解析、构建 `render tree` 等一系列操作
- 兼容性：`@import` 是 CSS2.1 提出的，只在 IE5 以上才能识别，而 `link` 标签是 `HTML` 提供的，无兼容问题
- 广泛性：`@import`
  - 只能加载 `CSS`，而 `link` 标签除了可以加载 `CSS` 外，还可以做很多其它的事情，比如定义 `RSS`，定义 `rel` 连接属性等
  - 当使用 `JS` 控制 `DOM` 去改变样式的时候，只能使用 `link` 标签，因为 `@import` 不是 `DOM` 可以控制的
  - 对于可换皮肤的网站而言，可以通过改变 `link` 标签这两个的 `href` 值来改变应用不用的外部样式表，但是对于 `import` 是无法操作的，毕竟不是标签
- 权重：`@import` 引入的样式权重为 `0`，而 `link` 标签引入的样式权重为 `1`
- 性能：
  - 从性能优化的角度来讲，尽量要避免使用 `@import`
  - 使用 `@import` 引入 `CSS` 会影响浏览器的并行下载。使用 `@import` 引用的 `CSS` 文件只有在引用它的那个 `CSS` 文件被下载、解析之后，浏览器才会知道还有另外一个 `CSS` 需要下载，这时才去下载，然后下载后开始解析、构建 `Render Tree` 等一系列操作。
  - 多个 `@import` 会导致下载顺序紊乱。在 IE 中，`@import` 会引发资源文件的下载顺序被打乱，即排列在 `@import` 后面的 `JS` 文件先于 `@import` 下载，并且打乱甚至破坏 `@import` 自身的并行下载。
