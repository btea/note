// 断言函数
function assert(isAssert, error) {
    if (isAssert) {
        throw Error(error)
    }
}

// 全局作用域下的报错似乎捕获不到？

window.addEventListener('error', function(event) {
    console.log(event)
    event.preventDefault()
    // 若未阻止默认事件， 错误信息会冒泡到最外层，这里捕获不到
})
// window.onerror = function(message, source, lineno, colno, error){
//     console.log('捕获到异常：', {message, source, lineno, colno, error});
//     return true;
//     // window.onerror 函数只有在返回true的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示鲜红的 Uncaught Error: xxx
// }

// promise catch
// 未了防止有漏掉的Promise异常，建议在全局增加一个对 unhandledrejection 的监听，用来全局监听 Uncaught Promise Error
window.addEventListener('unhandledrejection', function(e){
    e.preventDefault();
    console.log('捕获到异常：', e);
    return true;
});