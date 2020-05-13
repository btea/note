function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

const callbacks = []
let pending = false

function flushCallbacks() {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

let microTimeFunc
let macroTimeFunc  
let useMacroTask = false

if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    macroTimeFunc = () => {
        setImmediate(flushCallbacks)
    }
}else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) || MessageChannel.toString() === '[object MessageChannelConstructor]')) {
    const channel = new MessageChannel()
    const port = channel.port2
    channel.port1.onmessage = flushCallbacks
    macroTimeFunc = () => {
        port.postMessage(1)
    }
}else {
    macroTimeFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    microTimeFunc = () => {
        p.then(flushCallbacks)
    }
}else {
    microTimeFunc = macroTimeFunc
}
export function _withMacroTask(fn) {
    return fn._withTask || (fn._withTask = function() {
        useMacroTask = true
        const res = fn.apply(null, arguments)
        useMacroTask = false
        return res
    })
}

export function nextTick(cb, ctx) {
    let _resolve
    callbacks.push(() => {
        if (cb) {
            cb.call(ctx)
        }else {
            _resolve(ctx)
        }
    })
    if (!pending) {
        pending = true
        if (useMacroTask) {
            macroTimeFunc()
        }else {
            microTimeFunc()
        }
    }
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}

function query(el) {
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            return document.createElement('div')
        }
        return selected
    }
    return el
}

function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML
    }
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
}

function compileToFunctions(template, options, vm) {
    options = extend({}, options)
    // 检查缓存
    const key = options.delimiters ? String(options.delimiters) + template : template
    if (cache[key]) {
        return cache[key]
    }
    // 编译 将template模板变异成ast，生成代码字符串
    const compiled = compile(template, options)
    // 将代码字符串转换为函数
    const res = {}
    res.render = createFunction(compiled.render)
    return (cache[key] = res)
}

function  createFunction(code) {
    return new Function(code)
}

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function(el) {
    el = el && query(el)
    const options = this.$options
    if (!options.render) {
        let template = options.template
        if (template) {
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template)
                }
            }else if (template.nodeType) {
                template = template.innerHTML
            }else {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('invalid template option:' + template, this);
                }
                return this
            }
        }else if(el) {
            template = getOuterHTML(el)
        }
    }
    // 新增编译相关逻辑
    if (template) {
        const {render} = compileToFunctions(
            template,
            {},
            this
        )
        options.render = render
    }
    return mount.call(this, el)
}