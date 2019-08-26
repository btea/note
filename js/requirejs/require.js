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

    var loadPath = ''; // 当前script标签加载的文件路径
    Array.prototype.last = function(i){
        var len = this.length;
        return this[len + i];
    }
    function moduleModel(name, deps, callback, basepath, num){
        if(!name){return {};}
        if(!name.last(-1)){
            throw Error('this basepath is error');
        }
        if(/\./.test(name.last(-1))){
            name = name.split('.')[0];
        }else{
            name = name.last(-1);
        }
        this.basepath = basepath;
        this.depsNum = num;
        this.id = basepath;
        this.name = name;
        this.src = basepath;
        this.cb = callback;
        this.export = null;
        if(Array.isArray(deps) && deps.length){
            this.deps = deps.map(dep => {
                let obj = requireJs._getBasePath(basepath, dep);
                let name = obj.name;
                let basepath = obj.basepath;
                requireJs._loadJs(basepath + name)
            })
        }else{
            this.dep = [];
        }
    }

    var requireJs = {
        // 当define函数是在指定入口调用时，basepath是当前requirejs所在的目录
        // 通过字符匹配判断，是否跨级相对目录下(../),获取正确的文件路径

        // 当define函数是在其他模块调用时，拿到当前define函数调用的模块下的路径(basepath)
        // 根据引入的模块路径，查找对应的模块的真正路径
        
        // basepath: '',
        // init: false,
        depNum: 0,
        head: document.getElementsByTagName('head')[0]
    };
    Object.defineProperty(requireJs, 'depNum', {
        set: function(v){
            num = v;
            if(!num){
                console.log(modules);
                console.log(basepath);
                debugger
                requireJs.mainEntryCallback(modules[modules['./main.js'].src + 'a.js'].cb());
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
        this.head.appendChild(node);
    };

    requireJs._currentScript = function(){
        return document.currentScript.src;
    }

    requireJs._getBasePath = function(basepath, name){
        if(!basepath || !name){
            return '';
        }
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
            name = names[-1];
        }
        if(/^\.\//.test(name)){
            name = name.replace(/\.\//,'');
        }
        let paths = basepath.splice(reg);
        paths.splice(-n);
        basepath += '/';
        return {
            basepath,
            name
        }
    },

    requireJs._getScriptId = function(basepath, name){
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
            let names = basepath.split('/');
            names.splice(names.length - 1, 1);
            return names.join('/') + name;
        }else{
            if(/^\.\//.test(name)){
                return basepath + name.slice(2);
            }
            return basepath + name;
        }
    };

    requireJs.require = function(deps, callback){
        let id = requireJs._currentScript().replace(/[^\/]+\.js/i,'');
        //将主模块main注册到modules中
		if(!modules[id]){
			//将主模块main依赖中的name转换为id，id其实是模块的对应javascript文件的全路径
			var depsId = []; 
			deps.map(function(name){
				depsId.push(requireJs._getScriptId(id, name));
			});
            console.log(depsId);
			//将主模块main注册到modules列表中
			modules[id]	= {
				id: id, 
				state: 1,//模块的加载状态	
				deps: depsId,//模块的依赖关系
				callback: callback,//模块的回调函数
				exports: null,//本模块回调函数callback的返回结果，供依赖于该模块的其他模块使用
				color:0,
			};
			//这里为main入口函数，需要将它的id也加入loadings列表，以便触发回调
			loadings.unshift(id);						
		}
		//加载依赖模块
		requireJs.loadDepsModule(id);

    };

    //用于递归地加载id模块的依赖模块
	requireJs.loadDepsModule = function(id){
		//依次处理本模块的依赖关系
		modules[id].deps.map(function(el){
			//如果模块还没开始加载，则加载模块所在的js文件
			if(!modules[el]){
				requireJs._loadJs(el,function(){
					//模块开始加载时，放入加载队列，以便检测加载情况
					loadings.unshift(el);						
					//递归的调用loadModule函数加载依赖模块
					requireJs.loadDepsModule(el);
					//加载完成后执行依赖检查，如果依赖全部加载完成就执行callback函数
					requireJs.checkDeps();	
				});
			}
		});
    };
    
    // 检测模块的依赖关系是否处理完毕，该函数在每一次js的onload事件都会触发一次
    requireJs.checkDeps = function(){
        //遍历加载列表
		for(var i = loadings.length, id; id = loadings[--i];){
			var obj = modules[id], deps = obj.deps, allloaded = true;									
			//遍历每一个模块的加载
			requireJs.checkCycle(deps,id,colorbase++);
			for(var key in deps){
				//如果存在未加载完的模块，则退出内层循环
				if(!modules[deps[key]] || modules[deps[key]].state !== 2){
					allloaded = false;
					break;
				}
			}

			//如果所有模块已经加载完成
			if(allloaded){
				loadings.splice(i,1); //从loadings列表中移除已经加载完成的模块							
				//执行模块的callback函数
				requireJs.fireFactory(obj.id, obj.deps, obj.callback);
				//该模块执行完成后可能使其他模块也满足执行条件了，继续检查，直到没有模块满足allloaded条件
				requireJs.checkDeps();
			}
		}		
    };

    // fireFactory的工作是从各个依赖模块收集返回值，然后调用该模块的回调函数
    requireJs.fireFactory = function(id, deps, callback){
        var params = [];
        //  遍历id模块的依赖，为callback准备参数
        for(var i = 0, d; d = deps[i++];){
            params.push(modules[d].exports);
        }
        // 在context对象上调用callback方法
        var ret = callback.apply(global, params);
        // 记录模块的返回结果，本模块的返回结果可能作为依赖该模块的其他模块的回调函数的参数
        if(ret != void 0){
            modules[id].exports = ret;
        }
        modules[id].state = 2;
        return ret;
    };

    //用于检测循环依赖的情况
	//具体的算法是遍历过程中标记颜色，如果发现节点的颜色已经被标记过，肯定存在循环依赖
	requireJs.checkCycle = function(deps,id,color){
		//检查id的所有依赖模块
        //如果模块已经加载完成则不可能存在循环依赖
		if(modules[id].state != 2){
		    for(var depid in deps){
		        //如果发现节点的颜色已经被标记过，肯定存在循环依赖
		        if(modules[deps[depid]]){
		        	if(modules[deps[depid]].color >= color){
						throw Error("circular dependency detected");
		        	}else if(modules[deps[depid]].color < color){
		        		modules[deps[depid]].color = color;
		        	}
		        	if(modules[deps[depid]].state != 2){
		        		requireJs.checkCycle(modules[deps[depid]].deps,id,color);
		        	}
			    }
		    }
		}
	}

    // define函数的整体框架
    requireJs.define = function(deps, callback){
        // 根据模块名获取url
        var id = requireJs._currentScript().replace(/[^\/]+\.js/,'');
        // 将依赖中的name转换为id，id其实是模块javascript文件的全路径
        var depsId = [];
        if(typeof deps === 'function'){
            callback = deps;
        }else{
            deps.map(function(name){
                depsId.push(requireJs._getScriptId(id, name));
            });
            console.log(depsId);
        }
        
        // 如果模块没有注册，就将模块加入modules列表
        if(!modules[id]){
            modules[id] = {
                id: id,
                state: 1, // 模块的加载状态
                deps: depsId, // 模块的依赖关系
                callback: callback, // 模块的回调函数
                exports: null, // 本模块回调函数callback的返回结果，供依赖于该模块的其他模块使用
                color: 0
            }
        }
    }




    requireJs._init();
    global.require = requireJs.require;
    global.define = requireJs.define;
})(window)