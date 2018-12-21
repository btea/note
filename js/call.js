Function.prototype.call = function(context){
    context = context || window;
    context.fn = this;
    var args = [];
    for(var i = 1; i < arguments.length; i++){
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args + ')');
    delete context.fn;
    return result;
}