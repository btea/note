const fs = require('fs');

const readFile = (name) => {
    return new Promise(function(resolve, reject){
        fs.readFile(name, (err, data) => {
            if(err) return reject(err)
            resolve(data)
        })
    })
};

const gen = function *(){
    const f1 = yield readFile('./a.txt');
    const f2 = yield readFile('./b.txt');
    // yield后面的表达式值会出现在next方法的返回对象value属性里面，但返回值为undefined，所以，上面f1, f2值均为undefined
}

const g = gen();
g.next();
g.next();
g.next();

// async / await
const asyncReadFile = async function () {
    const f1 = await readFile('./a.txt');
    const f2 = await readFile('./b.txt');
    console.log(f1.toString());
    console.log(f2.toString());
}
asyncReadFile();
// async函数对Generator函数的改进，体现在在以下四点
// https://es6.ruanyifeng.com/#docs/async
(1) 内置执行器
Generator函数执行必须依靠执行器，所有才有了co模块，而async函数自带执行器，也就是说，async函数的执行和普通函数一样，只要一行。

(2) 更好的语义
async 和 await ，比起yield 和 星号， 语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

(3) 更广的适用性
co模块约定，yield命令后面只能是Thunk函数或者Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值（数字、字符串、布尔值，但是会自动转成 resolved的Promise对象）。

(4) 返回值是Promise
async函数的返回值是Promise对象，这比Generator函数的返回值是Iterator对象方便多了。你可以用then方法指定下一步操作。
进一步说，async函数完全可以看作多个异步操作，包装成的一个Promise对象，而await命令就是内部then命令的语法糖。



