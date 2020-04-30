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
        if (!Array.isArray(value)) {
            this.walk(value)
        } else {
            // value.__proto__ = arrayMethods
            const augment = hasProto ? protoAugment : copyAugment
            augment(value, arrayMethods, arrayKeys)
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