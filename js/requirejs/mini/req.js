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
    reqJs.define = function(dep, callback) {
        var id = reqJs.getScript();
        if(typeof dep === 'function') {
            callback = dep;
            if(!modules[id]) {
                modules[id] = {
                    dep: null,
                    id: id,
                    callback: callback,
                    export: null
                }
            }
        }else {
            dep.forEach(function(name) {
                var id = reqJs.getPath(path, name);
                if(!modules[id]) {
                    modules[id] = {
                        dep: null,
                        id: id,
                        callback: callback,
                        export: null
                    }
                }
            }, reqJs)
        }
        
    };
    reqJs.require = function(dep, callback) {
        var id = reqJs.getScript(), params = [], n = 0;
        id = id.replace(/[^\/]+\.js/, '')
        dep.forEach(function(d, i){
            var path = this.getPath(id, d);
            this.loadJs(path, function() {
                if (modules[path]) {
                    modules[path].export = modules[path].callback();
                    params[i] = modules[path].callback();
                    n++
                }
                if (n === dep.length) {
                    callback.apply(null, params)
                    console.log(modules)
                }
            })
        }, reqJs)
    },
    reqJs.getPath = function(path, name) {
        if (/\//.test(path)) {
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