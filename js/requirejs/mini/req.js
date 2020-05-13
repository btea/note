;(function(global) {
    var reqJs = {};
    var basepath;
    var modules = {}
    reqJs.init = function() {
        let basepath = this.getScript().replace(/[^\/]+\.js/i,'');
        let entry = document.currentScript.getAttribute('data-main');
        basepath = basepath;
        this.loadJs(entry);
    };

    reqJs.getScript = function(){
        return document.currentScript.src;
    };
    reqJs.loadJs = function(path, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true
        script.src = path;
        script.onload = function() {
            if(callback) {
                callback();
            }
        };
        script.onerror = function() {
            throw Error('load file ' + path + ' failed!')
        }
        document.head.appendChild(script);
    };
    // 生成模块基本结构对象
    reqJs.modelObject = function(id, callback) {
        if (!modules[id]) {
            modules[id] = {
                dep: [],
                id: id,
                callback: callback,
                export: null
            }
        }
    },
    reqJs.define = function(dep, callback) {
        var id = reqJs.getScript();
        if(typeof dep === 'function') {
            callback = dep;
            reqJs.modelObject(id, callback);
        }else {
            reqJs.modelObject(id, callback);
            dep.forEach(function(name) {
                let _id = id.replace(/[^\/]+\.js/, '');
                console.log(id)
                console.log(_id)
                var p = reqJs.getPath(_id, name);
                modules[id].dep.push(p);
            }, reqJs)
            console.log(modules)
        }
        
    };
    reqJs.require = function(dep, callback) {
        var id = reqJs.getScript(), params = [], n = 0;
        id = id.replace(/[^\/]+\.js/, '')
        dep.forEach(function(d, i){
            var path = this.getPath(id, d);
            if (modules[path] && modules[path].export) {
                params[i] = modules[path].export;
                n++
                if (n === dep.length) {
                    callback.apply(null, params)
                }
                return 
            }
            // 直接用script标签加载对应的依赖模块
            
            this.loadJs(path, function() {
                if (modules[path]) {
                    modules[path].export = modules[path].callback();
                    params[i] = modules[path].export;
                    n++
                }
                if (n === dep.length) {
                    callback.apply(null, params)
                }
            })
        }, reqJs)
    },
    reqJs.getPath = function(path, name) {
        if (/\/$/.test(path)) {
            path = path.slice(0, -1);
        }
        path = path.split('/');
        if (/^\.\//.test(name)) {
            return path.join('/') + name.slice(1);
        }
        if (/^\.\./.test(name)) {
            return path.slice(0, -1).join('/') + name.slice(2)
        }
    } 

    reqJs.init();
	
    global.define = reqJs.define;
	global.require = reqJs.require;
})(this)