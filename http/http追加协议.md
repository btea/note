## 基于HTTP的功能追加协议  
虽然HTTP协议既简单又便捷，但随着时代的发展，其功能使用上捉襟见肘的疲态已经凸显。  
### 基于HTTP的协议  
在建立HTTP标准规范时，制定者主要想把HTTP当作传输HTML文档的协议。随着时代的发展，web的用途更具多样性，比如演化成在线购物网站、SNS(Social Networking Service，社交网络服务)、企业或组织内部的各种管理工具，等等。  
而这些网站所追求的功能可能通过web应用和脚本程序实现。即使这些功能已经满足需求，在性能上却未必最优，这是因为HTTP协议上的限制以及自身性能有限。  
HTTP功能上的不足可通过创建一套全新的协议来弥补。可是目前基于HTTP的web浏览器的使用环境已遍布全球，因此无法完全抛弃HTTP。有一些新协议的规则是基于HTTP的，并在此基础上添加了新的功能。  
### 消除HTTP瓶颈的SPDY  
Google在2010年发布了SPDY(取自SPeeDY,发音同speedy)，其开发目标旨在解决HTTP的性能瓶颈，缩短web页面的加载时间（50%）。  
#### HTTP的瓶颈  
在Facebook和Twitter等SNS网站上，几乎能够实时观察到海量用户公开发布的内容，这也是一种乐趣。当几百、几千万用户发布内容时，web网站为了保存这些新增内容，在很短的时间内就会发生大量的内容更新。  
为了尽可能实时地显示这些更新内容，服务器一定有内容更新，就需要直接把那些内容反馈到客户端的界面上。虽然看起来挺简单的，但HTTP却无法妥善的处理好这项任务。  
使用HTTP协议探知服务器上是否有内容更新，那就必须频繁地从客户端到服务器端进行确认。如果服务器上没有内容更新，那么就会产生徒劳的通信。  
若想在现有web实现所需的功能，以下这些HTTP标准会成为瓶颈：  
* 一条连接上只能发送一个请求。  
* 请求只能从客户端开始。客户端不可以接受除响应以外的指令。  
* 请求/响应首部未经过压缩就发送。首部信息越多延迟越大。  
* 发送冗余的首部。每次互相发送相同的首部造成的浪费较多。  
* 可任意选择数据压缩格式。非强制压缩发送。  

**Ajax的解决方法**  
Ajax(Asynchronous JavaScript and XML,异步JavaScript与XML技术)是一种有效利用JavaScript和DOM(Document Object Model，文档对象模型)的操作，以达到局部web页面替换加载的异步通信手段。和以前的同步通信相比，由于它只更新一部分页面，响应中传输的数据量会因此而减少，这一优点显而易见。  
Ajax的核心技术是名为XMLHttpRequest的API,通过Javascript脚本语言的调用就能和服务器进行HTTP通信。借由这种手段，就能从已加载完毕的web页面上发起请求，只更新局部的页面。  
而利用Ajax实时地从服务器获取内容，有可能会导致大量请求产生。另外，Ajax仍未解决HTTP协议本身存在的问题。  
**Comet的解决方法**  
一旦服务器端有内容更新了，Comet不会让请求等待，而是直接给客户端返回响应。这是一种通过延迟应答，模拟实现服务器端向客户端推送（Server Push）的功能。 
通常，服务器端接收到请求，在处理完毕后就会立即返回响应，但为了实现推送功能，Comet会先将响应置于挂起状态，当服务器端有内容更新时，再返回该响应。因此，服务器端一旦有更新，就可以立即反馈给客户端。  
内容上虽然可以做到实时更新，但为了保留响应，一次连接的持续时间也变长了。期间，为了维持连接会消耗更多的资源。另外，Comet也仍未解决HTTP协议本身存在的问题。  
**SPDY的目标**  
陆续出现的Ajax和Comet等提高易用性的技术，一定程度上使HTTP得到了改善，但HTTP协议本身的限制也令人有些束手无策。为了进行根本性的改善，需要有一些协议层面上的改动。  
处于持续开发状态中的SPDY协议，正是为了在协议级别消除HTTP所遭遇的瓶颈。  
#### SPDY的设计与功能   
SPDY没有完全改写HTTP协议，而是在TCP/IP的应用层与传输层之间通过新加会话层的形式运作。同时，考虑到安全性问题，SPDY规定通信中使用SSL。  
SPDY以会话层的形式加入，控制对数据的流动，但还是采用HTTP建立通信连接。因此，可照常使用HTTP的GET和POST等方法、Cookie以及HTTP报文等。  
HTTP(应用层层) ——> SPDY(会话层) ——> SSL(表示层) ——> TCP(传输层)  
使用SPDY后，HTTP协议额外获得以下功能：  
**多路复用流**  
通过单一的TCP连接，可以无限制处理多个HTTP请求。所有请求的处理都在一条TCP连接上完成，因此TCP的处理效率得到提高。  
**赋予请求优先级**  
SPDY不仅可以无限制地并发处理请求，还可以给请求逐个分配优先级顺序。这样主要是为了在发送多个请求时，解决因带宽低而导致响应变慢的问题。  
**压缩HTTP首部**  
压缩HTTP请求和响应的首部。这样一来，通信产生的数据包数量和发送的字节数就更少了。  
**推送功能**  
支持服务器主动向客户端发送数据的功能。这样，服务器可直接发送数据，而不必等待客户端的请求。  
**服务器提示功能**  
服务器可以主动提示客户端请求所需的资源。由于在客户端发现资源之前就可以获知资源的存在，因此在资源已缓存的情况下，可以避免发送不必要的请求。  
#### SPDY消除web瓶颈了吗  
希望使用SPDY时，Web的内容端不必做什么特别改动，而Web浏览器及Web服务器都要为对应SPDY做出一定程度上的改动。有好几家Web浏览器已经针对SPDY做出了相应的调整。另外，Web服务器也进行了实验性质的应用，但把该技术导入实际的Web网站却进展不佳。  
因为SPDY基本上只是将单个域名（IP地址）的通信多路复用，所以当一个Web网站上使用多个域名下的资源，改善效果就会受到限制。  
SPDY的确是一种可有效消除HTTP瓶颈的技术，但很多Web网站存在的问题并非仅仅是由HTTP瓶颈所导致。对Web本身的速度提升，还应该从其他可细致钻研的地方入手，比如改善Web内容的编写方式等。  
### 使用浏览器进行全双工通信的WebSocket  
利用Ajax和Comet技术进行通信可以提升web的浏览速度。但问题在于通信若使用HTTP协议，就无法彻底解决瓶颈问题。WebSocket网络技术正是为了解决这些问题而实现的一套新协议及API。  
当时筹划将WebSocket作为HTML5标准的一部分，而现在它却逐渐变成了独立的协议标准。WebSocket通信协议在2011年12月11日，被RFC 6455 - The WebSocket Protocol定为标准。  
#### WebSocket的设计与功能  
WebSocket，即web浏览器与web服务器之间全双工通信标准。其中，WebSocket协议由IETF定为标准，WebSocket API由W3C定为标准。仍在开发中的WebSocket技 术主要是为了解决Ajax和Comet里XMLHttpRequest附带的缺陷所引起的问题。  
#### WebSocket协议  
一旦web服务器与客户端之间建立起WebSocket协议的通信连接，之后所有的通信都依靠这个专用协议进行。通信过程中可互相发送JSON、XML、HTML或图片等任意格式的数据。  
由于是建立在HTTP基础上的协议，因此连接的发起方仍是客户端，而一旦确立WebSocket通信连接，无论服务器还是客户端，任意一方都可直接向对方发送报文。  
WebSocket协议的只要特点：  
**推送功能**  
支持由服务器向客户端推送数据的推送功能。这样，服务器可以直接发送数据，而不必须等待客户端的请求。  
**减少通信量**  
只要建立起WebSocket连接，就希望一直保持连接状态。和HTTP相比，不但每次连接时的总开销减少，而且由于WebSocket的首部信息很小，通信量也相应减少了。  
为了实现WebSocket通信，在HTTP连接建立之后，需要完成一次“握手”(Handshaking)的步骤。  

#### 期盼已久的HTTP/2.0  
目前主流的HTTP/1.1标准，自1999年发布的RFC2616之后再未进行过改订。SPDY和WebSocket等技术纷纷出现，很难断言HTTP/1.1仍是适用于当下的Web的协议。  
**HTTP/2.0的特点**  
HTTP/2.0的目标是改善用户在使用Web时的速度体验。由于基本上都会先通过HTTP/1.1与TCP连接，现在我们以下面的这些协议为基础，探讨一下它们的实现方法。  
* SPDY  
* HTTP Speed + Mobility  
* Network-Friendly HTTP Upgrade  

HTTP Speed + Mobility由微软公司起草，是用于改善并提高移动端通信时的通信速度和性能的标准。它建立在Google公司提出的SPDY和WebSocket的基础之上。  
Networdk-Friendly HTTP Upgrade主要是在移动端通信时改善HTTP性能的标准。  
HTTP/2.0的7项技术及讨论  
HTTP/2.0围绕着主要的7项技术进行讨论，现阶段（2012年8月13日），大都倾向于采用以下协议的技术。但是，讨论仍在持续，所以不能排除会发生重大改变的可能性。  

压缩   |  SPDY、Friendly  
-----------| ---------------  
多路复用    | SPDY  
TLS义务化   | Speed + Mobility  
协商        | Speed + Mobility，Friendly  
客户端拉曳（Client pull）/服务器推送（Server Push） | Speed + Mobility  
流量控制    | SPDY  
WebSocket  | Speed + Mobility  
> 注：HTTP Speed + Mobility简写成Speed + Mobility，NetWork-Friendly HTTP Upgrage简写为Friendly。  

### Web服务器管理文件的WebDAV  
WebDAV(Web-based Distributed Authoring And Versioning，基于万维网的分布式创作和版本控制)是一个可对Web服务器上的内容直接进行文件复制、编辑等操作的分布式文件系统。它作为扩展HTTP/1.1的协议定义在RFC4918。  
除了创建、删除文件等基本功能，它还具备文件创建者管理、文件编辑过程中禁止其他用户内容覆盖的枷锁功能，以及对文件内容修改的版本控制功能。  
使用HTTP/1.1的PUT方法和DELETE方法，就可以对Web服务器上的文件进行创建和删除操作。可是出于安全性及便捷性等考虑，一般不使用。  
#### 扩展HTTP/1.1的webDAV  
针对服务器上的资源，webDAV新增了一些概念。  
**集合（Collection）：**是一种统一管理多个资源的概念。以集合为单位可进行各种操作。也可实现类似集合的集合这样的叠加。  
**资源（Resource）：**把文件或集合称为资源。  
**属性（Property）：**定义资源的属性。定义以“名称=值”的格式执行。  
**锁（Lock）：**把文件设置成无法编辑状态。多人同时编辑时，可以防止在同一时间进行内容写入。  
#### WebDAV内新增的方法及状态码  
WebDAV为实现远程文件管理，向HTTP/1.1中追加了以下这些方法  
PROPFIND：获取属性  
PROPPATCH：修改属性  
MKCOL：创建集合  
COPY：复制资源及属性  
MOVE：移动资源  
LOCK：资源加锁  
UNLOCK：资源解锁  
为配合扩展的方法，状态码也随着扩展。  
102 Processing：可正常处理请求，但目前是处理中状态  
207 Multi-Status：存在多种状态   
422 Unprocessible Entity：格式正确，内容有误  
423 Locked：资源已被加锁  
424 Failed Dependency：处理与某请求关联的请求失败，因此不再维持依赖关系  
507 Insufficient Storage：保存空间不足   
互联网上，使用率最高的当属Web。不管是否具备访问FTP和SSH的权限，一般公司都会开放对Web的访问。Web是基于HTTP协议运作的，因此在构建Web服务器或访问Web站点时，需事先设置防火墙HTTP（80/tcp）和HTTPS（443/tcp）的权限。  
许多公司或组织已设定权限将HTTP作为通信环境，因此无须再修改防火墙的设定。可见HTTP具有导入简单这一大优势。而这也是基于HTTP服务或内容不断增加的原因之一。  














