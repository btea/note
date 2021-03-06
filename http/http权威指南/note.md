MIME(Multipurpose Internet Mail Extension，多用途因特网邮件扩展)类型是一种文本标记，表示一种主要的对象和一个特定的子类型，中间由一条斜杠来分隔。  
* HTML格式的文本文档由text/html来标记。  
* 普通的ASCII文本文档由text/plain类型来标记。  
* JPEG格式的图片为image/jpeg类型。  
* GIF格式的图片为image/gif类型。  
* Apple的QuickTime电影为video/quicktime类型。  
* 微软的PowerPoint演示文件为application/vnd.ms-powerpoint类型。  

HTTP报文包含以下三部分：  
* 起始行  
报文的第一行就是起始行，在请求报文中用来说明要做些什么，在响应报文中说明出现了什么情况。  
* 首部字段  
起始行后面有零个或者多个首部字段。每个首部字段都包含一个名字和一个值，为了便于解析，两者之间用冒号（:）来分隔。首部以一个空行结束。添加一个首部字段和添加新行一样简单。  
* 主体   
空行之后就是可选的报文主体了，其中包含了所有类型的数据。请求主体中包含了要发送给web服务器的数据；响应主体中装载了要返回给客户端的数据。起始行和首部都是文本形式且都是结构化的，而主体则不同，主体中可以包含任意的二进制数据（比如图片、视屏、音轨、软件程序）。当然，主体中也可以包含文本。  


## 连接  
报文时如何通过传输控制协议（Transmission Control Protocol，TCP）连接从一个地方搬移到另一个地方去的。  
### TCP/IP  
HTTP是个应用层协议。HTTP无需操心网络通信的具体细节；它把互联网的细节都交给了通用、可靠的因特网传输协议TCP/IP。  
TCP提供了：  
* 无差错的数据传输；  
* 按序传输（数据总是会按照发送的顺序达到）；  
* 未分段的数据流（可以在任意时刻以任意尺寸将数据发送出去）。  
因特网本身就是基于TCP/IP的，TCP/IP是全世界的计算机和网络设备常用的层次化分组交换网络协议集。TCP/IP隐藏了各种网络和硬件的特点及弱点，使各种类型的计算机和网络都能够进行可靠的通信。  
只要建立了TCP连接，客户端和服务器之间的报文交换就不会丢失、不会被破坏，也不会在接收时出现错序了。  
用网络术语来说，HTTP协议位于TCP的上层。HTTP使用TCP来传输其报文数据。  
### 连接、IP地址及端口号  
在HTTP客户端向服务器发送报文之前，需要用网际协议（Internet Protocol，IP）地址和端口号在客户端和服务器之间建立一条TCP/IP连接。  
建立一条TCP连接的过程与给公司办公室的某个人打电话的过程类似。首先，要拨打公司的电话号码。这样就能进入正确的机构了。其次，拨打要联系的那个人的分机号。  
在TCP中，你需要知道服务器的IP地址，以及与服务器上运行的特定软件相关的TCP端口号。  
连接步骤：  
1、浏览器从URL中解析出服务器的主机名；  
2、浏览器将服务器的主机名转换成服务器的IP地址；  
3、浏览器将端口号（如果有的话）从URL中解析出来；  
4、浏览器建立一条与web服务器的TCP连接；  
5、浏览器向服务器发送一条HTTP请求报文；  
6、服务器向浏览器回送一条HTTP响应报文；  
7、关闭连接，浏览器显示文档。  
### 一个使用Telnet的实例  
由于HTTP使用了TCP/IP传输协议，而且它是基于文本的，没有使用那些难以理解的二进制格式，因此很容易直接与web服务器进行对话。  
Telnet程序可以将键盘连接到某个目标TCP端口，并将此TCP端口的输出回送到显示屏上。Telnet常用于远程终端会话，但它几乎可以连接所有的TCP服务器，包括HTTP服务器。  
可以通过Telnet程序直接与Web服务器进行对话。通过Telnet可以打开一条到某台机器上某个端口的TCP连接，然后直接向那个端口输入一些字符。Web服务器会将 Telnet程序作为一个Web客户端来处理，所有回送给TCP连接的数据都会显示在屏幕上。  
### TCP连接  
TCP连接是通过4个值来识别的：  
*源IP地址、源端口号、目的IP地址、目的端口号*  
这4个值一起地定义了一条连接。两条不同的TCP连接不能拥有4个完全不同的地址组件值（但不同连接的部分组件可以拥有相同的值）。  

HTTP2
服务端推送
多路复用
请求伪头
伪头部字段是http2内置的几个特殊的以":"开头的key，用于替代HTTP/1.x中的请求行/响应行中信息，比如请求方法，响应状态码等。
* :method 目标URL模式部分（请求）  
* :scheme 目标URL模式部分（请求）
* :authority 目标URL认证部分（请求） 
* :path 目标URL的路径和查询部分（绝对路径产生式和一个跟着"?"字符的查询产生式）。  
* :status 响应头中的HTTP状态码部分  

HTTP3
HTTP-over-QUIC  

解决队首阻塞 
waterfall
数据包通过UDP传送，一个包发送失败，只要重传一个小包  


反向代理的用途  
加密和SSL加速  
负载均衡  
缓存静态内容  
压缩  
减速上传  
安全  
外网发布  