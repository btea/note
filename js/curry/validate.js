function check(target, reg) {
    return reg.test(target)
}
function createCurry(func, args) {
    args = args || []
    var len = func.length
    return function() {
        var _args = [].slice.call(arguments)
        Array.prototype.push.apply(_args, args)

        if (_args.length < len) {
            return createCurry.call(this, func, _args)
        }

        return func.apply(null, _args)
    }
}
const _check = createCurry(check)
const checkPhone = _check(/^1[34578]\d{9}$/)
const checkEmail = _check(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)
const checkDate = _check(/^\d{4}(-|\/|\.)\d{1,2}\1\d{1,2}$/)

export default {
    checkPhone,
    checkEmail,
    checkDate
}