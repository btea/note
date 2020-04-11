const koa = require('./application')
const app = new koa()

app.use(async (ctx, next) => {
    console.log(1)
    next()
    console.log(2)
})
app.use(async (ctx, next) => {
    console.log(3)
    next()
    console.log(4)
})
app.on('error', (err) => {
    throw Error(err)
})
app.listen(3000, () => {
    console.log('Server Started');
})
