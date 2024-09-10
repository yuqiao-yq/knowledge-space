---
title: Promise
order: 13
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

## 1. 预备知识

### 1.1. 函数对象与实例对象

```js
1. 函数对象: 将函数作为对象使用时, 简称为函数对象
2. 实例对象: new 函数产生的对象, 简称为对象
```

```js
function Fn() {
  // Fn函数
}

const fn = new Fn(); // Fn 是构造函数 fn 是实例对象(简称为对象)

console.log(Fn.prototype); // Fn 是对象

Fn.call({}); // Fn是函数对象，call是它的方法

$('#test'); // 这里的$是jQuery函数

$.get('/test'); // 这里的$是是jQuery函数函数对象
// 函数既可以作为函数使用，也可以作为对象使用

// 括号的左边是函数
// 点的左边是对象
// a()[0]()  a是函数，a()的返回值是数组，且数组的第一个值也是函数；
```

### 1.2. 回调函数的分类

```js
1. 同步回调:
    理解: 立即执行, 完全执行完了才结束, 不会放入回调队列中
    例子: 数组遍历相关的回调函数 / Promise的excutor函数

    const arr = [1, 2, 3]
    arr.forEach(item => { // 遍历的回调函数
      console.log(item)
    })
    console.log('forEach()之后执行')
    // 打印结果：1 2 3 forEach之后执行  ===> 同步的回调函数(不会放入队列，一上来就要执行完)

2. 异步回调:
    理解: 不会立即执行, 会放入回调队列中将来执行
    例子: 定时器回调 / ajax回调 / Promise的成功|失败的回调

    setTimeout(() => {
      console.log('timeout callback()');
    }, 0)
    console.log('setTimeout()之后');
    // 打印结果： setTimeout()之后 timeout callback()  ===> 异步回调函数，会放入队列中，将来执行

```

### 1.3. JS 中的 Error

```js
1. 错误的类型
    Error: 所有错误的父类型
    ReferenceError: 引用的变量不存在 // x is not defined
    TypeError: 数据类型不正确的错误 // Cannot read property 'xxx' of undefined / xxx is not a function
    RangeError: 数据值不在其所允许的范围内 // Maximum call stack size exceeded
    SyntaxError: 语法错误 // Unexpected string

2. 错误处理
  2.1 捕获错误: try ... catch
    try {
            let d
            console.log(d.xxx)
          } catch (error) {
            console.log(error)
            console.log(error.message) // 提示文本
            console.log(error.stack) // 打印结果同error
          }
          console.log('catch处理错误之后会打印我')
  2.2抛出错误: throw error
    function something(){
            if (Date.now()%2 === 1){
              console.log('当前时间为奇数，可以执行任务')
            } else { // 如果时间是偶数，抛出异常，由调用来处理
              throw new Error('当前时间为偶数，无法执行任务')
            }
          }
          // 捕获处理异常
          try {
            something()
          } catch(error) {
            alert(error.message)
          }
3. 错误对象
    message属性: 错误相关信息
    stack属性: 函数调用栈记录信息
```

## 2. Promise 的理解和使用

### 2.1. Promise 是什么?

```js
1.抽象表达:
    Promise是JS中进行异步编程的新的解决方案(旧的是谁?--->封装回调函数)
2.具体表达:
    从语法上来说: Promise是一个构造函数
    从功能上来说: promise对象用来封装一个异步操作并可以获取其结果

3. promise的状态改变(只有2种, 只能改变一次)

	new 出一个promise的实例对象后，这个实例对象为 pending 状态

    pending 变为 resolved  (或 fulfilled) //意味着操作成功完成
    pending 变为 rejected // 意味着操作失败
    无论变为成功还是失败，都会有一个结果数据
    成功的结果数据一般称为value，失败的结果数据一般称为reason
    // 如果一个 promise 已经被兑现（fulfilled）或被拒绝（rejected），那么我们也可以说它处于已敲定（settled）状态。

    只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
    一旦状态改变，就不会再变，会一直保持这个结果,任何时候都可以得到这个结果。
	// 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

4. promise的基本流程
```

![image-20201130225820787](./assets/image-20201130225820787.png)

### 2.2. 为什么要用 Promise?

```js
1. 指定回调函数的方式更加灵活: 可以在请求发出甚至结束后指定回调函数 (旧的: 必须在启动异步任务前指定,否则无法被监听到)
2. 支持链式调用, 可以解决回调地狱问题
3. 增加了错误捕获
```

###### 回调地狱

```js
setTimeout(function () {
  console.log(1);
  setTimeout(function () {
    console.log(2);
    setTimeout(function () {
      console.log(3);
      setTimeout(function () {
        console.log(4);
        setTimeout(function () {
          console.log(5);
        }, 500);
      }, 400);
    }, 300);
  }, 200);
}, 100);
```

### 2.3. 如何使用 Promise?

```js
1. 主要API
      Promise构造函数: Promise (excutor) {}

      Promise.prototype.then方法: (onResolved, onRejected) => {}
      Promise.prototype.catch方法: (onRejected) => {}

      Promise.resolve方法: (value) => {}
      Promise.reject方法: (reason) => {}
      Promise.all方法: (promises) => {}
      Promise.race方法: (promises) => {}


2. 我们用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数
	我们包装好的函数最后，会return出Promise对象，也就是说，执行这个函数我们得到了一个Promise对象。接下来就可以用Promise对象上有then、catch方法了

```

###### **promise 的示例 **1

```js
var p = new Promise(function (resolve, reject) {
  // Promise的构造函数接收一个参数，是函数，称为执行器函数，并且作为参数的函数中传入两个参数：resolve，reject；执行器函数会被立即调用执行(同步函数);
  //做一些异步操作
  setTimeout(function () {
    console.log('执行完成');
    resolve('随便什么数据');
  }, 2000);
});

// 在上面的代码中，我们执行了一个异步操作，也就是setTimeout，2秒后，输出“执行完成”，并且调用resolve方法

// 运行代码，会在2秒后输出“执行完成”。注意！我只是new了一个对象，并没有调用它，我们传进去的函数就已经执行了，这是需要注意的一个细节。所以我们用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数:
function runAsync() {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('执行完成');
      resolve('随便什么数据');
    }, 2000);
  });
  return p;
}
runAsync();

// 在我们包装好的函数最后，会return出一个Promise对象，也就是说，执行这个函数我们得到了一个Promise对象。之后便可以对这个得到的Promise对象运用then、catch方法了。
```

###### **promise 的示例 **2

```js
// 1. 创建一个新的promise对象
const p = new Promise((resolve, reject) => {
  // 执行器函数(箭头函数的写法)
  // 当传入匿名函数作为构造函数Promise的参数时，我们在new的时候，匿名函数就已经执行了
  // 2. 执行异步操作任务
  setTimeout(() => {
    const time = Date.now(); // 如果当前时间是偶数就代表成功，否则失败
    if (time % 2 == 0) {
      // 3.1 如果成功了，调用resolve(value)
      resolve('成功的数据，time=' + time);
    } else {
      reject('失败的数据，time' + time); // 3.2 如果失败了，调用reject(reason)
    }
  }, 1000);
});
p.then(
  // then里面的函数就跟我们平时的回调函数一样，能够在这个异步任务执行完成之后被执行
  (value) => {
    // 接收得到成功的数据  onResolved
    console.log('成功的回调', value);
  },
  (reason) => {
    // 接收得到失败的数据  onRejected
    console.log('失败的回调', reason);
  },
);
```

###### Promise 的常见问题

```js
/ Promise的常见问题

/* 		1.如何改变promise的状态?
		2.一个promise指定多个成功/失败回调函数, 都会调用吗?
		3.promise.then()返回的新promise的结果状态由什么决定?
		4.改变promise状态和指定回调函数谁先谁后?
		5.promise如何串连多个操作任务?
		6.promise异常传(穿)透?
		7.中断promise链
*/

    1.	如何改变promise的状态?
      		(1)resolve(value): 如果当前是pending就会变为resolved
      		(2)reject(reason): 如果当前是pending就会变为rejected
      		(3)抛出异常: 如果当前是pending就会变为rejected

    2.	一个promise指定多个成功/失败回调函数, 都会调用吗?
      		----->当promise改变为对应状态时都会调用

const p = new Promise((resolve, reject) => {
    //resolve('Promise状态会被标记为resolved')
   // reject('Promise状态会被标记为rejected')
    throw new Error('Promise状态会被标记为rejected')
});



    3.	promise.then()返回的新promise的结果状态由什么决定?
	(1)简单表达: 由then()指定的回调函数执行的结果决定
	(2)详细表达:
		①如果抛出异常, 新promise变为rejected, reason为抛出的异常
		②如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
		③如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果

p.then(
	value => {
		console.log('onResolved1()', value)
		// return 2
		// return Promise.resolve(3)
		// return Promise.reject(4)
	throw 5
	},
	reason => {
		console.log('onRejected1()', reason)
		// return 2
		// return Promise.resolve(3)
		// return Promise.reject(4)
		throw 5
	}
).then(
	value => {
		console.log('onResolved2()', value)
	},
	reason => {
		console.log('onRejected2()', reason)
	}
)

	4.	改变promise状态和指定回调函数谁先谁后?
			(1)都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调
			(2)如何先改状态再指定回调?
				①在执行器中直接调用resolve()/reject()
				②延迟更长时间才调用then()
			(3)什么时候才能得到数据?
				①如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
				②如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

			 ❶常规: 先指定回调函数, 后改变的状态
			new Promise((resolve, reject) => {
			    setTimeout(() => { // 后改变的状态(同时指定数据), 异步执行回调函数
			        resolve(1)
			    }, 1000);
			}).then(// 先指定回调函数, 保存当前指定的回调函数
			    value => {
			        console.log('value', value)
			    },
			    reason => {
			        console.log('reason', reason)
			    }
			)

			 ❷先改状态, 后指定回调函数
			new Promise((resolve, reject) => {
			    resolve(1) // 先改变的状态(同时指定数据)---不用异步即可先改变状态
			}).then(// 后指定回调函数, 异步执行回调函数
			    value => {
			        console.log('value2', value)
			    },
			    reason => {
			        console.log('reason2', reason)
			    }
			)



	5.promise如何串连多个操作任务?
  	(1)promise的then()返回一个新的promise, 可以开成then()的链式调用
  	(2)通过then的链式调用串连多个同步/异步任务

new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("执行任务1(异步)")
        resolve(1)
    }, 1000);
}).then(
    value => {
        console.log('任务1的结果: ', value)
        console.log('执行任务2(同步)')
        return 2
    }
).then(
    value => {
        console.log('任务2的结果:', value)
        return new Promise((resolve, reject) => {
            // 启动任务3(异步)
            setTimeout(() => {
                console.log('执行任务3(异步))')
                resolve(3)
            }, 1000);
        })
    }
).then(
    value => {
        console.log('任务3的结果: ', value)
    }
)


	6.promise异常传透?
  		(1)当使用promise的then链式调用时, 可以在最后指定失败的回调,
  		(2)前面任何操作出了异常, 都会传到最后失败的回调中处理
	7.中断promise链?
  		(1)当使用promise的then链式调用时, 在中间中断, 不再调用后面的回调函数
  		(2)办法: 在回调函数中返回一个pending状态的promise对象

new Promise((resolve, reject) => {
    // resolve(1)
    reject(1)
}).then(
    value => {
        console.log('onResolved1()', value)
        return 2
    },
    // reason => {throw reason}
).then(
    value => {
        console.log('onResolved2()', value)
        return 3
    },
    reason => { // 箭头函数的箭头相当于return的作用，这里需要用大括号把`throw reason`包裹起来
        throw reason
    }
).then(
    value => {
        console.log('onResolved3()', value)
    },
    reason => Promise.reject(reason)
).catch(reason => { // 如果在catch之前处理了异常，则这里的catch不会获取到了
    console.log('onReejected1()', reason)
    // throw reason
    // return Promise.reject(reason)
    return new Promise(()=>{}) // 返回一个pending的promise  中断promise链
}).then(
    value => {
        console.log('onResolved3()', value)
    },
    reason => {
        console.log('onReejected2()', reason)
    }
)
```

> `promise .then` 或者 `.catch中return`一个 `error`对象并不会抛出错误，所以不会被后续的 `catch`捕获，需要改成其中一种：
>
> `return Promise.reject(new Error('error!!!')) `
>
> `throw new Error('error!!!') `
>
> 才能被 catch 捕获到，因为返回任意一个非 promise 的值都会被包裹成 promise 对象，
>
> 即 `return new Error('error!!!')` 等价于 `return Promise.resolve(new Error('error!!!'))`

#### 2.3.1 .then()

**`Promise.prototype.then()`**

`Promise`实例具有 `then`方法，也就是说，`then`方法是定义在原型对象上 `Promise.prototype`上的，它的作用是为 `Promise`实例添加状态改变时的回调函数。`then`方法的第一个参数是 `resolved`状态的回调函数，第二个参数（可选，非必写）是 `rejected`状态的回调函数。

`then`方法返回的是一个新的 `Promise`实例（注意，不是原来那个 `Promise`实例）。因此可以采用链式写法，即 `then`方法后面再调用另一个 `then`方法。第一个回调函数完成以后，会将返回结果作为参数，存入第二个回调函数。

采用链式的 `then`，可以指定一组按照次序调用的回调函数。（ES7 中的 `async/await`）也可以实现链式调用，除此之外，`Promise`的 `all`方法可以实现并行执行。

```js
/ then里面的函数就跟我们平时的回调函数一个意思，能够在promiseClick这个异步任务执行完成之后被执行。简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。
```

```js
// 定义3个函数 runAsync1、runAsync2、runAsync3
function runAsync1() {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      console.log('异步任务1执行完成');
      resolve('随便什么数据1');
    }, 1000);
  });
  return p;
}
function runAsync2() {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('异步任务2执行完成');
      resolve('随便什么数据2');
    }, 2000);
  });
  return p;
}
function runAsync3() {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('异步任务3执行完成');
      resolve('随便什么数据3');
    }, 2000);
  });
  return p;
}

runAsync1()
  .then(function (data) {
    console.log(data);
    return runAsync2();
  })
  .then(function (data) {
    console.log(data);
    return runAsync3();
  })
  .then(function (data) {
    console.log(data);
  });

/*
打印结果：
		异步任务1执行完成
		随便什么数据1
		异步任务2执行完成
		随便什么数据2
		异步任务3执行完成
		随便什么数据3
*/
```

在 then 方法中，也可以直接 return 数据而不是 Promise 对象，在后面的 then 中就可以接收到数据了

```js
runAsync1()
  .then(function (data) {
    console.log(data);
    return runAsync2();
  })
  .then(function (data) {
    console.log(data);
    return '直接返回数据'; //这里直接返回数据
  })
  .then(function (data) {
    console.log(data);
  });

/* 输出结果：
		异步任务1执行完成
		随便什么数据1
		异步任务2执行完成
		随便什么数据2
		直接返回数据
*/
```

#### 2.3.2 .catch()

catch 和 then 的第二个参数一样，用来指定 reject 的回调

```js
getNumber()
  .then(function (data) {
    console.log('resolved');
    console.log(data);
  })
  .catch(function (reason) {
    console.log('rejected');
    console.log(reason);
  });
```

效果和写在 then 的第二个参数里面一样。不过它还有另外一个作用：在执行 resolve 的回调（也就是上面 then 中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死 js，而是会进到这个 catch 方法中。

```js
getNumber()
  .then(function (data) {
    console.log('resolved');
    console.log(data);
    console.log(somedata); //此处的somedata未定义
  })
  .catch(function (reason) {
    console.log('rejected');
    console.log(reason);
  });

/* 在resolve的回调中，我们console.log(somedata);而somedata这个变量是没有被定义的。如果我们不用Promise，代码运行到这里就直接在控制台报错了，不往下运行了。但是在这里，会得到这样的结果：
	resolved
	4(小于等于5的数字)
	rejected
	ReferenceError: somedata is not defined(...)
*/
// 也就是说进到catch方法里面去了，而且把错误原因传到了reason参数中。即便是有错误的代码也不会报错了，这与我们的try/catch语句有相同的功能。
```

#### 2.3.3 .resolve()

```js
// 产生一个成功或者失败的 Promise
let p1 = new Promise((resolve, reject) => {
  // 下面两个方法只能执行一个，因为状态只能改变一次
  resolve('成功了执行resolve(),Promise状态变为resolved');
  reject('失败执行reject(),Promise状态变为rejected');
});

let p2 = Promise.resolve('成功了执行resolve(),Promise状态变为resolved');
let p3 = Promise.reject('失败执行reject(),Promise状态变为rejected');

p1.then((value) => {
  console.log(value);
});
p2.then((value) => {
  // 执行 onfulfilled()回调函数,官方名字
  console.log(value);
});
// 一般获取 reject 的结果需要用 catch；或者用 then 的同时，前面写一个null
p3.then(null, (reason) => {
  console.log(reason);
});
p3.catch((reason) => {
  // 执行 onRejected()回调函数
  console.log(reason);
});
```

#### 2.3.4 .reject()

reject 的作用就是把 Promise 的状态置为 rejected，这样我们在 then 中就能捕捉到，然后执行“失败”情况的回调

```js
// getNumber函数用来异步获取一个数字，2秒后执行完成，如果数字小于等于5，我们认为是“成功”了，调用resolve修改Promise的状态。否则我们认为是“失败”了，调用reject并传递一个参数，作为失败的原因。
function getNumber() {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
      if (num <= 5) {
        resolve(num);
      } else {
        reject('数字太大了');
      }
    }, 2000);
  });
  return p;
}

getNumber().then(
  function (data) {
    console.log('resolved');
    console.log(data);
  },
  function (reason, data) {
    console.log('rejected');
    console.log(reason);
  },
);

// 运行getNumber并且在then中传了两个参数，then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。所以我们能够分别拿到他们传过来的数据。多次运行这段代码，你会随机得到下面两种结果：resolved 1~5的数字 或 rejected 数字太大了
```

#### 2.3.5 .all()

Promise 的 all 方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调.

all 方法的效果实际上是「谁跑的慢，以谁为准执行回调」

```js
Promise.all([runAsync1(), runAsync2(), runAsync3()]).then(function (results) {
  console.log(results);
});

// 用Promise.all来执行，all接收一个数组参数，里面的值最终都算返回Promise对象。这样，三个异步操作的并行执行的，等到它们都执行完后才会进到then里面。那么，三个异步操作返回的数据哪里去了呢？都在then里面呢，all会把所有异步操作的结果放进一个数组中传给then，就是上面的results。
/* 
打印结果：
	异步任务1执行完成
	异步任务2执行完成
	异步任务3执行完成
	["随便什么数据1","随便什么数据2","随便什么数据3"]
*/
```

#### 2.3.6 .race()

race 方法的效果实际上是「谁跑的快，以谁为准执行回调」

```js
Promise.race([runAsync1(), runAsync2(), runAsync3()]).then(function (results) {
  console.log(results);
});

// 这三个异步操作同样是并行执行的。1秒后runAsync1已经执行完了，此时then里面的就执行了
/*
打印结果：
	异步任务1执行完成
	随便什么数据1
	异步任务2执行完成
	异步任务3执行完成
*/
```

    **race 的一个使用场景**

```js
// 用race给某个异步请求设置超时时间，并且在超时后执行相应的操作
//请求某个图片资源
function requestImg() {
  var p = new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.src = 'xxxxxx';
  });
  return p;
}

//延时函数，用于给请求计时
function timeout() {
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('图片请求超时');
    }, 5000);
  });
  return p;
}

Promise.race([requestImg(), timeout()])
  .then(function (results) {
    console.log(results);
  })
  .catch(function (reason) {
    console.log(reason);
  });

/*
	requestImg函数会异步请求一张图片，我把地址写为"xxxxxx"，所以肯定是无法成功请求到的。timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，如果5秒之内图片请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟图片还未成功返回，那么timeout就跑赢了，则进入catch，报出“图片请求超时”的信息。
*/
```

#### 2.3.7 .finally()

`Promise.prototype.finally()` ( ES2018 )

不管 promise 最后的状态，在执行完 then 或 catch 指定的回调函数以后，都会执行 finally 方法指定的回调函数。

如果不使用 finally 方法，同样的语句需要为成功和失败两种情况各写一次。有了 finally 方法，则只需要写一次。

finally 方法和 then 以及 catch 一样，都可以返回一个新的 Promise，只是细节上有点区别，finally 返回的 Promise 将以 finally 之前的 then 的返回值来 resolve（进入 fulfilled 状态）

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是 `fulfilled`还是 `rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

`finally`本质上是 `then`方法的特例。

## 3. 自定义 Promise(手写)

```js
1. 定义整体结构
2. Promise构造函数的实现
3. promise.then()/catch()/finally()的实现
4. Promise.resolve()/reject()的实现
5. Promise.all/race()的实现
6. Promise.resolveDelay()/rejectDelay()的实现
7. ES6 class版本的Promise
```

#### 3.0 先确定 Promise 构造函数的整体结构

```js
/ ES5匿名函数自调用实现模块化
(function(window){
    /*
    Promise构造函数的形参是一个执行器回调函数，特点是立即同步执行，
    执行器回调函数可以传两个形参，参数分别是resolve,reject
    */
    function Promise(excutor){
        /*
        根据Promsie的特点可以知道，其身上有两大属性，分别是PromiseStatus、PromiseValue
            PromiseStatus是用来标记保存成功或者失败的状态的，初始值为pending；
            PromiseValue是用来保存成功或者失败时传递的数据；成功或者失败(是一个对立的命题)，初始值为undefined
            所以如果成功保存的就是成功的value值，失败保存的就是失败的reason;
        */
        //缓存自身this,防止出现函数嵌套，this更改指向的问题
        const self = this

        //此处用status和data来代替其两大属性
        self.status = 'pending' //初始值为无状态
        self.data = undefined //初始值为undefined，即还未被赋值

        //定义一个对象，用于存储成功或者失败后要执行的异步回调函数
        //以对象的形式存储，一个对象里面存储了两个属性，即成功的方法和失败的方法
        self.callbacks = []
    }
    // 把Promise暴露出去
    window.Promise = Promise;
})(window)
```

#### 3.1 promise 的执行器函数

```JS
function Promise(executor) {
    executor(resolve, reject);
}
```

#### 3.2 Promise.prototype.then

```js
Promise.prototype.then = function (onResolved, onRejected) {
  /* 
        判断onResolve、onReject是否为函数
        如果不是一个函数，就给他一个我们定义好的默认的函数，并将值直接传递给下个promise对象(值穿透)
        */
  onResolved = typeof onResolved === 'function' ? onResolved : (value) => value;
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason;
        };

  //缓存this
  const self = this;
  //存储当前的状态
  let status = this.status;

  //无论执行哪个回调函数最终返回的都是一个promise对象,其是成功或者失败要根据情况判定
  //(判定其成功或失败是为了下次调用then方法，因为then方法可以链式调用)
  return new Promise((resolve, reject) => {
    //抽出重复代码封装为函数
    function handle(callback) {
      //无论进入then方法的哪个回调函数，其执行结果都可能是成功或失败，其成功或者失败的状态取决于其返回值
      /* 
                注意：为什么调用onResolved()或者onRejected()要判断当前的状态，从而调用相应的resolve()和reject()?
                    是因为then方法链式调用的原则，当前.then()进入哪个回调函数是取决于调用then的promise对象的状态
                */
      try {
        /* 
                    根据promise中then方法回调函数的特点，
                    可以通过其形参获取调用resolve()调用时传入的value值，即self.data;
                    */
        let result = callback(self.data);
        //如果当前没有抛出异常也可能有两种情况
        //1.返回的是promise对象
        if (result instanceof Promise) {
          /* 
                        此时result是个promise对象，不能够直接得到它的状态，但是可以调用then()方法，
                        如果是成功的状态，则会进入第一个回调函数，如果是失败的状态则会进入第二个回调函数
                        总之就是要根据rusult这个promise对象的状态调用相应的成功(resolve())或失败(reject())的方法
                    
                        详细写法如下：
                        result.then(
                            value => resolve(),//这里面的内容是我们自己定义的，
                            reason => reject()
                        )
                         主要就是要得到resolve()或者reject(),外层函数可以摘掉，所以可以简写为以下形式   
                         因为result作为一个promise对象总会有一个成功或者失败的状态，可以利用then()方法调用的特点
                         成功或者失败进入不同的回调函数，从而返回result的状态  
                        */
          result.then(resolve, reject);
        } else {
          //进入else说明此时没有抛出异常，返回的结果也不是promise对象，所以直接包装成promise成功的状态即可
          resolve(result);
        }
      } catch (error) {
        //进入catch说明此时抛出异常，改变内部状态为失败，即调用reject()
        reject(error);
      }
    }

    //首先先判断当前的status,才能确定到底执行哪个回调函数
    if (status === 'resolved') {
      setTimeout(() => {
        handle(onResolved);
      });
    } else if (status === 'rejected') {
      setTimeout(() => {
        handle(onRejected);
      });
    } else {
      /* 
                此处的执行场景是当上一次返回的promise对象里的成功或失败的结果延迟返回时，
                此时调用then方法不会进入到成功或失败的回调处理函数中，
                但是callbacks里追加了成功或失败的方法后，一旦上一个延迟执行的promise对象返回成功或失败的结果，
                立刻就会调用数组里成功或失败的回调函数
                (该步骤要结合上面resolve和reject方法里的最后一行代码理解)
                */
      //以上两种状态都不符合时，说明当前无状态，即可以往上面的callbacks中添加待执行的回调函数了
      self.callbacks.push({
        /* 
                        此处onResolve，onReject的调用场景是当调用resolve或reject时，
                        跟Promise.prototype.then中的形参没有任何关系
                        */
        //说白了，此处改成a,b也可以，只要和上面resolve()或reject()方法里的名字保持一致即可
        onResolved(value) {
          //此处的函数体内容不可省略，如果省略，当调用时，根本不会有执行，因为函数体为空
          handle(onResolved);
        },
        onRejected(reason) {
          handle(onRejected);
        },
      });
    }
  });
};
```

#### 3.3 Promise.prototype.catch

```js
//catch方法实质上是then方法只执行第二个回调函数，其他内容都一样
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};
```

#### 3.4 Promise.prototype.finally

```JS
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

#### 3.5 Promise.resolve

```js
/* 
Promise.resolve()方法返回的新的promise状态要根据其传入的参数的类型，或者状态(如果传入的是个promise对象)而定；
Promise.reject()方法则无论传入的参数是什么，返回的总是一个失败状态的新的promise对象
*/

/*
返回一个指定了成功value的promise对象
value: 一般数据或promise
*/

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  });
};
```

#### 3.6 Promise.reject

```js
/*
返回一个指定了失败reason的promise对象
reason: 一般数据/error
*/

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
```

#### 3.7 Promise.all

```js
/* 
返回一个新的promise对象，如果数组中所有promise对象都是成功的状态，则新的promise即成功，
只要数组中有一个promise返回的是失败的状态，则新的promise即失败
*/
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    //定义一个累加器，用于判断当前数组中成功状态的promise对象的个数
    let num = 0;
    //定义一个数组，用于将返回的成功状态的所有value值收集起来返回
    let values = new Array(promises.length);
    promises.forEach((item, index) => {
      /* 
            因为其每一项并不一定都是promise对象，而根据promise.all处理非promise对象是将其值直接返回，
			所以在此可以将其直接包装成promise对象
            */
      Promise.resolve(item).then(
        (value) => {
          num++;
          values[index] = value;
          //当所有的promise对象都成功时，改变内部状态为成功的状态
          if (num === promises.length) {
            //将所有成功值的数组作为返回promise对象的成功结果值
            resolve(values);
          }
        },
        (reason) => {
          //一旦有一个promise产生了失败结果值, 将其作为返回promise对象的失败结果值
          reject(reason);
        },
      );
    });
  });
};
```

#### 3.8 Promise.race

```js
//返回一个新的promise对象，第一个成功或失败的promise对象的状态和value或reason值即新的promise对象的状态和value或reason值，
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((item) => {
      Promise.resolve(item).then(
        //只要有一个成功了, 返回的promise就成功了
        (value) => resolve(value),
        //只要有一个失败了, 返回的结果就失败了
        (reason) => reject(reason),
      );
    });
  });
};
```

#### 3.9 Promise 完整的手写

```js
// 自定义Promise
// ES5匿名函数自调用实现模块化
(function (window) {
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';

  // 参数为executor函数
  function Promise(executor) {
    const that = this;
    // 三个属性
    that.status = PENDING; //Promise对象状态属性，初始状态为 pending
    that.data = 'undefined'; // 用于存储结果数据
    that.callbacks = []; //保存待执行的回调函数 ，数据结构：{onResolved(){},onRejected(){}}

    function resolve(value) {
      // RESOLVED 状态只能改变一次
      if (that.status !== PENDING) {
        return;
      }
      that.status = RESOLVED;
      that.data = value;
      //执行异步回调函数 onResolved
      if (that.callbacks.length > 0) {
        setTimeout(() => {
          // 放入队列中执行所有成功的回调
          that.callbacks.forEach((callbackObj) => {
            callbackObj.onResolved(value);
          });
        }); // 不指定 = 延迟时间指定为 0ms
      }
    }

    function reject(reason) {
      if (that.status !== PENDING) {
        return;
      }
      that.status = REJECTED;
      that.data = reason;
      //执行异步回调函数 onRejected
      if (that.callbacks.length > 0) {
        setTimeout(() => {
          // 放入队列中执行所有失败的回调
          that.callbacks.forEach((callbackObj) => {
            callbackObj.onRejected(reason);
          });
        });
      }
    }
    try {
      //执行器函数立即执行
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  //Promise原型对象 then ,两个回掉函数 成功 onResolved ，失败onRejected
  //返回一个新的Promise对象
  Promise.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value; // 向后传递成功的value
    // 指定默认的失败的回调(实现错误/异常传透的关键点)
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          }; // 向后传递失败的reason
    const that = this;
    return new Promise((resolve, reject) => {
      //调用指定回调函数处理, 根据执行结果, 改变return的promise的状态
      function handle(callback) {
        // 调用成功的回调函数 onResolved
        //1.如果抛出异常，return的promise就会失败，reason就是error
        //2.如果回调函数返回不是promise, return的promise就会成功，value就是返回的值
        //3.如果回调函数返回是promise, return的promise结果就是这个promise的结果
        try {
          const result = callback(that.data);
          if (result instanceof Promise) {
            result.then(
              (value) => resolve(value),
              (reason) => reject(reason),
            );
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      }

      // 如果当前状态还是pending状态, 将回调函数保存起来
      if (that.status === PENDING) {
        that.callbacks.push({
          onResolved(value) {
            handle(onResolved);
          },
          onRejected(reason) {
            handle(onRejected);
          },
        });
      } else if (that.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        setTimeout(() => {
          //调用失败的回调函数 onRejected
          handle(onRejected);
        });
      }
    });
  };

  //Promise原型对象 catch ,参数为失败的回掉函数 onRejected
  //返回一个新的Promise对象
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  // Promise函数对象的 resolve 方法
  //返回一个新的Promise对象,Promise.resolve()中可以传入Promise
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  // Promise函数对象的 reject 方法
  //返回一个新的Promise对象 Promise.reject中不能再传入Promise
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  // Promise函数对象的 all 方法,接受一个promise类型的数组
  // 返回一个新的Promise对象
  Promise.all = function (promises) {
    // 保证返回的值得结果的顺序和传进来的时候一致
    // 只有全部都成功长才返回成功
    const values = new Array(promises.length); // 指定数组的初始长度
    let successCount = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        // 由于p有可能不是一个Promise
        Promise.resolve(p).then(
          (value) => {
            successCount++;
            values[index] = value;
            if (successCount === promises.length) {
              resolve(values);
            }
          },
          // 如果失败
          (reason) => {
            reject(reason);
          },
        );
      });
    });
  };
  // Promise函数对象的 race 方法,接受一个promise类型的数组
  // 返回一个新的Promise对象
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        Promise.resolve(p).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          },
        );
      });
    });
  };
  // 把Promise暴露出去
  window.Promise = Promise;
})(window);
```

#### 3.10 Promise 完整的手写 袁老师版本

```js
// 记录Promise的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 运行一个微队列任务
 * 把传递的函数放到微队列中
 * @param {Function} callback
 */
function runMicroTask(callback) {
  // 判断node环境
  // 为了避免「变量未定义」的错误，这里最好加上前缀globalThis
  // globalThis是一个关键字，指代全局对象，浏览器环境为window，node环境为global
  if (globalThis.process && globalThis.process.nextTick) {
    process.nextTick(callback);
  } else if (globalThis.MutationObserver) {
    const p = document.createElement('p');
    const observer = new MutationObserver(callback);
    observer.observe(p, {
      childList: true, // 观察该元素内部的变化
    });
    p.innerHTML = '1';
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * 判断一个数据是否是Promise对象
 * @param {any} obj
 * @returns
 */
function isPromise(obj) {
  return !!(obj && typeof obj === 'object' && typeof obj.then === 'function');
}

class MyPromise {
  /**
   * 创建一个Promise
   * @param {Function} executor 任务执行器，立即执行
   */
  constructor(executor) {
    this._state = PENDING; // 状态
    this._value = undefined; // 数据
    this._handlers = []; // 处理函数形成的队列
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
      console.error(error);
    }
  }

  /**
   * 向处理队列中添加一个函数
   * @param {Function} executor 添加的函数
   * @param {String} state 该函数什么状态下执行
   * @param {Function} resolve 让then函数返回的Promise成功
   * @param {Function} reject 让then函数返回的Promise失败
   */
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }

  /**
   * 根据实际情况，执行队列
   */
  _runHandlers() {
    if (this._state === PENDING) {
      // 目前任务仍在挂起
      return;
    }
    while (this._handlers[0]) {
      const handler = this._handlers[0];
      this._runOneHandler(handler);
      this._handlers.shift();
    }
  }

  /**
   * 处理一个handler
   * @param {Object} handler
   */
  _runOneHandler({ executor, state, resolve, reject }) {
    runMicroTask(() => {
      if (this._state !== state) {
        // 状态不一致，不处理
        return;
      }

      if (typeof executor !== 'function') {
        // 传递后续处理并非一个函数
        this._state === FULFILLED ? resolve(this._value) : reject(this._value);
        return;
      }
      try {
        const result = executor(this._value);
        if (isPromise(result)) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
        console.error(error);
      }
    });
  }

  /**
   * Promise A+规范的then
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
      this._runHandlers(); // 执行队列
    });
  }

  /**
   * 仅处理失败的场景
   * @param {Function} onRejected
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * 无论成功还是失败都会执行回调
   * @param {Function} onSettled
   */
  finally(onSettled) {
    return this.then(
      (data) => {
        onSettled();
        return data;
      },
      (reason) => {
        onSettled();
        throw reason;
      },
    );
  }

  /**
   * 更改任务状态
   * @param {String} newState 新状态
   * @param {any} value 相关数据
   */
  _changeState(newState, value) {
    if (this._state !== PENDING) {
      // 目前状态已经更改
      return;
    }
    this._state = newState;
    this._value = value;
    this._runHandlers(); // 状态变化，执行队列
  }

  /**
   * 标记当前任务完成
   * @param {any} data 任务完成的相关数据
   */
  _resolve(data) {
    this._changeState(FULFILLED, data);
  }

  /**
   * 标记当前任务失败
   * @param {any} reason 任务失败的相关数据
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }

  /**
   * 返回一个已完成的Promise
   * 特殊情况：
   * 1. 传递的data本身就是ES6的Promise对象
   * 2. 传递的data是PromiseLike（Promise A+），返回新的Promise，状态和其保持一致即可
   * @param {any} data
   */
  static resolve(data) {
    if (data instanceof MyPromise) {
      return data;
    }
    return new MyPromise((resolve, reject) => {
      if (isPromise(data)) {
        data.then(resolve, reject);
      } else {
        resolve(data);
      }
    });
  }

  /**
   * 得到一个被拒绝的Promise
   * @param {any}} reason
   */
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  /**
   * 得到一个新的Promise
   * 该Promise的状态取决于proms的执行
   * proms是一个迭代器，包含多个Promise
   * 全部Promise成功，则返回的Promise成功，数据为所有Promise成功的数据，并且顺序是按照传入的顺序排列
   * 只要有一个Promise失败，则返回的Promise失败，原因是第一个失败的Promise的原因
   * @param {iterator} proms
   */
  static all(proms) {
    return new MyPromise((resolve, reject) => {
      try {
        const results = [];
        let count = 0; // Promise的总数
        let fulfilledCount = 0; // 已完成的数量
        for (const p of proms) {
          let i = count;
          count++;
          MyPromise.resolve(p).then((data) => {
            fulfilledCount++;
            results[i] = data;
            if (fulfilledCount === count) {
              // 当前是最后一个Promise完成了
              resolve(results);
            }
          }, reject);
        }
        if (count === 0) {
          resolve(results);
        }
      } catch (error) {
        reject(error);
        console.error(error);
      }
    });
  }

  /**
   * 等待所有的Promise有结果之后
   * 该方法返回的Promise完成
   * 并且按照顺序将所有结果汇总
   * @param {iterator} proms
   */
  static allSettled(proms) {
    const ps = [];
    for (const p of proms) {
      ps.push(
        MyPromise.resolve(p).then(
          (value) => ({
            status: FULFILLED,
            value,
          }),
          (reason) => ({
            status: REJECTED,
            reason,
          }),
        ),
      );
    }
    return MyPromise.all(ps);
  }

  /**
   * 返回的Promise与第一个有结果的一致
   * @param {iterator} proms
   */
  static race(proms) {
    return new MyPromise((resolve, reject) => {
      for (const p of proms) {
        MyPromise.resolve(p).then(resolve, reject);
      }
    });
  }
}
```

## 4. async 与 await

```js
1. async 函数
    函数的返回值为promise对象
    promise对象的结果由async函数执行的返回值决定

2. await 表达式
    await右侧的表达式一般为promise对象, 但也可以是其它的值
    如果表达式是promise对象, await返回的是promise成功的值
    如果表达式是其它值, 直接将此值作为await的返回值

3. 注意:
    await必须写在async函数中, 但async函数中可以没有await
    如果await的promise失败了, 就会抛出异常, 需要通过try...catch来捕获处理
```

## 5. JS 异步之宏队列与微队列

![image-20201130225847761](./assets/image-20201130225847761.png)

```js
1. 宏列队: 用来保存待执行的宏任务(回调), 比如: 定时器回调/DOM事件回调/ajax回调
2. 微列队: 用来保存待执行的微任务(回调), 比如: promise的回调/MutationObserver的回调
3. JS执行时会区别这2个队列
	JS引擎首先必须先执行所有的初始化同步任务代码
	每次准备取出第一个宏任务执行前, 都要将所有的微任务一个一个取出来执行
// 等到微队列中所有的语句执行完毕后，才会看宏队列是否存在待执行的语句，然后再把宏队列的东西拿出来执行
```

#### 面试题

顺序：先同步 => 再微列队 => 再宏列队

```js
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve(6); //会被忽略，因为状态已经改变过了
      }, 0);
      resolve(1);
    });
    resolve(2);
    p.then((arg) => {
      // 参数arg传入resolve(1)中的1
      console.log(arg);
    });
  });

first().then((arg) => {
  // 参数arg传入resolve(2)中的2
  console.log(arg);
});
console.log(4);

// 3 7 4 1 2 5
/*
  同步: [3 7 4]
  宏: [5]
  微: [1 2 ]
  */
```

```js
setTimeout(() => {
  console.log('0');
}, 0);
new Promise((resolve, reject) => {
  console.log('1');
  resolve();
})
  .then(() => {
    console.log('2');
    new Promise((resolve, reject) => {
      console.log('3');
      resolve();
    })
      .then(() => {
        console.log('4'); // 到这一步这个promise已经有结果了，下面的5会被缓存起来放入微队列，先去执行微队列中的6
      })
      .then(() => {
        console.log('5');
      });
  })
  .then(() => {
    console.log('6');
  });

new Promise((resolve, reject) => {
  console.log('7');
  resolve();
}).then(() => {
  console.log('8');
});

/*
    1 7 2 3 8 4 6 5 0
    */
```
