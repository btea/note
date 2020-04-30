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
console.log(app)