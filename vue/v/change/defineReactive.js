import { Observer } from "./observer";

export class Dep{
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        remove(sub)
    }
    depend() {
        if (window.target) {
            this.addSub(window.target)
        }
    }
    notify() {
        const list = this.subs.slice()
        for(let i = 0; i < list.length; i++) {
            this.subs[i].update()
        }
    }
}

function remove(subs, sub) {
    if (subs.length) {
        const index = subs.indexOf(sub)
        if (index > -1) {
            return subs.splice(index, 1)
        }
    }
}

export default function defineReactive(obj, key, val) {
    // if (typeof val === 'object') {
    //     new Observer(val)
    // }
    let childOb = observe(val)
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend()

            if (childOb) {
                childOb.dep.depend()
            }
            return val
        },
        set(newVal) {
            // 所有引用类型均不会相等，是否可以进一步判断两个引用类型是否相等，不做其他不必要的渲染
            if (val === newVal) {
                return 
            }
            val = newVal
            dep.notify()
        }
    })
}

/***
 * 尝试为value创建一个Observer实例
 * 如果创建成功，直接返回创建的Observer实例
 * 如果value已经存在一个Observer实例，则直接返回它
*/
export function observe(value, asRootData) {
    if (!isObject(value)) {
        return
    }
    let ob
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    }else {
        ob = new Observer(value)
    }
    return ob
}

function isObject(v) {
    return typeof v === 'object'
}

function hasOwn(obj, key) {
    return key in obj
}