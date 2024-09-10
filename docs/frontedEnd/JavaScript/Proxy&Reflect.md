---
title: 代理与反射
order: 20
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

## `Reflect`

### `Reflect`是什么？

Reflect 是一个内置的 JS 对象，它提供了一系列方法，可以让开发者通过调用这些方法，访问一些 JS 底层功能

由于它类似于其他语言的反射，因此取名为 Reflect

### `Reflect`可以做什么？

使用 Reflect 可以实现诸如 属性的赋值与取值、调用普通函数、调用构造函数、判断属性是否存在与对象中 等等功能

### 为什么使用`Reflect`？

有一个重要的理念，在 ES5 就被提出：减少魔法、让代码更加纯粹

这种理念很大程度上是受到函数式编程的影响

ES6 进一步贯彻了这种理念，它认为，对属性内存的控制、原型链的修改、函数的调用等等，这些都属于底层实现，属于一种魔法，因此，需要将它们提取出来，形成一个正常的 API，并高度聚合到某个对象中，于是，就造就了`Reflect`对象

因此，你可以看到 Reflect 对象中有很多的 API 都可以使用过去的某种语法或其他 API 实现。

### `Reflect`提供了哪些 API?

- `Reflect.set(target, propertyKey, value)`: 设置对象 target 的属性 propertyKey 的值为 value，等同于给对象的属性赋值
- `Reflect.get(target, propertyKey)`: 读取对象 target 的属性 propertyKey，等同于读取对象的属性值
- `Reflect.apply(target, thisArgument, argumentsList)`：调用一个指定的函数，并绑定 this 和参数列表。等同于函数调用
- `Reflect.deleteProperty(target, propertyKey)`：删除一个对象的属性
- `Reflect.defineProperty(target, propertyKey, attributes)`：类似于 Object.defineProperty，不同的是如果配置出现问题，返回 false 而不是报错
- `Reflect.construct(target, argumentsList)`：用构造函数的方式创建一个对象
- `Reflect.has(target, propertyKey)`: 判断一个对象是否拥有一个属性
- [其他 API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## `Proxy` 代理

代理：提供了修改底层实现的方式

````js
//代理一个目标对象
//target：目标对象
//handler：是一个普通对象，其中可以重写底层实现
//返回一个代理对象
new Proxy(target, handler)```
````

```js
const obj = {
  a: 1,
  b: 2,
};

const proxy = new Proxy(obj, {
  set(target, propertyKey, value) {
    // console.log(target, propertyKey, value);
    // target[propertyKey] = value;
    Reflect.set(target, propertyKey, value);
  },
  get(target, propertyKey) {
    if (Reflect.has(target, propertyKey)) {
      return Reflect.get(target, propertyKey);
    } else {
      return -1;
    }
  },
  has(target, propertyKey) {
    return false;
  },
});
// console.log(proxy);
// proxy.a = 10;
// console.log(proxy.a);

console.log(proxy.d);
console.log('a' in proxy);
```

## 观察者模式

观察者模式：当一个对象的状态发生变化时，所有依赖于它的对象都会得到通知

```js
//观察者模式
//观察者：订阅者
//被观察者：发布者
//发布者：通知观察者
//观察者：更新

//观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  update(state) {
    console.log(`${this.name} 更新了，状态是 ${state}`);
  }
}

//被观察者
class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update(this.getState());
    });
  }
  attach(observer) {
    this.observers.push(observer);
  }
}

//测试
const sub = new Subject();
const ob1 = new Observer('ob1');
const ob2 = new Observer('ob2');
const ob3 = new Observer('ob3');

sub.attach(ob1);
sub.attach(ob2);
sub.attach(ob3);

sub.setState(1);
sub.setState(2);
```

```js
// es5-创建一个观察者
function observer(target) {
  const div = document.getElementById('container');
  const ob = {};
  const props = Object.keys(target);
  for (const prop of props) {
    Object.defineProperty(ob, prop, {
      get() {
        return target[prop];
      },
      set(val) {
        target[prop] = val;
        render();
      },
      enumerable: true,
    });
  }
  render();

  function render() {
    let html = '';
    for (const prop of Object.keys(ob)) {
      html += `
                        <p><span>${prop}：</span><span>${ob[prop]}</span></p>
                    `;
    }
    div.innerHTML = html;
  }

  return ob;
}
const target = {
  a: 1,
  b: 2,
};
const obj = observer(target);
```

```js
// es6-创建一个观察者
function observer(target) {
  const div = document.getElementById('container');
  const proxy = new Proxy(target, {
    set(target, prop, value) {
      Reflect.set(target, prop, value);
      render();
    },
    get(target, prop) {
      return Reflect.get(target, prop);
    },
  });
  render();

  function render() {
    let html = '';
    for (const prop of Object.keys(target)) {
      html += `
                        <p><span>${prop}：</span><span>${target[prop]}</span></p>
                    `;
    }
    div.innerHTML = html;
  }

  return proxy;
}
const target = {
  a: 1,
  b: 2,
};
const obj = observer(target);
```

## 利用代理，实现构造函数偷懒

```js
class User {
  // constructor(firstName, lastName, age) {
  //     // 这一段内容能不能优化掉？
  //     this.firstName = firstName;
  //     this.lastName = lastName;
  //     this.age = age;
  // }
}

function ConstructorProxy(Class, ...propNames) {
  return new Proxy(Class, {
    construct(target, argumentsList) {
      const obj = Reflect.construct(target, argumentsList);
      propNames.forEach((name, i) => {
        obj[name] = argumentsList[i];
      });
      return obj;
    },
  });
}

const UserProxy = ConstructorProxy(User, 'firstName', 'lastName', 'age');

const obj = new UserProxy('袁', '进', 18);
console.log(obj);

class Monster {}

const MonsterProxy = ConstructorProxy(Monster, 'attack', 'defence', 'hp', 'rate', 'name');

const m = new MonsterProxy(10, 20, 100, 30, '怪物');
console.log(m);
```

## 利用代理，实现函数参数验证

```js
function sum(a, b) {
  return a + b;
}

function validatorFunction(func, ...types) {
  const proxy = new Proxy(func, {
    apply(target, thisArgument, argumentsList) {
      types.forEach((t, i) => {
        const arg = argumentsList[i];
        if (typeof arg !== t) {
          throw new TypeError(`第${i + 1}个参数${argumentsList[i]}不满足类型${t}`);
        }
      });
      return Reflect.apply(target, thisArgument, argumentsList);
    },
  });
  return proxy;
}

const sumProxy = validatorFunction(sum, 'number', 'number');
console.log(sumProxy(1, 2));
```
