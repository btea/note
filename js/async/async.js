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