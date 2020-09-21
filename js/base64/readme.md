[base64编码原理](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)  
atob(): 能够解码通过base-64编码的字符串数据。  
btoa(): 能够从二进制数据"字符串"创建一个base-64编码的ASCII字符串。  
[转换](https://www.cnblogs.com/poorpeople/p/9407789.html)  
[手写二进制转base64](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/299)  

*补充*   
> 由于base64的实现原理，在图片转成base64之后，图片体积变成原来的 4/3，可以利用canvas将其进行压缩。    
> 创建一个图片，然后创建一个等大小的canvas，然后将图片绘制到canvas上，利用toDataURL方法,按照低质量压缩，得到压缩后所需的base64。  

