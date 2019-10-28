### [http权威指南知识点总结](https://github.com/btea/http)  

HTTP(Hyper Text Transfer Protocol)构建在TCP(Transmission Control Protocol)之上。在HTTP早期实现中，每个HTTP请求都要打开一个socket连接。
这样做效率很低，因为一个web页面中的很多HTTP请求都指向同一个服务器。  
持久连接(Persistent Connection)的引入解决了多对一请求服务器导致的socket连接低效性的问题。

#### Expires头
浏览器（和代理）使用缓存来减少http请求的数量，并减少HTTP响应的大小，使web页面加载得更快。web服务器使用Expires头来告诉Web接护短它可以使用一个组件的当前副本，直到指定的时间为止。HTTP规范中简要地称该头尾“在这一日期/时间之后，响应被认为是无效的”。它在HTTP响应中发送。

#### Max-Age和mod_expires
在解决缓存如何很好地改善传输性能之前，需要提及除了Expires头之外的另一种选择。HTTP1.1引入了Cache-Control头来客服Expires头的限制。因为Expires头使用一个特定的时间，它要求服务器和客户端的时钟严格同步。另外，过期日期需要经常检查，并且一旦未来这一天到了，还需要在服务器配置中提供一个新的日期。  
换一种方式，Cache-Control使用max-age指令指定组件间被缓存多久。它以秒为单位定义了一个更新窗。如果从组建被请求开始过去的秒数少于max-age，浏览器就使用缓存的版本，这就避免了额外的HTTP请求。一个长久的max-age头可以将刷新窗设置为未来10年。  
使用带有max-age的Cache-Control可以消除Expires的限制，但对于不支持HTTP1.1的浏览器，你可能仍然希望提供Expires头，你可以同时指定这两个响应头——Expires和Cache-Control max-age。如果两者同时出现，HTTP规范规定max-age指令将重写Expires头，