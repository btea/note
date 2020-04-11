const EventEmitter = require('events')
const http = require('http')

class Application  extends EventEmitter{
    constructor() {
        super();
        this.middlewares = [];
    }
    onerror(err, ctx) {
        console.log(this)
        this.emit('error', err)
    }
    use(middleware) {
        this.middlewares.push(middleware)
    }
    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
    callback() {
        return (req, res) => {
            let ctx = new Context(req, res)
            let fn = compose(this.middlewares)
            let onerror = this.onerror.bind(this)
            return fn(ctx).then(() => {
                ctx.res.end('hello world')
            }).catch(onerror)
        } 
    }
}

class Context{
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
}

function compose(middlewares) {
    return async (ctx) => {
        const dispatch = (i) => {
            let len = middlewares.length;
            let middleware = middlewares[i]
            if (i === len) {
                return Promise.resolve()
            }
            return middleware(ctx, () => dispatch(i + 1))
        }
        dispatch(0)
    }
}

module.exports = Application