const getData = () => new Promise(resolve => setTimeout(() => { resolve('data') }, 1000))
async function test() {
    const data = await getData()
    console.log('data:', data)
    const data2 = await getData()
    console.log('data2:', data2)
    return 'success'
}
test().then(res => console.log(res))
// 1秒之后打印出data, 再过一秒打印出 data2，接着打印出success

// todo
// generator 函数

function testOne() {
    return asyncFunction(function* test() {
        const data = yield getData()
        console.log('data:', data)
        const data2 = yield getData()
        console.log('data2:', data2)
        return 'success'
    })
}

function asyncFunction(fn) {
    var it = fn.apply(this, arguments)
    return new Promise((resolve, reject) => {
        function step(key, val) {
            var obj
            try {
                if (val) {
                    obj = it[key](val)
                }else {
                    obj = it[key]()
                }
            } catch (error) {
                return reject(error)
            }
            var {done, value} = obj
            if (done) {
                return resolve(value)
            }
            return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
        }
        step('next')
    })
}