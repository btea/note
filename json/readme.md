## [JSON(JavaScript Object Notation)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON):  
**JSON**是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 null。它基于JavaScript语法，但与之不同：**JavaScript不是JSON，JSON也你不是JavaScript。**   

## **方法**  
**[JSON.parse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)**   
解析JSON字符串并返回对应的值，可以额外传入一个转换函数，用来将生成的值和其属性，在返回之前进行某些修改。  
**[JSON.stringify()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)**  
返回与指定值对应的JSON字符串，可以通过额外的参数，控制仅包含某些属性，或者以自定义方法来替换某些key对应的属性值。  


### JSON.stringify 语法   
`JSON.stringify(value[, replacer, space])`
#### 参数  
> value 将要序列化成一个JSON字符串的值。  

#### replacer (可选)  
> 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的JSON字符串中；如果该参数为null或者未提供，则对象所有属性都会被序列化。  

#### space (可选)  
> 指定缩进用的空白字符串，用于梅花输出（pretty-print）；如果参数是个数字，它代表有多少空格；上限为10。若该值小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字符，取其前10个字符），该字符串江北作为空格；如果该参数没有提供（或者为null），将没有空格。  

### 描述  
`JSON.stringify()`将值转换为相应的JSON格式：  
* 转换值如果有 toJSON()方法，该方法定义什么值将被序列化。  
* 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。  
* 布尔值、数字、字符串的包装对象在序列化的过程中会自动转换成对应的原始值。  
* `undefined`、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成`null`（出现在数组中时）。函数、undefined被单独转成时，会返回undefined，如`JSON.stringify(function() {})`或`JSON.stringify(undefined)`。  
* 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。  
* 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。  
* Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。  
* NaN 和 Infinity 格式的数值及 null 都会被当做 null。   
* 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。




### JSON.parse 语法  
`JSON.parse(text[, receiver])`  
#### text   
> 要被解析成JavaScript 值的字符串，关于 JSON 的语法格式。  

#### receiver （可选）  
> 转换器，如果传入该参数（函数），可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。  

#### 返回值  
> Object 类型，对应给定 JSON 文本对象/值。  

#### 异常  
> 若传入的字符串不符合 JSON 规范，则会抛出 `SyntaxError` 异常。  






### Polyfill  
```js
if (!window.JSON) {
    window.JSON = {
        parse: function(str) {
            return eval('(' + str + ')')
        },
        stringify: (function() {
            var isArray = Array.isArray || function(arr) {
                return Object.prototype.toString.call(arr) === '[object Array]'
            }
            var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'}
            var escFunc = function (m) {return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1)}
            var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g
            return function stringify(value) {
                if (value === null) {
                    return 'null'
                }
                if (typeof value === 'number') {
                    return isFinite(value) ? value.toString() : 'null'
                }
                if (typeof value === 'boolean') {
                    return value.toString()
                }
                if (typeof value === 'object') {
                    // toJSON方法为Date原型对象上的方法
                    if (typeof value.toJSON === 'function') {
                        return stringify(value.toJSON())
                    }
                    if (isArray(value)) {
                        var s = '[', i = 0;
                        for(; i < value.length; i++) {
                            s += (i ? ',' : '') + stringify(value[i])
                        }
                        s += ']'
                        return s
                    }else {
                        var tmp = []
                        for(var key in value) {
                            if (value.hasOwnProperty(key)) {
                                tmp.push(stringify(key) + ':' + stringify(value[key]))
                            }
                        }
                        return '{' + tmp.join(',') + '}'
                    }
                }
                return '"' + value.toString().replace(escRE, escFunc) + '"'
            }
        })() 
    }
}

```