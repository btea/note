import defineReactiver, { observe } from './defineReactive'
import {arrayMethods} from './arrayMutator'
import {Dep} from './defineReactive'
/***
 * Observer 会被附加到每一个被侦测的Object 上。
 * 一旦被附加上，Observer会将Object的所有属性转换为getter/setter的形式
 * 来收集属性的依赖，并且当属性发生变化时会通知这些依赖
*/
// __proto__是否可用
const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
export class Observer{
    constructor(value) {
        this.value = value
        this.dep = new Dep()  // 新增，数组添加依赖的地方
        def(value, '__ob__', this)
        // if (!Array.isArray(value)) {
        //     this.walk(value)
        // } else {
        //     // value.__proto__ = arrayMethods
        //     const augment = hasProto ? protoAugment : copyAugment
        //     augment(value, arrayMethods, arrayKeys)
        // }
        
        if (Array.isArray(value)) {
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    /***
     * walk会将每一个属性都转换成getter/setter的形式来侦测变化
     * 这个方法只有在数据类型为Object时被调用
    */
    walk(obj) {
        const keys = Object.keys(obj)
        for(let i = 0; i < keys.length; i++) {
            defineReactiver(obj, keys[i], obj[keys[i]])
        }
    }

    /**
     * 侦测 Array中的每一项
    */
    observeArray(items) {
        for(let i = 0; i < items.length; i++) {
            observe(items[i])
        }
    }
}

export function set(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }

    // 设置已经存在的属性值，存在说明已经被侦测，只需设置新值，触发响应就成
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }

    // 处理新增的属性
    const ob = target.__proto__
    // target不能是Vue.js实例或Vue.js实例的根数据对象]
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data' + 
            'at runtim - declare it upfront in the data option.'
        )
        return val
    }
    if (!ob) {
        target[key] = val
        return val
    }
    defineReactiver(obj.value, key, val)
    ob.dep.notify()
    return val
}

// delete
export function del(target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, i)
        return
    }
    const ob = target.__ob__
    // target不能是Vue.js实例或Vue.js实例的根数据对象]
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid deleting properties on a Vue instance or its root $data ' + 
            '- just set it to null'
        )
        return
    }
    
    // 如果key不是target 自身的属性，则终止程序继续执行
    if (!hasOwn(target, key)) {
        return
    }
    delete target[key]
    // 如果ob不存在，则直接终止程序
    if (!ob) {
        return
    }
    ob.dep.notify()
}

function hasOwn(obj, key) {
    return obj.hasOwnProperty(key)
}

function isValidArrayIndex(key) {
    // 数组下标值应该为正整数
    return typeof key === 'number' && /^\d+$/.test(key)
}

export function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

function protoAugment(target, src, keys) {
    target.__proto__ = src
}

function copyAugment(target, src, keys) {
    for(let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}