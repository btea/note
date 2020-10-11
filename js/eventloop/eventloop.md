### EventLoop(事件循环)  
一个完整的Event Loop过程，可以概括为以下阶段：  
* 初始状态：调用栈空。micro队列空，macro队列里有且只有一个script脚本（整体代码）*一个script标签算是一个macro-task，当前script执行过程中创建的macro-task以及micro-task都会先于下一个script执行*。  
* 全局上下文（script标签）被推入调用栈，同步代码执行。在执行的过程中，通过对一些接口的调用，可以产生新的macro-task与micro-task，它们会分别被推入各自的任务队列里。同步代码执行完，script脚本会被移出macro队列，**这个过程本质上是队列的macro-task的执行和出队的过程**。  
* 上一步我们出队的是一个 macro-task，这一步我们处理的micro-task。但需要注意的是：当macro-task出队时，任务是**一个一个**执行的；而 micro-task 出队时，任务是**一队一队**执行的。因此，我们处理micro队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。  
* **执行渲染操作，更新界面**。  
* 检查是否存在 Web Worker 任务，如果有，则对其进行处理。  
（上述过程循环往复，直到两个队列都清空）  

我们总结一下，每一次循环都是一个这样的过程：  
![](https://user-gold-cdn.xitu.io/2018/10/1/1662ff57ebe7a73f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



#### JavaScript的一大特点就是单线程，这个线程拥有唯一的一个事件循环。
#### JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列（task queue）来搞定另外一些代码的执行。
#### 一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。
#### 任务队列又分为marco-task(宏任务) 与 micro-task(微任务)，在最新的标准中，它们分别被称为task与jobs。
#### marco-task大概包括：script(整体代码)、setTimeout、setInterval、setImmedidate、I/O、UI rendering。
#### micro-task大概包括：process.nextTick、Promise、Object.observe（已废弃）、MutationObserver(html5新特性)。
#### setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。
#### 来自不同任务源的任务会进入到不同的任务队列。其中setTimeout和setInterval是同源的。
#### 事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有micro-task。当所有可执行的micro-task执行完毕之后。循环再次从marco-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task,一直这样循环下去。
#### 其中每一个任务的执行，无论是marco-task还是micro-task,都是借助函数调用栈来完成。

[浏览器与Node的事件循环(event loop)有和区别？](https://github.com/ljianshu/Blog/issues/54)   
[一次搞懂JS运行机制](https://juejin.im/post/6844904050543034376)   
