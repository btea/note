;(function(global){
    Array.prototype.last = function(i){
        var len = this.length;
        return this[len + i];
    }
    var colorbase = 0;
    var loadings = [];
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

            //这里为main入口函数，需要将它的id也加入loadings列表，以便触发回调
			loadings.unshift(id);	
        }
        R.loadDepsModule(id);

    };
    R.loadDepsModule = function(id){
        modules[id].deps.map(name => {
            if(!modules[name]){
                R.loadJs(name,  function(){
                    loadings.unshift(name);
                    R.loadDepsModule(name);
                    R.checkDeps(name);    
                })
            }
        })
    };

    R.checkDeps = function(id){
        //遍历加载列表
        var i = loadings.length, id;
		for(; id = loadings[--i];){
            var obj       = modules[id];
            var deps      = obj.deps;
            var allloaded = true;							
			//遍历每一个模块的加载
            R.checkCycle(deps, id, colorbase++);
            
			for(var key in deps){
				//如果存在未加载完的模块，则退出内层循环
				if(!modules[deps[key]] || modules[deps[key]].state !== 2){
					allloaded = false;
					break;
				}
			}

			//如果所有模块已经加载完成
			if(allloaded){
				loadings.splice(i, 1); //从loadings列表中移除已经加载完成的模块							
				//执行模块的callback函数
				R.fireFactory(obj.id, deps, obj.callback);
				//该模块执行完成后可能使其他模块也满足执行条件了，继续检查，直到没有模块满足allloaded条件
				R.checkDeps();
			}
		}	
    };

    R.checkCycle = function(deps, id, color){
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
		        		R.checkCycle(modules[deps[depid]].deps, id, color);
		        	}
			    }
		    }
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
    };
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
            name = names.slice(-1)[0];
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
    R.init();

    global.define = R.define;
    global.require = R.require;
})(this);