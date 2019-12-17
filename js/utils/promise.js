class Promise{
    constructor(executor){
        // 初始化state为等待状态
        this.state = 'pending';
        // 成功的值
        this.value = void 0;
        // 失败的值
        this.reason = void 0;
        // 成功存放的数组
        this.onResolvedCallbacks = [];
        // 失败存放的数组
        this.onRejectedCallbacks = [];
        let resolve = value => {
            // state改变，resolve就会调用
            if(this.state === 'pending'){
                // state改变，resolve调用机会失败
                this.state = 'fulfilled';
                // 存储成功的值
                this.value = value;
                // 一旦resolve执行，调用成功数组的函数
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        let reject = reason => {
            // state改变，reject调用就会失败
            if(this.state === 'pending'){
                // reject调用后，state转化为失败态
                this.state = 'rejected';
                // 储存失败的原因
                this.reason = reason;
                 // 一旦reject执行，调用失败数组的函数
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        };
        try{
            executor(resolve, reject)
        }catch(err){
            reject(err);
        }
    }

    // then方法有两个参数onFulfilled onRejected
    then(onFulfilled, onRejected){
        // onFulfilled如果不是函数，就忽略onFulfilled,直接返回value
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        // onRejected如果不是函数，就忽略onRejected,直接扔出错误
        onRejected = typeof onRejected === 'function' ? onRejected: err => {throw err;}
        // 声明返回的promise2
        let promise2 = new Promise((resolve, reject) => {
            if(this.state === 'fulfilled'){
                // 异步
                setTimeout(() => {
                    try{
                        let x = onFulfilled(this.value);
                        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
                
            };
            if(this.state === 'rejected'){
                // 异步
                setTimeout(() => {
                    // 如果报错
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e){
                        reject(e);
                    }
                },0)
            };
            if(this.state === 'pending'){
                this.onResolvedCallbacks.push(() => {
                    // 异步
                    setTimeout(() => {
                        try{
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e){
                            reject(e);
                        }
                    },0);
                    
                });
                this.onRejectedCallbacks.push(() => {
                    // 异步
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                });
            }
        })
        // 返回promise，完成链式
        return promise2;
        // 状态为fulfilled,执行onFulfilled,传入成功的值
        // if(this.state === 'fulfilled'){
        //     onFulfilled(this.value);
        // };
        // if(this.state === 'rejected'){
        //     onRejected(this.reason);
        // }
        // // 当状态state为pending时
        // if(this.state === 'pending'){
        //     // onFulfilled传入成功的数组
        //     this.onResolvedCallbacks.push(() => {
        //         onFulfilled(this.value);
        //     })
        //     // onRejected传入到失败数组
        //     this.onRejectedCallbacks.push(() => {
        //         onRejected(this.person);
        //     })
        // }
    }
}

function resolvePromise(promise2, x, resolve, reject){
    // 循环引用报错
    if(x === promise2){
        // reject报错
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null且x是对象或者函数
    if(x != null && (typeof x === 'object' || typeof x === 'function')){
        try{
            // A+规定，声明then = x 的then方法
            let then = x.then;
            // 如果then是函数，就默认是promise了
            if(typeof then === 'function'){
                // 就让then执行  第一个参数是this 后面是成功的回调和失败的回调
                then.call(x,y => {
                    // 成功和失败只能调用一个
                    if(called) return;
                    called = true;
                    // resolve的结果依旧是promise，那就继续解析
                    resolvePromise(promise2, y, resolve, reject);
                },err => {
                    // 成功和失败只能调用一个
                    if(called) return;
                    called = true;
                    reject(err); // 失败了就失败了
                })
            }else{
                resolve(x); // 直接成功即可
            }
        }catch(e){
            // 也属于失败
            if(called) return;
            called = true;
            // 取then出错了那就不要在继续执行了
            reject(e);
        }
    }else{
        resolve(x);
    }
}