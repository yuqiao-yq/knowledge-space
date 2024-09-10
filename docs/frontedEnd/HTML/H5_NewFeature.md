---
title: HTML5新特性
order: 2
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /html
  title: HTML
  order: 1
---

## HTML5 简介

## H5 的新特性

H5 主要是针对以前的不足，增加了一些新的标签、新的表单和新的表单属性等。

这些属性都有一定的兼容性问题，基本是 IE9+ 以上版本才能支持。

<!-- <Alert> -->
语义化标准主要是针对**搜索引擎**的
<!-- </Alert> -->

### 新增的语义化标签

```html
<header>
  : 头部标签
  <nav>
    : 导航标签
    <article>
      : 内容标签
      <section>
        : 定义文档某个区域
        <aside>
          : 侧边栏标签
          <footer>: 尾部标签</footer>
        </aside>
      </section>
    </article>
  </nav>
</header>
```

<img src="./assets/H5语义化标签.png" />

#### 元素语义化的好处：

- 利于 SEO（搜索引擎优化）
- 利于无障碍访问
- 利于浏览器的插件分析网页

### 新增的多媒体标签

```html
<!-- 新增的多媒体标签主要有两个  -->
<audio>: 音频 <video>: 视频</video></audio>
```

#### [视频`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

<!-- <Alert> </Alert> -->

当前`<video>`标签支持三种视频格式，尽量使用`MP4`格式,`WebM`和`Ogg`格式部分浏览器存在兼容性问题

```html
<video src="地址" controls="controls" />
```

```html
<video controls="controls" width="300">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  您的浏览器不支持<video>标签播放视频</video>
</video>
```

#### [音频`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

#### 总结

- 音频和视频标签使用方式基本一致；
- 浏览器支持情况不同；
- 谷歌浏览器把音频、视频自动播放禁止了；
- 视频标签可以用`muted`属性来静音，音频标签不行（可通过 JS 解决）

### 自定义数据属性

```html
<div id="app" data-a="111" data-b="222"></div>

<script>
  let div = document.getElementById('app');
  console.log(div.dataset);
</script>
```

### H5 新增的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_types) 类型

<code src="@/components/frontend/TypeOfInput/index.tsx" compact="true" desc=""></code>

### H5 新增的 Web api

#### 使用 css 选择器选中元素

```js
// 使用css选择器选中匹配的第一个元素
document.querySelector('css选择器');
// 使用css选择器选中匹配的所有元素，返回伪数组
document.querySelectorAll('css选择器');
```

#### 控制类样式

```js
// 添加类样式
dom.classList.add('a'); // <div class="a"></div>
dom.classList.add('b'); // <div class="a b"></div>
dom.classList.add('c'); // <div class="a b c"></div>

// 是否包含某个类样式
dom.classList.contains('a'); // true

// 移除类样式
dom.classList.remove('a'); // <div class="b c"></div>

// 切换类样式
dom.classList.toggle('a'); // <div class="a b c"></div>
dom.classList.toggle('a'); // <div class="b c"></div>
dom.classList.toggle('a'); // <div class="a b c"></div>
```

### 本地存储

`localStorage`，永久保存到本地

`sessionStorage`，临时保存到本地，关闭浏览器后消失

```js
// 保存一个键值对到本地，值必须是字符串
localStorage.setItem('key', 'value');
// 根据键，读取本地保存的值
localStorage.getItem('key');
// 清除所有保存的内容
localStorage.clear();
// 根据键，清除指定的内容
localStorage.removeItem('key');

// 保存一个键值对到本地，值必须是字符串
sessionStorage.setItem('key', 'value');
// 根据键，读取本地保存的值
sessionStorage.getItem('key');
// 清除所有保存的内容
sessionStorage.clear();
// 根据键，清除指定的内容
sessionStorage.removeItem('key');
```

无论是 localStorage 还是 sessionStorage，它们都只能保存字符串，如果需要保存对象或数组，可以先将对象和数组转换为 JSON 字符串再进行保存

```js
JSON.stringify(obj); // 将对象或数组转换为JSON搁置
JSON.parse(jsonString); // 将JSON格式的字符串转换为对象或数组
```

### 渲染帧

浏览器会不断的对网页进行渲染，通常情况下的速度为每秒渲染 60 次，每一次渲染称之为一帧，因此又可以说：浏览器的渲染速率是 60 帧

但这不是一定的，它会受到各种因素的影响，因此，帧率往往会有浮动

浮动的帧率就导致一个问题，我们在使用`setInterval`等计时器实现某些动画效果时，如何才能保证每一帧只执行一次动画效果呢？

为了解决该问题，HTML5 新增 API`requestAnimationFrame`，用于在每一帧渲染之前做某些事

```js
requestAnimationFrame(function () {
  // 传入一个回调函数，该函数在下一帧渲染之前自动运行
  // 通常，可以利用该回调函数，在下一帧渲染前改动元素的状态
});
```

raq 的回调函数仅执行一次，因此，要实现连贯的动画，通常使用下面的代码结构

```js
// 该函数负责在下一帧渲染前，执行一次元素状态变化
function changeOnce() {
  requestAnimationFrame(function () {
    if (动画是否应该停止) {
      return;
    }
    改变元素状态;
    changeOnce(); // 改变完成后，继续注册下一针的变化
  });
}
changeOnce();
```
