function newFn(fn) {
    var obj = {}
    var result, params
    params = [].slice.call(arguments, 1)
    obj.__proto__ = fn.prototype
    result = fn.apply(obj, params)
    return result instanceof Object ? result : obj
}