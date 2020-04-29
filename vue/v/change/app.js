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
        let reg = /\{\{((\w|\.){1,})\}\}/g
        let v = text.replace(reg, '$1')
        el.innerText = this.realValue(this.data, v)
        let vm = this
        new Watcher(this.data, v, function() {
            el.innerText = vm.realValue(vm.data, v)
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
        }
    }
})
console.log(app)