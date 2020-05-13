import {Observer, set, del} from './observer'
import Watcher from './watch'
import { arrayMethods } from './arrayMutator'
class V{
    constructor(obj) {
        let ob = new Observer(obj.data)
        // console.log(ob)
        this.data = obj.data
        this.init(obj)
    }
    init(obj) {
        let el = document.querySelector(obj.el)
        this.el = el
        this.listenElement(el)
    }
    listenElement(el) {
        let child = el.childNodes
        if (!child.length) {return}
        for (let i = 0; i < child.length; i++) {
            if (child[i].nodeType === 1) {
                let ele = child[i]
                let v = ele.innerText
                this.watchData(v, ele)
            }
        }
    }
    watchData(text, el) {
        let reg = /\{\{(.{1,})\}\}/g
        let match = text.match(reg)
        
        let realText = text.replace(reg, (match, key) => {
            return this.realValue(this.data, key)
        })
        el.innerText = realText
        let v = RegExp.$1
        new Watcher(this.data, v, function(val, oldVal) {
            realText = el.innerText
            el.innerText = realText.replace(oldVal, val)
        })
    }
    realValue(obj, key) {
        key = key.split('.')
        let v
        for(let i = 0; i < key.length; i++) {
            if (!v) {
                v = obj[key[i]]
            }else {
                v = v[key[i]]
            }
        }
        return v;
    }
    $watch(expOrFn, cb, options) {
        const vm = this.data
        options = options || {}
        // debugger
        const watcher = new Watcher(vm, expOrFn, cb, options)
        if (options.immediate) {
            cb.call(vm, watcher.value)
        }
        return function unwatchFn() {
            watcher.teardown()
        }
    }
    $set(target, key, value) {
        set.call(this, target, key, value)
    }
    $delete(target, key) {
        del.call(this, target, key)
    }
    $on(event, fn) {
        const vm = this
        if (Array.isArray(event)) {
            for(let i = 0; i < event.length; i++) {
                this.$on(event[i])
            }
        }else {
            (vm._events[event] || (vm._events[event] = [])).push(fn)
        }
        return vm
    }
    $off(event, fn) {
        // 用法： 移除自定义事件监听器
        // 如果没有提供参数，则移除所有的事件监听器
        // 如果只提供了事件，则移除该事件的所有监听器
        // 如果同时提供了事件与回调，则只移除这个回调的监听器
        const vm = this
        移除所有事件的监听器
        if (arguments.length) {
            vm._events = Object.create(null)
            return vm
        }

        // event支持数组
        if (Array.isArray(event)) {
            for(let i = 0; i < event.length; i++) {
                this.$off(event[i], fn)
            }
            return vm
        }
        const cbs = this._events[event]
        if (!cbs) {
            return vm
        }
        // 移除该事件的所有监听器
        if (arguments.length === 1) {
            vm._events[event] = null
            return vm
        }
        // 只移除与fn相同的监听器
        if (fn) {
            const cbs = vm._events[event]
            let cb
            let i = cbs.length
            while(i--) {
                cb = cbs[i]
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1)
                    break
                }
            }
        }
        return vm
    }
    $once(event, fn) {
        const vm = this
        function on() {
            vm.$off(event, on)
            fn.apply(arguments)
        }
        // 注：将事件监听函数保存在拦截器函数的fn属性上，是为了当用户主动用$off取消事件时，传进来的回调函数必然和拦截器函数不一致，
        // 导致匹配不到对应的回调函数，移除失败。
        // 而将回调函数函数保存到拦截器的fn属性里面，则可以满足117行代码的执行条件，完成移除
        on.fn = fn
        vm.$on(event, on)
        return vm
    }
    $emit(event) {
        const vm = this
        let cbs = vm._events[event]
        if (cbs) {
            const args = [].slice.call(arguments, 1)
            for (let i = 0; i < cbs.length; i++) {
                try{
                    cbs[i].apply(vm, args)
                }catch(e) {
                    throw Error(`${e} event hendler for ${event}`)
                    // handleError(e, vm, `event handler for ${event}`)
                }
            }
        }
        return vm
    }
    // vm.$forceUpdate的作用是迫使Vue.js实例重新渲染。它仅仅影响实例本身以及插入插槽内部的子组件，而不是所有子组件
    $forceUpdate() {
        const vm = this
        // vm._watcher就是Vue.js实例的watcher
        if (vm._watcher) {
            vm._watcher.update()
        }
    }
    // vm.$destory的作用是完全销毁一个实例，它会清理该实例与其他实例的连接，并解绑其全部指令以及监听器，同时会触发beforeDestory和
    // destoryed的钩子函数
    // $destory() {
    //     const vm = this
    //     if (vm._isBeginDestoryed) {
    //         // 正在被销毁
    //         return
    //     }
    //     callHook(vm, 'beforeDestory')
    //     vm._isBeginDestoryed = true
    // }

}

let app = new V({
    el: '#app',
    data: {
        age: 10,
        message: 'this is a message',
        info: {
            login: '123'
        },
        list: [
            {name: '虹猫'},
            {name: '蓝兔'},
            {name: '蓝猫'},
            {name: '淘气'}
        ]
    }
})

let w = app.$watch('list', function(newVal, oldVal) {
    console.log('list数组更新')
    console.log(newVal)
    console.log(oldVal)
})
let setV = app.$set(app.data.list, 5, 100)
console.log(setV)
// let val = app.$watch('info.login', function(newVal, oldVal) {
//     console.log('info属性的login属性发生了变化')
// }, {
//     deep: true
// })

// let msg = app.$watch('message', function(newVal, oldVal) {
//     console.log('message改变')
//     console.log('新值：' + newVal + ';  ' + '旧值：' + oldVal)
// })

// let val1 = app.$watch(function() {
//     console.log(this.age + this.message)
// }, function(newVal, oldVal) {
//     console.log('message1属性发生了变化')
// })
// console.log(val)
console.log(app)