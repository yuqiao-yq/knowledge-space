---
title: JS方法汇总
order: 14
toc: content
nav:
  path: /frontend
  title: 前端
  order: 1
group:
  path: /JavaScript
  title: JavaScript
  order: 3
---

---

## 浏览器相关

### 检查是否为浏览器环境

```js
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

isBrowser(); // true (browser)
isBrowser(); // false (Node)
```

### 判断手机类型

```js
 getMobile () {
   var u = navigator.userAgent
   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
   var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
   if (isAndroid) {
     return 'Android'
   }
   if (isIOS) {
     return 'IOS'
   }
```

### 判断微信/QQ 浏览器

```js
let url = navigator.userAgent.toLowerCase();
//使用toLowerCase将字符串全部转为小写 方便我们判断使用
if (url.indexOf('15b202 qq') > -1) {
  //单独判断QQ内置浏览器
  alert('QQ APP 内置浏览器，做你想做的操作');
}
if (url.indexOf('micromessenger') > -1) {
  //单独判断微信内置浏览器
  alert('微信内置浏览器，做你想做的操作');
}
if (url.indexOf('15b202') > -1) {
  //判断微信内置浏览器，QQ内置浏览器
  alert('QQ和微信内置浏览器，做你想做的操作');
}
```

### 判断手机开屏/息屏

```
document.addEventListener('visibilitychange', () => {
  console.log(document.visibilityState)
  if (document.visibilityState === 'hidden') {
    console.log('息屏时间')
  } else if (document.visibilityState === 'visible') {
    console.log('开屏时间')
  }
})
```

### 监听浏览器的联网状态

```js
window.addEventListener("offline", function(e) {alert("offline");})
window.addEventListener("online", function(e) {alert("online");})

if(window.navigator.onLine==true){
  alert（"已连接"）
}else{
  alert（"未连接"）
}
```

### JavaScript 检测手机是否横屏

```js
window.addEventListener('resize', () => {
  if (window.orientation === 180 || window.orientation === 0) {
    // 正常方向或屏幕旋转180度
    console.log('竖屏');
  }
  if (window.orientation === 90 || window.orientation === -90) {
    // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
    console.log('横屏');
  }
});
```

### 获得滚动条的滚动距离

```js
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}
```

### 获得视口的尺寸

```js
function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  } else {
    // ie8及其以下
    if (document.compatMode === 'BackCompat') {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      };
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      };
    }
  }
}
```

### 获取任一元素的任意属性

```js
function getStyle(elem, prop) {
  return window.getComputedStyle
    ? window.getComputedStyle(elem, null)[prop]
    : elem.currentStyle[prop];
}
```

### 绑定事件的兼容代码

```js
function addEvent(elem, type, handle) {
  if (elem.addEventListener) {
    //非ie和非ie9
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) {
    //ie6到ie8
    elem.attachEvent('on' + type, function () {
      handle.call(elem);
    });
  } else {
    elem['on' + type] = handle;
  }
}
```

### 解绑事件

```js
function removeEvent(elem, type, handle) {
  if (elem.removeEventListener) {
    //非ie和非ie9
    elem.removeEventListener(type, handle, false);
  } else if (elem.detachEvent) {
    //ie6到ie8
    elem.detachEvent('on' + type, handle);
  } else {
    elem['on' + type] = null;
  }
}
```

### 取消冒泡的兼容代码

```js
function stopBubble(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
}
```

### 兼容 getElementsByClassName 方法

```js
Element.prototype.getElementsByClassName = Document.prototype.getElementsByClassName = function (
  _className,
) {
  var allDomArray = document.getElementsByTagName('*');
  var lastDomArray = [];
  function trimSpace(strClass) {
    var reg = /\s+/g;
    return strClass.replace(reg, ' ').trim();
  }
  for (var i = 0; i < allDomArray.length; i++) {
    var classArray = trimSpace(allDomArray[i].className).split(' ');
    for (var j = 0; j < classArray.length; j++) {
      if (classArray[j] == _className) {
        lastDomArray.push(allDomArray[i]);
        break;
      }
    }
  }
  return lastDomArray;
};
```

### 封装 mychildren，解决浏览器的兼容问题

```js
function myChildren(e) {
  var children = e.childNodes,
    arr = [],
    len = children.length;
  for (var i = 0; i < len; i++) {
    if (children[i].nodeType === 1) {
      arr.push(children[i]);
    }
  }
  return arr;
}
```

### 判断元素有没有子元素

```js
function hasChildren(e) {
  var children = e.childNodes,
    len = children.length;
  for (var i = 0; i < len; i++) {
    if (children[i].nodeType === 1) {
      return true;
    }
  }
  return false;
}
```

### 返回元素的第 n 个兄弟节点

```js
function retSibling(e, n) {
  while (e && n) {
    if (n > 0) {
      if (e.nextElementSibling) {
        e = e.nextElementSibling;
      } else {
        for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
      }
      n--;
    } else {
      if (e.previousElementSibling) {
        e = e.previousElementSibling;
      } else {
        for (e = e.previousElementSibling; e && e.nodeType !== 1; e = e.previousElementSibling);
      }
      n++;
    }
  }
  return e;
}
```

### 一个元素插入到另一个元素的后面

```js
Element.prototype.insertAfter = function (target, elen) {
  var nextElen = elen.nextElenmentSibling;
  if (nextElen == null) {
    this.appendChild(target);
  } else {
    this.insertBefore(target, nextElen);
  }
};
```

### 遍历 Dom 树

```js
// 给定页面上的DOM元素,将访问元素本身及其所有后代(不仅仅是它的直接子元素)
// 对于每个访问的元素，函数讲元素传递给提供的回调函数
function traverse(element, callback) {
  callback(element);
  var list = element.children;
  for (var i = 0; i < list.length; i++) {
    traverse(list[i], callback);
  }
}
```

### 异步加载 script

```js
function loadScript(url, callback) {
  var oscript = document.createElement('script');
  if (oscript.readyState) {
    // ie8及以下版本
    oscript.onreadystatechange = function () {
      if (oscript.readyState === 'complete' || oscript.readyState === 'loaded') {
        callback();
      }
    };
  } else {
    oscript.onload = function () {
      callback();
    };
  }
  oscript.src = url;
  document.body.appendChild(oscript);
}
```

### cookie 管理

```js
var cookie = {
  set: function (name, value, time) {
    document.cookie = name + '=' + value + '; max-age=' + time;
    return this;
  },
  remove: function (name) {
    return this.setCookie(name, '', -1);
  },
  get: function (name, callback) {
    var allCookieArr = document.cookie.split('; ');
    for (var i = 0; i < allCookieArr.length; i++) {
      var itemCookieArr = allCookieArr[i].split('=');
      if (itemCookieArr[0] === name) {
        return itemCookieArr[1];
      }
    }
    return undefined;
  },
};
```

### 获取 url 参数

```js
function getUrlParam(sUrl, sKey) {
  var paramArr = sUrl.split('?')[1].split('#')[0].split('&'); // 取出每个参数的键值对放入数组
  const obj = {};
  paramArr.forEach((element) => {
    const [key, value] = element.split('='); // 取出数组中每一项的键与值
    if (obj[key] === void 0) {
      // 表示第一次遍历这个元素，直接添加到对象上面
      obj[key] = value;
    } else {
      obj[key] = [].concat(obj[key], value); // 表示不是第一次遍历说明这个键已有，通过数组存起来。
    }
  });
  return sKey === void 0 ? obj : obj[sKey] || ''; // 如果该方法为一个参数，则返回对象。
  //如果为两个参数，sKey存在，则返回值或数组，否则返回空字符。
}
```

```js
function getUrlParam(sUrl, sKey) {
  var result = {};
  sUrl.replace(/(\w+)=(\w+)(?=[&|#])/g, function (ele, key, val) {
    if (!result[key]) {
      result[key] = val;
    } else {
      var temp = result[key];
      result[key] = [].concat(temp, val);
    }
  });
  if (!sKey) {
    return result;
  } else {
    return result[sKey] || '';
  }
}
```

## 字符串相关

### JS 中根据某个特定字符截取字符串

在项目中，我们有时候需要将字符串根据某个字符截取出来，并获取某个值，比如字符串"1-2-3-4-5",我想获取 3，怎么做呢?请看下面代码：

```js
let str = '1-2-3-4-5';
let arr = str.split('-');
console.log(arr); //返回一个数组['1','2','3','4','5']
```

通过上面代码，我们用 `split`方法把字符串 str 转换成了数组 arr，然后，我想获取 3，便可以对数组进行操作

```js
var num = arr[2];
console.log(num); //返回3
```

### 首字母大写

```js
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

capitalize('fooBar'); // 'FooBar'
```

### 单个单词首字母大写

```js
const capitalizeEveryWord = (str) => str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
capitalizeEveryWord('hello world!'); // 'Hello World!'
```

### 去除字符串的首尾空格

```js
var s = string.trim();
```

### 删除字符串中的 HTMl 标签

```js
const stripHTMLTags = (str) => str.replace(/<[^>]*>/g, '');

stripHTMLTags('<p><em>Hello</em> <strong>World</strong></p>'); // 'Hello World!'
```

### 字符串翻转

```js
// 方法一
var arr = str.split('');
var newArr = [];
for (var i = 0; i < arr.length; i++) {
  newArr[i] = arr[arr.length - i - 1];
}
var newStr = newArr.join('');
console.log(str0);

// 方法二
var newStr = '';
for (var i = 0; i < str.length; i++) {
  newStr += str.charAt(str.length - i - 1);
}
console.log(newStr);

// 方法三
var newStr = str.split('').reverse().join('');
console.log(newStr);

// 方法四
var arr = str.split('');
var obj = Array.from(new Set([...arr]));
var newStr = '';
for (i of obj) {
  newStr += obj[arr.length - i];
}
console.log(newStr);

// 方法五
var arr = str.split('');
var newArr = [];
while (arr.length > 0) {
  newArr.push(arr.pop());
}
var newStr = newArr.join('');
console.log(newStr);
```

### 统计字符串出现最多的字母和次数

```js
var str = 'abcdeddd';
var n = {};
for (var i = 0; i < str.length; i++) {
  var char = str.charAt(i);
  if (n[char]) {
    n[char]++; //计算出现的次数
  } else {
    n[char] = 1; //第一次出现标记为1
  }
}
console.log(n);
var max = 0;
var maxChar = null;
for (var key in n) {
  if (max < n[key]) {
    max = n[key];
    maxChar = key;
  }
}
console.log('最多的字符' + maxChar); //"最多的字符d"
console.log('出现次数' + max); //"出现次数4"
```

### 字符串去重

```js
String.prototype.unique = function () {
    var obj = {},
        str = '',
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}

###### //去除连续的字符串
function uniq(str) {
    return str.replace(/(\w)\1+/g, '$1')
}
```

### 括号合法判断

```js
let [str0, str1, str2, str3] = ['{([])}', '{}()[]', '[{]])', ')[}'];

function check(str) {
  let stack = [],
    flag = true;
  // 用map遍历str拆分出的数组的每一项
  str.split('').map((res) => {
    // 如果遇到符号的左边部分
    if (res === '{' || res === '(' || res === '[') {
      stack.push(res); // 将符号的左边部分存入stack中
      return;
    }
    // 如果遇到符号的右边部分，将stack中的最后一项与其拼接
    let concatStr = stack[stack.length - 1] + res;
    // 如果拼接成合法的，则删去此项
    if (concatStr === '[]' || concatStr === '{}' || concatStr === '()') {
      stack.pop();
    } else {
      flag = false;
    }
  });
  return flag;
}

console.log(check(str0)); // true
console.log(check(str1)); // true
console.log(check(str2)); // false
console.log(check(str3)); // false
```

### 全排列

```js
/**
 *
 * @param {[]} list 需要全排列的数组
 * @param {number} k 当前递归的数组的第一个元素下标
 * @param {number} m 数组长度-1
 */
const getFullPerm = (list, k, m) => {
  let res = [];
  const fullPerm = (list, k, m) => {
    if (k == m) {
      // console.log(list);
      res.push([...list]);
    } else {
      for (var i = k; i <= m; i++) {
        //swap k and i
        var t = list[k];
        list[k] = list[i];
        list[i] = t;
        //recursion
        fullPerm(list, k + 1, m);
        list[i] = list[k];
        list[k] = t;
      }
    }
  };
  fullPerm(list, k, m);
  return res;
};
```

### 检验字符串是否是回文

```js
function isPalina(str) {
  if (Object.prototype.toString.call(str) !== '[object String]') {
    return false;
  }
  var len = str.length;
  for (var i = 0; i < len / 2; i++) {
    if (str[i] != str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}
```

正则表达式

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  console.log(str);
  return str == str.split('').reverse().join('');
}
```

### 验证邮箱

正则表达式

```js
function isAvailableEmail(sEmail) {
  var reg = /^([\w+\.])+@\w+([.]\w+)+$/;
  return reg.test(sEmail);
}
```

### 全排列

```js
const arrange = (str) => {
  if (str.length <= 2) {
    return str.length === 2 ? [str, str[1] + str[0]] : [str];
  } else {
    return str
      .split('')
      .reduce(
        (acc, letter, i) =>
          acc.concat(arrange(str.slice(0, i) + str.slice(i + 1)).map((val) => letter + val)),
        [],
      );
  }
};
// 去重
let result = [...new Set(arrange(string))];

// arrange('abc')  abc acb bac bca cab cba
```

## 数字相关

### **获取指定范围内的随机数**

```js
var getRandom = function (max, min) {
  min = arguments[1] || 0;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//上面的函数接受一个你给出的最大数和最小数之间的随机数
```

### 保留指定小数位

```js
var num = num.toFixed(2);
// 返回字符串，保留两位小数
```

### **浮点数问题**

```js
0.1 + 0.2 = 0.30000000000000004 != 0.3
// JavaScript的数字都遵循IEEE 754标准构建，在内部都是64位浮点小数表示
```

### 数字前补“0”

```js
//迭代方式实现
function padding1(num, length) {
  for (var len = (num + '').length; len < length; len = num.length) {
    num = '0' + num;
  }
  return num;
}

//递归方式实现
function padding2(num, length) {
  if ((num + '').length >= length) {
    return num;
  }
  return padding2('0' + num, length);
}

//转为小数
function padding3(num, length) {
  var decimal = num / Math.pow(10, length);
  //toFixed指定保留几位小数
  decimal = decimal.toFixed(length) + '';
  return decimal.substr(decimal.indexOf('.') + 1);
}

//填充截取法
function padding4(num, length) {
  //这里用slice和substr均可
  return (Array(length).join('0') + num).slice(-length);
}

//填充截取法
function padding5(num, length) {
  var len = (num + '').length;
  var diff = length - len;
  if (diff > 0) {
    return Array(diff).join('0') + num;
  }
  return num;
}
```

### 格式化金钱，每千分位加逗号

```js
function format(str) {
  let s = '';
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    s = str[i] + s;
    count++;
    if (count % 3 == 0 && i != 0) {
      s = ',' + s;
    }
  }
  return s;
}
function format(str) {
  return str.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
```

```js
   // 千分位处理
/ 有小数点的保留小数位，整型的依然返回整型
    numFormat(num) {
      num += ''
      let result = ''
        if(num.indexOf('.') !== -1) {
          // num.toLocaleString()

          // 切分整数与小数部分
          let obj = num.split(".");
          let integer = obj[0]; // 整数部分
          let decimal = "00"; // 小数部分（没有小数位的也会被给上.00的小数）
          if(obj[1]) decimal = obj[1]

          // 处理整数部分
          integer = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

          // 整数部分 + 小数部分
          result = integer + '.' + decimal
        } else {
         result = num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        }
      return result
    },
```

### 获取某月天数

```js
function getMonthDay(date) {
  date = date || new Date();
  if (typeof date === 'string') {
    date = new Date(date);
  }
  date.setDate(32);
  return 32 - date.getDate();
}
// 传入date参数，可以是字符串、日期对象实例；为空表示当月天数
```

### 文件单位显示转换

```js
bytesToSize (bytes) {
  if (bytes === 0) return '0 B'
  var k = 1024 // or 1024
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

bytesToSize(12) // 12.0 B
bytesToSize(683468) // 667 KB
bytesToSize(4544) // 4.44 KB
bytesToSize(98223445) // 93.7 MB
bytesToSize(9822344566) // 9.15 GB
```

### 计算两点间的距离

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
distance(1, 1, 2, 3); // 2.23606797749979
```

## 数组/对象相关

### 获取数组中的最大值和最小值

```js
var max = Math.max.apply(Math, array);
var min = Math.min.apply(Math, array);
```

### 清空数组

```js
array.length = 0;
array = [];
```

### **合并数组**

#### concat

对于小数组，我们可以这样：

```js
let arr1 = [1,2,3];
let arr2 = [4,5,6];

let arr3 = arr1.concat(arr2);  // [1,2,3,4,5,6]

拼接多个
let arr4 = arr1.concat(arr2,arr3)

有时候我们不希望原数组（arr1、arr2）改变，这时就只能使用concat了
不过，concat()这个函数并不适合用来合并两个大型的数组，因为其将消耗大量的内存来存储新创建的数组。
```

#### apply

这种方法不是用来创建一个新的数组，其只是将第一个第二个数组合并在一起，同时减少内存的使用：

```js
arr1.push.apply(arr1, arr2);
```

或

```js
Array.prototype.push.apply(arr1, arr2);

console.log(arr1); // [1,2,3,4,5,6]
```

#### ES6 的合并数组

```js
let arr3 = [...arr1, ...arr2];

console.log(arr3); // [1,2,3,4,5,6]
```

#### push(...)

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = arr1.push(...arr2);

console.log(arr1); // [1, 2, 3, 4, 5, 6]
console.log(arr3); // 6 打印的是长度
```

#### for 循环

遍历其中一个数组，把该数组中的所有元素依次添加到另外一个数组中。

```js
for (let i in arr2) {
  arr1.push(arr2[i]);
}
```

### 数组降维

#### 将二维数组转化为一维

```js
// 方法一
let arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];
for (let i = 0; i < arr.length; i++) {
  newArr.push(...arr[i]);
}
console.log(newArr); // [0, 1, 2, 3, 4, 5]
```

```js
// 方法二
let arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];
let newArr = arr.reduce((pre, cur) => {
  return pre.concat(cur);
}, []);
console.log(newArr); // [0, 1, 2, 3, 4, 5]
```

#### 将多维数组转化为一维

```js
// 方法一
let arr = [
  [0, 1],
  [2, 3],
  [4, [5, 6, 7]],
];
const newArr = function (arr) {
  return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur), []);
};
console.log(newArr(arr)); //[0, 1, 2, 3, 4, 5, 6, 7]
```

```js
// 方法二
/ Array.prototype.flat() 将多维数组降维
let arr = [1, [2, 3, [4, 5, [12, 3, "zs"], 7, [8, 9, [10, 11, [1, 2, [3, 4]]]]]]];
console.log(arr.flat(Infinity)); //[1, 2, 3, 4, 5, 12, 3, "zs", 7, 8, 9, 10, 11, 1, 2, 3, 4]
```

```js
/ flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]

/ 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

/ 如果原数组有空位，flat()方法会跳过空位。
[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]


/ flatMap()方法对原数组的每个成员执行一个函数，相当于执行Array.prototype.map(),然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
// flatMap()只能展开一层数组
```

### 获取 url 参数

三种方法： 1、原生 js：先根据？拆分，再根据&和=拆分； 2、内置函数：URLSearchParams() 3、正则表达式

```js
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
```

### 筛选数组对象

```js
/单个条件筛选：

let arr = [
	    {a:'苹果',b:'面包',c:'吃'},
	    {a:'香蕉',b:'面包',c:'不吃'},
	    {a:'香蕉',b:'苹果',c:'吃'},
	    {a:'苹果',b:'香蕉',c:'不吃'},
	  ]
console.log(arr.filter(item => item.a=== '苹果' ))
//[{a:'苹果',b:'面包',c:'吃'},{a:'苹果',b:'香蕉',c:'不吃'}]

/
/多个条件筛选：

let a = '苹果'; //筛选参数a
let b = '面包'; //筛选参数b
let c = ''     //筛选参数c
let arr = [
	    {a:'苹果',b:'面包',c:'吃'},
	    {a:'香蕉',b:'面包',c:'不吃'},
	    {a:'香蕉',b:'苹果',c:'吃'},
	    {a:'苹果',b:'香蕉',c:'不吃'},
	  ];

arr = arr.filter(item => (a?item.a === a : true) && (b?item.b === b : true) && (c?item.c === c : true))
console.log(arr) // 筛选结果: [{a:'苹果',b:'面包',c:'吃'}]
```

### 实现对五种 JS 数据类型的克隆

```js
function clone(obj) {
  var copy;
  switch (typeof obj) {
    case 'undefined':
      break;
    case 'number':
      copy = obj - 0;
      break;
    case 'string':
      copy = obj + '';
      break;
    case 'boolean':
      copy = obj;
      break;
    case 'object': // object分为两种情况 对象（Object）和数组（Array）
      if (obj === null) {
        copy = null;
      } else {
        if (object.prototype.toString.call(obj).slice(8, -1) === 'Array') {
          copy = [];
          for (var i = 0; i < obj.length; i++) {
            copy.push(clone(obj[i]));
          }
        } else {
          copy = {};
          for (var j in obj) {
            copy[j] = clone(obj[j]);
          }
        }
      }
      break;
    default:
      copy = obj;
      break;
  }
  return copy;
}
```

### 统计数组中出现的次数的对象

```js
const nums = [3, 5, 6, 82, 1, 4, 3, 5, 82];

const result = nums.reduce((tally, amt) => {
  tally[amt] ? tally[amt]++ : (tally[amt] = 1);
  return tally;
}, {});

console.log(result);
//{ '1': 1, '3': 2, '4': 1, '5': 2, '6': 1, '82': 2 }

计算数组中每个元素出现的次数;
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

let nameNum = names.reduce((pre, cur) => {
  if (cur in pre) {
    pre[cur]++;
  } else {
    pre[cur] = 1;
  }
  return pre;
}, {});
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}
```

### 检测数值出现次数

```js
const countOccurrences = (arr, val) => {
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
};
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```

### 数组对象排序

#### 1、单个属性排序

```js
compare(property) {
  return function(a, b) {
    let value1 = a[property]
    let value2 = b[property]
    return value1 - value2
  }
}
```

#### 2、多个属性排序

```js
compare(name, minor) {
  return function(o, p) {
    var a, b
    if (o && p && typeof o === 'object' && typeof p === 'object') {
      a = o[name]
      b = p[name]
      if (a === b) {
        return typeof minor === 'function' ? minor(o, p) : 0
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
      return typeof a < typeof b ? -1 : 1
    } else {
      thro('error')
    }
  }
}
```

#### 3、多重排序

```js
/ sort()
我们按学生的总分排序，如果总分相等，我们再按照语文成绩排序
var jsonStudents = [
    { name: "Dawson", totalScore: "197", Chinese: "100", math: "97" },
    { name: "HanMeiMei", totalScore: "196", Chinese: "99", math: "97" },
    { name: "LiLei", totalScore: "185", Chinese: "88", math: "97" },
    { name: "XiaoMing", totalScore: "196", Chinese: "96", math: "100" },
    { name: "Jim", totalScore: "196", Chinese: "98", math: "98" },
    { name: "Joy", totalScore: "198", Chinese: "99", math: "99" }
];

jsonStudents.sort(function(a, b) {
    var value1 = a.totalScore,
        value2 = b.totalScore;
    if (value1 === value2) { // 如果总分相同
        return b.Chinese - a.Chinese; // 按语文分数降序排序
    }
    return value2 - value1; // 总分不同，降序排序
});

console.log("jsonStudents :", jsonStudents);
```

## **取出数组中的随机项**

```js
var ran = array[Math.floor(Math.random() * array.length)];
```

### **打乱数字数组的顺序**

```js
var sortArray = array.sort(function () {
  return Math.random() - 0.5;
});
```

### 使用递归创建一个顺序数组

```js
function countup(n) {
  if (n < 1) {
    return [];
  } else {
    const countArray = countup(n - 1);
    countArray.push(n);
    return countArray;
  }
}
console.log(countup(5)); // [1, 2, 3, 4, 5]

/ 如果需要倒序，对countArray用unshift()方法即可
```

### 类数组对象转为数组

比如：类数组对象遍历：

```js
Array.prototype.forEach.call(argumens, function (value) {});
```

DOM 的 NodeList 和 HTMLCollection 也是类数组对象

### 将数组的值转为数组

```js
var testObj = {
  0: 'prop0',
  1: 'prop1',
  2: 'prop2',
  3: 'prop3',
  length: 4, // 必须得有这个length属性
};
var kkk = Array.prototype.slice.call(testObj);
console.log(kkk);
// ['prop0', 'prop1', 'prop2', 'prop3']
```

```js
还可以用;
var kkk = Array.from(testObj);
```

### JSON 序列化和反序列化

```js
JSON.stringify(); // 将JavaScript对象序列化为有效的字符串。

JSON.parse(); // 将有效的字符串转换为JavaScript对象。

// 在AJAX传输数据时很有用
```

### 判断对象是否为空

```js
1.将json对象转化为json字符串，再判断该字符串是否为"{}"

var data = {};
var b = (JSON.stringify(data) == "{}");
alert(b);//true


2.for in 循环判断

var obj = {};
var b = function() {
for(var key in obj) {
return false;
}
return true;
}
alert(b());//true


3.jquery的isEmptyObject方法

此方法是jquery将2方法(for in)进行封装，使用时需要依赖jquery

var data = {};
var b = $.isEmptyObject(data);
alert(b);//true


4.Object.getOwnPropertyNames()方法

此方法是使用Object对象的getOwnPropertyNames方法，获取到对象中的属性名，存到一个数组中，返回数组对象，我们可以通过判断数组的length来判断此对象是否为空

注意：此方法不兼容ie8，其余浏览器没有测试
var data = {};
var arr = Object.getOwnPropertyNames(data);
alert(arr.length == 0);//true


5.使用ES6的Object.keys()方法

与4方法类似，是ES6的新方法, 返回值也是对象中属性名组成的数组

var data = {};
var arr = Object.keys(data);
alert(arr.length == 0);//true
```

### 找元素的第 n 级父元素

```js
function parents(ele, n) {
  while (ele && n) {
    ele = ele.parentElement ? ele.parentElement : ele.parentNode;
    n--;
  }
  return ele;
}
```

### 返回元素的第 n 个兄弟节点

```js
function retSibling(e, n) {
  while (e && n) {
    if (n > 0) {
      if (e.nextElementSibling) {
        e = e.nextElementSibling;
      } else {
        for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
      }
      n--;
    } else {
      if (e.previousElementSibling) {
        e = e.previousElementSibling;
      } else {
        for (e = e.previousElementSibling; e && e.nodeType !== 1; e = e.previousElementSibling);
      }
      n++;
    }
  }
  return e;
}
```

### 对象里的属性求和

```js
var result = [
  {
    subject: 'math',
    score: 10,
  },
  {
    subject: 'chinese',
    score: 20,
  },
  {
    subject: 'english',
    score: 30,
  },
];

var sum = result.reduce(function (prev, cur) {
  return cur.score + prev;
}, 0);
console.log(sum); //60
```

### 复制对象

```js
const obj = { a: 'a', b: 'b', c: 'c' };

const newObj = { ...obj };
```

### 复制对象并去掉部分属性

```js
// const obj = {a: 'a', b: 'b', c: 'c'};

const obj = { a, ...newObj };

// 也可用 delete newObj.a
```

## 数组去重

### 基本数组去重

#### 1、利用数组的 `indexOf`下标属性来查询。

```js
function unique4(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique4([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]));
// 结果是[1, 2, 3, 5, 6, 7, 4]
```

#### 2、先将原数组排序，在与相邻的进行比较，如果不同则存入新数组。

```js
function unique2(arr) {
  var formArr = arr.sort();
  var newArr = [formArr[0]];
  for (let i = 1; i < formArr.length; i++) {
    if (formArr[i] !== formArr[i - 1]) {
      newArr.push(formArr[i]);
    }
  }
  return newArr;
}
console.log(unique2([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]));
```

#### 3、利用对象属性存在的特性，如果没有该属性则存入新数组。

```js
function unique3(arr) {
  var obj = {};
  var newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1;
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique2([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]));
```

#### 4、利用数组原型对象上的 `includes`方法。

```js
function unique5(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique5([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]));
```

#### 5、利用数组原型对象上的 `filter` 和 `includes`方法。

```js
利用filter，可以巧妙地去除Array的重复元素：
var
    r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
console.log(r.toString());
// apple,strawberry,banana,pear,orange
去除重复元素依靠的是indexOf总是返回第一个元素的位置，后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了。
```

```js
function unique6(arr) {
  var newArr = [];
  newArr = arr.filter(function (item) {
    return newArr.includes(item) ? '' : newArr.push(item);
  });
  return newArr;
}
console.log(unique6([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]));
```

#### 6、利用 ES6 的 `set `方法。

```js
let arr = [1, 2, 2, 3, 4, 5, 5, 6];
let newArr = Array.from(new Set(arr));
console.log(newArr);
或者;
let newArr = [...new Set(arr)];
```

```js
function unique10(arr) {
  return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
}
console.log(unique10([1, 1, 2, 3, 5, 3, 1, 5, 6, 7, 4]));
```

#### 7、利用 `reduce`

```js
let arr = [1, 2, 3, 4, 4, 1];
let newArr = arr.reduce((pre, cur) => {
  if (!pre.includes(cur)) {
    return pre.concat(cur);
  } else {
    return pre;
  }
}, []);
console.log(newArr); // [1, 2, 3, 4]
```

### 二维数组去重

```js
function Deduplicate(tmp) {
  let hash = {};
  let res = [];
  for (let i = 0; i < tmp.length; i++) {
    if (!hash[tmp[i]]) {
      res.push(tmp[i]);
      hash[tmp[i]] = true;
    }
  }
  return res;
}
arr = Deduplicate(arr);
```

### 根据数组某个属性去重

```js
// 方法一
function unique(arr) {
  const res = new Map();
  return arr.filter((item) => !res.has(item.productName) && res.set(item.productName, 1));
}

// 方法二
function unique(arr) {
  let result = {};
  let obj = {};
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i].key]) {
      result.push(arr[i]);
      obj[arr[i].key] = true;
    }
  }
}
```

## 手写方法

### 深拷贝、浅拷贝

#### 深拷贝

##### 1、丐版

```js
newObj = JSON.parse(JSON.stringify(oldObj));

// 问题

// 1. 性能问题，stringify再解析其实需要耗费较多时间，特别是数据量大的时候。
// 2. 一些类型无法拷贝，例如函数(不输出)，正则(输出空对象)，时间对象(输出时间字符串)，Undefiend(不输出)等等问题
```

##### 2、一层结构深拷贝

```js
var obj = {};
var o1 = { a: 1 };
var o2 = { b: 2 };

var obj = Object.assign(obj, o1, o2);
console.log(obj); // { a: 1, b: 2 }

// 对于一层对象来说是没有任何问题的，但是如果对象的属性对应的是其它的引用类型的话，还是只拷贝了引用，修改的话还是会有问题
```

##### 3、递归深拷贝

```js
function deepCopy(newObj, oldObj) {
  newObj = newObj || {};
  for (var i in oldObj) {
    if (oldObj.hasOwnProperty(i)) {
      // 判断是复杂数据类型还是简单数据类型
      if (typeof oldObj[i] === 'object') {
        // 判断是数组还是对象
        newObj[i] = Array.isArray(oldObj[i]) ? [] : {};
        // 递归调用
        deepCopy(newObj[i], oldObj[i]);
      } else {
        // 属于简单数据类型 直接赋值
        newObj[i] = oldObj[i];
      }
    }
  }
  return newObj;
}
```

### 数组方法

#### `reverse`底层原理和扩展

```js
// 改变原数组
Array.prototype.myReverse = function () {
  var len = this.length;
  for (var i = 0; i < len; i++) {
    var temp = this[i];
    this[i] = this[len - 1 - i];
    this[len - 1 - i] = temp;
  }
  return this;
};
```

#### `forEach`

```js
Array.prototype.myForEach = function (func, obj) {
  var len = this.length;
  var _this = arguments[1] ? arguments[1] : window;
  // var _this=arguments[1]||window;
  for (var i = 0; i < len; i++) {
    func.call(_this, this[i], i, this);
  }
};
```

#### `filter`

```js
Array.prototype.myFilter = function (func, obj) {
  var len = this.length;
  var arr = [];
  var _this = arguments[1] || window;
  for (var i = 0; i < len; i++) {
    func.call(_this, this[i], i, this) && arr.push(this[i]);
  }
  return arr;
};
```

#### `map`

```js
Array.prototype.myMap = function (func) {
  var arr = [];
  var len = this.length;
  var _this = arguments[1] || window;
  for (var i = 0; i < len; i++) {
    arr.push(func.call(_this, this[i], i, this));
  }
  return arr;
};
```

#### `every`

```js
Array.prototype.myEvery = function (func) {
  var flag = true;
  var len = this.length;
  var _this = arguments[1] || window;
  for (var i = 0; i < len; i++) {
    if (func.apply(_this, [this[i], i, this]) == false) {
      flag = false;
      break;
    }
  }
  return flag;
};
```

#### `reduce`

```js
Array.prototype.myReduce = function (func, initialValue) {
  var len = this.length,
    nextValue,
    i;
  // 判断有没有设置初始值
  if (!initialValue) {
    // 没有传第二个参数（初始值）
    nextValue = this[0];
    i = 1;
  } else {
    // 传了第二个参数
    nextValue = initialValue;
    i = 0;
  }
  for (; i < len; i++) {
    nextValue = func(nextValue, this[i], i, this);
  }
  return nextValue;
};
```

### 对象方法

#### `bind()`

```js
Function.prototype.myBind = function (newThis) {
  //此处的this指向的是调用myBind的函数,所以我们先判断下调用者
  //是不是一个函数，如果不是，我们就抛出一个错误提示
  if (typeof this !== 'function') {
    throw new Error('调用者必须是一个函数');
  }
  //this指向有可能改变，先绑定this
  let self = this;
  //将传入的参数转换为一个数组 因为第一个参数是要绑定的this指向，所以只截取其之后的参数
  let args = Array.prototype.slice.call(arguments, 1);

  //创建一个匿名函数
  let Fn = function () {};
  //返回一个函数
  let BackFn = function () {
    let BackFnArgs = Array.prototype.slice.call(arguments);
    // 如果BackFn是被作为构造函数调用的话，此时this instanceof Fn为true,this指向调用者,反之为false,this指向我们传入的newThis
    return self.apply(this instanceof Fn ? this : newThis, args.concat(BackFnArgs));
  };

  /* 这里如果不使用Fn.prototype作为媒介而直接使用BackFn.prototype =this.prototype的话，
      当BackFn.prototype改变时，this.prototype也会随之改变，
      因为这样相当于一次浅克隆，它两指向同一个内存对象 */
  Fn.prototype = this.prototype;
  BackFn.prototype = new Fn();
  return BackFn;
};
```

#### `call()`

```js
Function.prototype.myCall = function () {
  // ctx为可选参数，如果不传的话默认上下文是window
  var ctx = arguments[0] || window;
  // 给ctx创建一个fn属性，并将值设置为需要调用的函数
  ctx.fn = this;
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  // const args = [...arguments].slice(1) args可以这么处理，更简单
  // 调用函数并将对象上的f删除
  var result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};
```

#### `apply()`

```js
Function.prototype.myApply = function () {
  var ctx = arguments[0] || window;
  ctx.fn = this;
  if (!arguments[1]) {
    var result = ctx.fn();
    delete ctx.fn;
    return result;
  }
  var result = ctx.fn(...arguments[1]);
  delete ctx.fn;
  return result;
};
```

### 防抖、节流

#### 防抖

触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

思路：每次触发事件时都取消之前的延时调用方法

```js
function debounce(handle, delay) {
  var timer = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    let that = this,
      args = arguments;
    clearTimeout(timer); // 每当用户输入的时候把前一个 setTimeout clear 掉
    // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
    timer = setTimeout(function () {
      handle.apply(that, args);
    }, delay);
  };
}
```

#### 节流

高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

思路：每次触发事件时都判断当前是否有等待执行的延时函数

```js
function throttle(handler, wait) {
  var lastTime = 0;
  return function (e) {
    var nowTime = new Date().getTime();
    if (nowTime - lastTime > wait) {
      handler.apply(this, arguments);
      lastTime = nowTime;
    }
  };
}
```

## 函数

#### 函数柯里化

```js
//是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术

function curryIt(fn) {
  var length = fn.length,
    args = [];
  var result = function (arg) {
    args.push(arg);
    length--;
    if (length <= 0) {
      return fn.apply(this, args);
    } else {
      return result;
    }
  };
  return result;
}
```

#### 圣杯模式的继承

```js
function inherit(Target, Origin) {
  function F() {}
  F.prototype = Origin.prototype;
  Target.prototype = new F();
  Target.prototype.constructor = Target;
  // 最终的原型指向
  Target.prop.uber = Origin.prototype;
}
```

#### 运动函数

```js
function animate(obj, json, callback) {
  clearInterval(obj.timer);
  var speed, current;
  obj.timer = setInterval(function () {
    var lock = true;
    for (var prop in json) {
      if (prop == 'opacity') {
        current = parseFloat(window.getComputedStyle(obj, null)[prop]) * 100;
      } else {
        current = parseInt(window.getComputedStyle(obj, null)[prop]);
      }
      speed = (json[prop] - current) / 7;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

      if (prop == 'opacity') {
        obj.style[prop] = (current + speed) / 100;
      } else {
        obj.style[prop] = current + speed + 'px';
      }
      if (current != json[prop]) {
        lock = false;
      }
    }
    if (lock) {
      clearInterval(obj.timer);
      typeof callback == 'function' ? callback() : '';
    }
  }, 30);
}
```

#### 弹性运动

```js
function ElasticMovement(obj, target) {
  clearInterval(obj.timer);
  var iSpeed = 40,
    a,
    u = 0.8;
  obj.timer = setInterval(function () {
    a = (target - obj.offsetLeft) / 8;
    iSpeed = iSpeed + a;
    iSpeed = iSpeed * u;
    if (Math.abs(iSpeed) <= 1 && Math.abs(a) <= 1) {
      console.log('over');
      clearInterval(obj.timer);
      obj.style.left = target + 'px';
    } else {
      obj.style.left = obj.offsetLeft + iSpeed + 'px';
    }
  }, 30);
}
```

#### 格式化时间

```js
function formatDate(t, str) {
  var obj = {
    yyyy: t.getFullYear(),
    yy: ('' + t.getFullYear()).slice(-2),
    M: t.getMonth() + 1,
    MM: ('0' + (t.getMonth() + 1)).slice(-2),
    d: t.getDate(),
    dd: ('0' + t.getDate()).slice(-2),
    H: t.getHours(),
    HH: ('0' + t.getHours()).slice(-2),
    h: t.getHours() % 12,
    hh: ('0' + (t.getHours() % 12)).slice(-2),
    m: t.getMinutes(),
    mm: ('0' + t.getMinutes()).slice(-2),
    s: t.getSeconds(),
    ss: ('0' + t.getSeconds()).slice(-2),
    w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()],
  };
  return str.replace(/([a-z]+)/gi, function ($1) {
    return obj[$1];
  });
}
```

#### 单例模式

```js
function getSingle(func) {
  var result;
  return function () {
    if (!result) {
      result = new func(arguments);
    }
    return result;
  };
}
```

#### 大数相加

```js
function sumBigNumber(a, b) {
  var res = '', //结果
    temp = 0; //按位加的结果及进位
  a = a.split('');
  b = b.split('');
  while (a.length || b.length || temp) {
    //~~按位非 1.类型转换，转换成数字 2.~~undefined==0
    temp += ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp = temp > 9;
  }
  return res.replace(/^0+/, '');
}
```

### 原生 js 封装 ajax

```js
function ajax(method, url, callback, data, flag) {
  var xhr;
  flag = flag || true;
  method = method.toUpperCase();
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHttp');
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(2);
      callback(xhr.responseText);
    }
  };

  if (method == 'GET') {
    var date = new Date(),
      timer = date.getTime();
    xhr.open('GET', url + '?' + data + '&timer' + timer, flag);
    xhr.send();
  } else if (method == 'POST') {
    xhr.open('POST', url, flag);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  }
}
```

### 正则表达式

```js
/*是否带有小数*/
function isDecimal(strValue) {
  var objRegExp = /^\d+\.\d+$/;
  return objRegExp.test(strValue);
}

/*校验是否中文名称组成 */
function ischina(str) {
  var reg = /^[\u4E00-\u9FA5]{2,4}$/; /*定义验证表达式*/
  return reg.test(str); /*进行验证*/
}

/*校验是否全由8位数字组成 */
function isStudentNo(str) {
  var reg = /^[0-9]{8}$/; /*定义验证表达式*/
  return reg.test(str); /*进行验证*/
}

/*校验电话码格式 */
function isTelCode(str) {
  var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
  return reg.test(str);
}

/*校验邮件地址是否合法 */
function IsEmail(str) {
  var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
  return reg.test(str);
}
```
