;(function(global){
    /*
	*初始化2个基本数据结构
	* loadings:存放正在加载的模块id，加载完成后需要移除
	* modules:存放所有开始加载的模块信息，包括已经处理完成后的模块
	*/
	var  loadings = [], modules = {}; 

	/*
	* 用于检测循环依赖的颜色标记
	*/
	var colorbase = 1;

	/*
	* init函数初始化的2个系统变量
	* basepath: requireJs的目录, basepath+模块名+'.js'为各个模块js文件路径	
	*/
	//requireJs的目录, basepath+模块名+'.js'为各个模块js文件路径	
	//程序入口函数所在的js文件
	var basepath = '',  init = false, num = 0;


    var requireJs = {
        // 当define函数是在指定入口调用时，basepath是当前requirejs所在的目录
        // 通过字符匹配判断，是否跨级相对目录下(../),获取正确的文件路径

        // 当define函数是在其他模块调用时，拿到当前define函数调用的模块下的路径(basepath)
        // 根据引入的模块路径，查找对应的模块的真正路径
        
        // basepath: '',
        // init: false,
        depNum: 0,
        head: document.getElementsByTagName('head')[0],
        modules: {}
    };
    Object.defineProperty(requireJs, 'depNum', {
        set: function(v){
            num = v;
            if(!num){
                requireJs.mainEntryCallback();
            }
        },
        get: function(){
            return num;
        }
    })

    requireJs._init = function(){
        if(!this.init){
            let path = this._currentScript();
            basepath =  path.replace(/[^\/]+\.js/i,'');
            let node = document.currentScript;
            let main = node.getAttribute('data-main');
            // 初次加载，指定的入口文件
            this._loadJs(main, null);
            // this.init = true;
        }
    };


    requireJs._loadJs = function(url, callback){
        let node = document.createElement('script');
        node.charset = 'utf-8';
        node.async = true;
        node.type = 'text/javascript';
        node.onload = function(){
            if(callback){
                callback();
            }
        };
        node.onerror = function(){
            throw Error('load script: ' + url + 'failed !');
        };
        node.src = url;
        console.log(url);
        this.head.appendChild(node);
    };

    requireJs._currentScript = function(){
        return document.currentScript.src;
    }

    requireJs._getScriptId = function(name){
        let suffix = /\.js/;
        if(/\./.test(name)){
            // 引入的文件名带有后缀
            if(!suffix.test(name)){
                // 暂不处理除js以外的其他格式文件。。。。。。
                return
            }
        }
        if(/^\.{2}\//.test(name)){
            // 相对路径 以../开头
            let names = path.split('/');
            names.splice(names.length - 1, 1);
            return names.join('/') + name;
        }else{
            return basepath + name;
        }
    };

    requireJs.require = function(deps, callback){
        if(!init){
            requireJs.mainEntryCallback = callback;
            init = true;
        }
        if(Array.isArray(deps)){
            if(!deps.length){
                modules[basepath] = callback();
            }
            deps.map(name => {
                let id = this._getScriptId(name);
                requireJs._loadJs(id, callback);
                // this.modules[id] = {
                //     id: id,
                //     src: id,
                //     dep: 
                // }   
            })
        }

    };

    requireJs.define = function(deps, callback){


        if(typeof deps === 'function'){
            callback = deps;
            modules[basepath] = callback();
        }

    }

    //Module.id       // 模块id
    //Module.name     // 模块名字
    //Module.src      // 模块的真实的uri路径
    //Module.dep      // 模块的依赖
    //Module.cb       // 模块的成功回调函数
    //Module.errorFn  // 模块的失败回调函数
    //Module.STATUS   // 模块的状态（等待中、正在网络请求、准备执行、执行成功、出现错误……）

    //Module.prototype.init           // 初始化，用来赋予各种基本值
    //Module.prototype.fetch          // 通过网络请求获取模块
    //Module.prototype.analyzeDep     // 分析、处理模块的依赖
    //Module.prototype.execute        // 运算该模块




    requireJs._init();
    global.require = requireJs.require;
    global.define = requireJs.define;
})(window)