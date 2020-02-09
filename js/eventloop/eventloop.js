console.log('golb1');  // 1
setImmediate(function() {
    console.log('immediate1');  // 15
    process.nextTick(function() {
        console.log('immediate1_nextTick');  // 19
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');  // 16
        resolve();
    }).then(function() {
        console.log('immediate1_then')  //  21
    })
})
setTimeout(function() {
    console.log('timeout1'); // 7
    process.nextTick(function() {
        console.log('timeout1_nextTick'); // 11
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise'); // 8
        resolve();
    }).then(function() {
        console.log('timeout1_then') // 13
    })
})



process.nextTick(function() {
    console.log('glob1_nextTick');  //4
})
new Promise(function(resolve) {
    console.log('glob1_promise');  // 2
    resolve();
}).then(function() {
    console.log('glob1_then')   // 6
})

setTimeout(function() {
    console.log('timeout2');  // 9
    process.nextTick(function() {
        console.log('timeout2_nextTick'); // 12
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise'); // 10
        resolve();
    }).then(function() {
        console.log('timeout2_then') // 14
    })
})

process.nextTick(function() {
    console.log('glob2_nextTick');  //5
})
new Promise(function(resolve) {
    console.log('glob2_promise');  // 3
    resolve();
}).then(function() {
    console.log('glob2_then')  // 7
})

setImmediate(function() {
    console.log('immediate2');  // 17
    process.nextTick(function() {
        console.log('immediate2_nextTick');  // 20
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise'); // 18
        resolve();
    }).then(function() {
        console.log('immediate2_then')  // 22
    })
})
