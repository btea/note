## [JSON(JavaScript Object Notation)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON):  
**JSON**是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 null。它基于JavaScript语法，但与之不同：**JavaScript不是JSON，JSON也你不是JavaScript。**   

## **方法**  
**JSON.parse()**   
解析JSON字符串并返回对应的值，可以额外传入一个转换函数，用来将生成的值和其属性，在返回之前进行某些修改。  
**JSON.stringify()**  
返回与指定值对应的JSON字符串，可以通过额外的参数，控制仅包含某些属性，或者以自定义方法来替换某些key对应的属性值。  



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