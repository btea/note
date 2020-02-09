new Promise(function(resolve, reject) {
    console.log('promise')
    resolve()
}).then(function() {
    console.log('then')
})
process.nextTick(function() {
    console.log('nextTick')
})

// micro-task  nextTick执行顺序优先级比 promise.then要高

// macro-task  setTimeout执行顺序优先级比 setImmediate要高
setImmediate(function() {
    console.log('immediate')
}, 10)
setTimeout(function() {
    console.log('timeout')
}, 10)