import {Observer} from './observer'
import Watcher from './watch'
class V{
    constructor(obj) {
        new Observer(obj.data)
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
// let val = app.$watch('message', function(newVal, oldVal) {
//     console.log('message属性发生了变化')
// })
// let val1 = app.$watch(function() {
//     console.log(this.age + this.message)
// }, function(newVal, oldVal) {
//     console.log('message1属性发生了变化')
// })
// console.log(val)
console.log(app)