### [http权威指南知识点总结](https://github.com/btea/http)  

HTTP(Hyper Text Transfer Protocol)构建在TCP(Transmission Control Protocol)之上。在HTTP早期实现中，每个HTTP请求都要打开一个socket连接。
这样做效率很低，因为一个web页面中的很多HTTP请求都指向同一个服务器。  
持久连接(Persistent Connection)的引入解决了多对一请求服务器导致的socket连接低效性的问题。

