### [XMLHttpRequest标准说明文档](https://xhr.spec.whatwg.org/)  
[fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)  

***Ajax(Asynchronous JavaScript + XML)，能够向服务器请求额外的数据，而无需卸载页面。***   
Ajax技术的核心是`XMLHttpRequest`对象（简称XHR），这是由微软首先引入的一个特性，其他浏览器提供商后来都提提供了相同的实现。在XHR出现之前，Ajax式的通信必须借助一些 hack手段来实现，大多数是使用隐藏的框架或内嵌框架。XHR为向服务器发送请求和解析服务器响应提供了流畅的接口。能够以异步方式从服务器取得更多信息，意味着用户单击后，可以不必刷新页面也能取得新数据。也就是说，可以使用XHR对象取得新数据，然后再通过 DOM 将新数据插入到页面中。另外，虽然名字中包含XML的成分，但Ajax通信与数据格式无关；这种技术就是无须刷新页面即可从服务器取得数据，但不一定是 XML数据。  

### XHR的用法  
在使用XHR对象时，要调用第一个方法是`open()`,它接收 3 个参数：要发送的请求类型/方法('get'、'post'等)、请求的URL和表示是否异步的布尔值。
>注：一是URL相对于执行代码的当前页面（当然也可以使用相对路径）；二是调用open()方法并不会真正发送请求，而只是启动一个请求准备发送。    

要发送特定的请求，必需调用`send()`方法：  
```javascript
xhr.open('get', 'example.txt', false);
xhr.send(null)
```
`send()`方法接收一个参数，即要作为请求主体发送的数据。如果不需要通过请求主体发送数据，则必须传入null，因为这个参数对于浏览器来说是必需的。调用`send()`之后，请求就会被分派到服务器。  
由于这次请求是同步的，JavaScript代码会等到服务器响应之后再继续执行。在收到响应之后，响应的数据会自动填充XHR对象的属性，相关属性简介如下：  
* responseText: 作为响应主体被返回的文本。  
* responseXML: 如果响应的内容类型是`"text/xml"`或`"application/xml"`,这个属性中将保存包含着响应数据的XML DOM文档。  
* status: 响应的HTTP状态。  
* statusText: HTTP状态的说明。  

XHR对象的`readyState`属性，该属性表示请求/响应过程的当前活动阶段。这个属性可取的值如下：  
0：未初始化。尚未调用`open()`方法。  
1：启动。已经调用`open()`方法，当尚未调用`send()`方法。  
2：发送。已经调用`send()`方法，但尚未接收到响应。  
3：接收。已经接收到部分响应数据。  
4：完成。已经接收到全部响应数据，而且已经可以在客户端使用。  
只要readyState属性的值由一个值变成另一个值，都会触发一次`readystatechange事件`。可以利用这个事件来检测每次状态变化后`readyState`的值。通常，我们只对`readyState`的值为`4`的阶段感兴趣，因为此时所有数据都已经就绪。不过，在调用`open()`之前指定`onreadystatechange`事件处理程序才能确保跨浏览器兼容性。  
在接收到响应之前可以调用`abort()`方法来取消异步请求，如下所示：  
`xhr.abort();`  
调用这个方法后，XHR 对象会停止触发事件，而且也不再允许访问任何与响应有关的对象属性。在终止请求之后，还应该对 XHR对象进行解引用操作。由于内存原因，不建议重用 XHR 对象。 
### HTTP头部信息  
使用`setRequestHeader()`方法可以设置自定义的请求头部信息。这个方法接受两个参数：头部字段的名称和头部字段的值。要成功发送请求头部信息，必须在调用`open()`方法之后且调用`send()`方法之前调用`setRequestHeader()`。  
调用 XHR 对象的`getResponseHeader()`方法并传入头部字段名称，可以取得相应的响应头部信 息。而调用`getAllResponseHeaders()`方法则可以取得一个包含所有头部信息的长字符串。  
### GET请求  
GET 是常见的请求类型，常用于向服务器查询某些信息。必要时，可以将查询字符串参数追加到URL的末尾，以便将信息发送给服务器。对 XHR而言，位于传入 open()方法的 URL末尾的查询字 符串必须经过正确的编码才行。  
使用 GET 请求经常会发生的一个错误，就是查询字符串的格式有问题。查询字符串中每个参数的名 称和值都必须使用 `encodeURIComponent()`进行编码，然后才能放到 URL 的末尾；而且所有名-值对 儿都必须由和号（&）分隔。  

### XMLHttpRequest 2级  
鉴于 XHR 已经得到广泛接受，成为了事实标准，W3C 也着手制定相应的标准以规范其行为。 XMLHttpRequest 1级只是把已有的 XHR对象的实现细节描述了出来。而 XMLHttpRequest 2级则进一步发展了XHR。并非所有浏览器都完整地实现了XMLHttpRequest 2级规范，但所有浏览器都实现了它规定的部分内容。  
### FormData   
```javascript
var data = new FormData()
data.append('name', 'Echo')
```
使用 FormData 的方便之处体现在不必明确地在 XHR 对象上设置请求头部。XHR对象能够识别传 入的数据类型是 FormData 的实例，并配置适当的头部信息。  
### 超时设定  
IE8 为 XHR 对象添加了一个 timeout 属性，表示请求在等待响应多少毫秒之后就终止。在给 timeout 设置一个数值后，如果在规定的时间内浏览器还没有接收到响应，那么就会触发 timeout 事 件，进而会调用 ontimeout 事件处理程序。这项功能后来也被收入了 XMLHttpRequest 2级规范中。  
```javascript
var xhr = createXHR(); 
xhr.onreadystatechange = function(){     
    if (xhr.readyState == 4){         
        try {             
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                alert(xhr.responseText);             
            } else {                 
                alert("Request was unsuccessful: " + xhr.status);             
            }         
        } catch (ex){             
            //假设由 ontimeout 事件处理程序处理         
        }     
    } 
}; 
xhr.open("get", "timeout.php", true); 
xhr.timeout = 1000; //将超时设置为 1 秒钟（仅适用于 IE8+） 
xhr.ontimeout = function(){     
    alert("Request did not return in a second.");
}
xhr.send(null) 
``` 
这个例子示范了如何使用`timeout`属性。将这个属性设置为 1000毫秒，意味着如果请求在 1秒钟 内还没有返回，就会自动终止。请求终止时，会调用`ontimeout`事件处理程序。但此时`readyState`可能已经改变为`4`了，这意味着会调用`onreadystatechange`事件处理程序。可是，如果在超时终止 请求之后再访问`status`属性，就会导致错误。为避免浏览器报告错误，可以将检查`status`属性的语句封装在一个try-catch语句当中。  
### overrideMimeType()方法  
Firefox早引入了 overrideMimeType()方法，用于重写 XHR响应的 MIME 类型。这个方法后来也被纳入了 XMLHttpRequest 2级规范。因为返回响应的 MIME类型决定了 XHR对象如何处理它，所 以提供一种方法能够重写服务器返回的MIME类型是很有用的。 比如，服务器返回的 MIME类型是 text/plain，但数据中实际包含的是 XML。根据 MIME类型， 即使数据是 XML，responseXML 属性中仍然是null。通过调用 overrideMimeType()方法，可以保证把响应当作 XML而非纯文本来处理。   
```javascript
var xhr = createXHR(); 
xhr.open("get", "text.php", true); 
xhr.overrideMimeType("text/xml"); 
xhr.send(null); 
```  
### load事件  
FireFox在实现XHR对象的某个版本时，曾致力于简化异步交互模型。最终，FireFox实现中引入了`load`事件，用以替代`readystatechange`事件。响应接收完毕后将触发`load`事件，因此也就没有必要去检查`readyState`属性。而`onload`事件处理程序会接收到一个`event`对象，其`target`属性就指向 XHR 对象实例，因此可以访问到 XHR 对象的所有方法和属性。然而，并非所有浏览器都为这个事件实现了适当的事件对象。结果，开发人员还是要被迫使用 XHR 对象变量。  
```javascript
var xhr = new XMLHttpRequest()
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        console.log(xhr.responseText)
    } else {
        console.log('request was unsuccessful: ' + xhr.status)
    }
}
xhr.onerror = function(err) {
    throw Error(err)
};
xhr.open('get', 'a.php', true);
xhr.send(null)
```
只要浏览器接收到服务器的响应，不管其状态如何，都会触发`load`事件。而这意味着你必须要检查`status`属性，才能确定数据是否真的已经可用了。  

### progress事件  
Mozilla对 XHR的另一个革新是添加了`progress`事件，这个事件会在浏览器接收新数据期间周期性地触发。而`onprogress`事件处理程序会接收到一个`event`对象，其`target`属性是 XHR 对象，但包含着三个额外的属性：`lengthComputable`、`position` 和 `totalSize`。其中，`lengthComputable`是一个表示进度信息是否可用的布尔值，`position`表示已经接收的字节数，`totalSize`表示根据`Content-Length`响应头部确定的预期字节数。有了这些信息，我们就可以为用户创建一个进度指示器了。  
### 跨域资源共享  
通过 XHR 实现Ajax通信的一个主要限制，来源于跨域安全策略。默认情况下，XHR 对象只能访 问与包含它的页面位于同一个域中的资源。这种安全策略可以预防某些恶意行为。但是，实现合理的跨域请求对开发某些浏览器应用程序也是至关重要的。  
`CORS`（`Cross-Origin Resource Sharing`，跨源资源共享）是 W3C的一个工作草案，定义了在必须访 问跨源资源时，浏览器与服务器应该如何沟通。CORS背后的基本思想，就是使用自定义的 HTTP头部 让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。  
