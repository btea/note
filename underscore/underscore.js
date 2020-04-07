var _ = {};
var unescapeMap = {
    '&amp': '&',
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&#x27': "'",
    '&#x60': '`'
};
_.ivert = function(obj) {
    var result = {}
    Object.keys(obj).forEach(function(key) {
        result[obj[key]] = key
    })
    return result;
}
var escapeMap = _.ivert(unescapeMap);
var createEscaper = function(map) {
    var escaper = function(match) {
        return map[match];
    };
    // 使用非捕获性分组
    var source = '(?:' + Object.keys(map).join('|') + ')';
    var testRegExp = RegExp(source);
    var replaceRegExp = RegExp(source, 'g');
    return function(str) {
        str = str === null ? '' : '' + str;
        return testRegExp.test(str) ? str.replace(replaceRegExp, escaper) : str; 
    }
}
_.escape = createEscaper(escapeMap);
_.unescape = createEscaper(unescapeMap);