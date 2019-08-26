;(function(global){


    let reqJs = {};
    let modules = {};
    let basepath = '';
    let loadings = [];
    let colorbase = 1;

    reqJs.loadJs = function(url, callback){
        let script = document.createElement('script');
        script.charset = 'utf-8';
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

    reqJs.getScript = function(){
        return document.currentScript.src;
    };

    reqJs.init = function(){
        let basepath = reqJs.getScript().replace(/[^\/]+\.js/i,'');
        let entry = document.currentScript.getAttribute('data-main');
        basepath = basepath;
        this.loadJs(entry);
    }

    reqJs.define = function(deps, callback){
        let id = reqJs.getScript();

        let depsId = [];
        if(typeof deps === 'function'){
            callback = deps;
        }else{
            deps.map(function(name){
                depsId.push(reqJs.getScriptId(id, name));
            });
        }
		//如果模块没有注册，就将模块加入modules列表
		if(!modules[id]){
			modules[id] = {
				id: id, 
				state: 1,//模块的加载状态	
				deps: depsId,//模块的依赖关系
				callback: callback,//模块的回调函数
				exports: null,//本模块回调函数callback的返回结果，供依赖于该模块的其他模块使用
				color: 0,
			};
		}
    };
    reqJs.require = function(deps, callback){
        let id = reqJs.getScript();
        //将主模块main注册到modules中
		if(!modules[id]){
			//将主模块main依赖中的name转换为id，id其实是模块的对应javascript文件的全路径
			var depsId = []; 
			deps.map(function(name){
				depsId.push(reqJs.getScriptId(id, name));
			});

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
		reqJs.loadDepsModule(id);
    };

    //用于递归地加载id模块的依赖模块
	reqJs.loadDepsModule = function(id){
		//依次处理本模块的依赖关系
		modules[id].deps.map(function(el){
			//如果模块还没开始加载，则加载模块所在的js文件
			if(!modules[el]){
				reqJs.loadJs(el,function(){
					//模块开始加载时，放入加载队列，以便检测加载情况
					loadings.unshift(el);						
					//递归的调用loadModule函数加载依赖模块
			        reqJs.loadDepsModule(el);
					//加载完成后执行依赖检查，如果依赖全部加载完成就执行callback函数
					reqJs.checkDeps();	
				});
			}
		});
    };	
    
    reqJs.checkDeps = function(){
        //遍历加载列表
		for(var i = loadings.length, id; id = loadings[--i];){
			var obj = modules[id], deps = obj.deps, allloaded = true;									
			//遍历每一个模块的加载
			reqJs.checkCycle(deps, id, colorbase++);
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
				reqJs.fireFactory(obj.id, obj.deps, obj.callback);
				//该模块执行完成后可能使其他模块也满足执行条件了，继续检查，直到没有模块满足allloaded条件
				reqJs.checkDeps();
			}
		}	
    };

    reqJs.checkCycle = function(deps, id, color){
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
		        		reqJs.checkCycle(modules[deps[depid]].deps, id, color);
		        	}
			    }
		    }
		}
    }

    reqJs.fireFactory = function(id, deps, callback){
        var params = [];
		//遍历id模块的依赖，为calllback准备参数
		for (var i = 0, d; d = deps[i++];) {
 			params.push(modules[d].exports);
		};
		//在context对象上调用callback方法
		var ret = callback.apply(global,params);	
		//记录模块的返回结果，本模块的返回结果可能作为依赖该模块的其他模块的回调函数的参数
		if(ret != void 0){
			modules[id].exports = ret;
		}
		modules[id].state = 2; //标志模块已经加载并执行完成
		return ret;
    }

    reqJs.getScriptId = function(basepath, name){
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
            name = names[-1];
        }
        if(/^\.\//.test(name)){
            name = name.replace(/\.\//,'');
        }
        let paths = basepath.split(reg);
        if(n){
            paths.splice(-n);
            basepath = paths.join('/');
        }
        // basepath += '/';
        return basepath + name;
    };


    reqJs.init();

    global.define = reqJs.define;
    global.require = reqJs.require;
})(this);