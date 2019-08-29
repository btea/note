;(function(global){
    Array.prototype.last = function(i){
        var len = this.length;
        return this[len + i];
    }
    var modules = {}; // 保存所有模块
    var R = {};
    R.define = function(deps, callback){
        var id = R.getScript(), depsId = [];
        if(typeof deps === 'function'){
            callback = deps;
        }else{
            deps.map(d => {
                depsId.push(R.getScriptId(id, d));
            })
        }
        if(!modules[id]){
            modules[id]	= {
                id: id, 
                state: 1,//模块的加载状态	
                deps: depsId,//模块的依赖关系
                callback: callback,//模块的回调函数
                exports: null,//本模块回调函数callback的返回结果，供依赖于该模块的其他模块使用
                color: 0
            };
        }
    };
    R.require = function(deps, callback){
        var id = R.getScript(), depsId = [];
        if(!modules[id]){
            deps.map(d => {
                depsId.push(R.getScriptId(id, d));
            });
            modules[id] = {
                id: id,
                state: 2,
                deps: depsId,
                callback: callback,
                exports: null,
                color: 0,
                num: depsId.length
            }
            R.checkDeps(id);
        }
    };
    R.loadDepsModule = function(id){
        modules[id].deps.map(name => {
            if(!modules[name]){
                R.loadJs(name,  function(){
                    R.loadDepsModule(name);
                    R.checkDeps(name);    
                })
            }
        })
    },

    R.checkDeps = function(id){
        if(modules[id].hasProperty('num')){
            
            modules[id].num--;
        }
    };

    R.fireFactory = function(id, deps, callback){
        var params = [];
		//遍历id模块的依赖，为calllback准备参数
		for (var i = 0, d; d = deps[i++];) {
 			params.push(modules[d].exports);
		};
		//在context对象上调用callback方法
		var ret = callback.apply(global, params);	
		//记录模块的返回结果，本模块的返回结果可能作为依赖该模块的其他模块的回调函数的参数
		if(ret != void 0){
			modules[id].exports = ret;
		}
		modules[id].state = 2; //标志模块已经加载并执行完成
		return ret;
    };
    

    

    

    R.init = function(){
        let basepath = R.getScript().replace(/[^\/]+\.js/i,'');
		let entry = document.currentScript.getAttribute('data-main');

        R.loadJs(entry);
    };
    
    R.getScript = function(){
        return document.currentScript.src;
    };

    R.loadJs = function(url, callback){
        let script = document.createElement('script');
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        script.async = true;
        script.onload = function(){
            if(callback){
                callback();
            }
        };
        script.onerror = function(){
            throw Error('load script ' + url + ' failed!');
        };
        script.src = url;
        document.head.appendChild(script);
    }
    R.getScriptId = function(basepath, name){
        if(!basepath || !name){
            return '';
		}
        basepath = basepath.replace(/[^\/]+\.js/i, '');
        if(typeof name !== 'string'){
            throw TypeError('this arguments name is must be a string');
        }
        if(!/\/$/.test(basepath)){
            basepath += '/';
        }
        let reg = /\.\.\//;
        let n = 0; // 处理相对路径文件 ../  n表示相对路径要跨越的等级
        if(/^\.\.\//.test(name)){
            let list = name.split(reg);
            n = list.length; // basepath结尾为/,下面要切割的部分比../的数量多1
            let names = name.split('/');
            name = names.last(-1);
        }
        if(/^\.\//.test(name)){
            name = name.replace(/\.\//,'');
        }
        let paths = basepath.split('/');
        if(n){
            paths.splice(-n);
			basepath = paths.join('/');
			basepath += '/';
		}
		
        return basepath + name;
    };












    global.define = R.define;
    global.require = R.require;
})(this);