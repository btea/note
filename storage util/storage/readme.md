Web Storage的两个主要目的：  
* 提供一种在cookie之外存储会话数据的途径；  
* 提供一种存储大量可以跨会话存在的数据的机制。  

最初的Web Storage规范包含了两种对象的定义：sessionStorage 和 localStorage。  
### Storage类型  
Storage类型提供最大的存储空间(因浏览器而异)来存储名值对儿。Storage实例与其他对象类似，有如下方法：  
`clear()`：删除所有值。  
`getItem(name)`：根据指定名字name获取对应的值。  
`key(index)`：获得index位置处的值的名字。  
`removeItem(name)`：删除由name指定的名值对儿。  
`setItem(name, value)`：为指定name设置一个值。  
其中，`getItem()`、`removeItem()`和 `setItem()`方法可以直接调用，也可通过 Storage 对象间 接调用。因为每个项目都是作为属性存储在该对象上的，所以可以通过点语法或者方括号语法访问属性 来读取值，设置也一样，或者通过 delete 操作符进行删除。不过，我们还建议读者使用方法而不是属 性来访问数据，以免某个键会意外重写该对象上已经存在的成员。  
还可以使用 length 属性来判断有多少名值对儿存放在 Storage 对象中。但无法判断对象中所有 数据的大小，不过 IE8提供了一个 remainingSpace 属性，用于获取还可以使用的存储空间的字节数。


 