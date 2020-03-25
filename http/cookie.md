### Cookie的介绍  
作为一段一般不超过4KB的小型文本数据，它由一个名称(Name)，一个值(Value)和其他几个用于控制Cookie有效期、安全性、使用范围的可选属性组成。  
### Cookie的设置  
1、客户端发送 HTTP 请求到服务器  
2、当浏览器接收到HTTP请求时，在响应头里面添加一个Set-Cookie字段  
3、浏览器收到响应后保存下Cookie  
4、之后对该服务器每一次请求中都通过Cookie字段将Cookie信息发送给服务器  
**Name/Value**  
用JavaScript操作Cookie的时候注意对Value进行编码处理。(`encodeURIComponent()`)  
**Expires**  
Expires用于设置Cookie的过期时间。比如：  
```javascript
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
``` 
当Expires属性缺省时，表示是会话性Cookie，默认值值为Session，表示的就是会话性Cookie。当为会话性 Cookie 的时候，值保存在客户端内存中，并在用户关闭浏览器时失效。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。  
与会话性 Cookie 相对的是持久性 Cookie，持久性 Cookies 会保存在用户的硬盘中，直至过期或者清除 Cookie。这里值得注意的是，设定的日期和时间只与客户端相关，而不是服务端。  
**Max-Age**  
Max-Age用于设置在Cookie失效之前需要经过的秒数。比如：  
```javascript
Set-Cookie: id=a3fWa; Max-Age=604800;
```
Max-Age可以为正数、负数、甚至是0。  
如果max-Age属性为正数时，浏览器会将其持久化，即写到对应的Cookie文件中。  
当max-Age属性为负数，则表示该Cookie这是一个会话性Cookie。  
当max-Age为0时，则会立即删除这个Cookie。  
假如Expires和Max-Age都存在时，`Max-Age`优先级更高。  
**Domain**   
Domain指定了Cookie可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但不包含子域名）。  
像淘宝首页设置的 Domain 就是 .http://taobao.com，这样无论是 a.taobao.com 还是 b.taobao.com 都可以使用 Cookie。
在这里注意的是，不能跨域设置 Cookie，比如阿里域名下的页面把 Domain 设置成百度是无效的：  
```javascript
Set-Cookie: qwerty=219ffwef9w0f; Domain=baidu.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT
```  
**Path**  
Path指定了以一个URL路径，这个路径必须出现在要请求的资源路径中才可以发送Cookie首部。比如设置`Path=/docs`,`/docs/web/`下的资源会带Cookie首部，`/test`则不会携带Cookie首部。  
Domain和Path标识共同定义了Cookie的作用域：即Cookie应该发送给哪些URL。  
**Secure属性**  
标记为Secure的Cookie只应通过被HTTPS协议加密过的请求发送给服务端。使用HTTPS安全协议，可以保护Cookie在浏览器和Web服务器间的传输过程中不被窃取和篡改。  
**HTTPOnly**  
设置HTTPOnly属性可以防止客户端脚本通过document.cookie等方式访问Cookie，有助于避免XSS攻击。  
**SameSite**  
SameSite属性可以让Cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。  
> 属性值
SameSite可以有下面三种值：  
1、`Strict`仅允许一方请求携带Cookie，即浏览器将只发送相同站点的Cookie，即当前URL与请求目标URL完全一致。  
2、`Lax`允许部分第三方请求携带Cookie。  
3、`None`无论是否跨站都会发送Cookie。  
之前默认是None，Chrome80后默认是Lax。  
**跨域和跨站**  
首先要理解的一点就是跨站和跨域是不同的。同站(same-site)/跨站(cross-site)和第一方(first-party)/第三方(third-party)是等价的。但是与浏览器同源策略(SOP)中的 同源(same-origin)/跨域(cross-origin) 是完全不同的概念。  

同源策略的同源是指两个URL的协议/主机名/端口一致。例如，taobao.com/pages/...,它的协议是https，主机名是www.taobao.com,端口是443。  

同源策略作为浏览器的安全基石，其「同源」判断是比较严格的，相对而言，Cookie中的「同站」判断就比较宽松：只要两个 URL 的 eTLD+1 相同即可，不需要考虑协议和端口。其中，eTLD 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表（Public Suffix List）中，例如，.com、.http://co.uk、.http://github.io 等。eTLD+1 则表示，有效顶级域名+二级域名，例如 taobao.com 等。  

举几个例子，www.taobao.com 和 www.baidu.com 是跨站，www.a.taobao.com 和 www.b.taobao.com 是同站，a.github.io 和 b.github.io 是跨站(注意是跨站)。  
**同站与跨站**  
理解两个网站是否为"同一个网站"很重要，判断是否同一网站是通过叫`eTLD+1`的方式(`eTLD = effective Top Level Domain`),eTLD定义在上述的Public Suffix List中，+1 表示在左侧加一个子域名。eTLD+1实际上表示了“可注册的域名”，在实际中eTLD+1 一般是不同的主体注册，所以要视为不同的域名。  
所以下列域名都视为同一网站的：  
```javascript
abc.com
x.abc.com
y.abc.com  
x.y.abc.com
```

而这样的请求都是跨站的：  
```javascript
x.abc.com
x.def.com
x.abc.io
```
根据Cookie域名的不同，如果Cookie的域名与当前用户访问的网站域名为同站，那么此Cookie为一方Cookie，否则为三方Cookie。有可能同一个Cookie在网站A中是一方，在另一个网站B中中是三方。  

>改变  

请求类型   | 实例             | 以前     | Strict  | Lax   | None  
----------| -----------------|---------|----------|-------|-----  
链接      | `<a href="..."></a>`| 发送cookie| 不发送 | 发送cookie| 发送cookie  
预加载    | `<link rel="prerender" href="...">`| 发送cookie| 不发送| 发送cookie| 发送cookie  
get表单   | `<form method="get" action="...">`| 发送cookie | 不发送| 发送cookie| 发送cookie  
post表单  | `<form method="post" action="...">`| 发送cookie | 不发送 | 不发送  | 发送cookie  
iframe   | `<iframe src=""></iframe>`    | 发送cookie | 不发送 | 不发送  | 发送cookie  
AJAX     | `$.get("...")`      | 发送cookie | 不发送 | 不发送 | 发送cookie  
Image    | `<img src="...">`   | 发送cookie | 不发送 | 不发送 | 发送cookie  

***注***  
1、http接口不支持SameSite=none  
如果你想加Same-Site=none属性，那么该Cookie就必须同时加上Secure属性，表示只有在HTTPS协议下该Cookie才会被发送。  
2、需要UA检测，部分浏览器不能加SameSite=none  
IOS 12的Safari以及老版本一些Chrome会把SameSite=none识别成SameSite=Strict，所以服务端必须在下发Set-Cookie响应头时进行User-Agent检测，对这些浏览器不下发SameSite=none属性。  
### Cookie的作用  
1、会话状态管理(如用户登录状态、购物车、游戏分数或其它需要记录的信息)  
2、个性化设置（比如用户自定义设置、主题等）
3、浏览器行为跟踪（如跟踪分析用户行为等）  
### Cookie的缺点  
大小限制（4KB），不能保存太多信息。  
不安全，容易被盗取，导致XSS攻击等。  
增加请求大小。  



