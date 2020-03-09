## 构建web内容的技术  
在web刚出现时，我们只能浏览那些页面样式简单的内容。如今，web使用各种各样的技术，来呈现丰富多彩的内容。  
### HTML  
#### web页面几乎全由HTML构建  
HTML(HyperText Markup Language，超文本标记语言)是为了发送web上的超文本（HyperText）而开发的标记语言。超文本是一种文档系统，可将文档中任意位置的信息与其他信息（文本或图片）等建立关联，即超链接文本。标记语言是指通过在文档的某部分穿插特别的字符串标签，用来修饰文档的语言。我们把出现在HTML文档内的这种特殊字符串叫做HTML标签（Tag）。  
平时我们浏览的Web页面几乎全是使用HTML写成的。由HTML构成的文档经过浏览器的解析、渲染后，呈现出来的结果就是Web页面。  
#### HTML的版本  
Tim Berners-Lee提出HTTP概念的同时，还提出了HTML原型。1993年在伊利诺伊大学的NCSA（The National Center for Supercomputing Applications，国 家超级计算机应用中心）发布了Mosaic浏览器（世界首个图形界面浏览器程序），而能够被Mosaic解析的HTML，统一标准后即作为HTML 1.0发布。  
HTML5标准不仅解决了浏览器之间的兼容性问题，并且可把文本作为数据对待，更容易复用，动画等效果也变得更生动。时至今日，HTML仍存在较多悬而未决问题。有些浏览器未遵循HTML标准实现，或扩展自用标签等，这都反映了HTML的标准实际上尚未统一这一现状。  
#### 设计应用CSS  
CSS(Cascading Style Sheets，层叠样式表)可以指定如何展现HTML内的各种元素，属于样式表标准之一。即使是相同的HTML文档，通过改变应用的CSS,用浏览器看到的页面外观也会随之改变。CSS的理念就是让文档的结构和设计分离，达到解耦的目的。  
### 动态HTML  
#### 让Web页面动起来的动态HTML  
所谓动态HTML(Dyanmic HTML)，是指使用客户端脚本语言将静态的HTML内容变成动态的技术的总称。鼠标单击点开的新闻、Google Maps等就用到了动态HTML。  
动态HTML技术是通过调用客户端脚本语言JavaScript，实现对HTML的Web页面的动态改造。利用DOM(Document Object Model，文档对象模型)可指定欲发生动态变化的HTML元素。  
#### 更易控制HTML的DOM  
DOM是用以操作HTML文档和XML文档的API(Application Programming Interface，应用编程接口)。使用DOM可以将HTML内的元素当做对象操作，如取出元素内的字符串、改变那个CSS的属性等，使页面的设计发生改变。  
通过调用JavaScript等脚本语言对DOM操作，可以以更为简单的方式控制HTML的改变。  
### Web应用  
#### 通过web提供功能的web应用  
Web应用是指通过web功能提供的应用程序。比如购物网站、网上银行、SNS、BBS、搜索引擎和e-learning等。互联网（Internet）或企业内网（Intranet）上遍布的各式各样的web应用。  
原本应用HTTP协议的Web的机制就是对客户端发来的请求，返回事前准备好的内容。可随着Web越来越普及，仅靠这样的做法已不足以应对所有的需求，更需要引入由程序创建HTML内容的做法。  
类似这种由程序创建的内容称为动态内容，而事先准备好的内容称为静态内容。Web应用则作用于动态内容之上。  
#### 与web服务器及程序协作的CGI   
CGI(Common Gateway Interface，通用网关接口)是指web服务器在接收到客户端发送过来的请求后转发给程序的一组机制。在CGI的作用下，程序会对请求内容做出相应的动作，比如创建HTML等动态内容。  
### 数据的发布格式及语言  
#### 可扩展标记语言  
XML(eXtensible Markup Language，可扩展标记语言)是一种可按应用目标进行扩展的通用标记语言。旨在通过使用XML,使互联网数据共享变得更容易。  
XML和HTML都是从标准通用标记语言SGML（Standard Generalized Markup Language）简化而成。与HTML相比，它对数据的记录方式做了特殊处理。  
XML和HTML一样，使用标签构成树形结构，并且可自定义扩展标签。  
从XML文档中读取数据比起HTML更为简单。由于XML的结构基本上都是用标签分割而成的树形结构，因此通过语法分析器（Parser）的解析功能解析XML结构并取出数据元素，可更容易地对数据进行读取。  
更容易地复用数据使得XML在互联网上被广泛接受。比如，可用在2个不同的应用之间的交换数据格式化。  
#### 发布更新信息的RSS/Atom  
RSS(简单信息聚合，也叫聚合内容)和Atom都是发布新闻或者博客日志等更新信息文档的格式的总称。两者都用到XML。  
RSS有以下版本，名称和编写方式也不相同。  
RSS 0.9(RDF Site Summary)：最初的RSS版本。1993年3月由网景通信公司自行开发用于其门户网站。基础构图创建在初期的RDF规格上。  
RSS 0.91(Rich Site Summary)：在RSS0.9的基础上扩展元素，于1999年7月开发完毕。非RDF规格，使用XML方式编写。  
RSS 1.0(RDF Site Summary)：RSS规格正处于混乱状态。2000年12月由RSS-DEV工作组再次采用RSS0.9中使用的RDF规格发布。  
RSS 2.0(Really Simple Syndication)：非RSS1.0发展路线。增加支持RSS0.91的兼容性，2000年12月由UserLand Software公司开发完成。  
Atom具有以下两种标准。  
Atom供稿格式（Atom Syndication Foramt）：为发布内容而制定的网站消息来源格式，单讲Atom时，就是指此标准。  
Atom出版协定（Atom Publishing Protocol）：为Web上内容的新增或修改而制定的协议。  





