### 一些关于js的小技巧  

**关于this指向**  
> 在浏览器环境中，全局作用域下，`this`默认指向全局对象 `Window`,如果代码采用了严格模式(`'use strict'`)，则`this`值为 `undefined`。  

*栗子：*  
```js
function fn() {
    console.log(this) // Window
}
fn()

// 严格模式
function fn() {
    'use strict'
    console.log(this) // undefined
}
fn()
```  

*如何让严格模式下，this默认也指向全局对象 Window ？*  
在这里，就需要用到`eval`，`eval`是一个函数，它接收一个字符串做参数，将接收到的字符串当做JavaScript代码进行执行。([详情看这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval))  

看下`eval`的用法：  
```js
eval('var a = 30')
eval('var obj = {name: "tea", age: 18}')

console.log(a);   // 30
console.log(obj); // {name: 'tea', age: 18}
```

尝试一下严格模式下eval的使用：  
```js
function fn() {
    console.log(eval('this'))
}
fn()

function fn() {
    'use strict'
    console.log(eval('this'));
}
fn()
```  
> 我们发现，直接使用`eval`和直接输出`this`效果一致。  
看一下修改之后的用法：  
```js
function fn() {
    'use strict'
    console.log((0, eval)('this'));
}
fn()

function fn() {
    'use strict'
    var e = eval
    console.log(e('this'))
}
fn()
```
经过测试，以上两种写法，函数调用之后打印出来的`this`均为全局对象`Window`。为什么会出现与前面调用的结果不一样，这就涉及到`eval`的直接调用与间接调用，[详情看这里](https://www.cnblogs.com/qianlegeqian/p/3950044.html)。  

对于采用了严格模式的代码，在函数调用时，要保证`this`指向全局`Window`对象，可以借助以下这样一个处理函数来辅助执行：  
```js
function thisDeal(fn) {
    var reg, body, name = fn.name
    reg = /\{([\w\W]+)\}/g
    fn.toString().replace(reg, function($0, $1) {
        body = $1
    })
    if (!body) {
        return
    }
    (function(){
        (0, eval)(body)
    })()
}

function fn() {
    'use strict'
    console.log(this)
}

thisDeal(fn)
```

