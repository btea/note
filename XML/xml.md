### XMLSerializer对象  
**序列化XML文档和节点**  
*构造函数*  
```javascript
new XMLSerializer()
```
*说明*  
`XMLSerializer`对象使你能够把一个`XML`文档或`Node`对象转化或"序列化"为未解析的`XML`标记的一个字符串。  
要使用一个`XMLSerializer`，使用不带参数的构造函数实例化它，然后调用其`serializeToString()`方法：  
```javascript
var text = (new XMLSerializer()).serializeToString(element)  
// element 参数是要序列化的 XML节点，这可能是文档中一个 Document对象或者任何Element
```
// foreignObject
