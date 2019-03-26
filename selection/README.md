#### js获取鼠标选中文字
[链接](https://www.cnblogs.com/yigeqi/p/3988705.html)

 #### 获取选中的文本内容
 document.selection.createRange().text; IE9以下使用   
 window.getSelection().toString(); 其他浏览器使用

#### 取消选中的文本状态
document.selection.empty(); IE9以下使用
window.getSelection().removeAllRanges(); 其他浏览器使用