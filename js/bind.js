/**
 * bind方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的this，
 * 之后的一序列参数将会在传递的实参前传入作为它的参数
 * 
 * https://zhuanlan.zhihu.com/p/25483361
*/

Function.prototype.bind = Function.prototype.bind || function(context){
    if(typeof this !== 'function'){
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var _self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNop = function(){};
    var fBounde = function(){
        var argPara = args.concat(Array.prototype.slice(arguments));
        return _self.apply(this instanceof fBounde ? this : context, argPara);
    }
    fNop.prototype = this.prototype;
    fBounde.prototype = new fNop();
    return fBounde;
}