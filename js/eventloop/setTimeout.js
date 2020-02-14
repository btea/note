setTimeout(function() {
    console.log('time1')
    process.nextTick(function() {
        console.log('nextTick1')
    })
    setTimeout(function() {
        console.log('innerTimeout1')
    })
    setTimeout(function() {
        console.log('innerTimeout11')
    })
})
setTimeout(function() {
    console.log('time2')
    process.nextTick(function() {
        console.log('nextTick2')
    })
    setTimeout(function() {
        console.log('innerTimeout2')
    })
    setTimeout(function() {
        console.log('innerTimeout22')
    })
})