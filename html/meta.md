### charset属性  
```html
<!-- 定义网页文档的字符集 -->
<meta charset="utf-8" />
```
### name + content属性  
```html
<!-- 网页作者 -->
<meta name="author" content="开源技术团队" />
<!-- 网页地址 -->
<meta name="website" content="https://www.baidu.com" />
<!-- 网页版权信息 -->
<meta name="copyright" content="2019-2020 demo.com" />  
<!-- 网页描述 -->
<meta name="description" content="网页描述"/>
<!-- 搜索引擎索引方式，一般为all，不用深究 -->
<meta name="robots" content="all" />
<!-- 移动端常用视口设置 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
<!-- 
  viewport参数详解：
  width：宽度（数值 / device-width）（默认为980 像素）
  height：高度（数值 / device-height）
  initial-scale：初始的缩放比例 （范围从>0 到10）
  minimum-scale：允许用户缩放到的最小比例
  maximum-scale：允许用户缩放到的最大比例
  user-scalable：用户是否可以手动缩 (no,yes)
 -->
```
### http-equiv属性  
```html
<!-- expires指定网页的过期时间，一旦网页过期，必须从服务器上下载。 -->
<meta http-equiv="expires" content="Fri, 10 Apr 2020 07:02:33 GMT" />
<!-- 等待一定的时间刷新或跳转到其他url。下面1表示1秒 -->
<meta http-equiv="refresh" content="1; url=https://www.baidu.com" />  
<!-- 禁止浏览器从本地缓存中读取网页，即浏览器一旦离开网页在无法连接网络的情况下就无法访问到页面。 -->
<meta http-equiv="pragma" content="no-cache"/>
<!-- 也是设置cookie的一种方式，并且可以指定过期时间 -->
<meta http-equiv="set-cookie" content="name=value expires=Fri, 12 Jan 2001 18:18:18 GMT,path=/"/>
<!-- 使用浏览器版本 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- 针对WebApp全屏模式，隐藏状态栏/设置状态栏颜色，content的值为default | black | black-translucent -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```



### src和href的区别？  
### 定义   
href是HyperText Reference的简写，表示超文本引用，指向网络资源位置。  
常见场景：  
```html
<a href="http://www.baidu.com"></a> 
<link type="text/css" rel="stylesheet" href="common.css">   
```
src是source的简写，目的是要把文件下载到html页面中去。  
常见场景：  
```html
<img src="img/girl.jpg" /> 
<iframe src="top.html"> 
<script src="show.js"> 
```  
### 作用结果   
1、href 用于在当前文档和引用资源之间确立关系  
2、src用于替换当前内容  
### 浏览器解析方式   
1、当浏览器遇到href会并行下载资源并且不会停止对当前文档的处理。（同时也是为什么建议使用link方式加载CSS,而不是使用@import的方式）  
2、当浏览器解析到src，会暂停其他资源的下载和处理，直到将该资源加载或执行完毕。（这也是script标签为什么放在底部而不是头部的原因）  