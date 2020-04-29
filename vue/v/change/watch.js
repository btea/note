/**
 * 解析简单路径
*/
const bailRE = /[^\w.$]/;
function parsepath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function(obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) {return}
            obj = obj[segments[i]]
        }
        return obj
    }
}


export default class Watcher{
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parsepath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }
    get() {
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = void 0
        return  value
    }
    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}
