function stringify(obj) {
    if (obj === undefined) {return}
    if (obj === null || isPrimite(obj)) {
        return obj + '';
    }
    var str = '';
    if (Array.prototype.toString.call(obj) === '[object Object]') {
         str += '{'
         for(let i in obj) {
             let value = obj[i]
             if (typeof value === 'object') {
                 value = stringify(value)
             }
             str += '"' + i +'":' + value
         }
         str += '}'
    }else {
         str += '['
         for(let a = 0; a < obj.length; a++) {
             let value = obj[a]
             if (typeof value === 'object') {
                 value = stringify(value)
             }
             str += value + ','
         }
         if(obj.length > 0) {
             str = str.slice(0, -1)
         }
         str += ']'
    }
    return str;
}
function isPrimite(v) {
    var type = typeof v;
    return type === 'string' || type === 'boolean' || type === 'number';
}