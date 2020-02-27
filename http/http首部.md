## HTTP首部  
HTTP协议的请求和响应报文中必定包含HTTP首部，只是我们平时在使用Web的过程 中感受不到它。  
## HTTP报文首部  
HTTP协议的请求和响应报文中必定包含HTTP首部。首部内容为客户端和服务器分别处理请求和响应提供所需要的信息。对于客户端用户来说，这些信息中的大部分内容都无须亲自查看。  
HTTP请求报文   
在请求中，HTTP报文由方法、URI、HTTP版本、HTTP首部字段等部分构成。  
HTTP响应报文  
在响应中，HTTP报文由HTTP版本、状态码（数字和原因短语）、HTTP首部字段3部分构成。  
## HTTP首部字段  
### HTTP首部字段传递重要信息  
HTTP首部字段是构成HTTP报文的要素之一。在客户端与服务器之间以HTTP协议进行通信的过程中，无论是请求还是响应都会使用首部字段，它能起到传递额外重要信息的作用。  
使用首部字段是为了给浏览器和服务器提供报文主体大小、所使用的语言、认证信息等内容。  
### HTTP首部字段结构  
HTTP首部字段是由首部字段名和字段值构成的，中间用冒号":"分隔。  
首部字段名：字段值  
### 4种HTTP首部字段类型  
HTTP首部字段根据实际用途被分为以下4种类型。  
**通用首部字段（General Header Fields）**  
请求报文和响应报文两方都会使用的首部。  
**请求首部字段（Request Header Fields）**  
从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加内容、客户端信息、响应内容相关优先级等信息。  
**响应首部字段（Response Header Fields）**  
从服务器端向客户端返回响应报文时使用的部首。补充了响应的附加内容，也会要求客户端附加额外的内容信息。  
**实体首部字段（Entity Header Fiedls）**   
针对请求报文和响应报文的实体部分使用的首部。补充了资源内容更新时间等与实体有关的信息。  
### HTTP/1.1首部字段一览  
HTTP/1.1规范定义了如下47种首部字段。  
**通用首部字段**  
首部字段名     |   说明
--------------| --------------
Cache-Control | 控制缓存的行为  
Connection    | 逐跳首部、连接的管理  
Date          | 创建报文的日期时间  
Pragma        | 报文指令  
Trailer       | 报文末端的首部一览  
Transfer-Encoding | 指定报文主体的传输编码方式  
Upgrade       | 升级为其他协议  
Via           | 代理服务器的相关信息  
Warning       | 错误通知  

**请求首部字段**  
首部字段名           |  说明
--------------------| ----------------
Accept              | 用户代理可处理的媒体类型  
Accept-Charset      | 优先的字符集  
Accept-Encoding     | 优先的内容编码  
Accept-Language     | 优先的语言（自然语言）  
Authorization       | Web认证信息  
Expect              | 期待服务器的指定行为  
From                | 用户的电力邮箱地址  
Host                | 请求资源所在服务器  
If-Match            | 比较实体标记（ETag）  
If-Modified-Since   | 比较资源的更新时间  
If-None-Match       | 比较实体标记（与If-Match相反）  
If-Range            | 资源未更新时发送实体Byte的范围请求  
If-Unmodified-Since | 比较资源的更新时间（与If-Modified-Since相反）  
Max-Forwards        | 最大传输逐跳数  
Proxy-Authorization | 代理服务器要求客户端的认证信息  
Range               | 实体的字节范围请求  
Referer             | 对请求中URI的原始获取方  
TE                  | 传输编码的优先级  
User-Agent          | HTTP客户端程序的信息  

**响应首部字段**
首部字段名           |  说明  
--------------------| ----------------  
Accept-Ranges       |  是否接受字节范围请求  
Age                 |  推算资源创建经过时间  
Etag                |  资源的匹配信息  
Location            |  令客户端重定向至指定URI  
Proxy-Authenticate  |  代理服务器对客户端的认证信息  
Retry-After         |  对再次发起请求的时机要求  
Server              |  HTTP服务器的安装信息  
Vary                |  代理服务器缓存的管理信息  
WWW-Authenticate    |  服务器对客户端的认证信息  

**实体首部字段**  
首部字段名           |  说明  
--------------------| ----------------  
Allow               | 资源可支持的HTTP方法  
Content-Encoding    | 实体主体适用的编码方式  
Content-Language    | 实体主体的自然语言  
Content-Length      | 实体主体的大小（单位：字节）  
Content-Location    | 替代对应资源的URI  
Content-MD5         | 实体主体的报文摘要  
Content-Range       | 实体主体的位置范围  
Content-Type        | 实体主体的媒体类型  
Expires             | 实体主体过期的日期时间  
Last-Modified       | 资源的最后修改日期时间  

### 非HTTP/1.1首部字段  
在HTTP协议通信交互中使用到的首部字段，不限于RFC2616中定义的47种首部字段。还有Cookie、Set-Cookie和Content-Disposition等其他RFC中定义的首部字段，它们的使用频率很高。  
这些非正式的首部字段统一归纳为RFC4229 HTTP Header Field Registrations中。  
### End-to-end首部和Hop-by-hop首部  
HTTP首部字段将定义成缓存代理和非缓存代理的行为，分为2种类型。  
**端到端首部（End-to-end Header）**  
分在此类别中的首部会转发请求/响应对应的最终接收目标，且必须保存在由缓存生成的响应中，另外规定它必须被转发。  
**逐跳首部（Hop-by-hop Header）**  
分在此类别中的首部只对单次转发有效，会因通过缓存或代理而不再转发。  
HTTP/1.1和之后版本中，如果要使用Hop-by-hop首部，需提供Connection首部字段。  
下面列举了HTTP/1.1中的逐跳首部字段。除这8个首部字段之外，其他所有字段都属于端到端首部。  
* Connection  
* Keep-Alive  
* Proxy-Authenticate  
* Proxy-Authorization  
* Trailer  
* TE  
* Transfer-Encoding  
* Upgrade  
##  HTTP/1.1通用首部字段  
通用首部字段是指，请求报文和响应报文双方都会使用的首部。  
### Cache-Control  
通过请求首部字段Cache-Control的指令，就能操作缓存的工作机制。  
指令的参数时可选的，多个指令之间通过","分隔。首部字段Cache-Control的指令可用于请求及响应时。  
Cache-Control：private，max-age=0，no-cache  
Cache-Control指令一览  
**缓存请求指令**  

指令          | 参数   |  说明  
--------------|-------| ------------  
no-cache      | 无    | 强制向源服务器再次验证  
no-store      | 无    | 不缓存请求或响应的任何内容  
max-age=[秒]  | 必需  | 不缓存请求或响应的任何内容  
max-state(=[秒])| 可省略 | 接收已过期的响应  
min-fresh=[秒] | 必需  | 期望在指定时间内的响应仍有效  
no-transform  | 无    | 代理不可更改媒体类型  
only-if-cached| 无    | 从缓存获取资源  
cache-extension | -   | 新指令标记（token）  

**缓存响应指令**  

指令          |  参数  | 说明  
-------------|--------|------------  
public       | 无     | 可向任意方提供响应的缓存  
private      | 可省略 | 仅向特定用户返回响应  
no-cache     | 可省略 | 缓存前必须先确认其有效性  
no-store     | 无     | 不缓存请求或响应的任何内容  
no-transform | 无     | 代理不可更改媒体类型  
must-revalidate | 无  | 可缓存但必须再向源服务器进行确认  
proxy-revalidate | 无 | 要求中间缓存服务器对缓存的响应有效性再进行确认  
max-age=[秒] | 必需   | 响应最大的Age值  
s-maxage=[秒]| 必需   | 公共缓存服务器响应最大的Age值  
cache-extension | -  | 新指令标记（token）  

***表示能否缓存的指令***  
**public指令**  
Cache-Control：public  
当指定使用public指令时，则明确表明其他用户也可利用缓存。  
**private指令**  
Cache-Control：private  
当指定private指令后，响应只以特定的用户作为对象，这与public指令的行为相反。  
缓存服务器会对该特定用户提供资源缓存的服务，对于其他用户发送过来的请求，代理服务器则不会返回缓存。  
**no-cache指令**  
Cache-Control：no-cache  
使用no-cache指令的目的是为了防止从缓存中返回过期的资源。  
客户端发送的请求中如果包含no-cache指令，则表示客户端将不会接收缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发给源服务器。  
如果服务器返回的响应中包含no-cache指令，那么缓存服务器不能对资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资源有效性进行确认，且禁止其对响应资源进行缓存操作。  
Cache-Control：no-cache=Location  
由服务器返回的响应中，若报文首部字段Cache-Control中对no-cache字段名指定具体参数值，那么客户端在接收到这个被指定参数值后，就不能使用缓存。换言之，无参数值的首部字段可以使用缓存，只能在响应中指定该参数。  

***控制可执行缓存的对象的指令***  
**no-store指令**  
Cache-Control：no-store  
当使用no-store指令（从字面意思上很容易把no-cache误解成为不缓存，但事实上no-cache代表不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称为do-not-serve-from-cache-without-revalidation更合适。nostore才是真正地不进行缓存，请读者注意区别理解）时，暗示请求（和对应的响应）或响应中包含机密信息。  
因此，该指令规定缓存不能在本地存储请求或响应的任一部分。  

***指定缓存期限和认证的指令***  
**s-maxage指令**  
Cache-Control：s-maxage=604800(单位：秒)  
s-maxage指令的功能和max-age指令的相同，它们的不同点是s-maxage指令只适用于供多位用户使用的公共缓存服务器（这里一般指代理）。也就是说，对于向同一用户反复返回响应的服务器来说，这个指令没有任何作用。  
另外，当时用s-maxage指令后，则直接忽略对Expires首部字段及max-age指令的处理。  
**max-age指令**
Cache-Control：max-age=604800（单位：秒）  
当客户端发送的请求中包含max-age指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。另外，当指定max-age值为 0，那么缓存服务器通常需要将请求转发给源服务器。  
当服务器返回的响应中包含max-age指令时，缓存服务器将不对资源的有效性再作确认，而max-age数值代表资源保存为缓存的最长时间。
应用HTTP/1.1版本的缓存服务器遇到同时存在Expires首部字段的情况时，会优先处理max-age指令，而忽略掉Expires首部字段。而HTTP/1.0版本的缓存服务器的 情况却相反，max-age指令会被忽略掉。  
**min-fresh指令**  
Cache-Control：min-fresh=60（单位：秒）  
min-fresh指令要求缓存服务器返回至少还未过指定时间的缓存资源。  
比如，当指定min-fresh为60秒后，在这60秒以内如果有超过有效期限的资源都无法作为响应返回了。  
**max-stale指令**  
Cache-Control：max-stale=3600（单位：秒）  
使用max-stale可指示缓存资源，即使过期也照常接收。  
如果指令未指定参数值，那么无论经过多久，客户端都会接收响应；如果指令中指定了具体数值，那么即使过期，只要仍处于max-stale指定的时间内，仍旧会被客户端接收。  
**only-if-cached指令**  
Cache-Control：only-if-cached  
使用only-if-cached指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回。换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本地缓存无响应，则返回状态码504 Gateway Timeout。  
**must-revalidate指令**  
Cache-Control：must-revalidate  
使用must-revalidate指令，代理会向源服务器再次验证即将返回的响应缓存目前是否仍然有效。  
若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端一条504（Gateway Timeout）状态码。  
另外，使用must-revalidate指令会忽略请求max-stale指令（即使已经在首部使用了max-stale，也不会再有效果）。  
**proxy-revalidate指令**  
Cache-Control：proxy-revalidate  
proxy-revalidate指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应前，必须再次验证缓存的有效性。  
**no-transform指令**  
Cache-Control：no-transform  
使用no-transform指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。  
这样做可以防止缓存或代理压缩图片等类似操作。  
**Cache-Control扩展**  
cache-extension token  
Cache-Control: private, community="UCI"  
通过cache-extension标记（token），可以扩展Cache-Control首部字段内的指令。  
如上例，Cache-Control首部字段本身没有community这个指令。借助extension tokens实现了该指令的添加。如果缓存服务器不能理解community这个新指令，就会直接忽略。因此，extension tokens仅对能理解它的缓存服务器来说是有意义的。  
### Connection  
Connection首部字段具备如下两个作用。
* 控制代理不再转发的首部字段  
* 管理持久连接   

**控制不再转发给代理的首部字段**  
Connection：不再转发的首部字段名  
在客户端发送请求和服务器返回响应内，使用Connection首部字段，可控制代理不再转发的首部字段（即Hop-by-hop首部）。  
**管理持久连接**  
Connection：close
HTTP/1.1版本的默认连接都是持久连接。为此，客户端会在持久连接上连续发送请求。当服务器端想明确断开连接时，则指定Connection首部字段的值为Close。  
Connection：Keep-Alive  
HTTP/1.1之前的HTTP版本默认连接都是非持久连接。为此，如果想在旧版本的HTTP协议上维持持续连接，则需要指定Connection首部字段的值为Keep-Alive。
### Date  
首部字段Date表明创建HTTP报文的日期时间。  
HTTP/1.1协议使用在RFC1123中规定的日期时间的格式，如下示例。  
Date: Tue, 03 Jul 2012 04:40:59 GMT  
之前的HTTP协议版本中使用在RFC850中定义的格式，如下所示。  
Date: Tue, 03-Jul-12 04:40:59 GMT  
除此之外，还有一种格式。它与C标准库内的asctime() 函数的输出格式一致。  
Date: Tue Jul 03 04:40:59 2012  
### Pragma  
Pragma是HTTP/1.1之前版本的历史遗留字段，仅作为与HTTP/1.0的向后兼容而定义。  
规范定义的形式唯一，如下所示。  
Pragma: no-cache  
该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存的资源。  
所有的中间服务器如果都能以HTTP/1.1为基准，那直接采用Cache-Control: nocache指定缓存的处理方式是最为理想的。但要整体掌握全部中间服务器使用的HTTP协议版本却是不现实的。因此，发送的请求会同时含有下面两个首部字段。  
Cache-Control: no-cache Pragma: no-cache  
### Trailer  
首部字段Trailer会事先说明在报文主体后记录了哪些首部字段。该首部字段可应用在HTTP/1.1版本分块传输编码时。  
### Transfer-Encoding  
首部字段Transfer-Encoding规定了传输报文主体时采用的编码方式。  
HTTP/1.1的传输编码方式仅对分块传输编码有效。  
### Upgrade  
首部字段Upgrade用于检测HTTP协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议。  
### Via  
使用首部字段Via是为了追踪客户端与服务器之间的请求和响应报文的传输路径。  
报文经过代理或网关时，会先在首部字段Via中附加该服务器的信息，然后再进行转发。这个做法和traceroute及电子邮件的Received首部的工作机制很类似。  
首部字段Via不仅用于追踪报文的转发，还可避免请求回环的发生。所以必须在经过代理时附加该首部字段内容。  
Via首部是为了追踪传输路径，所以经常会和TRACE方法一起使用。比如，代理服务器接收到由TRACE方法发送过来的请求（其中Max-Forwards: 0）时，代理服务器 就不能再转发该请求了。这种情况下，代理服务器会将自身的信息附加到Via首部后，返回该请求的响应。  
### Warning  
HTTP/1.1的Warning首部是从HTTP/1.0的响应首部（Retry-After）演变过来的。 该首部通常会告知用户一些与缓存相关的问题的警告。  
HTTP/1.1中定义了7种警告。警告码对应的警告内容仅推荐参考。另外，警告码具备扩展性，今后有可能追加新的警告码。  
***HTTP/1.1警告码***  

警告码      |   警告内容             |   说明  
------------|-----------------------|--------------------  
110         | Response is stale（响应已过期） | 代理返回已过期的资源  
111         | Revalidation failed（再验证失败）| 代理再验证资源有效性时失败（服务器无法达到等原因）  
112         | Disconnection operation(断开连接操作) | 代理与互联网连接被故意切断  
113         | Heuristic expiration(试探性过期)  | 响应的使用期超过24小时（有效缓存的设定时间大于24小时的情况下）  
199         | Miscellaneous warning（杂项警告） | 任意的警告内容  
214         | Transformation applied（使用了转换） | 代理对内容编码或媒体类型等执行了某些处理时  
299         | Miscellaneous persistent warning（持久杂项警告） | 任意的警告内容  

## 请求首部字段  
请求首部字段是从客户端往服务器端发送请求报文中所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容。  
### Accept  
Accept首部字段可通知服务器，用户代理能够处理的媒体类型以及媒体类型的相对优先级。可使用type/subtype这种形式，一次指定多种媒体类型。  
* 文本文件  
text/html,text/plain,text/css...  
application/xhtml+xml, application/xml...  
* 图片文件  
image/jpeg,image/gif,image/png...  
* 视频文件  
video/mpeg,video/quicktime...  
* 应用程序使用的二进制文件  
application/octet-stream,application/zip...  
若想要给显示的媒体类型增加优先级，则使用q= 来额外表示权重值（品质系数）。在RFC2616定义中，此处的q是指qvalue，即quality factor。直译的话就是质量数，但经过综合考虑理解记忆的便利性之后，似乎采用权重值更为稳妥。用分号(;)进行分隔。权重值q的范围是0~1（可精确到小数点后3位），且1为最大值。不指定权重q时，默认权重q=1.0。  
当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。  
栗子：Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
会首先返回text/html（默认权重值为1.0）  
### Accept-Charset  
Accept-Charset首部字段可用来通知服务器用户代理支持的字符集及对字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字段Accept相同的是可用权重q值来表示相对优先级。  
该首部字段应用于内容协商机制的服务器驱动协商。  
### Accept-Encoding  
Accept-Encoding：gzip, deflate  
Accept-Encoding首部字段用来告知服务器用户代理支持的内容编码以及内容编码的优先级顺序。可一次性指定多种内容编码。  
* gzip  
由文件压缩程序gzip（GNU zip）生成的编码格式（RFC1952），采用Lempel-Ziv算法（LZ77）以及32位循环冗余校验（Cyclic Redundancy Check，通称RFC）。  
* compress  
由UNIX文件压缩程序compress生成的编码格式，采用Lempel-Ziv-Welch算法（LZW）。  
* deflate  
组合使用zlib格式（RFC1950）及由deflate压缩算法（RFC1951）生成的编码格式。  
* identity  
不执行压缩或不会变成的默认编码格式。  
采用权重q值来表示相对优先级，这点与首部字段Accept相同。另外，也可使用星 号（*）作为通配符，指定任意的编码格式。  
### Authorization  
首部字段Authorization是用来告知服务器，用户代理的认证信息（证书值）。通 常，想要通过服务器认证的用户代理会在接收到返回的401状态码响应后，把首部字 段Authorization加入请求中。共用缓存在接收到含有Authorization首部字段的 请求时的操作处理会略有差异。  














