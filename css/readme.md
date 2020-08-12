### css(Cascading Style Sheets，层叠样式表)  
[BFC(Block Formatting Contexts)](https://zhuanlan.zhihu.com/p/25321647)  
BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于普通流。  
**具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。**  
#### 触发BFC
只要满足下面任一条件即可触发BFC特性：  
* body根元素  
* 浮动元素：float除none以外的值  
* 绝对定位元素：position(absolute, fiexed, sticky)
* display为inline-block、tabel-cells、flex  
* overflow除了visible以外的值（hidden、auto、scroll）  
#### BFC特性及应用  
1、同一个BFC下外边距会发生重叠  
2、BFC可以包含浮动的元素（清除浮动）  
3、BFC可以阻止元素被浮动元素覆盖   

[css伪类说明](https://www.runoob.com/css/css-pseudo-classes.html)  

