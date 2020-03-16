### Comet
Comet是指一种更高级的Ajax技术（经常有人称为“服务器推送”）。Ajax是一种从页面向服务器请求数据的技术，而Comet则是一种服务器向页面推送数据的技术。Comet能够让信息近乎实时地被推送到页面上，非常适合处理体育赛事和股票报价。  
有两种实现Comet的方式：`长轮询`和`流`。长轮询是传统轮询（也称为短轮询的一个翻版），即浏览器定时向服务器发送请求，看有没有更新的数据。  
长轮询把短轮询颠倒了一下。页面发起一个到服务器的请求，然后服务器一直保持连接打开，直到有数据可发送。发送完数据之后，浏览器关闭连接，随即又发起一个到服务器的新请求。这一过程在页面打开期间一直持续不断。  
无论是短轮询还是长轮询，浏览器都要在接收数据之前，先发起对服务器的连接。两者大的区别在于服务器如何发送数据。短轮询是服务器立即发送响应，无论数据是否有效，而长轮询是等待发送响应。轮询的优势是所有浏览器都支持，因为使用 XHR对象和 setTimeout()就能实现。而你要做的就是决定什么时候发送请求。  
第二种流行的Comet实现是HTTP流。流不同于上述两种轮询，因为它在页面的整个生命周期内只能使用一个HTTP连接。具体来说，就是浏览器向服务器发送一个请求，而服务器保持连接打开，然后周期性的向浏览器发送数据。
### 服务器推送事件  
SSE(Server-Sent Events，服务器推送事件)是围绕只读Comet交互推出的API或者模式。SSE API用于创建到服务器的单向连接，服务器通过这个连接可以发送任意数量的数据。服务器响应的MIME类型必须是 text/event-stream,而且是浏览器中的JavaScript API能解析格式输出。SSE支持短轮询、长轮询和HTTP流，而且能在断开连接时自动确定何时能重连。  