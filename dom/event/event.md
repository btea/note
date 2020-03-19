## 事件机制  
### 事件触发有三个阶段：  
* `window`往事件触发处传播，遇到注册的捕获事件会触发（事件捕获）  
* 播到事件触发处时触发注册的事件（目标阶段）  
* 从事件触发处往`window`传播，遇到注册的冒泡事件会触发（事件冒泡）  

事件触发一般来说会按照上面的顺序进行，但也有特例，*如果给一个`body`中的子节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行*。
> e.html  
### 注册事件  
通常我们使用`addEventListener`注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值`useCapture`参数来说，该参数默认值为`false`，`useCaptuer`决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性：  
* `capture` :布尔值，和`useCapture`作用一样  
* `once`：布尔值，值为`true`时表示该回调只会调用一次，调用后移除监听  
* `passive`：布尔值，设置为`true`时，表示永远不会调用`preventDefault()`。如果`listener`仍然调用了这个函数，客户端会将它忽略并抛出一个控制台警告。  

检测是否支持`passive`
```javascript
var passiveSupported = false;
try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", null, options);
} catch(err) {}
```
如果passiveSupported值为true，则说明支持passive属性设置。  