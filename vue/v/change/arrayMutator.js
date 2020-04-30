import {def} from './observer'
const arrayProto = Array.prototype
export const arrayMethods = Object.create(Array.prototype)

;[
    'pop',
    'push',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function(method) {
    // 缓存原始方法
    const origin = arrayProto[method]
    // Object.defineProperty(arrayMethods, method, {
    //     value: function mutator(...args) {
    //         const ob = this.__ob__
    //         return origin.apply(this, args)
    //     },
    //     enumerable: false,
    //     writable: true,
    //     configurable: true
    // })
    def(arrayMethods, method, function mutator(...args){
        const result = origin.apply(this, args)
        const ob = this.__ob__
        // 获取新增元素
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args    
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        
        if (inserted) {
            ob.observeArray(inserted)
        }

        ob.dep.notify()
        return result
    })
})