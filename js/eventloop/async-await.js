// async/await被认为是异步操作的终极解决方案  
// * 语法简洁，更像是同步代码，也更符合普通的阅读习惯；  
// * 改进JS中异步操作串行执行的代码组织方式，减少callback的嵌套；
// * Promise中不能自定义使用try/catch进行错误捕获，但是在Async/await可以像处理同步代码处理错误。  

// 注：如果await右侧表达式逻辑是个promise,await会等待这个promise的返回结果，只有返回的状态是resolved情况，
// 才会把结果返回，如果promise是失败状态，则await不会接受其结果，await下面的代码也不会继续执行。

let p1 = Promise.resolve(1)
let p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})
async function fn() {
  console.log(1)
// 当代码执行到此行（先把此行），构建一个异步的微任务
// 等待promise返回结果，并且await下面的代码也都被列到任务队列中
  let result1 = await p2
  console.log(result1)
  console.log(3)
  let result2 = await p1
  console.log(result2)
  console.log(4)
}
fn()
console.log(2)

// 1 2 大概1秒后  2 3  1 4



Promise生成并返回一个新的Promise对象