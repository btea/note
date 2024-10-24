### IPv4地址  
网际协议版本4(英语：Internet Protocol version 4, IPv4)，又称互联网通信协议第四版，是[网际协议](https://baike.baidu.com/item/IP/224599?fromtitle=%E7%BD%91%E9%99%85%E5%8D%8F%E8%AE%AE&fromid=4148798)开发过程中的第四个修订版本，也是此协议第一个被广泛部署的版本。IPv4是互联网的核心，也是使用最广泛的网际协议版本，其后继版本为[IPv6](https://baike.baidu.com/item/IPv6)，直到2011年，[IANA]IPv4位址完全用尽时，IPv6仍处于部署的初期。  

### 简介  
无论你是使用智能手机上网还是使用PC机上网，你的手机或PC机都会被分配一个IP地址，手机或PC机使用这个IP地址与互联网上的其他网络通信并进行信息交换。IP地址有IPv4和IPv6两大类，使用的绝大多数IP地址都是IPv4地址。  
### 特点   
IPv4是 Internet Protocol version 4的缩写，表示IP协议的第四个版本。互联网上绝大多数的通信流量都是以IPv4数据包的格式封装的。IPv4在IETF publication RFC 791有详细的描述。  
IPv4使用32位2进制的地址，因为大约只有43亿个地址。最初每一个连接入互联网的用户都要分配使用一个IPv4地址，因此未分配的IPv4地址越来越少，由此产生了IPv4地址耗尽的问题。为了根本解决IPv4地址耗尽的问题，IPv6应运而生。  
IPv4通常用`点分十进制记法书写`，例如 192.168.0.1，其中的数字都是十进制的数字，中间用实心圆点分隔。  
一个IPv4地址可以分为网络地址和主机地址两部分，其中网络地址可以使用如下形式描述：`192.168.0.0/16`,其中斜线后的数字表示网络地址部分的长度是16位，这对应2个字节，即网络地址部分是192.168.0.0。  
### 分类  
为了便于对IP地址进行管理，根据IPv4地址的第一个字节，IPv4地址可以分为以下五类。  
* A类：0~127  
* B类：128~191  
* C类：192~223  
* D类：224~239，组播地址  
* E类：240~254，保留为研究测试使用  

IPv4私有地址分为三类：  
**A类**  
A类私有地址范围为：`10.*.*.*`，共计`2 ^ 8 * 2 ^ 8 * 2 ^ 8 =>  256 * 256 * 256 => 16121856`个。  
**B类**  
B类私有地址范围为：`172.16.*.* --- 172.31.*.*`，共计`16 * 2 ^ 8 * 2 ^ 8 => 16 * 256 * 256 => 1048576`个。  
**C类**  
C类私有地址范围为：`192.168.*.*`，共计`2 ^ 8 * 2 ^ 8 => 256 * 256 => 65536`个。  


IPv4地址中有一些地址段有特殊用途，这些地址及用途的说明如下所示：  

范围          |  描述   
--------------|---------------
`10.0.0.0/8  172.16.0.0/12  192.168.0.0/16` | 私网IPv4地址，可用于家庭、办公室和企业的内部局域网。设计私网IPv4地址的初衷是缓解IPv4地址耗尽问题。  
`169.254.0.0/16` | Link-local, Link local地址只在某网段有意义，路由器是不会转发地址为 Link-local的IP包的。  
`127.0.0.0/8` | Loopback,回送测试 loopback test 所用  
`224.0.0.0/4` | IP组播地址  
`240.0.0.0/4` | 保留为研究测试使用  
`255.255.255.255` | 广播地址  

### 相关区别  
IPv4地址和IP地址的具体区别如下：  
1、IPv4是一个版本，而IP是一个很大的概念，他们有着本质上的区别。  
2、IPv4地址是广电网络的内测IP。  
3、IP地址中A类、B类、C类地址的区别，IP地址的长度决定了IPv4的地址空间，决定了地址的有限。  
4、IP包含了私网IP、公网IP、IPv4、IPv6。


[IPv6优势](https://cloud.tencent.com/developer/news/573194)  


