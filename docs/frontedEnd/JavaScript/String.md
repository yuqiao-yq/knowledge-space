---
title: 字符串
order: 4
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

String 类型是字符串的对象包装类型，可以像下面这样使用 String 构造函数来创建。

```js
var stringObject = new String('hello world');
```

## 1. 字符方法

### `charAt()`和 `charCodeAt()`

两个用于访问字符串中特定字符的方法是：`charAt()`和 `charCodeAt()`。这两个方法都接收一个参数，即字符位置。

`charAt()`方法以单字符字符串的形式返回给定位置的那个字符;

`charCodeAt()`返回给定位置的字符编码

```js
var stringValue = "hello world";
alert(stringValue.charAt(1));   //"e"
// 字符串"hello world"位置1处的字符是"e"，因此调用charAt(1)就返回了"e"。

如果你想得到的不是字符而是字符编码，那么就要使用charCodeAt()了。

var stringValue = "hello world";
alert(stringValue.charCodeAt(1));   //输出"101"
// 这个例子输出的是"101"，也就是小写字母"e"的字符编码。
```

ECMAScript 5 还定义了另一个访问个别字符的方法。在支持浏览器中，可以使用 `方括号加数字索引`来访问字符串中的特定字符，如下面的例子所示。

```js
var stringValue = 'hello world';
alert(stringValue[1]); //"e"
// 使用方括号表示法访问个别字符的语法得到了IE8及Firefox、Safari、Chrome和Opera所有版本的支持。如果是在IE7及更早版本中使用这种语法，会返回undefined值（尽管根本不是特殊的undefined值）
```

## 2. 字符串操作方法

### 字符串的拼接

`concat()`，用于将一或多个字符串拼接起来，返回拼接得到的新字符串。

```js
var stringValue = "hello ";
var result = stringValue.concat("world");
alert(result);             //"hello world"
alert(stringValue);        //"hello"
// 在这个例子中，通过stringValue调用concat()方法返回的结果是"hello world"——但stringValue的值则保持不变。实际上，concat()方法可以接受任意多个参数，也就是说可以通过它拼接任意多个字符串。

再看一个例子：

var stringValue = "hello ";
var result = stringValue.concat("world", "!");

alert(result);             //"hello world!"
alert(stringValue);        //"hello"
// 这个例子将"world"和"!"拼接到了"hello"的末尾。

/ 虽然concat()是专门用来拼接字符串的方法，但实践中使用更多的还是加号操作符（+）。而且，使用加号操作符在大多数情况下都比使用concat()方法要简便易行（特别是在拼接多个字符串的情况下）
```

### 字符串的截取 `slice()`、`substr()`和 `substring()`

这三个方法都会返回被操作字符串的一个子字符串(创建新字符串)，而且也都接受 1 或 2 个参数。**第一个参数指定子字符串的开始位置**，**第二个参数（在指定的情况下）表示子字符串到哪里结束**。

`slice()`和 `substring()`的第二个参数指定的是子字符串最后一个字符后面的位置（即：不包括第二个参数值所在的位置）。

`substr()`的第二个参数指定的则是返回的字符个数。

如果没有给这些方法传递第二个参数，则将字符串的长度作为结束位置。

与 `concat()`方法一样，`slice()`、`substr()`和 `substring()`也不会修改字符串本身的值——它们只是返回一个基本类型的字符串值，**对原始字符串没有任何影响**。

```js
var stringValue = 'hello world';
alert(stringValue.slice(3)); //"lo world"
alert(stringValue.substring(3)); //"lo world"
alert(stringValue.substr(3)); //"lo world"

alert(stringValue.slice(3, 7)); //"lo w"
alert(stringValue.substring(3, 7)); //"lo w"
alert(stringValue.substr(3, 7)); //"lo worl"

// 这个例子比较了以相同方式调用slice()、substr()和substring()得到的结果，而且多数情况下的结果是相同的。在只指定一个参数3的情况下，这三个方法都返回"lo world"，因为"hello"中的第二个"l"处于位置3。而在指定两个参数3和7的情况下，slice()和substring()返回"lo w"（"world"中的"o"处于位置7，因此结果中不包含"o"），但substr()返回"lo worl"，因为它的第二个参数指定的是要返回的字符个数。
```

**区别**：

在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。

`slice()`方法会将传入的负值与字符串的长度相加，

`substr()`方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为 0。

`substring()`方法会把所有负值参数都转换为 0。

```js
var stringValue = 'hello world';
alert(stringValue.slice(-3)); //"rld"
alert(stringValue.substring(-3)); //"hello world"
alert(stringValue.substr(-3)); //"rld"

alert(stringValue.slice(3, -4)); //"lo w"
alert(stringValue.substring(3, -4)); //"hel"
alert(stringValue.substr(3, -4)); //""（空字符串）

// 这个例子清晰地展示了上述三个方法之间的不同行为。在给slice()和substr()传递一个负值参数时，它们的行为相同。这是因为-3会被转换为8（字符串长度加参数11+(-3)=8），实际上相当于调用了slice(8)和substr(8)。但substring()方法则返回了全部字符串，因为它将-3转换成了0。

// 当第二个参数是负值时，这三个方法的行为各不相同。slice()方法会把第二个参数转换为7，这就相当于调用了slice(3,7)，因此返回"lo w"。substring()方法会把第二个参数转换为0，使调用变成了substring(3,0)，而由于这个方法会将较小的数作为开始位置，将较大的数作为结束位置，因此最终相当于调用了substring(0,3)。substr()也会将第二个参数转换为0，这也就意味着返回包含零个字符的字符串，也就是一个空字符串。
```

### 字符串的拆分 `split()`

```js
let str = '1-2-3-4-5';
let arr = str.split('-');
console.log(arr); //返回一个数组['1','2','3','4','5']
```

### js 中字符串的替换

`replace`

在 js 中字符串全部替换可以用以下方法：

**两种区别：正则&常规**

**str.replace("需要替换的字符串"，"新字符串")**

**str.replace(/需要替换的字符串/g，"新字符串")**

> 在 js 中字符串是固定不变的，类似 `replace()`和 `toUpperCase()`的方法都返回新字符串，但原字符串本身并没有发生改变

## 3. 字符串位置方法

有两个可以从字符串中查找子字符串的方法：`indexOf()`和 `lastIndexOf()`。这两个方法都是从一个字符串中搜索给定的子字符串，然后返子字符串的位置（如果没有找到该子字符串，则返回-1）。这两个方法的区别在于：indexOf() 方法从字符串的开头向后搜索子字符串，而 lastIndexOf() 方法是从字符串的末尾向前搜索子字符串。

```js
var stringValue = "hello world";
alert(stringValue.indexOf("o"));             //4
alert(stringValue.lastIndexOf("o"));         //7

// 子字符串"o"第一次出现的位置是4，即"hello"中的"o"；最后一次出现的位置是7，即"world"中的"o"。如果"o"在这个字符串中仅出现了一次，那么indexOf()和lastIndexOf()会返回相同的位置值。

这两个方法都可以接收可选的第二个参数，表示从字符串中的哪个位置开始搜索。换句话说，indexOf()会从该参数指定的位置向后搜索，忽略该位置之前的所有字符；而lastIndexOf()则会从指定的位置向前搜索，忽略该位置之后的所有字符。

var stringValue = "hello world";
alert(stringValue.indexOf("o", 6));          //7
alert(stringValue.lastIndexOf("o", 6));      //4
// 在将第二个参数6传递给这两个方法之后，得到了与前面例子相反的结果。这一次，由于indexOf()是从位置6（字母"w"）开始向后搜索，结果在位置7找到了"o"，因此它返回7。而lastIndexOf()是从位置6开始向前搜索。结果找到了"hello"中的"o"，因此它返回4。在使用第二个参数的情况下，可以通过循环调用indexOf()或lastIndexOf()来找到所有匹配的子字符串，如下面的例子所示：


var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = new Array();
var pos = stringValue.indexOf("e");

while(pos > -1){
    positions.push(pos);
    pos = stringValue.indexOf("e", pos + 1);
}

alert(positions);    //"3,24,32,35,52"

// 这个例子通过不断增加indexOf()方法开始查找的位置，遍历了一个长字符串。在循环之外，首先找到了"e"在字符串中的初始位置；而进入循环后，则每次都给indexOf()传递上一次的位置加1。这样，就确保了每次新搜索都从上一次找到的子字符串的后面开始。每次搜索返回的位置依次被保存在数组positions中，以便将来使用。
```

## 4. `trim()`方法

`trim()`方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。

```js
var stringValue = "   hello world   ";
var trimmedStringValue = stringValue.trim();
alert(stringValue);            //"   hello world   "
alert(trimmedStringValue);     //"hello world"

由于trim()返回的是字符串的副本，所以原始字符串中的前置及后缀空格会保持不变。支持这个方法的浏览器有IE9+、Firefox 3.5+、Safari 5+、Opera 10.5+和Chrome。此外，Firefox 3.5+、Safari 5+和Chrome 8+还支持非标准的trimLeft()和trimRight()方法，分别用于删除字符串开头和末尾的空格。
```

## 5. 字符串大小写转换方法

ECMAScript 中涉及字符串大小写转换的方法有 4 个：`toLowerCase()`、`toLocaleLowerCase()`、`toUpperCase()`和 `toLocaleUpperCase()`。

`toLowerCase()`和 `toUpperCase()`是两个经典的方法，借鉴自 java.lang.String 中的同名方法。

`toLocaleLowerCase()`和 `toLocaleUpperCase()`方法则是针对特定地区的实现。对有些地区来说，针对地区的方法与其通用方法得到的结果相同，但少数语言（如土耳其语）会为 Unicode 大小写转换应用特殊的规则，这时候就必须使用针对地区的方法来保证实现正确的转换。

```js
var stringValue = 'hello world';
alert(stringValue.toLocaleUpperCase()); //"HELLO WORLD"
alert(stringValue.toUpperCase()); //"HELLO WORLD"
alert(stringValue.toLocaleLowerCase()); //"hello world"
alert(stringValue.toLowerCase()); //"hello world"

// 以上代码调用的toLocaleUpperCase()和toUpperCase()都返回了"HELLO WORLD"，就像调用toLocaleLowerCase()和toLowerCase()都返回"hello world"一样。一般来说，在不知道自己的代码将在哪种语言环境中运行的情况下，还是使用针对地区的方法更稳妥一些。
```

## 6. 字符串的模式匹配方法

String 类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是 `match()`，在字符串上调用这个方法，本质上与调用 RegExp 的 exec()方法相同。

`match()`方法只接受一个参数，要么是一个正则表达式，要么是一个 RegExp 对象。

```js
var text = 'cat, bat, sat, fat';
var pattern = /.at/;

//与pattern.exec(text)相同
var matches = text.match(pattern);
alert(matches.index); //0
alert(matches[0]); //"cat"
alert(pattern.lastIndex); //0

// 本例中的match()方法返回了一个数组；如果是调用RegExp对象的exec()方法并传递本例中的字符串作为参数，那么也会得到与此相同的数组：数组的第一项是与整个模式匹配的字符串，之后的每一项（如果有）保存着与正则表达式中的捕获组匹配的字符串。
```

另一个用于查找模式的方法是 `search()`。这个方法的唯一参数与 `match()`方法的参数相同：由字符串或 RegExp 对象指定的一个正则表达式。`search()`方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1。而且，`search()`方法始终是从字符串开头向后查找模式。

```js
var text = 'cat, bat, sat, fat';
var pos = text.search(/at/);
alert(pos); //1

// 这个例子中的search()方法返回1，即"at"在字符串中第一次出现的位置。
```

为了简化替换子字符串的操作，ECMAScript 提供了 `replace()`方法。这个方法接受两个参数：第一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（g）标志

```js
var text = 'cat, bat, sat, fat';
var result = text.replace('at', 'ond');
alert(result); //"cond, bat, sat, fat"

result = text.replace(/at/g, 'ond');
alert(result); //"cond, bond, sond, fond"

// 在这个例子中，首先传入replace()方法的是字符串"at"和替换用的字符串"ond"。替换的结果是把"cat"变成了"cond"，但字符串中的其他字符并没有受到影响。然后，通过将第一个参数修改为带有全局标志的正则表达式，就将全部"at"都替换成了"ond"。
```

如果第二个参数是字符串，那么还可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。

| 字符序列 | 替换文本 |  |
| --- | --- | --- | --- |
| $$ | $ |  |
| $& | 匹配整个模式的子字符串。与 RegExp.lastMatch 的值相同 |  |
| $' | 匹配的子字符串之前的子字符串。与 RegExp.leftContext 的值相同 |  |
| $` | 匹配的子字符串之后的子字符串。与 RegExp.rightContext 的值相同 |  |
| $n | 匹配第 n 个捕获组的子字符串，其中 n 等于 0 ～ 9。例如，$1 是匹配第一个捕获组的子字符串，$2 是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串 |  |  |
| $nn | 匹配第 nn 个捕获组的子字符串，其中 nn 等于 01 ～ 99。例如，$01 是匹配第一个捕获组的子字符串，$02 是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串 |  |  |

通过这些特殊的字符序列，可以使用最近一次匹配结果中的内容

```js
var text = "cat, bat, sat, fat";
result = text.replace(/(.at)/g, "word ($1)");
alert(result);    //word (cat), word (bat), word (sat), word (fat)

在此，每个以"at"结尾的单词都被替换了，替换结果是"word"后跟一对圆括号，而圆括号中是被字符序列$1所替换的单词。
```

`replace()`方法的第二个参数也可以是一个函数。在只有一个匹配项（即与模式匹配的字符串）的情况下，会向这个函数传递 3 个参数：模式的匹配项、模式匹配项在字符串中的位置和原始字符串。在正则表达式中定义了多个捕获组的情况下，传递给函数的参数依次是模式的匹配项、第一个捕获组的匹配项、第二个捕获组的匹配项……，但最后两个参数仍然分别是模式的匹配项在字符串中的位置和原始字符串。这个函数应该返回一个字符串，表示应该被替换的匹配项。使用函数作为 replace()方法的第二个参数可以实现更加精细的替换操作

```js
function htmlEscape(text){
    return text.replace(/[<>"&]/g, function(match, pos, originalText){
        switch(match){
            case "<":
                return "<";
            case ">":
                return ">";
            case "&":
                return "&";
            case "\"":
                return """;
        }
    });
}

alert(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
//<p class="greeting">Hello world!</p>

// 这里，我们为插入HTML代码定义了函数htmlEscape()，这个函数能够转义4个字符：小于号、大于号、和号以及双引号。实现这种转义的最简单方式，就是使用正则表达式查找这几个字符，然后定义一个能够针对每个匹配的字符返回特定HTML实体的函数。
```

最后一个与模式匹配有关的方法是 `split()`，这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以是字符串，也可以是一个 RegExp 对象（这个方法不会将字符串看成正则表达式）。`split()`方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小。

```js
var colorText = "red,blue,green,yellow";
var colors1 = colorText.split(",");          //["red", "blue", "green", "yellow"]
var colors2 = colorText.split(",", 2);       //["red", "blue"]
var colors3 = colorText.split(/[^\,]+/);     //["", ",", ",", ",", ""]

在这个例子中，colorText是逗号分隔的颜色名字符串。基于该字符串调用split(",")会得到一个包含其中颜色名的数组，用于分割字符串的分隔符是逗号。为了将数组截短，让它只包含两项，可以为split()方法传递第二个参数2。最后，通过使用正则表达式，还可以取得包含逗号字符的数组。需要注意的是，在最后一次调用split()返回的数组中，第一项和最后一项是两个空字符串。之所以会这样，是因为通过正则表达式指定的分隔符出现在了字符串的开头（即子字符串"red"）和末尾（即子字符串"yellow"）。
```

## 7. `localeCompare()`方法

与操作字符串有关的最后一个方法是 `localeCompare()`，这个方法比较两个字符串，并返回下列值中的一个：

如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是-1，具体的值要视实现而定）；

如果字符串等于字符串参数，则返回 0；

如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是 1，具体的值同样要视实现而定）。

```js
var stringValue = 'yellow';
alert(stringValue.localeCompare('brick')); //1
alert(stringValue.localeCompare('yellow')); //0
alert(stringValue.localeCompare('zoo')); //-1

// 这个例子比较了字符串"yellow"和另外几个值："brick"、"yellow"和"zoo"。因为"brick"在字母表中排在"yellow"之前，所以localeCompare()返回了1；而"yellow"等于"yellow"，所以localeCompare()返回了0；最后，"zoo"在字母表中排在"yellow"后面，所以localeCompare()返回了-1。
```

`localeCompare()`返回的数值取决于实现

```js
function determineOrder(value) {
  var result = stringValue.localeCompare(value);
  if (result < 0) {
    alert("The string 'yellow' comes before the string '" + value + "'.");
  } else if (result > 0) {
    alert("The string 'yellow' comes after the string '" + value + "'.");
  } else {
    alert("The string 'yellow' is equal to the string '" + value + "'.");
  }
}

determineOrder('brick');
determineOrder('yellow');
determineOrder('zoo');

// 使用这种结构，就可以确保自己的代码在任何实现中都可以正确地运行了。
```

localeCompare()方法比较与众不同的地方，就是实现所支持的地区（国家和语言）决定了这个方法的行为。比如，美国以英语作为 ECMAScript 实现的标准语言，因此 localeCompare()就是区分大小写的，于是大写字母在字母表中排在小写字母前头就成为了一项决定性的比较规则。不过，在其他地区恐怕就不是这种情况了。

## 8. `fromCharCode()`方法

String 构造函数本身还有一个静态方法：`fromCharCode()`。这个方法的任务是接收一或多个字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法 charCodeAt()执行的是相反的操作。

```js
alert(String.fromCharCode(104, 101, 108, 108, 111)); //"hello"

// 在这里，我们给fromCharCode()传递的是字符串"hello"中每个字母的字符编码。
```

## 9. HTML 方法

尽量不使用这些方法，因为它们创建的标记通常无法表达语义

|        方法        |              输出结果               |
| :----------------: | :---------------------------------: |
|  `anchor(name) `   |    `<a name= "name">string</a>`     |
|      `big()`       |         `<big>string</big>`         |
|      `bold()`      |           `<b>string</b>`           |
|     `fixed()`      |          `<tt>string</tt>`          |
| `fontcolor(color)` | `<font color="color">string</font>` |
|  `fontsize(size)`  |  `<font size="size">string</font>`  |
|    `italics()`     |           `<i>string</i>`           |
|    `link(url)`     |     `<a href="url">string</a>`      |
|     `small()`      |       `<small>string</small>`       |
|     `strike()`     |      `<strike>string</strike>`      |
|      `sub()`       |         `<sub>string</sub>`         |
|      `sup()`       |         `<sup>string</sup>`         |

## 10. 字符串转义

String 数据类型包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符，或者具有其他用途的字符。

| 字面量 | 含义 |
| :-- | --- |
| \n | 换行 |
| \t | 制表 |
| \b | 退格 |
| \r | 回车 |
| \f | 进纸 |
| \ \  | 斜杠 |
| \ ' | 单引号（'），在用单引号表示的字符串中使用。例如：'He said,\'hey.\'' |
| \ " | 双引号（"），在用双引号表示的字符串中使用。例如："He said,\"hey.\"" |
| \xnn | 以十六进制代码 nn 表示的一个字符（其中 n 为 0 ～ F）。例如，\x41 表示"A" |
| \unnnn | 以十六进制代码 nnnn 表示的一个 Unicode 字符（其中 n 为 0 ～ F）。例如，\u03a3 表示希腊字符 Σ |

## 11. 转换为字符串

要把一个值转换为一个字符串有两种方式。

第一种是使用几乎每个值都有的 `toString()`方法

```js
var age = 11;
var ageAsString = age.toString();         // 字符串"11"
var found = true;
var foundAsString = found.toString();     // 字符串"true"

多数情况下，调用toString()方法不必传递参数。但是，在调用数值的toString()方法时，可以传递一个参数：输出数值的基数。默认情况下，toString()方法以十进制格式返回数值的字符串表示。而通过传递基数，toString()可以输出以二进制、八进制、十六进制，乃至其他任意有效进制格式表示的字符串值。
var num = 10;
alert(num.toString());          // "10"
alert(num.toString(2));         // "1010"
alert(num.toString(8));         // "12"
alert(num.toString(10));        // "10"
alert(num.toString(16));        // "a"
```

在不知道要转换的值是不是 null 或 undefined 的情况下，还可以使用转型函数 `String()`，这个函数能够将任何类型的值转换为字符串。String()函数遵循下列转换规则：

- 如果值有 toString()方法，则调用该方法（没有参数）并返回相应的结果；
- 如果值是 null，则返回"null"；
- 如果值是 undefined，则返回"undefined"。

```js
var value1 = 10;
var value2 = true;
var value3 = null;
var value4;

alert(String(value1)); // "10"
alert(String(value2)); // "true"
alert(String(value3)); // "null"
alert(String(value4)); // "undefined"
```

## 12. 字符的 Unicode 表示法

ES6 加强了对 **Unicode** 的支持，允许采用 `\uxxxx` 形式表示一个字符，其中 `xxxx`表示字符的 Unicode 码点

```js
'\u0061';
// "a"
```

但是，这种表示法只限于码点在 `\u0000`~`\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

```js
'\uD842\uDFB7';
// "𠮷"
'\u20BB7';
// " 7"
// 上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript 会理解成\u20BB+7。由于\u20BB是一个不可打印字符，所以只会显示一个空格，后面跟着一个7。
```

ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符

```js
'\u{20BB7}';
// "𠮷"
'\u{41}\u{42}\u{43}';
// "ABC"
let hello = 123;
hello; // 123
'\u{1F680}' === '\uD83D\uDE80';
// true
// 最后一个例子表明，大括号表示法与四字节的 UTF-16 编码是等价的
```

有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符

```js
'z' === 'z'; // true
'\172' === 'z'; // true
'\x7A' === 'z'; // true
'\u007A' === 'z'; // true
'\u{7A}' === 'z'; // true
```

## 13. 字符串的遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被 `for...of`循环遍历。

```js
for (let s of 'foo') {
  console.log(s);
}
// "f"
// "o"
// "o"
```

除了遍历字符串，这个遍历器最大的优点是可以识别大于 `0xFFFF`的码点，传统的 `for`循环无法识别这样的码点。

```js
let text = String.fromCodePoint(0x20bb7);
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "
for (let i of text) {
  console.log(i);
}
// "𠮷"
// 上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符
```

## 14. 直接输入 U+2028 和 U+2029

JavaScript 字符串允许直接输入字符，以及输入字符的转义形式。举例来说，“中”的 Unicode 码点是 U+4e2d，你可以直接在字符串里面输入这个汉字，也可以输入它的转义形式 `\u4e2d`，两者是等价的。

```js
'中' === '\u4e2d'; // true
```

但是，JavaScript 规定有 5 个字符，不能在字符串里面直接使用，只能使用转义形式。

- U+005C：反斜杠（reverse solidus)
- U+000D：回车（carriage return）
- U+2028：行分隔符（line separator）
- U+2029：段分隔符（paragraph separator）
- U+000A：换行符（line feed）

举例来说，字符串里面不能直接包含反斜杠，一定要转义写成 `\\`或者 `\u005c`

这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被 `JSON.parse`解析，就有可能直接报错。

```js
const json = '"\u2028"';
JSON.parse(json); // 可能报错
```

JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，[ES2019](https://github.com/tc39/proposal-json-superset) 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。

```js
const PS = eval("'\u2029'");
```

根据这个提案，上面的代码不会报错。

注意，模板字符串现在就允许直接输入这两个字符。另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。

## 15. JSON.stringify() 的改造

根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的 `JSON.stringify()`方法有可能返回不符合 UTF-8 标准的字符串。

具体来说，UTF-8 标准规定，`0xD800`到 `0xDFFF`之间的码点，不能单独使用，必须配对使用。比如，`\uD834\uDF06`是两个码点，但是必须放在一起配对使用，代表字符 `𝌆`。这是为了表示码点大于 `0xFFFF`的字符的一种变通方法。单独使用 `\uD834`和 `\uDFO6`这两个码点是不合法的，或者颠倒顺序也不行，因为 `\uDF06\uD834`并没有对应的字符。

`JSON.stringify()`的问题在于，它可能返回 `0xD800`到 `0xDFFF`之间的单个码点。

```js
JSON.stringify('\u{D834}'); // "\u{D834}"
```

为了确保返回的是合法的 UTF-8 字符，[ES2019](https://github.com/tc39/proposal-well-formed-stringify) 改变了 `JSON.stringify()`的行为。如果遇到 `0xD800`到 `0xDFFF`之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

```js
JSON.stringify('\u{D834}'); // ""\\uD834""
JSON.stringify('\uDF06\uD834'); // ""\\udf06\\ud834""
```

## 16. 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.` // 多行字符串
`In JavaScript this is
 not legal.`;
console.log(`string text line 1
string text line 2`);
// 字符串中嵌入变量
let name = 'Bob',
  time = 'today';
`Hello ${name}, how are you ${time}?`;
```

上面代码中的模板字符串，都是用反引号表示。如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

```js
let greeting = `\`Yo\` World!`;
```

如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。

```js
let x = 1;
let y = 2;
`${x} + ${y} = ${
  x + y
}` // "1 + 2 = 3"
`${x} + ${y * 2} = ${x + y * 2}`;
// "1 + 4 = 5"
let obj = { x: 1, y: 2 };
`${obj.x + obj.y}`;
// "3"
```

模板字符串之中还能调用函数。

```js
function fn() {
  return 'Hello World';
}
`foo ${fn()} bar`;
// foo Hello World bar
```

模板字符串甚至还能嵌套

```js
const tmpl = (addrs) => `
  <table>
  ${addrs
    .map(
      (addr) => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `,
    )
    .join('')}
  </table>
`;

// 上面代码中，模板字符串的变量之中，又嵌入了另一个模板字符串，使用方法如下。
const data = [
  { first: '<Jane>', last: 'Bond' },
  { first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>
```

如果需要引用模板字符串本身，在需要时执行，可以写成函数。

```js
let func = (name) => `Hello ${name}!`;
func('Jack'); // "Hello Jack!"
```

上面代码中，模板字符串写成了一个函数的返回值。执行这个函数，就相当于执行这个模板字符串了。

## 17. ES6 新增方法

### `String.fromCodePoint()`

ES5 提供 `String.fromCharCode()`方法，用于从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于 `0xFFFF`的字符。

```js
String.fromCharCode(0x20bb7);
// "ஷ"
```

上面代码中，`String.fromCharCode()`不能识别大于 `0xFFFF`的码点，所以 `0x20BB7`就发生了溢出，最高位 `2`被舍弃了，最后返回码点 `U+0BB7`对应的字符，而不是码点 `U+20BB7`对应的字符。

ES6 提供了 `String.fromCodePoint()`方法，可以识别大于 `0xFFFF`的字符，弥补了 `String.fromCharCode()`方法的不足。在作用上，正好与下面的 `codePointAt()`方法相反。

```js
String.fromCodePoint(0x20bb7);
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y';
// true
```

上面代码中，如果 `String.fromCodePoint`方法有多个参数，则它们会被合并成一个字符串返回。

注意，`fromCodePoint`方法定义在 `String`对象上，而 `codePointAt`方法定义在字符串的实例对象上。

### `String.raw()`

ES6 还为原生的 String 对象，提供了一个 `raw()`方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

```js
String.raw`Hi\n${2 + 3}!`;
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
```

如果原字符串的斜杠已经转义，那么 `String.raw()`会进行再次转义。

```js
String.raw`Hi\\n`;
// 返回 "Hi\\\\n"
String.raw`Hi\\n` === 'Hi\\\\n'; // true
```

`String.raw()`方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

`String.raw()`本质上是一个正常的函数，只是专用于模板字符串的标签函数。如果写成正常函数的形式，它的第一个参数，应该是一个具有 `raw`属性的对象，且 `raw`属性的值应该是一个数组，对应模板字符串解析后的值。

```js
// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2); // "foo3bar"
```

上面代码中，`String.raw()`方法的第一个参数是一个对象，它的 `raw`属性等同于原始的模板字符串解析后得到的数组。

作为函数，`String.raw()`的代码实现基本如下。

```js
String.raw = function (strings, ...values) {
  let output = '';
  let index;
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }
  output += strings.raw[index];
  return output;
};
```

### 实例方法：`codePointAt()`

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为 `2`个字节。对于那些需要 `4`个字节储存的字符（Unicode 码点大于 `0xFFFF`的字符），JavaScript 会认为它们是两个字符。

```js
var s = '𠮷';
s.length; // 2
s.charAt(0); // ''
s.charAt(1); // ''
s.charCodeAt(0); // 55362
s.charCodeAt(1); // 57271
```

上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是 `0x20BB7`，UTF-16 编码为 `0xD842 0xDFB7`（十进制为 `55362 57271`），需要 `4`个字节储存。对于这种 `4`个字节的字符，JavaScript 不能正确处理，字符串长度会误判为 `2`，而且 `charAt()`方法无法读取整个字符，`charCodeAt()`方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了 `codePointAt()`方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

```js
let s = '𠮷a';
s.codePointAt(0); // 134071
s.codePointAt(1); // 57271
s.codePointAt(2); // 97
```

`codePointAt()`方法的参数，是字符在字符串中的位置（从 0 开始）。上面代码中，JavaScript 将“𠮷 a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的 `20BB7`）。在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，`codePointAt()`方法的结果与 `charCodeAt()`方法相同。

总之，`codePointAt()`方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与 `charCodeAt()`方法相同。

`codePointAt()`方法返回的是码点的十进制值，如果想要十六进制的值，可以使用 `toString()`方法转换一下。

```js
let s = '𠮷a';
s.codePointAt(0).toString(16); // "20bb7"
s.codePointAt(2).toString(16); // "61"
```

你可能注意到了，`codePointAt()`方法的参数，仍然是不正确的。比如，上面代码中，字符 `a`在字符串 `s`的正确位置序号应该是 1，但是必须向 `codePointAt()`方法传入 2。解决这个问题的一个办法是使用 `for...of`循环，因为它会正确识别 32 位的 UTF-16 字符。

```js
let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

另一种方法也可以，使用扩展运算符（`...`）进行展开运算

```js
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach((ch) => console.log(ch.codePointAt(0).toString(16)));
// 20bb7
// 61
```

`codePointAt()`方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xffff;
}
is32Bit('𠮷'); // true
is32Bit('a'); // false
```

### 实例方法：`normalize()`

许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。一种是直接提供带重音符号的字符，比如 `Ǒ`（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如 `O`（\u004F）和 `ˇ`（\u030C）合成 `Ǒ`（\u004F\u030C）。

这两种表示方法，在视觉和语义上都等价，但是 JavaScript 不能识别。

```js
'\u01D1' === '\u004F\u030C'; //false
'\u01D1'.length; // 1
'\u004F\u030C'.length; // 2
// 上面代码表示，JavaScript 将合成字符视为两个字符，导致两种表示方法不相等。
```

ES6 提供字符串实例的 `normalize()`方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。

```js
'\u01D1'.normalize() === '\u004F\u030C'.normalize();
// true
```

`normalize`方法可以接受一个参数来指定 `normalize`的方式，参数的四个可选值如下。

- `NFC`，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
- `NFD`，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
- `NFKC`，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，`normalize`方法不能识别中文。）
- `NFKD`，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

```js
'\u004F\u030C'.normalize('NFC').length; // 1
'\u004F\u030C'.normalize('NFD').length; // 2
```

上面代码表示，`NFC`参数返回字符的合成形式，`NFD`参数返回字符的分解形式。

不过，`normalize`方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过 Unicode 编号区间判断。

### 实例方法：`includes()`, `startsWith()`, `endsWith()`

传统上，JavaScript 只有 `indexOf`方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- **includes()** ：返回布尔值，表示是否找到了参数字符串。
- **startsWith()** ：返回布尔值，表示参数字符串是否在原字符串的头部。
- **endsWith()** ：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = 'Hello world!';
s.startsWith('Hello'); // true
s.endsWith('!'); // true
s.includes('o'); // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```js
let s = 'Hello world!';
s.startsWith('world', 6); // true
s.endsWith('Hello', 5); // true
s.includes('Hello', 6); // false
```

上面代码表示，使用第二个参数 `n`时，`endsWith`的行为与其他两个方法有所不同。它针对前 `n`个字符，而其他两个方法针对从第 `n`个位置直到字符串结束。

### 实例方法：`repeat()`

`repeat`方法返回一个新字符串，表示将原字符串重复 `n`次。

```js
'x'.repeat(3); // "xxx"
'hello'.repeat(2); // "hellohello"
'na'.repeat(0); // ""
```

参数如果是小数，会被取整。

```js
'na'.repeat(2.9); // "nana"
```

如果 `repeat`的参数是负数或者 `Infinity`，会报错。

```js
'na'.repeat(Infinity);
// RangeError
'na'.repeat(-1);
// RangeError
```

但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于 `-0`，`repeat`视同为 0。

```js
'na'.repeat(-0.9); // ""
```

参数 `NaN`等同于 0。

```
'na'.repeat(NaN) // ""
```

如果 `repeat`的参数是字符串，则会先转换成数字。

```js
'na'.repeat('na'); // ""
'na'.repeat('3'); // "nanana"
```

### 实例方法：`padStart()`，`padEnd()`

ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

```js
'x'.padStart(5, 'ab'); // 'ababx'
'x'.padStart(4, 'ab'); // 'abax'
'x'.padEnd(5, 'ab'); // 'xabab'
'x'.padEnd(4, 'ab'); // 'xaba'
```

上面代码中，`padStart()`和 `padEnd()`一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

```js
'xxx'.padStart(2, 'ab'); // 'xxx'
'xxx'.padEnd(2, 'ab'); // 'xxx'
```

如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

```js
'abc'.padStart(10, '0123456789');
// '0123456abc'
```

如果省略第二个参数，默认使用空格补全长度。

```js
'x'.padStart(4); // '   x'
'x'.padEnd(4); // 'x   '
```

`padStart()`的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

```js
'1'.padStart(10, '0'); // "0000000001"
'12'.padStart(10, '0'); // "0000000012"
'123456'.padStart(10, '0'); // "0000123456"
```

另一个用途是提示字符串格式。

```js
'12'.padStart(10, 'YYYY-MM-DD'); // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD'); // "YYYY-09-12"
```

### 实例方法：`trimStart()`，`trimEnd()`

[ES2019](https://github.com/tc39/proposal-string-left-right-trim) 对字符串实例新增了 `trimStart()`和 `trimEnd()`这两个方法。它们的行为与 `trim()`一致，`trimStart()`消除字符串头部的空格，`trimEnd()`消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

```js
const s = '  abc  ';
s.trim(); // "abc"
s.trimStart(); // "abc  "
s.trimEnd(); // "  abc"
```

上面代码中，`trimStart()`只消除头部的空格，保留尾部的空格。`trimEnd()`也是类似行为。

除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

浏览器还部署了额外的两个方法，`trimLeft()`是 `trimStart()`的别名，`trimRight()`是 `trimEnd()`的别名。

### 实例方法：`matchAll()`

`matchAll()`方法返回一个正则表达式在当前字符串的所有匹配，详见 正则表达式
