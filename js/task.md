[async promise](https://v8.js.cn/blog/fast-async/)  
[task](https://imweb.io/topic/5bb9fd3779ddc80f36592f47)  
[async/await执行顺序](https://v8.js.cn/blog/fast-async/)

[js知识点博客](https://gomakethings.com/articles/)

### **js黑科技**
[严格模式下， this指向全局对象](https://www.cnblogs.com/qianlegeqian/p/3950044.html)  
`
	function fun(){  
		'use strict'  
		console.log(this) // undefined  
		function func(){
			cosnole.log(this)
		}
		func.bind((0, eval)('this'))()
	}
`