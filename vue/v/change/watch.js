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

        // 保存watcher监听了哪些依赖，方便后续可以取消订阅
        this.deps = []
        this.depIds = new Set()
        // expOrFn支持函数
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn
        }else {
            this.getter = parsepath(expOrFn)
        }
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
    addDep(dep) {
        const id = dep.id
        if (!this.depIds.has(id)) {
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }
    /**
     * 从所有依赖项的Dep列表中将自己移除
    */
    teardown() {
        let i = this.deps.length
        while(i--) {
            this.deps[i].removeSub(this)
        }
    }
}
