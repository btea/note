### EventLoop(事件循环)  
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
