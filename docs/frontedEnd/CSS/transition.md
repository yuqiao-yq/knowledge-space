---
title: 过渡和动画事件
order: 12
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

# 过渡和动画事件

## CSS3 过渡 `transition`

过渡属性 `transition`，可以使从一个状态变化到另一个状态时，变化更加的平滑

`transition` 属性是 `transition-property`，`transition-duration`，`transition-timing-function` 和 `transition-delay` 的一个简写属性

### 语法

```css
transition: property duration timing-function delay;
```

- `property` 过渡属性，如 `width`、`height`、`background-color` 等,`all` 表示所有属性, `none` 表示没有属性
- `duration` 过渡持续时间，单位为秒或毫秒，如 `0.5s`,默认值为 0，代表变换是即时的
- `timing-function` 过渡效果，如 `ease`、`linear`、`ease-in`、`ease-out`、`ease-in-out` 等
- `delay` 过渡延迟时间，单位为秒或毫秒，如 `0.5s`
  - `delay`可以为负整数，负整数的计算会从整体过渡时间中去做减法运算，例如：设置为 `-2s`，相当于已经执行了 `2s`

示例

```css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: width 0.5s ease, height 0.5s ease;
}

.box:hover {
  width: 200px;
  height: 200px;
  background-color: blue;
}
```

### 多个元素过渡

如果要对多个 CSS3 属性应用过渡效果，直接用逗号分离开即可，这种主要是针对每个属性过渡的时间不同的情况下。

```css
/* 例如: 背景颜色过渡时间为 2s，而宽度的过渡时间为 5s： */
div {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  transition: background-color 2s, height 5s;
}
div:hover {
  height: 300px;
  background-color: pink;
}
```

如果每个属性的过渡时间都一样的话，那么直接使用 `all` 会更简洁一些

### 过渡事件

有些时候，在 JS 中的某些操作需要过渡效果结束后再执行，此时事件类型中给我们提供了一个 `transitionend` 事件方便我们监听过渡效果是否结束

```html
<div id="oDiv"></div>

<style>
  div {
    width: 100px;
    height: 100px;
    background-color: skyblue;
    transition: all 3s;
  }
</style>

<script>
  var div = document.getElementById('oDiv');
  div.onclick = function () {
    div.style.height = '400px';
  };
  div.ontransitionend = function () {
    console.log('过渡结束后触发');
  };
</script>
```

## CSS3 动画 `animation`

CSS3 动画属性 `animation`，可以制作出类似于 `flash` 一样的动画出来

`animation` 属性是 `animation-name`，`animation-duration`，`animation-timing-function` 和 `animation-delay`等 的一个简写属性

### 语法

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
```

- `animation-name`：指定要绑定到选择器的关键帧的名称
- `animation-duration`：动画指定需要多少秒或毫秒完成
- `animation-timing-function`：设置动画将如何完成一个周期
- `animation-delay`：设置动画在启动前的延迟间隔
- `animation-iteration-count`：定义动画的播放次数,`infinite`就是无限次
- `animation-direction`：指定是否应该轮流反向播放动画,`normal|reverse|alternate|alternate-reverse|initial|inherit`;
  - `normal`：默认值，动画正常播放
  - `reverse`：反向播放
  - `alternate`：动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放
  - `alternate-reverse`：动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放
  - 如果动画被设置为只播放一次，该属性将不起作用
  - 无论动画正向播放还是反向播放，都会算一次次数
- `animation-fill-mode`：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
  - `none`：默认值，不设置对象样式
  - `forwards`：设置对象状态为动画结束时的状态
  - `backwards`：设置对象状态为动画开始时的状态
  - `both`：设置对象状态为动画结束或开始的状态，取决于动画的播放方向
- `animation-play-state`：指定动画是否正在运行或已暂停
  - `paused`：默认值，动画已暂停
  - `running`：动画正在运行

### 示例

```html
<button id="playAnimate">播放动画</button>
<button id="pauseAnimate">暂停动画</button>
<div id="oDiv"></div>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  div {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: skyblue;
    animation: test 2s 5 alternate paused;
  }
  @keyframes test {
    0% {
      top: 30px;
      left: 0;
    }
    50% {
      top: 30px;
      left: 400px;
    }
    100% {
      top: 200px;
      left: 400px;
    }
  }
</style>

<script>
  var oDiv = document.getElementById('oDiv');
  var playAnimate = document.getElementById('playAnimate');
  var pauseAnimate = document.getElementById('pauseAnimate');
  playAnimate.onclick = function () {
    oDiv.style.animationPlayState = 'running';
  };
  pauseAnimate.onclick = function () {
    oDiv.style.animationPlayState = 'paused';
  };
</script>
```

### 动画对应事件

动画也有对应的事件，与过渡只提供有 `transitionend` 事件不同的是，在 `CSS` 动画播放时，会发生以下三个事件

- `animationstart`：CSS 动画开始后触发
- `animationiteration`：CSS 动画重复播放时触发
- `animationend`：CSS 动画完成后触发
